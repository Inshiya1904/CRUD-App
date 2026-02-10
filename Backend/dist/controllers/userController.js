"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
// ==============================
// GET ALL USERS
// ==============================
const getUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
// ==============================
// CREATE USER
// ==============================
const createUser = async (req, res, next) => {
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
        const exists = await User_1.default.findOne({ email });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }
        const user = await User_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
// ==============================
// UPDATE USER
// ==============================
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
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
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
// ==============================
// DELETE USER
// ==============================
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndDelete(id);
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
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
