import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, Zap, Gift, Bookmark, ArrowRight, ShieldCheck, BookOpen,
  Smartphone, Monitor, Cpu, Bot, Tv, Lock, ChevronDown, CheckCircle2, AlertTriangle, Clock, Eye, Globe, ShoppingBag
} from 'lucide-react';
import { siteConfig, faqItemsSchema } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { navigateTo, articles } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Latest 6 articles sorted by publication date
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 6);


  // Featured topics grid
  const featuredTopics = [
    {
      title: "AI 与 ChatGPT/Claude 试用指南",
      category: "Google 登录与排坑",
      desc: "从客户端下载到 Google 账号一键登录，深度解决账号地区变动导致无法登录 AI 的全套方案。",
      icon: Bot,
      path: '/blog',
      params: { slug: 'ai-tools-network-optimization-guide' }
    },
    {
      title: "外贸出海与跨境办公保障",
      category: "外贸与出海办公",
      desc: "解决 TikTok 零播放限流、PayPal 资金风控关联，以及 Zoom/Teams 跨洋会议防断流实战方案。",
      icon: Globe,
      path: '/blog',
      params: { slug: 'cross-border-business-network-guide' }
    },
    {
      title: "全平台客户端小白教程",
      category: "新手保姆级",
      desc: "涵盖 Windows、macOS、iOS 与 Android，从零手把手教你导入节点与一键极速连接。",
      icon: Cpu,
      path: '/blog',
      params: { slug: 'all-platform-client-setup-guide' }
    },
    {
      title: "4K / 8K 流媒体影音解锁",
      category: "Netflix / Disney+",
      desc: "杜比视界（Dolby Vision）与 Atmos 顶级解码体验，智能 DNS 动态识别防封。",
      icon: Tv,
      path: '/blog',
      params: { slug: '4k-8k-streaming-unlock-guide' }
    }
  ];

  // Scenarios grid
  const scenarios = [
    { id: 'mobile', title: '手机端', desc: 'iOS 免换区与 Android 傻瓜部署', icon: Smartphone, slug: 'device-setup' },
    { 
      id: 'desktop', 
      title: '电脑端', 
      desc: 'Win 11 / macOS 规则分流', 
      icon: Monitor, 
      slug: 'desktop-client-airport-subscription-setup-and-troubleshooting',
      path: '/blog' 
    },
    { 
      id: 'trade', 
      title: '跨境贸易', 
      desc: '亚马逊/Temu/TikTok 出海防关联', 
      icon: ShoppingBag, 
      slug: 'cross-border-ecommerce-amazon-temu-shein-aliexpress-guide',
      path: '/blog' 
    },
    { id: 'ai', title: 'AI 效率工具', desc: 'ChatGPT/Claude 高并发API优化', icon: Bot, slug: 'ai-tools' },
    { id: 'streaming', title: '流媒体', desc: '4K/8K 无缓冲流畅播', icon: Tv, slug: 'streaming' },
    { id: 'privacy', title: '隐私与安全', desc: 'Kill Switch 防断网数据泄露', icon: Lock, slug: 'privacy-security' }
  ];

  // Schema.org JSON-LD generation for search engines
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItemsSchema.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50/60 via-slate-50 to-slate-50 dark:from-indigo-950/30 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {siteConfig.tagline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('/guides', { slug: 'top-recommendations' })}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>梯子节点推荐</span>
            </button>
            <button
              onClick={() => navigateTo('/blog', { slug: 'all-platform-client-setup-guide' })}
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>浏览实操配置教程</span>
            </button>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">


        {/* 3. Featured / Hot Topics Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
                热门主题
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                针对当前高频使用需求的深度知识拆解
              </p>
            </div>
            <button 
              onClick={() => navigateTo('/blog/categories')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              查看全部主题 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((feat, idx) => (
              <div
                key={idx}
                onClick={() => navigateTo(feat.path, feat.params)}
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-md">
                      {feat.category}
                    </span>
                    <feat.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
                  <span>进入阅读</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Recommendation & Risk Entrance Cards Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block"></span>
                核心推荐与风险预警专区
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                高价值导航页：红榜推选与黑榜避坑
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Recommendation Hero Card */}
            <div 
              onClick={() => navigateTo('/guides', { slug: 'top-recommendations' })}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-md hover:border-amber-400 transition-all group"
            >
              <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-md font-extrabold text-xs mb-3 border border-amber-200 dark:border-amber-800/60">
                <Award className="w-3.5 h-3.5 text-amber-600" /> 2026年度榜单
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                综合推荐榜
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                基于 90 天长期稳定性监测与多维度测速，精选低延迟专线、4K/8K 流媒体极速解锁与高口碑优质节点。
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>立即查看详细排名表</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Matrix Comparison Card */}
            <div 
              onClick={() => navigateTo('/guides', { slug: 'performance-comparison' })}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all group"
            >
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-md font-bold text-xs mb-3 border border-indigo-200 dark:border-indigo-800/60">
                <Zap className="w-3.5 h-3.5" /> 10维参数矩阵
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                横向性能PK与测速方法
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                包含真实节点延迟、首帧加载时间（TTFB）、最高吞吐带宽及硬件兼容度完整表格。
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>进入对比矩阵</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Risk Warning Card */}
            <div 
              onClick={() => navigateTo('/category', { slug: 'risk-warnings' })}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-md hover:border-rose-400 transition-all group"
            >
              <div className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 px-2.5 py-1 rounded-md font-bold text-xs mb-3">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> 高危警示
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                避坑指南与黑名单预警
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                曝光搜索引擎竞价广告诱导下载的山寨恶意客户端、窃取账号明文与植入挖矿木马列表。
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                <span>查看曝光名单</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </section>

        {/* 按使用场景找答案 */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              按使用场景与设备快速找答案
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              无论您使用的是苹果、安卓还是用于跨境贸易、AI 生成，都能一键定位专属指南
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {scenarios.map((scen) => (
              <div
                key={scen.id}
                onClick={() => {
                  if (scen.path) {
                    navigateTo(scen.path, { slug: scen.slug });
                  } else {
                    navigateTo('/category', { slug: scen.slug });
                  }
                }}
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <scen.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600">
                  {scen.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {scen.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Recent Key Updates (Chronological Articles List) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-indigo-600" />
                近期重点更新
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                按发布时间倒序排列的最新评测文章与图文教程
              </p>
            </div>
            <button
              onClick={() => navigateTo('/blog/categories')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              浏览所有文章 ({articles.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {recentArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigateTo('/blog', { slug: art.slug })}
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                {/* Cover thumbnail */}
                <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {art.isSticky && (
                    <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                      置顶重点
                    </span>
                  )}
                </div>

                {/* Article Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold px-2 py-0.5 rounded">
                      {art.categoryId === 'evaluations' ? '评测' : art.categoryId === 'tutorials' ? '教程' : '资讯'}
                    </span>
                    <span>•</span>
                    <span>{art.publishDate}</span>
                    <span>•</span>
                    <span>{art.readTime}阅读</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {art.views}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>

                  <div className="pt-1 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {art.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      阅读全文 <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {articles.length > 6 && (
            <div className="text-center pt-2">
              <button
                onClick={() => navigateTo('/blog')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all group"
              >
                <span>浏览全部文章目录（共 {articles.length} 篇）</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </section>




        {/* 9. FAQ Accordion & Schema Preview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                常见问题解答 (FAQ)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                关于独立评测机制、退款保证与联盟披露的回答
              </p>
            </div>
          </div>

          {/* Accordions */}
          <div className="space-y-3">
            {faqItemsSchema.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-xs flex items-center justify-center font-mono">
                        Q
                      </span>
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
