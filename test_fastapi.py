from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()

@app.post("/login")
async def login(payload: dict):
    return payload

client = TestClient(app)
response = client.post("/login", json={"email": "admin", "password": "pass"})
print("Status:", response.status_code)
print("Response:", response.json())
