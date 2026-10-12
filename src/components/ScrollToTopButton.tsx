import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }

      // Show button after scrolling down 80px
      if (scrollTop > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG Circular progress calculations
  const radius = 22;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative w-13 h-13 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl flex flex-col items-center justify-center cursor-pointer group hover:scale-105 active:scale-95 transition-all select-none"
        title={`点击置顶 (${scrollProgress}%)`}
        aria-label="返回顶部"
      >
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 52 52"
        >
          {/* Background track */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            className="stroke-slate-100 dark:stroke-slate-800/80"
            strokeWidth={strokeWidth}
          />
          {/* Dynamic progress bar */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-150 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Content: Upward Arrow and Scroll Percentage */}
        <div className="relative z-10 flex flex-col items-center justify-center -space-y-0.5">
          <ArrowUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-[10px] font-bold font-mono text-slate-700 dark:text-slate-200 tracking-tight">
            {scrollProgress}%
          </span>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md">
          置顶 {scrollProgress}%
        </div>
      </button>
    </div>
  );
};
