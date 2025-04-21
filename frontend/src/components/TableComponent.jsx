import { BiTrash } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { ToastContainer } from "react-toastify";

const TableComponent = ({ headers, data, onEdit, onDelete, type }) => {
  return (
    <>
      <ToastContainer />
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
              <tr key={rowIndex} className="border-b border-gray-600 text-white">
                {Object.keys(row).map((key, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-3 px-6 ${
                      key === "description" || key === "bikeName"
                        ? "max-w-[200px] truncate"
                        : ""
                    }`}
                    title={key === "description" || key === "bikeName" ? row[key] : ""}
                  >
                    {key === "image" ? (
                      type === "tour" ? (
                        <div className="flex gap-2 flex-wrap">
                          {Array.isArray(row[key]) && row[key].length > 0 ? (
                            row[key].map((imgObj, index) => (
                              <img
                                key={index}
                                src={imgObj.image_url}
                                alt={`Tour Image ${index + 1}`}
                                className="w-18 h-14 object-cover rounded"
                              />
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">No image</span>
                          )}
                        </div>
                      ) : (
                        <img
                          src={row[key]}
                          alt="Image"
                          className="w-18 h-14 object-cover rounded"
                        />
                      )
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}

                <td className="py-3 px-6 flex gap-2">
                  <div
                    className="flex justify-center items-center border border-gray-700 h-6 w-6 rounded-[5px] cursor-pointer"
                    onClick={() => onEdit(row.id, row.name)}
                  >
                    <CiEdit />
                  </div>
                  <div
                    className="flex justify-center items-center border border-gray-700 h-6 w-6 rounded-[5px] cursor-pointer"
                    onClick={() => onDelete(row.id)}
                  >
                    <BiTrash />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponent;
