import requests
import json

try:
    response = requests.get("http://localhost:8000/openapi.json")
    if response.status_code == 200:
        data = response.json()
        found = False
        print("Checking for /api/v1/debug/simulate-payment in openapi.json...")
        for path in data.get("paths", {}):
            if "simulate-payment" in path:
                print(f"FOUND: {path}")
                found = True

        if not found:
            print("NOT FOUND: The route is missing from the running server.")
            print("Registered paths:")
            for path in data.get("paths", {}):
                print(f" - {path}")
    else:
        print(f"Failed to fetch openapi.json: {response.status_code}")
except Exception as e:
    print(f"Connection Error: {e}")
