#!/bin/bash

# Deployment script for Rural Women Rising
# This script handles database migrations and application deployment

set -e

echo "🚀 Starting deployment for Rural Women Rising..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci --only=production

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️ Setting up SQLite database..."
# Create data directory if it doesn't exist
mkdir -p /app/data

# For SQLite, we use db push instead of migrate deploy
echo "🗄️ Pushing database schema..."
npx prisma db push

echo "🏗️ Building application..."
npm run build

echo "✅ Deployment completed successfully!"

# Optional: Run a quick health check
if command -v curl &> /dev/null; then
    echo "🔍 Running health check..."
    sleep 5
    if curl -f http://localhost:3000/api/health; then
        echo "✅ Health check passed!"
    else
        echo "⚠️ Health check failed, but deployment completed"
    fi
fi
