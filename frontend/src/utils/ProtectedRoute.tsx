import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthQuery } from "@/services/queries";

const ProtectedRoute: React.FC = () => {
  const { data, isLoading } = useAuthQuery();
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while the query is fetching
  }
  return data ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
