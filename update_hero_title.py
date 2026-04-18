import json
import os

files = [
    'apps/api/content_seed.json',
    'apps/web/lib/content/content.json',
    'apps/web/lib/content/content.json.LIVE'
]

for file_path in files:
    try:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # update title
            if 'window_ac' in data and 'hero' in data['window_ac']:
                data['window_ac']['hero']['title'] = "Deep Cleaning"
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Updated title in {file_path}")
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
