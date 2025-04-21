import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";

export default function EditProduct({ productId, closeEditProduct, onUpdate }) {
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productType: "",
    categoryId: "",
    countInStock: "",
    productImage: null,
    image: null, // Field for holding image reference
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Product ID:", productId);
    // Fetch product data
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`products/${productId}`);
        const data = res.data.product[0]; // Access the first item in the array

        setProduct({
          productName: data.productName ?? "",
          productPrice: data.productPrice ?? "",
          productDescription: data.productDescription ?? "",
          productType: data.productType ?? "",
          categoryId: data.categoryId ?? "",
          countInStock: data.countInStock ?? "",
          productImage: null, // Reset image field
        });

        // Fetch categories after the product data
        const categoriesRes = await axiosInstance.get("category/");
        setCategories(categoriesRes.data.category);
      } catch (error) {
        console.error("Failed to load product data", error);
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productPrice", product.productPrice);
    formData.append("productDescription", product.productDescription);
    formData.append("productType", product.productType);
    formData.append("categoryId", product.categoryId);
    formData.append("countInStock", product.countInStock);

    // Append image if selected
    if (product.image) {
      formData.append("Image", product.image); // Ensure field name matches backend expectation
    }

    try {
      const res = await axiosInstance.patch(`products/update/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);

      closeEditProduct();
      onUpdate(); // Trigger update for parent component
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <LoadingSpinner />}
      <div className="flex justify-center items-center -mt-140">
        <div className="bg-white w-[30rem] p-6 rounded-2xl shadow-xl z-[200]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Edit Product</h3>
            <IoClose
              className="text-blue-500 text-2xl cursor-pointer"
              onClick={closeEditProduct}
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <InputComponent
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              placeholder="Product Price"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="productDescription"
              value={product.productDescription}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="text"
              name="productType"
              value={product.productType}
              onChange={handleChange}
              placeholder="Product Type"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <InputComponent
              type="number"
              name="countInStock"
              value={product.countInStock}
              onChange={handleChange}
              placeholder="Stock Count"
              className="w-full border px-3 py-2 rounded"
              required
            />

            {/* Category Dropdown */}
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryId}
                </option>
              ))}
            </select>

            {/* File Input for Image */}
            <InputComponent
              type="file"
              name="image" 
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-4 mt-4">
              <ButtonComponent
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                text={"Update"}
              />
              <button
                type="button"
                onClick={closeEditProduct}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
