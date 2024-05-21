import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getCurrentEmployee,
  searchEmployee,
  updateEmployee,
} from "../controller/employee.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.post(
  "/create",
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  createEmployee
);
router.get("/list", verifyJWT, getAllEmployees);
router.put(
  "/edit/:id",
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  updateEmployee
);
router.delete("/delete/:id", verifyJWT, deleteEmployee);
router.get("/employee/:id", verifyJWT, getCurrentEmployee);
router.get("/search", verifyJWT, searchEmployee);

export default router;
