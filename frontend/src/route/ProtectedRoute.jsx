import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../config/AxiosConfig";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function ProtectedRoute () {
    const [ok, setOk]= useState(false);
    const [auth]= useAuth();
    const [loading, setLoading]= useState(true);
    const navigate = useNavigate();

    useEffect (() => {
        const authCheck = async () => {
            try {
                const res = await axiosInstance.get('auth/auth-user')
                if(res.data.ok){
                   
                    setOk(true);
                }else {
                    setOk(false);
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
                setOk(false);
                navigate('/login');
            } finally{
                setLoading(false);
            }
        };
        if(auth?.token){
            authCheck();  
        }else{
            setLoading(false);
            navigate('/login');
        }
    },[auth?.token, navigate]);

    if(loading){
        return <div className="flex justify-center text-center items-center">Loading....</div>
    }

    return ok? <Outlet/> : null;
}