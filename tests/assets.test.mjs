import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
test('arquivos da versão offline existem e usam a mesma revisão',()=>{
 const worker=readFileSync('public/sw.js','utf8');const files=worker.match(/const FILES=\[([^;]+)\]/)[1].match(/'([^']+)'/g).map(x=>x.slice(1,-1));
 for(const url of files){const path=url.split('?')[0];assert.ok(existsSync(path==='./'?'public/index.html':'public/'+path.slice(2)),url);}
 const index=readFileSync('public/index.html','utf8'),app=readFileSync('public/app-v4.js','utf8');assert.ok(index.includes('v=060'));assert.ok(app.includes('core.js?v=060'));assert.ok(worker.includes('forja-060'));
});
test('identidade usa fontes locais e ícones PNG nas dimensões declaradas',()=>{
 const css=readFileSync('public/design-v4.css','utf8');assert.ok(css.startsWith(':root{'));assert.ok(!css.includes('fonts.googleapis.com'));
 const brand=readFileSync('public/identity.css','utf8');for(const match of brand.matchAll(/url\('\.\/([^']+)'\)/g))assert.ok(existsSync('public/'+match[1]));
 const manifest=JSON.parse(readFileSync('public/manifest.webmanifest','utf8'));for(const icon of manifest.icons){const bytes=readFileSync('public/'+icon.src.slice(2));assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`,icon.sizes);}
});
