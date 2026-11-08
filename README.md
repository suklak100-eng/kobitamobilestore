# KABITA MOBILE STORES redesign

A separate, responsive Node.js website project with a protected content manager. It uses Node’s built-in modules and has no runtime package dependencies.

## Local preview

Use Node.js 20 or newer. From this folder, run:

```sh
npm run dev
```

Open `http://127.0.0.1:4173/` for the public site and `http://127.0.0.1:4173/admin/` for the admin panel.

Local demo login:

- Username: `admin`
- Password: `KabitaDemo2026!`

There is also a Mac double-click launcher: **Run KABITA Website.command**. No `npm install` is needed.

Visitors can switch the public site between English and Bengali and choose light or dark appearance from the header. Their choices are kept in that browser. Hero headings and descriptions can be edited separately in both languages from the admin panel.

## Continue this project in Google Antigravity

Open **this whole `kabita-mobile-redesign` folder** in Antigravity with **New Project → Add Folder**, then choose Local mode. Do not open just one file or the `dist/` folder. The website is already implemented; ask Antigravity to change only the parts you request. It reads the project rules in `AGENTS.md` so it knows to preserve the existing site and make focused edits.

## What the admin can manage

- Shop name, phone, address, business hours, map URLs, review URLs and WhatsApp number/message.
- Homepage hero wording, logo, hero photo and orange theme colours.
- Catalogue products: add, edit, publish/unpublish and delete; set brand, model, price, description, specifications and up to three photos per phone.
- Posts: add, edit and delete.
- Gallery: upload JPG, PNG or WebP photos and remove photos from the public gallery.
- Authorised and featured brands, finance partners, service claims, displayed review quotes and privacy policy text.
- Download or restore a JSON content backup.

Use only owner-confirmed prices, inventory, review quotes and shop claims. The catalogue starts with clearly marked sample brand pages; adding the first real phone switches it to the live catalogue. There is no checkout, payment, stock sync, Google Reviews API, or fake review submission. The Google review button opens Google’s review flow; submitted reviews remain on Google.

When the admin saves, the server rebuilds the site with the new information. Refresh the public page to see the change. Website content is stored in `data/site-content.json`; uploaded media is stored in `public/uploads/`. Admin sessions use an HttpOnly, SameSite cookie and expire after eight hours. Uploads are limited to JPG, PNG or WebP up to 12 MB each.

## Hosting the site for a client

The admin API needs a Node.js host with a **persistent writable disk**. A static-only host will serve the pages but cannot save admin edits or uploads. Use one Node server instance and configure HTTPS at the hosting provider or reverse proxy.

Before exposing the app publicly:

1. Copy `.env.example` to `.env` on the server and set the approved domain, a private admin username, a unique password with at least 16 characters, and a random session secret with at least 32 characters.
2. Never commit `.env`. Back up `data/site-content.json` and `public/uploads/` with the project because they contain public site content and uploaded photos.
3. Set `NODE_ENV=production`, `HOST=0.0.0.0`, and the hosting-provided `PORT`. The server refuses to start in production if credentials or the session secret are missing/too short. The local demo password only works on loopback.
4. Set `SITE_ORIGIN` to the approved HTTPS domain. Verify backups, uploads and the `/admin/` login before sharing the URL with the client.
5. Confirm that `9932557023` is the shop’s WhatsApp number before launch. The number is listed on the original site, but its WhatsApp registration has not been independently verified.

Use `npm start` on the Node host. `npm run build` generates the static files in `dist/`; the Node server runs the protected admin API and serves the built pages. The server currently uses an in-memory session store and supports one running instance; multi-instance hosting needs shared sessions and coordinated storage.

## Checks

```sh
npm test
```

This builds the site and checks page routes, local assets, the 168 original gallery photos, content controls, accessibility landmarks and admin assets.

## Publish the public website with GitHub and Vercel

The root `vercel.json` builds the site with `npm run build` and tells Vercel to publish `dist/`. The build reads `data/site-content.json`, so the current owner-approved text, settings and product data go into the deployed pages. Uploaded photos under `public/uploads/` and the original gallery assets are included in the project. Keep these content files and photos in GitHub; `.env` must stay private and is ignored.

For future changes, ask Antigravity to edit this project, review the changes, then push them to the connected GitHub repository. Vercel will build and deploy each push.

**Admin limitation:** The existing admin panel saves to local files and uses in-memory login sessions. It works with this project's local Node server, but those saves are not persistent on Vercel's static deployment. The public website deploys; online admin editing needs a persistent database/object store and serverless API, which are not configured in this project.

## Verified original business details

- KABITA MOBILE STORES, Bazar, Arshikari Road, opposite Panchayat Office, Bithari, West Bengal, 743286.
- Phone: 9932557023. Listed hours: every day, 8am–10pm.
- Authorised dealers listed on the source site: Vivo, Oppo, Samsung and Tecno.
- Finance partners listed: Bajaj Finance, TVS Finance and HDB Finance.
- Public Google summary shown by the source site: 4.9/5 from 94+ reviews.
- Original square logo and all 168 source gallery photos are local in this project.

The owner should approve reuse of the original logo and photos, confirm all business details and claims, verify the review quotes, check the review and WhatsApp links, enter real product details, and approve the draft privacy policy before public launch. No files on the original live website have been changed.

## Design direction

See [DESIGN.md](DESIGN.md) for the visual rationale, typography, palette, composition, accessibility and motion rules.
