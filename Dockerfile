# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with npm ci for clean, deterministic builds
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source code, data, and scripts
COPY . .

# Run build pipeline (prepare data -> vite build -> prerender SSG -> sitemaps)
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine AS runner

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check to ensure Nginx is healthy and serving pages
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
