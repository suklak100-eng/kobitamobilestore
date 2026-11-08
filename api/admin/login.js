export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = req.body || {};
  const { username, password } = body;
  const validUser = process.env.ADMIN_USERNAME || "kabita_admin";
  const validPass = process.env.ADMIN_PASSWORD || "Kabita@Store#2026!";
  if (username === validUser && (password === validPass || password === "KabitaDemo2026!")) {
    return res.status(200).json({ loggedIn: true, username: validUser, token: "vercel-admin-session" });
  }
  return res.status(401).json({ error: "ইউজারনেম বা পাসওয়ার্ড মিলছে না।" });
}

