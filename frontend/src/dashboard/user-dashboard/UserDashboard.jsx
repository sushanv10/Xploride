import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import axiosInstance from '../../config/AxiosConfig';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

function UserDashboard() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth(); 

    const handleLogout = async () => {
        try {
            await axiosInstance.post("auth/logout", {}, { withCredentials: true });

            toast.success("Logged out successfully!");

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

    const user = auth?.user;

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                    <div className="flex flex-col items-center">
                        <FaUserCircle size={80} className="text-gray-400 mb-4" />
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            {user?.userName || "User Name"}
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">{user?.email || "user@example.com"}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition"
                    >
                        <MdLogout size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
