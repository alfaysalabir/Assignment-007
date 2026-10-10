"use client";

import { useData } from "./DataProvider";
import { dirStyle } from "./ChangeBadge";
import { pctBn, toBn, unitBn } from "@/lib/bn";

function Item({ p }) {
  const { icon, color } = dirStyle(p.change.dir);
  return (
    <div className="flex h-9 shrink-0 items-center gap-1.5 border-r border-base-200 px-4 text-sm">
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span>
        {toBn(p.today)} টাকা/{unitBn[p.unit]}
      </span>
      <span className={`font-semibold ${color}`}>
        {icon} {pctBn(p.change.pct)}%
      </span>
    </div>
  );
}

export default function Ticker() {
  const { products, loading } = useData();

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100" aria-label="দামের তালিকা">
      {loading || products.length === 0 ? (
        <div className="h-9 animate-pulse bg-base-200" />
      ) : (
        // the list is shown twice so the loop never has a gap
        <div className="ticker-track flex w-max animate-marquee">
          <div className="flex">
            {products.map((p) => (
              <Item key={p.id} p={p} />
            ))}
          </div>
          <div className="flex" aria-hidden="true">
            {products.map((p) => (
              <Item key={"copy" + p.id} p={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
