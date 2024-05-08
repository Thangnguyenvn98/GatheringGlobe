import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "@/hooks/use-auth-store";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
