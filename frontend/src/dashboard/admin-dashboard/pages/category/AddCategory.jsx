import { IoClose } from "react-icons/io5";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useState } from "react";
import { validateCategoryNameField } from "../../../../utils/validation";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast } from "react-toastify";

const AddCategory = ({ closeCategory }) => {
  const [categoryField, setCategoryField] = useState({ categoryName: '' });
  const [errors, setErrors] = useState({}); // To store form validation errors

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCategoryField((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));

    // Reset the error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear any previous error for that field
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = {};
    const categoryNameError = validateCategoryNameField(categoryField.categoryName);
    if (categoryNameError) validationErrors.categoryName = categoryNameError;

    // If there are any errors, don't submit the form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Make API call to add the category
    try {
      const res = await axiosInstance.post('category/add', {
        categoryName: categoryField.categoryName,
        // categoryCode: categoryField.categoryCode, // Include category code in request body
      });

      console.log(res);
      toast.success(res.data.message); // Show success toast message
      closeCategory(); // Close the modal after successful addition
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding category"); // Show error toast message
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white h-[25rem] w-[25rem] -mt-180 z-200 rounded-2xl">
        <div className="flex justify-between p-4">
          <h3 className="text-center font-semibold text-[20px]">Add Category</h3>
          <IoClose className="text-blue-500 text-[25px] cursor-pointer" onClick={closeCategory} />
        </div>

        <div className="m-3 flex flex-col gap-5">
          <InputComponent
            placeholder="Category Name"
            type="text"
            name="categoryName"
            value={categoryField.categoryName}
            onChange={handleOnChange}
            className="h-10 w-90 p-2"
          />
          {errors.categoryName && (
            <div className="text-red-500 text-sm -my-2 mx-2">{errors.categoryName}</div> // Display error message
          )}

          {/* <InputComponent
            placeholder="Category Code"
            name="categoryCode"
            value={categoryField.categoryCode}
            onChange={handleOnChange}
            className="h-10 w-90 p-2"
          /> */}
        </div>

        <div className="flex justify-center items-center my-7">
          <ButtonComponent text="Add Category" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
