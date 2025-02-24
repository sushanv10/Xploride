
const InputComponent = ({type, placeholder, name, onClick, className}) => {
  return (
    <>
        <input 
        type={type}
        placeholder={placeholder} 
        name={name} 
        onClick={onClick}
        className={`absolute h-10 w-68 rounded-[10px] sm:h-11 sm:text-[15px] ${className}`}
       
        />
    </>
  )
}
export default InputComponent
