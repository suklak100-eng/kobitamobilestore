export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ loggedIn: false, username: "kabita_admin" });
}
