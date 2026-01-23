import os
import re

directory = "apps/web/public/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000"
files = ["AJCQ08AWJ.svg", "AJCQ10AWJ.svg", "AJCQ12AWJ.svg"]

for filename in files:
    path = os.path.join(directory, filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove white background rectangles
        cleaned = re.sub(r'<rect [^>]*fill="#FFFFFF"[^>]*/>', '', content)
        cleaned = re.sub(r'<rect [^>]*fill="white"[^>]*/>', '', cleaned)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(cleaned)
        print(f"Cleaned {filename}")
    else:
        print(f"File not found: {filename}")
