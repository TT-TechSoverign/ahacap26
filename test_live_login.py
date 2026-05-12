import urllib.request
import urllib.error
import json

url = "https://crm.affordablehome-ac.com/api/v1/auth/login"
data = json.dumps({"email": "admin@affordablehome-ac.com", "password": "TerasightV4_Ahac_2026!"}).encode("utf-8")
headers = {"Content-Type": "application/json"}

req = urllib.request.Request(url, data=data, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as response:
        print("Status:", response.status)
        print("Body:", response.read().decode("utf-8"))
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code)
    print("Error Body:", e.read().decode("utf-8"))
except Exception as e:
    print("Error:", e)
