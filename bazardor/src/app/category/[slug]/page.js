"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import NotFoundView from "@/components/NotFoundView";
import { GridSkeleton, BlockSkeleton } from "@/components/Skeletons";
import { useData } from "@/components/DataProvider";
import { toBn } from "@/lib/bn";

export default function CategoryPage() {
  const { slug } = useParams();
  const { products, categories, loading, error } = useData();
  const [sort, setSort] = useState("default");

  const category = categories.find((c) => c.slug === slug);

  // loading state (skeleton)
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 pt-6">
        <BlockSkeleton className="h-[94px]" />
        <BlockSkeleton className="h-[66px]" />
        <GridSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="rounded-2xl border border-danger/30 bg-base-100 p-4 text-sm text-danger">{error}</p>
      </div>
    );
  }

  // wrong slug -> 404 style message
  if (!category) {
    return (
      <NotFoundView
        title="বিভাগটি খুঁজে পাওয়া যায়নি"
        text="এই নামে কোনো পণ্যের বিভাগ নেই।"
      />
    );
  }

  // sort by the real number (not the Bangla text), so ৯ comes before ১০০
  const list = products.filter((p) => p.category === slug);
  if (sort === "low") list.sort((a, b) => a.today - b.today);
  if (sort === "high") list.sort((a, b) => b.today - a.today);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-12 pt-6">
      {/* title + icon */}
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl leading-none">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold leading-8">{category.nameBn}</h1>
          <p className="text-sm">{toBn(list.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* sort control */}
        <div className="flex items-center justify-end gap-3 rounded-2xl border border-base-300 bg-base-100 px-4 py-4">
          <label htmlFor="sort" className="text-sm">
            সাজান
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 cursor-pointer appearance-none rounded-lg border border-base-300 bg-base-100 pl-3 pr-8 text-xs shadow-sm focus:outline focus:outline-2 focus:outline-primary"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2"
              viewBox="0 0 10 10"
              fill="none"
              stroke="#1d271f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1.5 3.5 5 7l3.5-3.5" />
            </svg>
          </div>
        </div>

        <p className="text-sm">মোট {toBn(list.length)}টি পণ্য দেখানো হচ্ছে</p>

        {list.length === 0 ? (
          <NotFoundView title="এই বিভাগে কোনো পণ্য নেই" text="পরে আবার দেখুন।" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
