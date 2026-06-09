import { Knex } from "knex";
import { db } from "../../../database/knex";

export class WalletsRepository {
    async create(wallet: any, trx?: Knex.Transaction) {
        const query = trx || db;

        await query("wallets").insert(wallet);
    }

    async findByUserId(userId: string, trx?: Knex.Transaction) {
        const query = trx || db;

        return query("wallets")
            .where({ user_id: userId })
            .first();
    }

    async updateBalance(
        walletId: string,
        balance: number,
        trx?: Knex.Transaction
    ) {
        const query = trx || db;

        await query("wallets")
            .where({ id: walletId })
            .update({ balance });
    }
}