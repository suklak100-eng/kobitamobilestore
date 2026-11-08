import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPagePaths, renderPath } from "../src/templates.mjs";
import { applyEditableContent, catalogMode, galleryContent, managedPosts, products, siteOrigin as sourceSiteOrigin, theme } from "../src/data/site.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const outputRoot = path.join(projectRoot, "dist");
const stagingRoot = path.join(projectRoot, ".dist-building");
const previousRoot = path.join(projectRoot, ".dist-previous");

export async function buildSite(content = null) {
  if (content) applyEditableContent(content);
  const siteOrigin = (process.env.SITE_ORIGIN || sourceSiteOrigin).replace(/\/+$/, "");
  const originalPhotos = JSON.parse(await readFile(path.join(projectRoot, "src/data/gallery.json"), "utf8"));
  const photos = galleryContent || originalPhotos;
  const bundledAssets = await Promise.all([
    readFile(path.join(projectRoot, "src/fonts.css")),
    readFile(path.join(projectRoot, "src/styles.css")),
    readFile(path.join(projectRoot, "src/app.js")),
    readFile(path.join(publicRoot, "theme-init.js")),
  ]);
  const assetVersion = createHash("sha256").update(Buffer.concat(bundledAssets)).digest("hex").slice(0, 12);
  const themeCss = `:root{--orange:${theme.orange};--orange-deep:${theme.orangeDeep};}\n`;

  await rm(stagingRoot, { recursive: true, force: true });
  await mkdir(stagingRoot, { recursive: true });
  await cp(publicRoot, stagingRoot, { recursive: true });
  await Promise.all([
    cp(path.join(projectRoot, "src/fonts.css"), path.join(stagingRoot, "fonts.css")),
    cp(path.join(projectRoot, "src/styles.css"), path.join(stagingRoot, "styles.css")),
    cp(path.join(projectRoot, "src/app.js"), path.join(stagingRoot, "app.js")),
    writeFile(path.join(stagingRoot, "theme.css"), themeCss, "utf8"),
  ]);

  const pagePaths = getPagePaths();
  for (const routePath of pagePaths) {
    const segments = routePath.split("/").filter(Boolean);
    const outputPath = path.join(stagingRoot, ...segments, "index.html");
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, renderPath(routePath, photos, siteOrigin, assetVersion), "utf8");
  }

  const mainRoutes = ["/", "/about/", "/contact/", "/posts/", ...managedPosts.map((item) => `/posts/${encodeURI(item.slug)}/`), "/gallery/"];
  if (catalogMode === "live") mainRoutes.push("/catalog/");
  const sitemap = siteOrigin
    ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${mainRoutes.map((route) => `<url><loc>${siteOrigin}${route}</loc></url>`).join("")}</urlset>\n`
    : "";
  if (sitemap) await writeFile(path.join(stagingRoot, "sitemap.xml"), sitemap, "utf8");

  const robots = `User-agent: *\nAllow: /\nDisallow: /catalog/\nDisallow: /admin/\nDisallow: /api/\n${siteOrigin ? `Sitemap: ${siteOrigin}/sitemap.xml\n` : ""}`;
  await writeFile(path.join(stagingRoot, "robots.txt"), robots, "utf8");

  // Provide native 404.html for Vercel / static hosts
  try {
    await cp(path.join(stagingRoot, "404", "index.html"), path.join(stagingRoot, "404.html"));
  } catch {}

  // Provide root favicon.ico so browsers don't 404
  try {
    await cp(path.join(publicRoot, "assets", "kabita-logo.png"), path.join(stagingRoot, "favicon.ico"));
  } catch {}

  await rm(previousRoot, { recursive: true, force: true });
  try { await rename(outputRoot, previousRoot); } catch {}
  await rename(stagingRoot, outputRoot);
  await rm(previousRoot, { recursive: true, force: true });
  console.log(`Built ${pagePaths.length} pages and ${photos.length} gallery images${siteOrigin ? ` for ${siteOrigin}` : ""}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let savedContent = null;
  try {
    savedContent = JSON.parse(await readFile(path.join(projectRoot, "data/site-content.json"), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await buildSite(savedContent);
}
