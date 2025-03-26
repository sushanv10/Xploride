import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      setAuth({ token: storedToken, user: JSON.parse(storedUser) });
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  useEffect(() => {
    if (auth.token && auth.user) {
      Cookies.set("accessToken", auth.token, { expires: 1 }); // Store token for 1 day
      localStorage.setItem("userData", JSON.stringify(auth.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      Cookies.remove("accessToken");
      localStorage.removeItem("userData");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth]);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
