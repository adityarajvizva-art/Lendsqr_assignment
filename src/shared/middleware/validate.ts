import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../errors/app-error";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, _res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                const message =
                    result.error.issues[0]?.message || "Validation failed";
                return next(new AppError(message, 400));
            }

            req.body = result.data;

            next();
        };