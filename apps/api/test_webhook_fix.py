import asyncio
import os
from fastapi.testclient import TestClient
from main import app

# Ensure there's a webhook secret so we bypass the missing secret check and hit the signature check
os.environ["STRIPE_WEBHOOK_SECRET"] = "whsec_test_secret"

client = TestClient(app)

def test_webhook_bad_signature():
    print("Testing Stripe Webhook with bad signature...")
    response = client.post(
        "/api/webhooks/stripe",
        headers={"Stripe-Signature": "t=123,v1=bad_signature"},
        json={"id": "evt_test", "type": "payment_intent.succeeded"}
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 400:
        print("✅ Test passed! 400 Bad Request successfully returned.")
    else:
        print(f"❌ Test failed! Expected 400, got {response.status_code}")
        exit(1)

if __name__ == "__main__":
    test_webhook_bad_signature()
