#!/bin/bash
# V4.1 Enterprise Deployment Script for Affordable Home A/C
# Strict execution flags to prevent cascading failures
set -eEuo pipefail

# Dynamically resolve absolute path
BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
LOG_FILE="${BASE_DIR}/deploy_staging.log"
TARGET_BRANCH="${TARGET_BRANCH:-main}"
DOCKER_PROJECT="ahac_staging"
CPANEL_USER="onjtfnmy"

cd "$BASE_DIR"

# -----------------
# ERROR HANDLING
# -----------------
trap 'echo -e "\n❌ ERROR: Deployment interrupted at LINE $LINENO. Review logs." >&2; exit 1' ERR

# -----------------
# LOGGING (With Rotation)
# -----------------
# Clear log if it exceeds 5MB to prevent infinite bloat on the VPS
if [ -f "$LOG_FILE" ] && [ $(stat -c%s "$LOG_FILE") -ge 5000000 ]; then
    mv "$LOG_FILE" "${LOG_FILE}.old"
fi
exec > >(tee -a "$LOG_FILE") 2>&1

echo "=========================================="
echo "🛡️ Starting SECURE Staging Deployment: $(date)"
echo "Environment: ${TARGET_BRANCH} | Project: ${DOCKER_PROJECT}"
echo "=========================================="

# 0. Nuke Stale WHM Backups (SOP Step 3.3)
echo "🗑️ [1/6] Purging bloated WHM backups to unlock host storage..."
rm -rf /backup/cpbackup/* 2>/dev/null || true

# 1. Pre-Build Deep Cleaning
echo "🧹 [2/6] Purging Docker Cache & Dangling Images..."
# Aggressively prune build cache and ALL unused images from today's failed builds
docker system prune -a -f
docker builder prune -a -f

# 2. Source Code Sync
echo "📥 [2/5] Synchronizing Codebase with $TARGET_BRANCH..."
git fetch origin "$TARGET_BRANCH"
git checkout "$TARGET_BRANCH"
git reset --hard "origin/$TARGET_BRANCH"

chmod 700 deploy_prod.sh force_redeploy.sh 2>/dev/null || true
chmod 700 apps/api/entrypoint.sh 2>/dev/null || true

# 3. Container Orchestration (Clean Build)
echo "🚀 [3/5] Building & Hot-swapping Containers..."
# Force a clean build to prevent corrupted Next.js caches
docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" build --no-cache
# Swap the containers
docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" down --remove-orphans

# [HOTFIX] Clear stale PostgreSQL PID files caused by sudden ENOSPC crashes
echo "🧹 Clearing stale PostgreSQL locks..."
docker run --rm -v ${DOCKER_PROJECT}_staging_postgres_data:/var/lib/postgresql/data alpine rm -f /var/lib/postgresql/data/postmaster.pid 2>/dev/null || true

docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" up -d

# 4. Application Data & Idempotent Seeding
echo "🌱 [4/5] Checking Container Health & Database State..."
echo "Waiting 10 seconds for API and DB boot sequence..."
sleep 10 

# Run database schema migrations
echo "⚙️ Running database schema migrations..."
docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" exec -T staging-api python fix_db_schema.py

# Run product seeding
echo "🍎 Seeding products table..."
docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" exec -T staging-api python seed_products.py

# Check for the marker file to prevent duplicate seeding
if ! docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" exec -T staging-api test -f /app/.seeded_marker 2>/dev/null; then
    echo "🌱 Seeding initial database structure..."
    docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" exec -T staging-api python seed_content.py
    docker compose -f docker-compose.staging.yml -p "$DOCKER_PROJECT" exec -T staging-api touch /app/.seeded_marker
else
    echo "⏭️ Idempotency Check: Seed state already present. Skipping."
fi

# 5. Permission Reset Trap Fix
echo "🔐 [5/5] Reclaiming volume ownership for cPanel user..."
HOST_UID=$(id -u)
HOST_GID=$(id -g)
# Claw back ownership from Docker root to prevent lockouts on the VPS
chown -R $HOST_UID:$HOST_GID ./apps/api/data ./apps/web/.next 2>/dev/null || true

echo "=========================================="
echo "✅ Deployment Audited & Complete: $(date)"
echo "=========================================="