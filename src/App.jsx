/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/



/*import React from "react";

function App() {
  return (
    <div>
      <h1>Inventory and Billing System with GST</h1>
      <p>Frontend successfully started ✅</p>
    </div>
  );
}

export default App;*/



// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Products from "./pages/Products";
// import Customers from "./pages/Customer";
// import Invoice from "./pages/Invoice";
// import InvoiceList from "./pages/InvoiceList";

// import SalesReport from "./pages/reports/SalesReport";
// import GSTReport from "./pages/reports/GSTReport";
// import MonthlySalesReport from "./pages/reports/MonthlySalesReport";
// import ProductEdit from "./pages/ProductEdit";

// import DashboardLayout from "./components/layout/DashboardLayout";

// function App() {

//   return (

//     <BrowserRouter>

//       <Routes>

//         <Route path="/" element={<Login />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/edit/:id" element={<ProductEdit />} />
//         <Route path="/customers" element={<Customers />} />
//         <Route path="/invoices/create" element={<Invoice />} />
//         <Route path="/invoices" element={<InvoiceList />} />
//         <Route path="sales-report" element={<SalesReport />} />
//         <Route path="gst-report" element={<GSTReport />} />
//         <Route path="monthly-sales-report" element={<MonthlySalesReport />} />
//         <Route path="/dashboard-data" element={<Dashboard />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//     </BrowserRouter>

//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Customers from "./pages/Customer";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import SalesReport from "./pages/reports/SalesReport";
import GSTReport from "./pages/reports/GSTReport";
import MonthlySalesReport from "./pages/reports/MonthlySalesReport";
import ProductEdit from "./pages/ProductEdit";

// ✅ Naya Layout Import karein
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Login Page (Bina Sidebar ke) */}
        <Route path="/" element={<Login />} />

        {/* 2. Baaki Saare Pages (Sidebar aur Navbar ke Saath) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/edit/:id" element={<ProductEdit />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/invoices/create" element={<Invoice />} />
                  <Route path="/invoices" element={<InvoiceList />} />
                  <Route path="/monthly-sales-report" element={<MonthlySalesReport />} />
                  
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;