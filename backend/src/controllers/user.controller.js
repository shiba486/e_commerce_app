
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone,address,isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, "User already registered", 409);
    }

    const user = await User.create({ name, email, password, phone,address,isAdmin });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || false,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Dynamic message based on role (Optional)
    const message = "user created successfully"
    return ApiResponse.success(
      res,
      message,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        isAdmin:user.isAdmin
      },
      201
    );
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Registration failed", 500);
  }
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return ApiResponse.error(res, "User not found", 404);
    }

    // Check if the password matches
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return ApiResponse.error(res, "Invalid credentials", 401);
    }

    // Generate JWT tokens
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return success response
    return ApiResponse.success(
      res,
      "Login successful",
      {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        isAdmin:user.isAdmin     
      },
      200
    );
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};

//logout suer
export const logoutUser = (req, res) => {
  try {
    // Clear cookies
    res.clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

    // Send success response
    return ApiResponse.success(res, "Logout successful", {}, 200);
  } catch (error) {
    console.error(error);
    return ApiResponse.error(res, "Internal Server Error", 500);
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Delete a user (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    next(error);
  }
};
