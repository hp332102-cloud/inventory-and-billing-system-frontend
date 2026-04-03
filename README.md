# Inventory & Billing System - Frontend
### Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Pages & Components](#4-pages--components)
5. [API Integration](#5-api-integration)
6. [Features](#6-features)
7. [Setup & Installation](#7-setup--installation)

---

## 1. Project Overview

The **Inventory & Billing System** frontend is a React.js-based web application that provides a clean, user-friendly interface for managing inventory and generating GST-compliant invoices.

---

## 2. Tech Stack

| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Vite | Build tool & dev server |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Chart.js + react-chartjs-2 | Data visualization |
| Recharts | Alternative charts |
| Axios | HTTP client for API calls |
| Vercel | Deployment |

---

## 3. Frontend Architecture

```
src/
├── api/
│   └── axios.js          # Axios configuration & interceptors
├── components/
│   ├── dashboard/
│   │   ├── DashboardCards.jsx
│   │   ├── SalesChart.jsx
│   │   ├── GstChart.jsx
│   │   ├── LowStockTable.jsx
│   │   └── RecentInvoices.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   └── DashboardLayout.jsx
│   ├── reports/
│   │   ├── DownloadButton.jsx
│   │   ├── GSTBreakdown.jsx
│   │   ├── InvoiceList.jsx
│   │   ├── NoDataFound.jsx
│   │   ├── ReportCard.jsx
│   │   ├── ReportFilters.jsx
│   │   ├── ReportHeader.jsx
│   │   ├── ReportSummary.jsx
│   │   └── UnifiedReportSummary.jsx
│   ├── Model.jsx         # Reusable modal component
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── ProductEdit.jsx
│   ├── Customers.jsx
│   ├── Customer.jsx      # Alternate naming
│   ├── Invoice.jsx
│   ├── InvoiceList.jsx
│   └── reports/
│       ├── ReportDashboard.jsx
│       ├── SalesReport.jsx
│       ├── GSTReport.jsx
│       └── MonthlySalesReport.jsx
├── context/
│   └── AuthContext.jsx   # Auth state management
├── App.jsx               # Main app with routing
└── main.jsx             # Entry point
```

---

## 4. Pages & Components

### Pages

| Page | Route | Description | Access |
|---|---|---|---|
| Login | `/login` | User login | Public |
| Dashboard | `/` | Overview with KPIs | Admin/Cashier |
| Products | `/products` | Product management | Admin/Cashier |
| Product Edit | `/products/:id` | Edit specific product | Admin |
| Customers | `/customers` | Customer management | Admin/Cashier |
| Create Invoice | `/invoice` | Generate new invoice | Admin/Cashier |
| Invoice List | `/invoices` | View all invoices | Admin/Cashier |
| Reports Dashboard | `/reports` | Report overview | Admin |
| Sales Report | `/reports/sales` | Daily sales details | Admin |
| GST Report | `/reports/gst` | GST collection report | Admin |
| Monthly Report | `/reports/monthly` | Monthly summary | Admin |

### Key Components

- **Sidebar** - Navigation menu with role-based visibility
- **Navbar** - Top navigation with user info and logout
- **DashboardLayout** - Main layout wrapper with sidebar
- **ProtectedRoute** - Route guard for authentication
- **SalesChart** - Monthly sales trend visualization (Chart.js)
- **GstChart** - GST breakdown (CGST/SGST/IGST) pie chart
- **DashboardCards** - KPI summary cards
- **LowStockTable** - Products below threshold alert
- **RecentInvoices** - Latest invoice history
- **Model** - Reusable modal for forms
- **Report Components** - Report filters, cards, download buttons

---

## 5. API Integration

### Base URL
```
Development: http://localhost:5000/api
Production: Your deployed backend URL
```

### Authentication
- JWT token stored in localStorage
- Axios interceptor adds token to every request
- Auto-logout on token expiration

### API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /users/login | User authentication |
| POST | /users/register | Register new user (public) |
| GET | /users | Get all users (Admin) |
| GET | /products | Fetch products |
| POST | /products | Add product (Admin) |
| PUT | /products/:id | Update product (Admin) |
| DELETE | /products/:id | Delete product (Admin) |
| GET | /customers | Fetch customers |
| POST | /customers/add | Add customer |
| GET | /customers/:id | Get customer by ID |
| PUT | /customers/:id | Update customer |
| DELETE | /customers/:id | Delete customer |
| GET | /customers/search/:mobile | Search by mobile |
| GET | /invoices | Fetch invoices |
| POST | /invoices | Create invoice |
| GET | /invoices/:id | Get invoice details |
| PUT | /invoices/:id | Update invoice (Admin) |
| PATCH | /invoices/:id/cancel | Cancel invoice (Admin) |
| GET | /invoices/cancelled | Get cancelled invoices (Admin) |
| GET | /invoices/invoice/:id/pdf | Download PDF |
| GET | /invoices/daily-report | Daily report (Admin) |
| GET | /invoices/reports/monthly | Monthly report (Admin) |
| GET | /invoices/reports/monthly/pdf | Monthly PDF (Admin) |
| GET | /dashboard | Dashboard data |

---

## 6. Features

### Authentication & Security
- JWT-based login system
- Role-based access control (Admin/Cashier)
- Protected routes with auto-logout
- Password hashing with bcrypt

### Dashboard
- Total invoices, products, customers count
- Total sales amount
- Monthly sales chart (line graph)
- GST breakdown chart (pie chart)
- Recent invoices list
- Low stock alerts

### Product Management
- Paginated product list
- Add new product with full details (name, HSN code, price, category, GST rate, stock)
- Edit existing product
- Delete product (Admin)
- Search by name
- Sort by columns
- Low stock threshold alerts
- Discount configuration (percentage/flat)

### Customer Management
- Add/Edit/Delete customers
- GSTIN validation
- State selection for GST type
- Search functionality
- Mobile number lookup

### Invoice Generation
- Customer selection dropdown
- Product selection with quantity
- Item-level discount (percentage/flat)
- Bill-level discount (percentage/flat)
- Real-time GST calculation (CGST/SGST or IGST)
- Auto-generated invoice number
- Stock deduction on invoice creation
- PDF download

### Invoice List & Management
- View all invoices with pagination
- Search by invoice number
- Filter by status (Active/Cancelled)
- View invoice details
- Cancel invoice (restores stock)
- Payment status tracking (Paid/Unpaid)

### Reports (Admin Only)
- Daily sales summary
- Monthly sales & GST report
- GST breakdown (CGST/SGST/IGST)
- PDF export for reports
- Date-wise filtering

---

## 7. Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/hp332102-cloud/Inventory-and-Billing-System.git

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend
cd ../backend

# Install dependencies
npm install

# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key

# Start backend server
npm start
```

### Environment Variables

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Create `.env` file in backend directory:
```env
MONGO_URI=mongodb://localhost:27017/inventorybilling
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (Frontend)
cd frontend
vercel

# Deploy (Backend)
cd ../backend
vercel
```

---

## Key Technical Details

### Role-Based Access

| Feature | Admin | Cashier |
|---|---|---|
| Dashboard | ✓ | ✓ |
| Products - View | ✓ | ✓ |
| Products - Add/Edit/Delete | ✓ | - |
| Customers - View/Add/Edit | ✓ | ✓ |
| Customers - Delete | ✓ | ✓ |
| Invoices - Create | ✓ | ✓ |
| Invoices - View List | ✓ | ✓ |
| Invoices - Cancel | ✓ | - |
| Reports | ✓ | - |
| PDF Download | ✓ | ✓ |

### State Management
- React Context API (AuthContext) for authentication state
- Local state (useState) for UI components
- Axios for server state management

### Form Handling
- Controlled components
- Real-time validation
- Error handling with user feedback

### PDF Generation
- Backend generates PDF using PDFKit
- Frontend triggers download via blob response

---

## Troubleshooting

### Common Issues

1. **Login not working**
   - Check backend is running on port 5000
   - Verify API URL in axios.js
   - Check MongoDB connection

2. **PDF not downloading**
   - Check popup blocker
   - Verify backend PDF route
   - Ensure response is blob type

3. **Stock not updating**
   - Clear localStorage and re-login
   - Check product exists and has sufficient stock

4. **JWT token expired**
   - Auto-logout occurs
   - Re-login to get new token

5. **CORS errors**
   - Verify backend CORS configuration
   - Check API URL matches exactly

---

## Project Structure (Summary)

```
Inventory-and-Billing-System/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/authMiddleware.js
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

---

## Related Documentation

- [Backend README](../backend/README.md) - Full API Documentation & Database Schema
- [ER Diagram & Schema](../backend/README.md#7-er-diagram--database-schema) - Database Design Details

---

Made with React.js + Tailwind CSS + Vite