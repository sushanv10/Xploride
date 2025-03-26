import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, useNavigate,  } from "react-router-dom";
import Spinner from "../components/Spinner";
import axiosInstance from "../config/AxiosConfig";

export default function ProtectedRoute() {
   
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            const res= await axiosInstance('auth/auth-user');
            if (res.data.ok) {
                setOk(true)
            }else{
                setOk(false)
                navigate('/login')
            }
        }
        if(auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet/> : <Spinner/>;
}
