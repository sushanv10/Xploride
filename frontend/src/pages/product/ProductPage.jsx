import { useEffect, useState } from "react";
import axiosInstance from "../../config/AxiosConfig";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RiShoppingCartLine } from "react-icons/ri";
import ButtonComponent from "../../components/ButtonComponent";
import { useCart } from "../../context/CartContext";
import Footer from "../footer/Footer";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState('');
  const [cart, setCart] = useCart();
  const [related, setRelated] = useState([]);
  let { id } = useParams();

 useEffect(() => {
  const fetchSingleProduct = async () => {
    try {
      const response = await axiosInstance.get(`products/${id}`);
      const fetchedProduct = response.data.product?.[0];

      if (!fetchedProduct) {
        toast.error("Product not found.");
        return;
      }

      setProduct(fetchedProduct);
      fetchCategory(fetchedProduct.categoryId);
      fetchRelatedProducts(fetchedProduct.categoryId);
    } catch (error) {
      toast.error("Failed to load product");
      console.error(error);
    }
  };

  const fetchCategory = async (categoryId) => {
    try {
      const response = await axiosInstance.get(`category/${categoryId}`);
      setCategory(response.data.category.categoryName); 
    } catch (error) {
      console.log("Error fetching category:", error);
    }
  };

  const fetchRelatedProducts = async (categoryId) => {
  try {
    const res = await axiosInstance.get(`/products?category=${categoryId}`);
    
    // Ensure category match & exclude current product
    const filtered = res.data.products.filter(
      (p) => p.categoryId === categoryId && p.productId !== id
    );

    setRelated(filtered.slice(0, 4)); 
  } catch (err) {
    console.error("Error fetching related products", err);
  }
};


  if (id) fetchSingleProduct();
}, [id]);


  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading product...
      </div>
    );
  }

  const handleAddToCart = () => {
    const isAlreadyInCart = cart.some((item) => item.productId === product.productId);
    if (!isAlreadyInCart) {
      setCart([...cart, product]);
      toast.success("Item Added to Cart");
    } else {
      toast.info("Item already in cart");
    }
  };

  return (
    <>
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url("https://askproject.net/venturo/wp-content/uploads/sites/84/2022/06/black-bicycle-against-white-background-road-bike-PJNKPFH.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-center text-white">
          <h1 className="text-3xl font-bold">PRODUCT DETAILS</h1>
          <p><Link to="/" className="text-blue-400">Home</Link> / Product</p>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto mt-16 p-5 grid lg:grid-cols-2 gap-10 text-white">
        {/* Image */}
        <div className="flex justify-center border border-gray-300 ">
          <img src={product.productImage || "/fallback-image.png"} alt={product.productName} 
          className="w-full max-w-md rounded-lg shadow-md object-contain" />
        </div>

        {/* Details */}
        <div>
          <h2 className="text-4xl font-bold mb-4">{product.productName}</h2>
          <p className="text-green-500 font-semibold">In Stock ({product.countInStock})</p>
          <p className="text-blue-500 text-lg font-semibold mt-2">Price: Rs {product.productPrice}</p>
          <p className="text-white text-xl font-semibold mt-2"> Type: {product.productType}</p>
          <p className="text-white text-[18px] font-semibold mt-2">Category: {category || 'No Category'}</p>
          <p className="mt-4 text-[18px]">{product.productDescription}</p>
          <ButtonComponent className="mt-6" text="Add to Cart" icon={<RiShoppingCartLine className="ml-2" />} onClick={handleAddToCart} />
        </div>
      </div>


      {/* Related Products */}
      <div className="max-w-7xl mx-auto mt-24 px-5 text-white">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <div key={item.productId} className=" p-4 rounded-lg shadow hover:shadow-xl transition-all duration-200">
              <img src={item.productImage} alt={item.productName} className=" h-48 object-cover rounded" />
              <h3 className="mt-2 font-bold text-lg">{item.productName}</h3>
              <p className="text-blue-500">Rs {item.productPrice}</p>
              <Link to={`/product/${item.productId}`} className="text-blue-400 mt-2 inline-block">View</Link>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default ProductPage;
