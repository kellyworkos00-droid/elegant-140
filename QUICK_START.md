# Elegant Steel Hardware ERP - Quick Start Guide

Get your ERP system running in under 5 minutes!

---

## Prerequisites (Check These First)

- Node.js v18+ installed: `node --version`
- npm v10+ installed: `npm --version`
- Internet connection (for database access)

**Don't have them?**
- Download Node.js: [nodejs.org](https://nodejs.org)
- After installation, restart your terminal

---

## Installation (5 Minutes)

### Step 1: Navigate to Project
```bash
cd elegant
```

### Step 2: Install Dependencies
```bash
npm install
```
Takes ~2-3 minutes

### Step 3: Configure Environment
```bash
cp .env.example .env.local
```
This file has everything pre-configured!

### Step 4: Start Development Server
```bash
npm run dev
```

You should see:
```
Ready in 2.3s
Local: http://localhost:3000
```

### Step 5: Open in Browser
Visit: [http://localhost:3000](http://localhost:3000)
You'll be redirected to login page automatically.

---

## First Login

use any of these accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@kellyos.com | Admin@123 | Admin |
| pkingori14@gmail.com | owner@2026 | Owner |

Select an account, enter credentials, click "Sign In".

---

## What You'll See

After login:

1. **Dashboard** - Overview with charts and KPIs
2. **Sidebar** - Navigation menu on the left
3. **Header** - User profile and logout button
4. **Data** - Live data from database

### Quick Navigation

| Need to see... | Click in sidebar |
|----------------|------------------|
| Dashboard | Dashboard |
| Customer list | Customers |
| Product inventory | Inventory |
| Invoices | Sales → Invoices |

---

## Available Commands

```bash
# Development (what you just ran)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate database types
npx prisma generate

# View database in UI
npx prisma studio

# Seed test data
npm run seed

# Lint code
npm run lint
```

---

## Next Steps

1. **Explore the Dashboard** - Click around to see features
2. **Try the API** - See [API.md](API.md) for endpoints
3. **Read Full Setup** - See [SETUP.md](SETUP.md) for detailed config
4. **Deploy** - See [DEPLOYMENT.md](DEPLOYMENT.md) when ready

---

## Something Wrong?

### Port Already in Use
```bash
npm run dev -- -p 3001
```
(Uses port 3001 instead)

### Build Errors
```bash
rm -rf .next
npm run build
```

### Still Stuck?
See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed help.

---

## Quick Feature Overview

### Ready Now
- Login & authentication
- Dashboard with charts
- View customers
- View inventory
- View invoices

### Coming Soon
- Create/edit records
- Reports & exports
- Sales orders
- Supplier management
- Accounting module

---

## Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview |
| [SETUP.md](SETUP.md) | Detailed setup guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment |
| [API.md](API.md) | API reference |
| [FEATURES.md](FEATURES.md) | Feature documentation |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Problem solving |

---

## Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **Project Issues**: Check TROUBLESHOOTING.md

---

## Performance Tips

- First load might take a moment (builds JavaScript)
- Subsequent loads are faster (cached)
- Open browser DevTools (F12) to see any errors

---

## You're All Set!

Your Elegant ERP system is running. Start exploring and building!

**Questions?** Check the documentation files or run:
```bash
npm run dev
```
to see live logs of what's happening.

---

**Ready to deploy?** Jump to [DEPLOYMENT.md](DEPLOYMENT.md)

**Want to customize?** Check [FEATURES.md](FEATURES.md) for what's available

**Stuck?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

Happy ERP-ing!
