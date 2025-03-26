import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import LogoComponent from "../../../components/LogoComponent";
import { FaRegUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import axiosInstance from "../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const HeaderComponent = ({setActiveIndex}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileContainer, setShowProfileContainer] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleProfileContainer = () => {
    setShowProfileContainer(!showProfileContainer);
  };

 
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
    console.log(error);
    toast.error("Logout failed. Please try again.");
  }
};

  return (
    <>
    <ToastContainer />
    <header className="bg-[#0C0C0C] text-gray-400 shadow-md h-19 w-full">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center ml-2">
          <LogoComponent />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Input & Toggle */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none px-2 text-gray-700"
                  autoFocus
                />
                <IoCloseSharp
                  className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={toggleSearch}
                />
              </div>
            ) : (
              <CiSearch
                className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={toggleSearch}
              />
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleProfileContainer}
            >
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                alt="User"
                className="w-8 h-8 rounded-full shadow"
              />
              <span className="text-white">{auth?.user?.userName || "Admin"}</span>
            </button>

            {/* Profile container */}
            <AnimatePresence>
              {showProfileContainer && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="bg-white w-40 absolute top-12 right-0 rounded-2xl z-100 shadow-lg p-4 origin-top"
                >
                  <div className="flex flex-col space-y-4">
                    <li onClick={() => setActiveIndex("Profile")} className="flex items-center gap-4 cursor-pointer">
                      <FaRegUser className="text-[20px] text-gray-500" />
                      <button className="cursor-pointer text-black">Profile</button>
                    </li>

                    <div className="flex items-center gap-4 cursor-pointer" onClick={handleLogout}>
                      <IoIosLogOut className="text-[20px] cursor-pointer text-gray-500" />
                      <button className="cursor-pointer text-black">Logout</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default HeaderComponent;
