import { UsersService } from "../../modules/users/services/users.service";

describe("UsersService", () => {
    let usersService: UsersService;

    beforeEach(() => {
        usersService = new UsersService();
    });

    it("should create a user", async () => {
        const user = await usersService.create({
            firstName: "Test",
            lastName: "User",
            email: `test${Date.now()}@mail.com`,
            phone: `080${Date.now()}`
        });

        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("wallet");
    });

    it("should reject duplicate email", async () => {
        const email = `duplicate${Date.now()}@mail.com`;

        await usersService.create({
            firstName: "John",
            lastName: "Doe",
            email,
            phone: `081${Date.now()}`
        });

        await expect(
            usersService.create({
                firstName: "Jane",
                lastName: "Doe",
                email,
                phone: `082${Date.now()}`
            })
        ).rejects.toThrow("Email already exists");
    });
});