import { IoClose } from "react-icons/io5";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProducts = ({ closeAddProduct, fetchProducts }) => {
  const [productFields, setProductFields] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productImage: null,
    productType: "",
    categoryId: "",
    countInStock: "",
  });

  const [categories, setCategories] = useState([]); 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("category/");
      console.log("Fetched categories:", res.data.category);

      // Format data
      const formattedData = res.data.category.map(category => ({
        id: category.categoryId,
        name: category.categoryName,
      }));

      setCategories(formattedData || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductFields((prevFields) => ({
      ...prevFields,
      Image: file,
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!productFields.productName.trim()) validationErrors.productName = "Product name is required";
    if (!productFields.productPrice.trim() || isNaN(productFields.productPrice)) validationErrors.productPrice = "Valid price is required";
    if (!productFields.productDescription.trim()) validationErrors.productDescription = "Description is required";
    if (!productFields.productType.trim()) validationErrors.productType = "Type is required";
    if (!productFields.categoryId.trim()) validationErrors.categoryId = "Category is required";
    if (!productFields.countInStock.trim() || isNaN(productFields.countInStock)) validationErrors.countInStock = "Valid stock count is required";
    if (!productFields.Image) validationErrors.Image = "Product image is required";

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(productFields).forEach((key) => {
      formData.append(key, productFields[key]);
    });

    try {
      const res = await axiosInstance.post("products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data.message);
      toast.success("Product created successfully");
      setTimeout(() => {
        closeAddProduct();

      },1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding product");
    }
    setLoading(false);
  };

  return (
    <>
    <div className="flex justify-center items-center -mt-140">
      <div className="bg-white p-6 h-auto w-[30rem] rounded-2xl shadow-lg z-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-center font-semibold text-xl">Add Product</h3>
          <IoClose className="text-blue-500 text-2xl cursor-pointer" onClick={closeAddProduct} />
        </div>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields with Error Handling */}
          {[
            { name: "productName", placeholder: "Product Name", type: "text" },
            { name: "productPrice", placeholder: "Price", type: "number" },
            { name: "productDescription", placeholder: "Description", type: "text" },
            { name: "productType", placeholder: "Type", type: "text" },
            { name: "countInStock", placeholder: "Stock Count", type: "number" },
          ].map(({ name, placeholder, type }) => (
            <div key={name} className="flex flex-col">
              <InputComponent className="h-12 w-full pl-5" placeholder={placeholder} type={type} name={name} value={productFields[name]} onChange={handleOnChange} />
              <div className="text-red-500 text-sm min-h-[1.5rem]">{errors[name]}</div>
            </div>
          ))}

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <select
              name="categoryId"
              value={productFields.categoryId}
              onChange={handleOnChange}
              className="h-12 w-full border p-2 rounded bg-white"
            >
              <option value="">Select a category</option>
             
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.categoryId}</div>
          </div>

          {/* File Input */}
          <div className="flex flex-col">
            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full border p-2 rounded" />
            <div className="text-red-500 text-sm min-h-[1.5rem]">{errors.productImage}</div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <ButtonComponent text={loading ? "Adding..." : "Add Product"} type="submit" disabled={loading} />
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddProducts;
