import { Router } from "express";
import { WalletsController } from "../controllers/wallets.controller";
import { validate } from "../../../shared/middleware/validate";
import { withdrawWalletSchema } from "../dto/withdraw-wallet.schema";
import { fundWalletSchema } from "../dto/fund-wallet.schema";
import { transferWalletSchema } from "../dto/transfer-wallet.schema";
import { auth } from "../../../shared/middleware/auth";

const walletsRoutes = Router();

const walletsController = new WalletsController();

walletsRoutes.post(
    "/fund",
    auth,
    validate(fundWalletSchema),
    walletsController.fund
);

walletsRoutes.post(
    "/withdraw",
    auth,
    validate(withdrawWalletSchema),
    walletsController.withdraw
);

walletsRoutes.post(
    "/transfer",
    auth,
    validate(transferWalletSchema),
    walletsController.transfer
);

export { walletsRoutes };