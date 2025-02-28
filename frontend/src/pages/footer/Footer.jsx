import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import LogoComponent from "../../components/LogoComponent";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[rgb(31,30,30)] text-white py-15">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Branding & Social Media */}
          <div>
            <LogoComponent />
            <p className="text-gray-300 text-sm mt-3">
              Your ultimate destination for e-commerce, <br /> bike rentals and tours, and premium riding gear.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 text-white pt-4">
              <a href="https://www.facebook.com" className="text-[20px] hover:text-blue-500"><FaFacebookF /></a>
              <a href="https://www.twitter.com" className="text-[20px] hover:text-blue-400"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="text-[20px] hover:text-pink-500"><FaInstagram /></a>
              <a href="https://www.linkedin.com" className="text-[20px] hover:text-blue-700"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-gray-300 text-sm mt-3">
              <li className="hover:text-blue-400 transition"><Link to="/">HOME</Link></li>
              <li className="hover:text-blue-400 transition"><Link to="/about">ABOUT</Link></li>
              <li className="hover:text-blue-400 transition"><Link to="/shop">SHOP</Link></li>
              <li className="hover:text-blue-400 transition"><Link to="/rentals">RENTALS</Link></li>
              <li className="hover:text-blue-400 transition"><Link to="/tours">TOURS</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex flex-col text-sm text-gray-300 mt-3 gap-y-2">
              <p>Email: <a href="mailto:xploride@gmail.com" className="hover:text-blue-400">xploride@gmail.com</a></p>
              <p>Phone: +977 9848769773</p>
              <p>Location: Kathmandu, Nepal</p>
            </div>
          </div>

          {/* Support & Help */}
          <div>
            <h3 className="text-lg font-semibold">Support & Help</h3>
            <div className="flex flex-col text-sm text-gray-300 mt-3 gap-y-2">
              <p className="hover:text-blue-400 transition">FAQ</p>
              <p className="hover:text-blue-400 transition">Terms & Conditions</p>
              <p className="hover:text-blue-400 transition">Privacy Policies</p>
              <p className="hover:text-blue-400 transition">Customer Support</p>
            </div>
          </div>

          {/* Services Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="flex flex-col text-sm text-gray-300 mt-3 gap-y-2">
              <p>🚴‍♂️ Cycle Rentals</p>
              <p>🛍️ E-commerce Store</p>
              <p>🔧 Repair & Maintenance</p>
              <p>🏔️ Guided Tours</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-400 text-sm mt-8">
          © 2025 Xploride. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
