# ---------- Build stage ----------
FROM node:22-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy dependency files first (for better Docker cache)
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build


# ---------- Production stage ----------
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy only necessary build artifacts
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Expose port
EXPOSE 3000

# Copy entrypoint
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Use non-root user for security
USER node

# Default command
CMD ["./docker-entrypoint.sh"]
