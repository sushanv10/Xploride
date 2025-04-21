import { FaFilter } from "react-icons/fa6"

import { BiSearch } from "react-icons/bi"
import ButtonComponent from "./ButtonComponent"
import InputComponent from "./InputComponent"
import TableComponent from "./TableComponent"


const FormComponent = ({text, title, onClick ,dropDown, headers, data, handleEdit, handleDelete}) => {

  return (
    <div className="bg-[rgba(46,46,46,0.24)] bg-opacity-50 -mt-20 min-h-screen p-5">
       {/* Header */}
        <div className="flex justify-between">
          <h3 className="text-[18px] text-white">{title}</h3>
          <ButtonComponent text={text} onClick={onClick}/>
        </div>

        <div className="bg-[#00000031] w-[80rem] min-h-[20rem] max-h-screen rounded-xl shadow-lg p-6 flex flex-col mt-6 overflow-y-auto z-20">
          <div className="flex justify-between">
            {/* Search Bar */}
            <div className="relative">
              <BiSearch className="absolute left-2 top-1.5 text-black text-[19px]" />
              <input
                type="search"
                placeholder="Search...."
                className="pl-9 h-8 w-45 text-sm text-black bg-white border-none rounded-[10px]"
              />
            </div>

            {/* Filter Icon */}
            <div className="flex justify-center items-center bg-slate-50 h-9 w-9 rounded-[5px] border-blue-500 border-2">
              <FaFilter className="text-black text-[18px] cursor-pointer" />
            </div>
          </div>

          {/* Category dropdown */}
            <div className="flex my-5 gap-10">
              <div className="flex flex-col w-1/5">
                <h4 className="text-white">{dropDown}</h4>
                <select className="bg-white text-gray-500 text-[13px] outline-none pl-2 h-8 w-full my-4 rounded-[8px]">
                  <option value="" disabled selected>
                    Select Product
                  </option>
                </select>
              </div>
           

            {/* Category code */}
            <div className="flex flex-col w-1/5">
              <h4 className="text-white">Category</h4>
              <InputComponent
                type="text"
                placeholder="Category"
                className="bg-white text-black text-[13px] outline-none pl-2 h-8 w-full my-4 "
              />
            </div>

            {/* Date field */}
            <div className="flex flex-col w-1/5">
              <h4 className="text-white">Date</h4>
              <input
                type="date"
                placeholder="Select date"
                className="bg-white text-gray-500 text-[13px] outline-none pl-2 h-8 w-full my-4 rounded-[8px]"
                onFocus={e => (e.target.placeholder = "")}
                onBlur={e => (e.target.placeholder = "Select date")}
              />
            </div>
          </div>

          {/* Table */}
          <TableComponent  headers={headers} data={data} onEdit={handleEdit} onDelete={handleDelete} />
         
         
        </div>
      </div>


  )
}

export default FormComponent;
