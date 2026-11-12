import asyncio
import os
import json
import logging
from datetime import datetime
import stripe
from sqlalchemy.future import select

from database import AsyncSessionLocal
import models
from services import email as email_service
from routers.catalog import persist_product_changes

logger = logging.getLogger("reconciliation")

async def reconcile_unrecorded_stripe_orders(limit: int = 25) -> dict:
    """
    Self-Healing Order Reconciliation Pipeline:
    Cross-checks recent successful Stripe Checkout sessions against the database.
    If any paid customer order is absent from the orders table (e.g. Due to a webhook
    network failure, proxy redirect, or restart), it automatically:
      1. Generates and persists the Order record with status=PAID
      2. Deducts warehouse inventory idempotently
      3. Dispatches customer and admin confirmation emails
      4. Returns an audit summary of recovered orders
    """
    stripe_key = os.getenv("STRIPE_SECRET_KEY")
    if not stripe_key:
        logger.warning("[Auto-Reconciliation] STRIPE_SECRET_KEY not set. Skipping.")
        return {"status": "skipped", "reason": "no_stripe_key", "recovered": []}

    stripe.api_key = stripe_key
    recovered = []

    try:
        sessions = await asyncio.to_thread(stripe.checkout.Session.list, limit=limit)
        async with AsyncSessionLocal() as db_session:
            for s in sessions.data:
                # Only evaluate fully completed and paid sessions
                if getattr(s, 'payment_status', None) != "paid":
                    continue

                stripe_pid = getattr(s, 'payment_intent', None)
                if not stripe_pid:
                    continue

                # Filter out CRM invoice transactions
                metadata = s.metadata.to_dict() if hasattr(s.metadata, 'to_dict') else dict(s.metadata or {})
                if metadata.get('source') == 'crm' or metadata.get('invoice_id'):
                    continue

                # Check if order exists in DB (or if 6-char suffix collides with another order)
                candidate_id = f"ORD-{stripe_pid[-6:].upper()}"
                res = await db_session.execute(
                    select(models.Order).where(
                        (models.Order.stripe_pid == stripe_pid) | (models.Order.id == candidate_id)
                    )
                )
                existing_order = res.scalars().first()

                if existing_order and getattr(existing_order, "stripe_pid", None) == stripe_pid:
                    # Order is safely recorded
                    continue

                # Unrecorded paid order detected! Begin self-healing recovery.
                order_id = f"ORD-{stripe_pid[-10:].upper()}" if existing_order else candidate_id
                logger.warning(f"🚨 [Auto-Reconciliation] Unrecorded order found: {order_id} (PI: {stripe_pid}). Recovering...")

                # Extract customer & delivery shipping details
                from services.stripe_telemetry import extract_stripe_customer_info
                s_dict = s.to_dict() if hasattr(s, 'to_dict') else dict(s or {})
                fulfillment_mode = metadata.get('fulfillment_mode', 'pickup')
                extracted_info = extract_stripe_customer_info(s_dict, fallback_email='', fulfillment_mode=fulfillment_mode)
                receipt_email = extracted_info['email'] or ''
                customer_name = extracted_info['name']
                customer_phone = extracted_info['phone']
                customer_address = extracted_info['address']
                amount_received = s.amount_total or 0

                # Extract line items (expand price.product so product.metadata.product_id is present in Stripe's response)
                line_items = await asyncio.to_thread(
                    stripe.checkout.Session.list_line_items,
                    s.id,
                    limit=100,
                    expand=['data.price.product'],
                )
                items_data = []
                for it_obj in line_items.data:
                    it = it_obj.to_dict() if hasattr(it_obj, 'to_dict') else dict(it_obj)
                    desc = it.get('description', '')
                    # Resolve product ID from explicit metadata first (expanded price.product or mock product_data), then MPN map across all 16 catalog models
                    p_id = None
                    price_dict = it.get('price') or {}
                    expanded_product = price_dict.get('product') if isinstance(price_dict.get('product'), dict) else {}
                    meta_pid = (
                        (expanded_product.get('metadata') or {}).get('product_id')
                        or (price_dict.get('product_data') or {}).get('metadata', {}).get('product_id')
                        or (it.get('metadata') or {}).get('product_id')
                    )
                    if meta_pid and str(meta_pid).isdigit():
                        p_id = int(meta_pid)
                    mpn_map = {
                        'LW6023IVSM': 1,
                        'LW8022IVSM': 2,
                        'LW1022IVSM': 3,
                        'LW1022FVSM': 3,
                        'LW1222IVSM': 4,
                        'LW1522FVSM': 5,
                        'LW1522IVSM': 5,
                        'LW1822IVSM': 6,
                        'LW2422IVSM': 7,
                        'LW8023HRSM': 8,
                        'LW1823HRSM': 9,
                        'LW2423HRSM': 10,
                        'LW8024RD': 11,
                        'LW1217ERSM1': 12,
                        'AJCQ08AWJ': 13,
                        'AJCQ10AWJ': 14,
                        'AJCQ12AXXWA': 15,
                        'AJCQ12AWJ': 15,
                        'RAB26A': 16,
                    }
                    desc_upper = desc.upper()
                    if p_id is None:
                        for code, mapped_id in mpn_map.items():
                            if code in desc_upper:
                                p_id = mapped_id
                                break
                    if p_id is None:
                        if '6,000' in desc:
                            p_id = 1
                        elif '23,500' in desc:
                            p_id = 7
                        elif '23,000' in desc:
                            p_id = 10
                        elif '18,000' in desc and 'DUAL INVERTER' in desc_upper:
                            p_id = 6
                        elif '18,000' in desc:
                            p_id = 9
                        elif '14,000' in desc:
                            p_id = 5
                        elif '12,000' in desc and 'GE' in desc_upper:
                            p_id = 15
                        elif '12,000' in desc and 'DUAL INVERTER' in desc_upper:
                            p_id = 4
                        elif '12,000' in desc:
                            p_id = 12
                        elif '10,000' in desc and 'GE' in desc_upper:
                            p_id = 14
                        elif '10,000' in desc:
                            p_id = 3
                        elif '8,200' in desc:
                            p_id = 13
                        elif '7,600' in desc:
                            p_id = 8
                        elif '8,000' in desc and 'DUAL INVERTER' in desc_upper:
                            p_id = 2
                        elif '8,000' in desc:
                            p_id = 11

                    items_data.append({
                        "product_id": p_id,
                        "description": desc,
                        "quantity": it.get('quantity', 1),
                        "amount_total": it.get('amount_total'),
                        "currency": it.get('currency', 'usd')
                    })

                # Card payment info
                payment_info = {"brand": "Card", "last4": "****"}
                try:
                    pi_obj = await asyncio.to_thread(stripe.PaymentIntent.retrieve, stripe_pid, expand=['payment_method'])
                    pi = pi_obj.to_dict() if hasattr(pi_obj, 'to_dict') else dict(pi_obj)
                    if pi.get('payment_method') and isinstance(pi['payment_method'], dict) and pi['payment_method'].get('card'):
                        card = pi['payment_method']['card']
                        payment_info = {
                            "brand": card.get('brand', 'Card').title(),
                            "last4": card.get('last4', '****')
                        }
                except Exception as pi_err:
                    logger.warning(f"Could not retrieve card brand for {stripe_pid}: {pi_err}")

                # 1. Insert Order
                created_at = datetime.fromtimestamp(s.created) if getattr(s, 'created', None) else datetime.utcnow()
                recovered_order = models.Order(
                    id=order_id,
                    stripe_pid=stripe_pid,
                    total_cents=amount_received,
                    customer_email=receipt_email,
                    customer_name=customer_name,
                    customer_phone=customer_phone,
                    customer_address=json.dumps(customer_address),
                    status=models.OrderStatus.PAID,
                    items_json=json.dumps(items_data),
                    fulfillment_mode=fulfillment_mode,
                    utm_source=metadata.get('utm_source'),
                    utm_medium=metadata.get('utm_medium'),
                    utm_campaign=metadata.get('utm_campaign'),
                    created_at=created_at
                )
                db_session.add(recovered_order)
                try:
                    await db_session.commit()
                    logger.info(f"✅ [Auto-Reconciliation] Persisted order {order_id} in database.")
                except Exception:
                    await db_session.rollback()
                    pid_check = await db_session.execute(select(models.Order).where(models.Order.stripe_pid == stripe_pid))
                    if pid_check.scalars().first():
                        logger.info(f"ℹ️ [Auto-Reconciliation] Order for {stripe_pid} already persisted concurrently. Skipping.")
                        continue
                    import secrets
                    order_id = f"ORD-{stripe_pid[-8:].upper()}-{secrets.token_hex(2).upper()}"
                    recovered_order.id = order_id
                    db_session.add(recovered_order)
                    await db_session.commit()
                    logger.info(f"✅ [Auto-Reconciliation] Persisted order {order_id} after suffix collision retry.")

                # 2. Deduct inventory idempotently
                if not recovered_order.inventory_deducted:
                    recovered_order.inventory_deducted = True
                    from routers.catalog import serialize_product_seed_dict
                    for item in items_data:
                        p_id = item.get("product_id")
                        qty = item.get("quantity", 0)
                        if p_id and qty > 0:
                            db_prod = await db_session.execute(
                                select(models.Product).where(models.Product.id == p_id).with_for_update()
                            )
                            p_obj = db_prod.scalar_one_or_none()
                            if p_obj:
                                p_obj.stock = max(0, p_obj.stock - qty)
                                p_dict = serialize_product_seed_dict(p_obj)
                                persist_product_changes(p_dict)
                                logger.info(f"✅ [Auto-Reconciliation] Deducted {qty} from Product {p_id}. New stock: {p_obj.stock}")
                    await db_session.commit()

                # 3. Dispatch emails (guarded by Redis order_id lock)
                if receipt_email:
                    should_send = True
                    try:
                        from cache import redis_client
                        if redis_client:
                            claimed = await redis_client.set(f"email_sent:order:{order_id}", "1", nx=True, ex=86400)
                            if not claimed:
                                should_send = False
                    except Exception:
                        pass
                    if should_send:
                        logger.info(f"📧 [Auto-Reconciliation] Sending confirmation emails for {order_id} to {email_service.mask_email(receipt_email)}...")
                        try:
                            await email_service.send_order_confirmation(
                                receipt_email,
                                order_id,
                                amount_received,
                                fulfillment_mode=fulfillment_mode,
                                items=items_data,
                                customer_info=extracted_info,
                                payment_info=payment_info
                            )
                            logger.info(f"✅ [Auto-Reconciliation] Email pipeline completed for {order_id}.")
                        except Exception as mail_err:
                            logger.error(f"❌ [Auto-Reconciliation] Email failed for {order_id}: {mail_err}")

                recovered.append({
                    "order_id": order_id,
                    "stripe_pid": stripe_pid,
                    "customer_name": customer_name,
                    "customer_email": receipt_email,
                    "amount_cents": amount_received,
                    "recovered_at": datetime.utcnow().isoformat()
                })

        return {
            "status": "success",
            "checked_sessions": len(sessions.data),
            "recovered_count": len(recovered),
            "recovered": recovered
        }
    except Exception as e:
        logger.error(f"❌ [Auto-Reconciliation Error]: {e}", exc_info=True)
        return {"status": "error", "error": "Reconciliation check encountered a backend error", "recovered": recovered}

async def periodic_reconciliation_runner(interval_seconds: int = 600):
    """
    Background worker that runs order reconciliation periodically (default: every 10 minutes).
    Uses a Redis distributed lock so only 1 of the 4 Uvicorn workers polls Stripe per window.
    """
    await asyncio.sleep(20)
    logger.info("[Auto-Reconciliation] Background worker initialized. Running every 10 minutes.")
    while True:
        try:
            lock_acquired = True
            try:
                from cache import redis_client
                if redis_client:
                    lock_ttl = max(60, int(interval_seconds) - 30)
                    claimed = await redis_client.set("lock:reconcile_stripe", "1", nx=True, ex=lock_ttl)
                    lock_acquired = bool(claimed)
            except Exception:
                lock_acquired = True

            if lock_acquired:
                result = await reconcile_unrecorded_stripe_orders(limit=20)
                if result.get("recovered_count", 0) > 0:
                    logger.warning(f"🎉 [Auto-Reconciliation] Recovered {result['recovered_count']} unrecorded order(s)!")
        except Exception as e:
            logger.error(f"[Auto-Reconciliation Runner Exception]: {e}")
        await asyncio.sleep(interval_seconds)
