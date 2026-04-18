import json

new_data = {
    "hero": {
        "title": "Full Deep Cleaning",
        "description": "This complete service covers every part of a window unit. Deep cleaning removes hidden dirt and mold to keep the air fresh. A clean machine runs better and feels like new again.",
        "image": "/assets/placeholder-800x800.png"
    },
    "phases": [
        {
            "id": "phase1",
            "title": "Phase 1: Removal and Disassembly",
            "description": "Safe removal from the window casing starts the process. Technicians take off the metal shell to reach the internal coils and fan. Every wire stays covered or disconnected to keep the electrical parts dry and safe.",
            "image": "/assets/placeholder-1200x800.png"
        },
        {
            "id": "phase2",
            "title": "Phase 2: Deep Cleaning",
            "description": "A specialized soap breaks down stubborn grease and dirt on the coils. Scrubbing the fan assembly gets rid of dust and mold. Fresh water and a germ-killing spray leave the entire unit clean and healthy.",
            "image": "/assets/placeholder-1200x800.png"
        },
        {
            "id": "phase3",
            "title": "Phase 3: Drainage and Clearing",
            "description": "Clear drain holes prevent water from leaking into the home. Cleaning the bottom pan removes all hidden dirt and clogs.",
            "image": "/assets/placeholder-1200x800.png"
        },
        {
            "id": "phase4",
            "title": "Phase 4: Testing and Re-Install",
            "description": "Every part gets dried before the unit goes back together. A full test makes sure the fan and drains work perfectly. The AC then returns to the window for a secure fit.",
            "image": "/assets/placeholder-1200x800.png"
        }
    ]
}

files = [
    'apps/api/content_seed.json',
    'apps/web/lib/content/content.json',
    'apps/web/lib/content/content.json.LIVE'
]

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        data['window_ac'] = new_data
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")
