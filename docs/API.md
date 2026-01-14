# API Documentation

## Payments

### Create Payment Intent
- **Endpoint**: `POST /api/v1/payments/create-intent`
- **Description**: Initiates a checkout session. Creates an Order in `AWAIT_PAYMENT` state.
- **Headers**:
  - `Idempotency-Key` (Required): UUID v4 for idempotency.
- **Body**:
  ```json
  {
    "items": [
      { "product_id": 1, "quantity": 1, "name": "AC Unit" }
    ],
    "client_total_cents": 150000,
    "currency": "usd"
  }
  ```
- **Response**: `{"clientSecret": "pi_...", "id": "pi_..."}`
- **Errors**:
  - `400`: Price Mismatch (@PriceGuardian)
  - `409`: Invalid State Transition (State Machine)

## Webhooks

### Stripe Webhook
- **Endpoint**: `POST /api/webhooks/stripe`
- **Description**: Receives events from Stripe. Verifies signature.
- **Headers**:
  - `Stripe-Signature`: MAC signature.
- **Events**:
  - `payment_intent.succeeded`: Updates Order status to `PAID`.
- **Response**: `{"status": "success"}` (Immediate 200 OK). Processing is async.

## Middleware
- **LogSanitizer**: Redacts PII from logs.
- **ChaosMonkey**: Simulates failures if `CHAOS_MODE=true`.
- **HeaderGuard**: Adds security/cache headers.
