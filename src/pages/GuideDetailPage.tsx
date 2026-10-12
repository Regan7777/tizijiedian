import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, Award, Zap, ArrowRight, CheckCircle2, 
  XCircle, Clock, ExternalLink, HelpCircle, AlertCircle, ChevronDown
} from 'lucide-react';
import { AirportRankingContent } from '../components/AirportRankingContent';
import { PriceComparisonContent } from '../components/PriceComparisonContent';
import { EvaluationHubContent } from '../components/EvaluationHubContent';

interface GuideDetailPageProps {
  slug?: string;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug = 'top-recommendations' }) => {
  if (slug === 'top-recommendations' || slug === 'recommendations') {
    return <AirportRankingContent />;
  }
  if (slug === 'performance-comparison' || slug === 'jichangpk' || slug === 'price-comparison') {
    return <PriceComparisonContent />;
  }
  if (slug === 'eval-center' || slug === 'evaluations' || slug === 'vpn-airport-reviews') {
    return <EvaluationHubContent />;
  }

  const { guides, articles, navigateTo } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const guide = guides.find(g => g.slug === slug) || guides[0] || ({} as any);

  // Get related articles
  const relatedArticles = articles.filter(a => guide?.relatedArticleSlugs?.includes(a.slug));

  // Determine latest update date from related articles or all articles, falling back to guide.updateDate
  const candidateArticles = relatedArticles.length > 0 ? relatedArticles : articles;
  const latestArticle = [...candidateArticles].sort(
    (a, b) => new Date(b.updateDate || b.publishDate).getTime() - new Date(a.updateDate || a.publishDate).getTime()
  )[0];
  const displayUpdateDate = latestArticle?.updateDate || latestArticle?.publishDate || guide?.updateDate || '2026-10-05';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 transition-colors">
          首页
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('/blog/categories')} className="hover:text-indigo-600 transition-colors">
          专题指南
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-800 dark:text-slate-200">{guide.title}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-indigo-200 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" /> 最近更新：{displayUpdateDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {guide.title}
        </h1>


      </div>


      {/* Responsive Horizontal Scroll Comparison Table */}
      {guide.comparisonTable && (
        <section id="ranking-table" className="space-y-4">

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                  <tr>
                    {guide.comparisonTable.headers.map((h, idx) => (
                      <th key={idx} className="p-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {guide.comparisonTable.rows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      
                      {/* Product Name & Logo */}
                      <td className="p-4 font-bold text-sm text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{row.logo}</span>
                          <div>
                            <div>{row.productName}</div>
                            {row.badge && (
                              <span className="inline-block bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold text-[10px] px-1.5 py-0.5 rounded mt-0.5">
                                {row.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Line Type */}
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                          IPLC内网专线
                        </span>
                      </td>

                      {/* Speed / Latency */}
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                        {row.speedRating}
                      </td>

                      {/* Streaming / Features */}
                      <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                        ✅ 4K 8K 秒开
                      </td>

                      {/* Trial / Guarantee */}
                      <td className="p-4 text-slate-600 dark:text-slate-400">
                        {row.freeTrial}
                      </td>

                      {/* Best For */}
                      <td className="p-4 font-medium text-slate-700 dark:text-slate-300 max-w-[180px]">
                        {row.bestFor}
                      </td>

                      {/* Action Detail Link */}
                      <td className="p-4">
                        <button
                          onClick={() => navigateTo('/blog', { slug: row.detailArticleSlug })}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center gap-1"
                        >
                          <span>查看完整实测</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Highlight Recommendation Cards */}
      {guide?.highlightCards && guide.highlightCards.length > 0 && (
        <section id="editor-pick" className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            编辑精选重点解读卡片
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.highlightCards.map((card) => (
              <div
                key={card.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-md">
                    {card.tag}
                  </span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.description}
                </p>

                {/* Metrics pill */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {card.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg text-center">
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.value}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigateTo('/blog', { slug: card.linkSlug })}
                  className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>阅读对应硬件评测报告</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Guide FAQ Section */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section id="faq-section" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            本专题常见疑问
          </h2>

          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Detailed Review Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            关联独立评测文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigateTo('/blog', { slug: art.slug })}
                className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-colors space-y-2 group"
              >
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 line-clamp-1">
                  {art.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {art.excerpt}
                </p>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 inline-block">
                  查看单篇测试 →
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
