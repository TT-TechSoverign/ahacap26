#!/bin/bash
set -e

# ==========================================
# 🚀 AHAC Safe-Redeploy Protocol (V3)
# ==========================================
# Unified command to handle:
# 1. Low Disk Space (Auto-Clean Release)
# 2. Latest Code Pull
# 3. Cache Busting (if needed)
# 4. Product Seeding (Data Persistence)
# ==========================================

echo "🔍 [1/6] Checking Disk Space..."
# Get usage percentage of root partition (removes % sign)
USAGE=$(df / | grep / | awk '{ print $5 }' | sed 's/%//g')
THRESHOLD=80

if [ "$USAGE" -gt "$THRESHOLD" ]; then
    echo "⚠️  Disk usage is HIGH ($USAGE%). Initiating CLEAN RELEASE Protocol..."
    
    echo "🛑 [1.1] Stopping Containers to Release Locks..."
    docker compose down
    
    echo "🧹 [1.2] Pruning ALL Images & Build Cache (Protecting Volumes)..."
    # -a: All unused images
    # --volumes: explicitly OMITTED to protect DB data in named volumes
    docker system prune -a -f
    docker builder prune -a -f
    
    echo "✅ Disk Space Reclaimed."
else
    echo "✅ Disk usage is safe ($USAGE%). Proceeding with standard update..."
fi

echo "📥 [2/6] Syncing Code (Hard Reset)..."
# Fetch latest changes
git fetch origin staging

# Force reset to match remote (Destructive but necessary for verified deployment)
# This prevents "merge conflict" errors if files were touched on the server
git reset --hard origin/staging

echo "🔧 [3/6] Fixing Permissions (Persistence Layer)..."
mkdir -p apps/web/lib/content
mkdir -p apps/web/storage
chmod -R 777 apps/web/lib/content
chmod -R 777 apps/web/storage

echo "🏗️  [4/6] Building & Starting Containers..."
# --build: Always force build to pick up new code
# -d: Detached mode
docker compose up -d --build

echo "⏳ [5/6] Waiting for API Healthcheck..."
# Wait for API to be ready before seeding
# Simple retry loop
MAX_RETRIES=30
COUNT=0
URL="http://localhost:8000/api/v1/health"

while [ $COUNT -lt $MAX_RETRIES ]; do
    if curl -s "$URL" | grep -q "ok"; then
        echo "✅ API is Healthy!"
        break
    fi
    echo "zzz Waiting for API ($COUNT/$MAX_RETRIES)..."
    sleep 2
    COUNT=$((COUNT+1))
done

if [ $COUNT -eq $MAX_RETRIES ]; then
    echo "❌ API failed to start in time. Check logs: docker compose logs api"
    exit 1
fi

echo "🌱 [6/6] Seeding Product Data..."
# Run the seeder inside the container
docker compose exec api python seed_products.py

echo "🎉 DEPLOYMENT COMPLETE & VERIFIED!"
echo "   - Code Updated"
echo "   - Containers Running"
echo "   - Database Seeded"
echo "   - Check: https://staging.affordablehome-ac.com/shop"
