const ButtonComponent = ({ text, className = "", type }) => {
  return (
    <button
      type={type}
      className={`
        bg-blue-500 text-white rounded-[8px] font-medium 
        text-xs xs:text-sm sm:text-[14px] md:text-[15px] lg:text-[16px] 
        min-w-[80px] xs:min-w-[90px] sm:min-w-[100px] md:min-w-[120px]  px-4 py-2
        cursor-pointer transition duration-500 ease-in-out 
        hover:bg-gray-800 transform hover:scale-105
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
