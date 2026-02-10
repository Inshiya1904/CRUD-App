"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global error handler
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || "Server Error",
    });
};
exports.default = errorHandler;
