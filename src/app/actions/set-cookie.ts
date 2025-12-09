// I actually hate NEXT JS. Holy this is now how it was supposed to be
'use server'

import { cookies } from "next/headers";


export async function setAthleteIdCookie(athleteId: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "athlete_id",
    value: athleteId,
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7
  });

}