import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import FormComponent from '../../../../../components/FormComponent';
import axiosInstance from '../../../../../config/AxiosConfig';
import AddAvailability from './AddAvailability';


const AvailabilityLists = () => {
  const [availability, setAvailability] = useState([]);
  const [showAddTourAvailability, setShowAddTourAvailability] = useState(false);
  const [showEditTourAvailability, setShowEditTourAvailability] = useState(false);
  const [selectedTourAvailabilityId, setSelectedTourAvailabilityId] = useState([]);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
  try {
    const res = await axiosInstance.get("tour-availability/");
    console.log("API Response:", res.data);

    const tourAvailabilityArray = res.data.tourAvailability;
    if (!Array.isArray(tourAvailabilityArray)) {
      console.error("Tours data is not an array:", tourAvailabilityArray);
      return;
    }

    const formattedData = tourAvailabilityArray.map((availability) => ({
      id: availability.id,
      tourId: availability.tour_id,
      available_date: availability.available_date,
      available_slots: availability.available_slots,
      availability_status: availability.availability_status,
     
    }));

    setAvailability(formattedData);
  } catch (error) {
    console.error("Error fetching tours", error);
  }
  };


  const handleAddTouravailabilityClick = () => {
    setShowAddTourAvailability(!showAddTourAvailability);
  };

  const handleEdit = (tour_id) => {
    setSelectedTourAvailabilityId(tour_id);
    setShowEditTourAvailability(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`tour-availability/delete/${id}`);
      console.log("Tour Avaibility Deleted:", res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        fetchAvailability();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting tour availability");
    }
  };

  const headers = [
    "Id",
    "Tour Id",
    "Date",
    "Slots",
    "Status",
    "Action"
  ];

  return (
    <>
      <ToastContainer />

       {showAddTourAvailability && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}


      <FormComponent
        text={"Add Availability"}
        onClick={handleAddTouravailabilityClick}
        title={"Tour Itinerary Lists"}
        dropDown={"Itinerary"}
        headers={headers}
        data={availability}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {showAddTourAvailability && (
        <AddAvailability
          closeAddTourAvailability={() => setShowAddTourAvailability(false)}
          fetchAvailabilities={fetchAvailability}
        />
      )}

      {/* {showEditTourAvailability && selectedTourAvailabilityId && (
        <EditItinerary
          tourItineraryId={selectedTourAvailabilityId}
          closeEditTourItinerary={() => setShowEditTourAvailability(false)}
          onUpdate={fetchAvailability}
        />
      )}  */}
    </>
  );
};

export default AvailabilityLists
