import { useEffect, useState } from 'react';
import HeadingComponent from '../../../components/HeadingComponent';
import BikeData from '../../../utils/data/BikeData';
import axiosInstance from '../../../config/AxiosConfig';

const BikeSection = () => {

  const [bikes, setBikes]= useState([]);

  useEffect(() => {
    const fetchBikes = async() => {
      try {
        const response = await axiosInstance.get('bikes/');
        const fetchedBikes = response.data.bikes
        console.log(fetchedBikes)
        setBikes(fetchedBikes.slice(0,4));
      } catch (error) {
         console.error('Error fetching bikes:', error)
        
      }

    }
    fetchBikes();
  },[])
  
  return (
    <div className='bg-[#0C0C0C] min-h-screen w-full '>
        <div className="text-center pt-8 ">
            <HeadingComponent text={"Popular Bikes "}/>
        </div>

        <div className="mt-5">
          <BikeData data={bikes}/>
        </div>


      
    </div>
  )
}

export default BikeSection;
