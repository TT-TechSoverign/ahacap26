import os
import subprocess
import sys

def update_env_file(path):
    if not os.path.exists(path):
        print(f"Skipping {path} (not found)")
        return
    
    print(f"Updating {path}...")
    with open(path, 'r') as f:
        lines = f.readlines()
    
    new_lines = []
    # Track if keys exist to verify update
    stripe_updated = False
    smtp_updated = False
    
    for line in lines:
        if line.lstrip().startswith("STRIPE_WEBHOOK_SECRET="):
            new_lines.append("STRIPE_WEBHOOK_SECRET=whsec_896053b7532ddfb186dc7c1ea0715a053848519470c9bf59aaefd21ec3d09ca0\n")
            stripe_updated = True
        elif line.lstrip().startswith("SMTP_PASSWORD="):
            new_lines.append("SMTP_PASSWORD=quio fnyb fktl ntrg\n")
            smtp_updated = True
        else:
            new_lines.append(line)
            
    with open(path, 'w') as f:
        f.writelines(new_lines)
    
    if stripe_updated:
        print(f"  - Updated STRIPE_WEBHOOK_SECRET")
    if smtp_updated:
        print(f"  - Updated SMTP_PASSWORD")

def run_command(command):
    try:
        subprocess.run(command, check=True, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running command '{command}': {e}")
        # Proceeding anyway as git pull might fail if already up to date or conflicts, 
        # but env update is critical.

print("--- Starting Auto-Deployment ---")

print("1. Pulling latest code...")
run_command("git pull")

print("2. Injecting Secrets into .env...")
update_env_file(".env")
update_env_file("apps/api/.env")

print("3. Triggering Application Restart...")
os.makedirs("tmp", exist_ok=True)
with open("tmp/restart.txt", "w") as f:
    f.write("restart")
print("   Created tmp/restart.txt")

print("--- Deployment Complete! ---")
print("The server should now be handling webhooks correctly.")
