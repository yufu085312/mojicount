"use client";

import { countForSNS, SNSData } from "@/lib/count";
import { Twitter, Instagram, Youtube, Video } from "lucide-react";
import { motion } from "framer-motion";

type SNSCounterProps = {
  text: string;
};

export const SNSCounter = ({ text }: SNSCounterProps) => {
  const platforms = [
    { name: "X (Twitter)", limit: 280, icon: Twitter, color: "text-slate-800 dark:text-slate-200", bg: "bg-slate-100 dark:bg-slate-800" },
    { name: "Instagram", limit: 2200, icon: Instagram, color: "text-pink-600", bg: "bg-pink-100 dark:bg-pink-900/30" },
    { name: "TikTok", limit: 2200, icon: Video, color: "text-slate-900 dark:text-white", bg: "bg-slate-200 dark:bg-slate-800" },
    { name: "YouTube", limit: 5000, icon: Youtube, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden p-6">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span>
        SNS投稿向け文字数
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((p, index) => {
          const data = countForSNS(text, p.limit, p.name);
          const percent = Math.min((data.current / data.limit) * 100, 100);
          
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${data.isOver ? 'border-red-300 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <p.icon size={18} className={p.color} />
                <span className="font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">{p.name}</span>
              </div>
              
              <div className="flex justify-between items-end mb-2">
                <span className={`text-2xl font-bold ${data.isOver ? 'text-red-500' : 'text-slate-800 dark:text-slate-200'}`}>
                  {data.current}
                  <span className="text-sm text-slate-400 dark:text-slate-500 font-normal"> / {p.limit}</span>
                </span>
              </div>

              {/* プログレスバー */}
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  className={`h-full rounded-full ${data.isOver ? 'bg-red-500' : 'bg-blue-500'}`}
                />
              </div>

              <div className={`text-xs font-medium ${data.isOver ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                {data.isOver ? `制限を ${Math.abs(data.remaining)} 文字超えています` : `残り ${data.remaining} 文字`}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
