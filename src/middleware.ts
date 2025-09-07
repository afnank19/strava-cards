import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/activities/:path*"], // only runs on "/"
};


export async function middleware(req: NextRequest) {
  console.log("middleware running");

  const { pathname } = req.nextUrl;

  // Skip middleware on login & auth endpoints
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("strava_token");
  const refreshToken = req.cookies.get("refresh_token");

  if (accessToken == undefined && refreshToken == undefined) {
    console.log("no refresh or access");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (refreshToken && !accessToken) {
    console.log("only refresh");
    const res = NextResponse.next();

    const qs = new URLSearchParams({
        client_id: process.env.CLIENT_ID ?? "",
        client_secret: process.env.CLIENT_SECRET ?? "", // MUST be server env var
        refresh_token: `${refreshToken.value}`,
        grant_type: "refresh_token",
    });

    const tokenResp = await fetch(`https://www.strava.com/api/v3/oauth/token?${qs}`, {
        method: "POST",
        cache: "no-store",
    });

    const tokens = await tokenResp.json();
    console.log("got new tokens", tokens)

        // Access token cookie
    res.cookies.set("strava_token", tokens.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 30
    });

    // Refresh token cookie (longer lived)
    res.cookies.set("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days for example
    });

    return res;
  }

  return NextResponse.next();
}
