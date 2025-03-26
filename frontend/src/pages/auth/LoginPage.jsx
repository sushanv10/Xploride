import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../../context/AuthContext"; 
import { validateEmail, validatePassword } from "../../utils/validation";
import PasswordFieldComponent from "../../components/PasswordFieldComponent";
import { toast, ToastContainer } from "react-toastify";
import { Circles } from 'react-loading-icons';
import axiosInstance from "../../config/AxiosConfig";

const LoginPage = () => {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // Handle change function for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", 
    }));

    setUserData({ ...userData, [name]: value });
  };

  // Handle submit function 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const loginData = { email: userData.email, password: userData.password };

    const validationErrors = {
      email: validateEmail(loginData.email),
      password: validatePassword(loginData.password),
    };

    // Filter out fields with no error
    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([key, value]) => value !== null)
    );

    setErrors(filteredErrors);

    if (Object.keys(filteredErrors).length > 0) {
      return; // Stops submission if there are validation errors
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "auth/login",
        userData, {
          withCredentials: true,
        }
      );

      const { accessToken, data } = response.data;
      
      if (!accessToken) {
        throw new Error("Invalid server response");
      }

      // Update auth context with token and user data
      setAuth({
        token: accessToken,
        user: data,
      });

      toast.success("Login successful");
      setTimeout(() => {
        if(data.role == 'admin'){
          navigate('/admin/dashboard')
          
        } else{
          navigate("/"); 
        }
      }, 1500);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="flex justify-center items-center" type="submit" onSubmit={handleSubmit}>
        <div className="bg-slate-50 h-100 w-85 lg:w-100 relative top-55 rounded-[20px] shadow-2xl drop-shadow-2xl sm:h-105 sm:w-85 lg:top-35">
          <h3 className="text-center p-7 text-blue-500 text-[25px] sm:text-[28px] font-bold">
            Login
          </h3>
          <div className="flex flex-col justify-center items-center lg:-mt-2">
            {/* Email Field */}
            <span className="flex justify-center items-center mr-5 mb-4">
              <MdEmail className="h-5 w-5 relative left-8 z-10 sm:h-6 sm:w-6 text-gray-600" />
              <InputComponent
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={'h-10 w-68  sm:h-11 sm:text-[15px] lg:w-85 pl-10'}
              />
              {/* Email Validation error message */}
              {errors.email && (
                <div className="text-red-500 absolute top-34 left-10 right-0 text-sm">
                  {errors.email}
                </div>
              )}
            </span>

            {/* Password Field */}
            <div className="mt-2">
              <PasswordFieldComponent
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
      
              />
            </div>

            {/* Password validation error message */}
            {errors.password && (
              <div className="text-red-500 absolute top-51 left-10 right-0 text-sm">
                {errors.password}
              </div>
            )}

            {/* Button */}
            <div className="flex justify-center items-center mt-8 sm:mt-8">
              <ButtonComponent
                text={loading ? <Circles className="relative h-5 w-5 left-26 lg:left-32" /> : "Login"}
                type="submit"
                className="w-70 lg:w-80"
              />
            </div>

            {/* Registration Link */}
            <p className="text-gray-500 pt-8 sm:pt-10 lg:pt-8 text-[14px] sm:text-[16px] lg:text-[15px] ">
              Don't Have an Account?{" "}
              <Link to="/register" className="underline pl-1 text-blue-500 text-[14px] lg:text-[15px]">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
