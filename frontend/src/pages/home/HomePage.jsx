import Footer from "../footer/Footer"
import AboutSection from "./sections/AboutSection"
import BannerSection from "./sections/BannerSection"
import BikeSection from "./sections/BikeSection"
import FaqSection from "./sections/FaqSection"
import FeaturedProductSection from "./sections/FeaturedProductSection"
import HeroSection from "./sections/HeroSection"
import Parallax from "./sections/Parallax"
import ServicesSection from "./sections/ServicesSection"
import TourSection from "./sections/ToursSection"



const HomePage = () => {
  return (
    <div>
        <HeroSection/>
        <AboutSection/>
        <BannerSection/>
        <FeaturedProductSection/>
        <Parallax/>
        <BikeSection/>
        <ServicesSection/>
        <TourSection/>
        <FaqSection/>
        <Footer/>
        


        {/* <FeaturedProductSection/> */}

       
      
    </div>
  )
}

export default HomePage
