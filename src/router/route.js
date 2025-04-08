import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Header from '../components/template/Header';
import Aside from '../components/template/Aside';
import Footer from '../components/template/Footer';
import Setting from '../components/template/Setting';
import { FilterProvider } from "../hooks/FilterProvider";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />; 

  return  <FilterProvider>
      <div className="wrapper">
            <Header />
            <Aside />

            <Outlet />
            
            <Footer />
            <Setting />
      </div>
    </FilterProvider> ;
};

export default PrivateRoute;