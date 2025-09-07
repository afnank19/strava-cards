// this file is currently not being used and is dead code

import { NextResponse } from "next/server";
import { setCookiesOnServer } from "../../actions/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token");
  console.log("refreshing attempt", refreshToken);

  if (refreshToken == undefined) {
    return NextResponse.json({ success: false });
  }

  const qs = new URLSearchParams({
    client_id: process.env.CLIENT_ID ?? "",
    client_secret: process.env.CLIENT_SECRET ?? "",
    refresh_token: `${refreshToken.value}`,
    grant_type: "refresh_token",
  });

  const tokenResp = await fetch(`https://www.strava.com/api/v3/oauth/token?${qs}`, {
    method: "POST",
    cache: "no-store",
  });

  if (!tokenResp.ok) {
    console.error("token exchange failed", await tokenResp.text());
    return NextResponse.redirect(
      new URL("/login?error=exchange_failed", req.url)
    );
  }

  const tokens = await tokenResp.json();

  console.log("new tokens fetched", tokens);
  // tokens.expires_at is epoch seconds in Strava's response
  // await setCookiesOnServer(
  //   tokens.access_token,
  //   tokens.refresh_token,
  //   tokens.expires_at
  // );

  const res = NextResponse.json({ success: true });

  // Access token cookie
  res.cookies.set("access_token", tokens.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: tokens.expires_in, // Strava gives this in seconds
  });

  // Refresh token cookie (longer lived)
  res.cookies.set("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days for example
  });

  return res
}
