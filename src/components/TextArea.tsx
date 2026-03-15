"use client";

import { cn } from "@/lib/utils";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const TextArea = ({ value, onChange, className }: TextAreaProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("クリップボードにコピーしました！");
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={cn("relative flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center px-1">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">テキスト入力</label>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!value}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 disabled:opacity-50 transition-colors"
            title="コピー"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={handleClear}
            disabled={!value}
            className="p-1.5 text-red-500 hover:text-red-700 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 disabled:opacity-50 transition-colors"
            title="クリア"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ここにテキストを入力・ペーストしてください..."
        className="w-full h-64 p-4 text-base bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none resize-y transition-shadow"
      />
    </div>
  );
};
