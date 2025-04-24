import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import FormComponent from '../../../../../components/FormComponent';
import axiosInstance from '../../../../../config/AxiosConfig';
import AddItinerary from './AddItinerary';
import EditItinerary from './EditItinerary';

const ItineraryLists = () => {
  const [itinerary, setItinerary] = useState([]);
  const [showAddItinerary, setShowAddItinerary] = useState(false);
  const [showEditItinerary, setShowEditItinerary] = useState(false);
  const [selectedItineraryId, setSelectedItineraryId] = useState([]);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
  try {
    const res = await axiosInstance.get("tour-itinerary/");
    console.log("API Response:", res.data);

    const tourItineraryArray = res.data.tourItinerary;
    if (!Array.isArray(tourItineraryArray)) {
      console.error("Tours data is not an array:", tourItineraryArray);
      return;
    }

    const formattedData = tourItineraryArray.map((itinerary) => ({
      id: itinerary.id,
      tourId: itinerary.tour_id,
      day_number: itinerary.day_number,
      title: itinerary.title,
      description: itinerary.description,
      accommodation: itinerary.accommodation,
      meals: itinerary.meals,
      distance: itinerary.distance,
      elevation: itinerary.elevation, 
    }));

    setItinerary(formattedData);
  } catch (error) {
    console.error("Error fetching tours", error);
  }
  };


  const handleAddTourItineraryClick = () => {
    setShowAddItinerary(!showAddItinerary);
  };

  const handleEdit = (tour_id) => {
    setSelectedItineraryId(tour_id);
    setShowEditItinerary(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`tour-itinerary/delete/${id}`);
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
    "Tour Id",
    "day_number",
    "Title",
    "Description",
    "Accommodation",
    "Meals",
    "Distance",
    "Elevation",
    "Action"
  ];

  return (
    <>
      <ToastContainer />

       {showAddItinerary && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {/* <div className="absolute z-100 left-260 top-27">
       <ButtonComponent text={'Add Images'}/>

      </div> */}

      <FormComponent
        text={"Add Itinerary"}
        onClick={handleAddTourItineraryClick}
        title={"Tour Itinerary Lists"}
        dropDown={"Itinerary"}
        headers={headers}
        data={itinerary}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {showAddItinerary && (
        <AddItinerary
          closeAddTourItinerary={() => setShowAddItinerary(false)}
          fetchItineraries={fetchItineraries}
        />
      )}

      {showEditItinerary && selectedItineraryId && (
        <EditItinerary
          tourItineraryId={selectedItineraryId}
          closeEditTourItinerary={() => setShowEditItinerary(false)}
          onUpdate={fetchItineraries}
        />
      )}
    </>
  );
};

export default ItineraryLists
