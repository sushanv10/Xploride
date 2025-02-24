import { GiHamburgerMenu, GiShoppingBag } from "react-icons/gi";
import { FaUser } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Search from "../Search";
import LogoComponent from "../../components/LogoComponent";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) { 
        if (window.scrollY > lastScrollY.current) {
          setIsVisible(false); 
        } else {
          setIsVisible(true); 
        }
        lastScrollY.current = window.scrollY; 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleHamBurger = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <>
      <nav className={`bg-black opacity-85 h-18 w-full fixed z-50 
        ${window.innerWidth >= 1024 ? 'lg:transition-transform lg:duration-500' : ''}
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between p-4 items-center w-full">
          {/* Logo */}
          <div className="flex items-center cursor-pointer ml-2">
           <LogoComponent/>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex text-white text-sm gap-14 ml-auto cursor-pointer font-medium">
            <li className="hover:text-blue-400 transition"><Link to='/'>HOME</Link></li>
            <li className="hover:text-blue-400 transition"><Link to='/about'>ABOUT</Link></li>
            <li className="hover:text-blue-400 transition"><Link to='/shop'>SHOP</Link></li>
            <li className="hover:text-blue-400 transition"><Link to='/rentals'>RENTALS</Link></li>
            <li className="hover:text-blue-400 transition"><Link to='/tours'>TOURS</Link></li>
          </ul>

          {/* Icons Section */}
          <div className="flex gap-5 items-center cursor-pointer ml-auto mr-2">
            <button onClick={toggleSearch}>
              <IoSearchOutline 
              className="text-white text-[20px] hover:text-blue-400 transition cursor-pointer"
            
            />
            </button>
            {showSearch && 
            <div className="bg-black min-h-screen w-full absolute top-18 left-0 right-0">
              <Search/>
            </div> 
            }
           
            <div className="relative">
              <GiShoppingBag className="text-[24px] text-blue-400" />
              <div className="absolute bg-red-500 rounded-full w-4 flex justify-center -top-2 -right-2">
                <span className="text-sm text-white font-bold">0</span>
              </div>
            </div>
            {/* Profile */}
            <button className="cursor-pointer flex">
              <Link to='/login'><FaUser className="text-white text-[18px] hover:text-blue-400 "/></Link>
            </button>

            {/* Hamburger Menu (Mobile Only) */}
            <button onClick={toggleHamBurger} className="md:hidden">
              {isOpen ? <IoMdClose className="text-white text-[20px]" /> : <GiHamburgerMenu className="text-white text-[20px]"/>}
            </button>
          </div>  
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black h-[18rem] w-full ">
            <ul className="flex flex-col items-center justify-center gap-5 
            p-10 text-white cursor-pointer font-medium">
              <li><Link to='/'>HOME</Link></li>
              <li><Link to='/about'>ABOUT</Link></li>
              <li><Link to='/shop'>SHOP</Link></li>
              <li><Link to='/rentals'>RENTALS</Link></li>
              <li><Link to='/tours'>TOURS</Link></li>
            </ul>    
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
