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

const HeaderComponent = ({ setActiveIndex }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileContainer, setShowProfileContainer] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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
      setIsLoggingOut(true);
      const res = await axiosInstance.post("auth/logout", {}, { withCredentials: true });

      toast.success(res.data.message);
      setTimeout(() => {
        setAuth({ user: null, token: "" });
        Cookies.remove("accessToken");
        localStorage.removeItem("userData");
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <header className="bg-[#0C0C0C] text-gray-400 shadow-md w-full">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center ml-10">
            <LogoComponent />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="outline-none px-2 text-gray-700 bg-transparent"
                    autoFocus
                  />
                  <IoCloseSharp
                    className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={toggleSearch}
                  />
                </div>
              ) : (
                <CiSearch
                  className="text-xl text-white cursor-pointer hover:text-gray-300"
                  onClick={toggleSearch}
                />
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleProfileContainer}
              >
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover shadow"
                />
                <span className="text-white font-medium">{auth?.user?.userName ?? "Admin"}</span>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {showProfileContainer && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white w-44 absolute top-12 right-0 rounded-xl z-50 shadow-lg p-4 origin-top"
                  >
                    <div className="flex flex-col space-y-4">
                      <div
                        onClick={() => {
                          setActiveIndex("Profile");
                          setShowProfileContainer(false);
                        }}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        <FaRegUser className="text-xl text-gray-600" />
                        <span className="text-black">Profile</span>
                      </div>

                      <div
                        onClick={handleLogout}
                        className={`flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${
                          isLoggingOut ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <IoIosLogOut className="text-xl text-gray-600" />
                        <span className="text-black">Logout</span>
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
