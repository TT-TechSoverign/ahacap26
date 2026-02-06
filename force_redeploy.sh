#!/bin/bash

# Force Redeploy Protocol (Nuclear Mode V2)
# Updated to aggressively clear Build Cache for "No space left on device" errors.

echo "🔥 Initiating Force Redeploy (Nuclear Mode V2)..."

# 0. Pre-Pull Cleanup (In case disk is too full to even pull)
# We try to remove dangling images first to free up space for the pull
docker image prune -f || true

# 1. Pull latest changes
echo "📥 Pulling latest from staging..."
git pull origin staging

# 1.5. Fix Permissions (Crucial for Content Persistence)
# Ensure the content directory is owned by the container user (UID 1001)
# or is world-writable so the container can update it.
echo "🔧 Fixing permissions for apps/web/lib/content..."
mkdir -p apps/web/lib/content
chown -R 1001:1001 apps/web/lib/content || echo "⚠️  Could not chown (might need root). Trying chmod..."
chmod -R 777 apps/web/lib/content

echo "🔧 Fixing permissions for apps/web/storage..."
mkdir -p apps/web/storage
chown -R 1001:1001 apps/web/storage || echo "⚠️  Could not chown (might need root). Trying chmod..."
chmod -R 777 apps/web/storage

# 2. Stop all running containers
echo "🛑 Stopping all containers..."
docker compose down

# 3. AGGRESSIVE PRUNE
# -a: Remove all unused images not just dangling ones
# -f: Force
echo "🧹 Pruning System (Images, Containers, Networks)..."
docker system prune -a -f

# 4. PRUNE BUILD CACHE (Critical for Space Issues)
echo "🧹 Pruning Build Cache..."
docker builder prune -a -f

# 5. Check Disk Space (Log it)
echo "💾 Disk Space Check:"
df -h

# 6. Rebuild and Start
echo "🚀 Rebuilding and Starting..."
docker compose up -d --build

# 7. Final Prune (Cleanup after build to remove intermediate layers)
echo "✨ Final Cleanup..."
docker image prune -f

echo "✅ Redeploy Complete!"
