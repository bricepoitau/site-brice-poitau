import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://www.bricepoitau-conseils.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brice Poitau Conseils — Structurer votre liberté financière",
    template: "%s — Brice Poitau Conseils",
  },
  description:
    "Cabinet d'ingénierie patrimoniale indépendant. Épargne, immobilier, retraite et transmission : un accompagnement rigoureux et des simulateurs financiers clairs pour éclairer chaque décision.",
  openGraph: {
    title: "Brice Poitau Conseils — Structurer votre liberté financière",
    description:
      "Cabinet d'ingénierie patrimoniale indépendant. Épargne, immobilier, retraite et transmission.",
    url: siteUrl,
    siteName: "Brice Poitau Conseils",
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Brice Poitau Conseils",
  description:
    "Cabinet d'ingénierie patrimoniale indépendant, conseil en gestion de patrimoine pour particuliers.",
  url: siteUrl,
  areaServed: "FR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-cream text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
