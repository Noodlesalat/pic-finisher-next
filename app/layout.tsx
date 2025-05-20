import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

import hsLogo from "@/public/hs-fulda_logo_rechteckig_weiß_keinhintergrund_keineschutzzone_72ppi.png";
import maglabLogo from "@/public/maglab_on-black.png";

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
        <div className="flex min-h-screen w-full items-center relative">
          <div className="flex flex-col items-center justify-center w-64 pl-4">
            <div className="relative w-full flex justify-center">
              <Image
                src={hsLogo}
                alt="HS Fulda Logo"
                className="w-[240px] h-auto object-contain drop-shadow-xl rotate-270"
                height={240}
                priority
                style={{
                  position: "absolute",
                  bottom: "80px",
                  left: "0%",
                  transform: "translateX(-50%)",
                  margin: "0",
                }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col">{children}</div>
          <div className="flex flex-col items-center justify-center w-48 pr-4">
            <div className="relative w-full flex justify-center">
              <Image
                src={maglabLogo}
                alt="Maglab Logo"
                className="h-[120px] w-auto object-contain drop-shadow-xl"
                height={120}
                priority
                style={{
                  position: "absolute",
                  top: "-40px",
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
