export default async function LoginPage() {
  const clientId = process.env.CLIENT_ID; // safe to expose
  const redirectUri = "http://localhost:3000/callback";

  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=read,activity:read_all`;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Login with Strava</h1>
      <a
        href={authUrl}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg"
      >
        Connect Strava
      </a>
    </div>
  );
}
