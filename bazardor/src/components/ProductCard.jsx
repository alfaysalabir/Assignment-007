import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { toBn, unitBn } from "@/lib/bn";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:border-primary/50 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6">{product.nameBn}</h3>
          <p className="text-xs leading-4 text-content/60">প্রতি {unitBn[product.unit]}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs leading-4 text-content/60">আজকের দাম</p>
          <p className="leading-7">
            <span className="text-xl font-bold">{toBn(product.today)}</span>{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
