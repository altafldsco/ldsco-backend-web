# ---------- 1. Install all dependencies (incl. dev, needed for tsc) ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- 2. Compile TypeScript -> dist/ ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- 3. Small production image ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Compiled app + Sequelize CLI config (for running migrations in the container)
COPY --from=build /app/dist ./dist
COPY .sequelizerc ./

# Uploads are saved to UPLOAD_DIR. In prod this path is bind-mounted from the
# host's /var/www/uploads (see docker-compose.prod.yml), so files live outside
# the image and survive redeploys. The host dir's ownership wins over this
# chown, so it must be writable by the compose `user:` (1001:1001).
ENV UPLOAD_DIR=/app/uploads
RUN mkdir -p /app/uploads && chown -R node:node /app/uploads

USER node
EXPOSE 5000
CMD ["node", "dist/server.js"]