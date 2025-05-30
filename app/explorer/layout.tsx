import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bild-Explorer | imAIgine",
  description: "Durchsuche deine generierten Bilder.",
};

export default function ExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Kein globaler Header/Navbar/Footer hier.
          Die Seite app/explorer/page.tsx hat bereits ihren eigenen Header.
          Dieses Layout sorgt dafür, dass das (main)/layout.tsx nicht angewendet wird.
      */}
      {children}
    </>
  );
}
