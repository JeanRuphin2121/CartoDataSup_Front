import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Header from '../components/template/Header';
import Aside from '../components/template/Aside';
import Footer from '../components/template/Footer';
import Setting from '../components/template/Setting';

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;

   

  return <div className="wrapper">
          <Header />
          <Aside />
          <Outlet />
          
          <Footer />
          <Setting />
        </div>;
};

export default PrivateRoute;