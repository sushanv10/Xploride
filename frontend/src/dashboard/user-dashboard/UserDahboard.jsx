import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

function UserDashboard() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth(); 

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

            // Clear authentication state
            setAuth({ userData: null, token: "" });

            // Remove auth data from cookies and local storage
            Cookies.remove("accessToken");
            localStorage.removeItem("userData");

            toast.success("Logged out successfully!");

            // Redirect to login page after logout
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='relative top-40 flex justify-center items-center'>
                <ButtonComponent text={'Logout'} onClick={handleLogout} />
                
            </div>
        </>
    );
}

export default UserDashboard;
