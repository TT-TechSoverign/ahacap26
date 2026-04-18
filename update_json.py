import json

def update_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'mini_split_ac_maintenance' in data and 'window_ac' not in data:
            import copy
            window_ac_data = copy.deepcopy(data['mini_split_ac_maintenance'])
            window_ac_data['hero_basic']['title'] = "Basic Window AC Cleaning"
            window_ac_data['hero_premium']['title'] = "Premium Window AC Cleaning"
            data['window_ac'] = window_ac_data
            
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Updated {filepath}")
        else:
            print(f"Skipped {filepath} - data already exists or missing source key")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

files = [
    'apps/api/content_seed.json',
    'apps/web/lib/content/content.json',
    'apps/web/lib/content/content.json.LIVE'
]

for file in files:
    update_file(file)
