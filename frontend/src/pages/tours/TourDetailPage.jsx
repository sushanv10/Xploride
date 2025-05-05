import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/AxiosConfig";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IoPricetagOutline, IoTrailSignOutline } from "react-icons/io5";
import { GoCalendar } from "react-icons/go";
import { GiPathDistance } from "react-icons/gi";
import { MdAccessTime, MdOutlineDirectionsBike } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import Footer from "../footer/Footer";
import TourData from "../../utils/data/TourData";
import HeadingComponent from "../../components/HeadingComponent";
import ButtonComponent from "../../components/ButtonComponent";

const TourDetailPage = () => {
  const [tour, setTour] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedTours, setRelatedTours] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const { id } = useParams();

  useEffect(() => {
  const fetchRelatedTours = async () => {
    if (tour && tour.category) {
      try {
        const response = await axiosInstance.get(`/tour/category/${tour.category}`);
        const fetchedRelatedTours = response.data;
        setRelatedTours(fetchedRelatedTours.slice(0,3)); 
      } catch (error) {
        console.log("Error fetching related tours:", error);
      }
    }
  };

  fetchRelatedTours();
  }, [tour]);


  // Fetch tour details
  useEffect(() => {
    const fetchSingleTour = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`tour/${id}`);
        const fetchedTour = response.data;
        setTour(fetchedTour);
        console.log("Tour fetched successfully", fetchedTour);
      } catch (error) {
        console.log("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSingleTour();
  }, [id]);

  // Fetch Availability
  useEffect(() => {
    const fetchAvailability = async (tour_id) => {
      try {
        const response = await axiosInstance.get(`tour-availability/${tour_id}`);
        setAvailability(response.data.data);
        console.log("Availability Fetched", response.data.data);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };
    if (id) fetchAvailability(id); 

  },[id]);

  // Fetch itinerary
  useEffect(() => {
    const fetchItinerary = async (tour_id) => {
      try {
        const response = await axiosInstance.get(`tour-itinerary/${tour_id}`);
        setItinerary(response.data.data);
        console.log("Itinerary fetched", response.data.data);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    };
    if (id) fetchItinerary(id); 
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Tour not found.
      </div>
    );
  }

  

  return (
    <div className="min-h-screen text-white relative">
      {/* Banner Image */}
      <div
        className="relative h-[700px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${tour.tourImage}')` }}
      >
        <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center z-20 text-center px-4">
          <div className="flex items-center gap-2 mb-2">
            <IoTrailSignOutline className="text-green-500 text-[40px]" />
            <h5 className="text-white text-[25px]">{tour.category}</h5>
          </div>
          <h1 className="text-4xl text-white font-bold">{tour.tourName}</h1>
        </div>
      </div>

      {/* Tab Section */}
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-700 mb-6">
          {["Overview", "Full Itinerary", "Tour Details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize text-lg transition duration-200 ${
                activeTab === tab
                  ? "text-blue-500 border-b-2 border-blue-500 font-semibold"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="absolute right-46 -mt-2">
            <ButtonComponent text={'Book Tour'}/>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-3 text-white">
          {activeTab === "Overview" && (
            <>
              <div className="flex justify-evenly gap-12 flex-wrap">
                <InfoIcon label="Price From" value={`Rs ${tour.price}`} Icon={IoPricetagOutline} />
                <InfoIcon label="Duration" value={tour.duration} Icon={GoCalendar} />
                <InfoIcon label="Distance" value={`${tour.distance} Km`} Icon={GiPathDistance} />
                <InfoIcon label="Difficulty" value={tour.difficulty} Icon={MdOutlineDirectionsBike} />
                <InfoIcon label="Tour Code" value={tour.tour_code} Icon={RiCoupon2Line} />
                <InfoIcon
                  label="Next Departure"
                  value={new Date(tour.next_departure).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  Icon={MdAccessTime}
                />
              </div>

              <div className="my-15">
                <div className="flex flex-col gap-4">
                  <HeadingComponent text={'About This TOUR'}/> 
                  <p className="text-gray-400">{tour.description}</p>
                </div>
              </div>
              
              {/* Tour Details */}
              <div className="flex flex-col gap-3 -my-5">
                <HeadingComponent text={'Tour Details'}/>
                <p><span className="font-semibold">Duration:</span> {tour.duration}</p>
                <p><span className="font-semibold">Distance:</span> {tour.distance} Km</p>
                <p><span className="font-semibold">Difficulty:</span> {tour.difficulty}</p>
                <p><span className="font-semibold">Tour Code:</span> {tour.tour_code}</p>
                <p><span className="font-semibold">Category:</span> {tour.category}</p>
                <p><span className="font-semibold">Bike Hire Cost:</span> Rs {tour.bike_hire_cost}</p>
                <p><span className="font-semibold">Price From:</span> Rs {tour.price}</p>
              </div>
            {/* Availability */} 
            <div className="my-15 flex flex-col  space-y-8">
              <HeadingComponent text="Available Tours" />
              {availability.length > 0 ? (
              <div className="w-full max-w-5xl flex flex-col gap-6">
                <div className="grid grid-cols-4 border-b border-gray-500 gap-4 text-center font-semibold text-gray-300">
                  <h4>Date</h4>
                  <h4>Slots</h4>
                  <h4>Status</h4>
                  <h4>Action</h4>
                </div>

              {availability.map((item) => (
                <div
                  key={item.availability_id}
                  className="grid grid-cols-4 gap-4 items-center text-center border-b border-gray-500 py-3"
                >
                  <p>
                    {new Date(item.available_date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(item.end_date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p> 
                  <p>{item.available_slots}</p>
                  <p>{item.availability_status}</p>
                  <ButtonComponent text="Book Tour" />
                </div>
                ))}
              </div>
                ) : (
                  <p className="italic text-gray-400">No Availability for this tour.</p>
                )}
              </div>

              {/* Itinerary */}
              <div className="my-15">
                <HeadingComponent text={'Itinerary'}/>
                {itinerary.length > 0 ? (
                <div className="space-y-8">
                  {itinerary.map((item) => (
                    <div
                      key={item.itinerary_id}
                      className="border-b border-gray-700 rounded-sm p-6"
                    >
                      <h3 className="text-xl font-semibold text-blue-400 mb-2">
                        Day {item.day_number}: {item.title}
                      </h3>
                       <p className="text-gray-300 mb-2">{item.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-400">No itinerary available for this tour.</p>
              )}
              </div> 

              <div className="my-18 ">
                <HeadingComponent text={'Suggested Tours For You'}/>
                  {relatedTours.length > 0 ? (
                    <TourData data={relatedTours} />
                  ) : (
                    <p className="italic text-gray-400">No related tours found.</p>
                  )}
              </div>
            </>
          )}

          {activeTab === "Full Itinerary" && (
            <>
              {itinerary.length > 0 ? (
                <div className="space-y-8">
                  {itinerary.map((item) => (
                    <div
                      key={item.itinerary_id}
                      className="border border-gray-700 rounded-lg p-6"
                    >
                      <h3 className="text-xl font-semibold text-blue-400 mb-2">
                        Day {item.day_number}: {item.title}
                      </h3>
                      <p className="text-gray-300 mb-2">{item.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-400">
                        <p><span className="text-white font-medium">Accommodation:</span> {item.accommodation}</p>
                        <p><span className="text-white font-medium">Meals:</span> {item.meals}</p>
                        <p><span className="text-white font-medium">Distance:</span> {item.distance} </p>
                        <p><span className="text-white font-medium">Elevation:</span> {item.elevation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-400">No itinerary available for this tour.</p>
              )}
            </>
          )}

          {activeTab === "Tour Details" && (
            <>
              <p><span className="font-semibold">Duration:</span> {tour.duration}</p>
              <p><span className="font-semibold">Distance:</span> {tour.distance}</p>
              <p><span className="font-semibold">Difficulty:</span> {tour.difficulty}</p>
              <p><span className="font-semibold">Tour Code:</span> {tour.tour_code}</p>
              <p><span className="font-semibold">Category:</span> {tour.category}</p>
              <p><span className="font-semibold">Bike Hire Cost:</span> Rs {tour.bike_hire_cost}</p>
            </>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="">
        <Footer/>
      </div>
    </div>
  );
};

// 🔹 InfoIcon component
const InfoIcon = ({ label, value, Icon }) => (
  <div className="flex flex-col items-center gap-2 min-w-[100px]">
    <Icon className="text-gray-500 text-2xl" />
    <p className="text-gray-400">{label}</p>
    <h5 className="text-white text-sm text-center">{value}</h5>
  </div>
);

export default TourDetailPage;
