import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeadingComponent from "../../../components/HeadingComponent";

function BannerSection() {
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    setBannerImages([
      {
        image:
          "https://res.cloudinary.com/dyt7drhch/image/upload/v1739426551/banner-helmet-image1_mtno1g.webp",
      },
      {
        image:
          "https://res.cloudinary.com/dyt7drhch/image/upload/v1739426550/banner-helmet-image2_psaafn.png",
      },
      {
        image:
          "https://res.cloudinary.com/dyt7drhch/image/upload/v1739426550/banner-helmet-image3_toidhm.webp",
      },
      {
        image:
          "https://res.cloudinary.com/dyt7drhch/image/upload/v1739426550/banner-helmet-image4_thxass.webp",
      },
    ]);
  }, []);

  return (
    <div className="relative mt-80 xs:mt-6 sm:mt-118 md:mt-136 lg:mt-210 w-full">
      <div className="bg-[rgba(22,22,22,0.72)] min-h-[200px] xs:min-h-[220px] sm:min-h-[250px]
       md:min-h-[280px] lg:min-h-[100px] w-full">
        <div className="flex flex-col items-center p-6 sm:p-8">
          {/* Title */}
          <HeadingComponent text={"It's Your Ride! Choose Your Colour!!"} className='text-center'/>

          {/* Banner Images */}
          <div className="flex flex-wrap justify-center gap-10 sm:gap-15 md:gap-20 lg:gap-40 mt-4">
            {bannerImages.map((item, index) => (
              <div key={index} className="mt-3">
                <img
                  src={item.image}
                  alt={`Banner ${index + 1}`}
                  className="h-[60px] xs:h-[50px] sm:h-[80px] md:h-[100px] lg:h-[100px] w-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="mt-5 xs:mt-6 sm:mt-8 md:mt-10 lg:mt-2 px-6 py-2
           text-white underline cursor-pointer font-semibold hover:text-blue-400 transition">
           <Link to='/shop'>Shop Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BannerSection;
