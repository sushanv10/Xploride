import { RiLockPasswordFill } from "react-icons/ri";
import InputComponent from "./InputComponent";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PasswordFieldComponent = ({ placeholder, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <span className="relative flex justify-center items-center">
        {/* Password Icon */}
        <RiLockPasswordFill className="h-5 w-5 absolute left-3 text-gray-600 sm:h-6 sm:w-6 z-10" />

        {/* Input Component */}
        <InputComponent
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={'h-10 w-68  sm:h-11 lg:w-85 pl-10'}
         
        />

        {/* Toggle Password Visibility Icon */}
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[18px] cursor-pointer text-gray-600 z-10"
          onClick={togglePassword}
        >
          {!showPassword ? <IoMdEye /> : <IoMdEyeOff />}
        </div>
      </span>
    </>
  );
};

export default PasswordFieldComponent;
