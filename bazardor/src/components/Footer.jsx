export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-sm sm:min-h-[68px] sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
