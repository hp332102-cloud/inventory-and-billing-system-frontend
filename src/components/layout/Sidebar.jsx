import React from 'react';
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Invoices", path: "/invoices" },
    { name: "Invoice Create", path: "/invoices/create" },
    { name: "Products", path: "/products" },
    { name: "Customers", path: "/customers" },
  ];

  const reportItems = [
    { name: "Report", path: "/monthly-sales-report" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 z-50 h-[100dvh] w-[260px] bg-[#222E43] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>

        {/* Logo Area */}
        <div className="h-[72px] flex items-center px-6 shrink-0 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-blue-400 border-t-white flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <h1 className="text-white text-[16px] font-bold tracking-widest uppercase">
              PAAVTI
            </h1>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide space-y-8">

          {/* Main Menu */}
          <div>
            <nav className="space-y-1.5">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `flex items-center gap-4 px-4 py-[12px] rounded-lg text-[15px] font-medium transition-colors ${isActive
                      ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`
                  }
                >
                  <span className="text-lg opacity-90">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Reports Section */}
          <div>
            <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">REPORT</p>
            <nav className="space-y-1">
              {reportItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `flex items-center gap-4 px-4 py-[10px] rounded-lg text-[14px] font-medium transition-colors ${isActive
                      ? "text-blue-400 bg-slate-800/80"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                    }`
                  }
                >
                  <span className="text-base opacity-70">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;