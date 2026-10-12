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
  const { currentRoute } = useApp();

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
