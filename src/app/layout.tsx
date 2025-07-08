import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawalFont = Tajawal({
    variable: "--font-tajawal",
    subsets: ["arabic", "latin"],
    weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata = {
    title: "لغة البرمجة الف",
    description: "لغة البرمجة العربية ألف بنسختها الخامسة",
    icons: {
        icon: "/Assets/AlifLogo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar">
            <body className={`${tajawalFont.variable}`}>{children}</body>
        </html>
    );
}
