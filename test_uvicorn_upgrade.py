import urllib.request
import urllib.error

req = urllib.request.Request("http://127.0.0.1:8000/api/v1/health", method="POST", headers={"Connection": "upgrade"})
try:
    with urllib.request.urlopen(req) as response:
        print(response.read())
except Exception as e:
    print(f"ERROR: {e}")
