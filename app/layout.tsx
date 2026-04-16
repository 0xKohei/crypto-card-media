import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const siteUrl = "https://cryptocardnavi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CryptoCardナビ｜クリプトカード比較・資金移動手段を日本向けに徹底解説",
    template: "%s｜CryptoCardナビ",
  },
  description:
    "日本人向けのクリプトカード比較メディア。掲載中の6カードについて、手数料・還元率・KYC要件・対応地域を比較しています。",
  keywords: [
    "クリプトカード",
    "仮想通貨カード",
    "暗号資産カード",
    "比較",
    "USDT",
    "ビザカード",
    "キャッシュバック",
    "出金",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "CryptoCardナビ",
    title: "CryptoCardナビ｜クリプトカード比較・資金移動手段を日本向けに徹底解説",
    description:
      "日本人向けのクリプトカード比較メディア。手数料・還元率・KYC・対応地域を徹底比較。",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoCardナビ｜クリプトカード比較",
    description: "日本人向けのクリプトカード比較メディア。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
