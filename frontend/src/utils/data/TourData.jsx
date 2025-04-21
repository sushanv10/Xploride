import { Link } from 'react-router-dom';
import { GoCalendar } from "react-icons/go";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GiPathDistance } from 'react-icons/gi';
import { IoTrailSignOutline } from 'react-icons/io5';

const TourData = ({ data }) => {
  return (
    <div className='p-5 flex flex-wrap gap-5 justify-evenly'>
      {data.map((tour) => (
        <div
          key={tour.tour_id}
          className='h-[30rem] w-[24rem]'
        //   data-aos="fade-up"
        //   id='feature'
        >

          {/* Image */}
          <Link to={`/tour/${tour.tour_id}`}>
          <div className="flex justify-center ">
            <img src={tour.tourImage} className='h-[170px] w-[24rem] object-contain my-4' alt={tour.tourName} />
          </div>
            
          {/* Title */}
          <div className="text-white text-[16px] p-4 text-center font-semibold">
            {tour.tourName}
          </div>
          </Link>

          <div className="border border-gray-800"></div>

          {/* Details */}
          <div className="p-4 grid grid-cols-2 gap-x-20 gap-y-4">
            <div className="flex items-center gap-2">
              <IoTrailSignOutline  className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm '>{tour.category}</h5>
            </div>
            <div className="flex items-center gap-2">
              <LiaRupeeSignSolid   className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm '>Rs {tour.price}</h5>
            </div>
            <div className="flex items-center gap-2">
              <GoCalendar className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm '>{tour.duration}</h5>
            </div>

             <div className="flex items-center gap-2">
              <GiPathDistance  className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm '>{tour.distance} Km</h5>
            </div>
           
          </div>

          {/* Button */}
          {/* <div className="flex justify-center ">
            <Link to={`/tours/${tour.tour_id}`}>
              <button className='cursor-pointer text-blue-500 '>View Full Detail</button>
            </Link>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TourData;
