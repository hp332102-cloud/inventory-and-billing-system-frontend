import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardCards from "../components/dashboard/DashboardCards";
import SalesChart from "../components/dashboard/SalesChart";
import GSTChart from "../components/dashboard/GSTChart";
import RecentInvoices from "../components/dashboard/RecentInvoices";
import LowStockTable from "../components/dashboard/LowStockTable"; // Import confirmed
import Modal from "../components/Model";
import "../styles/dashboard.css";

import { useNavigate } from "react-router-dom"

import DashboardLayout from "../components/layout/DashboardLayout";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [gstData, setGSTData] = useState(null);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [lowStock, setLowStock] = useState([]); // 1. Low stock state add kari
  const [loading, setLoading] = useState(true);

  // Restock Modal state
  const [restockProduct, setRestockProduct] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);

  const navigate = useNavigate();

  const loadDashboard = async () => {
    try {
      //setLoading(true);
      const res = await API.get("/dashboard");
      
      if (res.data.success) {
        setDashboard(res.data.dashboard);
        setSalesData(res.data.salesChart);
        setRecentInvoices(res.data.recentInvoices);
        setGSTData(res.data.gstData);
        setLowStock(res.data.lowStockProducts); // 2. Backend se data set kiya
      }
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleRestockClick = (product) => {
    setRestockProduct(product);
    setNewStock(product.stock);
    setIsRestockModalOpen(true);
  };

  const handleRestockSubmit = async () => {
    if (!restockProduct) return;
    try {
      await API.put(`/products/${restockProduct._id}`, {
        stock: Number(newStock)
      });
      alert("Stock updated successfully ✅");
      setIsRestockModalOpen(false);
      setRestockProduct(null);
      loadDashboard();
    } catch (err) {
      console.error(err);
      alert("Failed to update stock");
    }
  };

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    
    <div className="w-full h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide p-6 space-y-6">
      {/* 1. Header Section: Title aur Dashboard Context */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
        {/* <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">● Live Database</span> */}
      </div>

      {/* 1. Totals Cards */}
      {dashboard && (
        <DashboardCards data={dashboard} cancelledCount={dashboard.cancelledInvoicesCount} />
      )}

      {/* 2. Charts Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 min-h-[350px]">
           <SalesChart data={salesData} />
        </div>
        <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 min-h-[350px]">
           <GSTChart data={gstData} />
        </div>
      </div>

      {/* 3. Tables Section (Recent Invoices + Low Stock Side-by-Side) */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Recent Invoices - occupies more space (flex: 2) */}
        <div className="dashboard-card-table flex-1 flex flex-col">
          <div className="card-header">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Invoices</h3>
            {/*View All par click karne se Invoice List pagekhulega */}
            <button className="view-all-btn" onClick={() => navigate("/invoices")}>
              View All
            </button>
          </div>
          <div className="card-body flex-grow">
            <RecentInvoices invoices={recentInvoices} />
          </div>
        </div>

        {/* Low Stock Table - occupies less space (flex: 1) */}
        <div className="dashboard-card-table flex-1 flex flex-col">
          <div className="card-header">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Low Stock Alert
            </h3>
            {/*Manage Stock par click karne se Products page khulega */}
            <button className="view-all-btn" onClick={() => navigate("/products")}>
              Manage Stock
            </button>
          </div>
          <div className="card-body flex-grow">
            <LowStockTable products={lowStock} onRestock={handleRestockClick} />
          </div>
        </div>

      </div>

      {/* Restock Modal */}
      <Modal 
        isOpen={isRestockModalOpen} 
        onClose={() => { setIsRestockModalOpen(false); setRestockProduct(null); }} 
        title="Restock Product"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Product Name</label>
            <input
              type="text"
              className="p-3 bg-slate-100 border border-slate-200 rounded-xl outline-none text-slate-500 w-full"
              value={restockProduct?.name || ""}
              disabled
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">New Stock Quantity</label>
            <input
              type="number"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mt-6 flex gap-3 border-t pt-5">
            <button 
              onClick={handleRestockSubmit} 
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg"
            >
              Update Stock
            </button>
            <button 
              onClick={() => { setIsRestockModalOpen(false); setRestockProduct(null); }} 
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

    </div>
    
  );
};

export default Dashboard;