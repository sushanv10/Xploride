import {  RiCustomSize, RiMotorbikeLine } from 'react-icons/ri';
import { BiCategory } from "react-icons/bi";
import { GiCartwheel } from "react-icons/gi";
import { SiBrandfolder } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent';
import { FaWeightScale } from 'react-icons/fa6';

const BikeData = ({ data }) => {
  return (
    <div className='p-5 flex flex-wrap gap-4 justify-evenly'>
      {data.map((bike) => (
        <div
          key={bike.bikeId}
          className='bg-[#222222] h-[28rem] w-[300px] shadow-sm shadow-gray-500 rounded-xl overflow-hidden'
          data-aos="fade-up"
          id='feature'
        >
          {/* Title */}
          <div className="text-white text-[20px] p-4 text-center font-semibold">
            {bike.name}
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img src={bike.bikeImage} className='h-[180px] w-[16rem] object-contain' alt={bike.bikeName} />
          </div>

          {/* Details */}
          <div className="p-4 grid grid-cols-2 gap-x-20 gap-y-4">
            <div className="flex items-center gap-2">
              <RiMotorbikeLine className='text-blue-500 text-lg' />
              <h5 className='text-white text-sm max-w-[50px] truncate'>{bike.bikeName}</h5>
            </div>
            <div className="flex items-center gap-2">
              <SiBrandfolder className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm truncate'>{bike.brand}</h5>
            </div>
            <div className="flex items-center gap-2">
              <RiCustomSize  className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm truncate'>{bike.size} cm</h5>
            </div>
            <div className="flex items-center gap-2">
              <BiCategory className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm truncate'>{bike.category}</h5>
            </div>
            <div className="flex items-center gap-2">
              <GiCartwheel className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm truncate'>{bike.wheel} C</h5>
            </div>
            <div className="flex items-center gap-2">
              <FaWeightScale className='text-blue-500 text-xl' />
              <h5 className='text-white text-sm truncate'>{bike.weight} Kg</h5>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-4">
            <Link to={`/bikes/${bike.bikeId}`}>
              <ButtonComponent text="View More" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BikeData;
