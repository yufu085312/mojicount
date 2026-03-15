"use client";

import { useState } from "react";
import { TextArea } from "@/components/TextArea";
import { CountResult } from "@/components/CountResult";
import { SNSCounter } from "@/components/SNSCounter";
import { ManuscriptCounter } from "@/components/ManuscriptCounter";
import { JapaneseAnalyzer } from "@/components/JapaneseAnalyzer";
import { SEOCounter } from "@/components/SEOCounter";
import { countAll, countWithoutSpaces, countLines, countParagraphs } from "@/lib/count";
import { motion } from "framer-motion";

export default function Home() {
  const [text, setText] = useState("");

  const counts = {
    all: countAll(text),
    withoutSpaces: countWithoutSpaces(text),
    lines: countLines(text),
    paragraphs: countParagraphs(text),
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Introduction */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          高機能 文字数カウント
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          リアルタイムで文字数・行数・段落数を素早くカウント。SNS投稿の残り文字数、SEO向けタイトル・ディスクリプションの判定、原稿用紙換算など、文章作成を強力にサポートします。
        </p>
      </div>

      {/* Main Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-2 sm:p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
      >
        <TextArea value={text} onChange={setText} />
      </motion.div>

      {/* Results Section */}
      <div className="space-y-8">
        {/* 基本文字数 */}
        <section>
          <CountResult {...counts} />
        </section>

        {/* SNS Counter - Full Width to prevent wrapping */}
        <section>
          <SNSCounter text={text} />
        </section>

        {/* Japanese Analyzer - Full Width to prevent wrapping */}
        <section>
          <JapaneseAnalyzer text={text} />
        </section>

        {/* Bottom Grid for smaller components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <ManuscriptCounter text={text} />
          </section>
          <section>
            <SEOCounter text={text} />
          </section>
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-10">
        <div className="max-w-3xl mx-auto space-y-6 text-slate-700 dark:text-slate-300">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            MojiCount ｜ 文字数カウントをより便利に、効率的に。
          </h3>
          <p className="leading-relaxed">
            MojiCountは、文章作成に関わるすべての方のために開発された、多機能かつシンプルな文字数カウントツールです。
            ただ文字を数えるだけでなく、SNS投稿やSEOライティング、原稿作成など、特定の用途に合わせた最適な計測をリアルタイムで提供します。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                SNS投稿に最適（X, Instagram）
              </h4>
              <p className="text-sm leading-relaxed">
                プラットフォームごとに異なるカウントルールに対応。特にX（旧Twitter）では、全角・半角の重み付けやURLの固定長カウントを正確にシミュレートし、投稿エラーを未然に防ぎます。
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                SEOライティングのサポート
              </h4>
              <p className="text-sm leading-relaxed">
                Google検索結果で適切に表示されるためのタイトル（約32文字）やメタディスクリプション（約120文字）の目安を可視化。検索エンジン最適化を効率化します。
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                原稿用紙換算と日本語分析
              </h4>
              <p className="text-sm leading-relaxed">
                400字詰め原稿用紙の枚数への自動換算、ひらがな・カタカナ・漢字の比率分析機能を搭載。文章の文体やバランス、読みやすさの客観的な指標として活用できます。
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                安心のプライバシー・安全設計
              </h4>
              <p className="text-sm leading-relaxed">
                入力されたテキストはすべてお使いのブラウザ上で処理され、サーバーに送信されることはありません。機密性の高い文書のカウントも安心してお使いいただけます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "MojiCount",
            "url": "https://mojicount.yu-fu.site",
            "description": "SNS（X, Instagram）、SEO、原稿用紙、日本語分析に対応した高機能な文字数カウントツール。",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "JPY"
            }
          })
        }}
      />
    </div>
  );
}
