import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "出海工具箱 & API/SDK 灵感库 · 一人公司决策导航",
  description:
    "约 220 个出海生存工具、独立开发 SaaS 积木和有趣冷门的 API/SDK。每条讲清是啥、定价、中国人出海适不适用、坑和替代品。",
};

// 进入页面前先根据 localStorage / 系统偏好设置深色类,避免闪白
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-8 text-center text-sm text-muted-foreground">
          出海工具箱 & API/SDK 灵感库 · 让你少走两年弯路 · 为一人公司而生
        </footer>
      </body>
    </html>
  );
}
