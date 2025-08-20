import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Ragister/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import SessionEditor from "./pages/Dashboard/SessionEditor/SessionEditor";

import DashboardLayout from "./layout/DashboardLayout";
import MySessions from "./pages/MySessions/MySessions";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="sessions" element={<MySessions />} />
          <Route path="sessions/new" element={<SessionEditor />} />
          <Route path="sessions/edit/:id" element={<SessionEditor />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
