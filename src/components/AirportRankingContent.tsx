import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, ChevronDown, ExternalLink, ShieldCheck, 
  AlertTriangle, HelpCircle, Search, Clock, Sparkles, Zap, BookOpen, Award
} from 'lucide-react';

interface AirportRow {
  name: string;
  logo?: string;
  url: string;
  trial: string;
  price: string;
  oneTime: string;
  hasOneTime: boolean;
  tg: string;
  tgUrl?: string;
  reviewSlug: string;
}

export const AirportRankingContent: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>({
    troubleshooting: false,
    whatIsAirport: false,
    vpnVsAirport: false,
    howToChoose: true,
    appleId: false
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Top 6 airports in strict priority order
  const airportList: AirportRow[] = [
    { 
      name: "神行加速", 
      logo: "/images/shenxing-logo.png",
      url: "https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8", 
      trial: "专属优惠券sx0077（立减30%）", 
      price: "96元/年、60GB/月（折合8元/月）", 
      oneTime: "✔️99元/90GB起不限时流量", 
      hasOneTime: true, 
      tg: "telegram", 
      tgUrl: "https://t.me/shenxingjs", 
      reviewSlug: "shenxing-accelerator-in-depth-review" 
    },
    { 
      name: "榴莲云", 
      logo: "/images/liulianyun-logo.png",
      url: "https://fugui007.liulianyunaff.com/#/?code=Y6A1M1MN", 
      trial: "季付起专属7折优惠券（码：ll88，96年付不可用）", 
      price: "96元/年、60GB/月（折合8元/月，不可用券）", 
      oneTime: "❌暂无一次性套餐", 
      hasOneTime: false, 
      tg: "telegram", 
      tgUrl: "https://t.me/+-_boXR6kHwAzMDZl", 
      reviewSlug: "liulianyun-airport-review" 
    },
    { 
      name: "大佬云", 
      logo: "/images/dalaoyun-logo.png",
      url: "https://fugui0077.dalaoyunaff.com/#/?code=1o7gYhTL", 
      trial: "季付专属7折优惠券（码：dly888）", 
      price: "96元/年60GB/月（折合8元/月）；19.99元月付", 
      oneTime: "✔️99元/78GB起一次性包", 
      hasOneTime: true, 
      tg: "暂无", 
      reviewSlug: "dalaoyun-airport-review" 
    },
    { 
      name: "环球梯", 
      logo: "/images/huanqiuti-logo.png",
      url: "https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG", 
      trial: "专属新客7折优惠券（码：HQ66，96年付不可用）", 
      price: "96元/年、60GB/月（折合8元/月，不可用券）", 
      oneTime: "✔️99元/80GB起一次性流量", 
      hasOneTime: true, 
      tg: "telegram", 
      tgUrl: "https://t.me/huanqiuti88", 
      reviewSlug: "huanqiuti-airport-review" 
    },
    { 
      name: "云界线", 
      logo: "/images/yunjiexian-logo.png",
      url: "https://fugui0077.yunjiexianaff.com/#/?code=qA3LF6hW", 
      trial: "新客结账立享7折，可申请测试账号", 
      price: "22元/150GB每月（新客7折约15.4元）", 
      oneTime: "✔️99元/300GB起按量包", 
      hasOneTime: true, 
      tg: "暂无", 
      reviewSlug: "yunjiexian-airport-review" 
    },
    { 
      name: "闪电鼠", 
      logo: "/images/shandianshu-logo.png",
      url: "https://fugui0077.shandianshuaff.com/#/?code=I2yK9PfK", 
      trial: "新用户首单7折优惠券（码：sd88）", 
      price: "96元/年60GB/月（折合8元/月）；19.9元月付", 
      oneTime: "✔️不限设备数、全节点1.0x", 
      hasOneTime: true, 
      tg: "暂无", 
      reviewSlug: "shandianshu-airport-review" 
    }
  ];

  const filteredAirports = useMemo(() => {
    if (!searchTerm.trim()) return airportList;
    const term = searchTerm.toLowerCase();
    return airportList.filter(a => 
      a.name.toLowerCase().includes(term) || 
      a.price.toLowerCase().includes(term) || 
      a.trial.toLowerCase().includes(term)
    );
  }, [searchTerm, airportList]);

  const faqs = [
    {
      q: "翻墙机场和VPN哪个好？",
      a: "机场通常提供可导入第三方客户端（如 Clash、Shadowrocket）的多节点订阅，协议更新快、线路多且价格亲民；VPN 服务通常提供官方独立客户端，一键连接但容易受封锁。追求速度、流媒体解锁及高性价比，机场是目前绝对的主流选择。"
    },
    {
      q: "翻墙机场一个月多少钱？",
      a: "价格随流量、专线质量（BGP/IEPL/IPLC）及设备数浮动。轻度用户通常 5~10元/月（50~100G），主流稳定专线在 15~30元/月（150~300G）。建议先月付测试，勿盲目年付。"
    },
    {
      q: "翻墙机场支持ChatGPT与TikTok吗？",
      a: "是否可用取决于服务商的落地节点 IP 纯净度与欺诈值（Fraud Score）。本榜单收录的头部优质机场（如神行加速、榴莲云、大佬云等）均部署了原生住宅 IP 或解锁 DNS，保障 OpenAI 与海外主流流媒体畅通。"
    },
    {
      q: "翻墙机场可以看Netflix 4K/8K吗？",
      a: "绝大多数专线节点均支持 Netflix、Disney+ 与 YouTube 原画播放。购买前可核对节点列表中的解锁标记，并优先选用新加坡、日本或香港节点。"
    },
    {
      q: "Clash和Shadowrocket用哪个？",
      a: "Windows / Mac / Android 平台首推使用开源的 Clash Verge Rev 或 Flclash；iPhone / iPad 建议使用美区账号下载 Shadowrocket (小火箭) 或 Stash。"
    },
    {
      q: "翻墙机场会跑路吗？如何防坑？",
      a: "任何商业代理均存在不可抗力风险。防范核心原则：1. 尽量选择运营稳定、口碑优质的服务商；2. 坚持月付或季付，切勿为超大折扣轻易购买多年套餐；3. 常备一个低成本备用节点池。"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 transition-colors">
          首页
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('/blog')} className="hover:text-indigo-600 transition-colors">
          评测博客
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-400">机场榜单</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
          2026年翻墙机场推荐评测｜稳定便宜VPN机场排行榜
        </span>
      </nav>

      {/* Main Header Title & Meta */}
      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          2026年翻墙机场推荐评测｜稳定便宜VPN机场排行榜（高性价比科学上网工具长期更新）
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" /> 发布: 2026-09-16 · 动态更新中
          </span>
          <span>•</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {['科学上网', 'VPN', '机场推荐', '专线节点'].map((t, idx) => (
              <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-[11px] font-medium">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Intro with Banner Image */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="aspect-[16/9] sm:aspect-[21/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200/60 dark:border-slate-800 shadow-md">
          <img 
            src="/images/airport-recommendation-2026.jpg" 
            alt="2026机场梯子节点推荐" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            这份 <strong>2026 年翻墙机场推荐榜</strong> 汇总套餐价格、流量、线路、客户端支持、使用场景与真实测速，帮助你先缩小候选范围。机场与传统 VPN 的产品形式不同，实际速度和稳定性也会随地区、运营商、时段及服务方调整而变化；榜单结果应结合你自己的网络验证。
          </p>

          <p>如果你正在寻找：</p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>稳定好用的 <strong>翻墙机场推荐</strong></li>
            <li>支持 <strong>ChatGPT 与 Claude 高速访问</strong> 的节点服务</li>
            <li>可流畅秒开 <strong>Netflix / YouTube 4K/8K</strong> 与主流流媒体的科学上网工具</li>
            <li>便宜高速、月付低至数元的 <strong>高性价比 VPN 机场服务</strong></li>
            <li>配合 Clash、Shadowrocket (小火箭) 的通用高速订阅</li>
          </ul>

          <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 space-y-1.5 font-medium">
            <div className="font-bold flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-4 h-4" /> 2026年最新实测精选：
            </div>
            <div>
              重点收录 <strong>神行加速</strong>（多入口BGP+HG中专线路、晚高峰 4K 零抖动、专属优惠券 sx0077 立减 30%）、<strong>榴莲云</strong>（IEPL 专线、年付 96元折合 8元/月平价首选）、<strong>大佬云</strong>（季付专属 7 折码 dly888）及 <strong>环球梯</strong>（IEPL 端内专线、专属优惠码 HQ66），点击评测即可查看长文拆解！
            </div>
          </div>
        </div>
      </div>

      {/* Educational Accordions */}
      <div className="space-y-3">
        {/* Accordion 1: Troubleshooting */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <button 
            onClick={() => toggleAccordion('troubleshooting')}
            className="w-full p-4.5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span>一、新手常见连接与配置故障排查（Clash / Shadowrocket）</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.troubleshooting ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>
          {openAccordion.troubleshooting && (
            <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-2 leading-relaxed bg-slate-50/40 dark:bg-slate-950/40">
              <p>• <strong>导入订阅提示网络错误</strong>：检查订阅链接是否完整，关闭旧代理软件并直连重试，或将订阅地址转换为 Base64 编码。</p>
              <p>• <strong>节点全部超时/显示不可用</strong>：检查电脑/手机系统时间，若与北京标准时间相差超过 60 秒会导致握手协议失败；重置系统代理开关。</p>
              <p>• <strong>能打开网页但无法使用 ChatGPT / TikTok</strong>：切换至标有原生或解锁字样的落地节点，或清理浏览器 Cookie 重试。</p>
            </div>
          )}
        </div>

        {/* Accordion 2: What is Airport */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <button 
            onClick={() => toggleAccordion('whatIsAirport')}
            className="w-full p-4.5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span>二、什么是翻墙机场？为什么叫“机场”？</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.whatIsAirport ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>
          {openAccordion.whatIsAirport && (
            <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-2 leading-relaxed bg-slate-50/40 dark:bg-slate-950/40">
              <p>“机场”早期源自 Shadowsocks（小飞机图标客户端）的服务提供商称呼。用户购买服务后获得一条订阅链接，可批量导入数十上百个全球节点，一键接管网络出海分流。</p>
            </div>
          )}
        </div>

        {/* Accordion 3: VPN vs Airport */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <button 
            onClick={() => toggleAccordion('vpnVsAirport')}
            className="w-full p-4.5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span>三、翻墙机场与传统VPN有什么区别？</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.vpnVsAirport ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>
          {openAccordion.vpnVsAirport && (
            <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-2 leading-relaxed bg-slate-50/40 dark:bg-slate-950/40">
              <p>• <strong>传统 VPN</strong>：通常为海外商业公司（如 ExpressVPN、NordVPN），采用统一闭源客户端。在强封锁环境下容易大面积 IP 阵亡，且月费偏贵（$5~$12/月）。</p>
              <p>• <strong>翻墙机场</strong>：针对国内网络出口定制，采用国内 BGP 入口与隧道中转，配合 Clash / 小火箭等精细分流规则，性价比极高（5~25元/月即可获得数百 GB 高速流量），是目前国内科研、办公与影音的主流首选。</p>
            </div>
          )}
        </div>

        {/* Accordion 4: How to Choose */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <button 
            onClick={() => toggleAccordion('howToChoose')}
            className="w-full p-4.5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              四、如何选择翻墙机场（核心重点🔥 线路/价格/防跑路）
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.howToChoose ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>
          {openAccordion.howToChoose && (
            <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-3 leading-relaxed bg-slate-50/40 dark:bg-slate-950/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="font-bold text-xs text-indigo-600 dark:text-indigo-400 mb-1">1. 线路选择（决定网速上限）</div>
                  <p className="text-xs text-slate-500">首选 <strong>IEPL / IPLC 专线</strong> 或 <strong>多入口 BGP 中转</strong>。真专线晚高峰丢包率 &lt; 0.5%，拒绝公网直连假专线。</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="font-bold text-xs text-indigo-600 dark:text-indigo-400 mb-1">2. 价格参考行情</div>
                  <p className="text-xs text-slate-500">轻度尝鲜：5~10元 (50~100GB)；主力日常：15~25元 (150~300GB)；大流量下载：30元以上。</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 5: Free Apple ID */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <button 
            onClick={() => toggleAccordion('appleId')}
            className="w-full p-4.5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span>五、免费美区 Apple ID 账号与使用须知（安全红线必读）</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openAccordion.appleId ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>
          {openAccordion.appleId && (
            <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-2 leading-relaxed bg-slate-50/40 dark:bg-slate-950/40">
              <p className="text-rose-600 dark:text-rose-400 font-bold">
                ⚠️ 严禁在 iPhone【系统设置】顶部登录外区 iCloud！否则可能导致整机被远程锁定变砖！
              </p>
              <p>正确做法：仅在【App Store】内部登录切换。如果需要注册属于自己的纯洁永久账号，可直接参考站内《2026 免费美区 Apple ID 注册全攻略》。</p>
            </div>
          )}
        </div>

      </div>

      {/* Main Ranking Table Section */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600" />
              六、2026翻墙机场推荐排行榜（完整实测大榜单）
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              按月付价格、试用政策、一次性流量与节点协议持续跟踪核验（共收录 {airportList.length} 家精选服务商）
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索机场名称/价格/协议..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold">
                  <th className="p-3.5 pl-4">机场名称</th>
                  <th className="p-3.5">官方入口</th>
                  <th className="p-3.5">试用体验</th>
                  <th className="p-3.5">套餐价格与流量</th>
                  <th className="p-3.5">一次性流量</th>
                  <th className="p-3.5">官方频道</th>
                  <th className="p-3.5 text-center">详细评测</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredAirports.map((ap, idx) => (
                  <tr 
                    key={idx}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Name */}
                    <td className="p-3.5 pl-4">
                      <div className="flex items-center gap-2">
                        {ap.logo && (
                          <img src={ap.logo} alt={ap.name} className="w-5 h-5 object-contain rounded shrink-0" />
                        )}
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {ap.name}
                        </span>
                      </div>
                    </td>

                    {/* Official Entrance */}
                    <td className="p-3.5">
                      <a 
                        href={ap.url}
                        target="_blank" 
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                      >
                        <span>官网</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    {/* Trial / Coupon */}
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {ap.trial}
                    </td>

                    {/* Price */}
                    <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                      {ap.price}
                    </td>

                    {/* One Time Plan */}
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {ap.oneTime}
                    </td>

                    {/* TG Channel */}
                    <td className="p-3.5">
                      {ap.tgUrl ? (
                        <a 
                          href={ap.tgUrl} 
                          target="_blank" 
                          rel="noopener noreferrer nofollow"
                          className="text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          {ap.tg}
                        </a>
                      ) : (
                        <span className="text-slate-400">{ap.tg}</span>
                      )}
                    </td>

                    {/* Review Link Button */}
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => navigateTo('/blog', { slug: ap.reviewSlug })}
                        className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 font-bold text-[11px] hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                      >
                        前往评测
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Featured Detailed Deep-Dive Airport Cards */}
      <div className="space-y-6 pt-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          重点测试机场长文拆解速览
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: 神行加速 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src="/images/shenxing-logo.png" alt="神行加速" className="w-6 h-6 object-contain rounded" />
                <span className="font-extrabold text-base text-slate-900 dark:text-white">神行加速 机场服务评测</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                多入口 BGP + HG 中转专线架构，4K 极速秒开零抖动，原生解锁 Netflix/Disney+/ChatGPT，全节点双向计费不虚标，无设备限制。
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div>• 优惠政策：专属优惠券（码：<strong className="text-indigo-600 dark:text-indigo-400">sx0077</strong> 立减 30%）</div>
                <div>• 套餐资费：年付折合 8元/60GB每月；另有 99元/90GB 不限时包</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('/blog', { slug: 'shenxing-accelerator-in-depth-review' })}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors text-center cursor-pointer"
              >
                查看详细评测
              </button>
              <a 
                href="https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8"
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>直达官网</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: 榴莲云 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src="/images/liulianyun-logo.png" alt="榴莲云" className="w-6 h-6 object-contain rounded" />
                <span className="font-extrabold text-base text-slate-900 dark:text-white">榴莲云 机场服务评测</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                IEPL 专线低价小流量首选，入门档年付 96元/年（折合 8 元/月，60GB/月，特惠版不适用优惠券），新客季付及以上常规套餐享专属 7 折优惠码 ll88，实测 60 个 VLESS 节点覆盖港台新美日，支持自研与第三方客户端。
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div>• 优惠政策：季付起专属优惠券（码：<strong className="text-amber-600 dark:text-amber-400">ll88</strong> 享 7 折，96年付除外）</div>
                <div>• 套餐资费：年付入门 96元/60GB每月（折合 8元/月，不可用券）；轻享包 140GB 季付折后 45.36元</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('/blog', { slug: 'liulianyun-airport-review' })}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors text-center cursor-pointer"
              >
                查看详细评测
              </button>
              <a 
                href="https://fugui007.liulianyunaff.com/#/?code=Y6A1M1MN"
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>直达官网</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: 大佬云 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src="/images/dalaoyun-logo.png" alt="大佬云" className="w-6 h-6 object-contain rounded" />
                <span className="font-extrabold text-base text-slate-900 dark:text-white">大佬云 机场服务评测</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                全节点 VLESS 协议与 IPLC 专线冗余，4K 视频秒开零卡顿，Netflix / Disney+ 与 ChatGPT 原生解锁，全节点 1.0x 标准倍率，不限并发设备。
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div>• 优惠政策：专属优惠券（码：<strong className="text-emerald-600 dark:text-emerald-400">dly888</strong> 季付及以上立享 7 折）</div>
                <div>• 套餐资费：年付折合 8元/60GB每月；月付 19.99元/100GB；随行包 99元/78GB</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('/blog', { slug: 'dalaoyun-airport-review' })}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors text-center cursor-pointer"
              >
                查看详细评测
              </button>
              <a 
                href="https://fugui0077.dalaoyunaff.com/#/?code=1o7gYhTL"
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>直达官网</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: 环球梯 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src="/images/huanqiuti-logo.png" alt="环球梯" className="w-6 h-6 object-contain rounded" />
                <span className="font-extrabold text-base text-slate-900 dark:text-white">环球梯 机场服务评测</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                全节点 IEPL 专线直连不过 GFW，60 个 VLESS 节点可用率 96.7%，支持香港、日本、新加坡、台湾、美国等全流媒体与 ChatGPT 原生解锁。
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div>• 优惠政策：开业新客福利优惠券（码：<strong className="text-rose-600 dark:text-rose-400">HQ66</strong> 享 7 折，96年付除外）</div>
                <div>• 套餐资费：年付学生包 96元/年（折合 8元/月 60GB，不可用券）；常规月付 22元/120GB起</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('/blog', { slug: 'huanqiuti-airport-review' })}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors text-center cursor-pointer"
              >
                查看详细评测
              </button>
              <a 
                href="https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG"
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>直达官网</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 5: 云界线 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src="/images/yunjiexian-logo.png" alt="云界线" className="w-6 h-6 object-contain rounded" />
                <span className="font-extrabold text-base text-slate-900 dark:text-white">云界线 机场服务评测</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                全节点 VLESS 协议配合动态专线优化，晚高峰 4K 极速秒开，覆盖港台新日美英德等全球节点，提供免费测试账号与按量计费包。
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div>• 优惠政策：新客结账页直享 <strong className="text-sky-600 dark:text-sky-400">7 折专属折扣</strong>；支持免费测试账号</div>
                <div>• 套餐资费：22元/150GB每月（7折后约 15.4元/月）；年付 96元/年（60GB/月）</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('/blog', { slug: 'yunjiexian-airport-review' })}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors text-center cursor-pointer"
              >
                查看详细评测
              </button>
              <a 
                href="https://fugui0077.yunjiexianaff.com/#/?code=qA3LF6hW"
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>直达官网</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 6: 闪电鼠 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src="/images/shandianshu-logo.png" alt="闪电鼠" className="w-6 h-6 object-contain rounded" />
                <span className="font-extrabold text-base text-slate-900 dark:text-white">闪电鼠 机场服务评测</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                新加坡海外团队运营，全节点 IEPL 专线与 VLESS 协议，全节点 1.0x 标准倍率且不限在线设备数，解锁 Netflix、Disney+ 与 ChatGPT。
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div>• 优惠政策：新用户首单专属优惠券（码：<strong className="text-purple-600 dark:text-purple-400">sd88</strong> 享 7 折大额优惠）</div>
                <div>• 套餐资费：年付入门约 8元/60GB每月；月付 19.90元/100GB起；高带宽 25元/150GB</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('/blog', { slug: 'shandianshu-airport-review' })}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors text-center cursor-pointer"
              >
                查看详细评测
              </button>
              <a 
                href="https://fugui0077.shandianshuaff.com/#/?code=I2yK9PfK"
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1 shadow-xs"
              >
                <span>直达官网</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          常见问答与选型避坑指南 (FAQ)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4.5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4.5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed bg-slate-50/40 dark:bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
