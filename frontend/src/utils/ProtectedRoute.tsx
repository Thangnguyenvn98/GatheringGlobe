import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthQuery } from "@/services/queries";

const ProtectedRoute: React.FC = () => {
  const { isLoading, isSuccess, data } = useAuthQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  const isAuthenticated = isSuccess && data && !!data.userId;

  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
