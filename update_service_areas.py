import json
import os

files = [
    'apps/api/content_seed.json',
    'apps/web/lib/content/content.json',
    'apps/web/lib/content/content.json.LIVE'
]

new_regions = [
    {
        "id": "central",
        "title": "Central Oahu",
        "icon": "Map",
        "cities": [
            {
                "name": "Aiea",
                "icon": "Home",
                "description": "Expert cooling care in Aiea covers high-quality Mini Split AC installation and routine cleaning. Technicians also handle fast Window AC installation and deep cleaning to keep units running well. These services ensure every home stays comfortable and energy efficient."
            },
            {
                "name": "Pearl City",
                "icon": "Building",
                "description": "Residents here rely on professional Mini Split AC retrofits and specialized maintenance cleanings. Our team also provides Window AC installation and thorough cleaning for local houses and apartments. Complete air care keeps every cooling system strong against the Hawaii heat."
            },
            {
                "name": "Mililani",
                "icon": "Trees",
                "description": "Cool upland air stays fresh with expert Mini Split AC installation and deep cleaning help. We also offer Window AC installation and cleaning to maintain perfect temperatures in every room. From new retrofits to basic service, your home stays healthy and chill."
            },
            {
                "name": "Waipio Gentry",
                "icon": "Users",
                "description": "This community enjoys premium Mini Split AC retrofits and regular system cleaning. Expert Window AC installation and deep cleaning are also available for all residential units. Proper care ensures your cooling equipment lasts for many years to come."
            },
            {
                "name": "Waikele",
                "icon": "ShoppingBag",
                "description": "Quality service near the shops includes Mini Split AC installation and professional cleaning. The team also specializes in Window AC installation and cleaning to stop dust from building up. These cooling options keep your home environment clean and quiet."
            }
        ]
    },
    {
        "id": "metro",
        "title": "Metro Honolulu",
        "icon": "Building2",
        "cities": [
            {
                "name": "Honolulu",
                "icon": "Building2",
                "description": "Fast city service features elite Mini Split AC installation and routine cleaning. We also perform Window AC installation and cleaning for city homes and high-rises. New retrofits and deep maintenance keep the urban heat away from your living space."
            },
            {
                "name": "Kalihi",
                "icon": "Factory",
                "description": "Local cooling support includes strong Mini Split AC installation and thorough system cleaning. Residents can also book Window AC installation and deep cleaning to improve air flow. Reliable retrofits help every business and home stay productive and cool."
            },
            {
                "name": "Manoa",
                "icon": "CloudRain",
                "description": "Valley homes stay dry with specialized Mini Split AC installation and cleaning. We also provide Window AC installation and cleaning to protect against moisture and mold. These full-service cooling choices keep your indoor air fresh and healthy."
            },
            {
                "name": "Kaimuki",
                "icon": "Store",
                "description": "Iconic homes get modern Mini Split AC retrofits and deep maintenance cleaning. Professional Window AC installation and cleaning are also key to preserving older units. Complete care helps your cooling system run smoothly in this classic neighborhood."
            },
            {
                "name": "Hawaii Kai",
                "icon": "Waves",
                "description": "Marina-side homes stay protected with salt-resistant Mini Split AC installation and cleaning. We also offer Window AC installation and cleaning to stop rust and clogs. Premium retrofits ensure your system survives the coastal island air."
            },
            {
                "name": "Salt Lake",
                "icon": "Coins",
                "description": "Rapid cooling help includes efficient Mini Split AC installation and routine cleaning. Local technicians also provide Window AC installation and cleaning for every type of home. These service options keep your air cold and your electric bills low."
            },
            {
                "name": "Aina Haina",
                "icon": "Anchor",
                "description": "Oceanside properties receive top-tier Mini Split AC installation and detailed cleaning. Our experts also handle Window AC installation and cleaning to fight off the salt air. Specialized retrofits keep your cooling unit powerful and reliable."
            },
            {
                "name": "Kahala",
                "icon": "Gem",
                "description": "Elite HVAC care focuses on premium Mini Split AC installation and deep cleaning. We also deliver Window AC installation and cleaning for total home comfort. Every retrofit is designed to provide perfect air quality and quiet operation."
            },
            {
                "name": "McCully",
                "icon": "Car",
                "description": "Dense city living stays chill with rapid Mini Split AC installation and cleaning. We also offer Window AC installation and cleaning to handle the midday sun. Professional maintenance ensures your unit stays strong even on the hottest days."
            },
            {
                "name": "Makiki",
                "icon": "MapPin",
                "description": "Central residents enjoy quiet Mini Split AC retrofits and professional cleaning. Our team also performs Window AC installation and cleaning for total reliability. Consistent service keeps your home air fresh and your system running right."
            }
        ]
    },
    {
        "id": "leeward",
        "title": "Leeward",
        "icon": "Sun",
        "cities": [
            {
                "name": "Kapolei",
                "icon": "Sun",
                "description": "The Second City stays cool with modern Mini Split AC installation and deep cleaning. We also provide expert Window AC installation and cleaning for new and old homes. These full-service retrofits keep the West side heat out of your house."
            },
            {
                "name": "Ewa Beach",
                "icon": "Umbrella",
                "description": "Sunny coastal homes get extra care with Mini Split AC installation and cleaning. We also specialize in Window AC installation and cleaning to combat the salt and dust. Proper retrofits ensure your cooling stays strong for the whole family."
            },
            {
                "name": "Waipahu",
                "icon": "Wrench",
                "description": "Our home-base service features professional Mini Split AC installation and routine cleaning. Local residents can also rely on us for Window AC installation and cleaning. From deep maintenance to new retrofits, we keep your air perfect."
            },
            {
                "name": "Kunia",
                "icon": "Mountain",
                "description": "Ridge homes stay comfortable with reliable Mini Split AC installation and cleaning. We also offer Window AC installation and cleaning to handle the intense mountain sun. Quality retrofits keep your cooling system efficient and cold."
            }
        ]
    },
    {
        "id": "windward",
        "title": "Windward & North",
        "icon": "Wind",
        "cities": [
            {
                "name": "Kailua",
                "icon": "Waves",
                "description": "Beachside living is improved with salt-ready Mini Split AC installation and cleaning. We also provide Window AC installation and cleaning to prevent damage from the sea air. These complete retrofits keep your home healthy and your unit clean."
            },
            {
                "name": "Kaneohe",
                "icon": "Umbrella",
                "description": "Bay-area homes stay dry with specialized Mini Split AC installation and cleaning. Our technicians also perform Window AC installation and cleaning to stop mold growth. Reliable retrofits ensure your cooling system stays quiet and powerful."
            },
            {
                "name": "Kahaluu",
                "icon": "Leaf",
                "description": "Tropical coastal homes get expert Mini Split AC installation and routine cleaning. We also provide Window AC installation and cleaning for the best air quality. Regular maintenance keeps your system running well in the lush island air."
            }
        ]
    }
]

for file_path in files:
    try:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if 'landing_legacy' in data and 'service_areas' in data['landing_legacy']:
                data['landing_legacy']['service_areas']['regions'] = new_regions
                
                # Check if navigation links exist and append Service Areas if missing
                if 'navigation' in data and 'links' in data['navigation']:
                    links = data['navigation']['links']
                    has_service_areas = any(link.get('href') == '/service-areas' for link in links)
                    if not has_service_areas:
                        links.append({
                            "text": "Service Areas",
                            "href": "/service-areas"
                        })
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Successfully updated Regions and Navigation in {file_path}")
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
