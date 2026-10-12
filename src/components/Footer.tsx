import React from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        
        {/* Site Intro Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 cursor-pointer inline-flex group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-slate-900 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform">
              <BrandLogo size={24} />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                梯子节点 <span className="text-indigo-400 text-xs font-mono uppercase">NODE</span>
              </span>
              <p className="text-[10px] text-slate-500">
                创意改变生活 · 独立客观选型指南
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 sm:text-right">
            <p className="font-semibold text-slate-300">评测实验室责任人：{siteConfig.author}</p>
            <p className="text-[11px] text-slate-500">算法与规则基线号：v2026.10-release</p>
          </div>
        </div>

        {/* Site Description */}
        <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
          {siteConfig.description}
        </p>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 {siteConfig.siteName}. All Rights Reserved.</p>
          <p className="text-slate-600 text-[11px]">Designed with Performance & Accessibility in Mind.</p>
        </div>

      </div>
    </footer>
  );
};
