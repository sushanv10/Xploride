import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import HeadingComponent from "../components/HeadingComponent";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";

const MAX_QUANTITY = 5; // Max limit for product quantity

export default function CartPage() {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart");
  };

  // Function to increase quantity of a product
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        const currentQty = item.quantity || 1;
        if (currentQty >= MAX_QUANTITY) {
          toast.warning("Max quantity reached");
          return item;
        }
        return { ...item, quantity: currentQty + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  // Function to decrease quantity of a product
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        const currentQty = item.quantity || 1;
        if (currentQty > 1) {
          return { ...item, quantity: currentQty - 1 };
        }
        return item;
      }
      return item;
    });
    updateCart(updatedCart);
  };

  // Function to update the cart in both state and localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared successfully");
  };

  // Calculate the total price of all items in the cart
  const total = cart.reduce((acc, item) => acc + (Number(item.productPrice) * (item.quantity || 1)), 0);

  return (
    <div className="min-h-screen bg-[#0C0C0C] py-10 px-4 sm:px-10 text-white">
      <HeadingComponent
        className="mt-20 text-center text-white"
        text={"🛒 Your Shopping Cart"}
      />

      {cart.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-10">Your cart is empty.</div>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full backdrop-blur-md bg-[#1A1A1A]/70 text-white rounded-xl shadow-xl overflow-hidden">
            <thead className="bg-[#1F1F1F] text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price (NPR)</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr
                  key={product.productId}
                  className="border-t border-gray-700 hover:bg-[#2C2C2C] transition-all duration-200"
                >
                  <td className="flex items-center gap-4 px-6 py-4">
                    <img
                      src={product.image || product.productImage}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <div className="font-semibold text-white">{product.productName}</div>
                    </div>
                  </td>
                  <td className="text-center text-gray-300">{product.productType}</td>
                  <td className="text-center text-gray-400 font-semibold">
                    NPR {product.productPrice}
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(product.productId)}
                        className="text-gray-300 hover:text-white"
                      >
                        ➖
                      </button>
                      <span className="text-gray-300 font-semibold">
                        {product.quantity || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(product.productId)}
                        className="text-gray-300 hover:text-white"
                      >
                        ➕
                      </button>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => removeFromCart(product.productId)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <RiDeleteBin6Line className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#222] font-semibold">
                <td colSpan="3" className="px-6 py-4 text-right text-gray-300">
                  Total:
                </td>
                <td colSpan="2" className="px-6 py-4 text-green-500">
                  NPR {total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="border border-gray-200 hover:bg-black text-white px-6 py-3 rounded-xl shadow-lg transition duration-300"
          >
             Continue Shopping
          </button>

          <ButtonComponent onClick={clearCart} text={' Clear Cart'}/>
            
            {/* className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300" */}
          
          
        
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="border-[1px] border-gray-400 cursor-pointer text-white px-6 py-3 rounded-xl shadow-lg transition duration-300"
        >
           Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
