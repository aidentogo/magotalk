import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MagoTalk - Web3 播客访谈系列",
  description: "探索 Web3 世界的深度对话，与行业领袖一起探讨区块链、DeFi、NFT 等前沿话题",
  keywords: ["Web3", "区块链", "播客", "访谈", "DeFi", "NFT", "元宇宙"],
  authors: [{ name: "MAGO" }],
  openGraph: {
    title: "MagoTalk - Web3 播客访谈系列",
    description: "探索 Web3 世界的深度对话，与行业领袖一起探讨区块链、DeFi、NFT 等前沿话题",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
