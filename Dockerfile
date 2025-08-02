# Multi-stage Docker build for AmplifyROI
# Frontend (Next.js) + Backend (FastAPI)

# Frontend Build Stage
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY tsconfig*.json ./
COPY postcss.config.js ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Copy source code
COPY app/ ./app/
COPY components/ ./components/
COPY lib/ ./lib/
COPY contexts/ ./contexts/
COPY hooks/ ./hooks/
COPY public/ ./public/

# Build the application
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Backend Base Stage
FROM python:3.11-slim AS backend-base

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Backend Production Stage
FROM backend-base AS backend

# Copy backend source code
COPY backend/ .

# Create non-root user
RUN groupadd -g 1001 -r appuser && \
    useradd -r -g appuser -u 1001 appuser && \
    chown -R appuser:appuser /app

USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Start command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# Full Stack Production Stage
FROM nginx:alpine AS production

# Install Node.js for Next.js
RUN apk add --no-cache nodejs npm python3 py3-pip curl

# Copy frontend build
COPY --from=frontend-builder /app/.next /usr/share/nginx/html/_next
COPY --from=frontend-builder /app/public /usr/share/nginx/html
COPY --from=frontend-builder /app/package.json /app/package.json

# Copy backend
COPY --from=backend /app /backend

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Install Python dependencies for backend
WORKDIR /backend
RUN pip3 install --no-cache-dir -r requirements.txt

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 &' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 80 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:80/api/health || exit 1

CMD ["/start.sh"]

# Development Stage
FROM node:18-alpine AS development

WORKDIR /app

# Install Python for backend development
RUN apk add --no-cache python3 py3-pip

# Install dependencies
COPY package*.json ./
RUN npm install

# Install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip3 install -r backend/requirements.txt

# Copy source code
COPY . .

EXPOSE 3000 8000

CMD ["npm", "run", "dev"]