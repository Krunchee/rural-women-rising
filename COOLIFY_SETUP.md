# Quick Coolify Setup Guide

## 🚀 Ready for Deployment!

Your Rural Women Rising application is now fully prepared for Coolify deployment. Here's what has been configured:

## ✅ What's Been Set Up

### 1. **Docker Configuration**
- `Dockerfile` - Optimized multi-stage build with SQLite support
- `.dockerignore` - Excludes unnecessary files
- `docker-compose.yml` - Local testing with persistent SQLite storage

### 2. **Database Setup**
- SQLite schema in `prisma/schema.prisma`
- Persistent storage configuration for production
- Database initialization scripts
- Health check endpoint at `/api/health`

### 3. **Environment Configuration**
- `.env.example` - Template for environment variables
- Production-ready Next.js configuration
- Security headers and optimizations

### 4. **Deployment Scripts**
- `scripts/deploy.sh` - Production deployment script
- `scripts/setup-dev.sh` - Local development setup
- Database migration handling

### 5. **Coolify Integration**
- `coolify.yaml` - Deployment configuration
- Health checks configured
- Resource requirements specified

## 🎯 Quick Deployment Steps

### 1. In Coolify Dashboard:

**Create Application:**
```
Type: Docker
Repository: [your-git-repo-url]
Branch: main
Build Pack: Docker
```

**Configure Persistent Storage:**
```
Volume Name: sqlite-data
Mount Path: /app/data
Size: 1GB
```

### 2. Set Environment Variables:
```bash
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
DATABASE_URL=file:/app/data/production.db
NEXTAUTH_SECRET=[generate-32-char-secret]
```

### 3. Configure Health Check:
```
Path: /api/health
Port: 3000
Interval: 30s
Timeout: 10s
Retries: 3
```

### 4. Deploy & Initialize:
1. Click "Deploy" in Coolify
2. After successful deployment, run in terminal:
   ```bash
   npx prisma db push
   ```

## 🔧 Local Development

**Quick Start:**
```bash
# Run the setup script
./scripts/setup-dev.sh

# Or manual setup:
npm install
cp .env.example .env.local
# Edit .env.local with your database URL
npx prisma generate
npx prisma db push  # for SQLite
# OR
npx prisma migrate dev --name init  # for PostgreSQL

npm run dev
```

**With Docker:**
```bash
docker-compose up -d
docker-compose exec app npx prisma db push
```

## 📋 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ | SQLite database path | `file:/app/data/production.db` |
| `NODE_ENV` | ✅ | Environment | `production` |
| `PORT` | ✅ | Application port | `3000` |
| `NEXTAUTH_SECRET` | ✅ | Auth secret (32+ chars) | `your-super-secret-key` |
| `NEXT_TELEMETRY_DISABLED` | ⚠️ | Disable telemetry | `1` |

## 🔍 Health Check

Your app includes a health check endpoint:

**URL:** `/api/health`

**Response (Healthy):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "version": "0.1.0"
}
```

**Response (Unhealthy):**
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "disconnected",
  "error": "Database connection failed"
}
```

## 🛠️ Troubleshooting

**Build Fails:**
- Check Dockerfile syntax
- Verify all dependencies in package.json
- Review build logs in Coolify

**Database Connection Issues:**
- Verify DATABASE_URL format
- Ensure PostgreSQL service is running
- Check network connectivity

**Health Check Fails:**
- Verify app is listening on correct port
- Check if /api/health is accessible
- Review application logs

## 📚 Additional Resources

- **Full Deployment Guide:** `DEPLOYMENT.md`
- **Project Documentation:** `README.md`
- **Coolify Documentation:** https://coolify.io/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment

## 🎉 You're Ready!

Your application is now fully configured for Coolify deployment. The setup includes:

- ✅ Production-optimized Docker build
- ✅ Database migrations
- ✅ Health checks
- ✅ Security headers
- ✅ Environment configuration
- ✅ Error handling
- ✅ Development tools

Happy deploying! 🚀
