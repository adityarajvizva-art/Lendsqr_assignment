import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export function auth(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Authorization token is required", 401);
    }

    const token = authHeader.split(" ")[1];

    if (token !== "demo-token") {
        throw new AppError("Invalid authorization token", 401);
    }

    next();
}