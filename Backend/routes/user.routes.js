import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  logOutUser,
  loginUser,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";

const router = Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logOutUser);
router.get("/user",verifyJWT, getCurrentUser);

export default router;
