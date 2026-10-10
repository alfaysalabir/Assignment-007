// Helpers for showing numbers / dates in Bangla

const numberFormat = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const moneyFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

// 1850 -> ১,৮৫০
export function toBn(n) {
  return numberFormat.format(n);
}

// whole numbers stay whole, 63.5 -> ৬৩.৫০
export function priceBn(n) {
  return Number.isInteger(n) ? numberFormat.format(n) : moneyFormat.format(n);
}

// 2.1 -> ২.১
export function pctBn(n) {
  return percentFormat.format(Math.abs(n));
}

export const unitBn = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// মঙ্গলবার, ৬ অক্টোবর, ২০২৬
export function todayBn(date = new Date()) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

// only allow redirects that stay inside our own site
export function safeRedirect(path) {
  if (path && path.startsWith("/") && !path.startsWith("//")) return path;
  return "/";
}

// turn BetterAuth's English errors into Bangla messages
export function authErrorBn(error) {
  const code = error?.code || "";
  const text = (error?.message || "").toLowerCase();
  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || text.includes("invalid email or password"))
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  if (code.includes("USER_ALREADY_EXISTS") || text.includes("already exists"))
    return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।";
  if (code.includes("INVALID_EMAIL") || text.includes("invalid email"))
    return "সঠিক ইমেইল ঠিকানা লিখুন।";
  if (text.includes("password too short"))
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  return error?.message || "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন।";
}
