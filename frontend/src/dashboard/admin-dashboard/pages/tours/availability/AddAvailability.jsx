import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";
import axiosInstance from "../../../../../config/AxiosConfig";

const AddAvailability = ({ closeAddTourAvailability, fetchAvailabilities }) => {
  const [tourAvailabilityField, setTourAvailabilityField] = useState({
    tour_id: "",
    available_date: "",
    available_slots: "",
    availability_status: "",
    end_date: ""
    
  });

  const [tours, setTours] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTourAvailabilityField((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    const fields = [
      "tour_id",
       "available_date",
       "available_slots",
       "availability_status",
       "end_date",
    ];

    fields.forEach((field) => {
      const value = tourAvailabilityField[field];
      if (!value || value.toString().trim() === "") {
        validationErrors[field] = `${field.replace("_", " ")} is required`;
      } else if ((field === "day_number" ) && isNaN(value)) {
        validationErrors[field] = `${field.replace("_", " ")} must be a number`;
      }
    });

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
    Object.entries(tourAvailabilityField).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axiosInstance.post("tour-availability/add", formData);
      toast.success("Tour Availability created successfully");
      console.log(res)
      fetchAvailabilities();
      setTimeout(() => {
        closeAddTourAvailability();
      }, 1000);
    } catch (error) {
      console.error("Add availability error:", error);
      toast.error(error.response?.data?.message || "Failed to add availability");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tours on mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axiosInstance.get("tour/");
        setTours(response.data?.tour || []);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="flex justify-center items-center -mt-140">
      <div className="bg-white p-6 h-auto w-[30rem] rounded-2xl shadow-lg z-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-center font-semibold text-xl">Add Tour Availability</h3>
          <IoClose className="text-blue-500 text-2xl cursor-pointer" onClick={closeAddTourAvailability} />
        </div>

        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tour Id Dropdown */}
          <div className="flex flex-col">
            <select
              name="tour_id"
              value={tourAvailabilityField.tour_id}
              onChange={handleOnChange}
              className="h-12 w-full border p-2 rounded bg-white"
            >
              <option value="">Select Tour</option>
              {tours.map((tour) => (
                <option key={tour.tour_id} value={tour.tour_id}>
                  {tour.tour_code || `Tour ${tour.tour_id}`}
                </option>
              ))}
            </select>
            <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.tour_id}</div>
          </div>

          {/* Input Fields */}
          {[
            
            { name: "available_date", placeholder: "Date", type: "date" },
            { name: "end_date", placeholder: "Date", type: "date" },
            { name: "available_slots", placeholder: "Slots", type: "number" },
          ].map(({ name, placeholder, type }) => (
            <div key={name} className="flex flex-col">
              <InputComponent
                className="h-12 w-full pl-5"
                placeholder={placeholder}
                type={type}
                name={name}
                value={tourAvailabilityField[name]}
                onChange={handleOnChange}
              />
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors[name]}</div>
            </div>
          ))}
        
          {/* Availability */}
           <div className="flex flex-col">
              <select
                name="availability_status"
                value={tourAvailabilityField.availability_status}
                onChange={handleOnChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Select Status</option>
                {['Available', 'UnAvailable'].map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)} 
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.availability_status}</div>
            </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <ButtonComponent
              text={loading ? "Adding..." : "Add Availability"}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAvailability;
