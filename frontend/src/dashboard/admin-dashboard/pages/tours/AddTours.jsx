import { IoClose } from "react-icons/io5";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTours = ({ closeAddTour, fetchTours }) => {
  const [tourField, setTourField] = useState({
    tourName: "",
    price: "",
    duration: "",
    distance: "",
    difficulty: "",
    tour_code: "",
    next_departure: "",
    category: "",
    bike_hire_cost: "",
    description: "",
    tourImage: null
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTourField((prevFields) => ({
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
    setTourField((prevFields) => ({
      ...prevFields,
      Image: file, 
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!tourField.tourName.trim()) validationErrors.tourName = "Bike name is required";
    if (!tourField.price.trim() || isNaN(tourField.price)) validationErrors.price = "Price is required";
    if (!tourField.duration.trim()) validationErrors.duration = "duration is required";
    if (!tourField.distance.trim() || isNaN(tourField.distance)) validationErrors.distance = "Distance is required";
    if (!tourField.difficulty.trim()) validationErrors.difficulty = "Difficulty is required";
    if (!tourField.tour_code.trim()) validationErrors.tour_code = "tour_code is required";
    if (!tourField. next_departure.trim()) validationErrors. next_departure = " next_departure is required";
    if (!tourField.category.trim()) validationErrors.category = "Category is required"; 
    if (!tourField. bike_hire_cost.trim()) validationErrors. bike_hire_cost = " Bikehire Cost is required"; 
    if (!tourField.description.trim()) validationErrors.description = "Description is required";
    if (!tourField.Image) validationErrors.Image = "Tour image is required"; 
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
    Object.keys(tourField).forEach((key) => {
      formData.append(key, tourField[key]);
    });

    try {
      const res = await axiosInstance.post("tour/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Tour created successfully:", res.data.message);
      toast.success("Tour created successfully");
      fetchTours();

      setTimeout(() => {
        closeAddTour();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding tour");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="flex justify-center items-center -mt-140">
        <div className="bg-white p-6 h-auto w-[30rem] rounded-2xl shadow-lg z-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-center font-semibold text-xl">Add Bikes</h3>
            <IoClose className="text-blue-500 text-2xl cursor-pointer" onClick={closeAddTour} />
          </div>
          <ToastContainer />
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Fields with Error Handling */}
            {[
              { name: "tourName", placeholder: "Tour Name", type: "text" },
              { name: "price", placeholder: "Price", type: "number" },
              { name: "duration", placeholder: "Duration", type: "text" },
              { name: "distance", placeholder: "Distance", type: "number" },
              { name: "tour_code", placeholder: "Tour Code", type: "text" },
              { name: "next_departure", placeholder: "Next Departure", type: "date" },
              { name: "bike_hire_cost", placeholder: "Bike hire cost", type: "number" },
              { name: "description", placeholder: "Description", type: "text" },
            ].map(({ name, placeholder, type }) => (
              <div key={name} className="flex flex-col">
                <InputComponent className="h-12 w-full pl-5" placeholder={placeholder}
                 type={type} name={name} value={tourField[name]} onChange={handleOnChange} />
                <div className="text-red-500 text-sm min-h-[1.5rem]">{errors[name]}</div>
              </div>
            ))}

            {/* Difficulty Dropdown */}
            <div className="flex flex-col">
              <select
                name="difficulty"
                value={tourField.difficulty}
                onChange={handleOnChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Select Difficulty</option>
                {['Easy', 'Medium', 'Hard', 'Extreme'].map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} 
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.difficulty}</div>
            </div>


            {/* Category Dropdown */}
            <div className="flex flex-col">
              <select
                name="category"
                value={tourField.category}
                onChange={handleOnChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Select a category</option>
                {['Adventure Tours', 'Nature & Scenic Tours', 'City Tours', 'Long-Distance Tours'].map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} 
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.category}</div>
            </div>

            {/* File Input */}
            <div className="flex flex-col">
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="block w-full border p-2 rounded" />
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.tourImage}</div>
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

export default AddTours;
