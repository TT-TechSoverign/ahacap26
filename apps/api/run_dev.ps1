$env:DATABASE_URL="postgresql+asyncpg://user:password@localhost:5432/ahac_db"
python -m uvicorn main:app --reload --port 8001
