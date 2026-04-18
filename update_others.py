import json

def update_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-16le') as f:
            data = json.load(f)
    except:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

    updates = {
        'LW6023IVSM': {'price': 560, 'stock': 'IN STOCK'},
        'LW8022IVSM': {'price': 595, 'stock': 'IN STOCK'},
        'LW1022IVSM': {'price': 650, 'stock': 'OUT OF STOCK'},
        'LW1222IVSM': {'price': 745, 'stock': 'IN STOCK'},
        'LW1522IVSM': {'price': 785, 'stock': 'IN STOCK'},
        'LW1822IVSM': {'price': 925, 'stock': 'IN STOCK'},
        'LW2422IVSM': {'price': 1025, 'stock': 'IN STOCK'},
        'LW8023HRSM': {'price': 650, 'stock': 'IN STOCK'},
        'LW1823HRSM': {'price': 925, 'stock': 'IN STOCK'},
        'LW2423HRSM': {'price': 1025, 'stock': 'OUT OF STOCK'},
        'LW8024RD': {'price': 395, 'stock': 'IN STOCK'},
        'LW1217ERSM1': {'price': 625, 'stock': 'IN STOCK'},
        'AJCQ08AWJ': {'price': 1000, 'stock': 'IN STOCK'},
        'AJCQ10AWJ': {'price': 1100, 'stock': 'IN STOCK'},
        'AJCQ12AWJ': {'price': 1200, 'stock': 'IN STOCK'},
        'RAB26A': {'price': 275, 'stock': 'IN STOCK'},
    }

    for item in data:
        for model, fields in updates.items():
            if model in item.get('name', ''):
                item['price'] = fields['price']
                if fields['stock'] == 'OUT OF STOCK':
                    item['stock'] = 0
                elif fields['stock'] == 'IN STOCK':
                    if item['stock'] == 0:
                        item['stock'] = 10
                break

    try:
        with open(filepath, 'w', encoding='utf-16le') as f:
            json.dump(data, f, indent=4)
    except:
        print("Failed to save " + filepath)

for fp in ['products.json', 'products_final.json']:
    try:
        update_file(fp)
    except Exception as e:
        print("Skipped " + fp + ": " + str(e))
