import PropTypes from "prop-types";
import { toast } from "react-toastify";
import QuickViewComponent from "../../components/QuickViewComponent";
import { useCart } from "../../context/CartContext";


export default function ProductQuickView({ closeQuickView, products }) {
  const [cart, setCart] = useCart();

  return (
    <>
      <QuickViewComponent
        onClick={closeQuickView}
        Image={products.image || products.productImage}
        name={products.productName}
        type={products.productType}
        price={products.productPrice}
        description={products.productDescription}
        link={`/product/${products.productId}`}
        handleCart={() => {
          const productExists = cart.some(item => item.productId === products.productId);

          if (productExists) {
            toast.info('Item is already in the cart');
          } else {
            const updatedCart = [...cart, products];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Item added to cart');
          }
        }}
      />
    </>
  );
}

// ✅ Add PropTypes validation
ProductQuickView.propTypes = {
  closeQuickView: PropTypes.func.isRequired,
  products: PropTypes.shape({
    productId: PropTypes.string.isRequired, // or number, depending on your data
    image: PropTypes.string,
    productImage: PropTypes.string,
    productName: PropTypes.string.isRequired,
    productType: PropTypes.string,
    productPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    productDescription: PropTypes.string
  }).isRequired
};
