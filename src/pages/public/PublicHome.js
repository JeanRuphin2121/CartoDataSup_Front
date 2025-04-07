import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const PublicHome = () => {
  return (
    <Navigate to="/login" />
  );
};

export default PublicHome;
