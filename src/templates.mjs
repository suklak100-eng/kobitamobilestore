import {
  authorizedBrands,
  business,
  catalogMode,
  financePartners,
  heroContent,
  hoursByDay,
  managedPosts,
  otherFeaturedBrands,
  privacySections,
  products,
  reviews,
  samples,
  shopClaims,
} from "./data/site.mjs";

const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

const icon = (name) => {
  const paths = {
    arrow: '<path d="M4 12h15M13 5l7 7-7 7"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M10 18h4"/>',
    chat: '<path d="M20 11.5a7.5 7.5 0 0 1-11.1 6.6L4 19l1.1-4.4A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8.8 9.1c.4 1.7 1.8 3 3.5 3.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.arrow}</svg>`;
};

const whatsappIcon = () => `<svg viewBox="0 0 24 24" aria-label="WhatsApp" role="img"><path fill="currentColor" fill-rule="evenodd" d="M20.52 3.48A11.85 11.85 0 0 0 12.08 0C5.49 0 .13 5.36.13 11.95c0 2.1.55 4.17 1.6 5.99L.03 24l6.2-1.63a11.9 11.9 0 0 0 5.84 1.53h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.19-3.51-8.47ZM12.08 21.84h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.68.97.98-3.59-.24-.37a9.88 9.88 0 0 1-1.52-5.3c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.89 9.88Zm5.42-7.39c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.23 5.14 4.53.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z"/></svg>`;

const openMap = (label = "Get directions") => `<a class="text-link" href="${esc(business.map)}" target="_blank" rel="noopener noreferrer">${label} ${icon("arrow")}</a>`;
const callLink = (label = `Call ${business.phone}`) => `<a class="button button--orange" href="${esc(business.tel)}">${icon("phone")}<span>${esc(label)}</span></a>`;
const googleReviewButton = () => `<a class="button button--review" href="${esc(business.reviewWriteLink)}" target="_blank" rel="noopener noreferrer" aria-label="Write a review on Google"><span class="review-google-mark" aria-hidden="true">G</span><span>Write a Google review</span>${icon("arrow")}</a>`;
const whatsappUrl = () => business.whatsappNumber ? `https://wa.me/${encodeURIComponent(String(business.whatsappNumber).replace(/\D/g, ""))}?text=${encodeURIComponent(business.whatsappMessage || "আসসালামু আলাইকুম, KABITA MOBILE STORES থেকে একটি মোবাইল সম্পর্কে জানতে চাই।")}` : "";
const whatsappWidget = () => whatsappUrl() ? `<a class="whatsapp-float" href="${esc(whatsappUrl())}" target="_blank" rel="noopener noreferrer" aria-label="Ask about phones on WhatsApp"><span class="whatsapp-icon">${whatsappIcon()}</span><span class="whatsapp-copy"><strong data-localized data-en="Ask about a phone" data-bn="ফোনের খোঁজ নিন">Ask about a phone</strong><small data-localized data-en="Message us on WhatsApp" data-bn="WhatsApp-এ মেসেজ করুন">Message us on WhatsApp</small></span></a>` : "";
const breadcrumb = (items) => `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items.map((item, index) => `<li>${item.href ? `<a href="${esc(item.href)}">${esc(item.label)}</a>` : `<span aria-current="page">${esc(item.label)}</span>`}${index < items.length - 1 ? `<span class="breadcrumb-separator" aria-hidden="true">/</span>` : ""}</li>`).join("")}</ol></nav>`;
const tag = (text, cls = "") => `<span class="eyebrow ${cls}">${esc(text)}</span>`;
const pageHeading = (eyebrow, title, intro = "") => `<header class="page-heading">${tag(eyebrow)}<h1>${title}</h1>${intro ? `<p class="page-intro">${intro}</p>` : ""}</header>`;
const brandMarks = (brands, className = "brand-list") => `<ul class="${className}">${brands.map((brand, i) => `<li class="brand-mark brand-mark--${i + 1}">${esc(brand)}</li>`).join("")}</ul>`;

function navLink(href, text, active, prefix = false) {
  const current = active === href || (prefix && active.startsWith(href));
  return `<a href="${href}"${current ? ' aria-current="page"' : ""}>${text}</a>`;
}

function header(activePath) {
  const links = [
    navLink("/", "Home", activePath),
    navLink("/catalog/", "Browse phones", activePath, true),
    navLink("/about/", "Our shop", activePath),
    navLink("/posts/", "Stories", activePath, true),
    navLink("/contact/", "Visit", activePath),
  ].join("");
  return `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="utility-bar">
      <div class="utility-inner wrap">
        <a class="utility-location" href="${esc(business.map)}" target="_blank" rel="noopener noreferrer">${icon("pin")}<span>${esc(business.addressShort)}</span></a>
        <span class="utility-hours">${icon("clock")}<span>${esc(business.hours)}</span></span>
      </div>
    </div>
    <header class="site-header">
      <div class="header-inner wrap">
        <a class="brand-lockup" href="/" aria-label="${esc(business.name)} home">
          <img src="${esc(business.logo)}" width="512" height="512" alt="" fetchpriority="high">
          <span class="brand-wordmark"><strong>KABITA</strong><span>MOBILE STORES</span></span>
        </a>
        <nav class="primary-navigation" id="primary-navigation" aria-label="Primary navigation">
          ${links}
        </nav>
        <div class="header-tools" aria-label="Display preferences">
          <button class="preference-button language-toggle" id="language-toggle" type="button" aria-label="Switch language to Bengali" title="বাংলা"><span aria-hidden="true">বাংলা</span></button>
          <button class="preference-button theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Dark mode" aria-pressed="false"><svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.7 8.7 0 1 0 20.4 15.2Z"/></svg><svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg><span class="sr-only" data-theme-action>Dark mode</span></button>
        </div>
        <button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false">
          <span class="menu-icon" aria-hidden="true"><i></i><i></i></span><span>Menu</span>
        </button>
        <div class="header-actions">${callLink("Call the store")}</div>
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-main wrap">
        <div class="footer-brand">
          <a class="brand-lockup brand-lockup--footer" href="/" aria-label="${esc(business.name)} home">
            <img src="${esc(business.logo)}" width="512" height="512" alt="" loading="lazy">
            <span class="brand-wordmark"><strong>KABITA</strong><span>MOBILE STORES</span></span>
          </a>
          <p class="footer-bengali" data-localized data-en="Branded phones · Easy finance (EMI)." data-bn="ব্র্যান্ডেড মোবাইল · সহজ ফাইন্যান্স (EMI)।">Branded phones · Easy finance (EMI).</p>
          <p class="footer-small">A local mobile phone shop in Bithari, West Bengal.</p>
        </div>
        <div class="footer-column">
          <h2>Explore</h2>
          <ul>
            <li><a href="/catalog/">Browse phones</a></li>
            <li><a href="/about/">About the shop</a></li>
            <li><a href="/gallery/">Photo gallery</a></li>
            <li><a href="/posts/">Stories & updates</a></li>
            <li><a href="/privacy-policy/">Privacy policy</a></li>
          </ul>
        </div>
        <div class="footer-column footer-contact">
          <h2>Come by</h2>
          <address>${esc(business.address)}</address>
          <a href="${esc(business.tel)}">${esc(business.phone)}</a>
          ${openMap("Directions on Google Maps")}
          <p>Open ${esc(business.hours.toLowerCase())}</p>
        </div>
      </div>
      <div class="footer-bottom wrap">
        <span>© ${new Date().getFullYear()} ${esc(business.name)}</span>
        <span>Made for the next visit.</span>
      </div>
    </footer>`;
}

function lightbox() {
  return `<dialog class="lightbox" id="lightbox" aria-label="Shop photo viewer">
    <div class="lightbox-shell">
      <div class="lightbox-top"><p id="lightbox-count" aria-live="polite"></p><button class="lightbox-close" type="button" data-lightbox-close aria-label="Close photo viewer">Close <span aria-hidden="true">×</span></button></div>
      <div class="lightbox-photo-wrap">
        <button class="lightbox-arrow lightbox-prev" type="button" data-lightbox-prev aria-label="Previous photo">←</button>
        <img id="lightbox-image" src="" width="900" height="900" alt="">
        <button class="lightbox-arrow lightbox-next" type="button" data-lightbox-next aria-label="Next photo">→</button>
      </div>
      <p class="lightbox-caption" id="lightbox-caption"></p>
    </div>
  </dialog>`;
}

function photoImage(photo, index, { className = "", loading = "lazy", linked = false, count = 168 } = {}) {
  if (!photo) return `<div class="photo-frame ${className}" aria-hidden="true"></div>`;
  const alt = photo.alt || `KABITA MOBILE STORES business photo ${index + 1}`;
  const image = `<img src="${esc(photo.src)}" width="${photo.width ?? 900}" height="${photo.height ?? 900}" alt="${esc(alt)}" loading="${loading}" decoding="async">`;
  if (!linked) return `<div class="photo-frame ${className}">${image}</div>`;
  return `<a class="photo-frame ${className}" href="${esc(photo.src)}" data-gallery-item data-gallery-index="${index}" data-gallery-alt="${esc(alt)}" aria-label="Open photo ${index + 1} of ${count}">${image}<span class="photo-index">${String(index + 1).padStart(2, "0")}</span></a>`;
}

function contactBand(title = "A phone question?", body = "Tell us what you have in mind. The shop can help with current models, prices and availability.") {
  return `<section class="contact-band">
    <div class="contact-band-copy"><p class="eyebrow">${esc(business.name)}</p><h2>${title}</h2><p>${body}</p></div>
    <div class="contact-band-actions">${callLink("Call the shop")}<a class="button button--outline" href="/contact/">Visit & directions ${icon("arrow")}</a></div>
  </section>`;
}

function home(photos) {
  const heroPhoto = heroContent.image ? { src: heroContent.image, width: 1200, height: 1400 } : photos[2];
  const previewIndexes = [0, 3, 5, 6];
  const local = (english, bengali, className = "") => `<span class="${className}" data-localized data-en="${esc(english)}" data-bn="${esc(bengali)}">${esc(english)}</span>`;
  return `
    <main id="main-content">
      <section class="hero wrap">
        <div class="hero-copy">
          <span class="eyebrow eyebrow--orange"><span data-localized data-en="${esc(heroContent.eyebrow)}" data-bn="${esc(heroContent.eyebrowBn || "বিথারি · পশ্চিমবঙ্গ")}">${esc(heroContent.eyebrow)}</span></span>
          <h1>${local(heroContent.titleLead, heroContent.titleLeadBn || "ভালো একটি ফোন,")}<br><em>${local(heroContent.titleAccent, heroContent.titleAccentBn || "পাশেই আছে")}</em><br>${local(heroContent.titleEnd, heroContent.titleEndBn || "আপনার জন্য।")}</h1>
          <p class="hero-lede" data-localized data-en="${esc(heroContent.lede)}" data-bn="${esc(heroContent.ledeBn || "সঠিক ফোন বেছে নিতে সরাসরি কথা বলুন। KABITA MOBILE STORES-এ আসুন।")}">${esc(heroContent.lede)}</p>
          <p class="hero-bengali" data-localized data-en="${esc(heroContent.supportingEn || "Branded mobile phones · Easy finance (EMI) · 100% original products.")}" data-bn="${esc(heroContent.supportingBn || heroContent.bengali || "ব্র্যান্ডেড মোবাইল · সহজ ফাইন্যান্স (EMI) · ১০০% অরিজিনাল প্রোডাক্ট।")}">${esc(heroContent.supportingEn || "Branded mobile phones · Easy finance (EMI) · 100% original products.")}</p>
          <div class="hero-actions"><a class="button button--blue" href="/catalog/">Explore the catalogue ${icon("arrow")}</a><a class="text-link" href="/contact/">Plan your visit</a></div>
          <div class="hero-proof"><div class="proof-score"><span class="proof-stars" aria-hidden="true">★★★★★</span><strong>${esc(business.reviewScore)}<small>/5</small></strong></div><a href="${esc(business.reviewLink)}" target="_blank" rel="noopener noreferrer">${esc(business.reviewCount)} Google reviews</a></div>
        </div>
        <div class="hero-visual">
          ${photoImage(heroPhoto, 2, { className: "hero-photo", loading: "eager" })}
          <div class="hero-photo-label"><span>At the storefront</span><strong>BITHARI<br>WEST BENGAL</strong></div>
          <div class="hero-seal"><span>LOCAL<br>ADVICE</span><span class="seal-dot" aria-hidden="true"></span><span>REAL<br>AFTER-CARE</span></div>
          <div class="hero-index" aria-hidden="true">01 <span>/</span> 04</div>
        </div>
      </section>

      <section class="brand-ribbon" aria-labelledby="brand-ribbon-title">
        <div class="wrap brand-ribbon-inner"><div><p class="eyebrow" id="brand-ribbon-title">Authorised dealer</p><p class="ribbon-note">As listed by the shop</p></div>${brandMarks(authorizedBrands, "brand-list brand-list--ribbon")}</div>
      </section>

      <section class="section wrap offer-section">
        <div class="section-heading section-heading--split">
          <div>${tag("A little more than a phone")}<h2>Help that starts<br>before the unboxing.</h2></div>
          <p>From comparing options to asking about exchange or finance, get clear answers directly from the people at the shop.</p>
        </div>
        <div class="offer-grid">
          <a class="offer-card offer-card--large" href="/catalog/"><span class="offer-number">01</span><div><h3>Choose with confidence</h3><p>Ask about current models from the brands listed by the shop and what fits your needs.</p></div><span class="offer-mark" aria-hidden="true">↗</span><span class="sr-only">Browse phones</span></a>
          <a class="offer-card offer-card--orange" href="/about/#finance-partners"><span class="offer-number">02</span><div><h3>Ask about EMI</h3><p>Finance partners appear on the original site. Plans, eligibility and terms need to be confirmed with the shop.</p></div><span class="offer-mark" aria-hidden="true">+</span><span class="sr-only">View finance partners and ask the shop</span></a>
          <a class="offer-card offer-card--blue" href="/about/#services"><span class="offer-number">03</span><div><h3>Exchange & after-sales</h3><p>The shop lists old-phone exchange and after-sales service. Call to ask what applies to your device.</p></div><span class="offer-mark" aria-hidden="true">↔</span><span class="sr-only">View services listed by the shop</span></a>
        </div>
        <p class="fine-print">Prices, finance terms, exchange values and stock can change. Please confirm details with the shop.</p>
      </section>

      <section class="section gallery-teaser" aria-labelledby="gallery-title">
        <div class="wrap">
          <div class="section-heading section-heading--split"><div>${tag("Inside the shop")}<h2 id="gallery-title">A closer look at<br>the everyday.</h2></div><a class="text-link" href="/gallery/">View all ${photos.length} photos ${icon("arrow")}</a></div>
          <div class="teaser-grid">${previewIndexes.map((index, order) => photoImage(photos[index], index, { className: `teaser-photo teaser-photo--${order + 1}`, loading: order === 0 ? "lazy" : "lazy" })).join("")}
            <a class="teaser-note" href="/gallery/"><span class="eyebrow">The photo archive</span><strong>${photos.length}<br>photos</strong><span>Browse the full gallery ${icon("arrow")}</span></a>
          </div>
        </div>
      </section>

      <section class="section wrap reviews-section">
          <div class="review-summary"><p class="eyebrow">From Google reviews</p><div class="review-score-line"><strong>${esc(business.reviewScore)}</strong><span>/ 5</span></div><span class="proof-stars" aria-hidden="true">★★★★★</span><p>Based on ${esc(business.reviewCount)} public reviews</p><a class="button button--ink" href="${esc(business.reviewLink)}" target="_blank" rel="noopener noreferrer">Read reviews on Google ${icon("arrow")}</a>${googleReviewButton()}</div>
        <div class="review-quotes"><div class="section-heading section-heading--compact"><div>${tag("A few words from customers")}<h2>Kind words,<br>in their words.</h2></div></div><div class="review-grid">${reviews.slice(0, 3).map((review) => `<figure class="review-card"><blockquote lang="en">“${esc(review.quote)}”</blockquote><figcaption lang="en"><strong>${esc(review.name)}</strong><span>${esc(review.date)}</span></figcaption></figure>`).join("")}</div></div>
      </section>

      <section class="section wrap updates-section">
        <div class="updates-label"><p class="eyebrow">From the shop</p><h2>Notes &<br>updates.</h2><a class="text-link" href="/posts/">All stories ${icon("arrow")}</a></div>
        ${managedPosts[0] ? `<a class="post-preview" href="/posts/${encodeURIComponent(managedPosts[0].slug)}/"><span class="post-date">${esc(managedPosts[0].dateLabel)}</span><h3 lang="bn">${esc(managedPosts[0].title)}</h3><p lang="bn">${esc((managedPosts[0].lines || []).slice(0, 2).join(" "))}</p><span class="post-read">Read the post ${icon("arrow")}</span></a>` : `<div class="post-preview"><span class="post-date">Updates</span><h3>New stories coming soon.</h3><p>Call the shop for the latest offers and phone availability.</p></div>`}
      </section>

      <div class="wrap">${contactBand("Let’s find the right fit.")}</div>
    </main>`;
}

function about(photos) {
  return `<main id="main-content" class="wrap page-main">
    ${breadcrumb([{ href: "/", label: "Home" }, { label: "About" }])}
    ${pageHeading("About the shop", "Local knowledge.<br><em>Everyday tech.</em>", "KABITA MOBILE STORES is a mobile phone shop in Bithari. The original site lists branded phones, easy finance, exchange and after-sales service.")}
    <section class="about-lead">
      <div class="about-lead-copy"><p class="eyebrow">The shop’s own description</p><h2>Good options.<br>Helpful answers.</h2><p class="about-bengali" data-localized data-en="Branded mobile phones. Easy finance (EMI). 100% original products. After-sales support. Old phone exchange." data-bn="সমস্ত ব্র্যান্ডেড মোবাইল। সহজ ফাইন্যান্স (EMI)। ১০০% অরিজিনাল প্রোডাক্ট। বেস্ট আফটার সেল সার্ভিস। পুরোনো মোবাইল এক্সচেঞ্জ।">Branded mobile phones. Easy finance (EMI). 100% original products. After-sales support. Old phone exchange.</p><p>Call or visit to ask about current models, pricing, finance eligibility, exchange value and service details. The information here reflects what is listed on the current public website.</p><a class="text-link" href="/contact/">Contact the shop ${icon("arrow")}</a></div>
      ${photoImage(photos[5], 5, { className: "about-lead-photo" })}
    </section>
    <section class="section about-brands">
      <div class="section-heading section-heading--split"><div>${tag("Listed brand relationships")}<h2>Brand names,<br>clearly shown.</h2></div><p>The original site identifies these as authorised dealers. It also features several other brands in a 2025 post; those brands are not marked as authorised dealers here.</p></div>
      <div class="brand-group"><h3>Authorised dealer, as listed</h3>${brandMarks(authorizedBrands, "brand-list brand-list--large")}</div>
      <div class="brand-group brand-group--secondary"><h3>Also featured in a 2025 post</h3>${brandMarks(otherFeaturedBrands, "brand-list brand-list--large")}</div>
    </section>
    <section class="section partner-panel" id="finance-partners"><div>${tag("Finance partners listed")}</div><div>${brandMarks(financePartners, "partner-list")}</div><p>Current schemes, eligibility and terms need to be confirmed with the shop.</p></section>
    <section class="section claim-list-section" id="services"><div class="section-heading section-heading--split"><div>${tag("What the current listing says")}<h2>Services to<br>ask about.</h2></div><p>These offers come from the existing website. Please confirm current terms before making a purchase decision.</p></div><ul class="claim-list">${shopClaims.map((claim, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${esc(claim)}</li>`).join("")}</ul></section>
    <div class="wrap">${contactBand("Come in and compare.")}</div>
  </main>`;
}

function hoursTable() {
  return `<dl class="hours-list">${hoursByDay.map(([day, hours]) => `<div><dt>${esc(day)}</dt><dd>${esc(hours)}</dd></div>`).join("")}</dl>`;
}

function contact(photos) {
  return `<main id="main-content" class="wrap page-main">
    ${breadcrumb([{ href: "/", label: "Home" }, { label: "Visit" }])}
    ${pageHeading("Contact & directions", "See you in<br><em>Bithari.</em>", "Call with a question or follow directions to the shop. There’s no enquiry form; your device’s phone app handles calls.")}
    <section class="contact-layout">
      <div class="contact-primary"><p class="eyebrow">KABITA MOBILE STORES</p><h2>Find the shop.</h2><address>${esc(business.address)}</address><a class="phone-number" href="${esc(business.tel)}">${esc(business.phone)} ${icon("arrow")}</a><div class="contact-actions">${callLink("Call the shop")}<a class="button button--outline" href="${esc(business.map)}" target="_blank" rel="noopener noreferrer">${icon("pin")}<span>Get directions</span></a></div><p class="contact-note">Directions open Google Maps in a new tab.</p></div>
      <div class="contact-photo">${photoImage(photos[2], 2, { className: "contact-store-photo" })}<span class="photo-caption">KABITA MOBILE STORES · BITHARI</span></div>
    </section>
    <section class="section hours-section"><div class="hours-heading"><p class="eyebrow">Business hours</p><h2>Open every day.</h2><p>Published hours are 8am–10pm, Monday through Sunday.</p></div><div class="hours-card">${hoursTable()}<p>Call during the day if you have a question before visiting.</p></div></section>
    <section class="section contact-help"><div>${tag("Before you visit")}<h2>What to ask about.</h2></div><div class="help-points"><article><h3>Looking for a specific phone?</h3><p>Call to confirm the current model, colour, memory, price and availability.</p></article><article><h3>Asking about EMI or exchange?</h3><p>Eligibility, finance terms and exchange values depend on the device and current offer. Confirm directly with the shop.</p></article></div></section>
    <div class="wrap">${contactBand("Questions are welcome.", "Call the shop about options, pricing, availability or a convenient time to visit.")}</div>
  </main>`;
}

function postCard() {
  return managedPosts.map((item, index) => `<article class="story-card"><a href="/posts/${encodeURIComponent(item.slug)}/" class="story-card-link"><div class="story-art" aria-hidden="true"><span>বাজার</span><span>${String(index + 1).padStart(2, "0")} / ${String(managedPosts.length).padStart(2, "0")}</span><strong>ফোন<br>নিন।</strong></div><div class="story-copy"><time datetime="${esc(item.date)}">${esc(item.dateLabel)}</time><h2 lang="bn">${esc(item.title)}</h2><p lang="bn">${esc((item.lines || []).slice(0, 2).join(" "))}</p><span class="text-link">Read full post ${icon("arrow")}</span></div></a></article>`).join("");
}

function posts() {
  return `<main id="main-content" class="wrap page-main">
    ${breadcrumb([{ href: "/", label: "Home" }, { label: "Stories" }])}
    ${pageHeading("From the shop", "Notes, offers<br><em>& updates.</em>", "Stories and announcements published by KABITA MOBILE STORES.")}
    <section class="stories-list" aria-label="Published posts">${postCard()}</section>
    <p class="end-note">You’ve reached the end of the available updates.</p>
    <div class="wrap">${contactBand("Have something in mind?")}</div>
  </main>`;
}

function postDetail(item) {
  return `<main id="main-content" class="wrap page-main post-detail-main">
    ${breadcrumb([{ href: "/", label: "Home" }, { href: "/posts/", label: "Stories" }, { label: item.title }])}
    <article class="post-article" lang="bn">
      ${tag(`Published · ${item.dateLabel}`)}
      <h1>${esc(item.title)}</h1>
      <div class="post-article-body">${item.lines.map((line, index) => `<p class="post-line post-line--${index + 1}">${esc(line)}</p>`).join("")}</div>
      <p class="post-context" lang="en">This post was published on ${esc(item.dateLabel)}. Brand names and offers do not confirm current stock or current offer terms.</p>
    </article>
    <div class="post-back"><a class="text-link" href="/posts/">← Back to all posts</a><span>Earliest and latest available post</span></div>
    <div class="wrap">${contactBand("Ask about the current range.")}</div>
  </main>`;
}

function privacy() {
  return `<main id="main-content" class="wrap page-main">
    ${breadcrumb([{ href: "/", label: "Home" }, { label: "Privacy policy" }])}
    ${pageHeading("Privacy", "A simple, clear<br><em>privacy policy.</em>", "Draft prepared for this static redesign. The shop owner should review it before launch.")}
    <p class="policy-updated">Draft for the redesigned website · ${new Date().getFullYear()}</p>
    <div class="policy-layout"><nav class="policy-contents" aria-label="On this page"><p class="eyebrow">On this page</p><ol>${privacySections.map((section, index) => `<li><a href="#privacy-${index + 1}">${esc(section.title)}</a></li>`).join("")}</ol></nav><div class="policy-copy">${privacySections.map((section, index) => `<section id="privacy-${index + 1}"><p class="eyebrow">${String(index + 1).padStart(2, "0")}</p><h2>${esc(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</section>`).join("")}<section id="privacy-contact"><p class="eyebrow">Contact</p><h2>Questions?</h2><p>Contact KABITA MOBILE STORES at <a href="${esc(business.tel)}">${esc(business.phone)}</a> or visit the shop at ${esc(business.address)}.</p></section></div></div>
  </main>`;
}

function gallery(photos) {
  return `<main id="main-content" class="wrap page-main gallery-page">
    ${breadcrumb([{ href: "/", label: "Home" }, { label: "Photo gallery" }])}
    ${pageHeading("Photo archive", `The shop,<br><em>in ${photos.length} frames.</em>`, `Browse ${photos.length} photos. Choose one to open the full-size view.`)}
    <div class="gallery-note"><span class="eyebrow">${photos.length} photos</span><p>Shop photos from the original KABITA MOBILE STORES site.</p></div>
    <div class="gallery-grid">${photos.map((photo, index) => photoImage(photo, index, { className: `gallery-photo gallery-photo--${index % 8}`, linked: true, count: photos.length })).join("")}</div>
    ${lightbox()}
  </main>`;
}

function deviceIllustration(sample) {
  return `<div class="device-illustration device-illustration--${esc(sample.color)}" aria-hidden="true"><div class="device-camera"><i></i><i></i><i></i></div><div class="device-glint"></div><span>${esc(sample.brand.slice(0, 1))}</span></div>`;
}

function catalog(photos) {
  if (catalogMode === "live") return productCatalog(photos);
  return `<main id="main-content" class="wrap page-main catalog-page">
    ${breadcrumb([{ href: "/", label: "Home" }, { label: "Browse phones" }])}
    ${pageHeading("Browse the brands", "Find your next<br><em>everyday phone.</em>", "Explore the brand names listed by the shop, then call to check current models, prices and availability.")}
    <aside class="sample-disclaimer" aria-label="Catalogue notice"><span class="sample-stamp">SAMPLE<br>ONLY</span><div><strong>Layout examples, not a live stock list.</strong><p>Model names, specifications, prices and availability have not been supplied by the shop. Nothing here can be ordered or paid for online.</p></div></aside>
    <section class="catalog-toolbar" aria-label="Filter sample catalogue"><div class="filter-buttons" role="group" aria-label="Filter by brand"><button class="filter-chip is-active" type="button" data-brand-filter="all" aria-pressed="true">All brands</button><button class="filter-chip" type="button" data-brand-filter="authorised" aria-pressed="false">Authorised dealer</button><button class="filter-chip" type="button" data-brand-filter="featured" aria-pressed="false">Featured brands</button></div><label class="catalog-search"><span class="sr-only">Search sample brand pages</span><input type="search" id="catalog-search" placeholder="Search brands" autocomplete="off"><span aria-hidden="true">⌕</span></label></section>
    <p class="catalog-results" aria-live="polite" id="catalog-results" data-unit="sample brand page">${samples.length} sample brand pages</p>
    <div class="catalog-grid">${samples.map((sample, index) => `<article class="catalog-card" data-sample-card data-brand="${sample.authorized ? "authorised" : "featured"}" data-search="${esc(sample.brand.toLowerCase())}"><a href="/catalog/${sample.slug}/" class="catalog-card-link"><div class="catalog-device-area">${deviceIllustration(sample)}<span class="sample-pill">Sample page</span><span class="catalog-count">${String(index + 1).padStart(2, "0")}</span></div><div class="catalog-card-copy"><span class="eyebrow">${sample.authorized ? "Authorised dealer · listed" : "Featured in 2025 post"}</span><h2>${esc(sample.brand)}</h2><p>Model, price & availability to confirm</p><span class="text-link">View sample details ${icon("arrow")}</span></div></a></article>`).join("")}</div>
    <p class="no-results" id="catalog-empty" hidden>No matching brand pages. Try a different search.</p>
    <section class="catalog-photo-prompt"><div>${tag("See real shop photos")}<h2>Want a closer look<br>at the store?</h2><a class="text-link" href="/gallery/">Browse all ${photos.length} photos ${icon("arrow")}</a></div>${photoImage(photos[4], 4, { className: "catalog-prompt-photo" })}</section>
    <div class="wrap">${contactBand("Ask what’s available today.")}</div>
  </main>`;
}

function productCatalog(photos) {
  const liveProducts = products.filter((item) => item.published !== false);
  return `<main id="main-content" class="wrap page-main catalog-page">
    ${breadcrumb([{ href: "/", label: "Home" }, { label: "Browse phones" }])}
    ${pageHeading("Current catalogue", "Phones for<br><em>everyday life.</em>", "Browse the phones listed by KABITA MOBILE STORES. Call or message to confirm current price, colour and availability.")}
    <section class="catalog-toolbar" aria-label="Search catalogue"><div class="filter-buttons" role="group" aria-label="Filter by brand">${["all", ...new Set(liveProducts.map((p) => p.brand))].map((brand, i) => `<button class="filter-chip${i === 0 ? " is-active" : ""}" type="button" data-brand-filter="${esc(i === 0 ? "all" : brand)}" aria-pressed="${i === 0}">${esc(i === 0 ? "All brands" : brand)}</button>`).join("")}</div><label class="catalog-search"><span class="sr-only">Search phones</span><input type="search" id="catalog-search" placeholder="Search phones" autocomplete="off"><span aria-hidden="true">⌕</span></label></section>
    <p class="catalog-results" aria-live="polite" id="catalog-results" data-unit="phone">${liveProducts.length} phones</p>
    <div class="catalog-grid">${liveProducts.map((item, index) => `<article class="catalog-card" data-sample-card data-brand="${esc(item.brand)}" data-search="${esc(`${item.brand} ${item.model} ${item.name}`.toLowerCase())}"><a href="/catalog/${encodeURIComponent(item.slug)}/" class="catalog-card-link"><div class="catalog-device-area">${item.images?.[0] ? `<img class="product-card-image" src="${esc(item.images[0])}" alt="${esc(item.name)}" loading="lazy">` : deviceIllustration({ brand: item.brand, color: "orange" })}<span class="catalog-count">${String(index + 1).padStart(2, "0")}</span></div><div class="catalog-card-copy"><span class="eyebrow">${esc(item.brand)}</span><h2>${esc(item.name)}</h2><p>${item.price ? `₹${esc(item.price)}` : "Call for current price"}</p><span class="text-link">View details ${icon("arrow")}</span></div></a></article>`).join("")}</div>
    ${liveProducts.length ? "" : `<div class="admin-empty-catalog"><p>No phones are published right now.</p><a href="/admin/">Open the admin panel</a></div>`}
    <div class="wrap">${contactBand("Ask what’s available today.")}</div>
  </main>`;
}

function productDetail(item) {
  const images = (item.images || []).filter(Boolean).slice(0, 3);
  const message = `আসসালামু আলাইকুম, ${item.name} ফোনটির বর্তমান দাম ও উপলভ্যতা জানতে চাই।`;
  const wa = business.whatsappNumber ? `https://wa.me/${encodeURIComponent(String(business.whatsappNumber).replace(/\D/g, ""))}?text=${encodeURIComponent(message)}` : "";
  return `<main id="main-content" class="wrap page-main sample-detail-page product-detail-page">
    ${breadcrumb([{ href: "/", label: "Home" }, { href: "/catalog/", label: "Browse phones" }, { label: item.name }])}
    <section class="sample-detail-layout">
      <div class="product-photo-gallery">${images.length ? images.map((src, index) => `<figure><img src="${esc(src)}" alt="${esc(item.name)} photo ${index + 1}"${index ? " loading=\"lazy\"" : ""}></figure>`).join("") : `<div class="sample-product-art">${deviceIllustration({ brand: item.brand, color: "orange" })}</div>`}</div>
      <div class="sample-detail-copy">${tag(item.brand)}<h1>${esc(item.name)}</h1><p class="product-price">${item.price ? `₹${esc(item.price)}` : "Call for current price"}</p><p class="sample-lede">${esc(item.description || "Contact the shop to confirm current details and availability.")}</p><div class="detail-facts">${(item.specs || []).map((spec) => `<div><span>${esc(spec.label)}</span><strong>${esc(spec.value)}</strong></div>`).join("")}</div><p class="detail-disclaimer">Availability and prices can change. Please confirm directly with the shop.</p><div class="product-enquiry-actions">${callLink("Call to enquire")}${wa ? `<a class="button button--whatsapp" href="${esc(wa)}" target="_blank" rel="noopener noreferrer">WhatsApp about this phone</a>` : ""}</div></div>
    </section>
    <div class="sample-related"><a class="text-link" href="/catalog/">← Back to catalogue</a><span>Ask the shop to confirm current stock and final price.</span></div>
  </main>`;
}

function sampleDetail(sample) {
  const relationship = sample.authorized ? "The original website lists this brand as an authorised dealer." : "This brand appears in a March 2025 post on the original website; authorised dealer status is not stated there.";
  return `<main id="main-content" class="wrap page-main sample-detail-page">
    ${breadcrumb([{ href: "/", label: "Home" }, { href: "/catalog/", label: "Browse phones" }, { label: sample.brand }])}
    <section class="sample-detail-layout">
      <div class="sample-product-art">${deviceIllustration(sample)}<span class="sample-detail-badge">Sample only<br>not live stock</span></div>
      <div class="sample-detail-copy">${tag("Enquiry page example")}<h1>${esc(sample.brand)}<br><em>sample listing.</em></h1><p class="sample-lede">This page shows how a future product detail could look after the shop confirms a real model and current details.</p><div class="detail-facts"><div><span>Model</span><strong>To be confirmed by the shop</strong></div><div><span>Price & EMI</span><strong>Call for current terms</strong></div><div><span>Availability & colour</span><strong>To be confirmed by the shop</strong></div><div><span>Specifications</span><strong>Not supplied</strong></div></div><p class="relationship-note">${relationship}</p>${callLink(`Call about current ${sample.brand} phones`)}<p class="detail-disclaimer">No live inventory, price, checkout or payment is connected to this example.</p></div>
    </section>
    <div class="sample-related"><a class="text-link" href="/catalog/">← Back to all sample brand pages</a><span>Sample catalogue · details need owner confirmation</span></div>
  </main>`;
}

function notFound() {
  return `<main id="main-content" class="wrap page-main error-page">${tag("Page not found")}<h1>This page<br><em>isn’t here.</em></h1><p>Try a shop page, browse the catalogue or call directly.</p><div class="hero-actions"><a class="button button--blue" href="/">Go to home ${icon("arrow")}</a><a class="text-link" href="/catalog/">Browse phones</a></div></main>`;
}

function makePages() {
  const activeProducts = products.filter((item) => item.published !== false);
  return [
  { path: "/", title: "KABITA MOBILE STORES · Bithari", description: "Branded mobile phones, exchange and after-sales support in Bithari, West Bengal. Call or visit KABITA MOBILE STORES.", active: "/", render: home },
  { path: "/about", title: "About · KABITA MOBILE STORES", description: "About KABITA MOBILE STORES in Bithari, including brands, finance partners and services listed on the current website.", active: "/about/", render: about },
  { path: "/contact", title: "Contact & directions · KABITA MOBILE STORES", description: "Call KABITA MOBILE STORES at 9932557023 or get directions to Bazar, Arshikari Road, Bithari, West Bengal.", active: "/contact/", render: contact },
  { path: "/posts", title: "Stories & updates · KABITA MOBILE STORES", description: "Posts and announcements from KABITA MOBILE STORES in Bithari.", active: "/posts/", render: posts },
  ...managedPosts.map((item) => ({ path: `/posts/${item.slug}`, title: `${item.title} · KABITA MOBILE STORES`, description: `${item.title} · Updates from KABITA MOBILE STORES in Bithari.`, active: "/posts/", render: () => postDetail(item) })),
  { path: "/privacy-policy", title: "Privacy policy · KABITA MOBILE STORES", description: "Privacy information for the static KABITA MOBILE STORES redesign.", active: "/privacy-policy/", render: privacy },
  { path: "/gallery", title: "Photo gallery · KABITA MOBILE STORES", description: "Browse 168 publicly displayed shop photos from KABITA MOBILE STORES in Bithari.", active: "/gallery/", render: gallery },
  { path: "/catalog", title: "Browse phones · KABITA MOBILE STORES", description: "Explore brand pages and call KABITA MOBILE STORES to confirm current phone models, prices and availability.", active: "/catalog/", render: catalog },
  ...(catalogMode === "live" ? activeProducts.map((item) => ({
    path: `/catalog/${item.slug}`,
    title: `${item.name} · KABITA MOBILE STORES`,
    description: `${item.name} from KABITA MOBILE STORES in Bithari. Confirm current price and availability with the shop.`,
    active: "/catalog/",
    render: () => productDetail(item),
  })) : samples.map((sample) => ({
    path: `/catalog/${sample.slug}`,
    title: `${sample.brand} sample page · KABITA MOBILE STORES`,
    description: `Sample catalogue detail for ${sample.brand}. Current model, price, stock and specifications must be confirmed with KABITA MOBILE STORES.`,
    active: "/catalog/",
    render: () => sampleDetail(sample),
  }))),
  { path: "/404", title: "Page not found · KABITA MOBILE STORES", description: "This page could not be found.", active: "", render: notFound },
  ];
}

function businessSchema(siteOrigin) {
  const hours = hoursByDay.map(([day]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${day}`,
    opens: "08:00",
    closes: "22:00",
  }));
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bazar, Arshikari Road, opposite Panchayat Office",
      addressLocality: "Bithari",
      addressRegion: "West Bengal",
      postalCode: "743286",
      addressCountry: "IN",
    },
    openingHoursSpecification: hours,
    hasMap: business.map,
    ...(siteOrigin ? { url: siteOrigin } : {}),
  };
}

function documentHtml(page, body, siteOrigin, assetVersion) {
  const canonical = siteOrigin ? `<link rel="canonical" href="${esc(siteOrigin + (page.path === "/" ? "/" : `${page.path}/`))}">` : "";
  const noindex = page.path === "/privacy-policy" || (page.path.startsWith("/catalog") && catalogMode === "samples");
  const ld = JSON.stringify(businessSchema(siteOrigin)).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#14191d">
  <meta name="description" content="${esc(page.description)}">
  ${noindex ? '<meta name="robots" content="noindex,follow">' : ""}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  ${canonical}
  <title>${esc(page.title)}</title>
  <link rel="icon" href="${esc(business.logo)}" type="image/png">
  <script src="/theme-init.js?v=${esc(assetVersion)}"></script>
  <link rel="preload" href="/assets/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/barlow-condensed-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/fonts.css?v=${esc(assetVersion)}">
  <link rel="stylesheet" href="/styles.css?v=${esc(assetVersion)}">
  <link rel="stylesheet" href="/theme.css?v=${esc(assetVersion)}">
  <script type="application/ld+json">${ld}</script>
  <script src="/app.js?v=${esc(assetVersion)}" defer></script>
</head>
<body data-page="${esc(page.path)}">
  ${header(page.active)}
  ${body}
  ${footer()}
  ${whatsappWidget()}
</body>
</html>`;
}

export function getPagePaths() {
  return makePages().map(({ path }) => path);
}

export function renderPath(pathname, photos, siteOrigin = "", assetVersion = "") {
  let decoded = pathname;
  try { decoded = decodeURIComponent(pathname); } catch { decoded = "/404"; }
  const normalized = decoded === "/" ? "/" : decoded.replace(/\/+$/, "");
  const pages = makePages();
  const page = pages.find(({ path }) => path === normalized) ?? pages.find(({ path }) => path === "/404");
  const body = page.render(photos);
  return documentHtml(page, body, siteOrigin, assetVersion);
}
