// Local-only design preview, not a CMS or installer delivery service.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const allowed = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'],
  ['/responsive-check.html', 'responsive-check.html'],
  ['/styles.css', 'styles.css'], ['/qa.css', 'qa.css'], ['/qa.js', 'qa.js'],
  ['/assets/fonts/fonts.css', 'assets/fonts/fonts.css'],
  ...['nunito-sans-400-700-latin.woff2', 'poppins-400-latin.woff2',
    'poppins-600-latin.woff2', 'poppins-700-latin.woff2'].map(f => [`/assets/fonts/${f}`, `assets/fonts/${f}`]),
]);
for (const [name, widths] of Object.entries({hero:[640,960,1280,1860],laptop:[480,768,1024,1536],community:[640,960,1280,1983]})) {
  for (const width of widths) {
    const file = `assets/optimized/${name}-v3-${width}.webp`;
    allowed.set(`/${file}`, file);
  }
}
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2'};
const csp = "default-src 'none'; style-src 'self'; script-src 'self'; img-src 'self'; font-src 'self'; frame-src 'self'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'; object-src 'none'";
function headers(extra = {}) {
  return {'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer',
    'Content-Security-Policy':csp, ...extra};
}
function send(res, status, text, method, extra = {}) {
  const bytes = Buffer.from(text);
  res.writeHead(status, headers({'Content-Type':'text/plain; charset=utf-8','Content-Length':bytes.length,...extra}));
  res.end(method === 'HEAD' ? undefined : bytes);
}
function createPreviewServer({root = __dirname} = {}) {
  const server = http.createServer(async (req, res) => {
    if (!['GET','HEAD'].includes(req.method)) {
      send(res,405,'Method not allowed',req.method,{'Allow':'GET, HEAD'}); return;
    }
    let pathname;
    try {
      // Reject proxy-style/invalid targets; never interpret a host supplied in the request.
      if (!req.url || !req.url.startsWith('/') || req.url.startsWith('//')) throw new Error('Invalid target');
      pathname = new URL(req.url,'http://localhost').pathname;
    } catch {
      send(res,400,'Bad request',req.method); return;
    }
    const file = allowed.get(pathname);
    if (!file) { send(res,404,'Not found',req.method); return; }
    try {
      const bytes = await fs.readFile(path.join(root,file));
      res.writeHead(200, headers({'Content-Type':mime[path.extname(file)],'Content-Length':bytes.length}));
      res.end(req.method === 'HEAD' ? undefined : bytes);
    } catch (error) {
      send(res,error.code === 'ENOENT' ? 404 : 500,error.code === 'ENOENT' ? 'Not found' : 'Preview unavailable',req.method);
    }
  });
  server.on('clientError',(_error,socket) => {
    if (socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\nX-Robots-Tag: noindex, nofollow\r\nContent-Length: 0\r\n\r\n');
  });
  return server;
}
if (require.main === module) {
  const server = createPreviewServer();
  server.on('error',error => { console.error(`Preview could not start: ${error.code || 'server error'}`); process.exitCode = 1; });
  server.listen(4174,'127.0.0.1',() => console.log('Local: http://127.0.0.1:4174'));
}
module.exports = {createPreviewServer};
