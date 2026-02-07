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
RUN npm install -g pnpm && pnpm install --frozen-lockfile

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
ARG STRIPE_SECRET_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NEXT_TELEMETRY_DISABLED 1

# Build the project with cache mounting for faster iteration
RUN --mount=type=cache,target=/app/apps/web/.next/cache \
    npm install -g pnpm && pnpm --filter web build

# 4. Production dependencies (Pruned for size)
FROM base AS prod-deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# 5. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# Fix: Copy static assets to BOTH locations (relative to app and relative to root) 
# This handles ambiguity in where 'server.js' expects to find them
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./public

# Ensure content.json is available
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/lib/content ./apps/web/lib/content

# Fallback: Copy ONLY production node_modules to ensure 'next' and other deps are found
# This fixes the "Cannot find module next" error while keeping image size small
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=prod-deps --chown=nextjs:nodejs /app/apps/web/node_modules ./apps/web/node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# server.js is located at apps/web/server.js in the standalone output
# Debug: List full file structure to diagnose missing modules
RUN ls -R /app

# Fix: Ensure Node can find modules in potential locations
ENV NODE_PATH=/app/node_modules:/app/apps/web/node_modules

# Robust CMD: Try the monorepo path first, fallback to root
CMD ["sh", "-c", "if [ -f apps/web/server.js ]; then node apps/web/server.js; elif [ -f server.js ]; then node server.js; else echo 'server.js not found' && exit 1; fi"]
