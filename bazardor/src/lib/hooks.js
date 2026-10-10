"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { todayBn } from "@/lib/bn";

// today's date in Bangla. Set after the page loads so server and browser always match.
export function useToday() {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(todayBn());
  }, []);
  return today;
}

// use this on protected pages: sends visitors to /signin if they are not logged in
export function useRequireAuth() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন।", { id: "auth-required" });
      router.replace("/signin?redirect=" + encodeURIComponent(pathname));
    }
  }, [isPending, session, router, pathname]);

  return { session, isPending };
}
