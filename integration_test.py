import httpx
import asyncio

async def test_integration():
    url = "http://localhost:8000/api/v1/orders"

    # payload with discount
    payload_discount = {
        "items": [{"product_id": 1, "category": "WINDOW_UNIT", "name": "LG 8000 BTU", "quantity": 1}],
        "customer_email": "test@example.com",
        "shipping_method": "PICKUP_AIEA",
        "discount_code": "CALOHA"
    }

    # payload without discount
    payload_normal = {
        "items": [{"product_id": 1, "category": "WINDOW_UNIT", "name": "LG 8000 BTU", "quantity": 1}],
        "customer_email": "test@example.com",
        "shipping_method": "PICKUP_AIEA"
    }

    print("Testing Normal Order...")
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=payload_normal)
        print(f"Status: {resp.status_code}")
        if resp.status_code == 200:
            data = resp.json()
            print(f"Total: {data.get('total')}")
            assert data.get('total') == 329, f"Expected 329, got {data.get('total')}"
        else:
            print(resp.text)

    print("\nTesting Discount Order (CALOHA)...")
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=payload_discount)
        print(f"Status: {resp.status_code}")
        if resp.status_code == 200:
            data = resp.json()
            print(f"Total: {data.get('total')}")
            # 329 * 0.9 = 296.1 -> int(296)
            expected = int(329 * 0.9)
            assert data.get('total') == expected, f"Expected {expected}, got {data.get('total')}"
            print("SUCCESS: 10% Discount Applied!")
        else:
            print(resp.text)

if __name__ == "__main__":
    asyncio.run(test_integration())
