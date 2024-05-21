import jwt from "jsonwebtoken";
import { User } from "../model/user.modules.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers("Authorization");
    if (!token) {
      return res.status(403).json({ error: "Token is missing" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Access Token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
