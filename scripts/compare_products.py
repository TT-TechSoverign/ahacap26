import json
import os

live_path = 'live_content.json'
local_path = r'apps\api\content\products_seed.json'

with open(live_path, 'r', encoding='utf-8') as f:
    live_data = {p['id']: p for p in json.load(f)}

with open(local_path, 'r', encoding='utf-8') as f:
    local_data = {p['id']: p for p in json.load(f)}

diff_report = []

all_ids = set(live_data.keys()).union(set(local_data.keys()))

for pid in all_ids:
    if pid not in local_data:
        diff_report.append(f"NEW PRODUCT ADDED BY CEO: ID {pid} - {live_data[pid].get('name')}")
    elif pid not in live_data:
        diff_report.append(f"PRODUCT DELETED BY CEO: ID {pid} - {local_data[pid].get('name')}")
    else:
        live_p = live_data[pid]
        local_p = local_data[pid]
        
        changes = []
        for key in live_p.keys():
            if key in ['created_at', 'updated_at', 'brandId']: continue # Ignore timestamps
            
            # Simple check for simple types, need careful check for dicts/lists
            if live_p.get(key) != local_p.get(key):
                # if json encoding differs
                if json.dumps(live_p.get(key)) != json.dumps(local_p.get(key)):
                    changes.append(f"   - {key}: '{local_p.get(key)}' -> '{live_p.get(key)}'")
                    
        if changes:
            diff_report.append(f"EDITED PRODUCT: ID {pid} - {live_p.get('name')}")
            diff_report.extend(changes)

if diff_report:
    print("=== LIVE EDITS DISCOVERED ===")
    for line in diff_report:
        print(line)
else:
    print("NO DIFFERENCES FOUND between the live server and local seed file.")
