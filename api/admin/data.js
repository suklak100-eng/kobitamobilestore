import { readFile } from "node:fs/promises";
import path from "node:path";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const data = await readFile(path.join(process.cwd(), "data", "site-content.json"), "utf8");
    res.status(200).json(JSON.parse(data));
  } catch {
    res.status(500).json({ error: "Could not read site data" });
  }
}

