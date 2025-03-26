import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import axiosInstance from '../../config/AxiosConfig';

function UserDashboard() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth(); 

    const handleLogout = async () => {
        try {
            await axiosInstance.post("auth/logout", {}, { withCredentials: true });

            const showtoast= toast.success("Logged out successfully!");
            console.log("toast shown:", showtoast);

            setTimeout(() => {
            setAuth({ userData: null, token: "" });
            Cookies.remove("accessToken");
            localStorage.removeItem("userData");
            navigate("/login");
            }, 1500); 

        } catch (error) {
            if (error.response?.status === 429) {
                toast.error("Too many requests! Please try again later.");
            } else {
                console.error("Error during logout:", error);
                toast.error("Logout failed. Please try again.");
            }
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
