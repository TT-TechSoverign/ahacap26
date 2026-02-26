#!/bin/bash

# Define the log file
# Define the log file
# Define the log file
LOG_FILE="deploy_prod.log"
# Standard redirection (portable) - output goes to log file only
exec >> "$LOG_FILE" 2>&1
echo "Logging to $LOG_FILE"


echo "=========================================="
echo "Starting AHC Production Deployment: $(date)"
echo "=========================================="

# Ensure we are in the right directory
cd "$(dirname "$0")"

# 1. Fetch Latest Code from Main
echo "Fetching latest changes from origin/main..."
git fetch origin main
echo "🔍 [1/5] Checking Disk Space..."
USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//g')
THRESHOLD=80

if [[ "$1" == "--nuclear" ]]; then
    echo "☢️  NUCLEAR MODE ACTIVATED: Forcing aggressive cleanup..."
    USAGE=100
fi

if [ "$USAGE" -gt "$THRESHOLD" ]; then
    echo "⚠️  Disk usage is HIGH ($USAGE%). Initiating CLEAN RELEASE Protocol..."
    echo "🛑 [1.1] Stopping Containers to Release Locks..."
    docker compose -f docker-compose.prod.yml -p ahac_prod down --remove-orphans || true
    echo "🧹 [1.2] Pruning ALL Images & Build Cache..."
    docker system prune -a -f
    docker builder prune -a -f
    echo "✅ Disk Space Reclaimed."
else
    echo "✅ Disk usage is safe ($USAGE%). Proceeding with standard update..."
fi

# 1.75. Pull Latest Code (Now that we have space)
git fetch origin main
git checkout main
git reset --hard origin/main

# 2. Fix Permissions (Crucial for scripts)
echo "Fixing permissions..."
chmod +x deploy_prod.sh
chmod +x force_redeploy.sh
chmod +x apps/api/entrypoint.sh 2>/dev/null || true

# 3. Build and Deploy Production Containers
echo "Building and deploying production containers..."
# Force kill any conflicting containers that might be orphaned from other projects
docker rm -f prod-redis prod-db prod-api prod-web 2>/dev/null || true
docker compose -f docker-compose.prod.yml -p ahac_prod up -d --build --remove-orphans

# 4. Prune Unused Images to Save Space
echo "Cleaning up old images..."
docker image prune -a -f --filter "until=24h"

# 5. Seed Content Database
echo "Seeding Production Content Database..."
docker compose -f docker-compose.prod.yml -p ahac_prod exec -T prod-api python seed_content.py

echo "=========================================="
echo "Production Deployment Complete: $(date)"
echo "App running on Port 3001"
echo "API running on Port 8001"
echo "=========================================="
