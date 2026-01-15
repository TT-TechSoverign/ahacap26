
import sys
import os

# Ensure current dir is in path
sys.path.append(os.getcwd())

try:
    from main import app
    print("Successfully imported app from main.")

    found = False
    for route in app.routes:
        print(f"Route: {route.path} [{route.methods if hasattr(route, 'methods') else ''}]")
        if route.path == "/api/v1/payments/create-intent":
            found = True

    if found:
        print("SUCCESS: Payment route found.")
    else:
        print("FAILURE: Payment route NOT found.")

except Exception as e:
    print(f"Import Error: {e}")
