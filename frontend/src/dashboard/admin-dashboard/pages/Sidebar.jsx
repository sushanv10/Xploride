import { MdDashboard, MdDirectionsBike, MdOutlineTour } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { IoCloseSharp, IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import LogoComponent from "../../../components/LogoComponent";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";

const Sidebar = ({ setActiveIndex }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const menuItemClasses = "flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#333] hover:text-white cursor-pointer";

  return (
    <>
      <div className="relative ">
        {/* Hamburger Menu */}
        <div
          className="absolute top-7 left-4 text-white text-2xl cursor-pointer z-[150]"
          onClick={toggleSideBar}
        >
          {showSideBar ? <IoCloseSharp /> : <RxHamburgerMenu />}
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full overflow-y-scroll w-60 z-[100] bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] backdrop-blur-lg text-gray-300 text-sm shadow-2xl transition-transform duration-500 transform ${
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
              {/* Dashboard */}
              <li onClick={() => setActiveIndex("Dashboard")}>
                <div className={menuItemClasses}>
                  <MdDashboard className="h-6 w-6" />
                  <span>Dashboard</span>
                </div>
              </li>

              {/* Profile */}
              <li onClick={() => setActiveIndex("Profile")}>
                <div className={menuItemClasses}>
                  <FaRegUser className="h-6 w-6" />
                  <span>Profile</span>
                </div>
              </li>

              {/* Category */}
              <li onClick={() => setActiveIndex("CategoryLists")}>
                <div className={menuItemClasses}>
                  <BiCategory className="h-6 w-6" />
                  <span>Category</span>
                </div>
              </li>

              {/* Products */}
              <li onClick={() => setActiveIndex("ProductLists")}>
                <div className={menuItemClasses}>
                  <LuShoppingCart className="h-6 w-6" />
                  <span>Products</span>
                </div>
              </li>

              {/* Bikes */}
              <li onClick={() => setActiveIndex("BikeLists")}>
                <div className={menuItemClasses}>
                  <MdDirectionsBike className="h-6 w-6" />
                  <span>Bikes</span>
                </div>
              </li>

              {/* rentals */}
              <li onClick={() => setActiveIndex("Rentals")}>
                <div className={menuItemClasses}>
                  <TbBrandBooking  className="h-6 w-6" />
                  <span>Rentals</span>
                </div>
              </li>

              {/* Tour Dropdown */}
              <li>
                <div onClick={toggleDropDown} className={menuItemClasses + " justify-between"}>
                  <div className="flex items-center gap-3">
                    <MdOutlineTour className="h-6 w-6" />
                    <span>Tour</span>
                  </div>
                  {dropdownOpen ? (
                    <RiArrowDropUpLine className="text-2xl" />
                  ) : (
                    <RiArrowDropDownLine className="text-2xl" />
                  )}
                </div>

                {/* Dropdown Items */}
                {dropdownOpen && (
                  <ul className="pl-10 mt-1 space-y-1 transition-all duration-300 cursor-pointer">
                    <li onClick={() => setActiveIndex("TourLists")}>
                      <div className="flex items-center px-2 py-2 rounded-md hover:bg-[#555] hover:text-white transition">
                        <span>Tour Lists</span>
                      </div>
                    </li>
                    <li onClick={() => setActiveIndex("Itinerary")}>
                      <div className="flex items-center px-2 py-2 rounded-md hover:bg-[#555] hover:text-white transition">
                        <span>Add Itinerary</span>
                      </div>
                    </li>
                    <li onClick={() => setActiveIndex("Availability")}>
                      <div className="flex items-center px-2 py-2 rounded-md hover:bg-[#555] hover:text-white transition">
                        <span>Add Availability</span>
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Settings */}
              <li onClick={() => setActiveIndex("Settings")}>
                <div className={menuItemClasses}>
                  <IoSettingsOutline className="h-6 w-6" />
                  <span>Settings</span>
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
