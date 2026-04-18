import json

files = [
    'apps/api/content_seed.json',
    'apps/web/lib/content/content.json',
    'apps/web/lib/content/content.json.LIVE'
]

hero_image = "/assets/hero-cards/window-ac-cleaning-ba-1.png"
phase_images = [
    "/assets/hero-cards/window-ac-removal-casing-schematic.jpg",
    "/assets/hero-cards/window-ac-cleaning-foam-800x800.png",
    "/assets/hero-cards/window-ac-drain-pan-blower-wheel-cleaning-800x800x.png",
    "/assets/hero-cards/window-ac-drain-pan-blower-wheel-cleaning-800x800x-2.png"
]

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # update hero
        if 'window_ac' in data and 'hero' in data['window_ac']:
            data['window_ac']['hero']['image'] = hero_image
        
        # update phases
        if 'window_ac' in data and 'phases' in data['window_ac']:
            for i, phase in enumerate(data['window_ac']['phases']):
                if i < len(phase_images):
                    phase['image'] = phase_images[i]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Updated images in {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")
