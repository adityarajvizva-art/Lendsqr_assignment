import { db } from "../../../database/knex";

export class WalletsRepository {
    async create(wallet: any) {
        await db("wallets").insert(wallet);
    }

    async findByUserId(userId: string) {
        return db("wallets")
            .where({ user_id: userId })
            .first();
    }
}