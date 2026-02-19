import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "eSIM 出國上網 | 日韓泰越 3分鐘搞定",
  description:
    "免換卡、掃碼即用。日本、韓國、泰國、越南 eSIM，NT$89 起。台灣出國旅客首選 eSIM 平台。",
  openGraph: {
    title: "eSIM 出國上網 | 日韓泰越 3分鐘搞定",
    description: "免換卡、掃碼即用。日本、韓國、泰國、越南 eSIM，NT$89 起。",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
