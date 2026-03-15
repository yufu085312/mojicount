"use client";

import { checkSEOTitle, checkSEODescription, SEOCheckResult } from "@/lib/count";
import { Search, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";

type SEOCounterProps = {
  text: string;
};

export const SEOCounter = ({ text }: SEOCounterProps) => {
  const titleResult = checkSEOTitle(text);
  const descResult = checkSEODescription(text);

  const getStatusConfig = (result: SEOCheckResult) => {
    switch (result.status) {
      case 'optimal':
        return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200', text: '適正（SEO最適）' };
      case 'too_short':
        return { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200', text: '短すぎます' };
      case 'too_long':
        return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50 border-red-200', text: '長すぎます' };
      case 'empty':
      default:
        return { icon: Search, color: 'text-slate-400', bg: 'bg-slate-50 border-slate-200', text: '入力なし' };
    }
  };

  const titleConfig = getStatusConfig(titleResult);
  const descConfig = getStatusConfig(descResult);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-indigo-500 rounded-full inline-block"></span>
        SEO文字数チェック
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Check */}
        <div className={`p-4 rounded-xl border ${titleConfig.bg} dark:bg-slate-800/50 dark:border-slate-700 transition-colors`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">SEOタイトル</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">推奨: {titleResult.min}〜{titleResult.max}文字</p>
            </div>
            <titleConfig.icon className={titleConfig.color} size={24} />
          </div>
          
          <div className="mt-4 flex items-end gap-2">
            <span className={`text-3xl font-bold ${titleResult.status === 'optimal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'}`}>
              {titleResult.current}
            </span>
            <span className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">文字</span>
          </div>
          <div className={`mt-2 text-sm font-semibold flex items-center gap-1 ${titleConfig.color}`}>
            {titleConfig.text}
          </div>
        </div>

        {/* Description Check */}
        <div className={`p-4 rounded-xl border ${descConfig.bg} dark:bg-slate-800/50 dark:border-slate-700 transition-colors`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">メタディスクリプション</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">推奨: {descResult.min}〜{descResult.max}文字</p>
            </div>
            <descConfig.icon className={descConfig.color} size={24} />
          </div>
          
          <div className="mt-4 flex items-end gap-2">
            <span className={`text-3xl font-bold ${descResult.status === 'optimal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'}`}>
              {descResult.current}
            </span>
            <span className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">文字</span>
          </div>
          <div className={`mt-2 text-sm font-semibold flex items-center gap-1 ${descConfig.color}`}>
            {descConfig.text}
          </div>
        </div>
      </div>
    </div>
  );
};
