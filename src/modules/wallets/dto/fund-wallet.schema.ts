import { z } from "zod";

export const fundWalletSchema = z.object({
    userId: z.string().uuid("Invalid user ID"),
    amount: z.number().positive("Amount must be greater than zero")
});