import InputComponent from '../components/InputComponent'

const Search = () => {
  return (
    <div className='flex justify-center items-center mt-60 '>
        <InputComponent 
        type='search'
        placeholder='Search'
        name='search'
        className=' h-10 w-90 sm:w-156 md:w-180 lg:w-290 text-black
         border-2 border-white'
        />
    </div>
  )
}

export default Search
