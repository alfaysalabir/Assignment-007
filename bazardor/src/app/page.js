"use client";

import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import { useData } from "@/components/DataProvider";
import { toBn } from "@/lib/bn";

export default function HomePage() {
  const { products, loading, error } = useData();

  // top 6 biggest risers and fallers
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-6">
      <Hero />

      {error && (
        <p className="rounded-2xl border border-danger/30 bg-base-100 p-4 text-sm text-danger">
          {error}
        </p>
      )}

      <section aria-label="আজ দাম বেড়েছে">
        {loading ? (
          <>
            <div className="mb-3 h-7 w-40 animate-pulse rounded bg-base-300" />
            <GridSkeleton count={6} />
          </>
        ) : (
          <ProductSection icon="▲" iconColor="text-danger" title="আজ দাম বেড়েছে" products={risers} />
        )}
      </section>

      <section aria-label="আজ দাম কমেছে">
        {loading ? (
          <>
            <div className="mb-3 h-7 w-40 animate-pulse rounded bg-base-300" />
            <GridSkeleton count={6} />
          </>
        ) : (
          <ProductSection icon="▼" iconColor="text-success" title="আজ দাম কমেছে" products={fallers} />
        )}
      </section>

      {/* the hero button scrolls here */}
      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-xl font-bold leading-7">সব পণ্য</h2>
        {loading ? (
          <div className="mt-3">
            <GridSkeleton count={9} />
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
