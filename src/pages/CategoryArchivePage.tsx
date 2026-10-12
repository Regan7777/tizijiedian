import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, ChevronDown, Clock, Eye, Tag, Folder, Sparkles, TrendingUp, Layers } from 'lucide-react';
import { seoCuratedTags } from '../data/mockData';

interface CategoryArchivePageProps {
  slug?: string;
}

export const CategoryArchivePage: React.FC<CategoryArchivePageProps> = ({ slug = 'evaluations' }) => {
  const { categories, articles, navigateTo, currentRoute, setIsSearchOpen, setSearchQuery } = useApp();
  const pageSize = 4;
  const isAll = slug === 'all' || slug === 'blog';
  const storageKey = `archive_page_${slug || 'all'}`;

  // Read initial page from URL query param, then sessionStorage, default to 1
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (currentRoute.params?.page) {
      const p = parseInt(currentRoute.params.page, 10);
      if (!isNaN(p) && p >= 1) return p;
    }
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      const p = parseInt(saved, 10);
      if (!isNaN(p) && p >= 1) return p;
    }
    return 1;
  });

  const [isTagsOpen, setIsTagsOpen] = useState(false);

  // Sync currentPage with URL param or sessionStorage when slug or currentRoute.params.page changes
  useEffect(() => {
    if (currentRoute.params?.page) {
      const p = parseInt(currentRoute.params.page, 10);
      if (!isNaN(p) && p >= 1) {
        setCurrentPage(p);
        sessionStorage.setItem(storageKey, String(p));
        return;
      }
    }
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      const p = parseInt(saved, 10);
      if (!isNaN(p) && p >= 1) {
        setCurrentPage(p);
        return;
      }
    }
    setCurrentPage(1);
  }, [slug, currentRoute.params?.page]);

  // Find target category or subcategory matching the slug
  let currentCat = isAll ? undefined : categories.find(c => c.slug === slug);
  let currentSubCat = undefined;

  if (!isAll && !currentCat) {
    for (const cat of categories) {
      const foundSub = cat.subcategories.find(s => s.slug === slug);
      if (foundSub) {
        currentCat = cat;
        currentSubCat = foundSub;
        break;
      }
    }
  }

  // Fallback to first category if not matched
  if (!isAll && !currentCat) {
    currentCat = categories[0];
  }

  const titleName = isAll 
    ? '梯子节点博客｜科学上网教程与机场评测合集' 
    : (currentSubCat ? currentSubCat.name : currentCat?.name || '');
  const descriptionText = isAll 
    ? '按发布时间汇总梯子节点的 VPN 推荐、机场评测、Clash 与 Shadowrocket 教程、AI 工具访问和科学上网避坑文章。' 
    : (currentSubCat ? currentSubCat.description : currentCat?.description || '');

  // Filter articles belonging to this category or subcategory (prioritizing isSticky articles to the very top)
  const filteredArticles = isAll
    ? [...articles].sort((a, b) => {
        if (a.isSticky && !b.isSticky) return -1;
        if (!a.isSticky && b.isSticky) return 1;
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      })
    : articles.filter(a => {
        if (currentSubCat) {
          return a.subcategoryId === currentSubCat.id;
        }
        return a.categoryId === currentCat?.id;
      }).sort((a, b) => {
        if (a.isSticky && !b.isSticky) return -1;
        if (!a.isSticky && b.isSticky) return 1;
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });

  // Pagination slice
  const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  // Auto-adjust if safePage changed
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
      sessionStorage.setItem(storageKey, String(totalPages));
    }
  }, [totalPages, currentPage]);

  const paginatedArticles = filteredArticles.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handlePageChange = (newPage: number) => {
    const validPage = Math.min(Math.max(1, newPage), totalPages);
    setCurrentPage(validPage);
    sessionStorage.setItem(storageKey, String(validPage));
    const currentParams = currentRoute.params || {};
    navigateTo(currentRoute.path, { ...currentParams, page: String(validPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (art: typeof articles[0]) => {
    sessionStorage.setItem('last_article_list_path', currentRoute.path);
    if (currentRoute.params?.slug) {
      sessionStorage.setItem('last_article_list_slug', currentRoute.params.slug);
    } else {
      sessionStorage.removeItem('last_article_list_slug');
    }
    sessionStorage.setItem('last_article_list_page', String(safePage));
    if (art.slug === 'top-recommendations') {
      navigateTo('/guides', { slug: 'top-recommendations' });
    } else {
      navigateTo('/blog', { slug: art.slug });
    }
  };

  // Popular / Trending articles for right sidebar
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 4);

  // Priority SEO keywords requested by user to display prominently at the front
  const priorityTags = [
    '快连',
    '一元机场',
    '赔钱机场',
    'vpn',
    '2026机场推荐',
    '翻墙',
    'clash',
    '梯子节点'
  ];

  // Collect all unique tags for tag cloud (combining priority keywords, existing article tags, and high-weight SEO keywords to ~200 tags)
  const allTags = Array.from(new Set([
    ...priorityTags,
    ...articles.flatMap(a => a.tags),
    ...seoCuratedTags
  ]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 transition-colors">
          首页
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        {isAll ? (
          <span className="font-bold text-slate-800 dark:text-slate-200">博客</span>
        ) : (
          <>
            <button onClick={() => navigateTo('/blog/categories')} className="hover:text-indigo-600 transition-colors">
              分类总页
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            {currentSubCat && (
              <>
                <button onClick={() => navigateTo('/category', { slug: currentCat!.slug })} className="hover:text-indigo-600 transition-colors">
                  {currentCat!.name}
                </button>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className="font-bold text-slate-800 dark:text-slate-200">{titleName}</span>
          </>
        )}
      </div>

      {/* Header Banner & SEO Metadata Box */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-lg text-xs font-bold">
          <Folder className="w-4 h-4" /> {isAll ? '博客合集' : '分类归档目录'}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {titleName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          {descriptionText}。梯子节点共收录该主题下的 {filteredArticles.length} 篇深度评测与实操指南。
        </p>

        <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono">
          <span>SEO 页面 Meta Title: {titleName} - 梯子节点独立评测</span>
          <span>•</span>
          <span>Canonical: https://vpnnew.net/{isAll ? 'blog/' : `category/${slug}`}</span>
        </div>

        {slug === 'evaluations' && (
          <div className="mt-4 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">查看全新升级的「梯子节点机场评测中心」</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">稳定机场总榜、性能与价格横向对比、全平台客户端配置与跑路预警黑名单一站式呈现</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('/guides', { slug: 'eval-center' })}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shrink-0 transition-colors shadow-xs"
            >
              直达评测中心
            </button>
          </div>
        )}
      </div>

      {/* Grid Layout: Left Articles List, Right Desktop Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Article Stream (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {paginatedArticles.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400">
              该分类下暂无文章，请探索其他分类。
            </div>
          ) : (
            paginatedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleArticleClick(art)}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group flex flex-col sm:flex-row gap-5"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-52 h-40 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      {art.isSticky && (
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold px-2 py-0.5 rounded text-[10px] shadow-xs">
                          置顶榜单
                        </span>
                      )}
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.publishDate}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex flex-wrap gap-1">
                      {art.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                      阅读全文 →
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={safePage === 1}
                onClick={() => handlePageChange(safePage - 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
              >
                上一页
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    safePage === idx + 1
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={safePage === totalPages}
                onClick={() => handlePageChange(safePage + 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar (Desktop Sticky / Mobile Stacked) */}
        <div className="space-y-6">
          
          {/* Subcategories Widget */}
          {!isAll && currentCat && currentCat.subcategories.length > 0 && (
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                包含子分类
              </h3>
              <div className="space-y-1.5">
                {currentCat.subcategories.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => navigateTo('/category', { slug: sub.slug })}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      currentSubCat?.id === sub.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Articles Widget */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              热门高频阅读榜
            </h3>
            <div className="space-y-3">
              {popularArticles.map((pop, idx) => (
                <div
                  key={pop.id}
                  onClick={() => handleArticleClick(pop)}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                    idx === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {pop.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5" /> {pop.views} 次阅读
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tag Cloud Widget (Collapsible) */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div 
              onClick={() => setIsTagsOpen(!isTagsOpen)}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <Tag className="w-4 h-4 text-indigo-500" />
                标签
                <span className="text-xs font-normal text-slate-400">({allTags.length})</span>
              </h3>
              <div className="p-1 rounded-md text-slate-400 group-hover:text-indigo-600 transition-colors">
                {isTagsOpen ? (
                  <ChevronDown className="w-4 h-4 text-indigo-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>

            {isTagsOpen && (
              <div className="flex flex-wrap gap-1.5 pt-1 animate-in fade-in duration-200">
                {allTags.map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => {
                      setSearchQuery(tag);
                      setIsSearchOpen(true);
                    }}
                    title={`点击搜索包含「${tag}」的相关文章`}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 cursor-pointer font-mono transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
