// app/lib/auth.ts
import "server-only";
import { cookies } from "next/headers";

export async function setCookiesOnServer(accessToken: string, refreshToken: string, expiresAtSeconds: number) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "strava_token",
    value: accessToken,
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 30
  });

  cookieStore.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7
  });
}
