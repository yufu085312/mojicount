"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

export const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const prevScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = prevScrollY.current;
    
    // 下にスクロール、かつ一定量（150px）以上スクロールしている場合に非表示
    if (latest > previous && latest > 150) {
      setHidden(true);
    } 
    // 上にスクロールしている場合に表示
    else {
      setHidden(false);
    }
    
    prevScrollY.current = latest;
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] // スムーズなイージング
      }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 font-black">
            MojiCount
          </h1>
        </Link>
      </div>
    </motion.header>
  );
};
