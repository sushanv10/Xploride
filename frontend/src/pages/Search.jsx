const Search = () => {
  return (
    <div className='flex justify-center items-center mt-60 '>
        <input 
        type='search'
        placeholder='Search'
        name='search'
        className=' h-10 w-90 sm:w-156 md:w-180 lg:w-290 text-white pl-4
         border-2 border-gray-500 rounded-2xl'
        />
    </div>
  )
}

export default Search
