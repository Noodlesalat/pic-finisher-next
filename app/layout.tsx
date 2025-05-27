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
  title: "imAIgine App",
  description: "Bildgenerierung und Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
