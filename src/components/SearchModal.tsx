import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, FileText, Bookmark, ArrowRight, Tag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, articles, guides, categories, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredArticles = articles.filter(a => 
    query.trim() === '' || 
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredGuides = guides.filter(g =>
    query.trim() === '' ||
    g.title.toLowerCase().includes(query.toLowerCase()) ||
    g.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectArticle = (slug: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigateTo('/blog', { slug });
  };

  const handleSelectGuide = (slug: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigateTo('/guides', { slug });
  };

  const handleSelectCategory = (slug: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigateTo('/category', { slug });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/50">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索评测、技术教程、软件对比或标签..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base font-medium"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-800"
            >
              清空
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Quick Categories Tags */}
          {query === '' && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> 热门推荐分类与标签
              </div>
              <div className="flex flex-wrap gap-2">
                {['2026推荐', '性能评测', '新手入门', 'AI工具', 'ChatGPT', '流媒体', '隐私与安全', '风险预警'].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 font-medium transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guide / Special Topic Results */}
          {filteredGuides.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" /> 专题与排行榜 ({filteredGuides.length})
              </div>
              <div className="space-y-1.5">
                {filteredGuides.map(guide => (
                  <div
                    key={guide.id}
                    onClick={() => handleSelectGuide(guide.slug)}
                    className="p-3 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-indigo-200 dark:hover:border-slate-700 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {guide.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {guide.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Results */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> 文章与评测内容 ({filteredArticles.length})
            </div>
            {filteredArticles.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                未找到与 "{query}" 相关的文章，试着换个搜索词吧
              </div>
            ) : (
              <div className="space-y-2">
                {filteredArticles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => handleSelectArticle(art.slug)}
                    className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer border border-slate-100 dark:border-slate-800/60 transition-colors group flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                        {art.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono">
                          {art.readTime}
                        </span>
                        {art.tags.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-[10px] text-indigo-500 font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>按 <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">ESC</kbd> 退出搜索</span>
          <span>梯子节点 智能站内索引</span>
        </div>
      </div>
    </div>
  );
};
