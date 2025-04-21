import { BiSearch } from "react-icons/bi";
import ButtonComponent from "../../../../components/ButtonComponent";
import { FaFilter } from "react-icons/fa6";
import InputComponent from "../../../../components/InputComponent";
import TableComponent from "../../../../components/TableComponent";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const CategoryLists = () => {
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ categoryId: "", name: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category/");
      console.log("Fetched categories:", res.data.category);

      // Format data
      const formattedData = res.data.category.map(category => ({
        id: category.categoryId,
        name: category.categoryName,
        createdAt: new Date(category.created_at).toLocaleDateString("en-GB"),
        updatedAt: new Date(category.updated_at).toLocaleDateString("en-GB"),
      }));

      setCategories(formattedData || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id) => {
  
    try {
      const res = await axiosInstance.delete(`category/${id}`);
      toast.success(res.data.message);
      fetchCategories(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting category");
    }
  };



  const handleEdit = (categoryId, name) => {
    setShowEditCategory(true);
    setSelectedCategory({ categoryId, name });
  };

  const headers = ["Id", "Category", "Created at", "Updated at", "Action"];

  const handleAddClick = () => {
    setShowAddCategory(true);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-[rgba(46,46,46,0.24)] bg-opacity-50 -mt-20 min-h-screen p-5" id="category">
        {/* Header */}
        <div className="flex justify-between">
          <h3 className="text-[18px] text-white">Category Lists</h3>
          <ButtonComponent text={"Add"} onClick={handleAddClick} />
        </div>

        {/* Background opacity */}
        {showAddCategory && <div className="fixed inset-0 bg-black opacity-50 z-10"></div>}
        {showEditCategory && <div className="fixed inset-0 bg-black opacity-50 z-10"></div>}

        <div className="bg-[#00000031] w-[80rem] min-h-[20rem] max-h-screen rounded-xl shadow-lg p-6 flex flex-col mt-6 overflow-y-auto z-20">
          <div className="flex justify-between">
            {/* Search Bar */}
            <div className="relative">
              <BiSearch className="absolute left-2 top-1.5 text-black text-[19px]" />
              <input
                type="search"
                placeholder="Search...."
                className="pl-9 h-8 w-45 text-sm text-black bg-white border-none rounded-[10px]"
              />
            </div>

            {/* Filter Icon */}
            <div className="flex justify-center items-center bg-slate-50 h-9 w-9 rounded-[5px] border-blue-500 border-2">
              <FaFilter className="text-black text-[18px] cursor-pointer" />
            </div>
          </div>

          {/* Category dropdown */}
            <div className="flex my-5 gap-10">
              <div className="flex flex-col w-1/5">
                <h4 className="text-white">Category</h4>
                <select className="bg-white text-gray-500 text-[13px] outline-none pl-2 h-8 w-full my-4 rounded-[8px]">
                  <option value="" disabled selected>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
           

            {/* Category code */}
            <div className="flex flex-col w-1/5">
              <h4 className="text-white">Code</h4>
              <InputComponent
                type="text"
                placeholder="Category code"
                className="bg-white text-black text-[13px] outline-none pl-2 h-8 w-full my-4 "
              />
            </div>

            {/* Date field */}
            <div className="flex flex-col w-1/5">
              <h4 className="text-white">Date</h4>
              <input
                type="date"
                placeholder="Select date"
                className="bg-white text-gray-500 text-[13px] outline-none pl-2 h-8 w-full my-4 rounded-[8px]"
                onFocus={e => (e.target.placeholder = "")}
                onBlur={e => (e.target.placeholder = "Select date")}
              />
            </div>
          </div>

          {/* Table */}
          <TableComponent headers={headers} data={categories} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {/* Conditionally render AddCategory component */}
      {showAddCategory && (
        <AddCategory
          closeCategory={() => {
            setShowAddCategory(false);
            fetchCategories(); // Refresh data after adding
          }}
        />
      )}

      {showEditCategory && (
        <EditCategory
          closeEditCategory={() => {
            setShowEditCategory(false);
            fetchCategories(); // Refresh data after editing
          }}
          categoryId={selectedCategory.categoryId}
          categoryName={selectedCategory.name}
        />
      )}
    </>
  );
};

export default CategoryLists;
