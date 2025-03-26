import { useState, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../config/AxiosConfig";


export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            const res= await axiosInstance.get('auth/auth-admin');
            if (res.data.ok) {
                setOk(true);
            }else{
                setOk(false);
                navigate("/login");
            }
        }
        if(auth?.token) authCheck()
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner/>
}
