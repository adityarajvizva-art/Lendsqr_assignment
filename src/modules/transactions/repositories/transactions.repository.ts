import { Knex } from "knex";
import { db } from "../../../database/knex";

export class TransactionsRepository {
    async create(transaction: any, trx?: Knex.Transaction) {
        const query = trx || db;

        await query("transactions").insert(transaction);
    }
}