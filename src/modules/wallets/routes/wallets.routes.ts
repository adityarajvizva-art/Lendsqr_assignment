import { Router } from "express";
import { WalletsController } from "../controllers/wallets.controller";
import { validate } from "../../../shared/middleware/validate";
import { fundWalletSchema } from "../dto/fund-wallet.schema";

const walletsRoutes = Router();

const walletsController = new WalletsController();

walletsRoutes.post(
    "/fund",
    validate(fundWalletSchema),
    walletsController.fund
);

export { walletsRoutes };