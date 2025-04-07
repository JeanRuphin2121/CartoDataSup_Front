import logo from './logo.svg';
import './App.css';
import Template from './components/template/Template';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./components/template/Dashboard";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";
import PublicHome from './pages/public/PublicHome';

function App() {
  return (
    <>
    <div className="App wrapper">
      
        <AuthProvider>
          <Routes>
          <Route path="/" element={<PublicHome />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
    </div>


      {/* <div className="wrapper"> */}

        {/* <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
        </div> */}

        {/* <Template />

      </div> */}
    
    </>
  );
}

export default App;
