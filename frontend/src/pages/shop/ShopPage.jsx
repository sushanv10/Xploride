import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import ProductData from '../../utils/data/ProductData';
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/AxiosConfig';
import LoadingSpinner from '../../components/LoadingSpinner';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(99999);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('products/');
        const fetchedProducts = Array.isArray(response.data.products)
          ? response.data.products
          : [];
        setProducts(fetchedProducts);
      } catch (error) {
        console.log('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.categoryName))];

  const filteredProducts = products
    .filter((p) => (p.productName || '').toLowerCase().includes(search.toLowerCase()))
    .filter((p) => selectedCategory === 'All' || p.categoryName === selectedCategory)
    .filter((p) => Number(p.productPrice) <= maxPrice);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="relative">
          {/* Hero */}
          <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url("https://askproject.net/venturo/wp-content/uploads/sites/84/2022/06/black-bicycle-against-white-background-road-bike-PJNKPFH.jpg")' }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative flex flex-col justify-center items-center h-full text-white text-center">
              <h1 className="text-5xl font-extrabold mb-2">Explore Our Products</h1>
              <p className="text-lg">
                <Link to="/" className="text-blue-400 hover:underline">Home</Link> / Shop
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-8xl mx-auto px-6 py-10">
            <div className="bg-[#0C0C0C] rounded-xl shadow-md p-6 grid gap-4 md:grid-cols-3">
              <div className="flex flex-col">
                <h4 className='text-white text-[18px]'>Search Products</h4>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="p-3 h-10 border border-white text-white mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                 <h4 className='text-white text-[18px]'>Filter By Category</h4>
                  <select
                    className="bg-[#0C0C0C] h-10 p-2 border mt-4 border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>

              </div>
              <div className="flex flex-col">
                <h4 className='text-white text-[18px]'>Filter By Price</h4>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxPrice}
                  className='mt-6'
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <span className="text-sm text-gray-600 text-right mt-1">Max Price: ₹{maxPrice}</span>
              </div>
            </div>

            {/* Product List */}
            <div className="mt-10">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No products found.</p>
              ) : (
                <ProductData data={currentProducts} />
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-blue-100 text-gray-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default ShopPage;
