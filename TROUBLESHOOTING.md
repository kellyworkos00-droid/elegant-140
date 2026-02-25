# Elegant Steel Hardware ERP - Troubleshooting Guide

![Elegant Logo](./logo.png)

## Quick Reference

| Problem | Solution | Section |
|---------|----------|---------|
| Port 3000 already in use | Use different port | #port-conflicts |
| Cannot find @prisma/client | Run prisma generate | #prisma-issues |
| Database connection failed | Check DATABASE_URL | #database-issues |
| Login not working | Check JWT_SECRET | #authentication-issues |
| TypeScript errors | Clear .next and reinstall | #typescript-errors |
| Build fails | Check dependencies | #build-issues |
| Slow performance | Check database queries | #performance-issues |

---

## 🗄️ Database Issues

### Issue: "Cannot connect to database"

**Error Message:**
```
ECONNREFUSED 127.0.0.1:5432
Network error: connect ECONNREFUSED
```

**Diagnosis:**
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1;"

# Check Neon status
curl -s https://status.neon.tech | grep -i "status"
```

**Solutions:**

1. **Verify CONNECTION STRING**:
   ```bash
   # Check .env.local exists
   cat .env.local | grep DATABASE_URL
   
   # Should show valid PostgreSQL URL:
   # postgresql://user:pass@host:port/dbname?ssl...
   ```

2. **Test from command line**:
   ```bash
   # Install psql if needed (Ubuntu/Debian)
   sudo apt install postgresql-client
   
   # Test connection
   psql "postgresql://username:password@host:5432/dbname"
   ```

3. **Check firewall**:
   ```bash
   # On Linux server
   sudo ufw status
   sudo ufw allow 5432/tcp
   
   # On Windows Firewall
   # Settings -> Network & Internet -> Firewall -> Allow through firewall
   ```

4. **Verify Neon database is active**:
   - Log in to Neon console
   - Check project status
   - Verify compute is NOT suspended

---

### Issue: "PrismaClientInitializationError: Cannot find a matching engine"

**Error Message:**
```
PrismaClientInitializationError: The "libquery_engine" has not been found 
yet on this system
```

**Solution**:

```bash
# Regenerate Prisma client
npx prisma generate

# If still failing, clear cache and reinstall
rm -rf node_modules .next
npm install
npx prisma generate
npm run build
```

---

### Issue: "Prisma schema validation error"

**Error Message:**
```
Error: InvalidDatasourceUrl: The URL must start with the protocol 
`postgresql://`
```

**Solution**:

```bash
# Check schema.prisma
cat prisma/schema.prisma | grep datasource

# Should show:
# datasource db {
#   provider = "postgresql"
#   url      = env("DATABASE_URL")
# }

# If using Neon, URL must include ?sslmode=require
# Example:
# postgresql://user:pass@host/db?sslmode=require
```

---

### Issue: "Too many connections" error

**Symptom**: Application crashes with connection pool exhaustion

**Solution**:

```bash
# Increase connection pool in .env.local:
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require&connectionLimit=20"

# Or add to Prisma schema:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  
  relationMode = "prisma"  # Use emulation mode
}
```

**For Neon specifically**:
```env
# Add to DATABASE_URL:
?sslmode=require&channel_binding=require
```

---

## 🔐 Authentication Issues

### Issue: "Invalid JWT token" / "Token expired"

**Error Message**:
```
Error verifying token: [object Object]
Invalid token
```

**Solution**:

1. **Check JWT_SECRET is set**:
   ```bash
   grep JWT_SECRET .env.local
   # Should output: JWT_SECRET=your_secret_value
   ```

2. **Regenerate if corrupted**:
   ```bash
   # Generate new secret
   openssl rand -base64 32
   
   # Update .env.local
   echo "JWT_SECRET=new_secret_here" >> .env.local
   ```

3. **Clear browser localStorage** (client-side):
   ```javascript
   // In browser console
   localStorage.clear('auth_token')
   ```

4. **Restart dev server**:
   ```bash
   npm run dev
   ```

---

### Issue: "Login always fails" / "Invalid credentials"

**Steps**:

1. **Verify user exists in database**:
   ```bash
   # Using psql
   psql $DATABASE_URL
   
   # Then in psql:
   \c neondb;
   SELECT email, role FROM users WHERE email = 'admin@kellyos.com';
   ```

2. **Check password hash**:
   ```bash
   npm run seed  # Re-seed with known passwords
   ```

3. **Verify login endpoint is working**:
   ```bash
   # Test login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@kellyos.com","password":"Admin@123"}'
   
   # Should return token if working
   ```

4. **Check bcrypt version**:
   ```bash
   npm list bcryptjs
   # Currently using: bcryptjs@2.4.3
   ```

---

### Issue: "Session not persisting" / "Logged out after refresh"

**Cause**: Token not stored in localStorage

**Solution**:

```typescript
// In login page or auth context, ensure:
localStorage.setItem('auth_token', response.token);

// Check it's being saved:
// Open DevTools > Application > LocalStorage > http://localhost:3000
```

---

## 🔨 Build & Compilation Issues

### Issue: "next build fails" / "TypeScript errors"

**Diagnose**:
```bash
npm run build 2>&1 | head -50  # Show first 50 lines of errors
```

**Common TypeScript Errors**:

1. **Type mismatch in API route**:
   ```typescript
   // ✗ Wrong
   export async function GET(req: Request) {
     return Response.json({ok: true});  // May fail type checking
   }
   
   // ✓ Correct
   export async function GET(req: Request): Promise<Response> {
     return Response.json({ok: true});
   }
   ```

2. **Missing type imports**:
   ```typescript
   // ✓ Add 'import type' for types
   import type { JWTPayload } from "@/lib/auth-types";
   ```

3. **Environment variable types**:
   ```typescript
   // Add to next.config.ts
   const config = {
     webpack: (config) => {
       config.resolve.fallback = {
         fs: false,
         path: false,
       };
       return config;
     },
   };
   ```

**Solutions**:

```bash
# Option 1: Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build

# Option 2: Check specific file
npx tsc --noEmit app/api/auth/login/route.ts

# Option 3: Fix all issues automatically
npm run lint -- --fix
```

---

### Issue: "Cannot find module '@/...'"

**Error Message**:
```
Module not found: Can't resolve '@/components/Sidebar'
```

**Solution**:

1. **Verify tsconfig paths**:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

2. **Check file exists**:
   ```bash
   ls -la components/Sidebar.tsx
   # If not found, make sure it's created
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run build
   ```

---

### Issue: "Module parse failed"

**Error Message**:
```
Module parse failed: Unexpected token...
```

**Solution**:

```bash
# Usually caused by:
# 1. .next cache corruption
rm -rf .next

# 2. Stale node_modules
rm -rf node_modules package-lock.json
npm install

# 3. TypeScript issue
npm run lint -- --fix

# Then rebuild
npm run build
```

---

## 🌐 Server & Port Issues

### Issue: "Port 3000 already in use"

**Error Message**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:

```bash
# Option 1: Kill process on port 3000
# Linux/Mac
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows (PowerShell as admin)
Get-Process | Where-Object {$_.Name -eq "node"} | Stop-Process

# Option 2: Use different port
npm run dev -- -p 3001

# Option 3: Find what's using it
# Linux
sudo netstat -tlnp | grep :3000

# Windows
netstat -tulpn | grep 3000
```

---

### Issue: "Cannot GET /api/auth/login"

**Error Message**:
```
404 - This page could not be found
```

**Diagnosis**:
```bash
# Check if API route file exists
ls -la app/api/auth/login/route.ts

# Verify Next.js recognizes the route
grep -r "export.*GET\|export.*POST" app/api/
```

**Solution**:

```bash
# 1. Ensure file is in correct location
# Should be: app/api/auth/login/route.ts (NOT index.js)

# 2. Rebuild
rm -rf .next
npm run build

# 3. Restart dev server
npm run dev
```

---

## 🎯 Frontend Issues

### Issue: "Cannot find localStorage"

**Error Message** (in console):
```
ReferenceError: localStorage is not defined
```

**Cause**: Code running on server before hydration

**Solution**:

```typescript
// ✗ Wrong - runs on server
const token = localStorage.getItem('auth_token');

// ✓ Correct - only runs on client
'use client';  // Add at top of file

import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    // Now this only runs in browser
    setToken(localStorage.getItem('auth_token'));
  }, []);
  
  return <div>{token ? 'Logged in' : 'Not logged in'}</div>;
}
```

---

### Issue: "Dashboard shows 'undefined' or blank data"

**Diagnosis**:
1. Check browser console for errors (F12 → Console)
2. Check Network tab to see API response
3. Check server console for error logs

**Common Causes**:

1. **API not returning data**:
   ```bash
   # Test API endpoint
   curl http://localhost:3000/api/customers
   # Should return JSON array
   ```

2. **Missing fields in response**:
   ```typescript
   // Debug: see what API returns
   const res = await fetch('/api/customers');
   console.log('API Response:', await res.json());
   ```

3. **Component not loading data**:
   ```typescript
   // Add useEffect with loading state
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   
   useEffect(() => {
     fetch('/api/customers')
       .then(r => r.json())
       .then(setData)
       .finally(() => setLoading(false));
   }, []);
   
   if (loading) return <div>Loading...</div>;
   if (!data) return <div>No data</div>;
   ```

---

### Issue: "Sidebar doesn't show navigation"

**Symptoms**: Sidebar appears empty or collapsed

**Solution**:

```typescript
// Check Sidebar.tsx has menu items
// In components/Sidebar.tsx, verify menuItems array:

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Customers', href: '/dashboard/customers' },
  // ... more items
];

// If empty, add items back
```

---

## 📊 API Issues

### Issue: "API returns 500 error"

**Error Message**:
```
Internal Server Error (500)
```

**Diagnosis**:
```bash
# Check server console
npm run dev

# Should show error stack trace
```

**Common Causes**:

1. **Database query error**:
   ```bash
   # Verify Prisma can connect
   npx prisma db push
   
   # Or check query in studio
   npx prisma studio
   ```

2. **Unauthorized access** (should be 401, not 500):
   ```typescript
   // Check middleware is catching auth errors properly
   export async function GET(req) {
     try {
       const user = await authenticateRequest(req);
       // ...
     } catch (error) {
       return Response.json({error: 'Unauthorized'}, {status: 401});
     }
   }
   ```

3. **Unhandled promise rejection**:
   ```typescript
   // Add try-catch to all handlers
   export async function GET(req) {
     try {
       // Your code
     } catch (error) {
       console.error('API error:', error);
       return Response.json({error: 'Server error'}, {status: 500});
     }
   }
   ```

---

### Issue: "API returns 401 Unauthorized"

**Cause**: Token validation failed

**Solution**:

```bash
# Check token exists
# 1. Open browser DevTools (F12)
# 2. Application → Local Storage
# 3. Look for 'auth_token' key
# 4. If missing, log in again

# Or test API manually with token:
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@kellyos.com","password":"Admin@123"}' \
  | jq -r '.token')

curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/customers
```

---

### Issue: "API times out" / "Takes too long to respond"

**Symptoms**: API requests hang or timeout

**Solutions**:

1. **Check database query performance**:
   ```bash
   # Open Prisma Studio
   npx prisma studio
   
   # See if queries execute quickly
   # Or enable Prisma query logging:
   ```

2. **Increase timeout in API route** (if needed):
   ```typescript
   // Add timeout handling
   export async function GET(req) {
     const controller = new AbortController();
     const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s
     
     try {
       const customers = await prisma.customers.findMany({
         signal: controller.signal
       });
       return Response.json(customers);
     } finally {
       clearTimeout(timeoutId);
     }
   }
   ```

3. **Add pagination to reduce response size**:
   ```typescript
   const PAGE_SIZE = 50;
   const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
   
   const customers = await prisma.customers.findMany({
     take: PAGE_SIZE,
     skip: (page - 1) * PAGE_SIZE,
   });
   ```

---

## 🎨 UI/UX Issues

### Issue: "Dark mode not working" / "Colors look wrong"

**Solution**:

```bash
# Check Tailwind is generating styles
npm run build

# Verify tailwind.config.ts has dark mode:
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0f3460',
        // ... custom colors
      }
    }
  }
}

# Rebuild CSS
npm run dev
```

---

### Issue: "Icons not showing (lucide-react)"

**Error**: Icon shows as blank box

**Solution**:

```typescript
// ✗ Wrong
import { User } from '@lucide/react';  // Wrong path

// ✓ Correct
import { User } from 'lucide-react';

// Verify icon exists
// See: https://lucide.dev
```

---

### Issue: "Charts not rendering (Recharts)"

**Solution**:

```typescript
// Ensure charts are in 'use client' component
'use client';

import { BarChart, Bar, XAxis, YAxis } from 'recharts';

export function MyChart() {
  const data = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
  ];
  
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" fill="#0f3460" />
    </BarChart>
  );
}
```

---

## 🚀 Performance Issues

### Issue: "Website is slow" / "High memory usage"

**Diagnosis**:
```bash
# Check Node.js memory usage
node --max-old-space-size=2048 node_modules/next/dist/bin/next dev

# Monitor with htop (Linux)
htop -p $(pgrep -f "node.*next")

# Check database slow queries
# Enable logging in prisma/schema.prisma:
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

log = ["query", "info", "warn", "error"]
```

**Solutions**:

1. **Add database indexes**:
   ```sql
   CREATE INDEX idx_customers_email ON customers(email);
   CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
   ```

2. **Implement pagination** (reduce data transferred)
3. **Add caching** (Redis) for frequently accessed data
4. **Disable source maps in production**:
   ```javascript
   // next.config.ts
   productionBrowserSourceMaps: false,
   ```

---

## 🔄 Deployment Issues

### Issue: "Works locally but fails on production"

**Common Causes**:

1. **Environment variables not set**:
   ```bash
   # Check production .env.local
   ssh user@server
   cat /var/www/elegant/.env.local
   # Should have all variables from .env.example
   ```

2. **Database connection string different**:
   ```bash
   # Verify DATABASE_URL in production
   psql $DATABASE_URL -c "SELECT 1;"
   ```

3. **Build succeeded but runtime error**:
   ```bash
   # Check production logs
   pm2 logs elegant
   
   # Or Docker logs
   docker logs container_id
   ```

---

## 📞 Getting Additional Help

### Check logs:
```bash
# Development
npm run dev

# Production (PM2)
pm2 logs elegant

# Production (Docker)
docker logs -f elegant-erp

# System (Linux)
journalctl -xe
tail -f /var/log/syslog
```

### Enable debug mode:
```bash
# Next.js debug
DEBUG=* npm run dev

# Prisma debug
DEBUG="prisma*" npm run dev

# Application logging
NODE_DEBUG=* npm run dev
```

### Test connectivity:
```bash
# Database
psql $DATABASE_URL -c "SELECT 1;"

# API
curl http://localhost:3000/api/auth/me -H "Authorization: Bearer YOUR_TOKEN"

# DNS (if deployment issues)
nslookup yourdomain.com
```

---

## ✅ Validation Checklist

Before reporting issues:

- [ ] Checked `.env.local` has all required variables
- [ ] Ran `npm install` to get latest dependencies
- [ ] Cleared `.next` cache: `rm -rf .next`
- [ ] Ran `npm run build` successfully
- [ ] Checked browser console (F12) for errors
- [ ] Cleared browser cache and localStorage
- [ ] Tested on different browser
- [ ] Checked database connectivity
- [ ] Verified credentials are correct
- [ ] Checked server logs for error messages

---

**Still stuck?** 

1. Review the specific error message carefully
2. Search this guide for key words from the error
3. Check Next.js documentation: https://nextjs.org/docs
4. Check Prisma documentation: https://www.prisma.io/docs
5. Review application logs for clues

Good luck! 🍀
