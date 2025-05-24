#!/bin/bash

# Development setup script for Rural Women Rising
# This script sets up the local development environment

set -e

echo "🌾 Setting up Rural Women Rising development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up environment file
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cp .env.example .env.local

    echo "🗄️ Setting up SQLite database..."
    npx prisma db push
else
    echo "✅ .env.local already exists"
    echo "🗄️ Setting up SQLite database..."
    npx prisma db push
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "To start developing:"
echo "  npm run dev"
echo ""
echo "To view the database:"
echo "  npm run db:studio"
echo ""
echo "To reset the database:"
echo "  npx prisma db push --force-reset"
echo ""
echo "Happy coding! 🚀"
