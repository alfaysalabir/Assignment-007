import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { DataProvider } from "@/components/DataProvider";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={hind.variable} suppressHydrationWarning>
      <body
        className="flex min-h-screen flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        <DataProvider>
          <Navbar />
          <Ticker />
          <main className="flex-1">{children}</main>
          <Footer />
        </DataProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
