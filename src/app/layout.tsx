import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FarmCast — Weather-Driven Farm Intelligence",
    template: "%s — FarmCast",
  },
  description:
    "Make informed agricultural decisions with real-time weather data and AI-powered recommendations.",
  keywords: ["farming", "weather", "agriculture", "crop management", "forecast"],
  openGraph: {
    title: "FarmCast — Weather-Driven Farm Intelligence",
    description:
      "Make informed agricultural decisions with real-time weather data and AI-powered recommendations.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FarmCast — Weather-Driven Farm Intelligence",
    description:
      "Make informed agricultural decisions with real-time weather data and AI-powered recommendations.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
