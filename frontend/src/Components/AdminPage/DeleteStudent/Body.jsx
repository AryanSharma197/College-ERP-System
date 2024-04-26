import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Body = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch("http://localhost:8000/admin/getallstudent");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaculty();
    console.log(data);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 7;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/admin/deletestudent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = data.filter((item) => item._id !== id);
      setData(newData);
      alert("Student Deleted Successfully");
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <DeleteIcon />
          <h1>All Students</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Roll No</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">DOB</th>
                <th className="border border-gray-400 px-4 py-2">Gender</th>
                <th className="border border-gray-400 px-4 py-2">Phone No.</th>
                <th className="border border-gray-400 px-4 py-2">Department</th>
                <th className="border border-gray-400 px-4 py-2">Semester</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border border-gray-400 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.rollNo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.dob}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.gender}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.phone}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.department}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.semester}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onDelete(item._id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > entriesPerPage && (
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNextPage}
                disabled={indexOfLastEntry >= data.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
