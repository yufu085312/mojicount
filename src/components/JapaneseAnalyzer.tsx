"use client";

import { analyzeJapanese, JapaneseAnalysisResult } from "@/lib/japaneseAnalyzer";
import { PieChart } from "lucide-react";

type JapaneseAnalyzerProps = {
  text: string;
};

export const JapaneseAnalyzer = ({ text }: JapaneseAnalyzerProps) => {
  const result = analyzeJapanese(text);
  
  // 総文字数（空白・改行除く）
  const total = Object.values(result).reduce((a, b) => a + b, 0);

  const getPercent = (value: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const categories = [
    { key: 'hiragana' as keyof JapaneseAnalysisResult, label: 'ひらがな', color: 'bg-emerald-400', textColor: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'katakana' as keyof JapaneseAnalysisResult, label: 'カタカナ', color: 'bg-sky-400', textColor: 'text-sky-600 dark:text-sky-400' },
    { key: 'kanji' as keyof JapaneseAnalysisResult, label: '漢字', color: 'bg-rose-400', textColor: 'text-rose-600 dark:text-rose-400' },
    { key: 'alphabet' as keyof JapaneseAnalysisResult, label: '英字', color: 'bg-purple-400', textColor: 'text-purple-600 dark:text-purple-400' },
    { key: 'number' as keyof JapaneseAnalysisResult, label: '数字', color: 'bg-amber-400', textColor: 'text-amber-600 dark:text-amber-400' },
    { key: 'symbol' as keyof JapaneseAnalysisResult, label: '記号・他', color: 'bg-slate-400', textColor: 'text-slate-600 dark:text-slate-400' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
        <PieChart size={20} className="text-emerald-500" />
        日本語文字分類
      </h3>
      
      {/* Visual Bar */}
      <div className="h-4 w-full flex rounded-full overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
        {total > 0 && categories.map((cat) => {
          const val = result[cat.key];
          if (val === 0) return null;
          return (
            <div 
              key={cat.key} 
              className={`h-full ${cat.color} transition-all duration-500`}
              style={{ width: `${(val / total) * 100}%` }}
              title={`${cat.label} ${getPercent(val)}%`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div key={cat.key} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{cat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-bold ${cat.textColor}`}>
                {result[cat.key].toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 w-8 text-right">
                {getPercent(result[cat.key])}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
