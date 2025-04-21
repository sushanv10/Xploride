import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/AxiosConfig";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IoPricetagOutline, IoTrailSignOutline } from "react-icons/io5";
import ButtonComponent from "../../components/ButtonComponent";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GoCalendar } from "react-icons/go";
import { GiPathDistance } from "react-icons/gi";
import { MdAccessTime, MdOutlineDirectionsBike } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import Footer from "../footer/Footer";

const TourDetailPage = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleTour = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`tour/${id}`);
        const fetchedTour = response.data;
        console.log("Tour fetched successfully", fetchedTour);
        setTour(fetchedTour);
      } catch (error) {
        console.log("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleTour();
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
      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-700 mb-6">
          {["overview", "itinerary", "details"].map((tab) => (
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

        </div>

        {/* Tab Content */}
        <div className="space-y-3 text-white">
          {activeTab === "overview" && (
            <>
            <div className="flex justify-evenly gap-12">
                <div className="flex flex-col items-center gap-2">
                    <IoPricetagOutline   className='text-gray-500 text-2xl' />
                    <p className="text-gray-400 ">Price From</p>
                    <h5 className='text-white text-sm '>Rs {tour.price}</h5>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <GoCalendar className='text-gray-500 text-2xl' />
                    <p className="text-gray-400 ">Duration</p>
                    <h5 className='text-white text-sm '>{tour.duration}</h5>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <GiPathDistance className='text-gray-500 text-2xl' />
                    <p className="text-gray-400 ">Distance</p>
                    <h5 className='text-white text-sm '>{tour.distance} Km</h5>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <MdOutlineDirectionsBike className='text-gray-500 text-2xl' />
                    <p className="text-gray-400 ">Difficulty</p>
                    <h5 className='text-white text-sm '>{tour.difficulty}</h5>
                </div>

                
                <div className="flex flex-col items-center gap-2">
                    <RiCoupon2Line className='text-gray-500 text-2xl' />
                    <p className="text-gray-400 ">Tour Code</p>
                    <h5 className='text-white text-sm '>{tour.tour_code}</h5>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <MdAccessTime className="text-gray-500 text-2xl" />
                    <p className="text-gray-400">Next Departure</p>
                    <h5 className="text-white text-sm">
                        {new Date(tour.next_departure).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })}
                    </h5>
                </div>


            </div>

            <div className="my-15">
                <div className="flex flex-col gap-4">
                    <h4 className="text-blue-400 text-4xl">About This Bike Tour</h4>
                    <p className="text-gray-400">{tour.description}</p>
                </div>
                {/* <p><span className="font-semibold">Price:</span> ${tour.price}</p>
                <p><span className="font-semibold">Next Departure:</span> {tour.next_departure}</p> */}

            </div>
            </>
          )}

          {activeTab === "itinerary" && (
            <>
              <p className="italic text-gray-300">Itinerary details coming soon or fetched from backend...</p>
            </>
          )}

          {activeTab === "details" && (
            <>
              <p><span className="font-semibold">Duration:</span> {tour.duration}</p>
              <p><span className="font-semibold">Distance:</span> {tour.distance}</p>
              <p><span className="font-semibold">Difficulty:</span> {tour.difficulty}</p>
              <p><span className="font-semibold">Tour Code:</span> {tour.tour_code}</p>
              <p><span className="font-semibold">Category:</span> {tour.category}</p>
              <p><span className="font-semibold">Bike Hire Cost:</span> ${tour.bike_hire_cost}</p>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TourDetailPage;
