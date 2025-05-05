import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import axiosInstance from "../../config/AxiosConfig";
import TourData from "../../utils/data/TourData";


const TourPage = () => {

    const[tours, setTours] = useState([]);
    const[loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const tourPerPage = 12;

    const categories = ['All', ... new Set(tours.map((t) => t.category))];

    const filterTours = tours
    .filter((t) => (t.tourName || '').toLowerCase().includes(search.toLowerCase()))
    .filter((t) => selectedCategory === 'All' || t.category === selectedCategory)

    const indexOfLastTour = currentPage * tourPerPage;
    const indexOfFirstTour = indexOfLastTour - tourPerPage;
    const currentTours = filterTours.slice(indexOfFirstTour, indexOfLastTour);
    const totalPages = Math.ceil(filterTours.length/ tourPerPage);

    const handlePageChnge = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axiosInstance.get('tour/');
                const fetchedTours = response.data.tour
                console.log("Tour Fetched", fetchedTours);
                setTours(fetchedTours);
                
            } catch (error) {
                console.log(error)
                
            } finally {
                setLoading(false)
            }
        }
        fetchTours();
    },[]);

  return (
    <>
    {loading ?
        (
            <LoadingSpinner/>  
          
        ) : (
            <div className="">
            {/* Hero */}
                <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url("https://askproject.net/venturo/wp-content/uploads/sites/84/2022/06/black-bicycle-against-white-background-road-bike-PJNKPFH.jpg")' }}>
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative flex flex-col justify-center items-center h-full text-white text-center">
                    <h1 className="text-5xl font-extrabold mb-2">Explore Our TOURS</h1>
                    <p className="text-lg">
                        <Link to="/" className="text-blue-400 hover:underline">Home</Link> /Tours
                    </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="max-w-8xl mx-auto px-6 py-10">
                    <div className="bg-[#0C0C0C] rounded-xl shadow-md p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col">
                            <h4 className='text-white text-[18px]'>Search Tours</h4>
                            <input
                            type="text"
                            placeholder="Search tours..."
                            className="p-3 h-10 border border-white text-white mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            />
                    </div>

                    <div className="flex flex-col">
                        <h4 className='text-white text-[18px]'>Filter By Category</h4>
                        <select
                            className="bg-[#0C0C0C] h-10 p-2 border mt-4 border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                            {categories.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Bike List */}
                <div className="mt-10 flex justify-start">
                {filterTours.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No bikes found.</p>
                ) : (
                    <TourData data={currentTours} />
                )}
                </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChnge(index + 1)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-blue-100 text-gray-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
            <Footer/>
        </div>
        )
    }
    </>
  )
}

export default TourPage
