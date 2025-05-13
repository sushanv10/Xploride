// import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";
// import axiosInstance from "../../config/AxiosConfig";

// const TourBookingPage = () => {
//   const { id } = useParams(); // tour ID
//   const [tour, setTour] = useState(null);
//   const [availabilities, setAvailabilities] = useState([]);
//   const [bookingAvailability, setBookingAvailability] = useState(null);
//   const [numberOfPeople, setNumberOfPeople] = useState(1);
//   const [message, setMessage] = useState("");

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const tourRes = await axiosInstance.get(`tour/${id}`);
//   //       setTour(tourRes.data);

//   //       // const availRes = await axiosInstance.get(`tour-availability/${id}`);
//   //       // setAvailabilities(availRes.data.availability);
//   //     } catch (error) {
//   //       console.error("Error fetching tour/availability:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [id]);

//    // Fetch tour details
//   useEffect(() => {
//     const fetchSingleTour = async () => {
      
//       try {
//         const response = await axiosInstance.get(`tour/${id}`);
//         const fetchedTour = response.data;
//         setTour(fetchedTour);

//         const availRes = await axiosInstance.get(`tour-availability/availability/${id}`);
//         setAvailabilities(availRes.data.data);
//         console.log("Tour fetched successfully", availRes);
//       } catch (error) {
//         console.log("Error fetching tour:", error);
//       } 
//     };
//     if (id) fetchSingleTour();
//   }, [id]);

//   const handleBookClick = (availability) => {
//     setBookingAvailability(availability);
//     setNumberOfPeople(1);
//     setMessage("");
//   };

//   const handleSubmitBooking = async () => {
//     if (!bookingAvailability || !numberOfPeople) return;

//     const totalAmount = numberOfPeople * tour.price;

//     try {
//       await axiosInstance.post("/tourBookings/book", {
//         bikeId: tour.bike_id,
//         availability_id: bookingAvailability.id,
//         number_of_people: numberOfPeople,
//         totalAmount,
//       });

//       setMessage("Tour booked successfully!");
//       setBookingAvailability(null);
//     } catch (error) {
//       console.error("Booking failed:", error);
//       setMessage("Failed to book tour. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-18 text-white">
//       {tour && (
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold mb-2">{tour.name}</h1>
//           <p className="text-gray-300">Price From: Rs {tour.price}.00</p>
//         </div>
//       )}

//       <h2 className="text-2xl font-semibold mb-4">Available Tours</h2>

//       <table className="w-full border-t border-gray-700">
//         <thead>
//           <tr className="text-left border-b border-gray-700">
//             <th className="py-2">Date</th>
//             <th className="py-2">Slots</th>
//             <th className="py-2">Status</th>
//             <th className="py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {availabilities.map((a) => (
//             <tr key={a.id} className="border-b border-gray-800">
//               <td className="py-2">
//                 {new Date(a.start_date).toLocaleDateString()} -{" "}
//                 {new Date(a.end_date).toLocaleDateString()}
//               </td>
//               <td>{a.available_slots}</td>
//               <td>{a.status}</td>
//               <td>
//                 <button
//                   onClick={() => handleBookClick(a)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
//                 >
//                   Book Tour
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Booking Modal / Inline Form */}
//       {bookingAvailability && (
//         <div className="mt-6 p-4 bg-gray-800 rounded-md">
//           <h3 className="text-xl font-semibold mb-2">
//             Booking Tour from{" "}
//             {new Date(bookingAvailability.start_date).toLocaleDateString()} to{" "}
//             {new Date(bookingAvailability.end_date).toLocaleDateString()}
//           </h3>
//           <label className="block mb-2">
//             Number of People:
//             <input
//               type="number"
//               value={numberOfPeople}
//               min="1"
//               max={bookingAvailability.available_slots}
//               onChange={(e) => setNumberOfPeople(Number(e.target.value))}
//               className="ml-2 p-1 text-black w-20 rounded"
//             />
//           </label>
//           <p className="mb-2">
//             Total: ₹{numberOfPeople * tour.price}
//           </p>
//           <button
//             onClick={handleSubmitBooking}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
//           >
//             Confirm Booking
//           </button>
//           <button
//             onClick={() => setBookingAvailability(null)}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* Message */}
//       {message && (
//         <div className="mt-4 text-green-400 font-semibold">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TourBookingPage;
import React from 'react'

const TourBooking = () => {
  return (
    <div>
      
    </div>
  )
}

export default TourBooking
