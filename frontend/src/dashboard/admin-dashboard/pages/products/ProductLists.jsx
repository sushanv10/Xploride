import { useEffect, useState } from "react";
import FormComponent from "../../../../components/FormComponent";
import axiosInstance from "../../../../config/AxiosConfig";
import AddProducts from "./AddProducts";
import { toast, ToastContainer } from "react-toastify";
import EditProduct from "./EditProduct";

const ProductLists = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const headers = [
    "Id",
    "Product Name",
    "Price",
    "Description",
    "Image",
    "Type",
    "Category",
    "Count In Stock",
    "Action",
  ];

  useEffect(() => {
  const fetchData = async () => {
    // await fetchCategories(); 
    await fetchProducts(); 
  };
  fetchData();
}, []);


  // Fetch categories separately
  // const fetchCategories = async () => {
  //   try {
  //     const res = await axiosInstance.get("category/");
  //     console.log("Fetched Categories:", res.data);

  //     // Ensure correct format
  //     setCategories(res.data.category || []);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //     setCategories([]);
  //   }
  // };

  const fetchProducts = async () => {
  try {
    const res = await axiosInstance.get("products/");
    console.log("Fetched Products:", res.data);

    if (!res.data || !Array.isArray(res.data.products)) {
      console.error("Invalid response structure:", res.data);
      return;
    }

    const formattedData = res.data.products.map((product) => ({
      id: product.productId,
      name: product.productName,
      price: product.productPrice,
      description: product.productDescription,
      image: product.productImage,
      type: product.productType,
      category: product.categoryName || "Unknown",
      countInStock: product.countInStock,
    }));

    setProducts(formattedData);
  } catch (error) {
    console.error("Error fetching products", error);
  }
};


  const handleEdit = (productId) => {
    setShowEditProduct(!showEditProduct);
    setSelectedProductId(productId);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`products/delete/${id}`);
      console.log("Product deleted successfully:", res.data.message);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  };

  const handleAddProductClick = () => {
    setShowAddProduct(!showAddProduct);
  };

  return (
    <>
      <ToastContainer />
      {showAddProduct && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {showEditProduct && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}
      <FormComponent
        text={"Add Product"}
        onClick={handleAddProductClick}
        title={"Product Lists"}
        dropDown={"Products"}
        headers={headers}
        data={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {showAddProduct && (
        <AddProducts closeAddProduct={() => setShowAddProduct(false)} />
      )}

     {showEditProduct && selectedProductId && (
             <EditProduct
               productId={selectedProductId}
               closeEditProduct={() => setShowEditProduct(false)}
               onUpdate={fetchProducts}
             />
      )}
    </>
  );
};

export default ProductLists;
