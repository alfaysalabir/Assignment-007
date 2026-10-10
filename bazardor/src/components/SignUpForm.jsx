"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorBn } from "@/lib/bn";
import { AuthShell, Card, Field, FormError, PrimaryButton, SocialButtons } from "./AuthParts";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const password = form.get("password");
    const confirm = form.get("confirm");

    // simple validation
    const found = {};
    if (!name) found.name = "নাম লিখুন।";
    if (!/^\S+@\S+\.\S+$/.test(email)) found.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
    if (password.length < 8) found.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    if (confirm !== password) found.confirm = "দুটি পাসওয়ার্ড মিলছে না।";
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const msg = authErrorBn(error);
      setFormError(msg);
      toast.error(msg);
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormError message={formError} />
          <Field label="নাম" id="name" type="text" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" error={errors.name} />
          <Field label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" error={errors.email} />
          <Field label="পাসওয়ার্ড" id="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" error={errors.password} />
          <Field label="পাসওয়ার্ড নিশ্চিত করুন" id="confirm" type="password" placeholder="আবার লিখুন" autoComplete="new-password" error={errors.confirm} />
          <PrimaryButton loading={loading}>অ্যাকাউন্ট তৈরি করুন</PrimaryButton>
          <SocialButtons callbackURL="/" />
          <p className="text-center text-sm">
            আগেই অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-primary hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </form>
      </Card>
    </AuthShell>
  );
}
