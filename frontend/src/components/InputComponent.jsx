
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
        className={`relative text-black rounded-[10px] text-sm bg-gray-100 
         border-1 border-gray-300  ${className}`}
       
        />
    </>
  )
}
export default InputComponent
