import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transactions", (table) => {
        table.uuid("id").primary();

        table
            .uuid("wallet_id")
            .notNullable()
            .references("id")
            .inTable("wallets")
            .onDelete("CASCADE");

        table
            .enu("type", [
                "FUND",
                "TRANSFER_IN",
                "TRANSFER_OUT",
                "WITHDRAWAL",
            ])
            .notNullable();

        table.decimal("amount", 18, 2).notNullable();

        table.string("reference").notNullable().unique();

        table
            .enu("status", ["PENDING", "SUCCESS", "FAILED"])
            .notNullable()
            .defaultTo("SUCCESS");

        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("transactions");
}