import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { copyFile, mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { applyEditableContent, currentEditableContent } from "../src/data/site.mjs";
import { buildSite } from "./build.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const outputRoot = path.join(projectRoot, "dist");
const contentRoot = path.join(projectRoot, "data");
const contentFile = path.join(contentRoot, "site-content.json");

async function loadLocalEnv() {
  try {
    const lines = (await readFile(path.join(projectRoot, ".env"), "utf8")).split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || process.env[match[1]] !== undefined) continue;
      const value = match[2].replace(/^(["'])(.*)\1$/, "$2").replace(/\s+#.*$/, "");
      process.env[match[1]] = value;
    }
  } catch {}
}

async function updateEnvFile(updates) {
  const envPath = path.join(projectRoot, ".env");
  let content = "";
  try {
    content = await readFile(envPath, "utf8");
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  let lines = content ? content.split(/\r?\n/) : [];
  const updatedKeys = new Set();
  lines = lines.map((line) => {
    const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=/);
    if (match && updates[match[1]] !== undefined) {
      updatedKeys.add(match[1]);
      return `${match[1]}=${updates[match[1]]}`;
    }
    return line;
  });
  for (const [key, value] of Object.entries(updates)) {
    if (!updatedKeys.has(key)) {
      lines.push(`${key}=${value}`);
    }
  }
  if (!lines.some((l) => l.startsWith("SESSION_SECRET="))) {
    lines.push(`SESSION_SECRET=${process.env.SESSION_SECRET || randomBytes(32).toString("hex")}`);
  }
  const newContent = lines.filter((line, i, arr) => i < arr.length - 1 || line.trim() !== "").join("\n") + "\n";
  const tempPath = path.join(projectRoot, `.env.${Date.now()}.tmp`);
  await writeFile(tempPath, newContent, "utf8");
  await rename(tempPath, envPath);
}

await loadLocalEnv();

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);
const loopbackHost = ["127.0.0.1", "localhost", "::1"].includes(host);
const production = process.env.NODE_ENV === "production";
const demoUsername = "admin";
const demoPassword = "KabitaDemo2026!";
let adminUsername = process.env.ADMIN_USERNAME || (loopbackHost && !production ? demoUsername : "");
let adminPassword = process.env.ADMIN_PASSWORD || (loopbackHost && !production ? demoPassword : "");
let sessionSecret = process.env.SESSION_SECRET || (loopbackHost && !production ? createHash("sha256").update(`${projectRoot}:local-demo-session`).digest("hex") : "");
if (!adminUsername || !adminPassword || !sessionSecret || (production && (adminPassword.length < 16 || sessionSecret.length < 32))) {
  throw new Error("Admin security is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD (16+ chars), and SESSION_SECRET (32+ chars) in the server environment before starting.");
}

const types = {
  ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2", ".xml": "application/xml; charset=utf-8",
};
const sessions = new Map();
const loginAttempts = new Map();
const sessionLifetimeSeconds = 365 * 24 * 60 * 60; // 1 year persistent session

function createSignedToken(username) {
  const expires = Date.now() + sessionLifetimeSeconds * 1000;
  const payload = `${username}.${expires}`;
  const sig = createHmac("sha256", sessionSecret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function verifySignedToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [username, expStr, sig] = parts;
  const expires = Number(expStr);
  if (!expires || expires < Date.now()) return null;
  const expectedSig = createHmac("sha256", sessionSecret).update(`${username}.${expires}`).digest("base64url");
  if (!safeEqual(sig, expectedSig)) return null;
  if (!safeEqual(username, adminUsername)) return null;
  return { username, expires };
}
const baseGallery = JSON.parse(await readFile(path.join(projectRoot, "src/data/gallery.json"), "utf8"));
let siteContent = currentEditableContent(baseGallery);
try {
  const saved = JSON.parse(await readFile(contentFile, "utf8"));
  applyEditableContent(saved);
  siteContent = currentEditableContent(baseGallery);
} catch {}
await buildSite(siteContent);

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body), "Cache-Control": "no-store" });
  response.end(body);
}

async function readBody(request, maxBytes = 2_000_000) {
  const chunks = [];
  let length = 0;
  for await (const chunk of request) {
    length += chunk.length;
    if (length > maxBytes) throw Object.assign(new Error("Request is too large."), { statusCode: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function readJson(request) {
  const body = await readBody(request);
  try { return JSON.parse(body.toString("utf8")); }
  catch { throw Object.assign(new Error("Please send valid JSON."), { statusCode: 400 }); }
}

function safeEqual(left, right) {
  const a = createHmac("sha256", sessionSecret).update(String(left)).digest();
  const b = createHmac("sha256", sessionSecret).update(String(right)).digest();
  return timingSafeEqual(a, b);
}

function cookieValue(request, name) {
  const cookie = request.headers.cookie || "";
  const pair = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  try { return pair ? decodeURIComponent(pair.slice(name.length + 1)) : ""; }
  catch { return ""; }
}

function getSession(request) {
  const token = cookieValue(request, "kabita_admin") || request.headers["x-admin-token"] || "";
  const verified = verifySignedToken(token);
  if (verified) return { token, ...verified };
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expires < Date.now()) { sessions.delete(token); return null; }
  return { token, ...session };
}

function originAllowed(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === request.headers.host; }
  catch { return false; }
}

function requireAdmin(request, response) {
  const session = getSession(request);
  if (!session) { sendJson(response, 401, { error: "লগইন শেষ হয়েছে। আবার লগইন করুন।" }); return false; }
  return true;
}

function cleanText(value, max = 800, fallback = "") {
  if (value === undefined || value === null) return fallback;
  return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

function cleanStringList(value, maxItems = 100, maxLength = 160) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((item) => cleanText(item, maxLength)).filter(Boolean);
}

function cleanLocalImage(value, optional = false) {
  const image = cleanText(value, 300);
  if (optional && !image) return "";
  if (!/^\/(?:assets|uploads)\/[A-Za-z0-9._/-]+$/.test(image) || image.includes("..")) throw Object.assign(new Error("ছবির path ঠিক নেই। আবার upload করুন।"), { statusCode: 400 });
  return image;
}

function cleanSecureUrl(value, hosts, label) {
  const raw = cleanText(value, 600);
  let url;
  try { url = new URL(raw); } catch { throw Object.assign(new Error(`${label} লিংকটি ঠিক নেই।`), { statusCode: 400 }); }
  if (url.protocol !== "https:" || !hosts.includes(url.hostname)) throw Object.assign(new Error(`${label} লিংকটি অনুমোদিত নয়।`), { statusCode: 400 });
  return url.href;
}

function normalizeContent(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw Object.assign(new Error("সাইটের তথ্য পড়া যায়নি।"), { statusCode: 400 });
  const phone = cleanText(raw.business?.phone, 20).replace(/\D/g, "");
  if (phone.length < 8 || phone.length > 15) throw Object.assign(new Error("ফোন নম্বরটি ৮–১৫ সংখ্যার হতে হবে।"), { statusCode: 400 });
  const whatsappNumber = cleanText(raw.business?.whatsappNumber, 20).replace(/\D/g, "");
  if (whatsappNumber && (whatsappNumber.length < 10 || whatsappNumber.length > 15)) throw Object.assign(new Error("WhatsApp নম্বরটিতে country code-সহ ১০–১৫টি সংখ্যা দিন।"), { statusCode: 400 });
  const score = cleanText(raw.business?.reviewScore, 8);
  if (score && !/^([0-4](\.\d)?|5(\.0)?)$/.test(score)) throw Object.assign(new Error("Google review score 0 থেকে 5-এর মধ্যে দিন।"), { statusCode: 400 });
  const gallery = Array.isArray(raw.gallery) ? raw.gallery.slice(0, 500).map((photo) => ({
    src: cleanLocalImage(photo.src), width: Math.min(6000, Math.max(1, Number(photo.width) || 900)),
    height: Math.min(6000, Math.max(1, Number(photo.height) || 900)), alt: cleanText(photo.alt, 160, "KABITA MOBILE STORES shop photo"),
  })) : [];
  const reviews = Array.isArray(raw.reviews) ? raw.reviews.slice(0, 30).map((review) => ({ name: cleanText(review.name, 100), date: cleanText(review.date, 80), quote: cleanText(review.quote, 600) })).filter((r) => r.name && r.quote) : [];
  const usedPostSlugs = new Set();
  const posts = Array.isArray(raw.posts) ? raw.posts.slice(0, 300).map((item, index) => {
    let slug = cleanText(item.slug, 140).replace(/[^\p{L}\p{N}_-]/gu, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || `story-${index + 1}`;
    if (usedPostSlugs.has(slug)) slug = `${slug}-${index + 1}`;
    usedPostSlugs.add(slug);
    return { slug, title: cleanText(item.title, 180, "New update"), date: cleanText(item.date, 32), dateLabel: cleanText(item.dateLabel, 80), lines: cleanStringList(item.lines, 80, 1200) };
  }) : [];
  const usedProductSlugs = new Set();
  const products = Array.isArray(raw.products) ? raw.products.slice(0, 500).map((item, index) => {
    let slug = cleanText(item.slug, 100).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || `phone-${index + 1}`;
    if (usedProductSlugs.has(slug)) slug = `${slug}-${index + 1}`;
    usedProductSlugs.add(slug);
    const specs = Array.isArray(item.specs) ? item.specs.slice(0, 24).map((spec) => ({ label: cleanText(spec.label, 80), value: cleanText(spec.value, 240) })).filter((spec) => spec.label && spec.value) : [];
    const variants = Array.isArray(item.variants) ? item.variants.slice(0, 16).map((v) => ({
      ram: cleanText(v.ram, 40),
      storage: cleanText(v.storage, 40),
      price: cleanText(v.price, 20).replace(/[^0-9,.]/g, ""),
      label: cleanText(v.label, 80) || (v.ram && v.storage ? `${cleanText(v.ram, 40)} / ${cleanText(v.storage, 40)}` : cleanText(v.ram || v.storage || "", 80)),
    })).filter((v) => v.ram || v.storage || v.price) : [];
    return {
      id: cleanText(item.id, 80, `phone-${index + 1}`), slug, brand: cleanText(item.brand, 80, "Phone"), model: cleanText(item.model, 120),
      name: cleanText(item.name, 180, "Phone"), price: cleanText(item.price, 20).replace(/[^0-9,.]/g, ""), description: cleanText(item.description, 1000),
      specs, variants, images: Array.isArray(item.images) ? item.images.slice(0, 3).map((src) => cleanLocalImage(src, true)).filter(Boolean) : [], published: item.published !== false,
    };
  }) : [];
  const colors = raw.theme || {};
  const cleanColor = (value, fallback) => /^#[0-9a-f]{6}$/i.test(String(value)) ? String(value) : fallback;
  const privacySections = Array.isArray(raw.privacySections) ? raw.privacySections.slice(0, 12).map((section) => ({ title: cleanText(section.title, 140), paragraphs: cleanStringList(section.paragraphs, 15, 1600) })).filter((section) => section.title) : [];
  const hours = Array.isArray(raw.hoursByDay) ? raw.hoursByDay.slice(0, 7).map((row) => [cleanText(row?.[0], 30), cleanText(row?.[1], 40)]) : [];
  const authorizedBrands = cleanStringList(raw.authorizedBrands, 30, 80);
  const featuredBrands = cleanStringList(raw.otherFeaturedBrands, 30, 80);
  const financePartners = cleanStringList(raw.financePartners, 30, 100);
  const shopClaims = cleanStringList(raw.shopClaims, 50, 180);
  const address = cleanText(raw.business?.address, 300);
  const addressShort = cleanText(raw.business?.addressShort, 120);
  const map = cleanSecureUrl(raw.business?.map, ["www.google.com", "maps.google.com", "maps.app.goo.gl"], "Google Maps");
  const mapSearch = cleanSecureUrl(raw.business?.mapSearch, ["www.google.com", "maps.google.com", "maps.app.goo.gl"], "Google Maps");
  const reviewLink = cleanSecureUrl(raw.business?.reviewLink, ["www.google.com", "maps.google.com", "search.google.com"], "Google review");
  const reviewWriteLink = cleanSecureUrl(raw.business?.reviewWriteLink, ["www.google.com", "maps.google.com", "search.google.com"], "Google review লেখা");
  return {
    business: {
      name: cleanText(raw.business?.name, 100, "KABITA MOBILE STORES"), phone, tel: `tel:${phone}`, address, addressShort,
      hours: cleanText(raw.business?.hours, 100), map, mapSearch, reviewLink, reviewWriteLink, logo: cleanLocalImage(raw.business?.logo),
      reviewScore: score, reviewCount: cleanText(raw.business?.reviewCount, 20), whatsappNumber,
      whatsappMessage: cleanText(raw.business?.whatsappMessage, 500, "নমস্কার, KABITA MOBILE STORES। একটি ফোন সম্পর্কে জানতে চাই। অনুগ্রহ করে মডেল, বর্তমান দাম ও উপলভ্যতা জানাবেন? ধন্যবাদ।"),
    },
    hoursByDay: hours, authorizedBrands, otherFeaturedBrands: featuredBrands, financePartners, shopClaims, reviews, posts, products,
    catalogMode: raw.catalogMode === "live" ? "live" : "samples", gallery,
    privacySections,
    hero: {
      eyebrow: cleanText(raw.hero?.eyebrow, 100), titleLead: cleanText(raw.hero?.titleLead, 100), titleAccent: cleanText(raw.hero?.titleAccent, 100),
      titleEnd: cleanText(raw.hero?.titleEnd, 100), lede: cleanText(raw.hero?.lede, 500),
      eyebrowBn: cleanText(raw.hero?.eyebrowBn, 100, "বিথারি · পশ্চিমবঙ্গ"),
      titleLeadBn: cleanText(raw.hero?.titleLeadBn, 100, "ভালো একটি ফোন,"),
      titleAccentBn: cleanText(raw.hero?.titleAccentBn, 100, "পাশেই আছে"),
      titleEndBn: cleanText(raw.hero?.titleEndBn, 100, "আপনার জন্য।"),
      ledeBn: cleanText(raw.hero?.ledeBn, 500, "সঠিক ফোন বেছে নিতে সরাসরি কথা বলুন। KABITA MOBILE STORES-এ আসুন।"),
      supportingEn: cleanText(raw.hero?.supportingEn, 500, "Branded mobile phones · Easy finance (EMI) · 100% original products."),
      supportingBn: cleanText(raw.hero?.supportingBn || raw.hero?.bengali, 500, "ব্র্যান্ডেড মোবাইল · সহজ ফাইন্যান্স (EMI) · ১০০% অরিজিনাল প্রোডাক্ট।"),
      bengali: cleanText(raw.hero?.supportingBn || raw.hero?.bengali, 500),
      image: cleanLocalImage(raw.hero?.image, true),
    },
    theme: { orange: cleanColor(colors.orange, "#ed8646"), orangeDeep: cleanColor(colors.orangeDeep, "#9b4b22") },
  };
}

async function saveContent(content) {
  await mkdir(contentRoot, { recursive: true });
  const temporary = `${contentFile}.tmp`;
  await writeFile(temporary, `${JSON.stringify(content, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, contentFile);
}

let buildQueue = Promise.resolve();
function rebuild(content) {
  buildQueue = buildQueue.then(() => buildSite(content));
  return buildQueue;
}

function checkOrigin(request, response) {
  if (originAllowed(request)) return true;
  sendJson(response, 403, { error: "এই অনুরোধটি অনুমোদিত নয়।" });
  return false;
}

async function handleApi(request, response, rawPathname) {
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  response.setHeader("Cache-Control", "no-store");
  if (pathname === "/api/admin/session" && request.method === "GET") {
    const session = getSession(request);
    sendJson(response, 200, { loggedIn: Boolean(session), username: session ? adminUsername : "" });
    return true;
  }

  if (pathname === "/api/admin/login" && request.method === "POST") {
    if (!checkOrigin(request, response)) return true;
    const ip = request.socket.remoteAddress || "unknown";
    const attempts = loginAttempts.get(ip) || { count: 0, until: 0 };
    if (attempts.until > Date.now() && attempts.count >= 10) { sendJson(response, 429, { error: "অনেকবার চেষ্টা হয়েছে। ১৫ মিনিট পরে আবার চেষ্টা করুন।" }); return true; }
    const body = await readJson(request);
    if (!body || typeof body !== "object" || Array.isArray(body)) { sendJson(response, 400, { error: "লগইনের তথ্য পাঠানো যায়নি।" }); return true; }
    if (!safeEqual(body.username || "", adminUsername) || !safeEqual(body.password || "", adminPassword)) {
      const next = attempts.until > Date.now() ? attempts : { count: 0, until: Date.now() + 15 * 60 * 1000 };
      next.count += 1; loginAttempts.set(ip, next);
      sendJson(response, 401, { error: "ইউজারনেম বা পাসওয়ার্ড মিলছে না।" }); return true;
    }
    loginAttempts.delete(ip);
    const token = createSignedToken(adminUsername);
    sessions.set(token, { expires: Date.now() + sessionLifetimeSeconds * 1000, username: adminUsername });
    const secure = production ? "; Secure" : "";
    response.setHeader("Set-Cookie", `kabita_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionLifetimeSeconds}${secure}`);
    sendJson(response, 200, { loggedIn: true, token, username: adminUsername }); return true;
  }

  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/logout" && request.method === "POST") {
      if (!checkOrigin(request, response)) return true;
      const session = getSession(request);
      if (session) sessions.delete(session.token);
      response.setHeader("Set-Cookie", "kabita_admin=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
      sendJson(response, 200, { loggedIn: false }); return true;
    }
    if (!requireAdmin(request, response)) return true;
    if (pathname === "/api/admin/data" && request.method === "GET") { sendJson(response, 200, siteContent); return true; }
    if (pathname === "/api/admin/change-credentials" && request.method === "POST") {
      if (!checkOrigin(request, response)) return true;
      const body = await readJson(request);
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        sendJson(response, 400, { error: "অনুরোধের তথ্য সঠিক নয়।" });
        return true;
      }
      const currentPassword = String(body.currentPassword || "");
      const newPassword = String(body.newPassword || "");
      const newUsername = String(body.newUsername || "").trim();

      if (!currentPassword || !safeEqual(currentPassword, adminPassword)) {
        sendJson(response, 401, { error: "বর্তমান পাসওয়ার্ড মিলছে না। সঠিক পাসওয়ার্ড দিন।" });
        return true;
      }
      if (!newPassword || newPassword.length < 8) {
        sendJson(response, 400, { error: "নতুন পাসওয়ার্ড কমপক্ষে ৮টি ক্যারেক্টার হতে হবে।" });
        return true;
      }
      if (production && newPassword.length < 16) {
        sendJson(response, 400, { error: "Production সার্ভারে পাসওয়ার্ড কমপক্ষে ১৬টি ক্যারেক্টার হতে হবে।" });
        return true;
      }
      const targetUser = newUsername || adminUsername;
      if (targetUser.length < 3 || !/^[a-zA-Z0-9_.-]+$/.test(targetUser)) {
        sendJson(response, 400, { error: "ইউজারনেম কমপক্ষে ৩টি ক্যারেক্টার হতে হবে এবং শুধুমাত্র a-z, 0-9, _, -, . ব্যবহার করা যাবে।" });
        return true;
      }

      adminUsername = targetUser;
      adminPassword = newPassword;
      process.env.ADMIN_USERNAME = targetUser;
      process.env.ADMIN_PASSWORD = newPassword;

      await updateEnvFile({
        ADMIN_USERNAME: targetUser,
        ADMIN_PASSWORD: newPassword,
      });

      sendJson(response, 200, {
        success: true,
        message: "ইউজারনেম ও পাসওয়ার্ড সফলভাবে সংরক্ষিত হয়েছে।",
        username: targetUser,
      });
      return true;
    }
    if (pathname === "/api/admin/save" && request.method === "POST") {
      if (!checkOrigin(request, response)) return true;
      const next = normalizeContent(await readJson(request));
      for (const image of [next.business.logo, next.hero.image, ...next.gallery.map((p) => p.src), ...next.products.flatMap((p) => p.images)]) {
        if (!image) continue;
        const publicPath = path.resolve(publicRoot, `.${image}`);
        if (!publicPath.startsWith(`${publicRoot}${path.sep}`)) throw Object.assign(new Error("ছবির file path ঠিক নেই।"), { statusCode: 400 });
        try { await stat(publicPath); } catch { throw Object.assign(new Error("একটি ছবি খুঁজে পাওয়া যায়নি। আবার upload করুন।"), { statusCode: 400 }); }
      }
      const previous = siteContent;
      await saveContent(next);
      try { await rebuild(next); }
      catch (error) {
        await saveContent(previous).catch(() => {});
        await rebuild(previous).catch(() => {});
        throw error;
      }
      siteContent = next;
      applyEditableContent(next);
      sendJson(response, 200, { saved: true, message: "পরিবর্তন সংরক্ষিত হয়েছে। সাইটে দেখার জন্য পেজ refresh করুন।" }); return true;
    }
    if (pathname === "/api/admin/upload" && request.method === "POST") {
      if (!checkOrigin(request, response)) return true;
      const type = request.headers["content-type"];
      const extByType = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };
      const extension = extByType[type];
      if (!extension) { sendJson(response, 415, { error: "JPG, PNG অথবা WebP ছবি upload করুন।" }); return true; }
      const bytes = await readBody(request, 12_000_000);
      const isJpeg = extension === ".jpg" && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
      const isPng = extension === ".png" && bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a";
      const isWebp = extension === ".webp" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
      if (!(isJpeg || isPng || isWebp) || bytes.length < 100) { sendJson(response, 400, { error: "ছবির file format যাচাই করা যায়নি।" }); return true; }
      const name = `upload-${randomBytes(12).toString("hex")}${extension}`;
      const uploadRoot = path.join(publicRoot, "uploads");
      await mkdir(uploadRoot, { recursive: true });
      await writeFile(path.join(uploadRoot, name), bytes, { flag: "wx", mode: 0o644 });
      await mkdir(path.join(outputRoot, "uploads"), { recursive: true });
      await copyFile(path.join(uploadRoot, name), path.join(outputRoot, "uploads", name));
      sendJson(response, 201, { src: `/uploads/${name}`, bytes: bytes.length }); return true;
    }
    sendJson(response, 404, { error: "API route পাওয়া যায়নি।" }); return true;
  }

  return false;
}

function headers(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' blob: data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'");
  response.setHeader("Cache-Control", "no-cache");
}

const server = createServer(async (request, response) => {
  headers(response);
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host || "localhost"}`).pathname); }
  catch { response.writeHead(400); response.end("Bad request"); return; }
  try {
    if (pathname.startsWith("/api/")) {
      const handled = await handleApi(request, response, pathname);
      if (handled) return;
      if (request.method !== "GET" && request.method !== "HEAD") { response.writeHead(405, { Allow: "GET, HEAD" }); response.end("Method not allowed"); return; }
    } else if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }); response.end("Method not allowed"); return;
    }
    if (pathname === "/admin") {
      response.writeHead(301, { Location: "/admin/" });
      response.end();
      return;
    }
    if (pathname === "/favicon.ico") {
      const fav = path.join(publicRoot, "assets", "kabita-logo.png");
      try {
        const info = await stat(fav);
        response.writeHead(200, { "Content-Type": "image/png", "Content-Length": info.size, "Cache-Control": "public, max-age=86400" });
        createReadStream(fav).pipe(response);
        return;
      } catch {}
    }
    const candidate = path.resolve(outputRoot, `.${pathname}`);
    if (candidate !== outputRoot && !candidate.startsWith(`${outputRoot}${path.sep}`)) { response.writeHead(403); response.end("Forbidden"); return; }
    let filePath = candidate;
    try { const info = await stat(filePath); if (info.isDirectory()) filePath = path.join(filePath, "index.html"); }
    catch { if (!path.extname(filePath)) filePath = path.join(filePath, "index.html"); }
    let info;
    try {
      info = await stat(filePath);
      if (!info.isFile()) throw new Error("Not a file");
    } catch {
      if (path.extname(candidate)) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }
      filePath = path.join(outputRoot, "404", "index.html");
      info = await stat(filePath);
      response.statusCode = 404;
    }
    response.setHeader("Content-Type", types[path.extname(filePath).toLowerCase()] || "application/octet-stream");
    response.setHeader("Content-Length", info.size);
    if (request.method === "HEAD") { response.end(); return; }
    createReadStream(filePath).pipe(response);
  } catch (error) {
    if (response.headersSent) { response.destroy(); return; }
    sendJson(response, error.statusCode || 500, { error: error.statusCode ? error.message : "সাইট update করা যায়নি। আবার চেষ্টা করুন।" });
    if (!error.statusCode) console.error(error);
  }
});

server.listen(port, host, () => {
  console.log(`KABITA MOBILE STORES is ready at http://${host}:${port}`);
  console.log(adminUsername !== demoUsername ? `Admin login user: ${adminUsername}` : `Local demo login: ${demoUsername} / ${demoPassword}`);
  console.log("Press Ctrl+C to stop.");
});
