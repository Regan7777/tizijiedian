/**
 * 梯子节点 - 统一推广与 301 重定向映射管理
 * 
 * 所有服务商的原始推广链接集中在此处维护，前端统一使用内部短链接 /go/<id>。
 * 线上由 Cloudflare Pages / Netlify 的 _redirects 或 Vercel 的 redirects 实现 HTTP 301 永久重定向，
 * 本地开发环境由 vite.config.js 插件处理 301 响应。
 */

export interface AffLinkItem {
  id: string;
  name: string;
  target: string;
  redirectPath: string;
  promoCode?: string;
  discountText?: string;
}

export const AFF_LINKS: Record<string, AffLinkItem> = {
  shenxing: {
    id: "shenxing",
    name: "神行加速",
    target: "https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8",
    redirectPath: "/go/shenxing",
    promoCode: "sx0077",
    discountText: "立减 30%"
  },
  liulianyun: {
    id: "liulianyun",
    name: "榴莲云",
    target: "https://fugui007.liulianyunaff.com/#/?code=Y6A1M1MN",
    redirectPath: "/go/liulianyun",
    promoCode: "ll88",
    discountText: "季付及以上 7 折"
  },
  dalaoyun: {
    id: "dalaoyun",
    name: "大佬云",
    target: "https://fugui0077.dalaoyunaff.com/#/?code=1o7gYhTL",
    redirectPath: "/go/dalaoyun",
    promoCode: "dly888",
    discountText: "季付及以上 7 折"
  },
  huanqiuti: {
    id: "huanqiuti",
    name: "环球梯",
    target: "https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG",
    redirectPath: "/go/huanqiuti",
    promoCode: "HQ66",
    discountText: "新客 7 折"
  },
  yunjiexian: {
    id: "yunjiexian",
    name: "云界线",
    target: "https://fugui0077.yunjiexianaff.com/#/?code=qA3LF6hW",
    redirectPath: "/go/yunjiexian",
    discountText: "结账立减 7 折"
  },
  shandianshu: {
    id: "shandianshu",
    name: "闪电鼠",
    target: "https://fugui0077.shandianshuaff.com/#/?code=I2yK9PfK",
    redirectPath: "/go/shandianshu",
    promoCode: "sd88",
    discountText: "首单 7 折"
  }
};

/**
 * 根据机场标识获取其 301 跳转路径
 */
export const getAffRedirectUrl = (id: string): string => {
  return AFF_LINKS[id]?.redirectPath || `/go/${id}`;
};

/**
 * 根据机场标识获取其真实 AFF 目标地址
 */
export const getAffTargetUrl = (id: string): string | undefined => {
  return AFF_LINKS[id]?.target;
};
