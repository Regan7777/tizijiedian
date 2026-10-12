export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: SubCategory[];
  articleCount?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: string;
  subcategoryId: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishDate: string;
  updateDate: string;
  readTime: string;
  isSticky?: boolean;
  isFeatured?: boolean;
  views: number;
  score?: number;
  pros?: string[];
  cons?: string[];
  seoTitle?: string;
  seoDescription?: string;
  hasAffiliateDisclosure?: boolean;
  relatedArticleIds?: string[];
}

export interface ComparisonRow {
  id: string;
  productName: string;
  logo: string;
  overallScore: number;
  speedRating: string; // e.g. "9.8 / 10"
  securityRating: string; // e.g. "9.9 / 10"
  priceStarting: string; // e.g. "￥18 / 月"
  bestFor: string; // e.g. "多设备全能选"
  pros: string[];
  cons: string[];
  freeTrial: string; // e.g. "30天无理由退款"
  detailArticleSlug: string;
  badge?: string; // e.g. "编辑首选", "性价比最高"
}

export interface GuidePage {
  id: string;
  title: string;
  slug: string;
  type: 'recommendation' | 'comparison' | 'deals' | 'risks' | 'index';
  description: string;
  stickyNotice: string;
  updateDate: string;
  toc: { id: string; text: string; level: number }[];
  comparisonTable?: {
    headers: string[];
    rows: ComparisonRow[];
  };
  highlightCards: {
    id: string;
    title: string;
    tag: string;
    description: string;
    metrics: { label: string; value: string }[];
    linkSlug: string;
  }[];
  faqs: { question: string; answer: string }[];
  relatedArticleSlugs: string[];
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  description: string;
  author: string;
  evaluationMethodology: {
    title: string;
    description: string;
    criteria: { name: string; weight: string; desc: string }[];
  };
  adDisclosure: string;
}
