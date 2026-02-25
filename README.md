# Elegant Steel Hardware ERP System

![Elegant Logo](./logo.png)

## Overview

A comprehensive Enterprise Resource Planning (ERP) system built with Next.js, React, TypeScript, and PostgreSQL. Designed for steel hardware distribution and management businesses.

## Key Features

- **Dashboard** - Real-time analytics and KPI tracking
- **Inventory Management** - Complete product and stock tracking
- **Customer Relationship Management (CRM)** - Customer directory and order history
- **Sales & Invoicing** - Invoice management and tracking
- **Point of Sale (POS)** - Quick checkout with tax calculation
- **Supplier Management** - Supplier directory and ratings
- **Purchase Orders** - PO tracking and delivery management
- **Accounting** - Chart of accounts and financial overview
- **Reports** - Comprehensive business reporting
- **Projects** - Project portfolio management
- **Settings** - System configuration and user management

## Tech Stack

**Frontend**
- Next.js 16.1.6 with Turbopack
- React 19.2.3
- TypeScript (strict mode)
- TailwindCSS 4
- Lucide React (icons)
- Recharts (charts)
- React Hot Toast (notifications)

**Backend**
- Next.js API Routes
- JWT Authentication
- bcryptjs for password hashing

**Database**
- PostgreSQL (Neon)
- Prisma ORM v5.22.0

## Quick Start

### Prerequisites
- Node.js v18+
- npm v10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kellyworkos00-droid/elegant-140.git
cd elegant
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001)

## Default Login Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@kellyos.com | Admin@123 | Admin |
| pkingori14@gmail.com | owner@2026 | Owner |

## Available Scripts

```bash
# Development
npm run dev

# Production Build
npm run build

# Start Production Server
npm start

# Lint Code
npm run lint

# Prisma Commands
npx prisma generate
npx prisma studio
npm run seed
```

## Documentation

- [Quick Start Guide](./QUICK_START.md)
- [Setup Guide](./SETUP.md)
- [API Documentation](./API.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

## Build Status

Production-ready with 0 build errors and full TypeScript compilation support.

## License

Proprietary - All rights reserved

---

Built with ❤️ for modern ERP needs.
