# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.18

################################################################################
# 1. Base stage — общий фундамент
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app


################################################################################
# 2. Development stage — для локальной разработки
FROM base AS development
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

################################################################################
# 3. Install production dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

################################################################################
# 4. Build the application
FROM base AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_YM_ID
ENV NEXT_PUBLIC_YM_ID=$NEXT_PUBLIC_YM_ID
RUN npm run build

################################################################################
# 5. Final image for runtime (production)
FROM base AS production
WORKDIR /app

COPY --from=deps  --chown=node:node /app/node_modules       ./node_modules
COPY --from=build --chown=node:node /app/.next/standalone    ./
COPY --from=build --chown=node:node /app/.next/static       ./.next/static
COPY --from=build --chown=node:node /app/public             ./public

USER node

EXPOSE 3000
CMD ["node", "server.js"]