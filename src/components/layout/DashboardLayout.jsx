import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F1F4F9] font-sans overflow-hidden">
      
      {/* Sidebar (Fixed on left) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Right Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-[260px]">
        
        {/* Navbar (Fixed on top of right section) */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        {/* Dynamic Page Content (Scrollable area) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full bg-[#F1F4F9]">
          {/* Container padding exactly like image */}
          <div className="p-4 lg:p-10 w-full min-h-screen bg-[#F1F4F9]">
            {children || <Outlet />}
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;