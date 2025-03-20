import { useState } from "react";
import HeaderComponent from "./Header";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <div className="text-white text-center">Dashboard</div>;
      case "ProductLists":
        return <div className="text-white text-center">Product Lists</div>;
      case "AddProducts":
        return <div className="text-white text-center">Add Products</div>;
      case "BikeLists":
        return <div className="text-white text-center">Bike Lists</div>;
      case "AddBikes":
        return <div className="text-white text-center">Add Bikes</div>;
      default:
        return <div className="text-white text-center">Dashboard</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <HeaderComponent />
        <div className="flex-grow mt-20 p-5">{renderActiveComponent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
