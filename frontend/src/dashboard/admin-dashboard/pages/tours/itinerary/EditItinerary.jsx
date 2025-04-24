import { useEffect, useState } from "react";
import axiosInstance from "../../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import InputComponent from "../../../../../components/InputComponent";
import ButtonComponent from "../../../../../components/ButtonComponent";

const EditItinerary = ({ tourItineraryId, closeEditTourItinerary, onUpdate }) => {
  const [tours, setTours] = useState([]);
  const [tourItinerary, setTourItinerary] = useState({
    tour_id: "",
    day_number: "",
    title: "",
    description: "",
    accommodation: "",
    meals: "",
    distance: "",
    elevation: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      try {
       const res = await axiosInstance.get(`tour-itinerary/itinerary/${tourItineraryId}`);
       const data = res.data?.data?.[0];
       console.log("Tour Itinerary Id:", tourItineraryId)
       console.log(data)

        if (!data) {
        toast.error("Itinerary not found");
        return;
        }


        setTourItinerary({
          tour_id: data.tour_id ?? "",
          day_number: data.day_number ?? "",
          title: data.title ?? "",
          description: data.description ?? "",
          accommodation: data.accommodation ?? "",
          meals: data.meals ?? "",
          distance: data.distance ?? "",
          elevation: data.elevation ?? "",
        });
      } catch (error) {
        console.error("Failed to load tour itinerary data", error);
        toast.error("Failed to load tour itinerary data");
      } finally {
        setLoading(false);
      }
    };

    if (tourItineraryId) {
      fetchItinerary();
    }
  }, [tourItineraryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourItinerary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.patch(
        `tour-itinerary/update/${tourItineraryId}`,
        tourItinerary
      );
      toast.success(res.data.message || "Itinerary updated successfully");
      setTimeout(() => {
        closeEditTourItinerary();
        onUpdate();
      }, 1000);
    } catch (error) {
      toast.error("Failed to update itinerary");
      console.error("Error updating itinerary:", error);
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
    <>
      <ToastContainer />
      {loading && <LoadingSpinner />}
      <div className="flex justify-center items-center -mt-140">
        <div className="bg-white w-[30rem] p-6 rounded-2xl shadow-xl z-[200]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Edit Itinerary</h3>
            <IoClose
              className="text-blue-500 text-2xl cursor-pointer"
              onClick={closeEditTourItinerary}
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Tour Id Dropdown */}
            <div className="flex flex-col">
              <select
                name="tour_id"
                value={tourItinerary.tour_id}
                onChange={handleChange}
                className="h-12 w-full border p-2 rounded bg-white"
              >
                <option value="">Select Tour</option>
                {tours.map((tour) => (
                  <option key={tour.tour_id} value={tour.tour_id}>
                    {tour.tour_code || `Tour ${tour.tour_id}`}
                  </option>
                ))}
              </select>
            </div>

            <InputComponent
              type="text"
              name="day_number"
              value={tourItinerary.day_number}
              onChange={handleChange}
              placeholder="Day Number"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="title"
              value={tourItinerary.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="description"
              value={tourItinerary.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="accommodation"
              value={tourItinerary.accommodation}
              onChange={handleChange}
              placeholder="Accommodation"
              className="w-full border px-3 py-2 rounded"
            />
            <InputComponent
              type="text"
              name="meals"
              value={tourItinerary.meals}
              onChange={handleChange}
              placeholder="Meals"
              className="w-full border px-3 py-2 rounded"
            />
            <InputComponent
              type="text"
              name="distance"
              value={tourItinerary.distance}
              onChange={handleChange}
              placeholder="Distance (e.g. 50km)"
              className="w-full border px-3 py-2 rounded"
            />
            <InputComponent
              type="text"
              name="elevation"
              value={tourItinerary.elevation}
              onChange={handleChange}
              placeholder="Elevation (e.g. 1200m)"
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-4 mt-4">
              <ButtonComponent
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                text="Update"
              />
              <button
                type="button"
                onClick={closeEditTourItinerary}
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
};

export default EditItinerary;
