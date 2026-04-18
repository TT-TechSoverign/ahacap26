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
            
            if 'navigation' in data and 'links' in data['navigation']:
                for link in data['navigation']['links']:
                    if 'SERVICE AREAS' in link.get('text', '').upper():
                        link['href'] = '/service-areas'
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Fixed {file_path}")
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
