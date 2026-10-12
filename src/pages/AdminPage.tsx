import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, Plus, Edit, Trash2, FileText, Folder, Check, 
  Rss, Globe, Code, ShieldCheck, Tag, Eye, Save, X
} from 'lucide-react';
import { Article } from '../types';

export const AdminPage: React.FC = () => {
  const { articles, categories, addArticle, updateArticle, deleteArticle, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'seo'>('articles');
  
  // Article Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);

  // Dynamic Sitemap & RSS Generators
  const generateSitemap = () => {
    const baseUrl = "https://techpulse-eval.com";
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemapindex.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>2026-10-10</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/categories</loc>
    <lastmod>2026-10-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/guides/top-recommendations</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${articles.map(a => `
  <url>
    <loc>${baseUrl}/blog/${a.slug}</loc>
    <lastmod>${a.updateDate || a.publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;
  };

  const generateRss = () => {
    const baseUrl = "https://techpulse-eval.com";
    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>梯子节点 评测与教程 RSS</title>
    <link>${baseUrl}</link>
    <description>独立·客观·数据驱动的科技选型指南</description>
    <language>zh-CN</language>
    ${articles.map(a => `
    <item>
      <title>${a.title}</title>
      <link>${baseUrl}/blog/${a.slug}</link>
      <description>${a.excerpt}</description>
      <pubDate>${a.publishDate}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;
  };

  const generateRobotsTxt = () => {
    return `User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://techpulse-eval.com/sitemap.xml`;
  };

  const handleCreateNew = () => {
    setEditingArticle({
      id: `art-${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      content: '## 文章标题\n\n正文内容...',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      categoryId: categories[0].id,
      subcategoryId: categories[0].subcategories[0]?.id || '',
      tags: ['2026推荐', '评测'],
      author: {
        name: '智测实验室',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: '评测主编'
      },
      publishDate: new Date().toISOString().split('T')[0],
      updateDate: new Date().toISOString().split('T')[0],
      readTime: '6 分钟',
      views: 1,
      isSticky: false,
      hasAffiliateDisclosure: true
    });
    setIsModalOpen(true);
  };

  const handleSaveArticle = () => {
    if (!editingArticle?.title || !editingArticle?.slug) {
      alert('请填写文章标题和 URL Slug');
      return;
    }
    const exists = articles.some(a => a.id === editingArticle.id);
    if (exists) {
      updateArticle(editingArticle as Article);
    } else {
      addArticle(editingArticle as Article);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-bold mb-2">
            <Settings className="w-4 h-4" /> 站长后台管理系统 (CMS)
          </div>
          <h1 className="text-2xl font-black">
            梯子节点 内容控制台
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            实时发布文章、更新推荐榜单表格、管理分类树与监控 Sitemap / RSS 状态
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>撰写并发布新文章</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-4">
        <button
          onClick={() => setActiveTab('articles')}
          className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'articles'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          文章列表管理 ({articles.length})
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'categories'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Folder className="w-4 h-4" />
          分类模型与树状结构 ({categories.length})
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'seo'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          Sitemap / RSS / SEO 监控
        </button>
      </div>

      {/* TAB 1: Articles List Table */}
      {activeTab === 'articles' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">文章标题</th>
                  <th className="p-4">所属分类</th>
                  <th className="p-4">URL Slug</th>
                  <th className="p-4">发布时间</th>
                  <th className="p-4">阅读量</th>
                  <th className="p-4">状态</th>
                  <th className="p-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white max-w-[280px] line-clamp-1">
                      {art.isSticky && <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded mr-1">置顶</span>}
                      {art.title}
                    </td>
                    <td className="p-4 text-slate-500 font-mono">
                      {art.categoryId}
                    </td>
                    <td className="p-4 text-slate-400 font-mono">
                      /{art.slug}
                    </td>
                    <td className="p-4 text-slate-500">
                      {art.publishDate}
                    </td>
                    <td className="p-4 font-mono text-indigo-600">
                      {art.views}
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        已发布
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => navigateTo('/blog', { slug: art.slug })}
                        className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-indigo-600"
                        title="前台预览"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingArticle(art);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 hover:bg-indigo-100"
                        title="编辑"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('确定删除该文章？')) deleteArticle(art.id);
                        }}
                        className="p-1.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 hover:bg-rose-100"
                        title="删除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Category Tree Editor */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl text-xs text-indigo-700 dark:text-indigo-300 font-medium">
            💡 说明：分类数据采用包含 Level 1 与 Level 2 的双层树状模式，后台可以自由定义层级归属。
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    {cat.name} (/{cat.slug})
                  </span>
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded font-bold">
                    一级分类
                  </span>
                </div>
                <p className="text-xs text-slate-500">{cat.description}</p>

                <div className="pl-3 border-l-2 border-indigo-500 space-y-2">
                  <div className="text-xs font-bold text-slate-400">二级子分类：</div>
                  {cat.subcategories.map((sub) => (
                    <div key={sub.id} className="text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                      <span>• {sub.name} (/{sub.slug})</span>
                      <span className="text-[10px] text-slate-400">{sub.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SEO, Sitemap, RSS Generator Preview */}
      {activeTab === 'seo' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sitemap XML */}
          <div className="p-5 bg-slate-950 text-slate-200 rounded-2xl space-y-3 font-mono text-xs border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Globe className="w-4 h-4" /> sitemap.xml 实时自动生成
              </span>
              <span>200 OK</span>
            </div>
            <pre className="max-h-60 overflow-y-auto">{generateSitemap()}</pre>
          </div>

          {/* RSS Feed XML */}
          <div className="p-5 bg-slate-950 text-slate-200 rounded-2xl space-y-3 font-mono text-xs border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Rss className="w-4 h-4" /> RSS 2.0 Feed (feed.xml)
              </span>
              <span>Ready</span>
            </div>
            <pre className="max-h-60 overflow-y-auto">{generateRss()}</pre>
          </div>

          {/* Robots.txt */}
          <div className="p-5 bg-slate-950 text-slate-200 rounded-2xl space-y-3 font-mono text-xs border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <Code className="w-4 h-4" /> robots.txt
              </span>
            </div>
            <pre>{generateRobotsTxt()}</pre>
          </div>
        </div>
      )}

      {/* Modal Editor Form */}
      {isModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                编辑文章与 SEO 元数据
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">文章标题 (H1)</label>
                <input
                  type="text"
                  value={editingArticle.title || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">URL Slug</label>
                <input
                  type="text"
                  value={editingArticle.slug || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">分类归属</label>
                <select
                  value={editingArticle.categoryId || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, categoryId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">摘要 (Excerpt)</label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">正文 Markdown 内容</label>
                <textarea
                  rows={6}
                  value={editingArticle.content || ''}
                  onChange={e => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  id="sticky"
                  checked={editingArticle.isSticky || false}
                  onChange={e => setEditingArticle({ ...editingArticle, isSticky: e.target.checked })}
                />
                <label htmlFor="sticky" className="font-bold text-slate-700 dark:text-slate-300">设为首页置顶重点文章</label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
              >
                取消
              </button>
              <button
                onClick={handleSaveArticle}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>保存并更新</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
