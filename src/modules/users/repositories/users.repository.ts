import { db } from "../../../database/knex";

export class UsersRepository {
    async create(user: any) {
        await db("users").insert(user);
    }

    async findByEmail(email: string) {
        return db("users")
            .where({ email })
            .first();
    }

    async findByPhone(phone: string) {
        return db("users")
            .where({ phone })
            .first();
    }

    async findById(id: string) {
        return db("users")
            .where({ id })
            .first();
    }
}