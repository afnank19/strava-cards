// app/callback/route.ts although it should be in the api folder
import { NextResponse } from "next/server";
import { setCookiesOnServer } from "../actions/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/login", req.url));

  const qs = new URLSearchParams({
    client_id: process.env.CLIENT_ID ?? "",
    client_secret: process.env.CLIENT_SECRET ?? "",
    code,
    grant_type: "authorization_code",
  });

  const tokenResp = await fetch(`https://www.strava.com/oauth/token?${qs}`, {
    method: "POST",
    cache: "no-store",
  });

  if (!tokenResp.ok) {
    console.error("token exchange failed", await tokenResp.text());
    return NextResponse.redirect(new URL("/login?error=exchange_failed", req.url));
  }

  const tokens = await tokenResp.json();

  console.log(tokens)

  console.log("[+][+]", tokens.athlete)

  //   const athleteResponse = await fetch(
  //   `https://www.strava.com/api/v3/athlete`,
  //   {
  //     headers: {
  //       Authorization: "Bearer " + tokensaccessToken?.value,
  //     },
  //   }
  // );

  // const athleteData = await athleteResponse.json()
  // console.log("Athlete Data:", athleteData)

  // tokens.expires_at is epoch seconds in Strava's response
  // params getting too many, prolly should redo if another is needed
  await setCookiesOnServer(tokens.access_token, tokens.refresh_token, tokens.expires_at, tokens.athlete.id);

  return NextResponse.redirect(new URL("/", req.url));
}
