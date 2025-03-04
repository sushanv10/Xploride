import HeadingComponent from "../../../components/HeadingComponent";

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
      subTitle: "Explore with ease—rent top-quality bikes and join guided tours.",
    },
    {
      id: 3,
      number: '3 .',
      title: "Repair & Maintenance",
      subTitle: "Professional servicing to keep your ride smooth and reliable.",
    },
    {
      id: 4,
      number: '4 .',
      title: "Gear & Accessories",
      subTitle: "High-quality cycling gear and must-have accessories for every rider.",
    },
  ];

  return (
    <div className="relative top-0 h-[66rem] sm:h-[46rem] md:h-[54rem] lg:h-[58rem] w-full px-4 sm:px-6 md:px-12 lg:px-16">
      {/* Title Section */}
      <div className="pt-10 text-center">
      <HeadingComponent text={"Our Services"} className="text-center" />
        <h2 className="text-white pt-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          We are There, Where You
        </h2>
        <div className="flex justify-center gap-2 mt-2 lg:mt-4 flex-wrap">
          <h2 className="text-blue-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Start</h2>
          <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Your</h2>
          <h2 className="text-blue-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Journey</h2>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-6 
      md:mt-12 w-full ">
        {serviceCard.map((item) => (
          <div
            key={item.id}
            className="min-h-[12rem] sm:min-h-[15rem] md:min-h-[16rem] lg:min-h-[18rem] 
             w-full rounded-md border-2 border-gray-500 shadow-md flex items-center
             p-4 sm:p-6 hover:bg-[rgba(20,20,20,0.6)] cursor-pointer transition duration-500 
             ease-in-out hover:border-blue-400"
          >
            <div className="flex flex-col gap-2 sm:gap-4">
              <p className="text-[#C6E4FF] text-base sm:text-lg">{item.number}</p>
              <p className="text-[#C6E4FF] text-lg sm:text-xl md:text-2xl font-semibold">{item.title}</p>
              <p className="text-gray-300 font-light text-sm sm:text-base">{item.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
