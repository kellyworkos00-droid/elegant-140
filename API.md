# Elegant Steel Hardware ERP - API Documentation

![Elegant Logo](./logo.png)

## API Overview

- **Base URL** (Development): `http://localhost:3000/api`
- **Base URL** (Production): `https://yourdomain.com/api`
- **Authentication**: JWT Bearer Token
- **Response Format**: JSON
- **Content-Type**: `application/json`

---

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/customers
```

### Getting an Authentication Token

**Endpoint**: `POST /api/auth/login`

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kellyos.com",
    "password": "Admin@123"
  }'
```

**Response** (Success - 200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@kellyos.com",
    "firstName": "John",
    "lastName": "Admin",
    "role": "ADMIN",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00Z"
  },
  "expiresIn": "7d"
}
```

**Response** (Error - 401):
```json
{
  "error": "Invalid credentials"
}
```

---

## 📝 API Endpoints

### 1. Authentication Endpoints

#### Login
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Authentication**: ❌ Not required
- **Body**:
  ```json
  {
    "email": "string (email format)",
    "password": "string (min 6 chars)"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "string",
    "user": {
      "id": "string (uuid)",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "enum: ADMIN | OWNER | MANAGER | SALES | ACCOUNTANT | STOREKEEPER",
      "isActive": "boolean",
      "lastLogin": "string (ISO 8601 datetime)"
    },
    "expiresIn": "string"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid input format
  - `401 Unauthorized`: Invalid credentials
  - `500 Internal Server Error`: Database error

---

#### Get Current User
- **Method**: `GET`
- **Endpoint**: `/api/auth/me`
- **Authentication**: ✅ Required
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**: `200 OK`
  ```json
  {
    "id": "string (uuid)",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "string",
    "isActive": "boolean",
    "lastLogin": "string (ISO 8601 datetime)"
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Server error

---

### 2. Customer Endpoints

#### List Customers
- **Method**: `GET`
- **Endpoint**: `/api/customers`
- **Authentication**: ✅ Required
- **Query Parameters** (Optional):
  ```
  page=1                    # Page number for pagination
  limit=50                  # Items per page
  search=company_name       # Search by name or email
  sort=createdAt            # Sort field
  order=desc                # asc or desc
  ```
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**: `200 OK`
  ```json
  {
    "customers": [
      {
        "id": "string (uuid)",
        "code": "string",
        "name": "string",
        "email": "string",
        "phone": "string",
        "address": "string",
        "city": "string",
        "country": "string",
        "balance": "number (decimal)",
        "outstandingAmount": "number (decimal)",
        "creditLimit": "number (decimal)",
        "taxId": "string",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ],
    "total": 150,
    "page": 1,
    "totalPages": 3
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Database error

**Example Usage**:
```bash
# Get first 50 customers
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/customers

# Search for specific customer
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/customers?search=ABC%20Co"

# Get page 2 with 25 items per page
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/customers?page=2&limit=25"
```

---

#### Get Customer Details (Planned)
- **Method**: `GET`
- **Endpoint**: `/api/customers/:id`
- **Authentication**: ✅ Required
- **Path Parameters**:
  ```
  :id = customer UUID
  ```
- **Response**: `200 OK`
  ```json
  {
    "id": "string",
    "code": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "balance": "number",
    "invoices": [
      {
        "id": "string",
        "number": "string",
        "total": "number",
        "status": "string"
      }
    ]
  }
  ```

---

#### Create Customer (Planned)
- **Method**: `POST`
- **Endpoint**: `/api/customers`
- **Authentication**: ✅ Required (ADMIN/OWNER/SALES role)
- **Body**:
  ```json
  {
    "name": "string (required)",
    "email": "string (email format, required)",
    "phone": "string",
    "address": "string",
    "city": "string",
    "country": "string",
    "creditLimit": "number"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": "string (uuid)",
    "code": "CUST-9999",
    "name": "string",
    "email": "string",
    "createdAt": "string (ISO 8601)"
  }
  ```

---

#### Update Customer (Planned)
- **Method**: `PUT`
- **Endpoint**: `/api/customers/:id`
- **Authentication**: ✅ Required (ADMIN/OWNER/SALES role)
- **Path Parameters**:
  ```
  :id = customer UUID
  ```
- **Body**: Same as Create (all fields optional)
- **Response**: `200 OK` (Updated customer object)

---

#### Delete Customer (Planned)
- **Method**: `DELETE`
- **Endpoint**: `/api/customers/:id`
- **Authentication**: ✅ Required (ADMIN/OWNER role)
- **Path Parameters**:
  ```
  :id = customer UUID
  ```
- **Response**: `200 OK`
  ```json
  {
    "message": "Customer deleted successfully",
    "id": "string"
  }
  ```

---

### 3. Product / Inventory Endpoints

#### List Products
- **Method**: `GET`
- **Endpoint**: `/api/products`
- **Authentication**: ✅ Required
- **Query Parameters** (Optional):
  ```
  page=1                    # Page number
  limit=100                 # Items per page
  search=SKU_or_name        # Search products
  category=Hardware         # Filter by category
  status=ACTIVE             # ACTIVE or INACTIVE
  ```
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**: `200 OK`
  ```json
  {
    "products": [
      {
        "id": "string (uuid)",
        "sku": "string",
        "name": "string",
        "description": "string",
        "category": "string",
        "quantity": "number",
        "reorderLevel": "number",
        "price": "number (decimal)",
        "cost": "number (decimal)",
        "status": "ACTIVE | INACTIVE",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ],
    "total": 250,
    "page": 1,
    "totalPages": 3
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Database error

**Example Usage**:
```bash
# Get all products
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/products

# Search for low-stock items
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products?search=BOLT"

# Get products in specific category
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products?category=Hardware"
```

---

#### Get Product Details (Planned)
- **Method**: `GET`
- **Endpoint**: `/api/products/:id`
- **Authentication**: ✅ Required
- **Path Parameters**:
  ```
  :id = product UUID
  ```
- **Response**: `200 OK`
  ```json
  {
    "id": "string",
    "sku": "string",
    "name": "string",
    "quantity": "number",
    "price": "number",
    "stockHistory": [
      {
        "date": "string",
        "quantity": "number",
        "type": "IN | OUT"
      }
    ]
  }
  ```

---

#### Create Product (Planned)
- **Method**: `POST`
- **Endpoint**: `/api/products`
- **Authentication**: ✅ Required (ADMIN/OWNER/STOREKEEPER role)
- **Body**:
  ```json
  {
    "sku": "string (required, unique)",
    "name": "string (required)",
    "description": "string",
    "category": "string",
    "price": "number (required)",
    "cost": "number",
    "reorderLevel": "number"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": "string (uuid)",
    "sku": "string",
    "name": "string",
    "createdAt": "string (ISO 8601)"
  }
  ```

---

### 4. Invoice / Sales Endpoints

#### List Invoices
- **Method**: `GET`
- **Endpoint**: `/api/invoices`
- **Authentication**: ✅ Required
- **Query Parameters** (Optional):
  ```
  page=1                    # Page number
  limit=50                  # Items per page
  search=INV_or_customer    # Search by invoice number or customer name
  status=PAID               # DRAFT | PENDING | PAID | CANCELLED
  dateFrom=2024-01-01       # Filter date range
  dateTo=2024-12-31
  ```
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**: `200 OK`
  ```json
  {
    "invoices": [
      {
        "id": "string (uuid)",
        "number": "string",
        "customerId": "string (uuid)",
        "customer": {
          "id": "string",
          "name": "string",
          "email": "string"
        },
        "invoiceDate": "string (ISO 8601 date)",
        "dueDate": "string (ISO 8601 date)",
        "total": "number (decimal)",
        "paid": "number (decimal)",
        "remaining": "number (decimal)",
        "tax": "number (decimal)",
        "discount": "number (decimal)",
        "status": "DRAFT | PENDING | PAID | CANCELLED",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ],
    "total": 500,
    "page": 1,
    "totalPages": 10
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Database error

**Example Usage**:
```bash
# Get all invoices
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/invoices

# Search for specific invoice
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/invoices?search=INV-2024-001"

# Get pending invoices
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/invoices?status=PENDING"

# Get invoices from date range
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/invoices?dateFrom=2024-01-01&dateTo=2024-01-31"
```

---

#### Get Invoice Details (Planned)
- **Method**: `GET`
- **Endpoint**: `/api/invoices/:id`
- **Authentication**: ✅ Required
- **Path Parameters**:
  ```
  :id = invoice UUID
  ```
- **Response**: `200 OK`
  ```json
  {
    "id": "string",
    "number": "string",
    "customer": {
      "id": "string",
      "name": "string",
      "address": "string"
    },
    "items": [
      {
        "productId": "string",
        "productName": "string",
        "quantity": "number",
        "price": "number",
        "total": "number"
      }
    ],
    "total": "number",
    "paid": "number",
    "remaining": "number"
  }
  ```

---

#### Create Invoice (Planned)
- **Method**: `POST`
- **Endpoint**: `/api/invoices`
- **Authentication**: ✅ Required (ADMIN/OWNER/SALES role)
- **Body**:
  ```json
  {
    "customerId": "string (uuid, required)",
    "invoiceDate": "string (ISO 8601 date, required)",
    "dueDate": "string (ISO 8601 date)",
    "items": [
      {
        "productId": "string (uuid)",
        "quantity": "number",
        "price": "number"
      }
    ],
    "discount": "number (optional)",
    "tax": "number (optional)",
    "notes": "string (optional)"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": "string (uuid)",
    "number": "string",
    "customerId": "string",
    "total": "number",
    "createdAt": "string (ISO 8601)"
  }
  ```

---

#### Record Invoice Payment (Planned)
- **Method**: `POST`
- **Endpoint**: `/api/invoices/:id/payment`
- **Authentication**: ✅ Required (ADMIN/OWNER/ACCOUNTANT role)
- **Path Parameters**:
  ```
  :id = invoice UUID
  ```
- **Body**:
  ```json
  {
    "amount": "number (decimal, required)",
    "paymentDate": "string (ISO 8601 date, required)",
    "paymentMethod": "CASH | CHECK | BANK_TRANSFER | CREDIT_CARD",
    "reference": "string (optional)"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "invoiceId": "string",
    "paymentId": "string(uuid)",
    "amountPaid": "number",
    "remaining": "number"
  }
  ```

---

## 🔑 Role-Based Access Control

Each endpoint respects the user's role and permissions:

| Endpoint | ADMIN | OWNER | MANAGER | SALES | ACCOUNTANT | STOREKEEPER |
|----------|-------|-------|---------|-------|------------|-------------|
| GET /customers | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| POST /customers | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| PUT /customers | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| DELETE /customers | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| GET /products | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| POST /products | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| PUT /products | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| DELETE /products | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| GET /invoices | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| POST /invoices | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| PUT /invoices | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| DELETE /invoices | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 📋 Status Codes & Error Responses

### Success Responses

| Code | Meaning | Use Case |
|------|---------|----------|
| `200 OK` | Request successful | GET, PUT successful responses |
| `201 Created` | Resource created | POST successful responses |
| `204 No Content` | Request successful, no body | DELETE successful responses |

### Error Responses

| Code | Error | Description |
|------|-------|-------------|
| `400 Bad Request` | Invalid input | Missing required fields, invalid format |
| `401 Unauthorized` | Missing/invalid token | Token missing, expired, or invalid |
| `403 Forbidden` | Insufficient permissions | User role lacks required permissions |
| `404 Not Found` | Resource not found | ID doesn't exist |
| `422 Unprocessable Entity` | Validation error | Data validation failed |
| `500 Internal Server Error` | Server error | Database error, unexpected server issue |

### Error Response Format

```json
{
  "error": "string (error message)",
  "details": "string (optional, additional context)",
  "code": "string (optional, error code)"
}
```

---

## 🧪 Testing API Endpoints

### Using cURL

```bash
# 1. Login and get token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@kellyos.com","password":"Admin@123"}' \
  | jq -r '.token')

echo "Token: $TOKEN"

# 2. Use token to access protected endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/customers | jq

# 3. Create new customer
curl -X POST http://localhost:3000/api/customers \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "555-1234"
  }' | jq
```

### Using Postman

1. **Get Token**:
   - Method: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Body (raw JSON):
     ```json
     {"email":"admin@kellyos.com","password":"Admin@123"}
     ```
   - Send
   - Copy token from response

2. **Use Token in Headers**:
   - In any request, go to Headers tab
   - Add header: `Authorization`
   - Value: `Bearer <paste_token_here>`

3. **Test Endpoint**:
   - Method: GET
   - URL: `http://localhost:3000/api/customers`
   - Headers: `Authorization: Bearer <token>`
   - Send

### Using JavaScript Fetch

```javascript
// 1. Login
async function login() {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: 'admin@kellyos.com',
      password: 'Admin@123'
    })
  });
  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data.token;
}

// 2. Fetch data with token
async function getCustomers() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/customers', {
    headers: {'Authorization': `Bearer ${token}`}
  });
  return res.json();
}

// 3. Call functions
(async () => {
  await login();
  const customers = await getCustomers();
  console.log(customers);
})();
```

---

## 📚 API Versioning (Future)

Currently no API versioning. When releasing breaking changes:

```
/api/v1/customers
/api/v2/customers
```

---

## 🔄 Planned API Endpoints

### Accounting
- `GET /api/accounts` - List chart of accounts
- `POST /api/accounts` - Create account
- `GET /api/ledger` - View general ledger
- `POST /api/journal-entries` - Create journal entry

### Reports
- `GET /api/reports/sales` - Sales report
- `GET /api/reports/inventory` - Inventory report
- `GET /api/reports/financials` - Financial statements
- `POST /api/reports/export` - Export report (PDF/Excel/CSV)

### Suppliers
- `GET /api/suppliers` - List suppliers
- `POST /api/suppliers` - Create supplier
- `GET /api/purchase-orders` - List purchase orders
- `POST /api/purchase-orders` - Create PO

### Expenses
- `GET /api/expenses` - List expenses
- `POST /api/expenses` - Record expense
- `PUT /api/expenses/:id` - Update expense

### HR/Payroll
- `GET /api/employees` - List employees
- `GET /api/attendance` - View attendance
- `GET /api/payroll` - Payroll records

### Admin
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/audit-logs` - View audit trail
- `GET /api/system/health` - System health check

---

## ⚡ Rate Limiting (Planned)

Rate limiting will be implemented:

```
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user
- Burst limit: 20 requests per 10 seconds
```

Headers in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705315200
```

---

## 🔗 Webhooks (Planned)

POST to registered webhooks on events:

```
- invoice.created
- invoice.paid
- customer.created
- payment.received
- stock.low
- order.shipped
```

---

## 📞 Support & Issues

For API issues:

1. Check error code and message
2. Verify authentication token (not expired)
3. Check user role has permission
4. Review this documentation
5. Check application logs: `npm run dev`

---

**API Version**: 1.0.0
**Last Updated**: 2024
**Status**: Beta (Core endpoints stable)
