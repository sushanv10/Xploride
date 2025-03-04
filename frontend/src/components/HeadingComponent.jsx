
const HeadingComponent = ({text, className=''}) => {
  return (
    <>
        <h3 className={`text-[#C6E4FF] text-[16px] xs:text-[14px] sm:text-[18px] 
        md:text-[20px] lg:text-[22px] font-medium ${className}`}>
            {text}
        </h3>
      
    </>
  )
}

export default HeadingComponent
