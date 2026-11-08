const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let content = null;
let editingProduct = null;
let editingPost = null;
let alertTimer;

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function setStatus(message, kind = "") {
  const status = $("#save-status");
  status.textContent = message;
  status.classList.toggle("is-saved", kind === "saved");
  status.classList.toggle("is-error", kind === "error");
}

function toast(message, error = false) {
  const box = $("#admin-alert");
  box.textContent = message;
  box.hidden = false;
  box.style.background = error ? "#9d2e18" : "#151b20";
  clearTimeout(alertTimer);
  alertTimer = setTimeout(() => { box.hidden = true; }, 4500);
}

async function api(url, options = {}) {
  const response = await fetch(url, { credentials: "same-origin", cache: "no-store", ...options });
  const payload = response.headers.get("content-type")?.includes("application/json") ? await response.json() : {};
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload;
}

function markDirty() { setStatus("Unsaved changes", ""); }

function setByPath(object, path, value) {
  const keys = path.split(".");
  let current = object;
  for (const key of keys.slice(0, -1)) current = current[key];
  current[keys.at(-1)] = value;
}

function setTab(name) {
  $$(".admin-tabs [data-tab]").forEach((button) => {
    const active = button.dataset.tab === name;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  $$(".admin-panel[data-panel]").forEach((panel) => {
    const active = panel.dataset.panel === name;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

function fillBoundFields() {
  $$('[data-bind]').forEach((field) => {
    const value = field.dataset.bind.split(".").reduce((node, key) => node?.[key], content);
    field.value = value ?? "";
  });
  $$('[data-list]').forEach((field) => { field.value = (content[field.dataset.list] || []).join("\n"); });
  $("#logo-preview").src = content.business.logo;
  $("#hero-preview").src = content.hero.image || content.gallery[2]?.src || "";
  renderHours();
  renderProducts();
  renderPosts();
  renderGallery();
  renderReviews();
  renderPrivacy();
}

function renderHours() {
  $("#hours-grid").innerHTML = content.hoursByDay.map(([day, hours], index) => `<label>${esc(day)}<input data-hours-index="${index}" value="${esc(hours)}" maxlength="40"></label>`).join("");
}

function renderProducts() {
  $("#product-list").innerHTML = content.products.length ? content.products.map((item) => `<article class="managed-row"><div><strong>${esc(item.name || `${item.brand} ${item.model}`)}</strong><small>${esc(item.brand)} · ${item.price ? `₹${esc(item.price)}` : "দাম যোগ করা হয়নি"} · ${item.published === false ? "Unpublished" : "Published"}</small></div><img src="${esc(item.images?.[0] || "/assets/kabita-logo.png")}" alt="" style="width:3.2rem;height:3.2rem;object-fit:cover"><div class="row-actions"><button class="small-button" data-action="edit-product" data-id="${esc(item.id)}" type="button">Edit</button><button class="small-button is-danger" data-action="delete-product" data-id="${esc(item.id)}" type="button">Delete</button></div></article>`).join("") : `<div class="section-card"><strong>এখনো কোনো ফোন যোগ করা হয়নি।</strong><p>“নতুন ফোন যোগ করুন” চাপলে model, price, specifications ও ৩টি ছবি দিতে পারবেন।</p></div>`;
}

function newId(prefix) { return `${prefix}-${crypto.randomUUID?.() || Date.now().toString(36)}`; }

function showProductEditor(item = null) {
  editingProduct = structuredClone(item || { id: newId("phone"), slug: "", brand: "", model: "", name: "", price: "", description: "", specs: [], images: [], published: true });
  const form = $("#product-form");
  form.innerHTML = `<div class="section-card-head"><div><p class="eyebrow">PRODUCT DETAILS</p><h3>${item ? "ফোন edit করুন" : "নতুন ফোন যোগ করুন"}</h3></div><button class="icon-button" type="button" data-action="close-product">বন্ধ করুন ×</button></div>
    <div class="field-grid"><label>Brand<input name="brand" value="${esc(editingProduct.brand)}" required maxlength="80"></label><label>Model<input name="model" value="${esc(editingProduct.model)}" required maxlength="120"></label><label>Card name<input name="name" value="${esc(editingProduct.name)}" maxlength="180" placeholder="Brand + model"></label><label>Price in ₹<input name="price" inputmode="decimal" value="${esc(editingProduct.price)}" maxlength="20" placeholder="e.g. 14999"></label><label class="field-wide">Description<textarea name="description" rows="3" maxlength="1000">${esc(editingProduct.description)}</textarea></label><label class="field-wide">Specifications · প্রতি লাইনে label: value<textarea name="specs" rows="5" placeholder="Display: 6.5 inch&#10;Memory: 8 GB / 128 GB">${esc((editingProduct.specs || []).map((spec) => `${spec.label}: ${spec.value}`).join("\n"))}</textarea></label><label class="checkbox-line"><input name="published" type="checkbox" ${editingProduct.published === false ? "" : "checked"}> Catalogue-এ publish করুন</label></div>
    <h3>সর্বোচ্চ ৩টি phone photo</h3><div class="product-edit-images">${[0, 1, 2].map((index) => `<label class="image-slot"><img data-product-preview="${index}" src="${esc(editingProduct.images?.[index] || "/assets/kabita-logo.png")}" alt="Phone image ${index + 1}"><span>Photo ${index + 1}</span><input type="file" data-product-upload="${index}" accept="image/jpeg,image/png,image/webp"><button type="button" class="small-button" data-action="clear-product-image" data-index="${index}">ছবি সরান</button></label>`).join("")}</div>
    <div class="editor-actions"><button class="button button--primary" type="submit">ফোনের তথ্য যোগ করুন</button><button class="button button--quiet" type="button" data-action="close-product">বাতিল</button></div>`;
  form.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPosts() {
  $("#post-list").innerHTML = content.posts.length ? content.posts.map((item) => `<article class="managed-row"><div><strong>${esc(item.title)}</strong><small>${esc(item.dateLabel)} · ${(item.lines || []).length} lines</small></div><div class="row-actions"><button class="small-button" data-action="edit-post" data-id="${esc(item.slug)}" type="button">Edit</button><button class="small-button is-danger" data-action="delete-post" data-id="${esc(item.slug)}" type="button">Delete</button></div></article>`).join("") : `<div class="section-card"><strong>এখনো কোনো post নেই।</strong><p>নতুন post যোগ করলে Stories পেজে দেখা যাবে।</p></div>`;
}

function showPostEditor(item = null) {
  editingPost = structuredClone(item || { slug: newId("story"), title: "", date: new Date().toISOString().slice(0, 10), dateLabel: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }), lines: [] });
  const form = $("#post-form");
  form.innerHTML = `<div class="section-card-head"><div><p class="eyebrow">SHOP UPDATE</p><h3>${item ? "Post edit করুন" : "নতুন post"}</h3></div><button class="icon-button" type="button" data-action="close-post">বন্ধ করুন ×</button></div><div class="field-grid"><label class="field-wide">Title<input name="title" value="${esc(editingPost.title)}" required maxlength="180"></label><label>Date<input name="date" type="date" value="${esc(editingPost.date)}"></label><label>Date label<input name="dateLabel" value="${esc(editingPost.dateLabel)}" maxlength="80"></label><label class="field-wide">Post body · প্রতি লাইনে আলাদা paragraph<textarea name="lines" rows="8" maxlength="6000">${esc((editingPost.lines || []).join("\n"))}</textarea></label></div><div class="editor-actions"><button class="button button--primary" type="submit">Post সংরক্ষণ</button><button class="button button--quiet" type="button" data-action="close-post">বাতিল</button></div>`;
  form.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderGallery() {
  $("#gallery-grid").innerHTML = content.gallery.map((photo, index) => `<figure class="gallery-admin-item"><img src="${esc(photo.src)}" alt="${esc(photo.alt || `Shop photo ${index + 1}`)}" loading="lazy"><button type="button" data-action="remove-gallery-photo" data-index="${index}" aria-label="Gallery থেকে ছবি ${index + 1} সরান">×</button></figure>`).join("");
}

function renderReviews() {
  $("#review-list").innerHTML = content.reviews.map((review, index) => `<div class="review-edit" data-review-index="${index}"><label>নাম<input data-review-field="name" value="${esc(review.name)}" maxlength="100"></label><label>তারিখ<input data-review-field="date" value="${esc(review.date)}" maxlength="80"></label><label>Public review-এর quote<textarea data-review-field="quote" rows="2" maxlength="600">${esc(review.quote)}</textarea></label><button class="small-button is-danger" data-action="delete-review" data-index="${index}" type="button">Quote সরান</button></div>`).join("") || `<p class="notice">কোনো review quote দেখানো হচ্ছে না। নতুন quote শুধু public Google review থেকে যোগ করুন।</p>`;
}

function renderPrivacy() {
  $("#privacy-editor").innerHTML = content.privacySections.map((section, index) => `<div class="privacy-block" data-privacy-index="${index}"><h4>Policy section ${index + 1}</h4><label>শিরোনাম<input data-privacy-title value="${esc(section.title)}" maxlength="140"></label><label>অনুচ্ছেদ · ফাঁকা লাইন দিয়ে আলাদা করুন<textarea data-privacy-paragraphs rows="5">${esc((section.paragraphs || []).join("\n\n"))}</textarea></label></div>`).join("");
}

function syncBoundFields() {
  $$('[data-bind]').forEach((field) => setByPath(content, field.dataset.bind, field.value));
  $$('[data-list]').forEach((field) => { content[field.dataset.list] = field.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean); });
  $$("[data-hours-index]").forEach((field) => { content.hoursByDay[Number(field.dataset.hoursIndex)][1] = field.value.trim(); });
  $$("[data-review-index]").forEach((row) => {
    const review = content.reviews[Number(row.dataset.reviewIndex)];
    if (!review) return;
    $$('[data-review-field]', row).forEach((field) => { review[field.dataset.reviewField] = field.value; });
  });
  $$("[data-privacy-index]").forEach((block) => {
    const section = content.privacySections[Number(block.dataset.privacyIndex)];
    if (!section) return;
    section.title = $("[data-privacy-title]", block).value;
    section.paragraphs = $("[data-privacy-paragraphs]", block).value.split(/\n\s*\n/).map((line) => line.trim()).filter(Boolean);
  });
}

async function uploadFile(file) {
  if (!file) return "";
  if (file.size > 12 * 1024 * 1024) throw new Error("ছবি 12 MB-এর চেয়ে ছোট হতে হবে।");
  const result = await api("/api/admin/upload", { method: "POST", headers: { "Content-Type": file.type }, body: file });
  return result.src;
}

async function saveWebsite() {
  syncBoundFields();
  setStatus("সংরক্ষণ হচ্ছে…");
  try {
    const result = await api("/api/admin/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    setStatus("Saved", "saved");
    toast(result.message || "পরিবর্তন সংরক্ষিত হয়েছে।");
  } catch (error) {
    setStatus("সংরক্ষণ হয়নি", "error");
    toast(error.message, true);
  }
}

function showDashboard() {
  $("#login-screen").hidden = true;
  $("#dashboard").hidden = false;
  fillBoundFields();
  setStatus("সব পরিবর্তন লোড হয়েছে", "saved");
}

async function bootDashboard() {
  const session = await api("/api/admin/session");
  if (!session.loggedIn) { $("#login-screen").hidden = false; return; }
  content = await api("/api/admin/data");
  showDashboard();
}

$("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const errorBox = $("#login-error");
  errorBox.hidden = true;
  const form = new FormData(event.currentTarget);
  try {
    await api("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: form.get("username"), password: form.get("password") }) });
    content = await api("/api/admin/data");
    showDashboard();
  } catch (error) { errorBox.textContent = error.message; errorBox.hidden = false; }
});

$(".admin-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (button) setTab(button.dataset.tab);
});

$("#dashboard").addEventListener("input", (event) => {
  if (event.target.matches("[data-bind],[data-list],[data-hours-index],[data-review-field],[data-privacy-title],[data-privacy-paragraphs]")) markDirty();
});

$("#dashboard").addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id, index } = button.dataset;
  if (action === "edit-product") showProductEditor(content.products.find((item) => item.id === id));
  if (action === "delete-product" && confirm("এই ফোনটি catalogue থেকে সরাবেন?")) { content.products = content.products.filter((item) => item.id !== id); renderProducts(); markDirty(); }
  if (action === "close-product") { $("#product-form").hidden = true; editingProduct = null; }
  if (action === "clear-product-image" && editingProduct) { editingProduct.images[Number(index)] = ""; const img = $(`[data-product-preview="${index}"]`); img.src = "/assets/kabita-logo.png"; }
  if (action === "edit-post") showPostEditor(content.posts.find((item) => item.slug === id));
  if (action === "delete-post" && confirm("এই post-টি ওয়েবসাইট থেকে মুছবেন?")) { content.posts = content.posts.filter((item) => item.slug !== id); renderPosts(); markDirty(); }
  if (action === "close-post") { $("#post-form").hidden = true; editingPost = null; }
  if (action === "remove-gallery-photo") { content.gallery.splice(Number(index), 1); renderGallery(); markDirty(); }
  if (action === "delete-review") { content.reviews.splice(Number(index), 1); renderReviews(); markDirty(); }
});

$("#add-product").addEventListener("click", () => showProductEditor());
$("#product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!editingProduct) return;
  const form = new FormData(event.currentTarget);
  const brand = String(form.get("brand") || "").trim();
  const model = String(form.get("model") || "").trim();
  const slugBase = `${brand}-${model}`.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  editingProduct.brand = brand;
  editingProduct.model = model;
  editingProduct.name = String(form.get("name") || `${brand} ${model}`).trim();
  editingProduct.slug = editingProduct.slug || `${slugBase || "phone"}-${editingProduct.id.slice(-8).toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  editingProduct.price = String(form.get("price") || "").replace(/[^0-9,.]/g, "");
  editingProduct.description = String(form.get("description") || "").trim();
  editingProduct.specs = String(form.get("specs") || "").split(/\r?\n/).map((line) => { const [label, ...value] = line.split(":"); return { label: label.trim(), value: value.join(":").trim() }; }).filter((spec) => spec.label && spec.value);
  editingProduct.published = Boolean(form.get("published"));
  const index = content.products.findIndex((item) => item.id === editingProduct.id);
  if (index < 0) content.products.push(editingProduct); else content.products[index] = editingProduct;
  content.catalogMode = "live";
  editingProduct = null;
  $("#product-form").hidden = true;
  renderProducts(); markDirty(); toast("ফোনটি editor-এ যোগ হয়েছে। উপরের “পরিবর্তন সেভ করুন” চাপুন।");
});

$("#product-form").addEventListener("change", async (event) => {
  const input = event.target.closest("[data-product-upload]");
  if (!input || !input.files?.[0] || !editingProduct) return;
  const index = Number(input.dataset.productUpload);
  try {
    const src = await uploadFile(input.files[0]);
    editingProduct.images[index] = src;
    $(`[data-product-preview="${index}"]`).src = src;
    markDirty();
  } catch (error) { toast(error.message, true); }
});

$("#add-post").addEventListener("click", () => showPostEditor());
$("#post-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  editingPost.title = String(form.get("title") || "").trim();
  editingPost.date = String(form.get("date") || "");
  if (editingPost.date) editingPost.dateLabel = new Date(`${editingPost.date}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  else editingPost.dateLabel = String(form.get("dateLabel") || "").trim();
  editingPost.lines = String(form.get("lines") || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const index = content.posts.findIndex((item) => item.slug === editingPost.slug);
  if (index < 0) content.posts.unshift(editingPost); else content.posts[index] = editingPost;
  editingPost = null;
  $("#post-form").hidden = true;
  renderPosts(); markDirty(); toast("Post editor-এ সংরক্ষিত হয়েছে। উপরের save button চাপুন।");
});

$("#gallery-upload").addEventListener("change", async (event) => {
  const files = [...event.target.files];
  for (const file of files) {
    try {
      const src = await uploadFile(file);
      content.gallery.unshift({ src, width: 1200, height: 1200, alt: `KABITA MOBILE STORES · ${file.name.replace(/\.[^.]+$/, "")}` });
    } catch (error) { toast(error.message, true); }
  }
  event.target.value = "";
  renderGallery(); markDirty();
});

$("#logo-upload").addEventListener("change", async (event) => {
  try { content.business.logo = await uploadFile(event.target.files[0]); $("#logo-preview").src = content.business.logo; markDirty(); }
  catch (error) { toast(error.message, true); }
  event.target.value = "";
});

$("#hero-upload").addEventListener("change", async (event) => {
  try { content.hero.image = await uploadFile(event.target.files[0]); $("#hero-preview").src = content.hero.image; markDirty(); }
  catch (error) { toast(error.message, true); }
  event.target.value = "";
});

$("#add-review").addEventListener("click", () => { content.reviews.push({ name: "", date: "", quote: "" }); renderReviews(); markDirty(); });
$("#save-all").addEventListener("click", saveWebsite);
$("#save-bottom").addEventListener("click", saveWebsite);
$("#logout").addEventListener("click", async () => { await api("/api/admin/logout", { method: "POST" }); location.reload(); });

$("#export-backup").addEventListener("click", () => {
  syncBoundFields();
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); link.download = `kabita-site-backup-${new Date().toISOString().slice(0, 10)}.json`; link.click();
  URL.revokeObjectURL(link.href);
});

$("#import-backup").addEventListener("change", async (event) => {
  try {
    const file = event.target.files?.[0];
    if (!file) return;
    const backup = JSON.parse(await file.text());
    if (!backup.business || !Array.isArray(backup.products) || !Array.isArray(backup.gallery)) throw new Error("এটি KABITA website backup নয়।");
    content = backup; fillBoundFields(); markDirty(); toast("Backup লোড হয়েছে। যাচাই করে save করুন।");
  } catch (error) { toast(error.message, true); }
  event.target.value = "";
});

bootDashboard().catch((error) => {
  $("#login-screen").hidden = false;
  $("#login-error").textContent = error.message;
  $("#login-error").hidden = false;
});
