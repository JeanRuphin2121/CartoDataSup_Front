import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants/constant";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [errorLogin, setErrorLogin] = useState(null);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch( API_BASE_URL + "login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      console.log(res.data);
      if (res.data) {
        console.log(res);
        setUser(res.data.user);
        setToken(res.data.token);
        setRefreshToken(res.data.refreshToken);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        console.log("localStorage", localStorage.getItem("token"));
        console.log("navigating to dashboard");

        setErrorLogin(null);
        navigate("/dashboard");
        return;
      }
      setErrorLogin(res.error);
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, errorLogin, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};