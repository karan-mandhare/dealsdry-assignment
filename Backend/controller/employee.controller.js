import fs from "fs";
import { Employee } from "../model/employee.modules.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  if (!name || !email || !mobile || !designation || !gender || !course) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check if files are attached to the request
  if (!req.files || !req.files.img || req.files.img.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Image file is required",
    });
  }

  const validFormats = ["image/jpeg", "image/png"];
  if (!validFormats.includes(req.files?.img[0]?.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Only JPG and PNG images are allowed",
    });
  }

  const existedEmployee = await Employee.findOne({ name, email, mobile });

  if (existedEmployee) {
    if (
      existedEmployee.user_info &&
      existedEmployee.user_info.name === req.user?.name
    ) {
      return res.status(300).json({
        success: false,
        message: "Employee with the same email and mobile already exists",
      });
    }
  }

  const img_local_path = req.files?.img[0]?.path;
  if (!img_local_path) {
    return res.status(300).json({
      success: false,
      message: "Image is required",
    });
  }

  const profile = await uploadOnCloudinary(img_local_path);
  if (!profile.url) {
    return res.status(300).json({
      success: false,
      message: "Error while uploading image",
    });
  }

  const user_info = {
    name: req.user?.name,
  };
  

  try {
    const employee = await Employee.create({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      user_info,
      img: profile.url,
    });

    if (!employee) {
      return res.status(409).json({
        success: false,
        message: "Error while creating employee",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      createdEmployee: employee,
    });
  } catch (error) {
    // Check if the error is a duplicate key error
    if (error.code === 11000 && error.keyPattern.email === 1) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }
    // If it's not a duplicate key error, handle it accordingly
    return res.status(500).json({
      success: false,
      message: "Error while creating employee",
      error: error.message,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const user_name = req.user?.name;
    const employee_list = await Employee.find({});
    const created_by_user = employee_list?.filter((item) => {
      return user_name === item.user_info.name;
    });
    res.status(200).json({
      success: true,
      list: created_by_user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;

    if (!name || !email || !mobile || !designation || !gender || !course) {
      return res.status(400).json({
        // Changed status code to 400 for bad request
        success: false,
        message: "All fields are required",
      });
    }

    // Check if files are attached to the request
    if (!req.files || !req.files.img || req.files.img.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const img_local_path = req.files?.img[0]?.path;
    if (!img_local_path) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const validFormats = ["image/jpeg", "image/png"];
    if (!validFormats.includes(req.files?.img[0]?.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPG and PNG images are allowed",
      });
    }

    const profile = await uploadOnCloudinary(img_local_path);
    if (!profile.url) {
      return res.status(500).json({
        success: false,
        message: "Error while uploading image",
      });
    }

    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name,
          email: email,
          mobile: mobile,
          designation: designation,
          gender: gender,
          course: course,
          img: profile.url,
        },
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      // Corrected the status code to 200 for successful update
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting employee:", err);
    return res.status(500).json({
      success: false,
      message: "Error while deleting employee",
    });
  }
};

const getCurrentEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ _id: id });
    if (!employee) {
      return res.status(409).json({
        success: false,
        message: "Error while getting employee",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const searchEmployee = async (req, res) => {
  try {
    const query = req.query.query;
    console.log("query", query);

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'query' is missing.",
      });
    }

    const employees = await Employee.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { designation: { $regex: query, $options: "i" } },
      ],
    });

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found matching the search query.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employees found successfully.",
      employees: employees,
    });
  } catch (error) {
    console.error("Error searching employees:", error);
    res.status(500).json({
      success: false,
      message: "Error searching employees",
    });
  }
};

export {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getCurrentEmployee,
  searchEmployee,
};
