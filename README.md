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
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Chart.js | Data visualization |
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
│   │   ├── SalesChart.jsx
│   │   ├── GstChart.jsx
│   │   ├── LowStockTable.jsx
│   │   └── RecentInvoices.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   └── Layout.jsx
│   └── Model.jsx        # Reusable modal component
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   ├── Customers.jsx
│   ├── Invoice.jsx
│   ├── InvoiceList.jsx
│   └── Reports.jsx
├── context/
│   └── AuthContext.jsx  # Auth state management
├── App.jsx              # Main app with routing
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
| Customers | `/customers` | Customer management | Admin/Cashier |
| Create Invoice | `/invoice` | Generate new invoice | Admin/Cashier |
| Invoice List | `/invoices` | View all invoices | Admin/Cashier |
| Reports | `/reports` | Sales & GST reports | Admin |

### Key Components

- **Sidebar** - Navigation menu with role-based visibility
- **SalesChart** - Monthly sales trend visualization (Chart.js)
- **GstChart** - GST breakdown (CGST/SGST/IGST) pie chart
- **LowStockTable** - Products below threshold alert
- **RecentInvoices** - Latest invoice history
- **Model** - Reusable modal for forms

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
| GET | /products | Fetch products |
| POST | /products | Add product (Admin) |
| PUT | /products/:id | Update product (Admin) |
| DELETE | /products/:id | Delete product (Admin) |
| GET | /customers | Fetch customers |
| POST | /customers/add | Add customer |
| GET | /invoices | Fetch invoices |
| POST | /invoices | Create invoice |
| GET | /invoices/:id | Get invoice details |
| GET | /invoices/invoice/:id/pdf | Download PDF |
| GET | /dashboard | Dashboard data |
| GET | /invoices/daily-report | Daily report (Admin) |
| GET | /invoices/reports/monthly | Monthly report (Admin) |

---

## 6. Features

### Dashboard
- Total invoices, products, customers count
- Total sales amount
- Monthly sales chart (line graph)
- GST breakdown chart (pie chart)
- Recent invoices list
- Low stock alerts

### Product Management
- Paginated product list
- Add new product with full details
- Edit existing product
- Delete product
- Search by name
- Sort by columns
- Low stock threshold alerts

### Customer Management
- Add/Edit/Delete customers
- GSTIN validation
- State selection for GST type
- Search functionality

### Invoice Generation
- Customer selection dropdown
- Product selection with quantity
- Item-level discount (percentage/flat)
- Bill-level discount (percentage/flat)
- Real-time GST calculation
- Auto-generated invoice number
- PDF download

### Reports
- Daily sales summary
- Monthly sales & GST report
- PDF export for reports

---

## 7. Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hp332102-cloud/inventory-and-billing-system-frontend.git

# Navigate to project
cd inventory-and-billing-system-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Environment Variables

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## Key Technical Details

### Role-Based Access

| Role | Dashboard | Products | Customers | Invoices | Reports |
|---|---|---|---|---|---|
| Admin | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cashier | ✓ | View | ✓ | ✓ | - |

### State Management
- React Context API for authentication
- Local state for UI components
- Axios for server state

### Form Handling
- Controlled components
- Real-time validation
- Error handling

### PDF Generation
- Backend generates PDF using PDFKit
- Frontend triggers download via blob response

---

## Troubleshooting

### Common Issues

1. **Login not working**
   - Check backend is running
   - Verify API URL in axios.js

2. **PDF not downloading**
   - Check popup blocker
   - Verify backend PDF route

3. **Stock not updating**
   - Clear localStorage and re-login

---

## Project Structure (Summary)

```
inventory-and-billing-system-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/axios.js
│   ├── components/
│   ├── context/AuthContext.jsx
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## Related Documentation

- [Backend README](../backend/README.md) - API Documentation
- [Database Schema](./SCHEMA.md) - MongoDB Schemas

---

Made with React.js + Tailwind CSS