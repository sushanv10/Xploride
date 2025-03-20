import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../config/AxiosConfig";
import { Outlet, useNavigate } from "react-router-dom"; 

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [auth, setAuth] = useAuth(); // Fixed destructuring here
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axiosInstance.get('auth/auth-admin'); // Check if user is admin

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate("/login"); 
          console.log('hello')
        }
      } catch (error) {
        console.log(error);
        setOk(false);
        navigate("/login");
      } finally {
        setLoading(false); 
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false); // If no token, stop loading
      navigate("/login"); // Redirect to login if no token
    }
  }, [auth?.token, navigate]); // Re-run effect when token changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return ok ? <Outlet/> : null; 
}
