import { Request, Response, NextFunction } from "express";
import User from "../models/User";

// ==============================
// GET ALL USERS
// ==============================
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// CREATE USER
// ==============================
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, phone, email } = req.body;

    // Basic validation
    if (!firstName || !lastName || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check duplicate email
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// UPDATE USER
// ==============================
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// DELETE USER
// ==============================
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
