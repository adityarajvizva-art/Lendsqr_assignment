import { Router } from "express";
import { WalletsController } from "../controllers/wallets.controller";
import { validate } from "../../../shared/middleware/validate";
import { withdrawWalletSchema } from "../dto/withdraw-wallet.schema";
import { fundWalletSchema } from "../dto/fund-wallet.schema";

const walletsRoutes = Router();

const walletsController = new WalletsController();

walletsRoutes.post(
    "/fund",
    validate(fundWalletSchema),
    walletsController.fund
);
walletsRoutes.post(
    "/withdraw",
    validate(withdrawWalletSchema),
    walletsController.withdraw
);

export { walletsRoutes };