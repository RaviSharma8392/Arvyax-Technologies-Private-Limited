import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Navbar/Sidebar";
import BottomNavbar from "../components/Navbar/BottomNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 mb-15 overflow-y-auto md:ml-64">
        <Outlet />
      </div>
      <BottomNavbar />
    </div>
  );
};

export default DashboardLayout;
