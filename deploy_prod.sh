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

# 1. Source Code Sync
echo "📥 [1/4] Synchronizing Codebase with $TARGET_BRANCH (as $CPANEL_USER)..."
su - "$CPANEL_USER" -c "cd \"$BASE_DIR\" && git fetch origin \"$TARGET_BRANCH\""
su - "$CPANEL_USER" -c "cd \"$BASE_DIR\" && git checkout \"$TARGET_BRANCH\""
su - "$CPANEL_USER" -c "cd \"$BASE_DIR\" && git reset --hard \"origin/$TARGET_BRANCH\""

chmod 700 deploy_prod.sh force_redeploy.sh 2>/dev/null || true
chmod 700 apps/api/entrypoint.sh 2>/dev/null || true

# 2. Container Orchestration (Optimistic Build)
echo "🚀 [2/4] Building & Hot-swapping Containers..."
# Build images first while the site is still up
docker compose -f docker-compose.prod.yml -p "$DOCKER_PROJECT" build
# Swap the containers
docker compose -f docker-compose.prod.yml -p "$DOCKER_PROJECT" down --remove-orphans
docker compose -f docker-compose.prod.yml -p "$DOCKER_PROJECT" up -d

# 3. Application Data & Idempotent Seeding
echo "🌱 [3/4] Checking Container Health & Database State..."
echo "Waiting 10 seconds for API and DB boot sequence..."
sleep 10 

# Check for the marker file to prevent duplicate seeding
if ! docker compose -f docker-compose.prod.yml -p "$DOCKER_PROJECT" exec -T prod-api test -f /app/.seeded_marker 2>/dev/null; then
    echo "🌱 Seeding initial database structure..."
    docker compose -f docker-compose.prod.yml -p "$DOCKER_PROJECT" exec -T prod-api python seed_content.py
    docker compose -f docker-compose.prod.yml -p "$DOCKER_PROJECT" exec -T prod-api touch /app/.seeded_marker
else
    echo "⏭️ Idempotency Check: Seed state already present. Skipping."
fi

# 4. Permission Reset Trap Fix
echo "🔐 [4/4] Reclaiming volume ownership for cPanel user..."
HOST_UID=$(id -u)
HOST_GID=$(id -g)
# Claw back ownership from Docker root to prevent lockouts on the VPS
chown -R $HOST_UID:$HOST_GID ./apps/api/data ./apps/web/.next 2>/dev/null || true

echo "=========================================="
echo "✅ Deployment Audited & Complete: $(date)"
echo "=========================================="