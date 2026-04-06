import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'INVENTORY AND BILLING SYSTEM';
    if (path.includes('products')) return 'Products';
    if (path.includes('customers')) return 'Customers';
    if (path.includes('invoices')) return 'Invoices';
    if (path.includes('monthly-sales-report') || path.includes('report')) return 'Sales & GST Report';
    return 'Dashboard Overview';
  };

  return (
    <header className="h-[76px] bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0 sticky top-0 z-30">
      
      {/* Left Area: Mobile Menu + Page Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-[#3B82F6] rounded-xl outline-none transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-lg md:text-[22px] font-bold text-slate-800 tracking-tight line-clamp-1">
          {getPageTitle()}
        </h2>
      </div>

      {/* Right Area: All items in one clean line */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* 1. Live Indicator (Hidden on very small screens) */}
        {/* <div className="hidden sm:flex items-center gap-2 bg-[#E1FDEB] px-3 py-1.5 rounded-lg border border-[#A7F3D0]">
          <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
          <span className="text-[13px] font-bold text-[#059669]">Live</span>
        </div> */}

        {/* 2. Notification Bell (Hidden on very small screens) */}
        {/* <button className="hidden sm:block relative p-2 text-slate-500 hover:text-slate-800 transition-colors">
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3B82F6] border-2 border-white rounded-full"></span>
        </button> */}

        {/* 3. User Avatar & Text */}
        {/* <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-200">
          <div className="w-9 h-9 rounded-full bg-[#64748B] flex items-center justify-center text-white text-[15px] font-bold shadow-sm">
            A
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-[14px] font-bold text-slate-800 leading-none mb-1">Admin User</span>
            <span className="text-[12px] font-medium text-slate-500 leading-none">Jane Doe</span>
          </div>
        </div> */}

        {/* 4. Logout Button matching the image */}
        <button
          onClick={handleLogout}
          className="ml-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Navbar;