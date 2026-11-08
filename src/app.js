document.documentElement.classList.add("js");

const bengaliText = new Map(Object.entries({
  "Skip to content": "মূল লেখায় যান", "Primary navigation": "প্রধান মেনু", "Display preferences": "দেখার পছন্দ",
  "Menu": "মেনু", "Home": "হোম", "Browse phones": "ফোন দেখুন", "Our shop": "আমাদের দোকান", "Stories": "পোস্ট", "Visit": "দোকানে আসুন",
  "Switch language to Bengali": "বাংলায় দেখুন", "Switch language to English": "ইংরেজিতে দেখুন", "Switch to dark mode": "ডার্ক মোড চালু করুন", "Switch to light mode": "লাইট মোড চালু করুন",
  "Call the store": "দোকানে ফোন করুন", "Call the shop": "দোকানে ফোন করুন", "Call to enquire": "জানতে ফোন করুন",
  "Ask about a phone": "ফোনের খোঁজ নিন", "Message us on WhatsApp": "WhatsApp-এ মেসেজ করুন", "Ask about phones on WhatsApp": "ফোন সম্পর্কে WhatsApp-এ জানতে লিখুন", "Write a review on Google": "Google-এ রিভিউ লিখুন", "Write a Google review": "Google-এ রিভিউ দিন",
  "Explore the catalogue ": "ফোনের তালিকা দেখুন ", "Plan your visit": "দোকানে আসার পরিকল্পনা করুন", "Authorised dealer": "অনুমোদিত ডিলার",
  "As listed by the shop": "দোকানের তালিকা অনুযায়ী", "A little more than a phone": "ফোনের চেয়েও বেশি কিছু", "Help that starts": "সাহায্য শুরু হয়", "before the unboxing.": "ফোন খোলার আগেই।",
  "From comparing options to asking about exchange or finance, get clear answers directly from the people at the shop.": "ফোনের বিকল্প, এক্সচেঞ্জ বা ফাইন্যান্স সম্পর্কে দোকানের সঙ্গে সরাসরি কথা বলে পরিষ্কার উত্তর জেনে নিন।",
  "Choose with confidence": "নিশ্চিন্তে ফোন বেছে নিন", "Ask about current models from the brands listed by the shop and what fits your needs.": "দোকানের তালিকায় থাকা ব্র্যান্ডের বর্তমান মডেল এবং আপনার জন্য উপযুক্ত ফোন সম্পর্কে জানুন।",
  "Ask about EMI": "EMI সম্পর্কে জানুন", "Finance partners appear on the original site. Plans, eligibility and terms need to be confirmed with the shop.": "মূল সাইটে ফাইন্যান্স পার্টনারদের নাম রয়েছে। পরিকল্পনা, যোগ্যতা ও শর্ত দোকানে নিশ্চিত করুন।",
  "Exchange & after-sales": "এক্সচেঞ্জ ও বিক্রয়-পরবর্তী পরিষেবা", "The shop lists old-phone exchange and after-sales service. Call to ask what applies to your device.": "দোকানের তালিকায় পুরোনো ফোন এক্সচেঞ্জ ও বিক্রয়-পরবর্তী পরিষেবা রয়েছে। আপনার ফোনের ক্ষেত্রে কী প্রযোজ্য জানতে ফোন করুন।",
  "Prices, finance terms, exchange values and stock can change. Please confirm details with the shop.": "দাম, ফাইন্যান্সের শর্ত, এক্সচেঞ্জ মূল্য ও মজুত বদলাতে পারে। দোকানে বিস্তারিত নিশ্চিত করুন।",
  "Inside the shop": "দোকানের ভিতরে", "A closer look at": "আরও কাছ থেকে দেখুন", "the everyday.": "প্রতিদিনের দোকানটিকে।", "View all ": "সব দেখুন ",
  "The photo archive": "ছবির সংগ্রহ", "Browse the full gallery ": "সব ছবি দেখুন ", "From Google reviews": "Google রিভিউ থেকে", "Based on ": "ভিত্তি করে ", " public reviews": "টি সর্বজনীন রিভিউ",
  "Read reviews on Google ": "Google-এ রিভিউ পড়ুন ", "Google-এ রিভিউ দিন": "Google-এ রিভিউ দিন", "A few words from customers": "ক্রেতাদের কয়েকটি কথা", "Kind words,": "ভালোবাসার কথা,", "in their words.": "তাঁদের নিজের ভাষায়।",
  "From the shop": "দোকানের খবর", "Notes &": "খবর ও", "updates.": "আপডেট।", "All stories ": "সব পোস্ট ", "Read the post ": "পোস্টটি পড়ুন ", "New stories coming soon.": "নতুন পোস্ট শীঘ্রই আসছে।", "Call the shop for the latest offers and phone availability.": "সাম্প্রতিক অফার ও ফোনের মজুত জানতে দোকানে ফোন করুন।",
  "Let’s find the right fit.": "আপনার জন্য ঠিক ফোনটি খুঁজে নিই।", "A phone question?": "ফোন নিয়ে কিছু জানতে চান?", "Tell us what you have in mind. The shop can help with current models, prices and availability.": "আপনার পছন্দের কথা জানান। বর্তমান মডেল, দাম ও উপলভ্যতা জানতে দোকান সাহায্য করবে।", "Visit & directions ": "দোকান ও রাস্তার দিকনির্দেশ ",
  "Explore": "আরও দেখুন", "About the shop": "দোকান সম্পর্কে", "Photo gallery": "ছবির গ্যালারি", "Stories & updates": "পোস্ট ও আপডেট", "Privacy policy": "গোপনীয়তা নীতি", "Come by": "দোকানে আসুন", "Directions on Google Maps ": "Google Maps-এ রাস্তা দেখুন ", "Made for the next visit.": "আবার আসার অপেক্ষায়।",
  "A local mobile phone shop in Bithari, West Bengal.": "পশ্চিমবঙ্গের বিথারির একটি স্থানীয় মোবাইল ফোনের দোকান।",
  "Get directions ": "রাস্তা দেখুন ", "About": "দোকান সম্পর্কে", "Contact & directions": "যোগাযোগ ও রাস্তা", "See you in": "দেখা হবে", "Bithari.": "বিথারিতে।", "Call with a question or follow directions to the shop. There’s no enquiry form; your device’s phone app handles calls.": "কিছু জানতে ফোন করুন অথবা রাস্তা দেখে দোকানে আসুন। এখানে কোনো অনুসন্ধান ফর্ম নেই; ফোন আপনার ডিভাইসের কল অ্যাপ দিয়ে হবে।",
  "Find the shop.": "দোকান খুঁজুন।", "Get directions": "রাস্তা দেখুন", "Directions open Google Maps in a new tab.": "রাস্তার দিকনির্দেশ নতুন ট্যাবে Google Maps-এ খুলবে।", "Business hours": "দোকানের সময়", "Open every day.": "প্রতিদিন খোলা।", "Published hours are 8am–10pm, Monday through Sunday.": "প্রকাশিত সময়: সোমবার থেকে রবিবার, সকাল ৮টা–রাত ১০টা।", "Call during the day if you have a question before visiting.": "আসার আগে কিছু জানতে দিনের বেলায় ফোন করুন।", "Before you visit": "আসার আগে", "What to ask about.": "যা জেনে নিতে পারেন।", "Looking for a specific phone?": "নির্দিষ্ট কোনো ফোন খুঁজছেন?", "Call to confirm the current model, colour, memory, price and availability.": "বর্তমান মডেল, রং, মেমরি, দাম ও মজুত নিশ্চিত করতে ফোন করুন।", "Asking about EMI or exchange?": "EMI বা এক্সচেঞ্জ সম্পর্কে জানতে চান?", "Eligibility, finance terms and exchange values depend on the device and current offer. Confirm directly with the shop.": "যোগ্যতা, ফাইন্যান্সের শর্ত ও এক্সচেঞ্জ মূল্য ফোন এবং চলতি অফারের ওপর নির্ভর করে। দোকানে সরাসরি নিশ্চিত করুন।", "Questions are welcome.": "আপনার প্রশ্ন স্বাগত।", "Call the shop about options, pricing, availability or a convenient time to visit.": "ফোনের বিকল্প, দাম, মজুত বা দোকানে আসার সুবিধাজনক সময় জানতে ফোন করুন।",
  "From the shop": "দোকানের খবর", "Notes, offers": "খবর, অফার", "& updates.": "ও আপডেট।", "Stories and announcements published by KABITA MOBILE STORES.": "KABITA MOBILE STORES-এর প্রকাশিত পোস্ট ও ঘোষণা।", "You’ve reached the end of the available updates.": "এখানে বর্তমানে থাকা সব আপডেট দেখা হয়েছে।", "Have something in mind?": "কিছু জানতে চান?", "Ask about the current range.": "বর্তমান ফোনের তালিকা জানুন।", "← Back to all posts": "← সব পোস্টে ফিরুন", "Earliest and latest available post": "প্রকাশিত পোস্টের তালিকা", "This post was published on ": "এই পোস্টটি প্রকাশিত হয়েছিল ", ". Brand names and offers do not confirm current stock or current offer terms.": "। ব্র্যান্ডের নাম ও অফার বর্তমান মজুত বা অফারের শর্ত নিশ্চিত করে না।",
  "Privacy": "গোপনীয়তা", "A simple, clear": "সহজ ও স্পষ্ট", "privacy policy.": "গোপনীয়তা নীতি।", "Draft prepared for this static redesign. The shop owner should review it before launch.": "এই নতুন ওয়েবসাইটের জন্য তৈরি খসড়া। প্রকাশের আগে দোকানের মালিকের এটি পর্যালোচনা করা উচিত।", "Draft for the redesigned website · ": "নতুন ওয়েবসাইটের খসড়া · ", "On this page": "এই পাতায়", "Contact": "যোগাযোগ", "Questions?": "কোনো প্রশ্ন?",
  "Photo archive": "ছবির সংগ্রহ", "The shop,": "দোকানটি,", "in ": "ছবিতে ", " frames.": "টি ফ্রেমে।", "Browse ": "দেখুন ", " photos. Choose one to open the full-size view.": "টি ছবি। পূর্ণ আকারে দেখতে ছবিতে চাপ দিন।", " photos": "টি ছবি", "Shop photos from the original KABITA MOBILE STORES site.": "মূল KABITA MOBILE STORES সাইটের দোকানের ছবি।", "Open photo ": "ছবি খুলুন ", " of ": "-এর মধ্যে ", "Close photo viewer": "ছবি বন্ধ করুন", "Previous photo": "আগের ছবি", "Next photo": "পরের ছবি",
  "Browse the brands": "ব্র্যান্ড দেখুন", "Find your next": "আপনার পরের", "everyday phone.": "দৈনন্দিন ফোনটি খুঁজুন।", "Explore the brand names listed by the shop, then call to check current models, prices and availability.": "দোকানের তালিকায় থাকা ব্র্যান্ড দেখুন, তারপর বর্তমান মডেল, দাম ও মজুত জানতে ফোন করুন।", "Catalogue notice": "ফোনের তালিকা সম্পর্কে", "Layout examples, not a live stock list.": "এগুলি নমুনা, বর্তমান মজুতের তালিকা নয়।", "Model names, specifications, prices and availability have not been supplied by the shop. Nothing here can be ordered or paid for online.": "ফোনের মডেল, বৈশিষ্ট্য, দাম ও মজুত দোকান থেকে দেওয়া হয়নি। এখান থেকে অনলাইনে অর্ডার বা পেমেন্ট করা যাবে না।", "All brands": "সব ব্র্যান্ড", "Authorised dealer · listed": "তালিকাভুক্ত অনুমোদিত ডিলার", "Featured in 2025 post": "২০২৫ সালের পোস্টে উল্লেখিত", "Model, price & availability to confirm": "মডেল, দাম ও মজুত নিশ্চিত করুন", "View sample details ": "নমুনার বিস্তারিত দেখুন ", "No matching brand pages. Try a different search.": "মিল থাকা ব্র্যান্ড নেই। অন্যভাবে খুঁজুন।", "See real shop photos": "দোকানের আসল ছবি দেখুন", "Want a closer look": "আরও কাছ থেকে", "at the store?": "দোকানটি দেখবেন?", "Browse all ": "সব দেখুন ", "Ask what’s available today.": "আজ কোন ফোন আছে জেনে নিন।",
  "Current catalogue": "বর্তমান ফোনের তালিকা", "Phones for": "আপনার", "everyday life.": "প্রতিদিনের ফোন।", "Browse the phones listed by KABITA MOBILE STORES. Call or message to confirm current price, colour and availability.": "KABITA MOBILE STORES-এর তালিকায় থাকা ফোন দেখুন। বর্তমান দাম, রং ও মজুত নিশ্চিত করতে ফোন বা মেসেজ করুন।", "Search catalogue": "ফোনের তালিকা খুঁজুন", "Search phones": "ফোন খুঁজুন", "Search sample brand pages": "নমুনা ব্র্যান্ড খুঁজুন", "Search brands": "ব্র্যান্ড খুঁজুন", " phones": "টি ফোন", "Call for current price": "বর্তমান দাম জানতে ফোন করুন", "View details ": "বিস্তারিত দেখুন ", "No phones are published right now.": "এখন কোনো ফোন প্রকাশ করা নেই।", "Open the admin panel": "অ্যাডমিন প্যানেল খুলুন",
  "Enquiry page example": "তথ্য জানার নমুনা পাতা", "sample listing.": "নমুনা তালিকা।", "This page shows how a future product detail could look after the shop confirms a real model and current details.": "দোকান আসল মডেল ও তথ্য নিশ্চিত করার পর ফোনের বিবরণ কেমন দেখাবে, এই পাতায় তার নমুনা দেখানো হয়েছে।", "Model": "মডেল", "To be confirmed by the shop": "দোকানে নিশ্চিত করতে হবে", "Price & EMI": "দাম ও EMI", "Call for current terms": "চলতি শর্ত জানতে ফোন করুন", "Availability & colour": "মজুত ও রং", "Specifications": "বৈশিষ্ট্য", "Not supplied": "তথ্য দেওয়া হয়নি", "The original website lists this brand as an authorised dealer.": "মূল ওয়েবসাইটে এই ব্র্যান্ডকে অনুমোদিত ডিলার হিসেবে তালিকাভুক্ত করা হয়েছে।", "This brand appears in a March 2025 post on the original website; authorised dealer status is not stated there.": "মূল ওয়েবসাইটের মার্চ ২০২৫-এর পোস্টে এই ব্র্যান্ডের নাম রয়েছে; সেখানে অনুমোদিত ডিলার বলা হয়নি।", "No live inventory, price, checkout or payment is connected to this example.": "এই নমুনায় লাইভ মজুত, দাম, অর্ডার বা পেমেন্ট যুক্ত নেই।", "Sample catalogue · details need owner confirmation": "নমুনা তালিকা · মালিকের কাছ থেকে তথ্য নিশ্চিত করতে হবে", "← Back to catalogue": "← ফোনের তালিকায় ফিরুন", "← Back to all sample brand pages": "← সব নমুনা ব্র্যান্ডে ফিরুন", "Call about current ": "বর্তমান ফোন সম্পর্কে জানতে ", " phones": "টি ফোন",
  "Page not found": "পাতাটি পাওয়া যায়নি", "This page": "এই পাতাটি", "isn’t here.": "এখানে নেই।", "Try a shop page, browse the catalogue or call directly.": "দোকানের অন্য পাতা দেখুন, ফোনের তালিকা খুলুন অথবা সরাসরি ফোন করুন।", "Go to home ": "হোম পাতায় যান ", "Read full post ": "পুরো পোস্ট পড়ুন ", "At the storefront": "দোকানের সামনে", "LOCAL": "স্থানীয়", "ADVICE": "পরামর্শ", "REAL": "আসল", "AFTER-CARE": "পরবর্তী পরিষেবা",
  "Every day": "প্রতিদিন", "Monday": "সোমবার", "Tuesday": "মঙ্গলবার", "Wednesday": "বুধবার", "Thursday": "বৃহস্পতিবার", "Friday": "শুক্রবার", "Saturday": "শনিবার", "Sunday": "রবিবার",
  "The shop’s own description": "দোকানের নিজের পরিচিতি", "Good options.": "ভালো বিকল্প।", "Helpful answers.": "সহায়ক উত্তর।", "Call or visit to ask about current models, pricing, finance eligibility, exchange value and service details. The information here reflects what is listed on the current public website.": "বর্তমান মডেল, দাম, ফাইন্যান্সের যোগ্যতা, এক্সচেঞ্জ মূল্য ও পরিষেবা সম্পর্কে জানতে ফোন করুন বা দোকানে আসুন। এখানে দেওয়া তথ্য বর্তমান ওয়েবসাইটে থাকা তালিকা থেকে নেওয়া।", "Contact the shop ": "দোকানে যোগাযোগ করুন ",
  "Listed brand relationships": "তালিকাভুক্ত ব্র্যান্ড সম্পর্ক", "Brand names,": "ব্র্যান্ডের নাম,", "clearly shown.": "স্পষ্টভাবে দেখানো হয়েছে।", "The original site identifies these as authorised dealers. It also features several other brands in a 2025 post; those brands are not marked as authorised dealers here.": "মূল সাইটে এগুলিকে অনুমোদিত ডিলার বলা হয়েছে। ২০২৫ সালের একটি পোস্টে আরও কয়েকটি ব্র্যান্ড রয়েছে; এখানে সেগুলিকে অনুমোদিত ডিলার হিসেবে দেখানো হয়নি।", "Authorised dealer, as listed": "তালিকা অনুযায়ী অনুমোদিত ডিলার", "Also featured in a 2025 post": "২০২৫ সালের পোস্টে আরও উল্লেখিত", "Finance partners listed": "তালিকাভুক্ত ফাইন্যান্স পার্টনার", "Current schemes, eligibility and terms need to be confirmed with the shop.": "চলতি স্কিম, যোগ্যতা ও শর্ত দোকানে নিশ্চিত করতে হবে।", "What the current listing says": "বর্তমান তালিকায় যা বলা হয়েছে", "Services to": "যে পরিষেবাগুলি", "ask about.": "জেনে নিতে পারেন।", "These offers come from the existing website. Please confirm current terms before making a purchase decision.": "এই অফারগুলি বর্তমান ওয়েবসাইটে দেওয়া আছে। কেনার সিদ্ধান্তের আগে চলতি শর্ত নিশ্চিত করুন।", "Come in and compare.": "দোকানে এসে তুলনা করে দেখুন।",
  "Branded mobile phones": "ব্র্যান্ডেড মোবাইল ফোন", "Easy finance (EMI)": "সহজ ফাইন্যান্স (EMI)", "100% original products": "১০০% অরিজিনাল প্রোডাক্ট", "After-sales service": "বিক্রয়-পরবর্তী পরিষেবা", "Old phone exchange": "পুরোনো ফোন এক্সচেঞ্জ", "Lowest-price guarantee": "সর্বনিম্ন দামের নিশ্চয়তা", "Prices lower than online": "অনলাইনের চেয়ে কম দাম",
  "Information this site collects": "এই ওয়েবসাইট যে তথ্য সংগ্রহ করে", "The public website does not ask visitors to create an account, place an order, or submit a contact form. It does not run analytics or advertising scripts.": "এই ওয়েবসাইটে অ্যাকাউন্ট তৈরি, অর্ডার বা যোগাযোগের ফর্ম নেই। এখানে অ্যানালিটিক্স বা বিজ্ঞাপনের স্ক্রিপ্টও চলে না।", "Phone, Google Maps, Google review and WhatsApp links open those services. Each service handles information under its own privacy terms.": "ফোন, Google Maps, Google রিভিউ ও WhatsApp লিংক সংশ্লিষ্ট পরিষেবা খুলে দেয়। প্রতিটি পরিষেবা তাদের নিজস্ব গোপনীয়তার শর্ত অনুযায়ী তথ্য সামলায়।", "Photos and locally stored assets": "ছবি ও ওয়েবসাইটে রাখা ফাইল", "The website loads its logo, fonts, and shop photos from files served with the site. The photo gallery includes images that were publicly displayed on the existing KABITA MOBILE STORES website.": "ওয়েবসাইটের লোগো, ফন্ট ও দোকানের ছবি সাইটের সঙ্গেই রাখা ফাইল থেকে দেখানো হয়। গ্যালারির ছবিগুলি আগের KABITA MOBILE STORES ওয়েবসাইটে সর্বসাধারণের জন্য প্রকাশিত ছিল।", "Admin access and saved website content": "অ্যাডমিন প্রবেশ ও সংরক্ষিত ওয়েবসাইটের তথ্য", "Authorised shop staff can sign in to a separate admin area. The server uses a temporary session cookie for that login and stores the website content and uploaded images on the hosting server. Public visitors do not use that admin account.": "অনুমোদিত দোকানকর্মীরা আলাদা অ্যাডমিন পাতায় লগইন করতে পারেন। সার্ভার সাময়িক সেশন কুকি ব্যবহার করে এবং ওয়েবসাইটের তথ্য ও আপলোড করা ছবি হোস্টিং সার্ভারে রাখে। সাধারণ দর্শকেরা অ্যাডমিন অ্যাকাউন্ট ব্যবহার করেন না।", "The shop owner should confirm the hosting provider’s storage, backup and security settings before publishing this admin system online.": "অ্যাডমিন সিস্টেম অনলাইনে দেওয়ার আগে হোস্টিংয়ের সংরক্ষণ, ব্যাকআপ ও নিরাপত্তার ব্যবস্থা দোকানের মালিকের নিশ্চিত করা উচিত।", "Your choices": "আপনার পছন্দ", "You can leave the site without using the phone or map links. Questions about information shared through a call or a third-party service should be directed to that service or to the shop by phone.": "ফোন বা মানচিত্রের লিংক ব্যবহার না করেও আপনি সাইট ছেড়ে যেতে পারেন। ফোন বা অন্য পরিষেবায় ভাগ করা তথ্য নিয়ে প্রশ্ন থাকলে সেই পরিষেবা বা দোকানে ফোন করুন।", "The shop owner should review this draft policy and update it if the site adds forms, analytics, advertising, or other services.": "এই খসড়া নীতি দোকানের মালিকের পর্যালোচনা করা উচিত। সাইটে ফর্ম, অ্যানালিটিক্স, বিজ্ঞাপন বা অন্য পরিষেবা যোগ হলে নীতিটি হালনাগাদ করুন।", "Contact KABITA MOBILE STORES at ": "KABITA MOBILE STORES-এ যোগাযোগ করুন: ", " or visit the shop at ": " অথবা দোকানে আসুন: ",
  "Local knowledge.": "স্থানীয় অভিজ্ঞতা।", "Everyday tech.": "প্রতিদিনের প্রযুক্তি।", "A good phone,": "ভালো একটি ফোন,", "right around": "পাশেই আছে", "the corner.": "আপনার জন্য।", "The right choice starts with a real conversation. Drop by KABITA MOBILE STORES for branded phones, exchange options and after-sales support.": "সঠিক ফোন বেছে নিতে সরাসরি কথা বলুন। ব্র্যান্ডেড ফোন, এক্সচেঞ্জ ও বিক্রয়-পরবর্তী পরিষেবা সম্পর্কে জানতে KABITA MOBILE STORES-এ আসুন।",
}).map(([english, bengali]) => [english.trim(), bengali.trim()]));

function translateCopy(value, language) {
  if (language !== "bn") return value;
  const trimmed = value.trim();
  let translated = bengaliText.get(trimmed);
  if (!translated) {
    translated = trimmed
      .replace(/^Every day(?=\s*[·|,])/, "প্রতিদিন")
      .replace(/^Open every day(?=\s*[·|,])/, "প্রতিদিন খোলা")
      .replace(/8am–10pm/g, "সকাল ৮টা–রাত ১০টা")
      .replace(/^Photo (\d+) of (\d+)$/, "ছবি $1 / $2")
      .replace(/^Open photo (\d+) of (\d+)$/, "ছবি খুলুন $1 / $2")
      .replace(/^in (\d+) frames\.$/, "$1টি ফ্রেমে।")
      .replace(/^Browse (\d+) photos\. Choose one to open the full-size view\.$/, "$1টি ছবি দেখুন। পূর্ণ আকারে খুলতে ছবিতে চাপ দিন।")
      .replace(/^(\d+) photos$/, "$1টি ছবি")
      .replace(/^Based on (.+) public reviews$/, "$1টি সর্বজনীন রিভিউ থেকে")
      .replace(/^(\d+\+?) Google reviews$/, "$1টি Google রিভিউ")
      .replace(/^Every day\s*·\s*8am–10pm$/, "প্রতিদিন · সকাল ৮টা–রাত ১০টা")
      .replace(/^Open every day\s*·\s*8am–10pm$/, "প্রতিদিন খোলা · সকাল ৮টা–রাত ১০টা")
      .replace(/^Browse all (\d+) photos$/, "সব $1টি ছবি দেখুন")
      .replace(/^View all (\d+) photos$/, "সব $1টি ছবি দেখুন")
      .replace(/^(\d+) sample brand pages$/, "$1টি নমুনা ব্র্যান্ড পাতা")
      .replace(/^(\d+) phones$/, "$1টি ফোন");
  }
  if (!translated || translated === trimmed) return value;
  return value.replace(trimmed, translated);
}

const originalText = new WeakMap();
const originalAttributes = new WeakMap();
function nearestLanguage(element) {
  for (let current = element; current && current !== document.documentElement; current = current.parentElement) {
    if (current.hasAttribute("lang")) return current.getAttribute("lang").toLowerCase();
  }
  return "en";
}

function applyLanguage(language) {
  const selected = language === "bn" ? "bn" : "en";
  document.documentElement.lang = selected;
  document.querySelectorAll("[data-localized]").forEach((element) => {
    const text = element.dataset[selected];
    if (text !== undefined) element.textContent = text;
    element.lang = selected;
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const parent = node.parentElement;
    if (!node.nodeValue.trim() || parent?.closest("[data-localized]") || nearestLanguage(parent) === "bn") {
      if (originalText.get(node) !== node.nodeValue) node.nodeValue = originalText.get(node);
      continue;
    }
    node.nodeValue = translateCopy(originalText.get(node), selected);
  }

  document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
    let saved = originalAttributes.get(element);
    if (!saved) { saved = {}; originalAttributes.set(element, saved); }
    for (const name of ["placeholder", "aria-label", "title"]) {
      if (!element.hasAttribute(name)) continue;
      if (!(name in saved)) saved[name] = element.getAttribute(name);
      element.setAttribute(name, translateCopy(saved[name], selected));
    }
  });

  const languageToggle = document.querySelector("#language-toggle");
  if (languageToggle) {
    languageToggle.innerHTML = `<span aria-hidden="true">${selected === "bn" ? "EN" : "বাংলা"}</span>`;
    languageToggle.setAttribute("aria-label", selected === "bn" ? "Switch language to English" : "বাংলায় দেখুন");
    languageToggle.title = selected === "bn" ? "English" : "বাংলা";
  }
  const themeToggle = document.querySelector("#theme-toggle");
  if (themeToggle) {
    const dark = document.documentElement.dataset.theme === "dark";
    const action = dark ? (selected === "bn" ? "লাইট মোড" : "Light mode") : (selected === "bn" ? "ডার্ক মোড" : "Dark mode");
    themeToggle.querySelector("[data-theme-action]").textContent = action;
    themeToggle.setAttribute("aria-label", selected === "bn" ? `${dark ? "লাইট" : "ডার্ক"} মোড চালু করুন` : `Switch to ${dark ? "light" : "dark"} mode`);
    themeToggle.title = action;
    themeToggle.setAttribute("aria-pressed", String(dark));
  }
  try { localStorage.setItem("kabita-language", selected); } catch {}
}

const themeButton = document.querySelector("#theme-toggle");
themeButton?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("kabita-theme", next); } catch {}
  const colorMeta = document.querySelector('meta[name="theme-color"]');
  if (colorMeta) colorMeta.content = next === "dark" ? "#141a1f" : "#f5f2ea";
  applyLanguage(document.documentElement.lang);
});

const languageButton = document.querySelector("#language-toggle");
languageButton?.addEventListener("click", () => applyLanguage(document.documentElement.lang === "bn" ? "en" : "bn"));
let initialLanguage = "en";
try { if (localStorage.getItem("kabita-language") === "bn") initialLanguage = "bn"; } catch {}
applyLanguage(initialLanguage);

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
}

const galleryItems = [...document.querySelectorAll("[data-gallery-item]")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCount = document.querySelector("#lightbox-count");
const lightboxCaption = document.querySelector("#lightbox-caption");

if (galleryItems.length && lightbox && lightboxImage && lightboxCount) {
  let activeIndex = 0;
  let returnFocus = null;

  const showPhoto = (index) => {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[activeIndex];
    const image = item.querySelector("img");
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = item.dataset.galleryAlt || image.alt;
    lightboxCount.textContent = document.documentElement.lang === "bn"
      ? `ছবি ${activeIndex + 1} / ${galleryItems.length}`
      : `Photo ${activeIndex + 1} of ${galleryItems.length}`;
    if (lightboxCaption) lightboxCaption.textContent = `KABITA MOBILE STORES · BITHARI`;

    const nextImage = galleryItems[(activeIndex + 1) % galleryItems.length].querySelector("img");
    if (nextImage && !nextImage.complete) {
      const preload = new Image();
      preload.src = nextImage.src;
    }
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      returnFocus = item;
      showPhoto(index);
      lightbox.showModal();
      lightbox.querySelector("[data-lightbox-close]")?.focus();
    });
  });

  lightbox.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => showPhoto(activeIndex - 1));
  lightbox.querySelector("[data-lightbox-next]")?.addEventListener("click", () => showPhoto(activeIndex + 1));
  lightbox.querySelector("[data-lightbox-close]")?.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => returnFocus?.focus());
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
    if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
  });
}

const cards = [...document.querySelectorAll("[data-sample-card]")];
const filterButtons = [...document.querySelectorAll("[data-brand-filter]")];
const searchInput = document.querySelector("#catalog-search");
const resultCount = document.querySelector("#catalog-results");
const noResults = document.querySelector("#catalog-empty");

if (cards.length && filterButtons.length) {
  let activeFilter = "all";

  const updateCatalog = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const filterMatch = activeFilter === "all" || card.dataset.brand === activeFilter;
      const searchMatch = !query || card.dataset.search.includes(query);
      const show = filterMatch && searchMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (resultCount) {
      const unit = resultCount.dataset.unit || "sample brand page";
      resultCount.textContent = document.documentElement.lang === "bn"
        ? `${visible} ${unit === "phone" ? "টি ফোন" : "টি নমুনা ব্র্যান্ড পাতা"}`
        : `${visible} ${unit}${visible === 1 ? "" : "s"}`;
    }
    if (noResults) noResults.hidden = visible > 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.brandFilter || "all";
      filterButtons.forEach((candidate) => {
        const selected = candidate === button;
        candidate.classList.toggle("is-active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      updateCatalog();
    });
  });

  searchInput?.addEventListener("input", updateCatalog);
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealItems = [...document.querySelectorAll(".offer-card, .teaser-photo, .review-card, .catalog-card, .story-card, .contact-band")];
  if (revealItems.length) {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    revealItems.forEach((item, index) => {
      item.dataset.reveal = "";
      item.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
      observer.observe(item);
    });
  }
}
