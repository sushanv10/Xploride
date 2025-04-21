import { useEffect, useState } from "react";
import FormComponent from "../../../../components/FormComponent";
import { toast, ToastContainer } from "react-toastify";
import AddTour from "./AddTours";
import EditTour from "./EditTour";
import axiosInstance from "../../../../config/AxiosConfig";

const TourLists = () => {
  const [tours, setTours] = useState([]);
  const [showAddTour, setShowAddTour] = useState(false);
  const [showEditTour, setShowEditTour] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
  try {
    const res = await axiosInstance.get("tour/");
    console.log("API Response:", res.data);

    const toursArray = res.data?.tour;
    if (!Array.isArray(toursArray)) {
      console.error("Tours data is not an array:", toursArray);
      return;
    }

    const formattedData = toursArray.map((tour) => ({
      id: tour.tour_id,
      price: tour.price,
      duration: tour.duration,
      distance: tour.distance,
      difficulty: tour.difficulty,
      tour_code: tour.tour_code,
      next_departure: tour.next_departure,
      category: tour.category,
      tourName: tour.tourName,
      bike_hire_cost: tour.bike_hire_cost,
      description: tour.description,
      image: tour.tourImage, 
    }));

    setTours(formattedData);
  } catch (error) {
    console.error("Error fetching tours", error);
  }
  };


  const handleAddTourClick = () => {
    setShowAddTour(!showAddTour);
  };

  const handleEdit = (tourId) => {
    setSelectedTourId(tourId);
    setShowEditTour(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`tour/delete/${id}`);
      console.log("Tour Deleted:", res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        fetchTours();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting tour");
    }
  };

  const headers = [
    "Id",
    "Price",
    "Duration",
    "Distance",
    "Difficulty",
    "Tour Code",
    "Next Departure",
    "Category",
    "Tour Name",
    "Hire Cost",
    "Description",
    "Image",
    "Action",
  ];

  return (
    <>
      <ToastContainer />

       {showAddTour && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {/* <div className="absolute z-100 left-260 top-27">
       <ButtonComponent text={'Add Images'}/>

      </div> */}

      <FormComponent
        text={"Add Tour"}
        onClick={handleAddTourClick}
        title={"Tour Lists"}
        dropDown={"Tour"}
        headers={headers}
        data={tours}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {showAddTour && (
        <AddTour
          closeAddTour={() => setShowAddTour(false)}
          fetchTours={fetchTours}
        />
      )}

      {showEditTour && selectedTourId && (
        <EditTour
          tourId={selectedTourId}
          closeEditTour={() => setShowEditTour(false)}
          onUpdate={fetchTours}
        />
      )}
    </>
  );
};

export default TourLists;
