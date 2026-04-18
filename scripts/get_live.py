import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://affordablehome-ac.com/api/v1/products?limit=1000"
try:
    with urllib.request.urlopen(url, context=ctx) as response:
        data = response.read().decode('utf-8')
        json_data = json.loads(data)
        
    with open('live_content.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=4)
        print(f"Successfully saved {len(json_data)} products to live_content.json")
except Exception as e:
    print(f"Error fetching: {e}")
