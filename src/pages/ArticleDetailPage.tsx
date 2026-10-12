import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, Clock, Calendar, Tag, 
  ArrowLeft, ArrowRight, List, ShieldCheck, Share2, AlertTriangle, ExternalLink
} from 'lucide-react';
import { siteConfig, articlesData } from '../data/mockData';

interface ArticleDetailPageProps {
  slug?: string;
}

// Inline markdown renderer helper
const renderInlineMarkdown = (text: string) => {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={key++} className="font-bold text-slate-900 dark:text-white">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(<code key={key++} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        parts.push(
          <a key={key++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-0.5">
            <span>{linkMatch[1]}</span>
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
      }
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

// Block markdown content renderer
const DynamicMarkdownBody: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let secIdx = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // Horizontal Rule
    if (line === '---' || line === '***') {
      elements.push(<hr key={key++} className="border-slate-200 dark:border-slate-800 my-6" />);
      i++;
      continue;
    }

    // Fenced Code Block (```)
    if (line.startsWith('```')) {
      const lang = line.replace(/^```/, '').trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      const codeContent = codeLines.join('\n');

      elements.push(
        <div key={key++} className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 my-4 text-xs font-mono shadow-md">
          {lang && (
            <div className="bg-slate-900 px-4 py-1.5 text-slate-400 text-[11px] font-bold border-b border-slate-800 uppercase flex items-center justify-between">
              <span>{lang}</span>
              <span className="text-[10px] text-slate-500 lowercase">配置参考</span>
            </div>
          )}
          <pre className="p-4 text-emerald-400 overflow-x-auto whitespace-pre-wrap">{codeContent}</pre>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith('## ')) {
      secIdx++;
      const text = line.replace(/^##\s+/, '');
      elements.push(
        <h2 key={key++} id={`section-${secIdx}`} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-5 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block shrink-0"></span>
          <span>{renderInlineMarkdown(text)}</span>
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      const text = line.replace(/^###\s+/, '');
      elements.push(
        <h3 key={key++} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-4 pb-1">
          {renderInlineMarkdown(text)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('#### ')) {
      const text = line.replace(/^####\s+/, '');
      elements.push(
        <h4 key={key++} className="text-base font-bold text-slate-900 dark:text-white pt-3">
          {renderInlineMarkdown(text)}
        </h4>
      );
      i++;
      continue;
    }

    // Blockquote or Callout
    if (line.startsWith('>')) {
      const bLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        bLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      const rawText = bLines.join(' ');
      const isNote = rawText.includes('[!NOTE]');
      const isWarn = rawText.includes('[!WARNING]') || rawText.includes('[!CAUTION]');
      const isTip = rawText.includes('[!TIP]');
      const isImportant = rawText.includes('[!IMPORTANT]');
      const cleanText = rawText.replace(/\[!(NOTE|WARNING|CAUTION|TIP|IMPORTANT)\]\s?/, '');

      elements.push(
        <div key={key++} className={`p-4 rounded-xl my-4 text-xs sm:text-sm border-l-4 leading-relaxed ${
          isWarn ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-200' :
          isTip ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200' :
          isImportant ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200' :
          'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-950 dark:text-indigo-200'
        }`}>
          {renderInlineMarkdown(cleanText)}
        </div>
      );
      continue;
    }

    // Markdown Table
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headerCols = tableLines[0].split('|').slice(1, -1).map(c => c.trim());
        const rowLines = tableLines.slice(2);
        elements.push(
          <div key={key++} className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 my-4 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  {headerCols.map((h, hIdx) => (
                    <th key={hIdx} className="p-3">{renderInlineMarkdown(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {rowLines.map((r, rIdx) => {
                  const cols = r.split('|').slice(1, -1).map(c => c.trim());
                  return (
                    <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      {cols.map((col, cIdx) => (
                        <td key={cIdx} className="p-3 text-slate-700 dark:text-slate-300">
                          {renderInlineMarkdown(col)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Unordered List
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('* ') || lines[i].trim().startsWith('- '))) {
        listItems.push(lines[i].trim().replace(/^[\*\-]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="space-y-1.5 pl-5 list-disc text-slate-700 dark:text-slate-300 text-sm leading-relaxed my-3">
          {listItems.map((item, lIdx) => (
            <li key={lIdx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(line)) {
      const oItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        oItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="space-y-1.5 pl-5 list-decimal text-slate-700 dark:text-slate-300 text-sm leading-relaxed my-3">
          {oItems.map((item, oIdx) => (
            <li key={oIdx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular Paragraph
    elements.push(
      <p key={key++} className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed my-3">
        {renderInlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-2">{elements}</div>;
};

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug = 'top-5-vpn-for-chatgpt-2026' }) => {
  const { articles, navigateTo, categories } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('section-1');

  const article = articles.find(a => a.slug === slug) 
    || articlesData.find(a => a.slug === slug) 
    || (slug.includes('ai-tools') ? (articles.find(a => a.id === 'art-3') || articlesData.find(a => a.id === 'art-3')) : null)
    || articles[0] 
    || articlesData[0];

  // Dynamic Table of Contents from article.content
  const tocItems = useMemo(() => {
    if (!article.content) return [];
    const lines = article.content.split('\n');
    const items: { id: string; text: string }[] = [];
    let h2Idx = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        h2Idx++;
        const text = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '');
        items.push({ id: `section-${h2Idx}`, text });
      }
    }
    return items;
  }, [article.content]);

  // Article index for Prev / Next article
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // Category and Subcategory objects
  const parentCategory = categories.find(c => c.id === article.categoryId);
  const subCategory = parentCategory?.subcategories.find(s => s.id === article.subcategoryId);

  // Related articles
  const relatedArticles = articles.filter(a => a.id !== article.id && a.categoryId === article.categoryId).slice(0, 3);

  // Scroll Progress and active heading listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }

      // Check current section
      for (let i = tocItems.length; i >= 1; i--) {
        const el = document.getElementById(`section-${i}`);
        if (el && el.getBoundingClientRect().top < 300) {
          setActiveHeadingId(`section-${i}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  // Handle navigating back to article list preserving page
  const handleBackToList = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    const lastPath = sessionStorage.getItem('last_article_list_path') || '/blog';
    const lastSlug = sessionStorage.getItem('last_article_list_slug');
    const lastPage = sessionStorage.getItem('last_article_list_page') || '1';
    const params: Record<string, string> = { page: lastPage };
    if (lastSlug) params.slug = lastSlug;
    navigateTo(lastPath, params);
  };

  return (
    <div className="relative animate-in fade-in duration-200">
      
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Breadcrumbs & Quick Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors cursor-pointer"
              title="返回刚才浏览的文章列表并保留翻页"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回列表</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 transition-colors">
              首页
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            {parentCategory && (
              <>
                <button 
                  onClick={() => {
                    const lastPage = sessionStorage.getItem(`archive_page_${parentCategory.slug}`) || '1';
                    navigateTo('/category', { slug: parentCategory.slug, page: lastPage });
                  }} 
                  className="hover:text-indigo-600 transition-colors"
                >
                  {parentCategory.name}
                </button>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            {subCategory && (
              <>
                <button 
                  onClick={() => {
                    const lastPage = sessionStorage.getItem(`archive_page_${subCategory.slug}`) || '1';
                    navigateTo('/category', { slug: subCategory.slug, page: lastPage });
                  }} 
                  className="hover:text-indigo-600 transition-colors"
                >
                  {subCategory.name}
                </button>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{article.title}</span>
          </div>
        </div>

        {/* Article Header & Meta */}
        <header className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-md">
              {parentCategory?.name || '深度评测'}
            </span>
            {subCategory && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold px-2 py-0.5 rounded">
                {subCategory.name}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 发布：{article.publishDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 更新：{article.updateDate}</span>
            <span>•</span>
            <span>{article.readTime}阅读</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[21/9] sm:aspect-[24/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md relative group">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback-view');
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
          <div className="image-fallback-view hidden absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-12 flex flex-col justify-between text-white border border-indigo-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest uppercase bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                TECH LAB · DEEP DIVE
              </span>
              <span className="text-xs text-slate-400 font-mono">2026 EDITION</span>
            </div>
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white line-clamp-2">
                {article.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 opacity-90">
                {article.excerpt}
              </p>
            </div>
            <div className="text-[11px] text-indigo-400 font-mono">
              ✦ 实测验证 · 深度原理解析 · 权威方案
            </div>
          </div>
        </div>

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Pros / Cons Quick Card */}
            {(article.pros || article.cons) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span>核心亮点 (Pros)</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {article.pros?.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> 局限与短板 (Cons)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {article.cons?.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Mobile TOC */}
            {tocItems.length > 0 && (
              <div className="lg:hidden p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl space-y-2">
                <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <List className="w-4 h-4 text-indigo-500" /> 文章目录 (点击跳转)
                </h3>
                <div className="space-y-1 text-xs">
                  {tocItems.map(item => (
                    <a key={item.id} href={`#${item.id}`} className="block py-1 text-indigo-600 dark:text-indigo-400 hover:underline">
                      {item.text}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Markdown Article Body */}
            <article className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-6 font-normal">
              {article.content ? (
                <DynamicMarkdownBody content={article.content} />
              ) : (
                <p>{article.excerpt}</p>
              )}
            </article>

            {/* Tags array */}
            <div className="pt-6 flex flex-wrap items-center gap-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> 文章标签：
              </span>
              {article.tags.map((t, idx) => (
                <span
                  key={idx}
                  onClick={() => navigateTo('/blog/categories')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* FTC & Affiliate Disclaimer Box */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 space-y-1 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                免责声明与联盟披露
              </div>
              <p className="leading-relaxed text-[11px]">
                {siteConfig.adDisclosure}
              </p>
            </div>

            {/* Return to List Action Banner */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleBackToList}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-200/80 dark:border-indigo-800/80 transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回刚才浏览的文章列表（保持在刚才的页码）</span>
              </button>
            </div>

            {/* Prev / Next Article Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {prevArticle ? (
                <div
                  onClick={() => navigateTo('/blog', { slug: prevArticle.slug })}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-colors group space-y-1"
                >
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> 上一篇
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 line-clamp-1">
                    {prevArticle.title}
                  </h4>
                </div>
              ) : <div />}

              {nextArticle && (
                <div
                  onClick={() => navigateTo('/blog', { slug: nextArticle.slug })}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-colors group space-y-1 text-right"
                >
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
                    下一篇 <ArrowRight className="w-3 h-3" />
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 line-clamp-1">
                    {nextArticle.title}
                  </h4>
                </div>
              )}
            </div>

            {/* Related Articles Grid */}
            {relatedArticles.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  为您推荐的同类相关文章
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => navigateTo('/blog', { slug: rel.slug })}
                      className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-colors space-y-2 group"
                    >
                      <img src={rel.coverImage} alt={rel.title} className="w-full h-24 object-cover rounded-lg" />
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{rel.publishDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* Right Floating TOC Sidebar (Desktop Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents Floating Card */}
              {tocItems.length > 0 && (
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <List className="w-4 h-4 text-indigo-500" />
                    文章浮动目录导航
                  </h3>
                  <nav className="space-y-1 text-xs">
                    {tocItems.map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block py-1.5 px-3 rounded-lg transition-colors font-medium ${
                          activeHeadingId === item.id
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Quick Share / Bookmark Button */}
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('文章链接已成功复制到剪贴板！');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-indigo-500" />
                <span>分享本篇评测</span>
              </button>

            </div>
          </aside>

        </div>

      </div>
    </div>
  );
};
