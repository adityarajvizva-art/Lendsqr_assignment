import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
}