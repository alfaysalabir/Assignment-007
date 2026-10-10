"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRequireAuth } from "@/lib/hooks";
import { authErrorBn } from "@/lib/bn";
import { AuthShell, Card, Field, FormError, PrimaryButton } from "@/components/AuthParts";
import { BlockSkeleton } from "@/components/Skeletons";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { session, isPending } = useRequireAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-[448px] space-y-6 px-4 py-10">
        <BlockSkeleton className="h-14 w-60" />
        <BlockSkeleton className="h-[180px]" />
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const name = new FormData(e.currentTarget).get("name").trim();

    if (!name) {
      const msg = "নাম খালি রাখা যাবে না।";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    // BetterAuth: update the user's name
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) {
      const msg = authErrorBn(error);
      setFormError(msg);
      toast.error(msg);
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে।");
    router.push("/profile");
  }

  return (
    <AuthShell title="তথ্য আপডেট করুন" subtitle="আপনার নাম বদলাতে নিচের ফর্মটি ব্যবহার করুন।">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormError message={formError} />
          <Field
            label="নাম"
            id="name"
            type="text"
            defaultValue={session.user.name}
            placeholder="আপনার নাম"
            autoComplete="name"
          />
          <PrimaryButton loading={loading}>তথ্য আপডেট করুন</PrimaryButton>
          <p className="text-center text-sm">
            <Link href="/profile" className="font-semibold text-primary hover:underline">
              প্রোফাইলে ফিরে যান
            </Link>
          </p>
        </form>
      </Card>
    </AuthShell>
  );
}
