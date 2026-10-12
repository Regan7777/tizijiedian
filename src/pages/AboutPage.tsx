import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Award, Mail, MessageSquare, CheckCircle2, ChevronRight, Compass, BookOpen, Activity, AlertTriangle } from 'lucide-react';
import { siteConfig } from '../data/mockData';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-200">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => navigateTo('/')} className="hover:text-indigo-600 transition-colors">
          首页
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-800 dark:text-slate-200">关于本站</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck className="w-4 h-4" /> 独立·客观·数据驱动
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          关于梯子节点
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          梯子节点是一个长期更新的独立科技选型、软件与网络服务测评平台。我们致力于通过真实的数据和透明的实测，消灭虚假充钱排行榜，为用户提供真正值得信任的工具导航。
        </p>
      </div>

      {/* 我们做什么 Section */}
      <section className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-md">
            <Compass className="w-4 h-4" /> 站点使命与内容方向
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            我们做什么
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            聚焦真实体验与长效可用性，为普通用户提供清晰、易懂、避坑的实用指南
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Item 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 flex items-start gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                实用教程整理
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                整理 VPN、机场、Clash、Shadowrocket、Telegram、AI 工具访问等实用教程。
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 flex items-start gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                表现跟踪与风险预警
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                跟踪机场套餐、节点可用性、晚高峰表现、流媒体解锁和跑路风险。
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 flex items-start gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                订阅避坑与跑路监控
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                汇总机场真实倍率、常见故障排查、订阅避坑指南和跑路风险预警。
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 flex items-start gap-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                傻瓜化易懂配置流程
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                用尽量清楚的步骤，把复杂配置拆成普通用户可以照着排查的流程。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FTC & Affiliate Disclosure Policy */}
      <section id="disclosure" className="p-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          联盟营销与商业模式透明说明 (FTC Disclosure)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {siteConfig.adDisclosure}
        </p>
        <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-100 dark:border-slate-800 pt-3">
          <p>• 评测标准完全独立：任何供应商无法通过付费提升自身在榜单中的名次或隐藏短板。</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-500" />
            联系与意见反馈
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            欢迎提交软件测试申请、错漏更正或商务咨询
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">电子邮箱</h4>
            <p className="text-slate-500 font-mono">contact@techpulse-eval.com</p>
            <p className="text-[11px] text-slate-400">通常在 24 小时内回复您的邮件</p>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">个人飞机 (Telegram)</h4>
            <p className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm">
              <a href="https://t.me/wanfengzn" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                @wanfengzn
              </a>
            </p>
            <p className="text-[11px] text-slate-400">Telegram 在线即时沟通与反馈</p>
          </div>
        </div>
      </section>

    </div>
  );
};
