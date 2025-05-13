import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeadingComponent from "../../components/HeadingComponent";
import { IoMdClose } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import axiosInstance from "../../config/AxiosConfig";
import { toast } from "react-toastify";
import TermsandConditions from "../../components/TermsandCondition";

const BikeRentalPage = ({ closePage }) => {
  const { id } = useParams();

  const [bike, setBike] = useState(null);
  const [formData, setFormData] = useState({
    rentStartDate: "",
    rentEndDate: "",
    identificationImage: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedConsent, setAgreedConsent] = useState(false);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await axiosInstance.get(`bikes/${id}`);
        setBike(response.data.bike);
      } catch (error) {
        console.error("Failed to fetch bike:", error);
      }
    };
    fetchBike();
  }, [id]);

  useEffect(() => {
    const { rentStartDate, rentEndDate } = formData;
    if (rentStartDate && rentEndDate && bike?.price) {
      const start = new Date(rentStartDate);
      const end = new Date(rentEndDate);
      const days = Math.ceil((end - start) / (1000 * 3600 * 24));
      setTotalAmount(days > 0 ? days * parseFloat(bike.price) : 0);
    }
  }, [formData.rentStartDate, formData.rentEndDate, bike]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, identificationImage: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { rentStartDate, rentEndDate, identificationImage } = formData;
    if (!rentStartDate || !rentEndDate || !identificationImage) {
      return setError("All fields are required.");
    }

    if (!agreedTerms || !agreedConsent) {
      return setError("You must agree to the terms and give consent to proceed.");
    }

    const start = new Date(rentStartDate);
    const end = new Date(rentEndDate);
    if (end <= start) {
      return setError("End date must be after start date.");
    }

    const payload = new FormData();
    payload.append("rentStartDate", rentStartDate);
    payload.append("rentEndDate", rentEndDate);
    payload.append("Image", identificationImage);

    try {
      setLoading(true);
      await axiosInstance.post(`bikesRental/rent/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Bike rental confirmed");
      closePage();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to rent bike.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-40 left-1/2 -translate-x-1/2 z-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl shadow-2xl bg-[#1A1A1A]/90 backdrop-blur-lg text-white relative border border-white/10 w-[80rem]"
      >
        <IoMdClose
          className="text-3xl text-white absolute top-6 right-6 cursor-pointer hover:text-red-400 transition"
          onClick={closePage}
        />
        <HeadingComponent text="Rent Bike" className="mb-6 text-center" />
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        {!bike ? (
          <p className="text-center text-gray-300 py-20">Loading bike details...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section - Form */}
            <div>
              <div className="mb-6 space-y-2 text-gray-300">
                <p>Bike Name: <strong>{bike.bikeName}</strong></p>
                <p>Price/Day: ₹{bike.price}</p>
              </div>

              <label>
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt />
                  Start Date
                </div>
                <input
                  type="date"
                  name="rentStartDate"
                  value={formData.rentStartDate}
                  onChange={handleChange}
                  className="w-full p-2 bg-[#2C2C2C] rounded outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              <label className="mt-4 block">
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt />
                  End Date
                </div>
                <input
                  type="date"
                  name="rentEndDate"
                  value={formData.rentEndDate}
                  onChange={handleChange}
                  className="w-full p-2 bg-[#2C2C2C] rounded outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              <label className="mt-4 block">
                <span className="block mb-1">Upload ID Proof:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:bg-blue-500 file:border-none file:px-4 file:py-2 file:rounded file:text-white file:cursor-pointer"
                  required
                />
              </label>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-40 object-contain mt-2 border border-gray-600 rounded"
                />
              )}

              <p className="text-lg font-medium mt-4">
                Total Price: <span className="text-green-400">₹{totalAmount}</span>
              </p>

              <TermsandConditions
                agreedTerms={agreedTerms}
                setAgreedTerms={setAgreedTerms}
                agreedConsent={agreedConsent}
                setAgreedConsent={setAgreedConsent}
                error={(!agreedTerms || !agreedConsent) && error}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-blue-600 hover:bg-gray-600 px-6 py-2 rounded font-semibold transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm Rental"}
              </button>
            </div>

            {/* Right Section - Instructions */}
            <div className=" p-6 rounded shadow text-white">
              <h3 className="text-lg font-semibold mb-3">Booking Procedure:</h3>
              <p className="mb-4 text-sm text-gray-200">
                Kindly complete the form and submit the required documents listed below before booking a bike with us.
              </p>

              <h4 className="font-semibold mb-2">Required Documents:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-200 space-y-2">
                <li>Valid passport or national ID.</li>
                <li>If referred, a guarantor from Nepal with citizenship and contact info.</li>
              </ul>

              <p className="mt-4 text-sm text-gray-200">
                We ensure safe, exciting, and well-organized tours. Feel free to contact us if you have any questions.
              </p>

              <p className="mt-2 text-sm text-gray-200">
                Email: <a href="mailto:xploride@gmail.com" className="text-blue-600">xploride@gmail.com</a>
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BikeRentalPage;
