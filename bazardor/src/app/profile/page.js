"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRequireAuth } from "@/lib/hooks";
import { BlockSkeleton } from "@/components/Skeletons";

export default function ProfilePage() {
  const router = useRouter();
  const { session, isPending } = useRequireAuth();

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <BlockSkeleton className="h-14 w-60" />
        <BlockSkeleton className="h-[120px]" />
        <BlockSkeleton className="h-[251px]" />
      </div>
    );
  }

  const user = session.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold leading-8">আমার প্রোফাইল</h1>
        <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {/* avatar, name, email, sign out */}
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-content">
            {user.name.trim().charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl font-semibold leading-7">{user.name}</p>
          <p className="truncate text-base text-content/70">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex h-10 items-center justify-center gap-1 rounded-lg border border-danger px-4 text-sm font-semibold text-danger transition hover:bg-danger hover:text-white"
        >
          <span aria-hidden="true">↩</span> সাইন আউট
        </button>
      </div>

      {/* information card with the update button */}
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              নাম
            </label>
            <input
              id="name"
              readOnly
              value={user.name}
              className="h-10 w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm shadow-sm outline-none"
            />
          </div>
          <Link
            href="/profile/update"
            className="flex h-10 w-full items-center justify-center rounded-lg border border-primary-strong bg-primary text-sm font-semibold text-primary-content shadow-sm transition hover:bg-primary-strong"
          >
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
}
