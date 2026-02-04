#!/bin/bash

# Force Redeploy Protocol (Nuclear Option for Disk Space)
echo "🔥 Initiating Force Redeploy (Nuclear Mode)..."

# 1. Pull latest changes
echo "📥 Pulling latest from staging..."
git pull origin staging

# 2. Stop all running containers to release image locks
echo "🛑 Stopping all containers..."
docker compose down

# 3. Prune EVERYTHING except volumes (Images, Containers, Networks)
# This is critical for the "No space left on device" error
echo "🧹 Pruning system (Images, Containers, Networks)..."
echo "build cache..."
docker builder prune -af
echo "system..."
docker system prune -af

# 4. Rebuild and Start
echo "🏗️  Rebuilding and Starting..."
docker compose up -d --build

# 5. Final Status
echo "✅ Redeploy Complete!"
docker ps
