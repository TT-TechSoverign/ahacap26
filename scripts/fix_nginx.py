import re
import subprocess
import sys

def fix_file(filepath, port):
    with open(filepath, 'r') as f:
        content = f.read()

    # Regex pattern matching the location /api/ block for the specified port
    pattern = (
        r"location\s+/api/\s*\{\s*"
        r"proxy_pass\s+http://127\.0\.0\.1:" + port + r"/api/;\s*"
        r"proxy_http_version\s+1\.1;\s*"
        r"proxy_set_header\s+Upgrade\s+\$http_upgrade;\s*"
        r"proxy_set_header\s+Connection\s+['\"]upgrade['\"];\s*"
        r"proxy_set_header\s+Host\s+\$host;\s*"
        r"proxy_cache_bypass\s+\$http_upgrade;\s*"
        r"\}"
    )

    replacement = f"""location /api/v1/ {{
        proxy_pass http://127.0.0.1:{port}/api/v1/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }}

    location /api/webhooks/ {{
        proxy_pass http://127.0.0.1:{port}/api/webhooks/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }}"""

    if re.search(pattern, content):
        new_content = re.sub(pattern, replacement, content)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Successfully updated {filepath}")
    else:
        if "location /api/v1/" in content:
            print(f"Already updated or location /api/v1/ found in {filepath}")
        else:
            print(f"Warning: pattern not found in {filepath}. Attempting simple string replacement.")
            # Fallback simple string replacement
            target_str = f"""    location /api/ {{
        proxy_pass http://127.0.0.1:{port}/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }}"""
            if target_str in content:
                new_content = content.replace(target_str, replacement)
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Successfully updated {filepath} via direct string match.")
            else:
                print(f"Error: Could not update Nginx configuration in {filepath}")

def main():
    fix_file('/etc/nginx/sites-available/staging.affordablehome-ac.com.conf', '8002')
    fix_file('/etc/nginx/sites-available/ahac', '8001')

    # Test nginx
    res = subprocess.run(['nginx', '-t'], capture_output=True, text=True)
    if res.returncode != 0:
        print("Nginx configuration test failed!")
        print(res.stderr)
        sys.exit(1)
    
    # Reload nginx
    subprocess.run(['systemctl', 'reload', 'nginx'])
    print("Nginx reloaded successfully!")

if __name__ == '__main__':
    main()
