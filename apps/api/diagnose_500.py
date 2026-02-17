
import asyncio
import os
import sys

# Ensure we can import from the app directory
sys.path.append('/app')

from sqlalchemy.future import select
from database import AsyncSessionLocal
import models
import schemas
from pydantic import ValidationError

async def diagnose():
    print("🔍 DIAGNOSING PRODUCT FETCH...")
    print(f"   DATABASE_URL: {os.environ.get('DATABASE_URL')}")
    
    try:
        async with AsyncSessionLocal() as session:
            print("   ✅ Connected to Database.")
            result = await session.execute(select(models.Product))
            products = result.scalars().all()
            print(f"   ✅ Found {len(products)} products in DB.")
            
            for p in products:
                print(f"   Checking Product ID {p.id}: {p.name}...")
                
                # Check for NULLs in required fields
                if p.price is None:
                    print(f"      ❌ CRITICAL: 'price' is None!")
                if p.stock is None:
                    print(f"      ❌ CRITICAL: 'stock' is None!")
                if p.category is None:
                    print(f"      ❌ CRITICAL: 'category' is None!")
                
                try:
                    # Try to convert to Pydantic model exactly like FastAPI does
                    # Attempt V2 syntax first, failover to V1 if needed
                    try:
                        schemas.Product.model_validate(p)
                    except AttributeError:
                        schemas.Product.from_orm(p)
                        
                    print("      ✅ Schema Validation Passed")
                except ValidationError as e:
                    print(f"      ❌ VALIDATION ERROR for ID {p.id}:")
                    print(e)
                except Exception as e:
                    print(f"      ❌ UNEXPECTED ERROR for ID {p.id}: {e}")

    except Exception as e:
        print(f"❌ CONNECTION FAILED: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(diagnose())
