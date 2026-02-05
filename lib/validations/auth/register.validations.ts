import { z } from "zod";

export const RegisterRequest = z.object({
    email: z.coerce
        .string()
        .email()
        .min(1),
    password: z.coerce
        .string()
        .min(1),
    token: z.coerce
        .string()
        .min(1),
    personalIdentifier: z.coerce
        .string()
        .min(1)
});
