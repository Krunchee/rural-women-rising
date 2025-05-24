# Coolify Deployment Guide

This guide will walk you through deploying the Rural Women Rising application on Coolify.

## Prerequisites

- A running Coolify instance
- Access to the Coolify dashboard
- Your application code in a Git repository (GitHub, GitLab, etc.)

## Step 1: Prepare Your Repository

Ensure your repository contains all the necessary files:

- ✅ `Dockerfile` - Container configuration
- ✅ `package.json` - Dependencies and scripts
- ✅ `prisma/schema.prisma` - Database schema
- ✅ `next.config.ts` - Next.js configuration
- ✅ `.env.example` - Environment variables template
- ✅ `src/app/api/health/route.ts` - Health check endpoint

## Step 2: Configure Persistent Storage

1. **In Coolify Dashboard:**
   - Go to your application settings
   - Navigate to "Storage" or "Volumes" section
   - Create a new persistent volume:
     - Name: `sqlite-data`
     - Mount Path: `/app/data`
     - Size: `1GB` (or as needed)

2. **Why persistent storage?**
   - SQLite database file needs to persist across deployments
   - Without persistent storage, data would be lost on each deployment
   - The volume ensures your database survives container restarts

## Step 3: Create Application

1. **In Coolify Dashboard:**
   - Go to "Applications" → "New Application"
   - Choose "Docker" as the build pack
   - Set your Git repository URL
   - Set the branch (usually `main` or `master`)

2. **Configure Build Settings:**
   - Build Pack: Docker
   - Dockerfile: `Dockerfile` (default)
   - Build Context: `.` (root directory)

## Step 4: Configure Environment Variables

In the application settings, add these environment variables:

### Required Variables
```
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
```

### Database Configuration
```
DATABASE_URL=file:/app/data/production.db
```

This points to the SQLite database file in the persistent volume.

### Security (Generate strong values)
```
NEXTAUTH_SECRET=your-super-secret-32-character-key
```

To generate a secure secret:
```bash
openssl rand -base64 32
```

## Step 5: Configure Health Checks

In the application settings:

- **Health Check Path:** `/api/health`
- **Health Check Port:** `3000`
- **Health Check Interval:** `30s`
- **Health Check Timeout:** `10s`
- **Health Check Retries:** `3`
- **Health Check Start Period:** `40s`

## Step 6: Deploy

1. **Initial Deployment:**
   - Click "Deploy" in the Coolify dashboard
   - Monitor the build logs for any errors
   - The build process will:
     - Install dependencies
     - Generate Prisma client
     - Build the Next.js application
     - Create the Docker image

2. **Database Initialization:**
   After the first successful deployment, initialize the database:
   - Go to the application's "Terminal" or "Console"
   - Run: `npx prisma db push`
   - Or use the deployment script: `./scripts/deploy.sh`

## Step 7: Verify Deployment

1. **Check Health:**
   - Visit: `https://your-domain.com/api/health`
   - Should return JSON with status "healthy"

2. **Check Application:**
   - Visit: `https://your-domain.com`
   - Verify the application loads correctly

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify `DATABASE_URL` is correct
   - Ensure database service is running
   - Check network connectivity between services

2. **Build Failures**
   - Check build logs in Coolify
   - Verify all dependencies are in `package.json`
   - Ensure Dockerfile syntax is correct

3. **Health Check Failures**
   - Verify the application is listening on port 3000
   - Check if `/api/health` endpoint is accessible
   - Review application logs for errors

4. **Migration Issues**
   - Ensure database is accessible
   - Run migrations manually: `npx prisma migrate deploy`
   - Check Prisma schema syntax

### Useful Commands

**View Application Logs:**
```bash
# In Coolify terminal
docker logs -f <container-name>
```

**Run Database Migrations:**
```bash
# In Coolify terminal
npx prisma migrate deploy
```

**Check Database Connection:**
```bash
# In Coolify terminal
npx prisma db pull
```

**Generate Prisma Client:**
```bash
# In Coolify terminal
npx prisma generate
```

## Environment-Specific Notes

### Production Optimizations

The application is configured with:
- Standalone output for optimal Docker builds
- Image optimization for WebP/AVIF formats
- Security headers
- Telemetry disabled
- Production-ready logging

### Scaling

For high-traffic scenarios:
- Enable horizontal scaling in Coolify
- Consider using a managed PostgreSQL service
- Implement Redis for session storage (if needed)
- Set up CDN for static assets

## Maintenance

### Regular Tasks

1. **Database Backups:**
   - Configure automatic backups in Coolify
   - Test restore procedures regularly

2. **Updates:**
   - Monitor for security updates
   - Test updates in staging environment first
   - Use rolling deployments for zero downtime

3. **Monitoring:**
   - Set up alerts for health check failures
   - Monitor application performance
   - Review logs regularly

### Database Migrations

When updating the database schema:

1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name description`
3. Commit changes to Git
4. Deploy application (migrations run automatically)
5. Verify migration success

## Support

For issues specific to:
- **Coolify:** Check Coolify documentation and community
- **Next.js:** Refer to Next.js documentation
- **Prisma:** Check Prisma documentation
- **Application:** Review application logs and health checks
