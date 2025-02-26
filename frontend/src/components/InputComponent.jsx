
const InputComponent = ({type, placeholder, name, onClick, onChange, value, className}) => {
  return (
    <>
        <input 
        type={type}
        placeholder={placeholder} 
        name={name} 
        onClick={onClick}
        onChange={onChange}
        value={value}
        className={`relative text-black h-10 w-68 rounded-[10px] text-sm bg-gray-100 
          sm:h-11 sm:text-[15px] lg:w-85 border border-gray-300 pl-11 ${className}`}
       
        />
    </>
  )
}
export default InputComponent
