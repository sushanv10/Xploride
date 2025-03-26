import { MdDashboard, MdDirectionsBike, MdOutlineTour } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { IoCloseSharp, IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import LogoComponent from "../../../components/LogoComponent";

const Sidebar = ({ setActiveIndex }) => {
  const [showSideBar, setShowSideBar] = useState(false);
 
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <>
      <div className="relative">
        {/* Hamburger Menu */}
        <div
          className="absolute top-7 left-4 text-white text-2xl cursor-pointer z-150"
          onClick={toggleSideBar}
        >
          {showSideBar ? <IoCloseSharp /> : <RxHamburgerMenu className="text-white" />}
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 z-100 bg-gradient-to-b from-[#0A0A0A] to-[#1F1F1F] text-gray-300 text-sm shadow-lg transition-transform duration-500 transform ${
            showSideBar ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          {/* Brand Logo */}
          <div className="flex items-center justify-center py-6 border-b border-gray-700">
            <LogoComponent className={""} />
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              <li onClick={() => setActiveIndex("Dashboard")} className="cursor-pointer">
                <div className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-[#222222] hover:text-white rounded-md">
                  <MdDashboard className="h-6 w-6 text-gray-500" />
                  <span className="pl-3">Dashboard</span>
                </div>
              </li>

              <li onClick={() => setActiveIndex("Profile")} className="cursor-pointer">
                <div className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-[#222222] hover:text-white rounded-md">
                  <FaRegUser className="h-6 w-6 text-gray-500" />
                  <span className="pl-3">Profile</span>
                </div>
              </li>

              <li onClick={() => setActiveIndex("CategoryLists")} className="cursor-pointer">
                <div className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-[#222222] hover:text-white rounded-md">
                  <BiCategory className="h-6 w-6 text-gray-500" />
                  <span className="pl-3">Category</span>
                </div>
              </li>

              {/* Products */}
              <li onClick={() => setActiveIndex("ProductLists")} className="cursor-pointer">
                <div
                  className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-[#222222] hover:text-white rounded-md cursor-pointer"
                >
                  <LuShoppingCart className="h-6 w-6 text-gray-500" />
                  <span className="pl-3">Products</span>
                </div>
              </li>

              {/* Bikes */}
              <li onClick={() => setActiveIndex("BikeLists")}>
                <div
                  className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-[#222222] hover:text-white rounded-md cursor-pointer"
                >
                  <MdDirectionsBike className="h-6 w-6 text-gray-500" />
                  <span className="pl-3">Bikes</span>
                </div>
              </li>

               {/* Tour*/}
              <li onClick={() => setActiveIndex("TourLists")} className="cursor-pointer">
                <div
                  className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-[#222222] hover:text-white rounded-md cursor-pointer"
                >
                  <MdOutlineTour className="h-6 w-6 text-gray-500" />
                  <span className="pl-3">Tour</span>
                </div>
              </li>

              <li onClick={() => setActiveIndex("Settings")} className="cursor-pointer">
                <div className="flex items-center px-4 py-2 text-gray-400 transition hover:bg-[#222222] hover:text-white rounded-md">
                  <IoSettingsOutline className="h-6 w-6 text-gray-500" />
                  <span className="pl-3">Settings</span>
                </div>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;



