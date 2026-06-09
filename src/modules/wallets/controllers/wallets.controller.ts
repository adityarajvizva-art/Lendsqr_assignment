import { NextFunction, Request, Response } from "express";
import { WalletsService } from "../services/wallets.service";

export class WalletsController {
    private walletsService: WalletsService;

    constructor() {
        this.walletsService = new WalletsService();
    }

    fund = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.walletsService.fund(req.body);

            return res.status(200).json({
                status: "success",
                message: "Wallet funded successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    };
}