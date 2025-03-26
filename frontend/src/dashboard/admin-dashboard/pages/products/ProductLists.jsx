import ButtonComponent from "../../../../components/ButtonComponent"


const ProductLists = () => {

  const handleAddProduct = () => {

  }

  return (
    <div className="bg-[rgba(46,46,46,0.24)] bg-opacity-50 -mt-20 min-h-screen p-5">
       {/* Header */}
        <div className="flex justify-between">
          <h3 className="text-[18px] text-white">Product Lists</h3>
          <ButtonComponent text={"Add Product"} onClick={handleAddProduct}/>
        </div>
      
      
    </div>
  )
}

export default ProductLists
