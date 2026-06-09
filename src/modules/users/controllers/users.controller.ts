import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    create = async (req: Request, res: Response) => {
        const user = await this.usersService.create(req.body);

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user
        });
    };
}