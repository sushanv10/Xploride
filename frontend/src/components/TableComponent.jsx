import { BiTrash } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";

const TableComponent = ({ headers, data, onEdit, onDelete }) => {
    
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-black shadow-md rounded-md">
        <thead>
          <tr className="bg-[#0C0C0C] text-white text-sm">
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-6 text-left">
                {header}
              </th>
            ))}
            
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b-1 border-gray-600 text-white">
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex} className="py-3 px-6">
                  {value}
                </td>
              ))}
              <td className="py-3 px-6">
                <button className="flex gap-2 cursor-pointer">
                  <div
                    className="flex justify-center items-center border-gray-700 border-1 h-6 w-6 rounded-[5px]"
                    onClick={() => onEdit(row.id, row.name)}
                  >
                    <CiEdit />
                  </div>

                  <div
                    className="flex justify-center items-center border-gray-700 border-1 h-6 w-6 rounded-[5px]"
                    onClick={() => onDelete(row.id)}
                  >
                    <BiTrash />
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
