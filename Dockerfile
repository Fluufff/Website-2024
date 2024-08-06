FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile

# Runtime dependency for prod, which we install separately because we do not
# want to impose it on development environments. `--ignore-engines` required to
# get prebuilt binary in yarn v1.
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn add 'sharp@^0.33' --ignore-engines

# Rebuild the source code only when needed
FROM base AS builder
# staging or production
ARG BUILD_ENV
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build-standalone:${BUILD_ENV}

# Production image, copy all the files and run next
FROM base AS runner
# staging or production
ARG BUILD_ENV

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install dotenvx, which Next.js shamefully excludes from the build even if we
# make it a runtime dependency. This is extremely silly. Fortunately it works as
# a global install.
RUN npm install -g '@dotenvx/dotenvx'

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# .env is copied by the Next.js standalone, but not other env files, even the
# ones it knows about (https://github.com/vercel/next.js/issues/46296). The
# horrible "[e]" is to do nothing if the env file does not exist, which will be
# the case for BUILD_ENV=production.
COPY --from=builder --chown=nextjs:nodejs /app/.[e]nv.${BUILD_ENV} /app/.[e]nv.${BUILD_ENV}.local ./

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV BUILD_ENV ${BUILD_ENV}

CMD HOSTNAME="0.0.0.0" yarn run start-standalone:${BUILD_ENV}
