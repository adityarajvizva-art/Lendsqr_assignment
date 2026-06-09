import { z } from "zod";

export const withdrawWalletSchema = z.object({
    userId: z.string().uuid(),
    amount: z.number().positive()
});