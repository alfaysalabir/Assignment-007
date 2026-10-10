import { pctBn } from "@/lib/bn";

// green = price fell, red = price rose, gray = no change
export function dirStyle(dir) {
  if (dir === "up") return { icon: "▲", color: "text-danger" };
  if (dir === "down") return { icon: "▼", color: "text-success" };
  return { icon: "—", color: "text-content" };
}

export default function ChangeBadge({ change, plain = false }) {
  const { icon, color } = dirStyle(change.dir);
  if (plain) {
    return (
      <span className={`inline-flex items-center gap-1 text-sm ${color}`}>
        <span>{icon}</span>
        <span className="font-semibold">{pctBn(change.pct)}%</span>
      </span>
    );
  }
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-full bg-base-200 px-2 text-xs ${color}`}
    >
      <span>{icon}</span>
      <span className="font-semibold">{pctBn(change.pct)}%</span>
    </span>
  );
}
