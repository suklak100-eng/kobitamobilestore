export const siteOrigin = ""; // Set only after the new public domain is approved.

export const business = {
  name: "KABITA MOBILE STORES",
  phone: "9932557023",
  tel: "tel:9932557023",
  address: "Bazar, Arshikari Road, opp. Panchayat Office, Bithari, West Bengal, 743286",
  addressShort: "Bithari, West Bengal, 743286",
  hours: "Every day · 8am–10pm",
  map: "https://www.google.com/maps/dir/?api=1&destination=KABITA+MOBILE+STORES%2C+Bazar%2C+Arshikari+Road%2C+opp.+Panchayat+Office%2C+Bithari%2C+West+Bengal%2C+743286&destination_place_id=ChIJD-K6Zp1P_zkRUo_E7Ep3JwY",
  mapSearch: "https://www.google.com/maps/search/?api=1&query=KABITA+MOBILE+STORES%2C+Bazar%2C+Arshikari+Road%2C+opp.+Panchayat+Office%2C+Bithari%2C+West+Bengal%2C+743286&query_place_id=ChIJD-K6Zp1P_zkRUo_E7Ep3JwY",
  reviewLink: "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJD-K6Zp1P_zkRUo_E7Ep3JwY",
  reviewWriteLink: "https://search.google.com/local/writereview?placeid=ChIJD-K6Zp1P_zkRUo_E7Ep3JwY",
  whatsappNumber: "919932557023",
  whatsappMessage: "নমস্কার, KABITA MOBILE STORES। একটি ফোন সম্পর্কে জানতে চাই। অনুগ্রহ করে মডেল, বর্তমান দাম ও উপলভ্যতা জানাবেন? ধন্যবাদ।",
  logo: "/assets/kabita-logo.png",
  reviewScore: "4.9",
  reviewCount: "94+",
};

export const hoursByDay = [
  ["Monday", "8am–10pm"],
  ["Tuesday", "8am–10pm"],
  ["Wednesday", "8am–10pm"],
  ["Thursday", "8am–10pm"],
  ["Friday", "8am–10pm"],
  ["Saturday", "8am–10pm"],
  ["Sunday", "8am–10pm"],
];

export const authorizedBrands = ["Vivo", "Oppo", "Samsung", "Tecno"];
export const otherFeaturedBrands = ["Redmi", "Realme", "iPhone"];
export const financePartners = ["Bajaj Finance", "TVS Finance", "HDB Finance"];

export const shopClaims = [
  "Branded mobile phones",
  "Easy finance (EMI)",
  "100% original products",
  "After-sales service",
  "Old phone exchange",
  "Lowest-price guarantee",
  "Prices lower than online",
];

export const reviews = [
  { name: "Masud Sardar", date: "September 15, 2026", quote: "Good price and good behave" },
  { name: "Abhick Mondal", date: "September 12, 2026", quote: "This shop's is verry nice and this shop owner and staff behave is so good" },
  { name: "Montu Gazi", date: "August 31, 2026", quote: "Best Service Best price Love you dada" },
  { name: "Ajet Gazi", date: "August 29, 2026", quote: "Valo service Valo collection" },
];

export const post = {
  slug: "সেরা-দামে-সেরা-ফোন-নতুন-মোবাইল-কম-দামে-এখানেই-পাবেন-vivo-oppo-samsung-redmi-real__8414388324232134440",
  title: "সেরা দামে সেরা ফোন 🔥",
  date: "2025-03-17",
  dateLabel: "March 17, 2025",
  lines: [
    "📢 নতুন মোবাইল? কম দামে? এখানেই পাবেন!",
    "🔹 Vivo, Oppo, Samsung, Redmi, Realme,iPhone & আরও ব্র্যান্ড",
    "🔹 EMI সুবিধা, এক্সচেঞ্জ অফার & আকর্ষণীয় ছাড়",
    "🔹 ১০০% জেনুইন প্রোডাক্ট + বেস্ট আফটার সেল সার্ভিস",
    "✅ ফোন কেনার আগে একবার আমাদের দেখুন!",
  ],
};

export const samples = [
  { slug: "sample-vivo", brand: "Vivo", authorized: true, photo: 5, color: "blue" },
  { slug: "sample-oppo", brand: "Oppo", authorized: true, photo: 4, color: "orange" },
  { slug: "sample-samsung", brand: "Samsung", authorized: true, photo: 6, color: "navy" },
  { slug: "sample-tecno", brand: "Tecno", authorized: true, photo: 2, color: "green" },
  { slug: "sample-redmi", brand: "Redmi", authorized: false, photo: 3, color: "red" },
  { slug: "sample-realme", brand: "Realme", authorized: false, photo: 7, color: "yellow" },
  { slug: "sample-iphone", brand: "iPhone", authorized: false, photo: 1, color: "silver" },
];

export const privacySections = [
  {
    title: "Information this site collects",
    paragraphs: [
      "The public website does not ask visitors to create an account, place an order, or submit a contact form. It does not run analytics or advertising scripts.",
      "Phone, Google Maps, Google review and WhatsApp links open those services. Each service handles information under its own privacy terms.",
    ],
  },
  {
    title: "Photos and locally stored assets",
    paragraphs: [
      "The website loads its logo, fonts, and shop photos from files served with the site. The photo gallery includes images that were publicly displayed on the existing KABITA MOBILE STORES website.",
    ],
  },
  {
    title: "Admin access and saved website content",
    paragraphs: [
      "Authorised shop staff can sign in to a separate admin area. The server uses a temporary session cookie for that login and stores the website content and uploaded images on the hosting server. Public visitors do not use that admin account.",
      "The shop owner should confirm the hosting provider’s storage, backup and security settings before publishing this admin system online.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      "You can leave the site without using the phone or map links. Questions about information shared through a call or a third-party service should be directed to that service or to the shop by phone.",
      "The shop owner should review this draft policy and update it if the site adds forms, analytics, advertising, or other services.",
    ],
  },
];

const clone = (value) => JSON.parse(JSON.stringify(value));
const defaultContent = {
  business: clone(business),
  hoursByDay: clone(hoursByDay),
  authorizedBrands: clone(authorizedBrands),
  otherFeaturedBrands: clone(otherFeaturedBrands),
  financePartners: clone(financePartners),
  shopClaims: clone(shopClaims),
  reviews: clone(reviews),
  posts: [clone(post)],
  products: [],
  catalogMode: "live",
  gallery: null,
  privacySections: clone(privacySections),
  hero: {
    eyebrow: "BITHARI · WEST BENGAL",
    titleLead: "A good phone,",
    titleAccent: "right around",
    titleEnd: "the corner.",
    lede: "The right choice starts with a real conversation. Drop by KABITA MOBILE STORES for branded phones, exchange options and after-sales support.",
    eyebrowBn: "বিথারি · পশ্চিমবঙ্গ",
    titleLeadBn: "ভালো একটি ফোন,",
    titleAccentBn: "পাশেই আছে",
    titleEndBn: "আপনার জন্য।",
    ledeBn: "সঠিক ফোন বেছে নিতে সরাসরি কথা বলুন। ব্র্যান্ডেড ফোন, এক্সচেঞ্জ ও বিক্রয়-পরবর্তী পরিষেবা সম্পর্কে জানতে KABITA MOBILE STORES-এ আসুন।",
    supportingEn: "Branded mobile phones · Easy finance (EMI) · 100% original products.",
    supportingBn: "ব্র্যান্ডেড মোবাইল · সহজ ফাইন্যান্স (EMI) · ১০০% অরিজিনাল প্রোডাক্ট।",
    bengali: "ব্র্যান্ডেড মোবাইল · সহজ ফাইন্যান্স (EMI) · ১০০% অরিজিনাল প্রোডাক্ট।",
    image: "",
  },
  theme: { orange: "#ed8646", orangeDeep: "#9b4b22" },
};

export let heroContent = clone(defaultContent.hero);
export let products = [];
export let catalogMode = "live";
export let managedPosts = [clone(post)];
export let theme = clone(defaultContent.theme);
export let galleryContent = null;

export function applyEditableContent(content = {}) {
  const next = { ...clone(defaultContent), ...content };
  Object.assign(business, { ...defaultContent.business, ...(next.business || {}) });
  hoursByDay.splice(0, hoursByDay.length, ...clone(next.hoursByDay || defaultContent.hoursByDay));
  authorizedBrands.splice(0, authorizedBrands.length, ...clone(Array.isArray(next.authorizedBrands) ? next.authorizedBrands : defaultContent.authorizedBrands));
  otherFeaturedBrands.splice(0, otherFeaturedBrands.length, ...clone(Array.isArray(next.otherFeaturedBrands) ? next.otherFeaturedBrands : defaultContent.otherFeaturedBrands));
  financePartners.splice(0, financePartners.length, ...clone(Array.isArray(next.financePartners) ? next.financePartners : defaultContent.financePartners));
  shopClaims.splice(0, shopClaims.length, ...clone(Array.isArray(next.shopClaims) ? next.shopClaims : defaultContent.shopClaims));
  reviews.splice(0, reviews.length, ...clone(Array.isArray(next.reviews) ? next.reviews : defaultContent.reviews));
  privacySections.splice(0, privacySections.length, ...clone(Array.isArray(next.privacySections) ? next.privacySections : defaultContent.privacySections));
  managedPosts = clone(Array.isArray(next.posts) ? next.posts : defaultContent.posts);
  products = clone(next.products || []);
  catalogMode = next.catalogMode === "live" ? "live" : "samples";
  galleryContent = next.gallery ? clone(next.gallery) : null;
  heroContent = { ...clone(defaultContent.hero), ...(next.hero || {}) };
  theme = { ...clone(defaultContent.theme), ...(next.theme || {}) };
}

export function currentEditableContent(defaultGallery = []) {
  return {
    business: clone(business),
    hoursByDay: clone(hoursByDay),
    authorizedBrands: clone(authorizedBrands),
    otherFeaturedBrands: clone(otherFeaturedBrands),
    financePartners: clone(financePartners),
    shopClaims: clone(shopClaims),
    reviews: clone(reviews),
    posts: clone(managedPosts),
    products: clone(products),
    catalogMode,
    gallery: clone(galleryContent || defaultGallery),
    privacySections: clone(privacySections),
    hero: clone(heroContent),
    theme: clone(theme),
  };
}
