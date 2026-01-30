FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
# Copy app specific package.json
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies (frozen-lockfile ensures we use the cache and don't re-resolve)
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

# Copy root config files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Copy usage of other workspace packages if needed (none for now based on analysis)
# COPY apps/web ./apps/web 
# OPTIMIZATION: Only copy imports and source relevant to this app
COPY apps/web ./apps/web

# Env vars
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_TELEMETRY_DISABLED 1

# Build
RUN npm install -g pnpm && pnpm --filter web build

# 3. Production image, copy all the files and run next
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
# Copy standalone output. 
# Note: Next.js standalone output folder structure depends on monorepo configuration.
# Usually it mirrors the source path: apps/web/server.js
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is located at apps/web/server.js in the standalone output for monorepos
CMD ["node", "apps/web/server.js"]
