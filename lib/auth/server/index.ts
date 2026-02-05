import { AUTH_COOKIE_NAME, EXPIRED_SESSION_PARAM, LOGIN_ROUTE } from "@/constants";
import { Authenticable } from "@/services/interfaces/Authenticable/AuthenticableInterface";
import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createUserToken, verifyUserToken } from "../jwt";
import { Guard } from "@/services/interfaces/Api/ApiInterface";

// const isSecureCookie = process.env.NODE_ENV != "development";
const isSecureCookie = false;


export const generateJWTCookie = async (user: Authenticable, guard: Guard) => {
  const token = await createUserToken({ data: { ...user, guard } });

  return serialize(`${AUTH_COOKIE_NAME}_${guard}`, token, {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}

export const expireCookie = (cookieKey: string, isSecure: boolean = isSecureCookie) => {
  const secureAttribute = isSecure ? "Secure;" : "";
  return `${cookieKey}=; HttpOnly; ${secureAttribute} SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const redirectToLoginWithExpiredCookie = (url: URL, guard: Guard) => {
  const returnTo = `${url.pathname}${url.search}${url.hash}` || "/";

  const loginUrl = new URL(url.toString());
  loginUrl.pathname = `/${guard}/${LOGIN_ROUTE}`;
  loginUrl.searchParams.delete(EXPIRED_SESSION_PARAM);

  if (!loginUrl.searchParams.has("redirect_url")) {
    const isSelfLogin =
      returnTo === loginUrl.pathname ||
      returnTo.startsWith(`${loginUrl.pathname}?`);

    if (!isSelfLogin) {
      const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/";
      loginUrl.searchParams.set("redirect_url", safeReturnTo);
    }
  }

  const response = NextResponse.redirect(loginUrl);
  
  response.headers.append(
    "Set-Cookie",
    expireCookie(`${AUTH_COOKIE_NAME}_${guard}`)
  );

  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
};

const fetchUser = async (guard: Guard, req?: NextRequest) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const referer = process.env.FRONTEND_URL as string; // * Important so it matches Sanctum's accepted domains
  const cookie = req?.headers.get("Cookie") || cookies().toString() || "";

  const fetchResponse = await fetch(`${backendUrl}/${guard}/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: referer, // * Important so it matches Sanctum's accepted domains
      Cookie: cookie, // * Important so the cookies of the session are sent with the request
    },
    cache: "no-store",
  });

  if (!fetchResponse.ok) {
    // If the response is not ok, throw an error
    const error = new Error(`HTTP error! status: ${fetchResponse.status}`);
    // Add response data if it exists
    (error as any).response = {
      status: fetchResponse.status,
      data: await fetchResponse.json(),
    };
    throw error;
  }

  return fetchResponse;
};

export const getRenewedCookies = async (guard: Guard, req?: NextRequest) => {
  try {
    const fetchUserResponse = await fetchUser(guard, req);
    const user = await fetchUserResponse.json();

    const cookies = fetchUserResponse.headers.get("Set-Cookie") as string;
    const csrfTokenCookie = cookies
      .trim()
      .split(";")
      .find((cookie: string) => cookie.startsWith("XSRF-TOKEN")) as string;
    const authUserCookie = await generateJWTCookie(user, guard);

    return {
      cookies,
      csrfTokenCookie,
      authUserCookie
    };
  } catch (error) {
    console.error("Get Renewed Cookies Error:", error);
    return {
      cookies: "",
      csrfTokenCookie: "",
      authUserCookie: ""
    };
  }
}

export const auth = async (guard: Guard) => {
  try {
    const token = (await cookies()).get(`${AUTH_COOKIE_NAME}_${guard}`)?.value; // Pegando o token do guard específico

    if (!token) {
      return { user: null };
    }

    const user = await verifyUserToken(token);

    return { user };
  } catch (error) {
    console.error("Auth Error:", error);
    return { user: null };
  }
};
