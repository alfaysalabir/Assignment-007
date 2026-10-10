import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default function SignInPage() {
  // useSearchParams needs a Suspense boundary
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
