import { db } from "../../../database/knex";

export class TransactionsRepository {
    async create(transaction: any) {
        await db("transactions").insert(transaction);
    }
}