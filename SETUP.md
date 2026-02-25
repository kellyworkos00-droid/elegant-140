# Elegant Steel Hardware ERP - Setup Guide

![Elegant Logo](./logo.png)

## System Status

- **Build Status**: Passing
- **TypeScript Check**: Passing  
- **Database Connection**: Connected
- **Authentication**: Working
- **Dashboard**: Functional
- **API Routes**: Operational
- **Production Ready**: ✅ Yes

---

## 🚀 Installation & Setup

### Step 1: Prerequisites Check

Ensure you have:
- Node.js v18.0.0 or higher
- npm v10.0.0 or higher

```bash
node --version  # Should be v18+
npm --version   # Should be v10+
```

### Step 2: Clone/Extract Project

```bash
cd elegant
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 16+
- React 19+
- TypeScript
- Prisma ORM (v5)
- TailwindCSS
- recharts (for charts)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- zod (validation)
- react-hot-toast (notifications)
- And more...

### Step 4: Configure Environment

Copy the example and fill in values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database Connection - Already provided
DATABASE_URL="postgresql://neondb_owner:npg_K1Wkfr7cFjCV@ep-divine-fire-ai5f63b2-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# JWT Secret - Generate a strong random string
JWT_SECRET="your-very-secure-random-string-min-32-characters-long-12345"

# NextAuth Secret - Another random string
NEXTAUTH_SECRET="another-very-secure-random-string-min-32-chars-long-123456"

# URLs
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Environment
NODE_ENV="development"
```

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

This generates the TypeScript types and client for database operations.

### Step 6: Database Setup

The database is already configured with existing tables. To validate the connection:

```bash
npx prisma db push
```

If needing to seed default users:

```bash
npm run seed
```

This creates:
- **Admin User**: admin@kellyos.com / Admin@123
- **Owner User**: pkingori14@gmail.com / owner@2026

### Step 7: Start Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 16.1.6
  - Environment: .env.local

  ✓ Ready in 2.3s
  ➜ Local:        http://localhost:3000
```

### Step 8: Test the Application

1. Open http://localhost:3000
2. You'll be redirected to login page
3. Use credentials above to log in
4. Should see dashboard

---

## 🔐 Default Test Accounts

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| Admin | admin@kellyos.com | Admin@123 | Full access - all modules |
| Owner | pkingori14@gmail.com | owner@2026 | Full access - all modules |

**⚠️ Change these passwords in production!**

---

## 🏗️ Project Structure

```
elegant/
├── app/                           # Next.js App Router
│   ├── api/                       # API routes - Backend logic
│   │   ├── auth/
│   │   │   ├── login/            # POST - Login endpoint
│   │   │   └── me/               # GET - Current user
│   │   ├── customers/            # GET - List customers
│   │   ├── products/             # GET - List products
│   │   └── invoices/             # GET - List invoices
│   ├── dashboard/                # Dashboard pages
│   │   ├── page.tsx              # Main dashboard
│   │   ├── customers/page.tsx    # Customers module
│   │   ├── inventory/page.tsx    # Inventory module
│   │   ├── sales/invoices/       # Sales invoices
│   │   ├── accounting/           # Accounting module
│   │   ├── reports/              # Reports module
│   │   ├── settings/             # Settings
│   │   └── layout.tsx            # Dashboard layout
│   ├── login/page.tsx             # Login page
│   ├── layout.tsx                 # Global layout
│   └── page.tsx                   # Home (redirects to dashboard or login)
├── components/               # React components (UI)
│   ├── Sidebar.tsx          # Navigation menu
│   └── Header.tsx           # Page header
├── lib/                     # Utility functions
│   ├── prisma.ts            # Database client singleton
│   ├── jwt.ts               # JWT token generation/verification
│   ├── auth-types.ts        # Type definitions for auth
│   ├── auth-middleware.ts   # Middleware for protected routes
│   └── auth-context.tsx     # React context for auth state
├── prisma/                  # Database layer
│   ├── schema.prisma        # Data model (48 tables)
│   ├── migrations/          # Database version control
│   └── seed.ts              # Seed script for test data
├── public/                  # Static files (images, icons)
├── .env.local               # Environment variables (git-ignored)
├── .env.example             # Template for .env.local
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
└── README.md                # Documentation
```

---

## 📊 Database Schema

**48 Core Tables** including:

### Core Business
- `users` - User accounts and roles
- `customers` - Customer profiles
- `suppliers` - Supplier data
- `employees` - Employee records
- `products` - Product catalog

### Sales
- `invoices` - Sales invoices
- `sales_orders` - Sales orders
- `sales_quotes` - Sales quotes
- `sales_deliveries` - Delivery tracking
- `pos_orders` - Point of Sale orders

### Purchases
- `purchase_orders` - Purchase orders
- `supplier_bills` - Supplier bills
- `supplier_payments` - Payment tracking

### Inventory
- `stock_levels` - Stock quantities
- `stock_movements` - Stock transactions
- `stock_transfers` - Inter-warehouse transfers
- `product_returns` - Return tracking
- `warehouses` - Warehouse master

### Accounting
- `accounts` - Chart of accounts
- `ledger_entries` - Accounting entries
- `payments` - Payment records
- `expenses` - Expense tracking
- `bank_transactions` - Bank statement matching

### HR & Payroll
- `attendances` - Employee attendance
- `leaves` - Leave requests
- `payrolls` - Payroll processing
- `payroll_deductions` - Deductions

### Admin
- `audit_logs` - User audit trail
- `system_logs` - System logs
- `api_metrics` - API performance
- `query_metrics` - Database performance

**Non-destructive design**: Existing data in all tables is preserved. New transactions are safely logged.

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000

# Production
npm run build            # Create production build
npm start                # Start production server

# Database
npx prisma generate      # Regenerate Prisma client
npx prisma db push       # Sync schema with database
npx prisma studio       # Open Prisma Studio GUI
npm run seed             # Create test data

# Code Quality
npm run lint             # Run ESLint

# Troubleshooting
rm -rf .next             # Clear build cache (Linux/Mac)
Remove-Item .next -Recurse -Force  # Windows
```

---

## 🧪 Verification Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] No console errors on startup
- [ ] Can navigate to http://localhost:3000
- [ ] Redirects to login page
- [ ] Can log in with admin@kellyos.com / Admin@123
- [ ] Dashboard loads with data
- [ ] Can navigate to Customers page
- [ ] Can navigate to Inventory page
- [ ] Can navigate to Sales page
- [ ] Sidebar navigation works
- [ ] Logout works
- [ ] Build completes: `npm run build`

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@prisma/client'"

**Solution**:
```bash
npx prisma generate
npm install
```

### Issue: "Database connection failed"

**Solution**:
1. Verify DATABASE_URL in `.env.local`
2. Test connection: `npx prisma db push`
3. Check internet connection (need Neon access)

### Issue: "Login not working"

**Solution**:
1. Check JWT_SECRET is set in `.env.local`
2. Check admin user exists in database
3. Check server console for error messages
4. Verify .next cache is cleared: `rm -rf .next`

### Issue: "Port 3000 already in use"

**Solution**:
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Issue: TypeScript errors on build

**Solution**:
```bash
rm -rf node_modules
npm install
npx prisma generate
npm run build
```

---

## 🚀 Deployment

### Vercel (Recommended - Free Tier)

1. Push to GitHub
2. Visit vercel.com
3. Import repository
4. Add environment variables
5. Deploy

### Docker (Any Server)

```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

Deploy:
```bash
docker build -t elegant-erp .
docker run -p 3000:3000 --env-file .env.local elegant-erp
```

### Traditional Server (Ubuntu/Debian)

```bash
# SSH into server
sudo apt update
sudo apt install nodejs npm

# Clone repository
git clone <repo>
cd elegant

# Setup
npm install
cp .env.example .env.local
# Edit .env.local with production values

# Build
npm run build

# Start with PM2 (recommended)
npm install -g pm2
pm2 start npm --name "elegant" -- start
pm2 startup
pm2 save
```

---

## 📈 Monitoring

### Application Health

- Check logs: `npm run dev` output or PM2 logs
- Monitor CPU/Memory: Server resources
- Database: Check Neon console
- Errors: Application logs and error handling

### Performance

- Analytics: Built into Next.js
- Database: Prisma logs (can be enabled)
- API response times: Middleware logs

---

## 🔐 Security in Production

**Before deploying, change these:**

1. **JWT_SECRET** - Generate strong random string (32+ chars)
   ```bash
   openssl rand -base64 32
   ```

2. **NEXTAUTH_SECRET** - Another strong random string
   ```bash
   openssl rand -base64 32
   ```

3. **Database password** - If using own database

4. **Default credentials** - Change admin/owner passwords

5. **Enable HTTPS** - Always use SSL/TLS in production

6. **Set NODE_ENV** - `NODE_ENV=production`

---

## 📞 Support

For issues:

1. Check this setup guide
2. Review error messages in console
3. Verify `.env.local` configuration
4. Check database connectivity
5. Review project README.md

---

## ✅ Final Checklist

- [ ] Node.js v18+ installed
- [ ] Dependencies installed: `npm install`
- [ ] `.env.local` configured
- [ ] Database connected
- [ ] Development server runs: `npm run dev`
- [ ] Can login with test account
- [ ] Dashboard displays data
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Ready for deployment

---

**Setup Complete!** 🎉

Your Elegant Steel Hardware ERP system is ready. Start the development server with `npm run dev` and begin using the system.
