import mongoose, { Schema } from "mongoose";

const employeeSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      enum: ["HR", "Manager", "sales"],
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      default: "M",
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      default: "BSC",
    },
    img: {
      type: String,
    },
    user_info: {
      type: {
        name: String,
      },
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
