FROM node:20-alpine AS base

# 1. Prune the workspace to only include the "dev-os" app and its dependencies
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune dev-os --docker

# 2. Install dependencies using the pruned workspace
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm@9.0.0 && pnpm install --no-frozen-lockfile

# 3. Build the project using the pruned source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/dev-os/node_modules ./apps/dev-os/node_modules
COPY --from=pruner /app/out/full/ .

ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN npm install -g pnpm@9.0.0 && pnpm --filter dev-os build

# 4. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/apps/dev-os/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/dev-os/.next/static ./apps/dev-os/.next/static

RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next/cache && \
    mkdir -p apps/dev-os/.next/cache && chown -R nextjs:nodejs apps/dev-os/.next/cache

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "if [ -f server.js ]; then HOSTNAME=0.0.0.0 PORT=3000 node server.js; else HOSTNAME=0.0.0.0 PORT=3000 node apps/dev-os/server.js; fi"]
