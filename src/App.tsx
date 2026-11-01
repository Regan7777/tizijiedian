import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryArchivePage } from './pages/CategoryArchivePage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';

const MainLayout: React.FC = () => {
  const { currentRoute, articles, guides } = useApp();

  React.useEffect(() => {
    let title = "梯子节点 | 独立·客观·数据驱动的科技工具与网络服务评测指南";
    let desc = "梯子节点专注于科技工具实测与网络加速服务横评，为您提供最新机场节点测速排行榜、Clash与Sing-box客户端配置教程、流媒体4K/8K解锁及ChatGPT等AI工具加速方案。平台坚持独立客观与真实数据驱动，严选优质BGP中转与IPLC专线，拒绝商业充钱带货，为个人与出海用户提供透明靠谱的选型指南。";
    let canonical = "https://tizijiedian.com/";

    if (currentRoute.path === '/about') {
      title = "关于我们 | 梯子节点实验室";
      desc = "梯子节点实验室是由独立网络系统架构师与网络安全研究者自发组建的第三方客观评测机构。我们依托全球部署的 60 多个自动化监测节点与大带宽测速集群，坚持拒绝任何商业充钱带货、以纯真实数据驱动的评测准则，长期为广大个人与出海企业用户提供透明靠谱的科技工具实测报告、机场翻墙选型横评与网络隐私防追踪避坑指南。";
      canonical = "https://tizijiedian.com/about";
    } else if (currentRoute.path === '/blog/categories') {
      title = "全部分类与专题指南 | 梯子节点";
      desc = "梯子节点全部分类与专题指南导航中心：系统梳理深度评测、实操教程、行业资讯、应用场景与网站公告等五大核心内容板块。无论您是零基础新手快速入门、查找海外跨境电商出海网络综合解决方案，还是对比不同线路协议性能，都能在此快速找到结构清晰、客观透明且数据翔实的高质量技术指南与实测数据，助您轻松实现精准选型决策。";
      canonical = "https://tizijiedian.com/blog/categories";
    } else if (currentRoute.path === '/guides') {
      const gSlug = currentRoute.params?.slug || 'top-recommendations';
      const guide = guides.find(g => g.slug === gSlug);
      if (guide) {
        title = `${guide.title} | 梯子节点`;
        desc = guide.description;
      }
      canonical = `https://tizijiedian.com/guides/${gSlug}`;
    } else if (currentRoute.path === '/category') {
      const cSlug = currentRoute.params?.slug;
      title = "分类专区 | 梯子节点知识库";
      if (cSlug) {
        canonical = `https://tizijiedian.com/category/${cSlug}`;
      }
    } else if (currentRoute.path === '/blog') {
      const aSlug = currentRoute.params?.slug;
      if (aSlug) {
        const art = articles.find(a => a.slug === aSlug);
        if (art) {
          title = `${art.title} | 梯子节点`;
          desc = art.excerpt;
        }
        canonical = `https://tizijiedian.com/blog/${aSlug}`;
      } else {
        title = "全部教程与评测文章 | 梯子节点";
        desc = "梯子节点教程与评测专区汇聚了最新、最全的科学上网实操配置指南与工具横评报告：全面涵盖各平台主流客户端配置教程、机场节点测速排名、流媒体4K/8K解锁技巧、ChatGPT/Claude等AI工具专线加速方案，以及防跑路避坑与网络安全防护策略。所有内容均经实验室严谨实操验证，助您轻松避开各类常见网络错误。";
        canonical = "https://tizijiedian.com/blog";
      }
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical);
  }, [currentRoute, articles, guides]);

  const renderCurrentPage = () => {
    switch (currentRoute.path) {
      case '/':
        return <HomePage />;
      case '/blog/categories':
        return <CategoriesPage />;
      case '/category':
        return <CategoryArchivePage slug={currentRoute.params?.slug} />;
      case '/guides':
        return <GuideDetailPage key={currentRoute.params?.slug || 'guide'} slug={currentRoute.params?.slug} />;
      case '/blog':
        if (currentRoute.params?.slug) {
          if (currentRoute.params.slug === 'top-recommendations') {
            return <GuideDetailPage slug="top-recommendations" />;
          }
          return <ArticleDetailPage key={currentRoute.params.slug} slug={currentRoute.params.slug} />;
        }
        return <CategoryArchivePage slug="all" />;
      case '/about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <SearchModal />
      <ScrollToTopButton />
    </div>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center space-y-4 border border-slate-200 dark:border-slate-700">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950 text-rose-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">页面加载遇到轻微异常</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">已保护并隔离异常，点击下方按钮可立即恢复正常浏览。</p>
            <div className="pt-2 flex justify-center gap-3">
              <button 
                onClick={() => { this.setState({ hasError: false }); window.location.href = '/#/'; }} 
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                返回首页
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                刷新页面
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}
