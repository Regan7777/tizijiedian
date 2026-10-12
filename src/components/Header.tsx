import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, Sun, Moon, Menu, X, ChevronDown, 
  ShieldCheck, Award, Zap, BookOpen, Layers, Info, Settings, ArrowRight
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const { theme, toggleTheme, navigateTo, setIsSearchOpen, currentRoute } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  const toggleMobileExpand = (key: string) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    {
      label: '首页',
      path: '/',
    },
    {
      label: '博客',
      path: '/blog',
    },
    {
      label: '推荐',
      dropdown: [
        { label: '机场总榜', path: '/guides', params: { slug: 'top-recommendations' } },
        { label: '评测中心', path: '/guides', params: { slug: 'eval-center' } },
        { label: '价格对比', path: '/guides', params: { slug: 'performance-comparison' } },
      ]
    },
    {
      label: '工具',
      dropdown: [
        { label: '机场节点测速', path: '/blog', params: { slug: 'speedtest-nodes-batch-testing-guide' } },
        { label: 'iOS 小火箭', path: '/blog', params: { slug: 'ios-shadowrocket-setup-and-rules-tutorial' } },
        { label: 'Android Clash', path: '/blog', params: { slug: 'android-clash-meta-setup-tutorial' } },
        { label: 'Clash Verge', path: '/blog', params: { slug: 'desktop-client-airport-subscription-setup-and-troubleshooting' } },
        { label: '免费 Apple ID', path: '/blog', params: { slug: 'free-us-apple-id-registration-guide' } },
        { label: '路由器', path: '/blog', params: { slug: 'router-openwrt-transparent-proxy-guide' } },
      ]
    },
    {
      label: '专题',
      dropdown: [
        { label: '专题索引', path: '/blog/categories' },
        { label: '新手入门', path: '/category', params: { slug: 'getting-started' } },
        { label: '客户端/工具教程', path: '/category', params: { slug: 'tool-guides' } },
        { label: '设备教程', path: '/category', params: { slug: 'device-setup' } },
        { label: '常见问题排查', path: '/category', params: { slug: 'troubleshooting' } },
        { label: '隐私与安全', path: '/category', params: { slug: 'privacy-security' } },
        { label: 'AI 工具', path: '/category', params: { slug: 'ai-tools' } },
        { label: '流媒体', path: '/category', params: { slug: 'streaming' } },
        { label: '跨境与办公', path: '/category', params: { slug: 'cross-border-office' } },
        { label: '跑路汇总', path: '/category', params: { slug: 'risk-warnings' } },
      ]
    },
    {
      label: '更多',
      dropdown: [
        { label: '分类', path: '/blog/categories' },
        { label: '联系', path: '/about' },
      ]
    }
  ];

  const handleNavClick = (path: string, params?: Record<string, string>) => {
    navigateTo(path, params);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header transition-colors duration-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200 p-1">
              <BrandLogo size={28} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                梯子节点 <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-xs tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">NODE</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                创意改变生活 · 独立客观选型指南
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, idx) => {
              const isActive = currentRoute.path === item.path;
              return (
                <div 
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.path, item.params)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive 
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50' 
                        : 'text-slate-7 shadow-none text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.dropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 ${activeDropdown === item.label ? 'rotate-180 text-indigo-600' : ''}`} />
                    )}
                  </button>

                  {/* Standard Compact Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 min-w-[130px] pt-1.5 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 space-y-0.5">
                        {item.dropdown.map((sub, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleNavClick(sub.path, sub.params)}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors block"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-xs font-medium transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">搜索评测/教程...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded shadow-xs text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Day / Night Mode Switcher (Icon Only) */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-400 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
              title={`切换为${theme === 'light' ? '黑夜模式' : '白天模式'}`}
              aria-label="切换黑夜/白天模式"
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400 group-hover:-rotate-12 transition-transform" />
              )}
            </button>


            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          {navItems.map((item, idx) => (
            <div key={idx} className="border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleNavClick(item.path)}
                  className="font-bold text-base text-slate-800 dark:text-slate-200 py-1.5 flex items-center gap-2"
                >
                  <span>{item.label}</span>
                </button>
                {item.dropdown && (
                  <button 
                    onClick={() => toggleMobileExpand(item.label)}
                    className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded[item.label] ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {/* Mobile Submenu Dropdown */}
              {item.dropdown && mobileExpanded[item.label] && (
                <div className="pl-3 mt-1 space-y-1 border-l-2 border-indigo-500/30">
                  {item.dropdown.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleNavClick(sub.path, sub.params)}
                      className="block text-left w-full py-1.5 px-2 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium text-sm flex items-center justify-between border border-slate-200 dark:border-slate-700"
            >
              <span className="flex items-center gap-2">
                {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                <span>显示模式：{theme === 'light' ? '白天模式' : '黑夜模式'}</span>
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                切换为{theme === 'light' ? '黑夜' : '白天'}
              </span>
            </button>

          </div>
        </div>
      )}
    </header>
  );
};
