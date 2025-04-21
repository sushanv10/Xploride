import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";


export default function QuickViewComponent({ onClick, handleCart,  Image, name, type, price, description,link }) {
  return (

    <>
      <div className=" flex justify-center items-center z-50 -mt-80">
        <div className="bg-white rounded-lg p-6 w-[50rem]  relative">
          <button 
            className="absolute top-2 right-2 text-black text-xl"
            onClick={onClick}
          >
            &times;
          </button>

          <img 
            src={Image}
            alt={name}
            className="w-full h-40 object-contain mb-4"
          />

          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600">{type}</p>
          <p className="text-blue-500 mt-2">Npr {price}</p>
          <p>{description}</p>

          <div className="flex justify-between mt-5">
            <button
                className="bg-blue-500 border cursor-pointer border-white w-28 sm:w-32 py-2 rounded text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1"
                onClick={handleCart}
                >
                    ADD TO CART <RiShoppingCartLine />
            </button>
            <Link to={link}><button className="text-blue-500 cursor-pointer">View Full Info</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
