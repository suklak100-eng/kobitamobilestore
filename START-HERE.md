# শুরু এখান থেকে

এই ফোল্ডারেই KABITA MOBILE STORES-এর সম্পূর্ণ ওয়েবসাইট, লেখা, ছবি ও সেটিংস আছে। নতুন ওয়েবসাইট বানানোর দরকার নেই।

## Antigravity-তে খোলা

Antigravity-তে **Add Folder** বেছে Desktop-এর `KABITA-MOBILE-STORES` ফোল্ডারটি খোলো। ZIP বা ভেতরের কোনো একক ফাইল বাছবে না।

## GitHub-এ পাঠানো, তারপর Vercel-এ প্রকাশ

Antigravity-কে বলো: **“এই খোলা KABITA-MOBILE-STORES ফোল্ডারটিকেই GitHub repository হিসেবে publish করো। নতুন website বা project বানাবে না। সব project file, site data ও ছবি রাখো। Vercel-এর জন্য root-এর vercel.json ব্যবহার করো।”**

তারপর Vercel-এ সেই GitHub repository import করে **Deploy** চাপো। `vercel.json` স্বয়ংক্রিয়ভাবে build command ও `dist` output folder নির্ধারণ করে। পরের বার Antigravity-তে পরিবর্তন করে GitHub-এ push করলে Vercel আবার site build ও deploy করবে।

`.env` ফাইল বা পাসওয়ার্ড কখনও GitHub-এ পাঠাবে না। `.gitignore` এগুলো বাদ রাখে।

## Admin সম্পর্কে

Vercel-এ public website প্রকাশ হবে। বর্তমান admin panel তথ্য local server-এর ফাইলে সেভ করে, তাই Vercel-এ admin থেকে সরাসরি save করা যাবে না। এই folder-এর workflow হলো Antigravity দিয়ে project বদলানো, তারপর GitHub push করে নতুন version deploy করা। Online admin দরকার হলে পরে আলাদা database ও storage যোগ করতে হবে।
