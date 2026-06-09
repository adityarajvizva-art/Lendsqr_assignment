import { z } from "zod";

export const transferWalletSchema = z.object({
    senderUserId: z.string().uuid("Invalid sender user ID"),
    recipientUserId: z.string().uuid("Invalid recipient user ID"),
    amount: z.number().positive("Amount must be greater than zero")
});