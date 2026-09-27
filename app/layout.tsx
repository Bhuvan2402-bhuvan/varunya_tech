import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AmbientSound } from "@/components/ui/AmbientSound";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Varunya Technologies | Custom Software & Web Development Company",
  description: "We design and develop custom software solutions tailored to business and educational needs. Building secure, scalable & modern web applications delivered within 30–40 days with ongoing post-launch support.",
  keywords: ["Varunya Technologies", "Custom Software Development", "Web Applications", "React.js", "Next.js", "Node.js", "ERP Platform", "EdTech Development"],
  openGraph: {
    title: "Varunya Technologies - Building Secure, Scalable & Modern Web Applications",
    description: "Custom software development agency delivering secure, scalable digital solutions with continuous client support.",
    url: "https://varunyatech.com",
    siteName: "Varunya Technologies",
    images: [{ url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth selection:bg-[#FF5500] selection:text-white">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#070708] text-slate-100 min-h-screen flex flex-col selection:bg-[#FF5500] selection:text-white`}>
        <CustomCursor />
        <AmbientSound />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
