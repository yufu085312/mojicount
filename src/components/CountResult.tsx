"use client";

import { FileText, Type, Hash, AlignLeft } from "lucide-react";
import { motion } from "framer-motion";

type CountResultProps = {
  all: number;
  withoutSpaces: number;
  lines: number;
  paragraphs: number;
};

export const CountResult = ({ all, withoutSpaces, lines, paragraphs }: CountResultProps) => {
  const items = [
    { label: "文字数（空白込み）", value: all, icon: Type, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "文字数（空白なし）", value: withoutSpaces, icon: FileText, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    { label: "行数", value: lines, icon: Hash, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { label: "段落数", value: paragraphs, icon: AlignLeft, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${item.bg}`}>
              <item.icon className={item.color} size={20} />
            </div>
            <span className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
              {item.label}
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {item.value.toLocaleString()}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
