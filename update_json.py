import json

def update_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'window_ac' in data:
            data['window_ac']['hero_basic']['title'] = "Basic Window AC Cleaning"
            data['window_ac']['hero_premium']['title'] = "Premium Window AC Cleaning"
            
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Updated {filepath}")
        else:
            print(f"Skipped {filepath} - missing window_ac key")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

files = [
    'apps/api/content_seed.json',
    'apps/web/lib/content/content.json',
    'apps/web/lib/content/content.json.LIVE'
]

for file in files:
    update_file(file)
