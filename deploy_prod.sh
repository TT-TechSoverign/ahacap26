#!/bin/bash

# Define the log file
LOG_FILE="deploy_prod.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "=========================================="
echo "Starting AHC Production Deployment: $(date)"
echo "=========================================="

# Ensure we are in the right directory
cd "$(dirname "$0")"

# 1. Fetch Latest Code from Main
echo "Fetching latest changes from origin/main..."
git fetch origin main
git checkout main
git pull origin main

# 2. Fix Permissions (Crucial for scripts)
echo "Fixing permissions..."
chmod +x deploy_prod.sh
chmod +x force_redeploy.sh
chmod +x apps/api/entrypoint.sh 2>/dev/null || true

# 3. Build and Deploy Production Containers
echo "Building and deploying production containers..."
docker compose -f docker-compose.prod.yml -p ahac_prod up -d --build --remove-orphans

# 4. Prune Unused Images to Save Space
echo "Cleaning up old images..."
docker image prune -a -f --filter "until=24h"

echo "=========================================="
echo "Production Deployment Complete: $(date)"
echo "App running on Port 3001"
echo "API running on Port 8001"
echo "=========================================="
