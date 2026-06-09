import { v4 as uuidv4 } from "uuid";
import { FundWalletDto } from "../dto/fund-wallet.dto";
import { WalletsRepository } from "../repositories/wallets.repository";
import { TransferWalletDto } from "../dto/transfer-wallet.dto";
import { TransactionsRepository } from "../../transactions/repositories/transactions.repository";
import { AppError } from "../../../shared/errors/app-error";
import { db } from "../../../database/knex";
import { WithdrawWalletDto } from "../dto/withdraw-wallet.dto";

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

        const reference = `FUND-${uuidv4()}`;

        await db.transaction(async (trx) => {
            await this.walletsRepository.updateBalance(
                wallet.id,
                newBalance,
                trx
            );

            await this.transactionsRepository.create(
                {
                    id: uuidv4(),
                    wallet_id: wallet.id,
                    type: "FUND",
                    amount: data.amount,
                    reference,
                    status: "SUCCESS"
                },
                trx
            );
        });

        return {
            walletId: wallet.id,
            previousBalance: currentBalance,
            currentBalance: newBalance,
            amountFunded: data.amount,
            reference
        };
    }

    async withdraw(data: WithdrawWalletDto) {
        const wallet = await this.walletsRepository.findByUserId(data.userId);

        if (!wallet) {
            throw new AppError("Wallet not found", 404);
        }

        const currentBalance = Number(wallet.balance);

        if (currentBalance < data.amount) {
            throw new AppError("Insufficient wallet balance", 400);
        }

        const newBalance = currentBalance - data.amount;
        const reference = `WITHDRAWAL-${uuidv4()}`;

        await db.transaction(async (trx) => {
            await this.walletsRepository.updateBalance(
                wallet.id,
                newBalance,
                trx
            );

            await this.transactionsRepository.create(
                {
                    id: uuidv4(),
                    wallet_id: wallet.id,
                    type: "WITHDRAWAL",
                    amount: data.amount,
                    reference,
                    status: "SUCCESS"
                },
                trx
            );
        });

        return {
            walletId: wallet.id,
            previousBalance: currentBalance,
            currentBalance: newBalance,
            amountWithdrawn: data.amount,
            reference
        };
    }

    async transfer(data: TransferWalletDto) {
        if (data.senderUserId === data.recipientUserId) {
            throw new AppError("Cannot transfer funds to the same user", 400);
        }

        const senderWallet = await this.walletsRepository.findByUserId(
            data.senderUserId
        );

        if (!senderWallet) {
            throw new AppError("Sender wallet not found", 404);
        }

        const recipientWallet = await this.walletsRepository.findByUserId(
            data.recipientUserId
        );

        if (!recipientWallet) {
            throw new AppError("Recipient wallet not found", 404);
        }

        const senderCurrentBalance = Number(senderWallet.balance);
        const recipientCurrentBalance = Number(recipientWallet.balance);

        if (senderCurrentBalance < data.amount) {
            throw new AppError("Insufficient wallet balance", 400);
        }

        const senderNewBalance = senderCurrentBalance - data.amount;
        const recipientNewBalance = recipientCurrentBalance + data.amount;

        const reference = `TRANSFER-${uuidv4()}`;

        await db.transaction(async (trx) => {
            await this.walletsRepository.updateBalance(
                senderWallet.id,
                senderNewBalance,
                trx
            );

            await this.walletsRepository.updateBalance(
                recipientWallet.id,
                recipientNewBalance,
                trx
            );

            await this.transactionsRepository.create(
                {
                    id: uuidv4(),
                    wallet_id: senderWallet.id,
                    type: "TRANSFER_OUT",
                    amount: data.amount,
                    reference: `${reference}-OUT`,
                    status: "SUCCESS"
                },
                trx
            );

            await this.transactionsRepository.create(
                {
                    id: uuidv4(),
                    wallet_id: recipientWallet.id,
                    type: "TRANSFER_IN",
                    amount: data.amount,
                    reference: `${reference}-IN`,
                    status: "SUCCESS"
                },
                trx
            );
        });

        return {
            reference,
            amount: data.amount,
            sender: {
                walletId: senderWallet.id,
                previousBalance: senderCurrentBalance,
                currentBalance: senderNewBalance
            },
            recipient: {
                walletId: recipientWallet.id,
                previousBalance: recipientCurrentBalance,
                currentBalance: recipientNewBalance
            }
        };
    }

}