FROM node:20-alpine AS base

# 1. Prune the workspace to only include the "web" app and its dependencies
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
# Generates a "cleaned" project structure in /app/out needed for the build
RUN turbo prune web --docker

# 2. Install dependencies using the pruned workspace
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy json files first (package.json, pnpm-lock.yaml)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only the dependencies needed for the web app
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

# 3. Build the project using the pruned source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
# Invalidate cache for source code copy
ARG CACHE_BUST=1
COPY --from=pruner /app/out/full/ .

# Env vars
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_GT_ID
ENV NEXT_PUBLIC_GT_ID=$NEXT_PUBLIC_GT_ID
ENV NEXT_TELEMETRY_DISABLED 1

# Build the project (disabled cache mount to prevent Server Action desync)
# [HOTFIX] Explicitly limit Node.js heap memory to 1GB to prevent VPS OOM (Out of Memory) crashes during Next.js minification
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN npm install -g pnpm && pnpm --filter web build

# Fix: Create a true static copy (dereference symlinks)
# cp -rL ensures all pnpm symlinks are converted to real files
# RUN cp -rL /app/apps/web/.next/standalone /app/standalone_output

# 4. Production dependencies (Pruned for size)
FROM base AS prod-deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm && pnpm install --prod --no-frozen-lockfile

# 5. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Fix: Copy keys checks
# NOTE (Hotfix v4.1): We NO LONGER copy the public directory here! 
# We explicitly bypass it to prevent ENOSPC (No Space Left On Device) crashes caused by massive SVG and PDF specs.
# It is now mapped directly from the host filesystem in docker-compose.prod.yml
# Ensure content.json is available
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/lib/content ./apps/web/lib/content

# Copy standalone build (minimal size)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# Removed: Force remove broken pnpm symlinks hack
# Removed: Manually install next.js and react hack
# With outputFileTracingRoot in next.config.js, the standalone build traces correctly.

# Fix: Create cache directory with correct permissions
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next/cache && \
    mkdir -p apps/web/.next/cache && chown -R nextjs:nodejs apps/web/.next/cache

USER nextjs

EXPOSE 3000



# Fix: Clean env vars
ENV NODE_PATH=/app/node_modules:/app/apps/web/node_modules

WORKDIR /app

# Standalone entrypoint
ENV PORT 3000
ENV HOSTNAME="0.0.0.0"
CMD ["sh", "-c", "if [ -f server.js ]; then HOSTNAME=0.0.0.0 PORT=3000 node server.js; else HOSTNAME=0.0.0.0 PORT=3000 node apps/web/server.js; fi"]
