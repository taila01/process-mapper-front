import { z } from "zod";
import { validateCPF } from "@/utils/zod";
import type { ValidationErrors } from "./types";
import { UserCreateData } from "@/services/interfaces/User/UserInterface";

const basicInfoSchema = z.object({
  firstname: z.string()
    .min(1, "Nome é obrigatório")
    .refine(val => val.trim().length > 0, {
      message: "Nome é obrigatório"
    }),
  lastname: z.string(a)
    .min(1, "Sobrenome é obrigatório")
    .refine(val => val.trim().length > 0, {
      message: "Sobrenome é obrigatório"
    }),
  email: z.string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  cpf: z.string()
    .min(1, "CPF é obrigatório")
    .transform(val => val.replace(/[^\d]/g, ''))
    .refine(val => validateCPF(val), {
      message: "CPF inválido"
    }),
  password: z.string()
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: z.string()
    .min(1, "Confirmação de senha é obrigatória")
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

export const validateStep = (step: number, data: UserCreateData) => {
  const errors: ValidationErrors = {};

  try {
    switch (step) {
      case 0:
        basicInfoSchema.parse(data);
        break;
      case 2:
        break;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        const path = err.path[0] as string;
        errors[path] = err.message;
      });
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};