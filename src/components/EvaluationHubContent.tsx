import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, ChevronDown, ExternalLink, ShieldCheck, 
  AlertTriangle, HelpCircle, Check, Search, Tag, Clock, 
  Sparkles, Zap, ArrowRight, Flame, BookOpen, AlertCircle, Award,
  CheckCircle2, Compass, Layers, BarChart3, ShieldAlert, Cpu, HeartHandshake,
  DollarSign, Wifi, Laptop, KeyRound, Radio
} from 'lucide-react';
import { AFF_LINKS } from '../data/affLinks';

interface ReviewCard {
  name: string;
  logo?: string;
  badge?: string;
  highlight: string;
  lineType: string;
  priceDesc: string;
  url: string;
  reviewSlug: string;
  tags: string[];
  features: string[];
}

export const EvaluationHubContent: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'special' | 'budget' | 'unlimited'>('all');
  const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>({
    howToReadRanking: true,
    antiScamStrategy: false,
    lineSelection: false,
    monthlyVsYearly: false,
    multiDeviceUsage: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };



  // Recent in-depth airport evaluations from vpnnew.net/vpn-airport-reviews/
  const reviewCards: ReviewCard[] = [
    {
      name: "神行加速",
      logo: "/images/shenxing-logo.png",
      badge: "极速中转·立减30%",
      highlight: "多入口BGP+HG中转专线架构，晚高峰4K零抖动，原生住宅IP解锁Netflix/ChatGPT，无设备限制",
      lineType: "多入口 BGP + HG中转专线",
      priceDesc: "23元/月 150GB（专属码sx0077立减30%）",
      url: AFF_LINKS.shenxing.redirectPath,
      reviewSlug: "shenxing-accelerator-in-depth-review",
      tags: ["高性价比", "4K零抖动", "专属优惠券sx0077", "不限时套餐"],
      features: ["专属优惠券sx0077立减30%", "99元/90GB不限时一次性流量", "多入口BGP+HG中转专线", "全节点双向真实计费不虚标"]
    },
    {
      name: "榴莲云",
      logo: "/images/liulianyun-logo.png",
      badge: "平价天花板",
      highlight: "IEPL专线低价小流量首选，入门档年付96元（折合8元/月，60GB/月，特惠版不适用优惠券），常规套餐季付及以上享专属7折优惠码ll88，60个VLESS节点实测覆盖港台新美日",
      lineType: "IEPL内网专线 / VLESS协议",
      priceDesc: "96元/年 60GB/月（折合8元/月）",
      url: AFF_LINKS.liulianyun.redirectPath,
      reviewSlug: "liulianyun-airport-review",
      tags: ["8元月均", "IEPL专线", "季付折扣券ll88", "60个节点"],
      features: ["季付起专属优惠券ll88享7折（96年付不可用）", "入门档年付96元（折合8元/60GB每月）", "60个VLESS节点覆盖港台新美日", "支持自研客户端与Clash/小火箭"]
    },
    {
      name: "大佬云",
      logo: "/images/dalaoyun-logo.png",
      badge: "不限并发·季付7折",
      highlight: "VLESS协议与IPLC/IEPL专线调度，不限设备并发，全节点1.0x真实倍率，60个节点实测可达率95%，专属7折优惠券dly888",
      lineType: "IPLC/IEPL高速专线 / VLESS协议",
      priceDesc: "19.99元/月 100GB（季付7折码dly888）",
      url: AFF_LINKS.dalaoyun.redirectPath,
      reviewSlug: "dalaoyun-airport-review",
      tags: ["不限设备数", "VLESS专线", "初云特惠", "优惠券dly888"],
      features: ["专属优惠券dly888季付立享7折", "初云特惠19.99元/100GB低门槛", "60个VLESS节点覆盖港台新日美", "全节点1.0x真实透明计费"]
    },
    {
      name: "环球梯",
      logo: "/images/huanqiuti-logo.png",
      badge: "纯专线·7折码HQ66",
      highlight: "全节点VLESS协议与纯专线高速通道，晚高峰丢包率<0.5%，60个节点实测非零率96.7%，专享7折优惠码HQ66（96年付特惠版除外）",
      lineType: "纯专线端内直连 / VLESS协议",
      priceDesc: "22元/月 120GB（新客7折码HQ66）",
      url: AFF_LINKS.huanqiuti.redirectPath,
      reviewSlug: "huanqiuti-airport-review",
      tags: ["7折券HQ66", "纯专线", "60个节点", "低丢包率"],
      features: ["专属7折优惠券HQ66（96年付特惠版不适用）", "60个VLESS节点实测96.7%可用", "提供99元/80GB不限时按量套餐", "端内物理专线不经过GFW"]
    },
    {
      name: "云界线",
      logo: "/images/yunjiexian-logo.png",
      badge: "新客7折·可测",
      highlight: "22元/150GB入门档新客7折（折后约15.4元/月），五地60个VLESS节点，后台独立标注流媒体解锁状态，支持申请测试账号",
      lineType: "多协议混合调度 / 全IPLC专线",
      priceDesc: "22元/150GB每月（新客7折约15.4元）",
      url: AFF_LINKS.yunjiexian.redirectPath,
      reviewSlug: "yunjiexian-airport-review",
      tags: ["新客7折", "22元/150GB", "支持测试账号", "流媒体标注"],
      features: ["新客结账页面直享7折优惠", "支持联系客服申请免费测试账号", "提供99元/300GB一次性流量备用包", "后台清晰标注节点流媒体与AI状态"]
    },
    {
      name: "闪电鼠",
      logo: "/images/shandianshu-logo.png",
      badge: "彻底不限设备",
      highlight: "新加坡海外技术团队主理，彻底不限设备并发数，全节点1.0x透明倍率，60个VLESS节点峰值2.5Gbps，首单7折优惠码sd88",
      lineType: "IPLC/IEPL高速专线 / VLESS协议",
      priceDesc: "19.9元/月 120GB（首单7折码sd88）",
      url: AFF_LINKS.shandianshu.redirectPath,
      reviewSlug: "shandianshu-airport-review",
      tags: ["彻底不限设备", "19.9元起", "优惠码sd88", "1.0x倍率"],
      features: ["首单专属优惠券sd88享7折大额减免", "全套餐彻底不限制并发设备数量", "60个VLESS节点实测可达率95%", "全节点保持真实1.0x倍率不扣量"]
    }
  ];

  const filteredCards = reviewCards.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.highlight.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchSearch) return false;
    if (activeTab === 'special') return c.tags.some(t => t.includes('专线') || t.includes('超稳') || t.includes('老牌'));
    if (activeTab === 'budget') return c.priceDesc.includes('8元') || c.priceDesc.includes('19.') || c.priceDesc.includes('22元') || c.priceDesc.includes('23元') || c.priceDesc.includes('7折') || c.tags.some(t => t.includes('8元') || t.includes('高性价比'));
    if (activeTab === 'unlimited') return c.features.some(f => f.includes('不限时') || f.includes('按量'));
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          首页
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          梯子节点机场评测中心：稳定机场、价格对比、客户端配置与跑路预警
        </span>
      </nav>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-indigo-900/50">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-16 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-5 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>独立客观 · 真实压力测试 · 跑路避坑监控</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            梯子节点机场评测中心
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            全面聚合 <span className="text-indigo-300 font-semibold">稳定机场推荐</span>、<span className="text-indigo-300 font-semibold">性能价格横向对比</span>、<span className="text-indigo-300 font-semibold">全平台客户端配置</span>，以及 <span className="text-rose-400 font-semibold">跑路风险预警黑名单</span>。坚持以晚高峰抗拥堵、倍率真实度和客服响应为评测金标准。
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 border-t border-slate-800/80">
            <span className="flex items-center gap-1">
              更新时间：<span className="text-indigo-300 font-mono">2026-10-11</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">#机场评测</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">#VPN机场</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">#科学上网</span>
              <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 font-mono text-[11px] border border-rose-800/40">#跑路预警</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Navigation Quick-Access Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            评测中心核心导航
          </h2>
          <span className="text-xs text-slate-500">按需跳转专题</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigateTo('/guides', { slug: 'top-recommendations' })}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all text-left group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                <span>机场推荐总榜</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                实测推荐梯子机场梯队全榜单，包含精选主流服务商入门价格、节点协议与官网地址。
              </p>
            </div>
          </button>

          <button
            onClick={() => navigateTo('/guides', { slug: 'performance-comparison' })}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all text-left group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <span>性能与价格对比榜</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                百家机场彩色价格/流量条形图全维度 PK，流量型 vs 不限流量全方位指标对比表。
              </p>
            </div>
          </button>

          <button
            onClick={() => navigateTo('/blog', { slug: 'airport-exit-scam-warning-and-blacklist-guide' })}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-rose-500/50 transition-all text-left group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                <span>跑路预警与避坑黑名单</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                跑路十大前兆清单与高危服务商监控。包括奈云、OKANC等失联通报与维权指引。
              </p>
            </div>
          </button>

          <button
            onClick={() => navigateTo('/blog', { slug: 'all-platform-client-setup-guide' })}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all text-left group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                <span>全平台客户端配置指南</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                配套 iOS 小火箭、Android Clash Meta、Windows Clash Verge Rev 详细分流图文教程。
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Accordion Decision Guides (Target Page Section) */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          榜单选型与避坑核心指南
        </h2>

        <div className="space-y-3">
          {/* Guide 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('howToReadRanking')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
                <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                1. 怎么看机场排行榜？不要只盯着第一名
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.howToReadRanking ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion.howToReadRanking && (
              <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 border-t border-slate-100 dark:border-slate-800/80">
                <p>
                  很多新手看榜单喜欢直接冲“第一名”，但网络质量因人而异。你的本地宽带网络运营商（电信、联通、移动、广电）直接决定了线路连接表现：
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white text-xs block mb-1">中国电信 (163/CN2)</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">优先选择具有 CN2 GIA 或多入口 BGP 中转线路的机场，晚高峰出国骨干网最挤，必须走端内专线。</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white text-xs block mb-1">中国联通 (169/9929)</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">国际出口带宽最宽裕，直连延迟低，选普通优质隧道中转即可拥有超高性价比。</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-bold text-slate-900 dark:text-white text-xs block mb-1">中国移动 (CMI)</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">去香港 CMI 线路体验极佳，但北方移动跨网较差，务必认准“内网专线”或“移动多入口”服务商。</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guide 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('antiScamStrategy')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                2. 黄金组合策略：“主力稳 + 备用便宜”永不失联
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.antiScamStrategy ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion.antiScamStrategy && (
              <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 border-t border-slate-100 dark:border-slate-800/80">
                <p>
                  不要把鸡蛋放在同一个篮子里！无论某个机场宣传得多神，遇到国家重大活动拔线、机房火灾或域名污染都可能临时中断。
                </p>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm space-y-1">
                  <span className="font-bold">推荐配置标准：</span>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>主力机场（月付 15~30 元）：</strong>买优质 IEPL/IPLC 专线，负责日常高清看视频、查资料、ChatGPT 对话，追求极致低延迟与 4K 秒开。</li>
                    <li><strong>备用机场（一次性 10~20 元按量付费）：</strong>买不限时间的流量包（如 100GB 永久有效），平时不扣月租，主力万一故障时一键切换，确保随时有网。</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Guide 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('lineSelection')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
                <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                3. 专线 (IPLC/IEPL) vs 隧道中转 vs 直连线路深度区分
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.lineSelection ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion.lineSelection && (
              <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 border-t border-slate-100 dark:border-slate-800/80">
                <ul className="space-y-2">
                  <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <strong className="text-indigo-600 dark:text-indigo-400">IPLC/IEPL 内网专线：</strong>两端都在机房内网走物理光缆，不过 GFW 防火墙，敏感时期几乎不受影响，延迟固定且丢包率几乎为 0，成本最高。
                  </li>
                  <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <strong className="text-blue-600 dark:text-blue-400">BGP / 优质隧道中转：</strong>在国内入口机房将流量加密后穿透公网发往落地服务器，兼具性价比与抗干扰能力，目前绝大多数主流机场的主力技术。
                  </li>
                  <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <strong className="text-amber-600 dark:text-amber-400">公网直连（单节点直通）：</strong>客户端直接连境外 VPS，成本极低但极其脆弱，极易被阻断封锁，仅适合低频备用或临时白嫖。
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Guide 4 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('monthlyVsYearly')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
                <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                4. 月付 vs 年付避坑：为什么我们坚决建议新用户先“月付”？
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.monthlyVsYearly ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion.monthlyVsYearly && (
              <div className="px-6 pb-6 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 border-t border-slate-100 dark:border-slate-800/80">
                <p>
                  很多机场为了锁客和回笼资金，会把年付打折到原价的 5 折甚至更低，但我们始终坚持一条铁律：
                </p>
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
                  <strong>评测中心倡议：</strong>任何从未体验过的新机场，第一次请<strong>一律按月付</strong>！先使用 1~2 周，重点观察晚高峰 20:30~23:00 期间看 4K 视频是否频繁缓冲、平时提工单客服是否活跃。若连续 2~3 个月均稳如泰山，再根据预算考虑季付或年付。
                </div>
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Featured In-Depth Review Cards Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              近期机场深度评测专区
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              全方位实测晚高峰丢包、流媒体原生解锁与客服 SLA，数据实时保持最新
            </p>
          </div>

          {/* Filter Tabs & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜索机场或特点..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'all' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                全部
              </button>
              <button
                onClick={() => setActiveTab('special')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'special' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                优质专线
              </button>
              <button
                onClick={() => setActiveTab('budget')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'budget' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                平价超省
              </button>
              <button
                onClick={() => setActiveTab('unlimited')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'unlimited' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                不限时/按量
              </button>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 shadow-xs hover:shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {card.logo && (
                        <img src={card.logo} alt={card.name} className="w-5 h-5 object-contain rounded shrink-0" />
                      )}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {card.name}
                      </h3>
                      {card.badge && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-mono">
                      <Wifi className="w-3.5 h-3.5 text-indigo-500" /> {card.lineType}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>实测稳定</span>
                  </span>
                </div>

                {/* Highlight */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {card.highlight}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Features checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {card.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block">参考资费</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                    {card.priceDesc}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('/blog', { slug: card.reviewSlug })}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                  >
                    前往评测
                  </button>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <span>直达官网</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Risk & Scam Warnings (High Priority Target Section) */}
      <div className="bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-rose-950 dark:text-rose-200">
              订阅风险防控与跑路预警机制
            </h2>
            <p className="text-xs sm:text-sm text-rose-800/80 dark:text-rose-300/80 leading-relaxed">
              科学上网行业流动性极大。根据评测中心历史样本统计，年均有 20%~30% 的低端小作坊机场在半年内关停或失联。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 border border-rose-100 dark:border-rose-900/40 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              机场即将跑路的十大明显征兆：
            </h3>
            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li><strong>反常骨折级大促销：</strong>平时月付20元，突然推出“三年付59元”或“终身会员99元”回笼现金；</li>
              <li><strong>TG官方群开启全员禁言：</strong>或者直接关闭群内讨论交流、仅保留通知频道；</li>
              <li><strong>节点大面积红屏超时：</strong>超过48小时依然无人修复，工单提交后显示已读不回；</li>
              <li><strong>官网频繁无预警换域名：</strong>原域名直接打不开，未提前通过邮件或备份群提前发布；</li>
              <li><strong>突然取消月付套餐：</strong>强制要求用户只能一次性购买半年或一年长周期计划；</li>
              <li><strong>核心骨干专线被撤换：</strong>原本承诺的 IPLC/IEPL 专线被偷偷替换成卡顿的普通公网直连；</li>
              <li><strong>暗调节点扣费倍率：</strong>标称正常使用，实测看一个视频扣除 3x~5x 流量；</li>
              <li><strong>支付通道频繁异常：</strong>支付宝/微信商户被封，频繁切换陌生个人转账二维码；</li>
              <li><strong>管理员在社区长期隐身：</strong>客服长达数天甚至数周无任何实质性回复；</li>
              <li><strong>推卸责任为上游封锁：</strong>反复以“机房被DDoS反制/老板出事”为托词延期恢复。</li>
            </ol>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 border border-rose-100 dark:border-rose-900/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                官网打不开与防钓鱼安全指南
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                部分机场为了抵御 DNS 污染会定期向老用户推送临时镜象网址。切勿直接在搜索引擎（百度/必应等）搜索机场名称，谨防假冒的“李鬼”钓鱼克隆站盗取您的订阅凭证与密码。
              </p>
              
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 border border-slate-200/60 dark:border-slate-700/60">
                <span className="font-bold text-rose-600 dark:text-rose-400 block">近期通报关注：</span>
                <p className="text-[11px] leading-relaxed">
                  奈云 (Naicloud)、OKANC 等机场出现长期失联与域名解析异常，评测中心已将其列入重点警报列表。建议所有用户坚持<strong>小额月付</strong>，避免遭受财产损失。
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/blog', { slug: 'airport-exit-scam-warning-and-blacklist-guide' })}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>查看完整跑路汇总与避坑黑名单</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5-Dimension Evaluation Standard Matrix */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          梯子节点评测中心：五大评测维度标准体系
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          我们杜绝任何夸大与虚假测试，每一篇评测均由实机脚本与日常使用持续抓取样本
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">晚高峰丢包率测试</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              在 20:30~23:30 高压时段持续发送 ICMP/TCP Ping 测试，丢包率必须低于 2% 始得及格。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">线路物理拓扑真实性</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              通过路由追踪 (traceroute) 验证是否为真实 IPLC/IEPL 端内专线，杜绝假专线骗局。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">AI 与流媒体原生解锁</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              实测 Netflix 非自制剧、Disney+、YouTube Premium 以及 ChatGPT / Claude 纯净原生 IP 解锁。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">倍率与计量透明度</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              杜绝“暗度陈仓”的 3x~5x 虚标偷跑流量，确保用户购买的每一 GB 流量都能物尽其用。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">客服响应</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              定期对工单系统发起测试，考察客服平均响应时长。
            </p>
          </div>
        </div>
      </div>

      {/* Further Reading & Helpful Tools */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
        <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          延伸阅读与常用工具指南
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => navigateTo('/guides', { slug: 'top-recommendations' })}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
          >
            <span>👉 机场推荐总榜</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
          <button
            onClick={() => navigateTo('/guides', { slug: 'performance-comparison' })}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
          >
            <span>👉 价格对比与彩色条形图 PK</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
          <button
            onClick={() => navigateTo('/blog', { slug: 'desktop-client-airport-subscription-setup-and-troubleshooting' })}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
          >
            <span>👉 电脑客户端本地订阅配置与排错教程</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
          <button
            onClick={() => navigateTo('/blog', { slug: 'ios-shadowrocket-setup-and-rules-tutorial' })}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
          >
            <span>👉 iOS 小火箭分流规则与去广告教程</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>

    </div>
  );
};
