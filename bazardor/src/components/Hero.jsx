"use client";

import Image from "next/image";
import { useToday } from "@/lib/hooks";

export default function Hero() {
  const today = useToday();

  return (
    <section className="flex flex-col items-center gap-4 rounded-3xl border border-base-300 bg-base-100 px-4 py-6 md:flex-row md:justify-between md:py-2.5">
      <div className="w-full max-w-xl">
        <span
          className="inline-flex min-h-7 items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
          suppressHydrationWarning
        >
          {today || "আজকের তারিখ"}
        </span>

        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl sm:leading-[45px]">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-3 text-base leading-6 text-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        {/* plain anchor link: scrolls down to the "সব পণ্য" section */}
        <a
          href="#সব-পণ্য"
          className="mt-6 inline-flex h-10 items-center rounded-lg border border-primary-strong bg-primary px-6 text-sm font-semibold text-primary-content shadow-sm transition hover:bg-primary-strong"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <Image
        src="/bazar-hero.png"
        alt="ঝুড়িতে সাজানো তাজা ফল ও সবজি"
        width={315}
        height={263}
        priority
        className="h-auto w-[240px] shrink-0 sm:w-[315px]"
      />
    </section>
  );
}
