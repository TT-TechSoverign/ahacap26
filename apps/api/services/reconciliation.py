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

                # Check if order exists in DB
                res = await db_session.execute(select(models.Order).where(models.Order.stripe_pid == stripe_pid))
                existing_order = res.scalars().first()

                if existing_order:
                    # Order is safely recorded
                    continue

                # Unrecorded paid order detected! Begin self-healing recovery.
                order_id = f"ORD-{stripe_pid[-6:].upper()}"
                logger.warning(f"🚨 [Auto-Reconciliation] Unrecorded order found: {order_id} (PI: {stripe_pid}). Recovering...")

                # Extract customer details
                cust = s.customer_details.to_dict() if hasattr(s.customer_details, 'to_dict') else dict(s.customer_details or {})
                receipt_email = cust.get('email', '')
                customer_name = cust.get('name', 'Valued Customer')
                customer_phone = cust.get('phone', '')
                customer_address = cust.get('address', {})
                fulfillment_mode = metadata.get('fulfillment_mode', 'pickup')
                amount_received = s.amount_total or 0

                # Extract line items
                line_items = await asyncio.to_thread(stripe.checkout.Session.list_line_items, s.id, limit=100)
                items_data = []
                for it_obj in line_items.data:
                    it = it_obj.to_dict() if hasattr(it_obj, 'to_dict') else dict(it_obj)
                    desc = it.get('description', '')
                    # Resolve product ID if window AC or inverter unit
                    p_id = None
                    if '14,000' in desc or 'LW1522FVSM' in desc:
                        p_id = 5
                    elif '12,000' in desc or 'LW1222IVSM' in desc:
                        p_id = 4
                    elif '10,000' in desc or 'LW1022FVSM' in desc:
                        p_id = 3
                    elif '8,000' in desc or 'LW8022IVSM' in desc:
                        p_id = 2

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
                await db_session.commit()
                logger.info(f"✅ [Auto-Reconciliation] Persisted order {order_id} in database.")

                # 2. Deduct inventory idempotently
                if not recovered_order.inventory_deducted:
                    recovered_order.inventory_deducted = True
                    for item in items_data:
                        p_id = item.get("product_id")
                        qty = item.get("quantity", 0)
                        if p_id and qty > 0:
                            db_prod = await db_session.execute(select(models.Product).where(models.Product.id == p_id))
                            p_obj = db_prod.scalar_one_or_none()
                            if p_obj:
                                p_obj.stock = max(0, p_obj.stock - qty)
                                p_dict = {
                                    "id": p_obj.id,
                                    "name": p_obj.name,
                                    "price": p_obj.price,
                                    "category": p_obj.category,
                                    "subcategory": p_obj.subcategory,
                                    "stock": p_obj.stock,
                                    "image_url": p_obj.image_url,
                                    "btu": p_obj.btu,
                                    "voltage": p_obj.voltage,
                                    "coverage": p_obj.coverage,
                                    "performance_specs": p_obj.performance_specs,
                                    "key_spec": p_obj.key_spec,
                                    "noise_level": p_obj.noise_level,
                                    "dehumidification": p_obj.dehumidification,
                                    "dimensions": p_obj.dimensions,
                                    "weight": p_obj.weight,
                                    "warranty": p_obj.warranty,
                                    "promo_price": p_obj.promo_price,
                                    "discount_percent": p_obj.discount_percent
                                }
                                persist_product_changes(p_dict)
                                logger.info(f"✅ [Auto-Reconciliation] Deducted {qty} from Product {p_id}. New stock: {p_obj.stock}")
                    await db_session.commit()

                # 3. Dispatch emails
                if receipt_email:
                    logger.info(f"📧 [Auto-Reconciliation] Sending confirmation emails for {order_id} to {receipt_email}...")
                    try:
                        await email_service.send_order_confirmation(
                            receipt_email,
                            order_id,
                            amount_received,
                            fulfillment_mode=fulfillment_mode,
                            items=items_data,
                            customer_info=cust,
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
        return {"status": "error", "error": str(e), "recovered": recovered}

async def periodic_reconciliation_runner(interval_seconds: int = 600):
    """
    Background worker that runs order reconciliation periodically (default: every 10 minutes).
    Initial run occurs 20 seconds after API startup to allow all pools to warm up.
    """
    await asyncio.sleep(20)
    logger.info("[Auto-Reconciliation] Background worker initialized. Running every 10 minutes.")
    while True:
        try:
            result = await reconcile_unrecorded_stripe_orders(limit=20)
            if result.get("recovered_count", 0) > 0:
                logger.warning(f"🎉 [Auto-Reconciliation] Recovered {result['recovered_count']} unrecorded order(s)!")
        except Exception as e:
            logger.error(f"[Auto-Reconciliation Runner Exception]: {e}")
        await asyncio.sleep(interval_seconds)
