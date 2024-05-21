import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/employee.context";
import toast from "react-hot-toast";

const Employees = () => {
  const navigate = useNavigate();
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [search, setSearch] = useState("");
  const [searchedEmployee, setSearchedEmployee] = useState([]);

  const handleCreate = () => {
    navigate("/create");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const responce = await axios.delete(`api/employee/delete/${id}`);
      toast.success(responce.data.message);
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setEmployees(updatedEmployees);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/employee/search`, {
        params: {
          query: search,
        },
      });
      if (response) {
        setSearchedEmployee(response.data.employees);
      } else {
        toast.error("Error while searching");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const formatDate = (dateString) => {
    const createdAtDate = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format the date in the desired format
    const formattedDate = `${createdAtDate.getDate()}-${
      monthNames[createdAtDate.getMonth()]
    }-${createdAtDate.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/employee/list");
        setEmployees(response?.data?.list);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-between">
        <div className="w-full bg-yellow-300 p-2">
          <h4>Employee List</h4>
        </div>
        <div className="flex justify-end ">
          <p className="mr-16 p-2">Total Count :- {employees.length}</p>
          <p
            className="bg-green-500 mr-28 p-2 w-[400px] cursor-pointer"
            onClick={() => handleCreate("create")}
          >
            createEmployee
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-blue-200">
        <div className="flex justify-end">
          <button className="mr-10" onClick={handleSearch}>
            Search
          </button>
          <input
            type="text"
            placeholder="Enter Search Keyword"
            className="border-black border-2 w-[500px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Unique Id</th>
                <th className="border border-gray-400 px-4 py-2">Image</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Mobile No</th>
                <th className="border border-gray-400 px-4 py-2">
                  Designation
                </th>
                <th className="border border-gray-400 px-4 py-2">Gender</th>
                <th className="border border-gray-400 px-4 py-2">Course</th>
                <th className="border border-gray-400 px-4 py-2">
                  Create date
                </th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {searchedEmployee && searchedEmployee.length > 0
                ? searchedEmployee?.map((item, i) => {
                    return (
                      <tr key={item._id} className="border border-gray-400">
                        <td className="border border-gray-400 px-4 py-2 text-end pr-10">
                          {i + 1}
                        </td>
                        <td className="border border-gray-400">
                          <img
                            src={item.img}
                            className="w-[60px] h-[60px] rounded-[50%] mx-auto my-1"
                            alt="logo"
                          />
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.name}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.email}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.mobile}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.designation}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.gender}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.course}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <div>
                            <button
                              className="m-2"
                              onClick={() => handleEdit(item._id)}
                            >
                              Edit
                            </button>
                            <button onClick={() => handleDelete(item._id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : employees?.map((item, i) => {
                    return (
                      <tr key={item._id} className="border border-gray-400">
                        <td className="border border-gray-400 px-4 py-2 text-end pr-10">
                          {i + 1}
                        </td>
                        <td className="border border-gray-400">
                          <img
                            src={item.img}
                            className="w-[60px] h-[60px] rounded-[50%] mx-auto my-1"
                            alt="logo"
                          />
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.name}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.email}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.mobile}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.designation}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.gender}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {item?.course}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <div>
                            <button
                              className="m-2"
                              onClick={() => handleEdit(item._id)}
                            >
                              Edit
                            </button>
                            <button onClick={() => handleDelete(item._id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
