import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import MobileNavMenu from "@/components/MobileNavMenu";

export const metadata: Metadata = {
  title: "ألف - لغة برمجة عربية",
  description:
    "لغة برمجة عربية متكاملة سهلة القراءة والكتابة مبنية بـ c++ وتستخدم قواعد python",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-full flex flex-col antialiased">
        <ScrollProgress />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <MobileNavMenu />
      </body>
    </html>
  );
}
