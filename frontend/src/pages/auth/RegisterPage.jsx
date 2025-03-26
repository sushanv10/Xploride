import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import { MdEmail, MdPermContactCalendar } from "react-icons/md";
import { Circles } from 'react-loading-icons';
import PasswordFieldComponent from "../../components/PasswordFieldComponent";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { validateForm } from "../../utils/validation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../config/AxiosConfig";

const RegisterPage = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const navigate= useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "", 
  }));

  setUserData({ ...userData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm(userData);
  setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "auth/register", userData
         
        );
        console.log(response)
        toast.success("Registration Successfull");
        setTimeout(() => {
          navigate('/login')
        },3000);
      } catch (error) {
        console.log("Error:",error.response?.data?.msg || error.message);
        toast.error(error.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  }
};

  return (
    <>
    <ToastContainer />
    <form className="flex justify-center items-center min-h-screen py-10 " onSubmit={handleSubmit}>
      <div className="bg-slate-50 p-8 w-85 lg:w-[600px] rounded-[20px] shadow-2xl md:mt-20 lg:mt-15">
        <h3 className="text-center text-blue-500 text-[25px] sm:text-[28px] font-bold mb-6">
          Register
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Username Field */}
          <div className="relative">
            <span className="flex items-center">
              <FaUser className="h-5 w-5 absolute left-3 lg:left-4 z-10 text-gray-600" />
              <InputComponent
                type="text"
                placeholder="Username"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                className={'h-10 w-68 sm:h-11 lg:w-85 pl-10'}
                
              />
            </span>
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>

          {/* Email Field */}
          <div className="relative">
            <span className="flex items-center">
              <MdEmail className="h-5 w-5 absolute left-3 lg:left-4 z-10 text-gray-600" />
              <InputComponent
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={'h-10 w-68  sm:h-11 sm:text-[15px] lg:w-85 pl-10'}
               
              />
            </span>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Contact Field */}
          <div className="relative">
            <span className="flex items-center">
              <MdPermContactCalendar className="h-5 w-5 absolute left-3 lg:left-4 z-10 text-gray-600" />
              <InputComponent
                type="tel"
                placeholder="Contact"
                name="contact"
                value={userData.contact}
                onChange={handleChange}
                className={'h-10 w-68  sm:h-11 sm:text-[15px] lg:w-85 pl-10'}
              />
            </span>
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          {/* Address Field */}
          <div className="relative">
            <span className="flex items-center">
              <FaLocationDot className="h-5 w-5 absolute left-3 lg:left-4 z-10 text-gray-600" />
              <InputComponent
                type="text"
                placeholder="Address"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className={'h-10 w-68  sm:h-11 sm:text-[15px] lg:w-85 pl-10'}
                
              />
            </span>
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Password Field */}
          <div>
            <PasswordFieldComponent
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div >
            <PasswordFieldComponent
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && 
            <p className="text-red-500 text-sm">
              {errors.confirmPassword}</p>}
          </div>
        </div>

         {/* Button */}
        <div className="flex justify-center items-center mt-6">
          <ButtonComponent
                text={loading ? <Circles className="relative h-5 w-5 left-26 lg:left-32" /> : "Register"}
                type="submit"
                className="w-70 lg:w-80"
              />
        </div>

        {/* Registration Link */}
        <p className="text-gray-500 pt-6 text-sm text-center">
          Already Have an Account?
          <Link to="/login" className="underline pl-1 text-sm text-blue-500">Sign In</Link>
        </p>
      </div>
    </form>
    </>
  );
};

export default RegisterPage;
