# Deploy Hotfix Script
# This script aggressively cleans Docker resources and rebuilds the application to ensure the latest code is deployed.

Write-Host "Starting Aggressive Rebuild Protocol..." -ForegroundColor Cyan

# 1. Stop existing containers
Write-Host "Stopping containers..." -ForegroundColor Yellow
docker-compose down

# 2. Prune system (stopped containers, unused networks, etc.)
Write-Host "Pruning Docker system (forcing cleanup)..." -ForegroundColor Yellow
docker system prune -f

# 3. Prune builder cache (This is critical for Next.js builds)
Write-Host "Pruning Docker builder cache..." -ForegroundColor Yellow
docker builder prune -f

# 4. Build with no-cache to ensure fresh layers
Write-Host "Building containers with --no-cache..." -ForegroundColor Yellow
docker-compose build --no-cache

# 5. Start the application
Write-Host "Starting application..." -ForegroundColor Green
docker-compose up -d

Write-Host "Deployment Complete! Please check the footer for 'v2.1 (Hotfix Live)'." -ForegroundColor Cyan
