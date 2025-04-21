import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../../../../config/AxiosConfig";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../../../components/ButtonComponent";

const AddTourImage = ({ closeForm, fetchImages }) => {
  const [tourId, setTourId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tourId.trim() || !image) {
      toast.error("Tour ID and image are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("tour_id", tourId);
      formData.append("Image", image);

      const res = await axiosInstance.post("tour-images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully");
      console.log("Image URL:", res.data.image.image_url);

      fetchImages?.(); // Optional callback to reload images
      setTimeout(() => {
        closeForm?.();
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white p-6 w-[28rem] rounded-2xl shadow-lg z-50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Tour Image</h3>
          <IoClose className="text-blue-500 text-2xl cursor-pointer" onClick={closeForm} />
        </div>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Tour ID"
              value={tourId}
              onChange={(e) => setTourId(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-32 w-full object-cover rounded border"
            />
          )}

          <div className="flex justify-center mt-4">
            <ButtonComponent text={loading ? "Uploading..." : "Upload Image"} type="submit" disabled={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTourImage;
