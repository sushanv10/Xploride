import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import axiosInstance from "../../config/AxiosConfig";
import Footer from "../footer/Footer";
import LoadingSpinner from "../../components/LoadingSpinner";

const BikeDetailPage = () => {
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const fetchSingleBike = async () => {
      try {
        const response = await axiosInstance.get(`bikes/${id}`);
        const fetchedBike = response.data.bike;
        console.log("Bike fetched successfully", fetchedBike);
        setBike(fetchedBike);
      } catch (error) {
        console.log("Error fetching bike:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBike();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner/>
      </div>
    );
  }

  if (!bike ) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Bike not found.
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://askproject.net/venturo/wp-content/uploads/sites/84/2022/06/black-bicycle-against-white-background-road-bike-PJNKPFH.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-center text-white">
          <h1 className="text-3xl font-bold">BIKE DETAILS</h1>
          <p>
            <Link to="/" className="text-blue-400">
              Home
            </Link>{" "}
            / Bikes
          </p>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto mt-16 p-5 grid lg:grid-cols-2 gap-10 text-white">
        {/* Image */}
        <div className="flex justify-center border-1 border-gray-300">
          <img
            src={bike.bikeImage || "/fallback-image.png"}
            alt={bike?.bikeName || "Bike"}
            className="w-full max-w-md rounded-lg shadow-md object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            {bike.bikeName || "No Bike Name"}
          </h2>
          <p className="text-green-500 font-light">
            Availability : {bike?.availability || "Unknown"}
          </p>
          <p className="text-white text-xl font-light mt-2">
            Brand : {bike.brand || "N/A"}
          </p>
          <p className="text-white text-lg font-light mt-2">
            Model : {bike.model || "N/A"}
          </p>
          <p className="text-white text-xl font-light mt-2">
            Wheel : {bike.wheel || "N/A"} C
          </p>
          <p className="text-white text-xl font-light mt-2">
            Weight : {bike.weight || "N/A"} Kg
          </p>
          <p className="text-white text-xl font-semibold mt-2">
            Size : {bike.size || "N/A"} cm
          </p>
          <p className="text-white text-[18px] font-light mt-2">
            Category : {bike.category || "No Category"}
          </p>
          <p className="text-blue-500 text-[18px]  mt-2">
            Rental Price : Rs {bike.price || "0"} per day
          </p>
          <p className="mt-4 text-[18px]">{bike.description || "No description available."}</p>
          <ButtonComponent className="mt-6" text="Rent Bike" />
        </div>
      </div>

      <div className="mt-10">
        <Footer/>

      </div>
    </>
  );
};

export default BikeDetailPage;
