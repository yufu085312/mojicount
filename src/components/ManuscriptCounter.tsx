"use client";

import { getManuscriptPages } from "@/lib/count";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

type ManuscriptCounterProps = {
  text: string;
};

export const ManuscriptCounter = ({ text }: ManuscriptCounterProps) => {
  const pages = getManuscriptPages(text);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-xl text-amber-600 dark:text-amber-400">
          <BookOpen size={24} />
        </div>
        <div>
          <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">400字詰め原稿用紙</h3>
          <p className="text-sm text-amber-700 dark:text-amber-300">学校の課題や、小説などの原稿作成に</p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
          {pages} <span className="text-xl font-bold text-amber-800 dark:text-amber-200">枚</span>
        </div>
      </div>
    </motion.div>
  );
};
