"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import NotFoundView from "@/components/NotFoundView";
import { BlockSkeleton } from "@/components/Skeletons";
import { useData } from "@/components/DataProvider";
import { useRequireAuth } from "@/lib/hooks";
import { priceBn, toBn, unitBn } from "@/lib/bn";

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb" className="py-2 text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none" stroke="#1d271f" aria-hidden="true">
                <path d="M1 1l4 3-4 3" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function StatCard({ label, value, color, note }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
      <p className="text-xs">{label}</p>
      <p className={`mt-0.5 ${color}`}>
        <span className="text-2xl font-bold">{value}</span>{" "}
        <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-content/70">{note}</p>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const { session, isPending } = useRequireAuth();
  const { products, categories, loading, error } = useData();

  // waiting for login check / data -> skeleton
  if (isPending || !session || loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 pt-6">
        <BlockSkeleton className="h-9 w-64" />
        <BlockSkeleton className="h-[174px]" />
        <BlockSkeleton className="h-[500px]" />
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

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return (
      <NotFoundView title="পণ্যটি খুঁজে পাওয়া যায়নি" text="এই নামে কোনো পণ্য নেই।" />
    );
  }

  const unit = unitBn[product.unit];
  const diff = Math.abs(product.today - product.yesterday);
  const category = categories.find((c) => c.slug === product.category);

  // summary numbers from the market list
  const lowest = Math.min(...product.markets.map((m) => m.min));
  const highest = Math.max(...product.markets.map((m) => m.max));

  let trendWord = "অপরিবর্তিত আছে";
  if (product.change.dir === "up") trendWord = "বেড়েছে";
  if (product.change.dir === "down") trendWord = "কমেছে";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-12 pt-6">
      <Breadcrumbs
        items={[
          { label: "হোম", href: "/" },
          { label: product.categoryNameBn, href: `/category/${product.category}` },
          { label: product.nameBn },
        ]}
      />

      {/* top summary */}
      <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row md:items-stretch md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-9 sm:text-3xl">{product.nameBn}</h1>
            <p className="text-sm">
              প্রতি {unit} · {category?.nameBn || product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম <span className="font-semibold">{trendWord}</span>
              {diff > 0 && <> · {toBn(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="flex min-w-[130px] flex-col items-center justify-center rounded-2xl bg-base-200 px-5 py-4 text-center">
          <p className="text-sm">আজকের দাম</p>
          <p className="text-3xl font-bold leading-9">{toBn(product.today)}</p>
          <p className="text-sm">টাকা / {unit}</p>
          <div className="mt-1.5">
            <ChangeBadge change={product.change} plain />
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        {/* min / max / average */}
        <div>
          <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <StatCard
              label="সর্বনিম্ন দাম"
              value={priceBn(lowest)}
              color="text-success"
              note="সবচেয়ে কম দামের বাজার"
            />
            <StatCard
              label="সর্বাধিক দাম"
              value={priceBn(highest)}
              color="text-danger"
              note="সবচেয়ে বেশি দামের বাজার"
            />
            <StatCard
              label="গড় দাম"
              value={priceBn(product.today)}
              color="text-primary"
              note={`প্রতি ${unit}-এর হিসাবে`}
            />
          </div>
        </div>

        {/* price in every market */}
        <div>
          <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-base-300 text-left">
                  <th className="px-4 py-3 font-bold">বাজার</th>
                  <th className="px-4 py-3 font-bold">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-bold">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr
                    key={m.market}
                    className={`border-b border-base-300 last:border-b-0 ${i % 2 === 1 ? "bg-base-200" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium">{m.market}</td>
                    <td className="px-4 py-3">{m.division}</td>
                    <td className="px-4 py-3 text-right">{priceBn(m.min)} টাকা</td>
                    <td className="px-4 py-3 text-right">{priceBn(m.max)} টাকা</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {priceBn((m.min + m.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
