import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ButtonComponent from '../../../components/ButtonComponent';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  
   useEffect(() => {
    setSlides([
      {
        image: 'https://res.cloudinary.com/dyt7drhch/image/upload/v1739425433/Hero_Image_eqtumr.png',
        title: 'Better Bikes',
        subtitle: 'For Your Better Journey',
        buttonText: 'Rent Bike'
      },
      {
        image: 'https://res.cloudinary.com/dyt7drhch/image/upload/v1739425721/Hero_ycn9ls.png',
        title: 'Ride with Comfort',
        subtitle: 'Book Your Tour and Enjoy Your Ride ',
        buttonText: 'Book Tour'
      },
      {
        image: 'https://res.cloudinary.com/dyt7drhch/image/upload/v1739425719/bg_yepssc.jpg',
        title: 'Gear Up for Adventure',
        subtitle: 'Everything You Need for the Ultimate Ride',
        buttonText: 'Shop'
      }
    ]);
  }, []);

  return (
    <div className="absolute w-full mt-18">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={5000}
      >
        {slides.map((slide, index) => (
          <div key={index} className="h-[255px] sm:h-[400px] md:h-[500px] lg:h-[800px] bg-black">
            <img src={slide.image} alt={`Hero ${index + 1}`} className="w-full h-full object-cover bg-center opacity-90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:pt-8">
              <h1 className='text-blue-500 font-bold text-[20px] sm:text-[50px] md:text-[60px] lg:text-[75px]'>
                {slide.title}
              </h1>
              <h2 className='text-white font-bold text-[16px] sm:text-[30px] md:text-[50px] lg:text-[75px]'>
                {slide.subtitle}
              </h2>
              <div className="mt-4 flex justify-center">
                <ButtonComponent text={slide.buttonText} />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;