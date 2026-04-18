import json

files = [
    'apps/api/content_seed.json',
    'apps/web/lib/content/content.json',
    'apps/web/lib/content/content.json.LIVE'
]

new_desc = "Thoroughly cleaning the blower wheel, compressor, motor, and evaporator coil restores peak efficiency. Clear drain holes prevent water from leaking into the home, while cleaning the bottom pan removes all hidden dirt and clogs."

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'window_ac' in data and 'phases' in data['window_ac']:
            # Find phase 3 (id: phase3)
            for phase in data['window_ac']['phases']:
                if phase['id'] == 'phase3':
                    phase['description'] = new_desc
                    break
                    
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")
