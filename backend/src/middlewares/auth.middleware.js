// middlewares/auth.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Protect routes (only logged-in users)
export const Authenticated = asyncHandler( async (req, res, next) => {
  let token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
   
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id).select("-password")
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}
);

// Admin-only access
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};


