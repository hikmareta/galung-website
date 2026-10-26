const {test,before,after} = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const {createPreviewServer} = require('../serve-preview.cjs');
let server,port;
function request(target='/',method='GET',activePort=port) {
  return new Promise((resolve,reject) => {
    const req=http.request({hostname:'127.0.0.1',port:activePort,path:target,method},res=>{
      const parts=[];res.on('data',b=>parts.push(b));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(parts)}));
    });req.on('error',reject);req.end();
  });
}
before(async()=>{server=createPreviewServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));port=server.address().port;});
after(async()=>{await new Promise(r=>server.close(r));});
test('page is served only with preview security/indexing headers',async()=>{
  const r=await request();assert.equal(r.status,200);assert.match(r.headers['x-robots-tag'],/noindex/);
  assert.equal(r.headers['x-content-type-options'],'nosniff');assert.match(r.headers['content-security-policy'],/form-action 'none'/);
  assert.match(r.body.toString(),/lang="id"/);
});
test('HEAD has no body and matches GET length',async()=>{const a=await request(),b=await request('/','HEAD');assert.equal(b.status,200);assert.equal(b.body.length,0);assert.equal(b.headers['content-length'],String(a.body.length));});
test('write methods are rejected with Allow and noindex',async()=>{for(const method of ['POST','PUT','DELETE']){const r=await request('/',method);assert.equal(r.status,405);assert.equal(r.headers.allow,'GET, HEAD');assert.match(r.headers['x-robots-tag'],/noindex/);}});
test('private sources, original assets and traversal are not served',async()=>{
  for(const target of ['/.env','/template.html','/../AGENTS.md','/%2e%2e/AGENTS.md','/assets/hero-generated-v2.png','/assets/fonts/poppins-600.ttf','/admin']){
    const r=await request(target);assert.equal(r.status,404,target);assert.match(r.headers['x-robots-tag'],/noindex/);assert.doesNotMatch(r.body.toString(),/DATABASE_URL|PAYLOAD_SECRET|D:\\/);
  }
});
test('invalid/proxy-style URL returns 400 and server stays alive',async()=>{
  for(const target of ['http://[','http://example.com/','//example.com/'])assert.equal((await request(target)).status,400);
  assert.equal((await request()).status,200);
});
test('compressed fonts and WebP are served with accurate MIME',async()=>{
  for(const [target,type] of [['/assets/fonts/poppins-600-latin.woff2','font/woff2'],['/assets/optimized/hero-v3-640.webp','image/webp'],['/styles.css','text/css; charset=utf-8']]){
    const r=await request(target);assert.equal(r.status,200);assert.equal(r.headers['content-type'],type);assert.ok(r.body.length>0);
  }
});
test('unknown names cannot widen the asset allowlist',async()=>{for(const p of ['/assets/optimized/manifest.json','/assets/optimized/hero-v3-1.webp','/assets/fonts/source-google-fonts.css'])assert.equal((await request(p)).status,404);});
test('missing allowed file gives safe 404, then subsequent request still works',async()=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'galung-preview-'));
  const isolated=createPreviewServer({root});await new Promise(r=>isolated.listen(0,'127.0.0.1',r));
  try{
    const p=isolated.address().port;const missing=await request('/','GET',p);assert.equal(missing.status,404);assert.equal(missing.body.toString(),'Not found');
    await fs.writeFile(path.join(root,'index.html'),'<p>ready</p>');assert.equal((await request('/','GET',p)).status,200);
  }finally{await new Promise(r=>isolated.close(r));await fs.unlink(path.join(root,'index.html')).catch(()=>{});await fs.rmdir(root);}
});

test('filesystem errors give safe 500 without leaking paths and do not crash',async()=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'galung-preview-error-'));
  const target=path.join(root,'index.html');await fs.mkdir(target);
  const isolated=createPreviewServer({root});await new Promise(r=>isolated.listen(0,'127.0.0.1',r));
  try{
    const p=isolated.address().port;const r=await request('/','GET',p);assert.equal(r.status,500);assert.equal(r.body.toString(),'Preview unavailable');assert.match(r.headers['x-robots-tag'],/noindex/);
    await fs.rmdir(target);await fs.writeFile(target,'ready');assert.equal((await request('/','GET',p)).status,200);
  }finally{await new Promise(r=>isolated.close(r));await fs.unlink(target).catch(()=>{});await fs.rmdir(root);}
});
test('malformed HTTP request is closed safely and server remains usable',async()=>{
  const net=require('node:net');
  const reply=await new Promise((resolve,reject)=>{
    const socket=net.createConnection({host:'127.0.0.1',port},()=>socket.write('BROKEN REQUEST\r\n\r\n'));
    let response='';socket.setTimeout(2000,()=>socket.destroy(new Error('Malformed-request response timed out')));
    socket.on('data',b=>response+=b.toString());socket.on('end',()=>resolve(response));socket.on('error',reject);
  });
  assert.match(reply,/400 Bad Request/);assert.match(reply,/X-Robots-Tag: noindex/);assert.equal((await request()).status,200);
});
