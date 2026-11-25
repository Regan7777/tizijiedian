const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://tizijiedian.com';
const distDir = path.join(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Please run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Load mockData and additionalArticles
const mockDataText = fs.readFileSync(path.join(__dirname, '../src/data/mockData.ts'), 'utf8');
const mockArticlesText = mockDataText.split('export const guidesData')[0];
const addDataText = fs.readFileSync(path.join(__dirname, '../src/data/additionalArticles.ts'), 'utf8');
const allDataText = mockArticlesText + '\n' + addDataText;

// Extract articles
function extractArticles(text) {
  const articles = [];
  const seen = new Set();
  
  const idRegex = /{\s*id:\s*["'](art-[^"']+)["']/g;
  let match;
  const indices = [];
  while ((match = idRegex.exec(text)) !== null) {
    indices.push(match.index);
  }

  for (let i = 0; i < indices.length; i++) {
    const start = indices[i];
    const end = (i + 1 < indices.length) ? indices[i + 1] : text.length;
    const block = text.slice(start, end);

    const idMatch = block.match(/id:\s*["']([^"']+)["']/);
    const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
    const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
    const excerptMatch = block.match(/excerpt:\s*["']([^"']+)["']/);
    const catMatch = block.match(/categoryId:\s*["']([^"']+)["']/);
    const subMatch = block.match(/subcategoryId:\s*["']([^"']+)["']/);
    const pubMatch = block.match(/publishDate:\s*["']([^"']+)["']/);
    const updMatch = block.match(/updateDate:\s*["']([^"']+)["']/);
    const faqsBlockMatch = block.match(/faqs:\s*\[([\s\S]*?)\]\s*,/);
    const faqs = [];
    if (faqsBlockMatch) {
      const qaRegex = /question:\s*["']([^"']+)["']\s*,\s*answer:\s*["']([^"']+)["']/g;
      let qa;
      while ((qa = qaRegex.exec(faqsBlockMatch[1])) !== null) {
        faqs.push({ question: qa[1], answer: qa[2] });
      }
    }
    const contentMatch = block.match(/content:\s*`([\s\S]*?)`/);

    if (slugMatch && titleMatch && excerptMatch) {
      const slug = slugMatch[1];
      if (!seen.has(slug)) {
        seen.add(slug);
        articles.push({
          id: idMatch ? idMatch[1] : '',
          title: titleMatch[1],
          slug: slug,
          excerpt: excerptMatch[1],
          categoryId: catMatch ? catMatch[1] : '',
          subcategoryId: subMatch ? subMatch[1] : '',
          publishDate: pubMatch ? pubMatch[1] : '2026-10-10',
          updateDate: updMatch ? updMatch[1] : (pubMatch ? pubMatch[1] : '2026-10-10'),
          faqs,
          content: contentMatch ? contentMatch[1] : ''
        });
      }
    }
  }
  return articles;
}

const articles = extractArticles(allDataText);
console.log(`Prerender SEO: Extracted ${articles.length} articles.`);

// Guides data
const guides = [
  {
    slug: 'top-recommendations',
    title: '2026年机场推荐，梯子节点综合推荐榜',
    description: '2026年翻墙机场推荐排行榜：梯子节点基于连续 90 天自动化监测与大带宽压测数据，全面深度横评神行加速、榴莲云、大佬云、环球梯、云界线、闪电鼠及光速云等主流中转与 IPLC 专线。提供套餐价格横向对比、7折专属优惠码与晚高峰 60 节点真实测速报告，拒绝商业充钱带货，为您呈现客观权威的科学上网高分选型指南。'
  },
  {
    slug: 'performance-comparison',
    title: '热门网络加速工具 10 维全方位性能横向对比',
    description: '热门网络加速工具与主流机场 10 维全方位性能横向深度对比：直观量化对比多入口优质 BGP 中转、IPLC 物理专线及直连节点的下行峰值带宽、晚高峰网络抖动率、8K 杜比流媒体解锁能力与全平台客户端体验。真实硬件监测数据驱动，无死角揭秘假专线与倍率套路，助您精准挑选最适合自己的翻墙节点与高速加速器。'
  },
  {
    slug: 'eval-center',
    title: '梯子节点评测中心：2026 全网优质机场与翻墙工具长文实测大合集',
    description: '梯子节点评测中心平台为您汇聚 2026 全网主流机场与科学上网网络加速服务的长文实测大合集。全面深度涵盖神行加速、榴莲云、大佬云、环球梯、云界线、闪电鼠与光速云等服务商的节点延迟、丢包率、晚高峰 8K 压测、流媒体解锁及专属 7 折优惠码信息，坚持独立客观与真实数据驱动，助您全面掌握各家优缺点与防坑选型指南。'
  }
];

// Categories map
const categoryMap = {
  'evaluations': '机场与工具评测',
  'product-details': '机场专线深度实测',
  'latest-reviews': '最新上线评测报告',
  'compare-specs': '性能与价格横向PK',
  'tutorials': '配置与使用教程',
  'getting-started': '小白零基础入门',
  'tool-guides': '客户端与工具教程',
  'device-setup': '多设备平台部署',
  'troubleshooting': '高频网络故障排查',
  'privacy-security': '数据隐私与网络安全',
  'news': '行业动态与技术资讯',
  'risk-warnings': '机场暴雷与跑路预警',
  'industry-news': '海缆建设与网络基建',
  'scenarios': '多场景加速方案',
  'ai-tools': 'ChatGPT与AI工具加速',
  'streaming': '4K/8K跨区流媒体解锁',
  'cross-border-office': '外贸与跨境办公保障',
  'announcements': '平台官方公告',
  'changelogs': '版本迭代与更新日志'
};

// Static core pages
const staticPages = [
  {
    route: '/',
    title: '梯子节点 | 独立·客观·数据驱动的科技工具与网络服务评测指南',
    description: '梯子节点专注于科技工具实测与网络加速服务横评，为您提供最新机场节点测速排行榜、Clash与Sing-box客户端配置教程、流媒体4K/8K解锁及ChatGPT等AI工具加速方案。平台坚持独立客观与真实数据驱动，严选优质BGP中转与IPLC专线，拒绝商业充钱带货，为个人与出海用户提供透明靠谱的选型指南。'
  },
  {
    route: '/about',
    title: '关于我们 | 梯子节点实验室',
    description: '梯子节点实验室是由独立网络系统架构师与网络安全研究者自发组建的第三方客观评测机构。我们依托全球部署的 60 多个自动化监测节点与大带宽测速集群，坚持拒绝任何商业充钱带货、以纯真实数据驱动的评测准则，长期为广大个人与出海企业用户提供透明靠谱的科技工具实测报告、机场翻墙选型横评与网络隐私防追踪避坑指南。'
  },
  {
    route: '/blog',
    title: '全部教程与评测文章 | 梯子节点',
    description: '梯子节点教程与评测专区汇聚了最新、最全的科学上网实操配置指南与工具横评报告：全面涵盖各平台主流客户端配置教程、机场节点测速排名、流媒体4K/8K解锁技巧、ChatGPT/Claude等AI工具专线加速方案，以及防跑路避坑与网络安全防护策略。所有内容均经实验室严谨实操验证，助您轻松避开各类常见网络错误。'
  },
  {
    route: '/blog/categories',
    title: '全部分类与专题指南 | 梯子节点',
    description: '梯子节点全部分类与专题指南导航中心：系统梳理深度评测、实操教程、行业资讯、应用场景与网站公告等五大核心内容板块。无论您是零基础新手快速入门、查找海外跨境电商出海网络综合解决方案，还是对比不同线路协议性能，都能在此快速找到结构清晰、客观透明且数据翔实的高质量技术指南与实测数据，助您轻松实现精准选型决策。'
  }
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderHtmlPage({ route, title, description, keywords = '', canonicalUrl, ogType = 'website', publishDate, updateDate, faqs = [], bodySnippet = '' }) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // Replace Meta Description & Keywords
  const keywordsTag = keywords ? `<meta name="keywords" content="${keywords}" />\n    ` : '';
  html = html.replace(/<meta name="description" content="[\s\S]*?" \/>/i, `${keywordsTag}<meta name="description" content="${description}" />`);

  // Replace Canonical Link
  html = html.replace(/<link rel="canonical" href="[\s\S]*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace Open Graph Tags
  html = html.replace(/<meta property="og:type" content="[\s\S]*?" \/>/i, `<meta property="og:type" content="${ogType}" />`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?" \/>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description" content="[\s\S]*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta property="og:url" content="[\s\S]*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  // Build JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": `${DOMAIN}/`,
        "name": "梯子节点",
        "description": "独立·客观·数据驱动的科技工具与网络服务评测指南",
        "inLanguage": "zh-CN",
        "publisher": {
          "@type": "Organization",
          "@id": `${DOMAIN}/#organization`,
          "name": "梯子节点实验室",
          "url": `${DOMAIN}/`,
          "logo": {
            "@type": "ImageObject",
            "url": `${DOMAIN}/favicon.svg`
          }
        }
      },
      {
        "@type": ogType === 'article' ? 'Article' : 'WebPage',
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": `${DOMAIN}/#website`
        },
        "inLanguage": "zh-CN",
        ...(publishDate ? { "datePublished": publishDate, "dateModified": updateDate || publishDate } : {}),
        ...(ogType === 'article' ? {
          "headline": title,
          "author": {
            "@type": "Organization",
            "name": "智测实验室"
          },
          "publisher": {
            "@id": `${DOMAIN}/#organization`
          }
        } : {})
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "首页",
            "item": `${DOMAIN}/`
          },
          ...(route !== '/' ? [
            {
              "@type": "ListItem",
              "position": 2,
              "name": title.split(' | ')[0] || title,
              "item": canonicalUrl
            }
          ] : [])
        ]
      },
      ...(faqs && faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": faqs.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }] : [])
    ]
  };

  const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLdString);

  // Inject fallback HTML inside <div id="root">
  if (bodySnippet) {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">\n${bodySnippet}\n    </div>`);
  }

  return html;
}

function writePageFile(subPath, htmlContent) {
  const targetDir = path.join(distDir, subPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');

  // Also write subPath.html for cleanUrls compatibility
  const htmlFile = path.join(distDir, `${subPath}.html`);
  const parentDir = path.dirname(htmlFile);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  fs.writeFileSync(htmlFile, htmlContent, 'utf8');
}

// 1. Core static pages
for (const page of staticPages) {
  const canonicalUrl = page.route === '/' ? `${DOMAIN}/` : `${DOMAIN}${page.route}`;
  const body = `      <header class="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          ${escapeHtml(page.title)}
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
          ${escapeHtml(page.description)}
        </p>
        <nav class="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
          <a href="/guides/top-recommendations" class="px-5 py-2.5 rounded-xl bg-indigo-600 text-white">梯子节点推荐</a>
          <a href="/guides/eval-center" class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white">评测中心</a>
          <a href="/guides/performance-comparison" class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white">测速对比</a>
          <a href="/blog" class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white">实操教程</a>
        </nav>
      </header>`;

  const rendered = renderHtmlPage({
    route: page.route,
    title: page.title,
    description: page.description,
    keywords: '梯子节点, 2026机场推荐, 科学上网, 翻墙梯子, IPLC专线, 节点测速, 机场评测, 节点排行榜',
    canonicalUrl,
    bodySnippet: body
  });

  if (page.route === '/') {
    fs.writeFileSync(indexHtmlPath, rendered, 'utf8');
  } else {
    writePageFile(page.route.replace(/^\//, ''), rendered);
  }
}

// 2. Guides
for (const g of guides) {
  const route = `/guides/${g.slug}`;
  const canonicalUrl = `${DOMAIN}${route}`;
  const fullTitle = `${g.title} | 梯子节点`;
  const body = `      <article class="max-w-5xl mx-auto px-4 pt-12 pb-16">
        <nav class="text-xs text-slate-500 mb-6"><a href="/">首页</a> &gt; <a href="/blog/categories">专题指南</a> &gt; <span>${escapeHtml(g.title)}</span></nav>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">${escapeHtml(g.title)}</h1>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">${escapeHtml(g.description)}</p>
        <div class="p-6 bg-slate-100 rounded-2xl text-slate-700 text-sm">正在加载评测交互数据与最新自动化测速图表...</div>
      </article>`;

  const rendered = renderHtmlPage({
    route,
    title: fullTitle,
    description: g.description,
    keywords: `${g.title}, 机场选型指南, 梯子节点, 科学上网, 专线测速`,
    canonicalUrl,
    bodySnippet: body
  });

  writePageFile(`guides/${g.slug}`, rendered);
}

function getCategoryDescription(name) {
  let text = `梯子节点【${name}】专栏为您提供最新、最权威的${name}深度技术指南与详尽实测数据。专区全面涵盖各主流机场节点晚高峰测速表现、客户端协议优化配置与实战避坑技巧，坚持独立客观与真实数据驱动，严选优质低延迟专线与安全隐私工具，坚决拒绝任何商业充钱带货，为您呈现全方位、透明可靠的科学上网选型与避坑实操参考指南。`;
  
  if (text.length > 156) {
    text = text.replace('、最权威的', '');
  }
  if (text.length > 156) {
    text = text.replace('专区全面涵盖各', '涵盖各');
  }
  if (text.length > 156) {
    text = text.replace('全方位、', '');
  }
  return text;
}

// 3. Categories
const subcategoryToSlug = {
  'eval-details': 'product-details',
  'eval-latest': 'latest-reviews',
  'eval-compare': 'compare-specs',
  'tut-beginner': 'getting-started',
  'tut-tools': 'tool-guides',
  'tut-devices': 'device-setup',
  'tut-faq': 'troubleshooting',
  'tut-privacy': 'privacy-security',
  'news-risks': 'risk-warnings',
  'news-trends': 'industry-news',
  'scen-ai': 'ai-tools',
  'scen-streaming': 'streaming',
  'scen-crossborder': 'cross-border-office',
  'ann-logs': 'changelogs'
};

const slugToParentCategory = {
  'evaluations': 'evaluations',
  'product-details': 'evaluations',
  'latest-reviews': 'evaluations',
  'compare-specs': 'evaluations',
  'tutorials': 'tutorials',
  'getting-started': 'tutorials',
  'tool-guides': 'tutorials',
  'device-setup': 'tutorials',
  'troubleshooting': 'tutorials',
  'privacy-security': 'tutorials',
  'news': 'news',
  'risk-warnings': 'news',
  'industry-news': 'news',
  'scenarios': 'scenarios',
  'ai-tools': 'scenarios',
  'streaming': 'scenarios',
  'cross-border-office': 'scenarios',
  'announcements': 'announcements',
  'changelogs': 'announcements'
};

for (const [slug, name] of Object.entries(categoryMap)) {
  const route = `/category/${slug}`;
  const canonicalUrl = `${DOMAIN}${route}`;
  const fullTitle = `${name} | 梯子节点知识库`;
  const desc = getCategoryDescription(name);

  // Filter matching articles for this category
  let matchingArticles = articles.filter(art => {
    if (subcategoryToSlug[art.subcategoryId] === slug) return true;
    if (art.categoryId === slug) return true;
    return false;
  });

  // Supplement if fewer than 2
  const parentCat = slugToParentCategory[slug];
  if (matchingArticles.length < 2 && parentCat) {
    const parentArticles = articles.filter(art => art.categoryId === parentCat);
    for (const art of parentArticles) {
      if (!matchingArticles.find(m => m.slug === art.slug)) {
        matchingArticles.push(art);
      }
      if (matchingArticles.length >= 4) break;
    }
  }

  // Fallback if still fewer than 2
  if (matchingArticles.length < 2) {
    for (const art of articles) {
      if (!matchingArticles.find(m => m.slug === art.slug)) {
        matchingArticles.push(art);
      }
      if (matchingArticles.length >= 4) break;
    }
  }

  const articleCardsHtml = matchingArticles.map(art => `          <article class="p-6 bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="text-xs font-semibold text-indigo-600 mb-2">${escapeHtml(name)}</div>
              <h2 class="text-lg font-bold text-slate-900 mb-2 hover:text-indigo-600 transition-colors">
                <a href="/blog/${art.slug}">${escapeHtml(art.title)}</a>
              </h2>
              <p class="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">${escapeHtml(art.excerpt)}</p>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 mt-2">
              <span>更新时间：${art.updateDate}</span>
              <a href="/blog/${art.slug}" class="text-indigo-600 font-medium hover:underline inline-flex items-center gap-1">
                阅读全文 &rarr;
              </a>
            </div>
          </article>`).join('\n');

  const body = `      <section class="max-w-5xl mx-auto px-4 pt-12 pb-16">
        <nav class="text-xs text-slate-500 mb-6"><a href="/">首页</a> &gt; <a href="/blog/categories">分类专区</a> &gt; <span>${escapeHtml(name)}</span></nav>
        <header class="mb-10 pb-6 border-b border-slate-200">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">${escapeHtml(name)}</h1>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">${escapeHtml(desc)}</p>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
${articleCardsHtml}
        </div>
      </section>`;

  const rendered = renderHtmlPage({
    route,
    title: fullTitle,
    description: desc,
    keywords: `${name}, 梯子节点, 机场评测, 科学上网教程, 节点配置`,
    canonicalUrl,
    bodySnippet: body
  });

  writePageFile(`category/${slug}`, rendered);
}

// 4. Articles
for (const art of articles) {
  const route = `/blog/${art.slug}`;
  const canonicalUrl = `${DOMAIN}${route}`;
  const fullTitle = `${art.title} | 梯子节点`;
  const body = `      <article class="max-w-4xl mx-auto px-4 pt-12 pb-20">
        <nav class="text-xs text-slate-500 mb-6"><a href="/">首页</a> &gt; <a href="/blog">实操教程</a> &gt; <span>${escapeHtml(art.title)}</span></nav>
        <header class="mb-8">
          <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">${escapeHtml(art.title)}</h1>
          <div class="text-xs text-slate-500 flex gap-4">
            <span>发布日期：${art.publishDate}</span>
            <span>最近更新：${art.updateDate}</span>
            <span>作者：智测实验室</span>
          </div>
        </header>
        <div class="p-5 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl text-slate-700 text-sm leading-relaxed mb-8">
          <strong>内容摘要：</strong>${escapeHtml(art.excerpt)}
        </div>
        <div class="prose max-w-none text-slate-800 leading-relaxed">
          <p>正在装载完整正文交互、图片渲染及代码高亮组件...</p>
        </div>
      </article>`;

  const rendered = renderHtmlPage({
    route,
    title: fullTitle,
    description: art.excerpt,
    keywords: (art.tags && art.tags.length > 0 ? art.tags.join(', ') : `${art.title}, 科学上网, 机场推荐`),
    canonicalUrl,
    ogType: 'article',
    publishDate: art.publishDate,
    updateDate: art.updateDate,
    faqs: art.faqs || [],
    bodySnippet: body
  });

  writePageFile(`blog/${art.slug}`, rendered);
}

const totalPages = staticPages.length + guides.length + Object.keys(categoryMap).length + articles.length;
console.log(`✅ Prerender SEO completed successfully! Generated ${totalPages} static HTML pages in dist/ directory.`);
