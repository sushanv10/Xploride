import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const res = await axiosInstance.get("bikesRental/all");
      if (res.data && Array.isArray(res.data)) {
        setRentals(res.data);
      }
    } catch (error) {
      console.error("Error fetching rentals:", error);
      toast.error("Failed to load rentals");
    }
  };

  const updateRentalStatus = async (rentalId, status) => {
    try {
      const res = await axiosInstance.patch(
        `bikesRental/status/${rentalId}`,
        { status }
      );
      toast.success(res.data.message || "Status updated");
      fetchRentals();
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-4  text-white min-h-screen -mt-20">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-4">Rental Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-600 shadow-lg rounded-lg">
          <thead className="bg-[#000000be]">
            <tr>
              <th className="p-3 border border-gray-700">Rental ID</th>
              <th className="p-3 border border-gray-700">Bike Name</th>
              <th className="p-3 border border-gray-700">Brand</th>
              <th className="p-3 border border-gray-700">User Name</th>
              <th className="p-3 border border-gray-700">Email Address</th>
              <th className="p-3 border border-gray-700">Rent Start</th>
              <th className="p-3 border border-gray-700">Rent End</th>
              <th className="p-3 border border-gray-700">Total Amount (Rs)</th>
              <th className="p-3 border border-gray-700">Status</th>
              <th className="p-3 border border-gray-700">ID Proof</th>
              <th className="p-3 border border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr
                key={rental.rentalId}
                className="text-center border-t border-gray-700 hover:bg-gray-700 transition-all"
              >
                <td className="p-2 border border-gray-600">{rental.rentalId}</td>
                <td className="p-2 border border-gray-600">{rental.bikeName}</td>
                <td className="p-2 border border-gray-600">{rental.brand}</td>
                <td className="p-2 border border-gray-600">{rental.userName}</td>
                <td className="p-2 border border-gray-600">{rental.email}</td>
                <td className="p-2 border border-gray-600">
                  {new Date(rental.rentStartDate).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-600">
                  {new Date(rental.rentEndDate).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-600">Rs. {rental.totalAmount}</td>
                <td className="p-2 border border-gray-600 capitalize">{rental.status}</td>
                <td className="p-2 border border-gray-600">
                  {rental.identificationImage ? (
                    <a
                      href={rental.identificationImage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={rental.identificationImage}
                        alt="ID"
                        className="h-12 w-12 object-cover mx-auto rounded-md border-2 border-gray-500"
                      />
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-2 border border-gray-600">
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition"
                      onClick={() =>
                        updateRentalStatus(rental.rentalId, "approved")
                      }
                      disabled={rental.status === "approved"}
                    >
                      Approve
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition"
                      onClick={() =>
                        updateRentalStatus(rental.rentalId, "rejected")
                      }
                      disabled={rental.status === "rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rentals.length === 0 && (
              <tr>
                <td
                  colSpan="11"
                  className="p-4 text-center text-gray-400 font-medium"
                >
                  No rental requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rentals;
