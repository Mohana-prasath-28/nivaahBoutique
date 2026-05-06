import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Navbar } from "@/components/navbar/Navbar";
import { MobileBottomNav } from "@/components/navbar/MobileBottomNav";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nivaah Boutique — Sarees Online",
    template: "%s — Nivaah Boutique",
  },
  description:
    "Production-ready ecommerce UI (India) — Sarees, offers, UPI/COD badges, fast delivery.",
  metadataBase: new URL("https://nivaahboutique.example"),
  openGraph: {
    title: "Nivaah Boutique — Sarees Online",
    description:
      "Sarees, festival offers, big discounts. UI-only, backend-ready architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <MobileBottomNav />
          <Toaster richColors position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
