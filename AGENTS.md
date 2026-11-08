# KABITA MOBILE STORES — Antigravity project rules

This is the complete, existing KABITA MOBILE STORES website. Continue working in this project; do not scaffold, replace, or redesign the whole site unless the owner explicitly asks for that.

- Preserve the current page structure, brand identity, logo, verified business details, English/Bengali language switch, light/dark themes, and responsive design.
- For each request, inspect the relevant existing files and make only the smallest changes needed. Do not remove or rewrite unrelated features or content.
- Edit source files under `src/`, `public/`, `scripts/`, and `data/` as appropriate. `dist/` is generated output; do not edit it by hand. The build regenerates it.
- Treat `data/site-content.json` and `public/uploads/` as project content that must travel with the repository so Vercel builds include owner-approved edits and media. Never put credentials or secrets there.
- Keep existing routes and the admin/content-management behavior working. Never invent prices, inventory, reviews, integrations, business claims, or contact details. Keep sample catalogue data clearly labelled.
- Preserve accessibility, reduced-motion behavior, mobile layouts, and secure admin handling. Do not expose secrets or weaken authentication.
- Keep dependencies unchanged unless the requested feature requires a new one. Do not publish or deploy the site unless the owner explicitly asks.
- After code changes, run `npm test` and report what changed and any check that could not be completed. Use `npm run dev` for the local preview.
