# FlowBit Demo Guide

## 🚀 Quick Demo Setup (Without Docker)

Since Docker isn't available, here's how to test the application locally:

### 1. Start MongoDB
```bash
# Install MongoDB locally or use MongoDB Atlas
# For local installation:
brew install mongodb-community
brew services start mongodb-community
```

### 2. Start Backend
```bash
cd backend
npm install
npm run seed  # Create initial users
npm run dev   # Start server on port 5007
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev   # Start on port 3000
```

### 4. Test the Application

#### Login Credentials:
- **LogisticsCo Admin**: admin@logisticsco.com / admin123
- **RetailGmbH Admin**: admin@retailgmbh.com / admin123
- **LogisticsCo User**: user@logisticsco.com / admin123
- **RetailGmbH User**: user@retailgmbh.com / admin123

#### Test Flow:
1. **Login as LogisticsCo Admin**
   - Go to http://localhost:3000
   - Login with admin@logisticsco.com / admin123
   - You should see "support" screen available

2. **Create a Ticket**
   - Click on "Support" in sidebar
   - Create a new ticket with title "Test Ticket"
   - Verify ticket appears in the list

3. **Test Tenant Isolation**
   - Logout and login as RetailGmbH admin
   - Create a ticket for RetailGmbH
   - Switch back to LogisticsCo - you shouldn't see RetailGmbH's tickets

4. **Test Admin Routes**
   - Login as admin user
   - Try accessing http://localhost:5007/admin/tickets
   - Should return tickets for your tenant only

5. **Test User vs Admin**
   - Login as regular user (user@logisticsco.com)
   - Try accessing admin routes - should be denied

### 5. Run Tests
```bash
cd backend
npm test
```

## 🎥 Demo Video Script

### 3-Minute Demo Flow:

1. **Introduction (30s)**
   - "Welcome to FlowBit Multi-Tenant Support System"
   - Show the login page and explain the multi-tenant architecture

2. **Login as Different Tenants (45s)**
   - Login as LogisticsCo admin
   - Show the dynamic sidebar with "support" screen
   - Logout and login as RetailGmbH admin
   - Show different available screens

3. **Create Tickets & Tenant Isolation (60s)**
   - Create a ticket as LogisticsCo
   - Switch to RetailGmbH and create another ticket
   - Show that each tenant only sees their own tickets
   - Demonstrate the real-time updates

4. **Admin Features & Security (45s)**
   - Show admin routes working for admin users
   - Try to access admin routes as regular user (show 403 error)
   - Demonstrate JWT-based authentication

5. **Architecture Overview (30s)**
   - Show the registry.json configuration
   - Explain the tenant isolation in MongoDB
   - Mention the n8n workflow integration

## 🔧 Manual Testing Checklist

### ✅ R1: Auth & RBAC
- [ ] JWT login works
- [ ] Admin routes restricted to admins only
- [ ] User routes accessible to all authenticated users

### ✅ R2: Tenant Data Isolation
- [ ] Tenant A cannot see Tenant B's tickets
- [ ] Tenant A cannot see Tenant B's users
- [ ] Jest tests pass

### ✅ R3: Use-Case Registry
- [ ] Different tenants see different screens
- [ ] `/me/screens` returns correct screens for tenant

### ✅ R4: Dynamic Navigation
- [ ] Sidebar renders based on tenant
- [ ] Screen switching works

### ✅ R5: Workflow Integration
- [ ] Ticket creation triggers workflow (n8n)
- [ ] Webhook callback updates ticket status
- [ ] UI reflects status changes

### ✅ R6: Containerization
- [ ] Docker-compose.yml includes all services
- [ ] Seed script creates initial data
- [ ] All services can be started with one command

## 📋 API Endpoints to Test

### Authentication
- `POST /auth/login` - Login with email/password
- `POST /auth/register` - Register new user

### Screens
- `GET /me/screens` - Get available screens for tenant

### Tickets
- `GET /api/tickets` - Get tickets for current tenant
- `POST /api/tickets` - Create new ticket
- `POST /api/tickets/webhook/ticket-done` - Webhook for n8n

### Admin (Admin only)
- `GET /admin/tickets` - Get all tickets for tenant
- `GET /admin/users` - Get all users for tenant

## 🐛 Troubleshooting

### Common Issues:
1. **MongoDB Connection**: Make sure MongoDB is running
2. **Port Conflicts**: Check if ports 3000, 5007 are available
3. **CORS Issues**: Backend should be running on port 5007
4. **JWT Issues**: Check JWT_SECRET environment variable

### Environment Variables:
```bash
# Backend (.env)
MONGO_URI=mongodb://localhost:27017/flowbit
JWT_SECRET=your-super-secret-jwt-key
N8N_WEBHOOK_URL=http://localhost:5678/webhook/ticket-created
WEBHOOK_SECRET=flowbit-webhook-secret-2024

# Frontend (.env)
VITE_API_BASE_URL=http://localhost:5007
``` 