import { db } from "../../../database/knex";

export class WalletsRepository {
    async create(wallet: any) {
        await db("wallets").insert(wallet);
    }

    async updateBalance(walletId: string, balance: number) {
        await db("wallets")
            .where({ id: walletId })
            .update({ balance });
    }

    async findByUserId(userId: string) {
        return db("wallets")
            .where({ user_id: userId })
            .first();
    }
}