import requests
import json

url = "http://localhost:8000/api/v1/orders"
payload = {
    "items": [
        {
            "product_id": 1,
            "name": "Test Product",
            "category": "SPLIT_AIR",
            "quantity": 1
        }
    ],
    "customer_email": "debug@test.com",
    "shipping_method": "PICKUP_AIEA"
}

try:
    print(f"Sending POST to {url}...")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
