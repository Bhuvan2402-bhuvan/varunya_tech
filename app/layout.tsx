import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const editorial = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-editorial" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://varunyatech.in"),
  title: "VarunyaTech | High-End Digital Architecture & Custom Software",
  description: "VarunyaTech designs and architects custom software platforms, high-velocity web applications, and autonomous digital systems built for enterprise scale and operational resilience.",
  keywords: ["VarunyaTech", "Custom Software Development", "Enterprise Architecture", "Web Applications", "React.js", "Next.js", "TypeScript", "ERP Platform"],
  alternates: {
    canonical: "https://varunyatech.in",
  },
  openGraph: {
    title: "VarunyaTech — High-End Digital Architecture & Custom Software",
    description: "VarunyaTech designs and architects custom software platforms, high-velocity web applications, and autonomous digital systems.",
    url: "https://varunyatech.in",
    siteName: "VarunyaTech",
    images: [{ url: "/images/architecture/hero-noir.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VarunyaTech — High-End Digital Architecture & Custom Software",
    description: "VarunyaTech designs and architects custom software platforms, high-velocity web applications, and autonomous digital systems.",
    images: ["/images/architecture/hero-noir.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-[#519DD9]/20 selection:text-[#17191D]">
      <body className={`${inter.variable} ${editorial.variable} antialiased bg-white text-[#17191D] min-h-screen flex flex-col selection:bg-[#519DD9]/20 selection:text-[#17191D]`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
