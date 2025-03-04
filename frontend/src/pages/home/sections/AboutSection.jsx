import ButtonComponent from "../../../components/ButtonComponent";
import HeadingComponent from "../../../components/HeadingComponent";

const AboutSection = () => {
  return (
    <div className="relative top-80 xs:top-60 sm:top-118 md:top-142 lg:top-218 w-full">
      <div className=" min-h-[24rem] xs:min-h-[380px] sm:min-h-[395px] md:min-h-[440px] 
      lg:min-h-[550px] flex items-center justify-center px-5">
        <div className="flex flex-col text-center gap-4 lg:gap-5 md:-mt-8 max-w-3xl mx-auto">
          {/* About Us Title */}
         <HeadingComponent text={"About us"} className="text-center"/>

          {/* Sub-Heading */}
          <h1 className="text-white text-[20px] xs:text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-bold leading-tight">
            Every Ride, a New Adventure
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-[14px] xs:text-[14px]
           sm:text-[18px] md:text-[20px] lg:text-[22px] px-4 xs:px-6 sm:px-8 
           md:px-12 lg:px-2 text-justify">
            At Xploride, we are more than just a cycling store—we are your ultimate destination for 
            bike rentals, guided tours, and premium riding gear. Whether you’re an adrenaline-seeking 
            adventurer, a casual rider, or a professional cyclist, we provide everything you need for 
            an unforgettable journey on two wheels.
          </p>

          {/* Read More Button */}
          <div className="mt-2">
            <ButtonComponent text="Read More" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
