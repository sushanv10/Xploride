import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";


export default function EditBike({ bikeId, closeEditBike, onUpdate }) {
  const [bike, setBike] = useState({
    bikeName: "",
    brand: "",
    model: "",
    category: "",
    price: "",
    availability: "",
    description: "",
    bikeImage: null,
    image: null, 
    weight: "",
    wheel: "",
    size: ""
  });
  
  const [loading, setLoading] = useState(false); // State to handle loading spinner visibility

  useEffect(() => {
    const fetchBike = async () => {
      setLoading(true); // Show the loading spinner while fetching data
      try {
        const res = await axiosInstance.get(`bikes/${bikeId}`);
        const data = res.data.bike;

        setBike({
          bikeName: data.bikeName ?? "",
          brand: data.brand ?? "",
          model: data.model ?? "",
          category: data.category ?? "",
          price: data.price ?? "",
          availability: data.availability ?? "",
          description: data.description ?? "",
          bikeImage: null,
          weight: data.weight ?? "",
          wheel: data.wheel ?? "",
          size: data.size ?? ""
        });
      } catch (error) {
        console.error("Failed to load bike data", error);
        toast.error("Failed to load bike data");
      } finally {
        setLoading(false); // Hide the loading spinner once data is fetched
      }
    };

    if (bikeId) {
      fetchBike();
    }
  }, [bikeId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setBike({ ...bike, image: files[0] });
    } else {
      setBike({ ...bike, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const formData = new FormData();
  
    // Append all fields, including the image field
    formData.append("bikeName", bike.bikeName);
    formData.append("brand", bike.brand);
    formData.append("model", bike.model);
    formData.append("category", bike.category);
    formData.append("price", bike.price);
    formData.append("availability", bike.availability);
    formData.append("description", bike.description);
    formData.append("weight", bike.weight);
    formData.append("wheel", bike.wheel);
    formData.append("size", bike.size);
    // Assuming you have an image input:
    if (bike.image) {
      formData.append("Image", bike.image);  // Append the image from the state
    }

    try {
      const res = await axiosInstance.patch(`bikes/update/${bikeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      setTimeout(() => {
        closeEditBike();
        onUpdate(); 

      },1000)
     
    } catch (error) {
      toast.error("Failed to update bike");
      console.error("Error updating bike:", error);
    } finally {
      setLoading(false); // Hide the loading spinner once the update is complete
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <LoadingSpinner />} {/* Show loading spinner when loading is true */}
      <div className="flex justify-center items-center -mt-140">
        <div className="bg-white w-[30rem] p-6 rounded-2xl shadow-xl z-[200]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Edit Bike</h3>
            <IoClose
              className="text-blue-500 text-2xl cursor-pointer"
              onClick={closeEditBike}
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <InputComponent
              type="text"
              name="bikeName"
              value={bike.bikeName}
              onChange={handleChange}
              placeholder="Bike Name"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="brand"
              value={bike.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="model"
              value={bike.model}
              onChange={handleChange}
              placeholder="Model"
              className="w-full border px-3 py-2 rounded"
              required
            />
            {/* Category Dropdown */}
            <div className="flex flex-col">
              <select
                name="category"
                value={bike.category}
                onChange={handleChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Select a category</option>
                {['road', 'mountain', 'hybrid', 'electric'].map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} 
                  </option>
                ))}
              </select>
            </div>

            <InputComponent
              type="number"
              name="price"
              value={bike.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="description"
              value={bike.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="number"
              name="weight"
              value={bike.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="number"
              name="wheel"
              value={bike.wheel}
              onChange={handleChange}
              placeholder="Wheel"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="number"
              name="size"
              value={bike.size}
              onChange={handleChange}
              placeholder="Size"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <div className="flex justify-end gap-4 mt-4">
              <ButtonComponent
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                text={'Update'}
              > 
                Update
              </ButtonComponent>
              <button
                type="button"
                onClick={closeEditBike}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
