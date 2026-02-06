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

# 3. SMART PRUNE LOGIC
# Check available space on / (root) in 1K blocks
AVAILABLE_SPACE=$(df -P / | awk 'NR==2 {print $4}')
# Threshold: 2GB in 1K blocks = 2097152
THRESHOLD=2097152

if [[ "$1" == "--nuclear" ]]; then
    echo "☢️ NUCLEAR MODE REQUESTED via flag. Wiping everything..."
    echo "🧹 Pruning System (Images, Containers, Networks)..."
    docker system prune -a -f
    echo "🧹 Pruning Build Cache..."
    docker builder prune -a -f
elif [ "$AVAILABLE_SPACE" -lt "$THRESHOLD" ]; then
    echo "⚠️ LOW DISK SPACE DETECTED (<2GB). Engaging Nuclear Prune to prevent ENOSPC..."
    echo "🧹 Pruning System (Images, Containers, Networks)..."
    docker system prune -a -f
    echo "🧹 Pruning Build Cache..."
    docker builder prune -a -f
else
    echo "✨ HEALTHY DISK SPACE DETECTED. Using SMART PRUNE (Preserving Build Cache)..."
    echo "   Only removing stopped containers and dangling images."
    # Only remove Stopped containers and Dangling images. KEEP build cache.
    docker system prune -f 
fi

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
