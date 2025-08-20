import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser?.user_id ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
