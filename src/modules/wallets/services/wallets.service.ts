import { v4 as uuidv4 } from "uuid";
import { FundWalletDto } from "../dto/fund-wallet.dto";
import { WalletsRepository } from "../repositories/wallets.repository";
import { TransactionsRepository } from "../../transactions/repositories/transactions.repository";
import { AppError } from "../../../shared/errors/app-error";

export class WalletsService {
    private walletsRepository: WalletsRepository;
    private transactionsRepository: TransactionsRepository;

    constructor() {
        this.walletsRepository = new WalletsRepository();
        this.transactionsRepository = new TransactionsRepository();
    }

    async fund(data: FundWalletDto) {
        const wallet = await this.walletsRepository.findByUserId(data.userId);

        if (!wallet) {
            throw new AppError("Wallet not found", 404);
        }

        const currentBalance = Number(wallet.balance);
        const newBalance = currentBalance + data.amount;

        await this.walletsRepository.updateBalance(wallet.id, newBalance);

        const reference = `FUND-${uuidv4()}`;

        await this.transactionsRepository.create({
            id: uuidv4(),
            wallet_id: wallet.id,
            type: "FUND",
            amount: data.amount,
            reference,
            status: "SUCCESS"
        });

        return {
            walletId: wallet.id,
            previousBalance: currentBalance,
            currentBalance: newBalance,
            amountFunded: data.amount,
            reference
        };
    }
}