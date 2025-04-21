import { IoClose } from "react-icons/io5";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBikes = ({ closeAddBike, fetchBikes }) => {
  const [bikeFields, setBikeFields] = useState({
    bikeName: "",
    brand: "",
    model: "",
    category: "",
    price: "",
    availability: "",
    description: "",
    bikeImage: null,
    weight: "",
    wheel: "",
    size: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBikeFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBikeFields((prevFields) => ({
      ...prevFields,
      Image: file, 
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!bikeFields.bikeName.trim()) validationErrors.bikeName = "Bike name is required";
    if (!bikeFields.brand.trim()) validationErrors.brand = "Brand is required";
    if (!bikeFields.model.trim()) validationErrors.model = "Model is required";
    if (!bikeFields.category.trim()) validationErrors.category = "Category is required"; 
    if (!bikeFields.price.trim() || isNaN(bikeFields.price)) validationErrors.price = "Price is required";
    if (!bikeFields.description.trim()) validationErrors.description = "Description is required";
    if (!bikeFields.Image) validationErrors.Image = "Bike image is required"; 
    if (!bikeFields.weight.trim()) validationErrors.weight = "Weight is required";
    if (!bikeFields.wheel.trim()) validationErrors.wheel = "Wheel is required";
    if (!bikeFields.size.trim()) validationErrors.size = "Size is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(bikeFields).forEach((key) => {
      formData.append(key, bikeFields[key]);
    });

    try {
      // Make the API request to add the bike
      const res = await axiosInstance.post("bikes/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data.message);
      // Show success toast
      toast.success("Bike created successfully");
      fetchBikes();

      // Close the modal after successful creation
      setTimeout(() => {
        closeAddBike();
      }, 1000);
    } catch (error) {
      console.error(error);
      // Show error toast if the request fails
      toast.error(error.response?.data?.message || "Error adding bike");
    } finally {
      // Ensure loading state is set to false after request completion
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center -mt-140">
        <div className="bg-white p-6 h-auto w-[30rem] rounded-2xl shadow-lg z-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-center font-semibold text-xl">Add Bikes</h3>
            <IoClose className="text-blue-500 text-2xl cursor-pointer" onClick={closeAddBike} />
          </div>
          <ToastContainer />
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Fields with Error Handling */}
            {[
              { name: "bikeName", placeholder: "Bike Name", type: "text" },
              { name: "brand", placeholder: "Brand", type: "text" },
              { name: "model", placeholder: "Model", type: "text" },
              { name: "price", placeholder: "Price", type: "number" },
              { name: "description", placeholder: "Description", type: "text" },
              { name: "weight", placeholder: "Wheels", type: "number" },
              { name: "wheel", placeholder: "Weight", type: "number" },
              { name: "size", placeholder: "Size", type: "number" },
            ].map(({ name, placeholder, type }) => (
              <div key={name} className="flex flex-col">
                <InputComponent className="h-12 w-full pl-5" placeholder={placeholder}
                 type={type} name={name} value={bikeFields[name]} onChange={handleOnChange} />
                <div className="text-red-500 text-sm min-h-[1.5rem]">{errors[name]}</div>
              </div>
            ))}

            {/* Category Dropdown */}
            <div className="flex flex-col">
              <select
                name="category"
                value={bikeFields.category}
                onChange={handleOnChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Select a category</option>
                {['road', 'mountain', 'hybrid', 'electric'].map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} 
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.category}</div>
            </div>

            {/* File Input */}
            <div className="flex flex-col">
              <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full border p-2 rounded" />
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.bikeImage}</div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <ButtonComponent text={loading ? "Adding..." : "Add Bike"} type="submit" disabled={loading} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBikes;
