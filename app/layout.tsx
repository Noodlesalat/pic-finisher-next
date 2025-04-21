import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Lokale Fonts einbinden
const geistSans = localFont({
  src: "./fonts/geist-v1-latin-regular.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-v1-latin-regular.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Image Finisher",
  description: "Image Finisher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
