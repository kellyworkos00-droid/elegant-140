# Elegant Steel Hardware ERP - Deployment Guide

![Elegant Logo](./logo.png)

## Deployment Overview

This guide covers deploying your Elegant ERP system to production environments. Multiple deployment options are provided for different infrastructure needs.

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally (`npm run build` succeeds)
- [ ] Environment variables configured (see `.env.example`)
- [ ] Database is accessible from production server
- [ ] Backup existing database
- [ ] SSL certificate obtained
- [ ] Domain configured (if using custom domain)
- [ ] Security review completed
- [ ] Performance testing done
- [ ] Disaster recovery plan documented

---

## 🔐 Production Security Configuration

### 1. Generate Secure Secrets

Generate cryptographically secure secrets for production:

```bash
# Generate JWT_SECRET
openssl rand -base64 32
# Output: AbCdEfGhIjKlMnOpQrStUvWxYz1234567890/+==

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
# Output: XyZ9876543210/+==AbCdEfGhIjKlMnOpQrStUvWxYz

# Generate database password (if needed)
openssl rand -base64 24
```

### 2. Set Production Environment Variables

Create production `.env.local`:

```env
# Database (Production)
DATABASE_URL="postgresql://user:password@prod-db-host:5432/elegant_prod?sslmode=require"

# Security
JWT_SECRET="[Generate with openssl - see above]"
NEXTAUTH_SECRET="[Generate with openssl - see above]"
NODE_ENV="production"

# URLs
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"

# Optional: Analytics/Monitoring
SENTRY_DSN="[if using Sentry error tracking]"
```

### 3. Security Headers Configuration

Update `next.config.ts` headers:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        }
      ]
    }
  ];
}
```

---

## 📦 Deployment Option 1: Vercel (Recommended - Easiest)

**Best for**: Startups, SMBs, teams preferring managed hosting

### Step 1: Prepare Repository

```bash
# Initialize git if needed
git init
git add .
git commit -m "Initial ERP system commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/elegant-erp.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel Dashboard:
1. Go to project Settings → Environment Variables
2. Add from `.env.example`:

```
DATABASE_URL
JWT_SECRET
NEXTAUTH_SECRET
NEXTAUTH_URL
NEXT_PUBLIC_API_URL
NODE_ENV (set to "production")
```

### Step 4: Deploy

1. Click "Deploy"
2. Vercel builds and deploys automatically
3. Monitor deployment logs
4. Access via provided URL: `https://elegant-erp-xxxxx.vercel.app`

### Step 5: Connect Custom Domain (Optional)

1. Settings → Domains
2. Add domain
3. Update DNS records as instructed
4. Wait for SSL certificate (auto-provisioned)

**Advantages**:
- Free tier available
- Automatic deployments on git push
- Zero-config SSL/TLS
- Global CDN
- Automatic scaling

---

## 🐳 Deployment Option 2: Docker + Any Server

**Best for**: Maximum control, self-hosting, enterprise requirements

### Step 1: Create Dockerfile

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["npm", "start"]
```

### Step 2: Create docker-compose.yml

```yaml
version: '3.8'

services:
  elegant-erp:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET: ${JWT_SECRET}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
      NODE_ENV: production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    volumes:
      - /var/log/elegant-erp:/app/logs
```

### Step 3: Build Docker Image

```bash
# Build image locally
docker build -t elegant-erp:latest .

# Or use compose
docker-compose build
```

### Step 4: Deploy to Server

**Push to Docker Registry (DockerHub)**:

```bash
# Login to Docker
docker login

# Tag image
docker tag elegant-erp:latest yourusername/elegant-erp:latest
docker tag elegant-erp:latest yourusername/elegant-erp:1.0.0

# Push
docker push yourusername/elegant-erp:latest
docker push yourusername/elegant-erp:1.0.0
```

**Deploy on Server**:

```bash
# SSH to server
ssh user@your-server.com

# Create .env file
cat > /opt/elegant/.env << EOF
DATABASE_URL=postgresql://...
JWT_SECRET=...
# ... add all variables
EOF

# Pull and run
cd /opt/elegant
docker-compose pull
docker-compose up -d

# Verify running
docker-compose ps
docker-compose logs -f elegant-erp
```

**Advantages**:
- Complete control
- Works anywhere Docker runs
- Easy scaling
- Container orchestration ready

---

## 🖥️ Deployment Option 3: Traditional Linux Server

**Best for**: VPS/dedicated servers, enterprises, cost-conscious teams

### Step 1: Prepare Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y nodejs npm curl git

# Verify versions
node --version # Should be v18+
npm --version  # Should be v10+

# Create application directory
sudo mkdir -p /var/www/elegant
sudo chown $USER:$USER /var/www/elegant
```

### Step 2: Clone Application

```bash
cd /var/www/elegant
git clone https://github.com/yourusername/elegant-erp.git .
```

### Step 3: Install Dependencies

```bash
npm ci  # Use ci instead of install for production

# Generate Prisma client
npx prisma generate

# Run database migrations (if needed)
npx prisma db push
```

### Step 4: Build Application

```bash
npm run build

# Verify build completed
ls -la .next/
```

### Step 5: Setup PM2 Process Manager

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application
cd /var/www/elegant
pm2 start npm --name "elegant" -- start

# Save PM2 config
pm2 save

# Enable startup on reboot
pm2 startup
# Follow the instructions returned

# Check status
pm2 status
pm2 logs elegant
```

### Step 6: Setup Nginx as Reverse Proxy

Create `/etc/nginx/sites-available/elegant`:

```nginx
upstream elegant_app {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy configuration
    location / {
        proxy_pass http://elegant_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static file caching
    location /_next/static/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/elegant /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### Step 7: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (every 60 days)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Step 8: Monitor Application

```bash
# View logs
pm2 logs elegant

# Restart application
pm2 restart elegant

# Monitor resource usage
pm2 monit

# Cron job for backup
crontab -e
# Add: 0 2 * * * /opt/backup/elegant-backup.sh
```

**Advantages**:
- Full control
- Lower costs for sustained use
- Familiar Linux environment
- Standard deployment patterns

---

## 🔄 Continuous Integration/Deployment (CI/CD)

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Run tests
        run: npm run lint
      
      - name: Deploy to production
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
          SERVER_HOST: ${{ secrets.SERVER_HOST }}
        run: |
          mkdir -p ~/.ssh
          echo "$DEPLOY_KEY" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -t ed25519 $SERVER_HOST >> ~/.ssh/known_hosts
          ssh user@$SERVER_HOST 'cd /var/www/elegant && git pull && npm ci && npm run build && pm2 restart elegant'
```

---

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Check application
curl https://yourdomain.com/api/auth/me

# Check database connectivity
# (Add health check endpoint if needed)

# Monitor server resources
htop
df -h
```

### Log Rotation

```bash
# Create logrotate config
sudo tee /etc/logrotate.d/elegant > /dev/null << EOF
/var/log/elegant-erp/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        pm2 reload elegant > /dev/null 2>&1 || true
    endscript
}
EOF
```

### Database Backups

Automated backup script:

```bash
#!/bin/bash
# /opt/backup/elegant-backup.sh

BACKUP_DIR="/opt/backups"
DB_URL="postgresql://user:pass@host:5432/elegant_prod"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
pg_dump "$DB_URL" > "$BACKUP_DIR/elegant_${TIMESTAMP}.sql"

# Keep only last 30 days
find $BACKUP_DIR -name "elegant_*.sql" -mtime +30 -delete

# Upload to S3 (optional)
# aws s3 cp "$BACKUP_DIR/elegant_${TIMESTAMP}.sql" s3://your-bucket/backups/
```

Make executable:
```bash
chmod +x /opt/backup/elegant-backup.sh
```

---

## 🔄 Zero-Downtime Deployment

### Blue-Green Deployment

```bash
# Deploy to "green" (inactive instance)
docker-compose -f docker-compose.green.yml up -d

# Test green instance
curl http://localhost:3001

# Switch traffic to green
# Update Nginx upstream to point to green
sudo sed -i 's/3000/3001/g' /etc/nginx/conf.d/elegant.conf
sudo nginx -s reload

# Old "blue" instance can be stopped
docker-compose -f docker-compose.blue.yml down
```

---

## 🚨 Rollback Procedures

### If deployment fails:

```bash
# Revert to previous version
git revert HEAD
npm run build
pm2 restart elegant

# Or restore from previous Docker image
docker run -d -p 3000:3000 elegant-erp:1.0.0
```

### Database rollback:

```bash
# Restore from backup
pg_restore -d elegant_prod elegant_20240115_020000.sql
```

---

## ✅ Post-Deployment Checks

Verify deployment:

- [ ] Application loads: `https://yourdomain.com`
- [ ] Can login: `https://yourdomain.com/login`
- [ ] Dashboard shows data
- [ ] API endpoints accessible
- [ ] SSL certificate valid
- [ ] Performance acceptable (check PageSpeed)
- [ ] Error monitoring active (if configured)
- [ ] Backup jobs running
- [ ] Logs being collected
- [ ] Monitoring alerts active

---

## 📞 Troubleshooting Deployment

**Application won't start:**
```bash
pm2 logs elegant
# Check error messages and .env configuration
```

**Database connection failed:**
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

**High memory usage:**
```bash
# Check for memory leaks
pm2 monit
# Restart if needed: pm2 restart elegant
```

**SSL certificate issues:**
```bash
# Check certificate
sudo certbot certificates
# Renew: sudo certbot renew
```

---

## 🎓 Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Deployment](https://vercel.com/docs)
- [Docker Documentation](https://docker.com/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt SSL](https://letsencrypt.org/getting-started/)

---

**Deployment Complete!** 🎉

Your Elegant ERP system is now running in production. Monitor it regularly and keep backups updated.
