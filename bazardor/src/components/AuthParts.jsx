"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorBn } from "@/lib/bn";

// page frame used by sign in, sign up, profile
export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto w-full max-w-[448px] px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold leading-7">{title}</h1>
        <p className="mt-2 text-sm">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-base-300 bg-base-100 p-6 ${className}`}>{children}</div>
  );
}

export function Field({ label, id, error, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={error ? "true" : "false"}
        className={`h-10 w-full rounded-lg border bg-base-100 px-3 text-sm shadow-sm outline-none transition placeholder:text-content/50 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
          error ? "border-danger" : "border-base-300"
        }`}
        {...inputProps}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}

export function PrimaryButton({ children, loading, ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-10 w-full items-center justify-center rounded-lg border border-primary-strong bg-primary text-sm font-semibold text-primary-content shadow-sm transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
      {...props}
    >
      {loading ? "অপেক্ষা করুন..." : children}
    </button>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
      {message}
    </p>
  );
}

function GoogleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#1d271f" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
    </svg>
  );
}

// "অথবা" divider + Google / GitHub buttons
export function SocialButtons({ callbackURL = "/" }) {
  const [busy, setBusy] = useState("");

  async function handleSocial(provider) {
    setBusy(provider);
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) {
      console.error("Social login error:", error);
      toast.error(authErrorBn(error));
      setBusy("");
    }
  }

  const btn =
    "flex h-10 items-center justify-center gap-2 rounded-lg border border-base-300 bg-base-100 text-sm font-medium transition hover:bg-base-200 disabled:opacity-60";

  return (
    <>
      <div className="flex items-center gap-4 text-xs" role="separator">
        <span className="h-px flex-1 bg-content/20" />
        অথবা
        <span className="h-px flex-1 bg-content/20" />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <button type="button" onClick={() => handleSocial("google")} disabled={!!busy} className={btn}>
          <GoogleIcon /> Google
        </button>
        <button type="button" onClick={() => handleSocial("github")} disabled={!!busy} className={btn}>
          <GithubIcon /> GitHub
        </button>
      </div>
    </>
  );
}
