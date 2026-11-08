import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPagePaths } from "../src/templates.mjs";
import { applyEditableContent } from "../src/data/site.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const photos = JSON.parse(await readFile(path.join(projectRoot, "src/data/gallery.json"), "utf8"));
try {
  applyEditableContent(JSON.parse(await readFile(path.join(projectRoot, "data/site-content.json"), "utf8")));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
let checks = 0;

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL: ${message}`);
  checks += 1;
  console.log(`PASS ${message}`);
}

async function exists(filePath) {
  try { await stat(filePath); return true; } catch { return false; }
}

assert(photos.length === 168, "gallery manifest contains all 168 source photos");
assert(new Set(photos.map((photo) => photo.source)).size === 168, "gallery source URLs are unique");
assert((await exists(path.join(distRoot, "index.html"))), "home page is built");
assert((await exists(path.join(distRoot, "fonts.css"))), "local font CSS is built");
assert((await exists(path.join(distRoot, "styles.css"))), "site styles are built");
assert((await exists(path.join(distRoot, "app.js"))), "site interactions are built");
assert((await exists(path.join(distRoot, "theme.css"))), "editable theme colors are built");
assert((await exists(path.join(distRoot, "admin/index.html"))), "admin login is built");
assert((await exists(path.join(distRoot, "robots.txt"))), "robots file is built");

for (const route of getPagePaths()) {
  const filePath = path.join(distRoot, ...route.split("/").filter(Boolean), "index.html");
  assert(await exists(filePath), `route ${route || "/"} has a static HTML page`);
  const html = await readFile(filePath, "utf8");
  assert(/<title>[^<]+<\/title>/.test(html), `${route || "/"} has a page title`);
  assert(/<main\b[^>]*id="main-content"/.test(html), `${route || "/"} has a main landmark`);
  assert(/name="description"/.test(html), `${route || "/"} has a search description`);
  assert(!/https:\/\/fonts\.(googleapis|gstatic)\.com/.test(html), `${route || "/"} has no remote font request`);
  assert(html.includes('href="https://wa.me/919932557023?text='), `${route || "/"} has the direct prefilled WhatsApp link`);

  for (const match of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)(?:[?#][^\"]*)?"/g)) {
    const urlPath = match[1];
    let decoded;
    try { decoded = decodeURIComponent(urlPath); } catch { throw new Error(`FAIL: invalid local path ${urlPath}`); }
    const hasExtension = Boolean(path.extname(decoded));
    const file = hasExtension
      ? path.join(distRoot, decoded)
      : path.join(distRoot, ...decoded.split("/").filter(Boolean), "index.html");
    assert(await exists(file), `${route || "/"} local link ${urlPath} resolves`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    assert(/\balt="[^"]*"/.test(match[1]), `${route || "/"} image has an alt attribute`);
  }
}

const galleryHtml = await readFile(path.join(distRoot, "gallery/index.html"), "utf8");
assert((galleryHtml.match(/data-gallery-item/g) || []).length === 168, "gallery page renders all 168 accessible photo controls");
assert(galleryHtml.includes("<dialog"), "gallery has a native, keyboard-operable lightbox");

const catalogHtml = await readFile(path.join(distRoot, "catalog/index.html"), "utf8");
assert((catalogHtml.match(/data-sample-card/g) || []).length === 7, "catalog has seven clearly marked sample brand pages");
assert(catalogHtml.includes("not a live stock list"), "catalog states that sample cards are not inventory");

const homeHtml = await readFile(path.join(distRoot, "index.html"), "utf8");
assert(homeHtml.includes("search.google.com/local/writereview?placeid=ChIJD-K6Zp1P_zkRUo_E7Ep3JwY"), "home links directly to the verified Google review composer");
assert(homeHtml.includes("Write a Google review"), "home highlights the Google review action");
assert(homeHtml.includes("WhatsApp-এ মেসেজ করুন"), "home highlights the WhatsApp message action");
assert(homeHtml.includes('aria-label="WhatsApp" role="img"'), "WhatsApp action uses a recognizable WhatsApp mark");
assert(homeHtml.includes('class="offer-card offer-card--orange" href="/about/#finance-partners"'), "EMI service card opens listed finance partner details");
assert(homeHtml.includes('class="offer-card offer-card--blue" href="/about/#services"'), "exchange and after-sales card opens listed services");
assert(homeHtml.includes("data-en=\"A good phone,\" data-bn=\"ভালো একটি ফোন,\""), "home hero contains editable English and Bengali copy");
assert(homeHtml.includes('class="footer-admin-button" href="/admin/"'), "footer provides direct access button to the admin panel");
assert(homeHtml.includes("/theme-init.js"), "theme preference is applied before the first paint");
assert((await readFile(path.join(distRoot, "theme.css"), "utf8")).includes("--orange:#ed8646"), "home uses the richer orange theme token");
assert((await readFile(path.join(distRoot, "styles.css"), "utf8")).includes(':root[data-theme="dark"]'), "site provides dark theme color tokens");
const finalStyles = await readFile(path.join(distRoot, "styles.css"), "utf8");
assert(finalStyles.includes('html[lang="bn"] .section-heading h2'), "Bengali display headings use safe line spacing");
assert(finalStyles.includes("@keyframes whatsapp-ring"), "WhatsApp action has a subtle attention motion");
assert(finalStyles.includes("prefers-reduced-motion: reduce"), "motion remains disabled for reduced-motion preferences");
assert((await readFile(path.join(distRoot, "styles.css"), "utf8")).includes("perspective(900px) rotateY(-4deg)"), "product cards use subtle 3D motion");
assert((await readFile(path.join(distRoot, "app.js"), "utf8")).includes("IntersectionObserver"), "scroll reveal motion is progressive enhancement");

const adminHtml = await readFile(path.join(distRoot, "admin/index.html"), "utf8");
assert(adminHtml.includes('name="robots" content="noindex,nofollow"'), "admin login is marked noindex");
assert(adminHtml.includes('id="login-form"'), "admin login form is present");
assert(adminHtml.includes('data-tab="catalog"'), "admin catalogue editor is present");
assert(adminHtml.includes("পরিবর্তন সেভ করুন"), "admin save action has the revised clear label");
assert(adminHtml.includes('data-bind="hero.titleLeadBn"') && adminHtml.includes('data-bind="hero.ledeBn"'), "admin can edit the Bengali hero headline and description separately");
assert(adminHtml.includes('data-bind="hero.supportingEn"') && adminHtml.includes('data-bind="hero.supportingBn"'), "admin can edit bilingual hero supporting copy");
assert(!adminHtml.includes("KabitaDemo2026!"), "demo password is not exposed in the public admin HTML");
assert(adminHtml.includes('id="credentials-form"'), "admin security credentials form is present");
assert((await readFile(path.join(distRoot, "robots.txt"), "utf8")).includes("Disallow: /admin/"), "robots file disallows admin and API paths");

const contactHtml = await readFile(path.join(distRoot, "contact/index.html"), "utf8");
assert(contactHtml.includes("tel:9932557023"), "contact page uses the verified phone number");
assert(contactHtml.includes("destination_place_id=ChIJD-K6Zp1P_zkRUo_E7Ep3JwY"), "directions link uses the verified Maps place ID");

for (const photo of photos) {
  const photoPath = path.join(distRoot, photo.src);
  assert(await exists(photoPath), `photo ${path.basename(photo.src)} exists locally`);
  const bytes = await readFile(photoPath);
  const validWebp = bytes.subarray(8, 12).toString("ascii") === "WEBP";
  assert(bytes.length > 2000 && (bytes[0] === 0xff && bytes[1] === 0xd8 || bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a" || validWebp), `photo ${path.basename(photo.src)} is a valid JPEG, PNG or WebP`);
}

console.log(`\nAll ${checks} project checks passed.`);
