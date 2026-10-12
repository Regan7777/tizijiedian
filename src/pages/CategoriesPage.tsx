import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  FileText, 
  FolderTree, 
  ArrowRight, 
  Search,
  Folder,
  FolderOpen
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, articles, navigateTo } = useApp();
  const [filterText, setFilterText] = useState('');

  // Set of collapsed subcategories (folders)
  const [collapsedSubCats, setCollapsedSubCats] = useState<Set<string>>(new Set());

  // Set of collapsed level-1 categories
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());

  // Helper to count articles in a category or subcategory
  const getSubCatArticleCount = (subId: string) => {
    return articles.filter(a => a.subcategoryId === subId).length;
  };

  const getCatArticleCount = (catId: string) => {
    return articles.filter(a => a.categoryId === catId).length;
  };

  const getArticlesInSubCat = (subId: string) => {
    return articles.filter(a => a.subcategoryId === subId && (
      filterText === '' ||
      a.title.toLowerCase().includes(filterText.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(filterText.toLowerCase())
    ));
  };

  // Toggle single subcategory folder
  const toggleSubCat = (subId: string) => {
    setCollapsedSubCats(prev => {
      const next = new Set(prev);
      if (next.has(subId)) {
        next.delete(subId); // expand
      } else {
        next.add(subId); // collapse
      }
      return next;
    });
  };

  // Toggle level 1 category
  const toggleCat = (catId: string) => {
    setCollapsedCats(prev => {
      const next = new Set(prev);
      if (next.has(catId)) {
        next.delete(catId);
      } else {
        next.add(catId);
      }
      return next;
    });
  };

  // Expand all folders
  const expandAll = () => {
    setCollapsedSubCats(new Set());
    setCollapsedCats(new Set());
  };

  // Collapse all folders
  const collapseAll = () => {
    const allSubIds = new Set<string>();
    categories.forEach(c => c.subcategories.forEach(s => allSubIds.add(s.id)));
    setCollapsedSubCats(allSubIds);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 transition-colors">
          首页
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-800 dark:text-slate-200">博客分类总页</span>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-lg text-xs font-bold">
            <FolderTree className="w-4 h-4" /> 全站树形层级索引
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            博客分类总览
          </h1>
        </div>

        {/* Filter and Quick Toggle controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Quick Expand / Collapse All buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5 shadow-xs"
              title="展开所有文件夹"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>全部展开</span>
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5 shadow-xs"
              title="折叠所有文件夹"
            >
              <Folder className="w-3.5 h-3.5 text-slate-400" />
              <span>全部折叠</span>
            </button>
          </div>

          {/* Filter search input */}
          <div className="w-full sm:w-60 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="搜索文件夹内文章..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Category Tree Hierarchy */}
      <div className="space-y-8">
        {categories.map((cat) => {
          const catTotalCount = getCatArticleCount(cat.id);
          const isCatCollapsed = collapsedCats.has(cat.id);

          // Only show non-empty categories (or if searching)
          if (catTotalCount === 0 && cat.subcategories.length === 0) return null;

          return (
            <div 
              key={cat.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
            >
              {/* Level 1 Category Header (Clickable to collapse/expand entire category) */}
              <div 
                className="p-6 bg-slate-50/70 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-900 transition-colors select-none group"
                onClick={() => toggleCat(cat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cat.name}
                      </span>
                      {isCatCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-indigo-500 group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('/category', { slug: cat.slug });
                    }}
                    className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    title={`浏览「${cat.name}」全部内容`}
                  >
                    <span>浏览分类</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-2xs">
                    {catTotalCount} 篇文章
                  </div>
                </div>
              </div>

              {/* Level 2 Subcategories & Articles list */}
              {!isCatCollapsed && (
                <div className="p-6 space-y-5 animate-in fade-in duration-200">
                  {cat.subcategories.length === 0 ? (
                    <div className="text-xs text-slate-400 italic">该分类暂无二级子分类</div>
                  ) : (
                    cat.subcategories.map((sub) => {
                      const subArticles = getArticlesInSubCat(sub.id);
                      const subCount = getSubCatArticleCount(sub.id);
                      const isSubCollapsed = collapsedSubCats.has(sub.id);

                      if (subCount === 0 && filterText !== '') return null;

                      return (
                        <div 
                          key={sub.id} 
                          className="pl-3 sm:pl-4 border-l-2 border-indigo-200 dark:border-indigo-900/70 space-y-3"
                        >
                          {/* Subcategory Folder Header (Click to open / close folder) */}
                          <div 
                            onClick={() => toggleSubCat(sub.id)}
                            className="flex items-center justify-between p-2.5 -ml-2 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group select-none"
                          >
                            <div className="flex items-center gap-2.5">
                              {/* Open / Close Folder Icon */}
                              <span className="text-lg transition-transform group-hover:scale-110">
                                {isSubCollapsed ? '📁' : '📂'}
                              </span>

                              {/* Folder Name & Count */}
                              <span className="font-bold text-base text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {sub.name}
                              </span>
                              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-500">
                                ({subCount})
                              </span>

                              {/* Chevron Arrow Indicator */}
                              <div className="p-1 rounded-md text-slate-400 group-hover:text-indigo-600 transition-colors">
                                {isSubCollapsed ? (
                                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-indigo-500 group-hover:translate-y-0.5 transition-transform" />
                                )}
                              </div>

                              <span className="text-[11px] text-slate-400 hidden lg:inline font-normal">
                                · {isSubCollapsed ? '点击展开文章' : '点击收起文章'}
                              </span>
                            </div>

                            {/* Right side: description and direct archive link */}
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] text-slate-400 hidden sm:inline">
                                {sub.description}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateTo('/category', { slug: sub.slug });
                                }}
                                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
                                title={`查看「${sub.name}」独立归档页面`}
                              >
                                <span>归档</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Article list in this subcategory (Collapsible) */}
                          {!isSubCollapsed && (
                            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                              {subArticles.length === 0 ? (
                                <p className="text-xs text-slate-400 italic pl-6 py-1">此分类下尚未发布文章</p>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                                  {subArticles.map((art) => (
                                    <div
                                      key={art.id}
                                      onClick={() => {
                                        sessionStorage.setItem('last_article_list_path', '/blog/categories');
                                        sessionStorage.removeItem('last_article_list_slug');
                                        sessionStorage.removeItem('last_article_list_page');
                                        navigateTo('/blog', { slug: art.slug });
                                      }}
                                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800/80 cursor-pointer transition-all hover:shadow-xs group flex items-start gap-3"
                                    >
                                      <FileText className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                      <div className="space-y-1 min-w-0 flex-1">
                                        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                                          {art.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                                          <span>{art.publishDate}</span>
                                          <span>•</span>
                                          <span>{art.readTime}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                        </div>
                      );
                    })
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
