import { useEffect, useState } from 'react';
import HeadingComponent from '../../../components/HeadingComponent';
import axiosInstance from '../../../config/AxiosConfig';
import TourData from '../../../utils/data/TourData';

const TourSection = () => {

  const [tours, setTours]= useState([]);

  useEffect(() => {
    const fetchTours = async() => {
      try {
        const response = await axiosInstance.get('tour/');
        const fetchedTours = response.data.tour
        console.log(fetchedTours)
        setTours(fetchedTours.slice(0,3));
      } catch (error) {
         console.error('Error fetching tours:', error)
        
      }

    }
    fetchTours();
  },[])
  
  return (
    <div className='bg-[#0C0C0C] min-h-screen w-full '>
        <div className="text-center pt-8 ">
            <HeadingComponent text={"Available Tours"}/>
        </div>

        <div className="mt-5">
          <TourData data={tours}/>
        </div>
      
    </div>
  )
}

export default TourSection;
