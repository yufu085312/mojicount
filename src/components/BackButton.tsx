"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export const BackButton = () => {
  return (
    <div className="mb-6">
      <Link href="/" className="inline-block group no-underline">
        <motion.div
          className="flex items-center gap-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium text-sm"
          whileHover={{ x: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>戻る</span>
        </motion.div>
      </Link>
    </div>
  );
};
