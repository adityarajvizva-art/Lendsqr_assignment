import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { validate } from "../../../shared/middleware/validate";
import { createUserSchema } from "../dto/create-user.schema";

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post(
    "/",
    validate(createUserSchema),
    usersController.create
);

export { usersRoutes };