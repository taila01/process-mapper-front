export type ValidationErrors = Record<string, string>;

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

export const UserFormField = {
  firstname: "",
  lastname: "",
  cpf: "",
  phoneBranch: "",
  email: "",
  password: "",
  confirmPassword: "",
  chatwoot_token:"",
}
