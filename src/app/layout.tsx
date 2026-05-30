import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getMetadataBase(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(withProtocol);
  } catch {
    return new URL("https://enesbeslenen.vercel.app");
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Enes Beslenen — Web Tasarım & Kodlama",
  description:
    "Harran Üniversitesi web tasarım ve kodlama öğrencisi. Yaratıcı ve performanslı web deneyimleri üzerine çalışıyorum.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "Enes Beslenen — Web Tasarım & Kodlama",
    description:
      "Harran Üniversitesi web tasarım ve kodlama öğrencisi. Yaratıcı ve performanslı web deneyimleri üzerine çalışıyorum.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Enes Beslenen" }],
  },
  twitter: {
    card: "summary",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-neutral-100 antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
