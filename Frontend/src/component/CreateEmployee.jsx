import axios from "axios";
import Header from "./Header";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("designation", formData.designation);
    form.append("gender", formData.gender);
    form.append("course", formData.course);
    form.append("img", formData.img);

    try {
      const response = await axios.post("/api/employee/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        toast.success(response.data.message);
        navigate("/list");
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-yellow-300 p-2">
        <h4>Create Employee</h4>
      </div>
      <div className="flex justify-center items-center h-screen">
        <form
          className="w-1/2 p-8 bg-gray-200 rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-bold mb-2"
            >
              Mobile No
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="designation"
              className="block text-gray-700 font-bold mb-2"
            >
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">HR/Manager/Sales</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-bold mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Male/Female</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="course"
              className="block text-gray-700 font-bold mb-2"
            >
              Course
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">MCA/BCA/BSC</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSC">BSC</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
