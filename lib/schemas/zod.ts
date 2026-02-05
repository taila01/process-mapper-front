import { z } from "zod";

export const cpfSchema = z
    .string()
    .min(1, "Chave PIX é obrigatória")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => /^\d{11}$/.test(val), {
        message: "CPF inválido (deve conter 11 dígitos numéricos)",
    });

export const cnpjSchema = z
    .string()
    .min(1, "Chave PIX é obrigatória")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => /^\d{14}$/.test(val), {
        message: "CNPJ inválido (deve conter 14 dígitos numéricos)",
    });

export const emailSchema = z
    .string()
    .min(1, "Chave PIX é obrigatória")
    .trim()
    .email("Email inválido");

export const phoneSchema = z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => /^\d{11}$/.test(val), {
        message: "Telefone inválido (deve conter exatamente 11 dígitos, incluindo DDD)",
    });


export const randomKeySchema = z
    .string()
    .min(1, "Chave PIX é obrigatória")
    .trim()
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, ""))
    .refine((val) => /^[a-zA-Z0-9]{32,}$/.test(val), {
        message: "Chave aleatória inválida (mínimo 32 caracteres alfanuméricos)",
    });



export const pixInfoSchema = z.object({
    pixType: z.enum(["cpf", "cnpj", "email", "phone", "randomKey"], {
        errorMap: () => ({ message: "Tipo de chave PIX inválido" }),
    }),
    pixKey: z.string().min(1, "Chave PIX não pode estar vazia"),
}).superRefine((data, ctx) => {
    const typeSchemas = {
        cpf: cpfSchema,
        cnpj: cnpjSchema,
        email: emailSchema,
        phone: phoneSchema,
        randomKey: randomKeySchema,
    };

    const schema = typeSchemas[data.pixType];
    if (schema) {
        const result = schema.safeParse(data.pixKey);
        if (!result.success) {
            for (const issue of result.error.issues) {
                ctx.addIssue({
                    path: ["pixKey"],
                    message: issue.message,
                    code: z.ZodIssueCode.custom,
                });
            }
        }
    }
});
