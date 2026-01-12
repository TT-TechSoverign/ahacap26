import requests
import time
import sys

def check_endpoint(url, name, retries=10, delay=5):
    print(f"Checking {name} at {url}...")
    for i in range(retries):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"[SUCCESS] {name} is up! Status: {response.status_code}")
                return True
            else:
                print(f"[WARNING] {name} returned {response.status_code}. Retrying ({i+1}/{retries})...")
        except requests.exceptions.ConnectionError:
            print(f"[WAITING] {name} connection refused. Retrying ({i+1}/{retries})...")
        time.sleep(delay)
    
    print(f"[FAILURE] {name} failed to respond after {retries * delay} seconds.")
    return False

if __name__ == "__main__":
    api_health = check_endpoint("http://localhost:8000/api/v1/health", "API Health")
    web_health = check_endpoint("http://localhost:3000", "Web Interface") # Web doesn't have /health, just check root

    if api_health and web_health:
        print("\nAll systems operational.")
        sys.exit(0)
    else:
        print("\nSystem verification failed.")
        sys.exit(1)
