import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, ChevronDown, ExternalLink, ShieldCheck, 
  AlertTriangle, HelpCircle, Check, Search, Tag, Clock, 
  Sparkles, Zap, ArrowRight, Flame, BookOpen, AlertCircle, Award,
  CheckCircle2, XCircle, BarChart3, Layers, Compass, Filter, RefreshCw
} from 'lucide-react';

interface AirportPriceItem {
  name: string;
  logo?: string;
  url: string;
  priceNum: number; // monthly approx price in CNY for color coding & sorting
  priceText: string;
  trafficNum: number; // GB per month (9999 for unlimited)
  trafficText: string;
  trial: string;
  hasTrial: boolean;
  oneTime: string;
  hasOneTime: boolean;
  tgUrl?: string;
  reviewSlug: string;
  isSpecialLine?: boolean;
}

export const PriceComparisonContent: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'trial' | 'oneTime' | 'under10' | 'special'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'trafficDesc'>('default');
  const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>({
    howToChoose: true,
    trafficVsUnlimited: true,
    userMatrix: false,
    dualAirportStrategy: false,
    indicator16: false
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Top 6 airports detailed pricing & specs data (fully synchronized with in-depth evaluation articles)
  const airportData: AirportPriceItem[] = [
    { 
      name: "神行加速", 
      logo: "/images/shenxing-logo.png",
      url: "https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8", 
      priceNum: 8, 
      priceText: "年付折合8元/60GB每月", 
      trafficNum: 60, 
      trafficText: "60 GB", 
      trial: "专属优惠券sx0077立减30%", 
      hasTrial: true, 
      oneTime: "99元/90GB起不限时", 
      hasOneTime: true, 
      reviewSlug: "shenxing-accelerator-in-depth-review", 
      isSpecialLine: true 
    },
    { 
      name: "榴莲云", 
      logo: "/images/liulianyun-logo.png",
      url: "https://fugui007.liulianyunaff.com/#/?code=Y6A1M1MN", 
      priceNum: 8, 
      priceText: "年付折合8元/60GB每月(不可用券)", 
      trafficNum: 60, 
      trafficText: "60 GB", 
      trial: "季付起专属7折优惠券(码:ll88，96年付不可用)", 
      hasTrial: true, 
      oneTime: "暂无一次性套餐", 
      hasOneTime: false, 
      reviewSlug: "liulianyun-airport-review" 
    },
    { 
      name: "大佬云", 
      logo: "/images/dalaoyun-logo.png",
      url: "https://fugui0077.dalaoyunaff.com/#/?code=1o7gYhTL", 
      priceNum: 8, 
      priceText: "年付折合8元/60GB每月(月付19.99元)", 
      trafficNum: 60, 
      trafficText: "60 GB", 
      trial: "专属优惠券dly888季付立享7折", 
      hasTrial: true, 
      oneTime: "99元/78GB起随行包", 
      hasOneTime: true, 
      reviewSlug: "dalaoyun-airport-review", 
      isSpecialLine: true 
    },
    { 
      name: "环球梯", 
      logo: "/images/huanqiuti-logo.png",
      url: "https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG", 
      priceNum: 8, 
      priceText: "年付折合8元/60GB每月(不可用券)", 
      trafficNum: 60, 
      trafficText: "60 GB", 
      trial: "专属新客7折优惠券(码:HQ66，96年付不可用)", 
      hasTrial: true, 
      oneTime: "99元/80GB起不限时", 
      hasOneTime: true, 
      reviewSlug: "huanqiuti-airport-review", 
      isSpecialLine: true 
    },
    { 
      name: "云界线", 
      logo: "/images/yunjiexian-logo.png",
      url: "https://fugui0077.yunjiexianaff.com/#/?code=qA3LF6hW", 
      priceNum: 15.4, 
      priceText: "22元/150GB每月(新客7折约15.4元)", 
      trafficNum: 150, 
      trafficText: "150 GB", 
      trial: "新客直享7折，可申请测试账号", 
      hasTrial: true, 
      oneTime: "99元/300GB起一次性包", 
      hasOneTime: true, 
      reviewSlug: "yunjiexian-airport-review" 
    },
    { 
      name: "闪电鼠", 
      logo: "/images/shandianshu-logo.png",
      url: "https://fugui0077.shandianshuaff.com/#/?code=I2yK9PfK", 
      priceNum: 8, 
      priceText: "年付折合8元/60GB每月(月付19.9元)", 
      trafficNum: 60, 
      trafficText: "60 GB", 
      trial: "首单专属7折优惠券(码:sd88)", 
      hasTrial: true, 
      oneTime: "不限并发设备、全节点1.0x", 
      hasOneTime: true, 
      reviewSlug: "shandianshu-airport-review", 
      isSpecialLine: true 
    }
  ];

  // 13-dimension table data for Traffic vs Unlimited
  const comparison13Rows = [
    { item: "适合使用场景", traffic: "日常查资料、轻度办公、追剧、ChatGPT", unlimited: "全天候挂机PT下载、大文件同步、公司多终端合用" },
    { item: "网络连接稳定性", traffic: "⭐⭐⭐⭐⭐ 优质中转与专线占比高，拥堵率极低", unlimited: "⭐⭐⭐ 晚高峰因大流量挤占易出现拥塞抖动" },
    { item: "速度波动与延迟", traffic: "延迟极稳定，晚高峰丢包率 < 1%", unlimited: "波动较大，受邻居抢占带宽影响明显" },
    { item: "节点倍率机制", traffic: "通常为 1.0x 标准倍率，消耗真实透明", unlimited: "部分节点可能限速或限制单连接线程" },
    { item: "晚高峰 4K 体验", traffic: "4K 视频秒开缓冲，极少出现降频卡顿", unlimited: "晚高峰可能自动降至 1080P，需手动换节点" },
    { item: "入门单月成本", traffic: "极低（3元~10元/月即可起步）", unlimited: "中等偏高（一般 20元~45元/月起步）" },
    { item: "长期防跑路风险", traffic: "极低（支持小额月付及一次性低成本试错）", unlimited: "中等（部分高价年付商家成本高昂）" },
    { item: "线路等级配置", traffic: "以 IPLC/IEPL 端内专线与多入口 BGP 为主", unlimited: "以大带宽公网隧道中转为主，成本敏感" },
    { item: "设备同时在线数", traffic: "多数允许 3~5 台设备同时并发", unlimited: "通常严格限制 2~3 台设备，防止滥用合租" },
    { item: "客服与工单响应", traffic: "响应快速，Telegram 交流群活跃度高", unlimited: "工单量大，平均处理周期相对略长" },
    { item: "节点流媒体解锁", traffic: "原生解锁 Netflix、Disney+、ChatGPT", unlimited: "部分大流量公共 IP 易被流媒体反爬识别" },
    { item: "按量/一次性支持", traffic: "广泛支持不限时一次性按量流量包", unlimited: "一般仅支持按自然月/年周期订阅" },
    { item: "综合性价比推荐", traffic: "⭐⭐⭐⭐⭐（首选强烈推荐）", unlimited: "⭐⭐⭐⭐（适合极重度下载用户）" }
  ];

  // 16 key indicators list
  const indicators16 = [
    { title: "1. 节点协议支持", desc: "主流支持 Shadowsocks、Vless、Trojan、Hysteria2 等协议，抗封锁能力强。" },
    { title: "2. 入口机房质量", desc: "国内入口是否为多线 BGP（上海、广州、江苏），决定不同宽带的基础延迟。" },
    { title: "3. 专线等级认证", desc: "是否具备真正的 IPLC/IEPL 端内专线，不经过 GFW 公网拦截审查。" },
    { title: "4. SLA 在线率承诺", desc: "优质服务商通常承诺 99.5%~99.9% 节点在线保障，极少出现全红失联。" },
    { title: "5. 晚高峰丢包率", desc: "20:30~23:30 高压时段 ICMP/TCP 丢包率应低于 2%，杜绝卡顿。" },
    { title: "6. 倍率扣费透明度", desc: "节点标注 1.0x 即实扣 1.0x，杜绝暗地里 3x~5x 偷跑流量的恶劣行为。" },
    { title: "7. 4K 流媒体原生解锁", desc: "是否能解锁 Netflix 非自制剧、Disney+、YouTube Premium 地区会员。" },
    { title: "8. AI 平台 IP 纯净度", desc: "IP 地址池是否纯净，访问 OpenAI ChatGPT / Claude 是否频繁触发人机验证。" },
    { title: "9. 多客户端一键订阅", desc: "提供 Clash Verge、Shadowrocket、Sing-box 等通用订阅链接快速导入。" },
    { title: "10. 设备并发连接限制", desc: "明确标注允许同时在线的终端数量（手机、电脑、软路由等合用）。" },
    { title: "11. 支付渠道安全性", desc: "支持主流便捷扫码或加密货币（USDT），不强行收集个人实名信息。" },
    { title: "12. 最低月付门槛", desc: "是否有低至 5~15 元的月付试水计划，拒绝强制只能购买半年或一年。" },
    { title: "13. 一次性按量流量包", desc: "是否提供不限时永久流量（如 20元/1000G），绝佳的低成本备用防失联手段。" },
    { title: "14. 免费试用与测试号", desc: "提供 1 天试用、1~5GB 体验流量或福利优惠券，降低新用户试错门槛。" },
    { title: "15. Telegram 官方社区", desc: "拥有官方通知频道与双向交流群，管理员活跃，故障更新通知及时。" },
    { title: "16. 跑路赔付与退款机制", desc: "具备如 3 天无理由退款承诺或退款通道，服务规范有据可循。" }
  ];

  // FAQs
  const faqs = [
    {
      q: "为什么建议第一次购买机场时首选“月付”？",
      a: "因为翻墙环境随时可能受到上游机房政策、IP 封锁和网络波动影响。哪怕口碑极好的机场，首次购买也建议先买一个月进行晚高峰实测。确认在你的宽带（电信/联通/移动）下稳定，且客服响应正常后，再考虑按季度或按年续费享受折扣。"
    },
    {
      q: "很多机场宣传“年付10元不限流量”，靠谱吗？",
      a: "极大概率不靠谱！国际出口带宽成本非常昂贵，正规优质机房的单吉字节成本都在几分钱到一毛钱。所谓“10元无限量”，要么是超售成百上千倍导致晚高峰完全打不开，要么是商家蓄意低价圈钱后跑路（俗称杀猪盘）。"
    },
    {
      q: "IPLC/IEPL 专线和普通 BGP 隧道中转究竟有何区别？",
      a: "IPLC（国际私用租用线路）和 IEPL（国际以太网专线）走的是跨国内网物理光纤，两端在机房直连，流量根本不经过中国防火长城 (GFW)，因此在敏感时期也稳如磐石；而普通 BGP 隧道是在公网入口加密后再穿透 GFW 发送，性价比高但极端时期偶有丢包。"
    },
    {
      q: "什么是节点“倍率”？为什么我的流量扣得特别快？",
      a: "倍率是机场计费系数。如果节点标注为 1.0x，消耗 1GB 扣除 1GB；如果标注为 0.1x，消耗 1GB 仅扣 0.1GB（适合大文件下载）；但若某些高规格节点标注为 3.0x，下载 1GB 将从套餐中扣除 3GB。购买前需留意节点列表倍率说明。"
    },
    {
      q: "为什么测速跑分很高，但看 YouTube 还是卡在 480P？",
      a: "Speedtest 测速跑的是短时间瞬时单线程/多线程爆发速率，而视频播放依赖持续稳定的 TCP 吞吐和低抖动。如果机场链路丢包率高（例如 >5%），TCP 就会反复重传导致视频降画质甚至转圈。因此晚高峰持续丢包率远比峰值跑分更重要。"
    },
    {
      q: "什么是“双机场黄金组合策略”？",
      a: "建议配置一个“月付 15~25 元的优质专线机场”作为日常主力，速度快、延迟低；同时花 10~20 元买一个“不限时间的一次性按量流量包”作为备用（没有月租）。一旦主力临时维护，立刻切换备用节点，真正做到全年永不失联。"
    },
    {
      q: "遇到节点超时、订阅无法更新如何自查？",
      a: "首先检查客户端系统时间是否与北京时间一致（误差超 60 秒会导致加密握手失败）；其次尝试开启全局代理后更新订阅，或者开启“跳过证书验证”；若依然红屏，可在 Telegram 官方群查看是否有最新公告或紧急临时节点。"
    }
  ];

  // Filtering & Sorting
  const filteredList = useMemo(() => {
    return airportData.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.priceText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.trafficText.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;

      if (filterMode === 'trial') return item.hasTrial;
      if (filterMode === 'oneTime') return item.hasOneTime;
      if (filterMode === 'under10') return item.priceNum <= 10;
      if (filterMode === 'special') return item.isSpecialLine;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.priceNum - b.priceNum;
      if (sortBy === 'priceDesc') return b.priceNum - a.priceNum;
      if (sortBy === 'trafficDesc') return b.trafficNum - a.trafficNum;
      return 0;
    });
  }, [searchTerm, filterMode, sortBy]);

  // Color bar styling helpers matching vpnnew.net/airport/jichangpk/
  const getPriceBarClass = (price: number) => {
    if (price <= 10) {
      // 🟩 Low price (green / emerald)
      return {
        bar: "bg-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
        width: `${Math.min(100, Math.max(15, (price / 30) * 100))}%`
      };
    } else if (price <= 25) {
      // 🟨 Medium price (amber / yellow)
      return {
        bar: "bg-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
        width: `${Math.min(100, (price / 30) * 100)}%`
      };
    } else {
      // 🟥 High price (rose / red)
      return {
        bar: "bg-rose-500",
        bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300",
        width: "95%"
      };
    }
  };

  const getTrafficBarClass = (traffic: number) => {
    // 🟦 Traffic blue bar
    const percent = traffic >= 9999 ? 100 : Math.min(100, Math.max(15, (traffic / 500) * 100));
    return {
      bar: "bg-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
      width: `${percent}%`
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          首页
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('/blog/categories')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          博客
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('/guides', { slug: 'top-recommendations' })} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          机场对比
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
          全网最全推荐！2026翻墙机场性能与价格对比榜
        </span>
      </nav>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-indigo-900/50">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-16 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-5 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            <span>全网百家机场实测 · 价格/流量条形图全景可视化</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            全网最全推荐！2026翻墙机场性能与价格对比榜
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            实测百家机场：哪家最稳？哪家最便宜？从 <span className="text-emerald-400 font-semibold">🟩超低价（≤10元）</span>、<span className="text-amber-400 font-semibold">🟨中档均衡（11~25元）</span> 到 <span className="text-rose-400 font-semibold">🟥优质专线（&gt;25元）</span>，直观条形图横向 PK，带你一目了然选出最省最稳方案。
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 border-t border-slate-800/80">
            <span className="flex items-center gap-1">
              更新时间：<span className="text-blue-300 font-mono">2026-10-11</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">#科学上网</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">#VPNPK</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">#推荐PK</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">#机场PK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Article Featured Sample Callout */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            实测样本追踪：平价机场价格基准样本
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          为了建立科学的横向比对基准线，评测室持续采集代表性样本。例如 <strong>神行加速</strong>（多入口BGP+HG中专线路、晚高峰 4K 零抖动、专属优惠券 sx0077）与 <strong>榴莲云</strong>（年付 96元折合 8元/月高性价比平价首选）。经长期检测，不仅极具价格竞争力，在晚高峰稳定性与流媒体解锁方面也表现出众。
        </p>
      </div>

      {/* Core Accordion 1: Traffic vs Unlimited 13-Dimension Comparison Table (Target Feature!) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('trafficVsUnlimited')}
          className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2.5 text-base sm:text-lg">
              <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              流量型 vs 不限流量机场全方位对比（13项指标对照表）
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              深度解析两种截然不同的运营架构，破除“不限流量一定更划算”的认知误区
            </p>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openAccordion.trafficVsUnlimited ? 'rotate-180' : ''}`} />
        </button>

        {openAccordion.trafficVsUnlimited && (
          <div className="px-6 sm:px-8 pb-8 pt-2 space-y-4 border-t border-slate-100 dark:border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300 w-1/4">对比指标</th>
                    <th className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-300 w-3/8">流量型机场 (主流推荐)</th>
                    <th className="py-3 px-4 font-bold text-blue-700 dark:text-blue-300 w-3/8">不限流量机场 (大带宽型)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  {comparison13Rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {row.item}
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                        {row.traffic}
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                        {row.unlimited}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Core Accordion 2: User Matrix & Dual-Airport Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* User Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">不同用户群体选型方案速配</h3>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-0.5">💼 外贸 / 跨境电商 / 远程办公</strong>
              <span className="text-slate-600 dark:text-slate-300">严禁使用劣质直连！首选拥有 IPLC/IEPL 端内专线与纯净原生 IP 的机场，保证邮件与后台不跳风控验证。</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-0.5">🎓 学生党 / 轻度查资料 / 偶用 AI</strong>
              <span className="text-slate-600 dark:text-slate-300">月均低至 8~12 元的平价中转专线机场（如榴莲云、大佬云），单月 60~80G 足够日常学习使用。</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block mb-0.5">🍿 4K 奈飞 / YouTube 影音追剧狂</strong>
              <span className="text-slate-600 dark:text-slate-300">优先挑选神行加速、榴莲云、环球梯等晚高峰 4K 零抖动、流媒体原生解锁的专线节点。</span>
            </div>
          </div>
        </div>

        {/* Dual Airport Strategy */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">双机场黄金组合：永不失联秘籍</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              这是科学上网资深老玩家一致推崇的最高性价比方案：
            </p>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200 text-xs space-y-1.5">
              <p><strong>🥇 主力机场 (90%使用量)：</strong>月付 15~25 元，选择专线中转，保障晚高峰流畅。</p>
              <p><strong>🥈 备用机场 (10%应急)：</strong>买一份 10~20 元的不限时按量流量包（永久有效）。平时不扣月租，主力万一故障直接切备用！</p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('/guides', { slug: 'top-recommendations' })}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>直达 2026 梯子总榜推荐</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Core Accordion 3: 16 Core Indicators Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('indicator16')}
          className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2.5 text-base sm:text-lg">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              16个核心关键指标解析（买机场必看参数）
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              掌握这 16 个核心参数，任何虚假宣传和参数套路都逃不过你的眼睛
            </p>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openAccordion.indicator16 ? 'rotate-180' : ''}`} />
        </button>

        {openAccordion.indicator16 && (
          <div className="px-6 sm:px-8 pb-8 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 border-t border-slate-100 dark:border-slate-800">
            {indicators16.map((ind, iIdx) => (
              <div key={iIdx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white text-xs block text-indigo-600 dark:text-indigo-400">
                  {ind.title}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Feature: VPN翻墙机场对比表 (Visual Bar Chart Ranking Table - Core Target Section) */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              VPN 翻墙机场价格与性能综合对比表
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              彩色价格条形图与流量分布可视化：🟩低价(≤10元) · 🟨中价(11~25元) · 🟥高价(&gt;25元) · 🟦月流量
            </p>
          </div>

          {/* Interactive Search & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜索机场名或价格..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {/* Filter pills */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${filterMode === 'all' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                全部({airportData.length})
              </button>
              <button
                onClick={() => setFilterMode('under10')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${filterMode === 'under10' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                ≤10元低价
              </button>
              <button
                onClick={() => setFilterMode('trial')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${filterMode === 'trial' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                支持试用
              </button>
              <button
                onClick={() => setFilterMode('oneTime')}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${filterMode === 'oneTime' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                支持单独买
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              <option value="default">默认推荐排序</option>
              <option value="priceAsc">价格从低到高</option>
              <option value="priceDesc">价格从高到低</option>
              <option value="trafficDesc">月流量从多到少</option>
            </select>
          </div>
        </div>

        {/* The Full Comparison Table with Color Bars */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                  <th className="py-3.5 px-4 font-bold min-w-[110px]">机场名称</th>
                  <th className="py-3.5 px-4 font-bold min-w-[130px]">官方地址</th>
                  <th className="py-3.5 px-4 font-bold min-w-[210px]">入门价格（条形图）</th>
                  <th className="py-3.5 px-4 font-bold min-w-[190px]">月流量（条形图）</th>
                  <th className="py-3.5 px-4 font-bold min-w-[140px]">试用政策</th>
                  <th className="py-3.5 px-4 font-bold min-w-[140px]">单独购买 (按量)</th>
                  <th className="py-3.5 px-4 font-bold text-center min-w-[90px]">快捷评测</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredList.map((item, idx) => {
                  const priceBar = getPriceBarClass(item.priceNum);
                  const trafficBar = getTrafficBarClass(item.trafficNum);

                  return (
                    <tr 
                      key={idx}
                      className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Name */}
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          {item.logo && (
                            <img src={item.logo} alt={item.name} className="w-5 h-5 object-contain rounded shrink-0" />
                          )}
                          <span>{item.name}</span>
                        </div>
                      </td>

                      {/* Official URL Link */}
                      <td className="py-3 px-4">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors font-semibold"
                        >
                          <span>直达官网</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      {/* Visual Price Bar */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono block">
                            {item.priceText}
                          </span>
                          {/* Visual Bar */}
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex items-center">
                            <div 
                              className={`h-full rounded-full ${priceBar.bar} transition-all duration-300`} 
                              style={{ width: priceBar.width }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Visual Traffic Bar */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono block">
                            {item.trafficText}
                          </span>
                          {/* Visual Bar */}
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden flex items-center">
                            <div 
                              className={`h-full rounded-full ${trafficBar.bar} transition-all duration-300`} 
                              style={{ width: trafficBar.width }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Trial */}
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {item.trial === '无' ? (
                          <span className="text-slate-400 text-[11px]">无试用</span>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {item.trial}
                          </span>
                        )}
                      </td>

                      {/* One Time */}
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {item.hasOneTime ? (
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span>{item.oneTime}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px] flex items-center gap-1">
                            <XCircle className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{item.oneTime}</span>
                          </span>
                        )}
                      </td>

                      {/* Review Link */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => navigateTo('/blog', { slug: item.reviewSlug })}
                          className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium text-[11px]"
                        >
                          评测
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 7 Key FAQs Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          常见疑问解答 (FAQ)
        </h2>

        <div className="space-y-2.5">
          {faqs.map((faq, fIdx) => (
            <div 
              key={fIdx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIndex === fIdx ? 'rotate-180' : ''}`} />
              </button>
              {openFaqIndex === fIdx && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Cards */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
        <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          推荐下一步阅读
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => navigateTo('/guides', { slug: 'top-recommendations' })}
            className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-bold block text-sm">2026 机场推荐总榜</span>
              <span className="text-slate-400 text-[11px]">查看全网梯子节点综合推荐评级</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </button>
          <button
            onClick={() => navigateTo('/guides', { slug: 'eval-center' })}
            className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-bold block text-sm">梯子节点机场评测中心</span>
              <span className="text-slate-400 text-[11px]">跑路预警、避坑指南与深度报告</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </button>
          <button
            onClick={() => navigateTo('/blog', { slug: 'speedtest-nodes-batch-testing-guide' })}
            className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-bold block text-sm">机场节点批量测速教程</span>
              <span className="text-slate-400 text-[11px]">测速脚本与晚高峰丢包自查工具</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </button>
        </div>
      </div>

    </div>
  );
};
