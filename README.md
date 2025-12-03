# FlowBit - Multi-Tenant Support Ticket System

A comprehensive multi-tenant support ticket system with JWT authentication, role-based access control, tenant data isolation, and workflow integration using n8n.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Shell   │    │   n8n Workflow  │    │   MongoDB       │
│   (Frontend)    │◄──►│   Engine        │◄──►│   Database      │
│   Port: 3000    │    │   Port: 5678    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Express API   │    │   ngrok Tunnel  │    │   Registry      │
│   (Backend)     │    │   (Webhook)     │    │   (Screens)     │
│   Port: 5007    │    │   Port: 4040    │    │   JSON Config   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd FlowBit
```

### 2. Start All Services
```bash
docker-compose up -d
```

This will start:
- MongoDB (Port 27017)
- Express API (Port 5007)
- React Frontend (Port 3000)
- n8n Workflow Engine (Port 5678)
- ngrok Tunnel (Port 4040)

### 3. Seed Initial Data
```bash
# Wait for services to be ready, then run:
docker-compose exec backend npm run seed
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **n8n**: http://localhost:5678
- **ngrok Dashboard**: http://localhost:4040

## 🔐 Login Credentials

After running the seed script, you can login with:

### LogisticsCo Tenant
- **Admin**: admin@logisticsco.com / admin123
- **User**: user@logisticsco.com / admin123

### RetailGmbH Tenant
- **Admin**: admin@retailgmbh.com / admin123
- **User**: user@retailgmbh.com / admin123

## 🧪 Testing

### Run Unit Tests
```bash
docker-compose exec backend npm test
```

### Manual Testing Flow
1. Login as different tenants
2. Create support tickets
3. Verify tenant isolation (Tenant A cannot see Tenant B's data)
4. Check admin routes (only accessible by admins)
5. Monitor n8n workflow execution

## 📋 Features Implemented

### ✅ R1: Auth & RBAC
- JWT-based authentication with bcrypt password hashing
- Role-based access control (Admin/User)
- Admin-only routes (`/admin/*`)
- JWT includes `customerId`, `role`, and `email`

### ✅ R2: Tenant Data Isolation
- All MongoDB documents include `customerId`
- Jest unit tests prove tenant isolation
- Tenant A cannot access Tenant B's data

### ✅ R3: Use-Case Registry
- `registry.json` with tenant-specific screen configurations
- `/me/screens` endpoint returns tenant-specific screens
- Dynamic navigation based on tenant

### ✅ R4: Dynamic Navigation
- React shell fetches screens from `/me/screens`
- Sidebar renders dynamically based on tenant
- Support for Module Federation (configured)

### ✅ R5: Workflow Ping
- n8n container integrated in docker-compose
- `POST /api/tickets` triggers n8n workflow
- n8n calls back to `/webhook/ticket-done` with secret
- UI updates via polling (5-second intervals)

### ✅ R6: Containerized Dev Environment
- Complete docker-compose setup
- All services auto-configured
- No manual steps required

## 🔧 Configuration

### Environment Variables
```bash
# Backend
MONGO_URI=mongodb://admin:password@mongo:27017/flowbit?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
N8N_WEBHOOK_URL=http://n8n:5678/webhook/ticket-created
WEBHOOK_SECRET=flowbit-webhook-secret-2024

# Frontend
VITE_API_BASE_URL=http://localhost:5007
```

### Registry Configuration
```json
[
  { "tenant": "LogisticsCo", "screenUrl": "/support" },
  { "tenant": "RetailGmbH", "screenUrl": "/tickets" }
]
```

## 📁 Project Structure

```
FlowBit/
├── backend/
│   ├── controllers/     # API controllers
│   ├── middleware/      # Auth & admin middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── tests/          # Jest unit tests
│   ├── utils/          # JWT utilities
│   ├── registry.json   # Tenant screen registry
│   └── seed.js         # Database seeding
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── auth.js     # Auth utilities
│   └── vite.config.js  # Vite + Module Federation
└── docker-compose.yml  # All services
```

## 🐛 Known Limitations

1. **Module Federation**: Currently configured but the remote SupportTicketsApp is served from the same shell for simplicity
2. **n8n Workflow**: Basic webhook setup - in production, you'd want more sophisticated workflow logic
3. **Security**: JWT secret is hardcoded - should use environment variables in production
4. **Error Handling**: Basic error handling - production would need more robust error management
5. **WebSocket**: UI updates use polling instead of WebSocket for simplicity
6. **ngrok**: Requires auth token for production use

## 🚀 Production Considerations

1. **Security**: Use strong JWT secrets and HTTPS
2. **Database**: Use MongoDB Atlas or managed MongoDB service
3. **Monitoring**: Add logging and monitoring (Winston, Sentry)
4. **CI/CD**: Add GitHub Actions for automated testing
5. **Load Balancing**: Use nginx or similar for production deployment
6. **Backup**: Implement database backup strategies

