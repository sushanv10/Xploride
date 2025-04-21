import { IoClose } from "react-icons/io5";
import InputComponent from "../../../../components/InputComponent";
import ButtonComponent from "../../../../components/ButtonComponent";
import axiosInstance from "../../../../config/AxiosConfig";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function EditCategory({ closeEditCategory, categoryId, categoryName }) {
  // Initialize category state with the existing name
  const [category, setCategory] = useState({ categoryName: "" });

  // Populate the category name when the component mounts
  useEffect(() => {
    setCategory({ categoryName: categoryName });
  }, [categoryName]);

  // Update state when input changes
  const handleOnChange = (e) => {
    setCategory({ ...category, categoryName: e.target.value });
  };

  // Function to update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.categoryName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    try {
      const res = await axiosInstance.put(`category/update/${categoryId}`, {
        categoryName: category.categoryName,
      });
      console.log(res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        closeEditCategory(); // Close modal 

      })
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(error.response?.data?.message || "Error updating category");
    }
  };

  return (
    <>
    
    <ToastContainer/>
    <div className="flex justify-center items-center">
      <div className="bg-white h-[25rem] w-[25rem] -mt-180 z-200 rounded-2xl">
        <div className="flex justify-between p-4">
          <h3 className="text-center font-semibold text-[20px]">Edit Category</h3>
          <IoClose className="text-blue-500 text-[25px] cursor-pointer" onClick={closeEditCategory} />
        </div>

        <div className="m-3 flex flex-col gap-5">
          <InputComponent
            placeholder="Category Name"
            type="text"
            name="categoryName"
            value={category.categoryName}
            onChange={handleOnChange}
            className="h-10 w-90 p-2"
          />
        </div>

        <div className="flex justify-center items-center my-7">
          <ButtonComponent text="Edit Category" onClick={handleSubmit} />
        </div>
      </div>
    </div>
    </>
  );
}

export default EditCategory;
