import axios from "@/lib/axiosInstance";
import { LoginRequest } from "@/lib/validations/auth/login.validations";
import { RegisterRequest } from "@/lib/validations/auth/register.validations";
import { z } from "zod";
import { Guard } from "@/services/interfaces/Api/ApiInterface";
import { Authenticable } from "@/services/interfaces/Authenticable/AuthenticableInterface";
export const getCsrfToken = async () => {
  await axios.get("/sanctum/csrf-cookie");
};

export const login = async (
  data: z.infer<typeof LoginRequest>,
  guard: Guard
): Promise<Authenticable> => {
  await getCsrfToken(); // Get the CSRF token and store it in the cookies
  const response = await axios.post(
    `/${guard}/login`,
    data
  );
  return response.data;
};

export const register = async (
  data: z.infer<typeof RegisterRequest>,
  guard: Guard
): Promise<Authenticable> => {
  await getCsrfToken();
  const response = await axios.post(
    `/${guard}/register`,
    data
  );

  return response.data;
};

export const logout = async (guard: Guard) => {
  await getCsrfToken();
  await axios.post(`/${guard}/logout`);
};

export const fetchUser = async (guard: Guard) => {
  const response = await fetch(`/api/${guard}/auth/user`, { cache: "no-store" });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch user");
  }
};
