import stripe
import os

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
stripe.api_key = STRIPE_SECRET_KEY

async def create_payment_intent_service(amount: int, currency: str = "usd", idempotency_key: str = None):
    """
    Creates a Stripe PaymentIntent with Idempotency.
    """
    if not STRIPE_SECRET_KEY:
        raise ValueError("STRIPE_SECRET_KEY is not set")

    try:
        # Idempotency is handled natively by Stripe if key is provided
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            automatic_payment_methods={"enabled": True},
            idempotency_key=idempotency_key
        )
        return {"clientSecret": intent.client_secret, "id": intent.id}
    except Exception as e:
        print(f"Stripe Error: {e}")
        raise e
