import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // If user is logged in, allow access to protected routes
  if (currentUser?.user_id) {
    return <Outlet />;
  }

  // If user is not logged in, redirect to login
  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
