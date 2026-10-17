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
  metadataBase: new URL("https://varunyatech.com"),
  title: "VarunyaTech | High-End Digital Architecture & Custom Software",
  description: "VarunyaTech designs and architects custom software platforms, high-velocity web applications, and autonomous digital systems built for enterprise scale and operational resilience.",
  keywords: ["VarunyaTech", "Custom Software Development", "Enterprise Architecture", "Web Applications", "React.js", "Next.js", "TypeScript", "ERP Platform"],
  openGraph: {
    title: "VarunyaTech — High-End Digital Architecture & Custom Software",
    description: "VarunyaTech designs and architects custom software platforms, high-velocity web applications, and autonomous digital systems.",
    url: "https://varunyatech.com",
    siteName: "VarunyaTech",
    images: [{ url: "/images/architecture/hero-noir.jpg" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-[#E5E2DB] selection:text-[#111215]">
      <body className={`${inter.variable} ${editorial.variable} antialiased bg-[#FAFAF8] text-[#111215] min-h-screen flex flex-col selection:bg-[#E5E2DB] selection:text-[#111215]`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
