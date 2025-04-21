import { useEffect, useState } from 'react'
import HeadingComponent from '../../../components/HeadingComponent'
import ProductData from '../../../utils/data/ProductData'
import axiosInstance from '../../../config/AxiosConfig'
import { useCart } from '../../../context/CartContext'

const FeaturedProductSection = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('products/')
        const fetchedProducts = response.data.products
        setProducts(fetchedProducts.slice(0, 4))
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="w-full py-10 px-4 sm:px-8 lg:px-16">
      <div className="text-center">
        <HeadingComponent text="Featured Products" />
      </div>

      <div className="mt-10">
        <ProductData data={products} />
      </div>
    </div>
  )
}

export default FeaturedProductSection
