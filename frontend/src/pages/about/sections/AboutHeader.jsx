import { Link } from "react-router-dom";
import Footer from "../../footer/Footer";

const AboutHeader = () => {
  const backgroundImage = {
    backgroundImage: "url('https://askproject.net/venturo/wp-content/uploads/sites/84/2022/06/black-bicycle-against-white-background-road-bike-PJNKPFH.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "550px",
    opacity: "20%"
  };

  return (
    <>
    <div className="relative">
      <div style={backgroundImage}></div>
        <div className="flex flex-col justify-center text-center -my-70">
          <h1 className="text-white text-5xl opacity-100">About Us</h1>
          <div className="mt-5">
            <h1 className="text-lg md:text-2xl font-bold text-white">
                <Link to="/" className="hover:underline">HOME</Link> / About
            </h1>
          </div>
        </div>
    </div>
    <div className="mt-200">
      <Footer/>

    </div>
    
    </>
  );
};

export default AboutHeader;
