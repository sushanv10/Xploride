import { IoClose } from "react-icons/io5";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const EditTour = ({ closeEditTour, onUpdate, tourId }) => {
  const [tours, setTours] = useState({
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
    tourImage: null,
    image: null
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTour = async () =>{
      setLoading(true); 

      try {
        const res = await axiosInstance.get(`tour/${tourId}`)
        const data = res.data

        setTours({
          tourName: data.tourName || "",
          price: data.price || "",
          duration: data.duration || "",
          distance: data.distance || "",
          difficulty: data.difficulty || "",
          tour_code: data.tour_code || "",
          next_departure: data.next_departure?.split("T")[0] || "",
          category: data.category || "",
          bike_hire_cost: data.bike_hire_cost || "",
          description: data.description || "",
          tourImage: null, 
        })
      } catch (error) {
        console.error("Failed to load tour data", error);
        toast.error("Failed to load tour data");
        
      }finally {
        setLoading(false);
      }
    }
     if (tourId) {
      fetchTour();
    }
  }, [tourId]);

 const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setTours({ ...tours, image: files[0] });
    } else {
      setTours({ ...tours, [name]: value });
    }
  };

  // const validateForm = () => {
  //   const validationErrors = {};
  //   if (!tourField.tourName.trim()) validationErrors.tourName = "Tour name is required";
  //   if (!tourField.price.trim() || isNaN(tourField.price)) validationErrors.price = "Price is required";
  //   if (!tourField.duration.trim()) validationErrors.duration = "Duration is required";
  //   if (!tourField.distance.trim() || isNaN(tourField.distance)) validationErrors.distance = "Distance is required";
  //   if (!tourField.difficulty.trim()) validationErrors.difficulty = "Difficulty is required";
  //   if (!tourField.tour_code.trim()) validationErrors.tour_code = "Tour code is required";
  //   if (!tourField.next_departure.trim()) validationErrors.next_departure = "Next departure is required";
  //   if (!tourField.bike_hire_cost.trim()) validationErrors.bike_hire_cost = "Bike hire cost is required";
  //   if (!tourField.description.trim()) validationErrors.description = "Description is required";
  //   return validationErrors;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     setLoading(false);
  //     return;
  //   }

  //   const formData = new FormData();
  //   Object.entries(tourField).forEach(([key, value]) => {
  //     if (value !== null && value !== "") {
  //       formData.append(key, value);
  //     }
  //   });

  //   try {
  //     const res = await axiosInstance.put(`tour/update/${tourId}`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     console.log(res)

  //     toast.success("Tour updated successfully");
  //     fetchTours();
  //     setTimeout(() => {
  //       closeEditTour();
  //     }, 1000);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response?.data?.message || "Error updating tour");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the loading spinner while updating the bike data
    const formData = new FormData();
  
    // Append all fields, including the image field
    formData.append("tourName", tours.tourName);
    formData.append("price", tours.price);
    formData.append("duration", tours.duration);
    formData.append("distance", tours.distance);
    formData.append("difficulty", tours.difficulty);
    formData.append("tour_code", tours.tour_code);
    formData.append("next_departure", tours.next_departure);
    formData.append("category", tours.category);
    formData.append("bike_hire_cost", tours.bike_hire_cost);
    formData.append("description", tours.description);
    // Assuming you have an image input:
    if (tours.image) {
      formData.append("Image", tours.image);  // Append the image from the state
    }

    try {
      const res = await axiosInstance.patch(`tour/update/${tourId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      setTimeout(()=> {
        closeEditTour();
        onUpdate(); 

      },1000)
     
    } catch (error) {
      toast.error("Failed to update tour");
      console.error("Error updating tour:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
   <>
      <ToastContainer />
      {loading && <LoadingSpinner />} {/* Show loading spinner when loading is true */}
      <div className="flex justify-center items-center -mt-140">
        <div className="bg-white w-[30rem] p-6 rounded-2xl shadow-xl z-[200]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Edit Tour</h3>
            <IoClose
              className="text-blue-500 text-2xl cursor-pointer"
              onClick={closeEditTour}
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <InputComponent
              type="text"
              name="tourName"
              value={tours.tourName}
              onChange={handleChange}
              placeholder="Tour Name"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="price"
              value={tours.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="duration"
              value={tours.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="text"
              name="distance"
              value={tours.distance}
              onChange={handleChange}
              placeholder="Distance"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="description"
              value={tours.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="text"
              name="tour_code"
              value={tours.tour_code}
              onChange={handleChange}
              placeholder="Tour Code"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="date"
              name="next_departure"
              value={tours.next_departure}
              onChange={handleChange}
              placeholder="Next Departure"
              className="w-full border px-3 py-2 rounded"
              required
            />

            <InputComponent
              type="number"
              name="bike_hire_cost"
              value={tours.bike_hire_cost}
              onChange={handleChange}
              placeholder="Bike Hire Cost"
              className="w-full border px-3 py-2 rounded"
              required
            />
            {/* Category Dropdown */}
            <div className="flex flex-col">
              <select
                name="category"
                value={tours.category}
                onChange={handleChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Select a category</option>
                {['Adventure Tours', 'Nature & Scenic Tours', 'City Tours', 'Long-Distance Tours'].map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} 
                  </option>
                ))}
              </select>
            </div>

               {/* Category Dropdown */}
            <div className="flex flex-col">
              <select
                name="difficulty"
                value={tours.difficulty}
                onChange={handleChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Choose Difficulty</option>
                {['Easy', 'Medium', 'Hard', 'Extreme'].map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} 
                  </option>
                ))}
              </select>
            </div>

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
                onClick={closeEditTour}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
)}

export default EditTour;
