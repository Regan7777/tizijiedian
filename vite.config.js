import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 本地开发环境 AFF 301 重定向映射表
const AFF_REDIRECT_MAP = {
  '/go/shenxing': 'https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8',
  '/go/liulianyun': 'https://fugui007.liulianyunaff.com/#/?code=Y6A1M1MN',
  '/go/dalaoyun': 'https://fugui0077.dalaoyunaff.com/#/?code=1o7gYhTL',
  '/go/huanqiuti': 'https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG',
  '/go/yunjiexian': 'https://fugui0077.yunjiexianaff.com/#/?code=qA3LF6hW',
  '/go/shandianshu': 'https://fugui0077.shandianshuaff.com/#/?code=I2yK9PfK',
};

// 本地开发环境 301 重定向中间件插件
function affRedirectPlugin() {
  return {
    name: 'aff-redirect-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (AFF_REDIRECT_MAP[url]) {
          res.writeHead(301, {
            Location: AFF_REDIRECT_MAP[url],
            'Cache-Control': 'no-cache'
          });
          res.end();
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    affRedirectPlugin()
  ],
})
