import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // ត្រូវ save ពេល login

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />; 
  }
  return <Outlet />;
};
export default ProtectRoute;