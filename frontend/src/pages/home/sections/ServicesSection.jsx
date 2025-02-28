const ServicesSection = () => {
  const serviceCard = [
    {
      id: 1,
      number: '1 .',
      title: "Adjustment & Installation",
      subTitle: "Expert tuning and seamless setup for optimal performance.",
    },
    {
      id: 2,
      number: '2 .',
      title: "Bike Rentals & Tours",
      subTitle:"Explore with ease—rent top-quality bikes and join guided tours."
    },
    {
      id: 3,
      number: '3 .',
      title: "Repair & Maintenance",
      subTitle:"Professional servicing to keep your ride smooth and reliable."
    },
    {
      id: 4,
      number: '4 .',
      title: "Gear & Accessories",
      subTitle:"High-quality cycling gear and must-have accessories for every rider."
    },
  ];

  return (
    <div className="bg-black py-16 px-5">
      {/* Title Section */}
      <h3 className="text-[#C6E4FF] font-semibold text-[22px] lg:text-[25px] text-center lg:text-2xl">
        Our Services
      </h3>
      <div className="pt-4 text-center">
        <h2 className="text-white font-bold text-[25px] lg:text-4xl">We are There, Where You</h2>
        <div className="flex justify-center gap-2 mt-2 lg:mt-4">
          <h2 className="text-blue-400 font-bold text-[25px] lg:text-4xl">Start</h2>
          <h2 className="text-white font-bold text-[25px] lg:text-4xl">Your</h2>
          <h2 className="text-blue-400 font-bold text-[25px] lg:text-4xl">Journey</h2>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 py-[2rem] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6
       mt-5 lg:mt-8 ">
        {serviceCard.map((item) => (
          <div 
            key={item.id} 
            className="h-[15rem] w-[22rem] lg:h-[18rem] lg:w-[38rem] rounded-sm 
             border-gray-500 border-2 shadow-md flex items-center
              mx-auto hover:bg-[rgba(20,20,20,0.6)] cursor-pointer transition duration-500 ease-in-out hover:border-blue-400"
          >
            <div className="flex flex-col pl-5 lg:pl-8 gap-4">
              <p className="text-[#C6E4FF] text-[18px]">{item.number}</p>
              <p className="text-[#C6E4FF] text-[20px] font-semibold lg:text-[32px]">{item.title}</p>
              <p className="text-gray-300 font-extralight text-sm lg:text-sm">{item.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
