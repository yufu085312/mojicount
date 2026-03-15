import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "sonner";
import Link from "next/link";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: "文字数カウントアプリ MojiCount｜SNS・SEO・原稿対応",
  description: "文字数カウントアプリ。SNS（X、Instagramなど）文字数、原稿用紙換算、日本語文字分析、SEO文字数チェックに対応した無料ツールです。リアルタイムで文字数を自動計算します。",
  keywords: ["文字数カウント", "文字数 文字数カウント", "文字数カウント 空白", "文字数カウント 原稿用紙", "日本語 文字数カウント", "SEO 文字数チェック", "SNS文字数"],
  authors: [{ name: "Yufu" }],
  openGraph: {
    title: "文字数カウントアプリ MojiCount",
    description: "SNS文字数、原稿用紙換算、日本語分析、SEO文字数チェックに対応した高機能な無料ツール。",
    url: "https://mojicount.yu-fu.site",
    siteName: "MojiCount",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "文字数カウントアプリ MojiCount",
    description: "SNS文字数、原稿用紙換算、日本語分析、SEO文字数チェックに対応した高機能な無料ツール。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                MojiCount
              </h1>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-sm text-slate-500 dark:text-slate-400 flex flex-col gap-4">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">利用規約</Link>
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">プライバシーポリシー</Link>
              <Link href="/disclaimer" className="hover:text-slate-900 dark:hover:text-white transition-colors">免責事項</Link>
              <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">お問い合わせ</Link>
            </div>
            <div>
              <p>ブラウザ上で完結するため、入力されたデータはサーバーに送信されません。</p>
              <p className="mt-1">© {new Date().getFullYear()} MojiCount. <a href="https://yu-fu.site" target="_blank" rel="noopener noreferrer" className="hover:underline">yu-fu.site</a></p>
            </div>
          </div>
        </footer>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
