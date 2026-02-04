#!/bin/bash

echo "🔥 Initiating Force Redeploy Protocol..."

# 1. Pull latest changes
echo "📥 Pulling latest from staging..."
git pull origin staging

# 2. Force Rebuild Web Container (No Cache)
echo "🏗️  Rebuilding 'web' container (Cache Busted)..."
docker compose build --no-cache web

# 3. Restart Services
echo "🚀 Restarting services..."
docker compose up -d

# 4. Cleanup
echo "🧹 Pruning dangling images..."
docker image prune -f

echo "✅ Force Redeploy Complete!"
