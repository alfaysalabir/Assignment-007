import Link from "next/link";

export default function NotFoundView({
  title = "পৃষ্ঠাটি খুঁজে পাওয়া যায়নি",
  text = "আপনি যে ঠিকানাটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা হয়েছে।",
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div className="text-6xl">🛒</div>
      <p className="mt-4 text-5xl font-bold text-primary">৪০৪</p>
      <h1 className="mt-3 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-content/70">{text}</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-lg border border-primary-strong bg-primary px-6 text-sm font-semibold text-primary-content shadow-sm transition hover:bg-primary-strong"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
