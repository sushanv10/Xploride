import { Link } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent"
import InputComponent from "../../components/InputComponent"
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <form className="flex justify-center items-center" type='submit'>
        <div className="bg-slate-50 h-100 w-85 lg:w-100 relative top-55 
        rounded-[20px] shadow-2xl drop-shadow-2xl sm:h-105 sm:w-85 lg:top-35">
            <h3 className="text-center p-7 text-blue-500 text-[25px] sm:text-[28px] font-bold">
              Login
            </h3>
            <div className="flex flex-col justify-center items-center lg:-mt-2">
              <span className="flex justify-center items-center mr-5">
                <MdEmail className="h-5 w-5 relative left-8 z-10  sm:h-6 sm:w-6 text-gray-600 "/>
                <InputComponent 
                type={`email`}
                placeholder={`Email`}
                name={`email`}
                className={`text-black relative bg-gray-100 text-sm pl-12 lg:w-85 `}
                />

              </span>

              <span className="flex justify-center items-center mt-6 mr-5">
                <RiLockPasswordFill 
                className="h-5 w-5 relative left-8 z-10 sm:h-6 sm:w-6 text-gray-600"/>
                <InputComponent 
                type={!showPassword ? 'text' : 'password'}
                placeholder={`Password`}
                name={`password`}
                className={`text-black relative bg-gray-100 text-sm pl-12 lg:w-85`}
                />

               <div
                className="absolute right-12 text-[18px] cursor-pointer text-gray-900"
                onClick={togglePassword}
                >
                  {!showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </div>
              </span>

              {/* Button */}
              <div className="flex justify-center items-center mt-8 sm:mt-8">
                <ButtonComponent text={'Login'} type={`button`} className="w-70 lg:w-80"/>
              </div>

            {/* Registration Link */}
             <p className="text-gray-500 pt-8 sm:pt-10 text-[14px] sm:text-[16px] lg:text-[15px] ">
                Don't Have an Account? 
                <Link to='/signup' className="underline pl-1 text-blue-500 text-[14px] lg:text-[15px]">SignUp</Link>
              </p>
          </div>
        </div>
    </form>
  )
}
export default LoginPage
