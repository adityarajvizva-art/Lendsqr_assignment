import { WalletsService } from "../../modules/wallets/services/wallets.service";

describe("WalletsService", () => {
    let walletsService: WalletsService;

    beforeEach(() => {
        walletsService = new WalletsService();
    });

    it("should reject funding unknown wallet", async () => {
        await expect(
            walletsService.fund({
                userId: "11111111-1111-1111-1111-111111111111",
                amount: 1000
            })
        ).rejects.toThrow("Wallet not found");
    });

    it("should reject withdrawal from unknown wallet", async () => {
        await expect(
            walletsService.withdraw({
                userId: "11111111-1111-1111-1111-111111111111",
                amount: 100
            })
        ).rejects.toThrow("Wallet not found");
    });
});