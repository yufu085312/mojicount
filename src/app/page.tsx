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
import { CheckCircle2, Zap, ShieldCheck, HelpCircle, Keyboard, Copy } from "lucide-react";

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
      <section className="mt-20 space-y-20">
        {/* 1. 使い方 (Usage) */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Keyboard className="text-blue-500" />
              使い方
            </h3>
            <p className="text-slate-500 mt-2">たった3ステップで、詳細な文字数・文章分析が可能です。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "入力", desc: "テキストエリアに文章を入力するか、貼り付けます。ファイルを選択して読み込むことも可能です。", icon: Keyboard },
              { title: "解析", desc: "入力と同時にリアルタイムで解析が始まります。SNSやSEO、原稿用紙の基準に合わせた数値が表示されます。", icon: Zap },
              { title: "活用", desc: "「コピー」ボタンを使って、解析結果や文章を保持できます。作業の効率化にお役立てください。", icon: Copy },
            ].map((step, i) => (
              <div key={i} className="relative p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {i + 1}
                </div>
                <div className="mt-4 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">{step.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 特徴 ＆ 3. メリット */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="text-green-500" />
              MojiCountの特徴
            </h3>
            <ul className="space-y-4">
              {[
                { t: "超高速・リアルタイム解析", d: "一文字入力するごとに瞬時にカウントを更新します。待ち時間はありません。" },
                { t: "高度な日本語分析", d: "ひらがな・カタカナ・漢字の比率や、品詞の分布を詳しく解析できます。" },
                { t: "各種プラットフォーム対応", d: "X(Twitter)、Instagramなど、独自の制限があるSNSに最適化しています。" },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                  <div className="mt-1"><Zap size={20} className="text-blue-500" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.t}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="text-blue-500" />
              利用するメリット
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { t: "登録不要・完全無料", d: "すべての機能を今すぐ無料で利用できます。面倒な登録作業は一切ありません。" },
                { t: "安心のプライバシー保護", d: "入力した内容はサーバーに送信されず、ブラウザ内のみで処理されます。" },
                { t: "多忙な作成者のための設計", d: "コピーボタン、ダークモード、SEO基準の可視化など、効率化を追求しました。" },
              ].map((item, i) => (
                <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-1">{item.t}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. FAQ */}
        <div className="space-y-8 bg-slate-50 dark:bg-slate-800/20 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="text-blue-500" />
              よくある質問 (FAQ)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "入力したデータは保存されますか？", a: "いいえ、入力されたテキストや解析結果がサーバーへ送信・保存されることはありません。すべての処理はブラウザ上で行われるため、機密性の高い文章でも安心してお使いいただけます。" },
              { q: "X(Twitter)の文字計算は正確ですか？", a: "はい、現在のXの仕様に基づき、全角2文字・半角1文字として正確にシミュレートしています。URLやメディアの重み付けにも対応予定です。" },
              { q: "400字詰め原稿用紙の枚数はどう計算されますか？", a: "単純な文字数ではなく、実際の原稿用紙での行の折り返しを考慮したシミュレーション値を表示しています。" },
              { q: "商用利用は可能ですか？", a: "はい、個人・法人問わず、すべての機能を無料で商用利用いただけます。報告なども不要です。" },
            ].map((faq, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex gap-2">
                  <span className="text-blue-500">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 border-l-2 border-blue-500/20">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "入力したデータは保存されますか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "いいえ、入力されたテキストや解析結果がサーバーへ送信・保存されることはありません。すべての処理はブラウザ上で行われるため、機密性の高い文章でも安心してお使いいただけます。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "X(Twitter)の文字計算は正確ですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、現在のXの仕様に基づき、全角2文字・半角1文字として正確にシミュレートしています。"
                  }
                },
                {
                  "@type": "Question",
                  "name": "商用利用は可能ですか？",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、個人・法人問わず、すべての機能を無料で商用利用いただけます。"
                  }
                }
              ]
            }
          ])
        }}
      />
    </div>
  );
}
