import { useState, useEffect } from "react";
import HeaderComponent from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import AdminProfile from "./AdminProfile";
import Settings from "./Settings";
import CategoryLists from "./category/CategoryLists";
import ProductLists from "./products/ProductLists";
import BikeLists from "./bikes/BikeLists";
import TourLists from "./tours/TourLists";
import ItineraryLists from "./tours/itinerary/ItineraryLists";
import AvailabilityLists from "./tours/availability/AvailabilityLists";

const AdminDashboard = () => {
  // Load activePage from localStorage (or default to 'Dashboard')
  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || "Dashboard"
  );

  // Save activePage to localStorage 
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const renderActiveComponent = () => {
    switch (activePage) {
      case "Dashboard":
        return <Main />;
      case "Profile":
        return <AdminProfile />;
      case "CategoryLists":
        return <CategoryLists />;
      case "ProductLists":
        return <ProductLists />;
      case "BikeLists":
        return <BikeLists />;
      case "TourLists":
        return <TourLists />;
      case "Itinerary":
        return <ItineraryLists/>;
      case "Availability":
        return <AvailabilityLists/>;
      case "Settings":
        return <Settings />;
      default:
        return <Main />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActiveIndex={setActivePage} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <HeaderComponent setActiveIndex={setActivePage} />
        <div className="flex-grow mt-20 p-5">{renderActiveComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
