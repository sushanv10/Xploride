import  { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create a new context for authentication
const AuthContext = createContext();

/**
 * AuthProvider component:
 * - This component wraps around the children components and provides authentication data (auth state) to them via the context.
 */
const AuthProvider = ({ children }) => {
  // State to hold the authentication data: user info and token.
  const [auth, setAuth] = useState({
    user: null,  
    token: "",   
  });

  
  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedToken && storedUser) {
      setAuth({ token: storedToken, user: storedUser });
    }
  }, []);

  // Store auth data in cookies when auth state changes
  useEffect(() => {
    if (auth.token && auth.user) {
      Cookies.set("accessToken", auth.token, { expires: 1 });  
      localStorage.setItem("userData", JSON.stringify(auth.user));
    } else {
      Cookies.remove("accessToken");
      localStorage.removeItem("userData");
    }
  }, [auth]);

  // Axios request interceptor to add the Authorization header to each request
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth.token]);

  return (
    // Provide the 'auth' state and 'setAuth' function to all children components that use this context.
    <AuthContext.Provider value={[auth, setAuth]}>
      {children} {/* Render child components */}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
