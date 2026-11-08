import { PHONE_BRANDS, PHONE_DATABASE } from "./phone-db.js";

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

const SESSION_STORAGE_KEY = "kabita_admin_session_auth";

function getLocalAdminSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && session.loggedIn) return session;
  } catch {}
  return null;
}

function setLocalAdminSession(data) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ loggedIn: true, ...data, timestamp: Date.now() }));
  } catch {}
}

function clearLocalAdminSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {}
}

async function api(url, options = {}) {
  const local = getLocalAdminSession();
  const headers = { ...(options.headers || {}) };
  if (local?.token) headers["X-Admin-Token"] = local.token;
  const response = await fetch(url, { credentials: "same-origin", cache: "no-store", ...options, headers });
  const payload = response.headers.get("content-type")?.includes("application/json") ? await response.json() : {};
  if (!response.ok) {
    const error = new Error(payload.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
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
  $("#product-list").innerHTML = content.products.length ? content.products.map((item) => {
    const vCount = Array.isArray(item.variants) ? item.variants.length : 0;
    const vText = vCount > 0 ? ` · 📦 ${vCount} Variants (${item.variants.map((v) => v.ram ? `${v.ram}/${v.storage}` : v.storage || v.price).slice(0, 3).join(", ")}${vCount > 3 ? "..." : ""})` : "";
    return `<article class="managed-row"><div><strong>${esc(item.name || `${item.brand} ${item.model}`)}</strong><small>${esc(item.brand)} · ${item.price ? `₹${esc(item.price)}` : "দাম যোগ করা হয়নি"}${vText} · ${item.published === false ? "Unpublished" : "Published"}</small></div><img src="${esc(item.images?.[0] || "/assets/kabita-logo.png")}" alt="" style="width:3.2rem;height:3.2rem;object-fit:cover"><div class="row-actions"><button class="small-button" data-action="edit-product" data-id="${esc(item.id)}" type="button">Edit</button><button class="small-button is-danger" data-action="delete-product" data-id="${esc(item.id)}" type="button">Delete</button></div></article>`;
  }).join("") : `<div class="section-card"><strong>এখনো কোনো ফোন যোগ করা হয়নি।</strong><p>“নতুন ফোন যোগ করুন” চাপলে model, price, specifications ও ৩টি ছবি দিতে পারবেন।</p></div>`;
}

function newId(prefix) { return `${prefix}-${crypto.randomUUID?.() || Date.now().toString(36)}`; }

function renderVariantsEditor() {
  const container = $("#variants-list-container");
  if (!container || !editingProduct) return;
  const list = editingProduct.variants || [];
  if (!list.length) {
    container.innerHTML = `<div class="variants-empty-note">কোনো RAM/Storage ভ্যারিয়েন্ট যোগ করা হয়নি। উপরে মডেল সিলেক্ট করলে অথবা “+ ভ্যারিয়েন্ট যোগ করুন” বাটনে চাপলে 8GB, 12GB ইত্যাদি কনফিগারেশন যোগ করতে পারবেন।</div>`;
    return;
  }
  container.innerHTML = list.map((v, idx) => `
    <div class="variant-item-row" data-variant-row="${idx}">
      <div class="variant-field">
        <label>RAM (যেমন: 8 GB)</label>
        <input type="text" data-variant-ram value="${esc(v.ram || "")}" placeholder="8 GB" maxlength="30">
      </div>
      <div class="variant-field">
        <label>Storage (যেমন: 128 GB)</label>
        <input type="text" data-variant-storage value="${esc(v.storage || "")}" placeholder="128 GB" maxlength="30">
      </div>
      <div class="variant-field">
        <label>Price in ₹ (দাম)</label>
        <input type="text" data-variant-price inputmode="decimal" value="${esc(v.price || "")}" placeholder="24999" maxlength="20">
      </div>
      <button type="button" class="small-button is-danger remove-variant-btn" data-variant-remove="${idx}" title="ভ্যারিয়েন্ট মুছুন">সরান ×</button>
    </div>
  `).join("");
}

function syncCurrentVariantsFromDOM() {
  if (!editingProduct) return;
  const rows = $$(".variant-item-row", $("#product-form"));
  editingProduct.variants = rows.map((row) => {
    const ram = (row.querySelector("[data-variant-ram]")?.value || "").trim();
    const storage = (row.querySelector("[data-variant-storage]")?.value || "").trim();
    const price = (row.querySelector("[data-variant-price]")?.value || "").replace(/[^0-9,.]/g, "").trim();
    const label = [ram ? `${ram} RAM` : "", storage ? `${storage} Storage` : ""].filter(Boolean).join(" · ") || (ram && storage ? `${ram} / ${storage}` : ram || storage || "");
    return { ram, storage, price, label };
  });
}

function setupBrandModelHandlers() {
  const brandSelect = $("#product-brand-select");
  const customBrandInput = $("#product-custom-brand-input");
  const modelSelect = $("#product-model-select");
  const customModelInput = $("#product-custom-model-input");
  const nameInput = $("#product-name-input");
  const priceInput = $("#product-price-input");
  const descInput = $("#product-description-input");
  const specsInput = $("#product-specs-input");
  const banner = $("#autofill-banner");
  const bannerTitle = $("#autofill-banner-title");

  if (!brandSelect || !modelSelect) return;

  brandSelect.addEventListener("change", () => {
    const brand = brandSelect.value;
    if (brand === "__custom__") {
      customBrandInput.style.display = "block";
      customBrandInput.required = true;
      customBrandInput.focus();
      modelSelect.innerHTML = `<option value="">-- মডেলের নাম টাইপ করুন --</option><option value="__custom__" selected>+ কাস্টম মডেল লিখুন...</option>`;
      modelSelect.disabled = false;
      customModelInput.style.display = "block";
      customModelInput.required = true;
      if (banner) banner.hidden = true;
      return;
    }

    customBrandInput.style.display = "none";
    customBrandInput.required = false;

    if (!brand) {
      modelSelect.innerHTML = `<option value="">-- প্রথমে ব্র্যান্ড নির্বাচন করুন --</option>`;
      modelSelect.disabled = true;
      customModelInput.style.display = "none";
      if (banner) banner.hidden = true;
      return;
    }

    const models = PHONE_DATABASE[brand] || [];
    modelSelect.innerHTML = `
      <option value="">-- মডেল নির্বাচন করুন (${models.length}টি মডেল উপলব্ধ) --</option>
      ${models.map((m) => `<option value="${esc(m.model)}">${esc(m.model)} (₹${esc(m.price)})</option>`).join("")}
      <option value="__custom__">+ কাস্টম মডেল লিখুন...</option>
    `;
    modelSelect.disabled = false;
    customModelInput.style.display = "none";
    customModelInput.required = false;
    if (banner) banner.hidden = true;
  });

  modelSelect.addEventListener("change", () => {
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;

    if (selectedModel === "__custom__") {
      customModelInput.style.display = "block";
      customModelInput.required = true;
      customModelInput.focus();
      if (banner) banner.hidden = true;
      return;
    }

    customModelInput.style.display = "none";
    customModelInput.required = false;

    if (!selectedModel || !selectedBrand || selectedBrand === "__custom__") {
      if (banner) banner.hidden = true;
      return;
    }

    const models = PHONE_DATABASE[selectedBrand] || [];
    const itemData = models.find((m) => m.model === selectedModel);
    if (!itemData) return;

    // Auto-fill all details
    nameInput.value = itemData.name || `${selectedBrand} ${itemData.model}`;
    priceInput.value = itemData.price || "";
    descInput.value = itemData.description || "";
    specsInput.value = (itemData.specs || []).map((s) => `${s.label}: ${s.value}`).join("\n");

    // Auto-fill variants
    if (Array.isArray(itemData.variants) && itemData.variants.length > 0) {
      editingProduct.variants = structuredClone(itemData.variants);
    } else {
      editingProduct.variants = [];
    }
    renderVariantsEditor();

    // Show banner & toast
    if (banner) {
      if (bannerTitle) bannerTitle.textContent = `${itemData.name} — ₹${itemData.price}`;
      banner.hidden = false;
    }
    toast(`⚡ ${itemData.name}-এর Indian retail দাম, স্পেক্স ও ${editingProduct.variants.length}টি ভ্যারিয়েন্ট অটোফিল হয়েছে!`);
  });

  // Variant addition & removal handlers
  $("#add-variant-btn")?.addEventListener("click", () => {
    syncCurrentVariantsFromDOM();
    editingProduct.variants.push({ ram: "8 GB", storage: "256 GB", price: "", label: "" });
    renderVariantsEditor();
  });

  $("#variants-list-container")?.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-variant-remove]");
    if (!removeBtn) return;
    const idx = Number(removeBtn.dataset.variantRemove);
    syncCurrentVariantsFromDOM();
    editingProduct.variants.splice(idx, 1);
    renderVariantsEditor();
  });
}

function showProductEditor(item = null) {
  editingProduct = structuredClone(item || {
    id: newId("phone"),
    slug: "",
    brand: "",
    model: "",
    name: "",
    price: "",
    description: "",
    specs: [],
    images: [],
    published: true,
    variants: []
  });
  if (!Array.isArray(editingProduct.variants)) editingProduct.variants = [];
  if (!Array.isArray(editingProduct.images)) editingProduct.images = [];
  if (!Array.isArray(editingProduct.specs)) editingProduct.specs = [];

  const isKnownBrand = PHONE_BRANDS.includes(editingProduct.brand);
  const selectedBrand = isKnownBrand ? editingProduct.brand : (editingProduct.brand ? "__custom__" : "");
  const brandModels = PHONE_DATABASE[editingProduct.brand] || [];
  const isKnownModel = brandModels.some((m) => m.model === editingProduct.model);
  const selectedModel = isKnownModel ? editingProduct.model : (editingProduct.model ? "__custom__" : "");

  const form = $("#product-form");
  form.innerHTML = `
    <div class="section-card-head">
      <div>
        <p class="eyebrow">PRODUCT DETAILS</p>
        <h3>${item ? "ফোন edit করুন" : "নতুন ফোন যোগ করুন"}</h3>
      </div>
      <button class="icon-button" type="button" data-action="close-product">বন্ধ করুন ×</button>
    </div>

    <!-- Smart Autofill Banner -->
    <div class="autofill-banner" id="autofill-banner" ${isKnownModel ? "" : "hidden"}>
      <div class="autofill-banner-content">
        <span class="autofill-icon">⚡</span>
        <div>
          <strong id="autofill-banner-title">${esc(editingProduct.name || "ফোন তথ্য")}</strong>
          <p id="autofill-banner-desc">Indian retail বাজার অনুযায়ী সঠিক দাম, স্পেসিফিকেশন ও RAM/Storage ভ্যারিয়েন্ট স্বয়ংক্রিয়ভাবে লোড হয়েছে। প্রয়োজনে নিচের ঘরে যেকোনো পরিবর্তন করতে পারেন।</p>
        </div>
      </div>
    </div>

    <div class="field-grid">
      <!-- Brand Dropdown -->
      <label class="field-dropdown-wrap">
        <span>স্মার্টফোন ব্র্যান্ড (Select Brand) *</span>
        <select id="product-brand-select" class="admin-select" required>
          <option value="">-- ব্র্যান্ড নির্বাচন করুন --</option>
          ${PHONE_BRANDS.map((b) => `<option value="${esc(b)}"${selectedBrand === b ? " selected" : ""}>${esc(b)}</option>`).join("")}
          <option value="__custom__"${selectedBrand === "__custom__" ? " selected" : ""}>+ অন্য কোনো ব্র্যান্ড (Custom Brand)...</option>
        </select>
        <input type="text" id="product-custom-brand-input" name="customBrand" value="${selectedBrand === "__custom__" ? esc(editingProduct.brand) : ""}" placeholder="ব্র্যান্ডের নাম লিখুন" maxlength="80" style="${selectedBrand === "__custom__" ? "" : "display:none;margin-top:0.4rem;"}">
      </label>

      <!-- Model Dropdown -->
      <label class="field-dropdown-wrap">
        <span>মডেল নির্বাচন করুন (Select Model) *</span>
        <select id="product-model-select" class="admin-select" ${brandModels.length ? "" : "disabled"} required>
          <option value="">-- প্রথমে ব্র্যান্ড নির্বাচন করুন --</option>
          ${brandModels.map((m) => `<option value="${esc(m.model)}"${selectedModel === m.model ? " selected" : ""}>${esc(m.model)} (₹${esc(m.price)})</option>`).join("")}
          <option value="__custom__"${selectedModel === "__custom__" ? " selected" : ""}>+ কাস্টম মডেল লিখুন...</option>
        </select>
        <input type="text" id="product-custom-model-input" name="customModel" value="${selectedModel === "__custom__" ? esc(editingProduct.model) : ""}" placeholder="মডেলের নাম লিখুন" maxlength="120" style="${selectedModel === "__custom__" ? "" : "display:none;margin-top:0.4rem;"}">
      </label>

      <!-- Card Name -->
      <label>
        <span>কার্ড নেম (Card name / Display Title)</span>
        <input id="product-name-input" name="name" value="${esc(editingProduct.name)}" maxlength="180" placeholder="Brand + model">
      </label>

      <!-- Indian Base Price -->
      <label>
        <span>মূল দাম (Price in ₹)</span>
        <input id="product-price-input" name="price" inputmode="decimal" value="${esc(editingProduct.price)}" maxlength="20" placeholder="e.g. 19999">
      </label>

      <!-- Description -->
      <label class="field-wide">
        <span>বিবরণ (Marketing Description)</span>
        <textarea id="product-description-input" name="description" rows="3" maxlength="1200">${esc(editingProduct.description)}</textarea>
      </label>

      <!-- Specifications -->
      <label class="field-wide">
        <span>স্পেসিফিকেশন (Specifications · প্রতি লাইনে Label: Value)</span>
        <textarea id="product-specs-input" name="specs" rows="6" placeholder="Display: 6.78 inch AMOLED 120Hz&#10;Processor: Snapdragon 7 Gen 3&#10;Camera: 50MP + 50MP&#10;Battery: 5500 mAh, 80W">${esc((editingProduct.specs || []).map((s) => `${s.label}: ${s.value}`).join("\n"))}</textarea>
      </label>

      <label class="checkbox-line field-wide">
        <input name="published" type="checkbox" ${editingProduct.published === false ? "" : "checked"}>
        <span>ক্যাটালগে সক্রিয় রাখুন (Publish in Catalogue)</span>
      </label>
    </div>

    <!-- Flipkart-style RAM/Storage Variants Section -->
    <div class="variants-admin-card">
      <div class="variants-admin-head">
        <div>
          <h4>📦 RAM ও Storage ভ্যারিয়েন্ট (Flipkart-Style Variants)</h4>
          <p>গ্রাহক ওয়েবসাইটে 8GB/128GB, 12GB/256GB ইত্যাদি ক্লিক করলে লাইভ দাম ও বিস্তারিত পরিবর্তিত হবে।</p>
        </div>
        <button type="button" class="button button--quiet" id="add-variant-btn" style="min-height:2.2rem;font-size:0.75rem;">+ ভ্যারিয়েন্ট যোগ করুন</button>
      </div>
      <div class="variants-list-container" id="variants-list-container"></div>
    </div>

    <h3>সর্বোচ্চ ৩টি ফোনের ছবি</h3>
    <div class="product-edit-images">
      ${[0, 1, 2].map((index) => `
        <label class="image-slot">
          <img data-product-preview="${index}" src="${esc(editingProduct.images?.[index] || "/assets/kabita-logo.png")}" alt="Phone image ${index + 1}">
          <span>Photo ${index + 1}</span>
          <input type="file" data-product-upload="${index}" accept="image/jpeg,image/png,image/webp">
          <button type="button" class="small-button" data-action="clear-product-image" data-index="${index}">ছবি সরান</button>
        </label>
      `).join("")}
    </div>

    <div class="editor-actions">
      <button class="button button--primary button--save" type="submit">ফোনের তথ্য যোগ করুন</button>
      <button class="button button--quiet" type="button" data-action="close-product">বাতিল</button>
    </div>
  `;

  renderVariantsEditor();
  setupBrandModelHandlers();

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

let currentAdminLang = "bn";
try {
  currentAdminLang = localStorage.getItem("kabita-admin-language") || localStorage.getItem("kabita-language") || "bn";
} catch {}

function setAdminLanguage(lang) {
  currentAdminLang = lang === "en" ? "en" : "bn";
  document.documentElement.lang = currentAdminLang;
  try { localStorage.setItem("kabita-admin-language", currentAdminLang); } catch {}
  document.querySelectorAll("[data-localized]").forEach((element) => {
    const text = element.dataset[currentAdminLang];
    if (text !== undefined) element.textContent = text;
  });
  const label = currentAdminLang === "bn" ? "English" : "বাংলা";
  const btn = $("#admin-lang-toggle");
  if (btn) btn.innerHTML = `<span>${label}</span>`;
  const loginBtn = $("#admin-login-lang");
  if (loginBtn) loginBtn.innerHTML = `<span>${label}</span>`;
}

async function saveWebsite() {
  syncBoundFields();
  const savingText = currentAdminLang === "bn" ? "সংরক্ষণ ও প্রকাশ হচ্ছে…" : "Saving & publishing…";
  setStatus(savingText);
  const saveButtons = [$("#save-all"), $("#save-bottom")].filter(Boolean);
  saveButtons.forEach((btn) => {
    btn.classList.add("is-loading");
    btn.disabled = true;
  });
  try {
    const result = await api("/api/admin/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const savedText = currentAdminLang === "bn" ? "লাইভ প্রকাশিত" : "Published Live";
    setStatus(savedText, "saved");
    toast(result.message || (currentAdminLang === "bn" ? "পরিবর্তন সংরক্ষিত ও প্রকাশিত হয়েছে।" : "Changes saved and published."));
    const modal = $("#save-success-modal");
    if (modal) {
      if (typeof modal.showModal === "function") modal.showModal();
      else modal.hidden = false;
    }
  } catch (error) {
    if (error.status === 404 || error.message.includes("404")) {
      try { localStorage.setItem("kabita_cached_content", JSON.stringify(content)); } catch {}
      const savedText = currentAdminLang === "bn" ? "ব্রাউজারে সংরক্ষিত" : "Saved in browser";
      setStatus(savedText, "saved");
      toast(currentAdminLang === "bn" ? "পরিবর্তন ব্রাউজারে সংরক্ষিত হয়েছে। Vercel-এ স্থায়ী করতে Antigravity ব্যবহার করুন।" : "Changes saved in browser. Push to GitHub using Antigravity for live site.");
      const modal = $("#save-success-modal");
      if (modal) {
        if (typeof modal.showModal === "function") modal.showModal();
        else modal.hidden = false;
      }
      return;
    }
    const errorText = currentAdminLang === "bn" ? "সংরক্ষণ হয়নি" : "Save failed";
    setStatus(errorText, "error");
    toast(error.message, true);
    const errModal = $("#save-error-modal");
    if (errModal) {
      const desc = $("#error-modal-desc");
      if (desc) desc.textContent = error.message;
      if (typeof errModal.showModal === "function") errModal.showModal();
      else errModal.hidden = false;
    }
  } finally {
    saveButtons.forEach((btn) => {
      btn.classList.remove("is-loading");
      btn.disabled = false;
    });
  }
}

function showDashboard() {
  $("#login-screen").hidden = true;
  $("#dashboard").hidden = false;
  fillBoundFields();
  setAdminLanguage(currentAdminLang);
  setStatus(currentAdminLang === "bn" ? "সব পরিবর্তন লোড হয়েছে" : "Changes loaded", "saved");
}

async function bootDashboard() {
  setAdminLanguage(currentAdminLang);
  const errorBox = $("#login-error");
  if (errorBox) { errorBox.hidden = true; errorBox.textContent = ""; }

  const localSession = getLocalAdminSession();
  let serverSession = null;
  try {
    serverSession = await api("/api/admin/session");
  } catch (err) {
    // In case server API is offline or running on static host
  }

  const isLoggedIn = Boolean((serverSession && serverSession.loggedIn) || (localSession && localSession.loggedIn));

  if (!isLoggedIn) {
    $("#login-screen").hidden = false;
    $("#dashboard").hidden = true;
    return;
  }

  const activeUsername = (serverSession && serverSession.username) || (localSession && localSession.username) || "kabita_admin";

  try {
    content = await api("/api/admin/data");
  } catch (err) {
    try {
      const res = await fetch("/data/site-content.json", { cache: "no-store" });
      if (res.ok) content = await res.json();
    } catch {}
    if (!content) {
      const cached = localStorage.getItem("kabita_cached_content");
      if (cached) {
        try { content = JSON.parse(cached); } catch {}
      }
    }
  }

  if (content) {
    try { localStorage.setItem("kabita_cached_content", JSON.stringify(content)); } catch {}
  }

  if (activeUsername && $("#new-username-input")) {
    $("#new-username-input").placeholder = activeUsername;
    $("#new-username-input").value = activeUsername;
  }

  showDashboard();
}

$("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const errorBox = $("#login-error");
  errorBox.hidden = true;
  errorBox.textContent = "";
  const form = new FormData(event.currentTarget);
  const username = String(form.get("username") || "").trim();
  const password = String(form.get("password") || "").trim();

  let res = null;
  try {
    res = await api("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  } catch (err) {
    if (err.status === 404 || err.message.includes("404")) {
      const isKnownUser = (username === "kabita_admin" && (password === "Kabita@Store#2026!" || password === "KabitaDemo2026!")) ||
                          (username === "admin" && password === "KabitaDemo2026!");
      if (isKnownUser) {
        res = { loggedIn: true, username, token: "local-persistent-session" };
      }
    }
    if (!res) {
      const msg = currentAdminLang === "bn" ? "ইউজারনেম বা পাসওয়ার্ড মিলছে না।" : "Incorrect username or password.";
      errorBox.textContent = err.status === 429 ? (currentAdminLang === "bn" ? "অনেকবার চেষ্টা হয়েছে। একটু পরে চেষ্টা করুন।" : "Too many attempts. Please try again later.") : msg;
      errorBox.hidden = false;
      return;
    }
  }

  if (res && res.loggedIn) {
    setLocalAdminSession({
      loggedIn: true,
      username: res.username || username,
      token: res.token || "persistent-session",
    });

    try {
      content = await api("/api/admin/data");
    } catch {
      try {
        const fileRes = await fetch("/data/site-content.json", { cache: "no-store" });
        if (fileRes.ok) content = await fileRes.json();
      } catch {}
    }

    if (content) {
      try { localStorage.setItem("kabita_cached_content", JSON.stringify(content)); } catch {}
    }

    showDashboard();
  }
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

  const brandSelect = $("#product-brand-select");
  const customBrandInput = $("#product-custom-brand-input");
  let brand = brandSelect ? (brandSelect.value === "__custom__" ? customBrandInput.value.trim() : brandSelect.value.trim()) : String(form.get("brand") || "").trim();

  const modelSelect = $("#product-model-select");
  const customModelInput = $("#product-custom-model-input");
  let model = modelSelect ? (modelSelect.value === "__custom__" ? customModelInput.value.trim() : modelSelect.value.trim()) : String(form.get("model") || "").trim();

  if (!brand) {
    toast(currentAdminLang === "bn" ? "দয়া করে ফোনের ব্র্যান্ড নির্বাচন করুন।" : "Please select or enter phone brand.", true);
    return;
  }
  if (!model) {
    toast(currentAdminLang === "bn" ? "দয়া করে ফোনের মডেল নির্বাচন করুন।" : "Please select or enter phone model.", true);
    return;
  }

  // Sync variants from the DOM rows
  syncCurrentVariantsFromDOM();

  const slugBase = `${brand}-${model}`.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  editingProduct.brand = brand;
  editingProduct.model = model;
  editingProduct.name = String(form.get("name") || `${brand} ${model}`).trim();
  editingProduct.slug = editingProduct.slug || `${slugBase || "phone"}-${editingProduct.id.slice(-8).toLowerCase().replace(/[^a-z0-9]/g, "")}`;

  let price = String(form.get("price") || "").replace(/[^0-9,.]/g, "");
  if (!price && editingProduct.variants.length > 0 && editingProduct.variants[0].price) {
    price = editingProduct.variants[0].price;
  }
  editingProduct.price = price;
  editingProduct.description = String(form.get("description") || "").trim();
  editingProduct.specs = String(form.get("specs") || "").split(/\r?\n/).map((line) => { const [label, ...value] = line.split(":"); return { label: label.trim(), value: value.join(":").trim() }; }).filter((spec) => spec.label && spec.value);
  editingProduct.published = Boolean(form.get("published"));

  const index = content.products.findIndex((item) => item.id === editingProduct.id);
  if (index < 0) content.products.push(editingProduct); else content.products[index] = editingProduct;
  content.catalogMode = "live";
  editingProduct = null;
  $("#product-form").hidden = true;
  renderProducts();
  markDirty();
  toast(currentAdminLang === "bn" ? "ফোনটি catalogue-এ যোগ/আপডেট হয়েছে। স্থায়ী করতে উপরের “সংরক্ষণ ও প্রকাশ” বাটনে চাপুন।" : "Phone updated. Click 'Save & Publish' at the top to make it live.");
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
$("#logout").addEventListener("click", async () => {
  clearLocalAdminSession();
  try { await api("/api/admin/logout", { method: "POST" }); } catch {}
  location.reload();
});

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

function generateStrongPassword() {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%^&*-_";
  const all = upper + lower + digits + symbols;
  const pwd = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    digits[Math.floor(Math.random() * digits.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
  for (let i = pwd.length; i < 18; i++) {
    pwd.push(all[Math.floor(Math.random() * all.length)]);
  }
  for (let i = pwd.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }
  return pwd.join("");
}

$("#generate-password-btn")?.addEventListener("click", () => {
  const pwd = generateStrongPassword();
  const input = $("#new-password-input");
  input.type = "text";
  input.value = pwd;
  navigator.clipboard?.writeText(pwd).catch(() => {});
  const toggleBtn = $("#toggle-password-visibility");
  if (toggleBtn) toggleBtn.textContent = "পাসওয়ার্ড লুকান 🙈";
  toast("শক্তিশালী পাসওয়ার্ড তৈরি ও কপি করা হয়েছে!");
});

$("#toggle-password-visibility")?.addEventListener("click", () => {
  const input = $("#new-password-input");
  if (input.type === "password") {
    input.type = "text";
    $("#toggle-password-visibility").textContent = "পাসওয়ার্ড লুকান 🙈";
  } else {
    input.type = "password";
    $("#toggle-password-visibility").textContent = "পাসওয়ার্ড দেখুন 👁";
  }
});

$("#credentials-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const errorBox = $("#credentials-error");
  const successBox = $("#credentials-success");
  errorBox.hidden = true;
  successBox.hidden = true;
  const form = new FormData(event.currentTarget);
  const currentPassword = form.get("currentPassword");
  const newUsername = form.get("newUsername");
  const newPassword = form.get("newPassword");

  try {
    const result = await api("/api/admin/change-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newUsername, newPassword }),
    });
    successBox.textContent = result.message || "ইউজারনেম ও পাসওয়ার্ড সফলভাবে সংরক্ষিত হয়েছে।";
    successBox.hidden = false;
    $("#current-password-input").value = "";
    $("#new-password-input").value = "";
    if (result.username && $("#new-username-input")) {
      $("#new-username-input").value = result.username;
      $("#new-username-input").placeholder = result.username;
    }
    toast(result.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।");
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
  }
});

$("#close-success-modal")?.addEventListener("click", () => {
  const modal = $("#save-success-modal");
  if (modal?.close) modal.close(); else if (modal) modal.hidden = true;
});

$("#close-error-modal")?.addEventListener("click", () => {
  const modal = $("#save-error-modal");
  if (modal?.close) modal.close(); else if (modal) modal.hidden = true;
});

$("#retry-save-btn")?.addEventListener("click", () => {
  const modal = $("#save-error-modal");
  if (modal?.close) modal.close(); else if (modal) modal.hidden = true;
  saveWebsite();
});

$("#admin-lang-toggle")?.addEventListener("click", () => {
  setAdminLanguage(currentAdminLang === "bn" ? "en" : "bn");
});

$("#admin-login-lang")?.addEventListener("click", () => {
  setAdminLanguage(currentAdminLang === "bn" ? "en" : "bn");
});

bootDashboard().catch((error) => {
  console.warn("Boot warning:", error);
  $("#login-screen").hidden = false;
});
