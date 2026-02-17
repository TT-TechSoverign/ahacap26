
import asyncio
import os
import sys
import json
from datetime import datetime

# Ensure we can import from the app directory
sys.path.append('/app')

from sqlalchemy.future import select
from database import AsyncSessionLocal
import models

async def debug_admin():
    print("🔍 DIAGNOSING ADMIN SCHEDULE UPDATE...")
    print(f"   DATABASE_URL: {os.environ.get('DATABASE_URL')}")
    
    path = "/"
    
    try:
        async with AsyncSessionLocal() as session:
            print("   ✅ Connected to Database.")
            
            # 1. Fetch Page
            print(f"   Fetching ContentPage for path='{path}'...")
            result = await session.execute(select(models.ContentPage).where(models.ContentPage.path == path))
            page = result.scalars().first()
            
            if not page:
                print("   ⚠️  Page not found! (This triggers the creation logic)")
            else:
                print(f"   ✅ Page Found. ID: {page.path}")
                print(f"   Current Data Length: {len(page.data) if page.data else 0}")
                
                # 2. Test JSON Decode
                try:
                    if page.data:
                        current_data = json.loads(page.data)
                        print("   ✅ JSON Decode Successful.")
                    else:
                        print("   ℹ️  Data is None/Empty.")
                except Exception as e:
                    print(f"   ❌ JSON DECODE FAILED: {e}")
                    
            # 3. Simulate Update
            print("   Simulating Update...")
            try:
                # Mock Payload
                fake_schedule = {
                    "mini_split_label": "TEST",
                    "window_ac_label": "TEST",
                    "mini_split_estimate_date": "Jan 1-5",
                    "mini_split_install_date": "Jan 1-5",
                    "window_ac_estimate_date": "Jan 1-5",
                    "window_ac_install_date": "Jan 1-5"
                }
                
                if not page:
                    print("   Creating NEW page object...")
                    # logic from admin.py
                    data_str = json.dumps({"footer_schedule": fake_schedule})
                    new_page = models.ContentPage(path=path, data=data_str, draft_data=data_str)
                    session.add(new_page)
                    # Don't actually commit to avoid messing up prod data, just flush
                    # await session.flush()
                    print("   ✅ Creation Logic OK (Dry Run)")
                else:
                    print("   Updating EXISTING page object...")
                    data = json.loads(page.data) if page.data else {}
                    data['footer_schedule'] = fake_schedule
                    updated_json = json.dumps(data)
                    page.data = updated_json
                    page.draft_data = updated_json
                    page.updated_at = datetime.utcnow()
                    print("   ✅ Update Logic OK (Dry Run)")
                    
                print("   ✅ DIAGNOSIS COMPLETE: Logic appears sound manually.")
                
            except Exception as e:
                print(f"   ❌ UPDATE SIMULATION FAILED: {e}")
                import traceback
                traceback.print_exc()

    except Exception as e:
        print(f"❌ DATABASE/CONNECTION FATAL ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(debug_admin())
