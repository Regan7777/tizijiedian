const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'tizijiedian.com';
const KEY = '7ec54bed5e684bee9e50ea059b0e5538';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// 1. 确保 sitemap 存在
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('未检测到 sitemap.xml，正在生成...');
  require('./generate-sitemap.cjs');
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
const urlList = urlMatches.map(m => m.replace(/<\/?loc>/g, '').trim());

if (urlList.length === 0) {
  console.error('❌ 未在 sitemap.xml 中提取到任何有效 URL。');
  process.exit(1);
}

console.log(`\n📋 准备向 IndexNow 提交 ${urlList.length} 个 URL (主机: ${HOST})`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

function submitToEndpoint(endpointUrl) {
  return new Promise((resolve) => {
    const urlObj = new URL(endpointUrl);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 10000
    };

    console.log(`\n🚀 正在推送至: ${endpointUrl}`);
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`  ✅ 提交成功! 状态码: ${res.statusCode} (${res.statusMessage || 'OK'})`);
        } else {
          console.log(`  ⚠️ 状态码: ${res.statusCode} (${res.statusMessage})`);
          if (body) {
            console.log(`  📝 返回内容: ${body}`);
          }
          if (res.statusCode === 403) {
            console.log(`  💡 提示: 若返回 403 (UserForbiddenToAccessSite)，请确保代码已 push 且远端线上能通过 https://${HOST}/${KEY}.txt 访问到严格 32 字节密钥文件。`);
          }
        }
        resolve({ statusCode: res.statusCode, body });
      });
    });

    req.on('error', (err) => {
      console.error(`  ❌ 网络请求失败: ${err.message}`);
      resolve({ error: err });
    });

    req.on('timeout', () => {
      req.destroy();
      console.error(`  ⏱️ 请求超时`);
      resolve({ error: 'TIMEOUT' });
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  await submitToEndpoint('https://api.indexnow.org/indexnow');
  await submitToEndpoint('https://www.bing.com/indexnow');
  console.log('\n✨ IndexNow 批量推送流程完毕！');
}

main();
