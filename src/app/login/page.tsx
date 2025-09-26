import { JBMono } from "@/fonts";

export default async function LoginPage() {
  const clientId = process.env.CLIENT_ID; // safe to expose
  const redirectUri = process.env.MODE == "development" ? "http://localhost:3000/callback" : "https://strava-cards.vercel.app/callback";

  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=read,activity:read_all`;

  return (
    <div className={`p-6 w-full h-dvh flex flex-col items-center justify-center ${JBMono.className}`}>
      <h1 className="text-xl font-bold py-2">AUTHENTICATE</h1>
      <a
        href={authUrl}
        className=""
      >
        <img src="/strava-login-button.svg" className="hover:drop-shadow-lg"/>
      </a>
    </div>
  );
}
