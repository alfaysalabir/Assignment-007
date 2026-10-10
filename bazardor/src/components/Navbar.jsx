"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useToday } from "@/lib/hooks";
import { useData } from "./DataProvider";

function Avatar({ name, size = "h-9 w-9" }) {
  return (
    <span
      className={`${size} flex shrink-0 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-primary-content`}
    >
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // close the menu when the page changes or when clicking outside
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-10 items-center gap-2 rounded-lg px-1.5 text-sm font-medium transition hover:bg-base-200"
      >
        <Avatar name={user.name} />
        <span className="hidden max-w-[120px] truncate sm:inline">{user.name}</span>
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm">{user.name}</p>
            <p className="truncate text-xs text-content/70">{user.email}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            className="block rounded-lg px-3 py-1.5 text-sm hover:bg-base-200"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button
            onClick={handleSignOut}
            role="menuitem"
            className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-danger hover:bg-base-200"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const today = useToday();
  const pathname = usePathname();
  const { categories, loading } = useData();
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="border-b border-base-300 bg-base-100">
      {/* top row: logo + auth */}
      <div className="mx-auto flex h-[68px] max-w-[1164px] items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
            <Image src="/logo-icon.png" alt="" width={18} height={18} />
          </span>
          <span className="leading-none">
            <span className="block text-xl font-bold leading-7">বাজার দর</span>
            <span className="block min-h-4 text-xs leading-4" suppressHydrationWarning>
              {today}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-base-300" />
          ) : session ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Link
                href="/signin"
                className="inline-flex h-10 items-center rounded-lg px-3 text-sm font-semibold transition hover:bg-base-200 sm:px-6"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-10 items-center rounded-lg border border-primary-strong bg-primary px-3 text-sm font-semibold text-primary-content shadow-sm transition hover:bg-primary-strong sm:px-6"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* second row: category links */}
      <nav className="border-t border-base-200" aria-label="পণ্যের বিভাগ">
        <div className="mx-auto max-w-6xl overflow-x-auto px-4">
          <ul className="flex min-h-12 items-center gap-1 py-2 sm:justify-start">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <li key={i} className="h-8 w-[70px] shrink-0 animate-pulse rounded-lg bg-base-200" />
                ))
              : categories.map((c) => {
                  const active = pathname === `/category/${c.slug}`;
                  return (
                    <li key={c.id} className="shrink-0">
                      <Link
                        href={`/category/${c.slug}`}
                        aria-current={active ? "page" : undefined}
                        className={`flex h-8 items-center gap-1.5 rounded-lg px-[13px] text-xs font-semibold transition ${
                          active
                            ? "bg-primary text-primary-content"
                            : "hover:bg-base-200"
                        }`}
                      >
                        <span className="font-normal">{c.icon}</span>
                        <span>{c.nameBn}</span>
                      </Link>
                    </li>
                  );
                })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
