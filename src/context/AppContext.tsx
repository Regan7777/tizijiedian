import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, Category, GuidePage } from '../types';
import { articlesData, categoriesData, guidesData } from '../data/mockData';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  articles: Article[];
  categories: Category[];
  guides: GuidePage[];
  currentRoute: {
    path: string;
    params?: Record<string, string>;
  };
  navigateTo: (path: string, params?: Record<string, string>) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to parse hash and extract route path + query params
const parseHashRoute = (rawHash: string): { path: string; params?: Record<string, string> } => {
  const hash = rawHash.replace(/^#/, '');
  if (!hash || hash === '/') return { path: '/' };

  const [pathWithSlug, queryString] = hash.split('?');
  const queryParams: Record<string, string> = {};
  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((val, key) => {
      queryParams[key] = val;
    });
  }

  if (pathWithSlug.startsWith('/blog/categories')) {
    return { path: '/blog/categories', params: queryParams };
  }
  if (pathWithSlug.startsWith('/category/')) {
    const slug = pathWithSlug.replace('/category/', '');
    return { path: '/category', params: { ...queryParams, slug } };
  }
  if (pathWithSlug.startsWith('/guides/')) {
    const slug = pathWithSlug.replace('/guides/', '');
    return { path: '/guides', params: { ...queryParams, slug } };
  }
  if (pathWithSlug.startsWith('/blog/')) {
    const slug = pathWithSlug.replace('/blog/', '');
    return { path: '/blog', params: { ...queryParams, slug } };
  }
  if (pathWithSlug === '/blog') {
    return { path: '/blog', params: queryParams };
  }
  if (pathWithSlug === '/category') {
    return { path: '/category', params: queryParams };
  }
  if (pathWithSlug === '/about') {
    return { path: '/about', params: queryParams };
  }
  if (pathWithSlug === '/admin') {
    return { path: '/admin', params: queryParams };
  }
  return { path: '/', params: queryParams };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  const [articles, setArticles] = useState<Article[]>(articlesData);
  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [guides] = useState<GuidePage[]>(guidesData);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync articles with mockData on module refresh
  useEffect(() => {
    setArticles(articlesData);
  }, []);

  // Initial route based on window location hash or default '/'
  const [currentRoute, setCurrentRoute] = useState<{ path: string; params?: Record<string, string> }>(() => {
    return parseHashRoute(window.location.hash);
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navigateTo = (path: string, params?: Record<string, string>) => {
    setCurrentRoute({ path, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update location hash for browser history simulation
    let hashUrl = path;
    if (params?.slug) {
      hashUrl = `${path}/${params.slug}`;
    }
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (k !== 'slug' && v) {
          query.set(k, v);
        }
      });
    }
    const qStr = query.toString();
    if (qStr) {
      hashUrl += `?${qStr}`;
    }
    window.location.hash = hashUrl;
  };

  // Sync window back/forward button hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseHashRoute(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addArticle = (newArt: Article) => {
    setArticles(prev => [newArt, ...prev]);
  };

  const updateArticle = (updatedArt: Article) => {
    setArticles(prev => prev.map(a => a.id === updatedArt.id ? updatedArt : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      articles,
      categories,
      guides,
      currentRoute,
      navigateTo,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      addArticle,
      updateArticle,
      deleteArticle
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
