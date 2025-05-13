import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import { FaBicycle, FaHelmetSafety } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import HeadingComponent from "../../components/HeadingComponent";


const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
       <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://askproject.net/venturo/wp-content/uploads/sites/84/2022/06/black-bicycle-against-white-background-road-bike-PJNKPFH.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-center text-white">
          <h1 className="text-3xl font-bold">BIKE DETAILS</h1>
          <p>
            <Link to="/" className="text-blue-400">
              Home
            </Link>{" "}
            / About
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className=" py-20 px-4 md:px-20 text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <HeadingComponent text={'Our Story'}/>
          <p className="text-lg text-white md:text-xl py-5 leading-relaxed max-w-3xl mx-auto ">
            At <span className="text-primary font-semibold">Xploride</span>, we believe that the thrill of exploration begins on two wheels.
            Whether you're renting a bike, buying the latest gear, or planning your next cycling adventure —
            we’re here to make every ride exceptional. Born from a passion for cycling, Xploride bridges the gap
            between riders and the resources they need to explore freely and safely.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className=" bg-[#0C0C0C] py-20 px-4 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-gray-200">Our Mission</h3>
            <p className="text-gray-100 text-lg leading-relaxed">
              To provide a seamless platform for bike rentals, premium gear purchases, and guided tour experiences —
              fueling a global cycling movement.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4 text-gray-200">Our Vision</h3>
            <p className="text-gray-100 text-lg leading-relaxed">
              To become the go-to destination for every cycling enthusiast by building a sustainable and vibrant cycling ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 md:px-20">
        <div className="max-w-6xl mx-auto text-center ">
          <h2 className="text-4xl font-bold mb-12 text-[#C6E4FF]">Why Choose Xploride?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Easy Rentals",
                desc: "Rent bikes with just a few clicks — fast, affordable, and convenient.",
                icon: <FaBicycle className="text-4xl text-primary mb-4" />,
              },
              {
                title: "Premium Gear",
                desc: "Shop top-tier riding gear and accessories for every journey.",
                icon: <FaHelmetSafety className="text-4xl text-primary mb-4" />,
              },
              {
                title: "Guided Tours",
                desc: "Book epic cycling adventures and explore new terrains with confidence.",
                icon: <FaMapMarkedAlt className="text-4xl text-primary mb-4" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
              >
                {item.icon}
                <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary  py-20 px-4 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#C6E4FF]">Ready to Ride?</h2>
        <p className="text-lg mb-8 text-white">Join thousands of riders already exploring the world with Xploride.</p>
        <Link
          to="/shop"
          className="bg-blue-500 text-white text-primary px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-400 transition"
        >
          Explore Our Store
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
