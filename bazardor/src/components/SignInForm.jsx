"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorBn, safeRedirect } from "@/lib/bn";
import { AuthShell, Card, Field, FormError, PrimaryButton, SocialButtons } from "./AuthParts";

export default function SignInForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // already logged in -> go home
  useEffect(() => {
    if (!isPending && session) router.replace(redirect);
  }, [isPending, session, router, redirect]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই লিখুন।";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = authErrorBn(error);
      setFormError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে।");
    router.push(redirect);
  }

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormError message={formError} />
          <Field label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" />
          <Field label="পাসওয়ার্ড" id="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="current-password" />
          <PrimaryButton loading={loading}>সাইন ইন</PrimaryButton>
          <SocialButtons callbackURL={redirect} />
          <p className="text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </form>
      </Card>
    </AuthShell>
  );
}
