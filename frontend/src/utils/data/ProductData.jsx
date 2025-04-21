import { Link } from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import ProductQuickView from '../../pages/home/ProductQuickView'
import { useCart } from '../../context/CartContext'

const ProductData = ({ data }) => {

  const [cart, setCart] = useCart();
  const [openQuickView, setOpenQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClick = (product) => {
    setOpenQuickView(!openQuickView);
    setSelectedProduct(product);
  }

  // const handleCart = (products) => {
  //   try {
    
  //   } catch (error) {
  //     console.log(error);
      
  //   }

  // }

  return (
    <>
      <ToastContainer />
      <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {data.map((products) => (
          <div
            key={products._productId}
            className="text-white w-full max-w-xs p-3 hover:shadow-lg transition duration-300"
          >
           
            <div className="relative flex items-center justify-center group overflow-hidden rounded-lg">
              <img
                src={products.image || products.productImage}
                alt={products.productName}
                className="w-full h-auto max-h-45 object-contain transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-90 flex flex-col items-center justify-center gap-2 transition-all duration-300">
                <button className="bg-blue-500 w-28 sm:w-32 py-2 cursor-pointer
                 rounded text-white text-xs sm:text-sm font-semibold" onClick={() => handleClick(products)}>
                  QUICK VIEW
                </button>
                <button className="bg-black w-28 sm:w-32 py-2 rounded cursor-pointer text-white text-xs sm:text-sm font-semibold">
                  WISHLIST
                </button>
                <button
                className="bg-[#0C0C0C] border cursor-pointer border-white w-28 sm:w-32 py-2 rounded text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1"
                onClick={() => {
                  const productExists = cart.some(item => item.productId === products.productId); // Adjust the key if needed

                  if (productExists) {
                    toast.info('Item is already in the cart');
                  } else {
                    const updatedCart = [...cart, products];
                    setCart(updatedCart);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    toast.success('Item added to cart');
                  }
                }}
              >
                ADD TO CART <RiShoppingCartLine />
              </button>

              </div>
            </div>
           
            <Link to={`/product/${products.productId}`}>
              <div className="text-center mt-3 cursor-pointer">
                <p className="text-gray-400 text-xs sm:text-sm">{products.productType}</p>
                <h2 className="text-sm sm:text-base font-bold mt-1 line-clamp-1">{products.productName}</h2>
                <p className="text-blue-500 text-sm sm:text-base mt-1">Npr {products.productPrice}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {openQuickView && selectedProduct && (
      <ProductQuickView 
          products={selectedProduct} 
          closeQuickView={() => setOpenQuickView(false)} 
        />
      )}

    </>
  )
}

export default ProductData;
