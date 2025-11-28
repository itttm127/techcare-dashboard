import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "HealthCare Dashboard",
  description: "Healthcare dashboard for patient management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`} style={{ fontFamily: 'var(--font-manrope), Manrope, Arial, Helvetica, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
