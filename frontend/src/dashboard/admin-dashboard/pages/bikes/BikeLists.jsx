import { useEffect, useState } from "react";
import FormComponent from "../../../../components/FormComponent";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../../../config/AxiosConfig";
import EditBike from "./EditBike";
import AddBikes from "./AddBikes";

const BikeLists = () => {
  const [bikes, setBikes] = useState([]);
  const [showAddBike, setShowAddBike] = useState(false);
  const [showEditBike, setShowEditBike] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState(null);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await axiosInstance.get("bikes/");
      console.log("Fetched bikes:", res.data);

      if (!res.data || !Array.isArray(res.data.bikes)) {
        console.error("Invalid response structure:", res.data);
        return;
      }

      const formattedData = res.data.bikes.map((bike) => ({
        id: bike.bikeId,
        name: bike.bikeName,
        brand: bike.brand,
        model: bike.model,
        category: bike.category,
        price: bike.price,
        description: bike.description,
        image: bike.bikeImage,
        weight: bike.weight,
        wheel: bike.wheel,
        size: bike.size
      }));

      setBikes(formattedData);
    } catch (error) {
      console.error("Error fetching bikes", error);
    }
  };

  const handleAddProductClick = () => {
    setShowAddBike(!showAddBike);
    
  };

  const handleEdit = (bikeId) => {
    setSelectedBikeId(bikeId);
    setShowEditBike(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`bikes/delete/${id}`)
      console.log("Bike Deleted:", res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        fetchBikes();
      },500)
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting bike")
      
    }
  };

  const headers = [
    "Id",
    "Bike Name",
    "Brand",
    "Model",
    "Category",
    "Price",
    "Description",
    "Image",
    "Weight",
    "Wheels",
    "Size",
    "Action",
  ];

  return (
    <>
      <ToastContainer />

      {showAddBike && (
         <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {showEditBike && (
         <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      <FormComponent
        text={"Add Bike"}
        onClick={handleAddProductClick}
        title={"Bike Lists"}
        dropDown={"Bike"}
        headers={headers}
        data={bikes}
        handleEdit={(id) => handleEdit(id)}
        handleDelete={handleDelete}
      />

      {
        showAddBike && (
          <AddBikes
          closeAddBike={() => setShowAddBike(false)}
          fetchBikes={fetchBikes}
          />
        )
      }

      {showEditBike && selectedBikeId && (
        <EditBike
          bikeId={selectedBikeId}
          closeEditBike={() => setShowEditBike(false)}
          onUpdate={fetchBikes}
        />
      )}
    </>
  );
};

export default BikeLists;
