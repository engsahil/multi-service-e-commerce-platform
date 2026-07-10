export const translations = {
  en: {
    home: "Home", services: "Services", about: "About", contact: "Contact", dashboard: "Dashboard", admin: "Admin", cart: "Cart", login: "Log in", signup: "Create account", logout: "Log out",
    explore: "Explore services", quote: "Request a quote", add: "Add to project", delivery: "Delivery", from: "From", noPrice: "Quoted after review", viewDetails: "View details",
    genuine: "Genuine work. Clear process.", noFake: "No invented prices. No fake reviews. Every project is scoped honestly before work begins.",
    track: "Track every milestone", upload: "Private file exchange", bilingual: "English & Urdu support", secure: "Secure checkout options",
    allServices: "All services", allServicesSub: "Choose a service or send a custom brief. Published prices appear only after they are set by Sahil.",
    yourCart: "Your project cart", emptyCart: "Your cart is empty.", checkout: "Continue to checkout", remove: "Remove", total: "Total", quoteRequired: "Final pricing will be confirmed after reviewing your requirements.",
    account: "Account", orderHistory: "Order history", notifications: "Notifications", files: "Files", messages: "Messages", status: "Status", payment: "Payment", placed: "Placed", download: "Download", send: "Send", reference: "Reference", deliverable: "Deliverable",
    privacy: "Privacy", terms: "Terms", rights: "All rights reserved.", language: "اردو", theme: "Toggle theme",
  },
  ur: {
    home: "ہوم", services: "خدمات", about: "تعارف", contact: "رابطہ", dashboard: "ڈیش بورڈ", admin: "ایڈمن", cart: "کارٹ", login: "لاگ اِن", signup: "اکاؤنٹ بنائیں", logout: "لاگ آؤٹ",
    explore: "خدمات دیکھیں", quote: "قیمت معلوم کریں", add: "پروجیکٹ میں شامل کریں", delivery: "فراہمی", from: "شروع", noPrice: "جائزے کے بعد قیمت", viewDetails: "تفصیل دیکھیں",
    genuine: "حقیقی کام۔ واضح طریقہ۔", noFake: "نہ فرضی قیمتیں، نہ جعلی جائزے۔ ہر پروجیکٹ کام شروع ہونے سے پہلے ایمانداری سے طے ہوتا ہے۔",
    track: "ہر مرحلے کی نگرانی", upload: "محفوظ فائل کا تبادلہ", bilingual: "انگریزی اور اردو معاونت", secure: "محفوظ ادائیگی کے طریقے",
    allServices: "تمام خدمات", allServicesSub: "کوئی خدمت منتخب کریں یا اپنی ضرورت بھیجیں۔ قیمت صرف ساحل کی جانب سے مقرر ہونے کے بعد دکھائی جاتی ہے۔",
    yourCart: "آپ کا پروجیکٹ کارٹ", emptyCart: "آپ کا کارٹ خالی ہے۔", checkout: "چیک آؤٹ جاری رکھیں", remove: "ہٹائیں", total: "کل", quoteRequired: "آپ کی ضروریات دیکھنے کے بعد حتمی قیمت کی تصدیق ہوگی۔",
    account: "اکاؤنٹ", orderHistory: "آرڈر ہسٹری", notifications: "اطلاعات", files: "فائلیں", messages: "پیغامات", status: "حالت", payment: "ادائیگی", placed: "تاریخ", download: "ڈاؤن لوڈ", send: "بھیجیں", reference: "حوالہ", deliverable: "تیار فائل",
    privacy: "رازداری", terms: "شرائط", rights: "جملہ حقوق محفوظ ہیں۔", language: "English", theme: "تھیم تبدیل کریں",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
