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
    </div>
  );
}
