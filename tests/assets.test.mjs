import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
test('arquivos da versão offline existem e usam a mesma revisão',()=>{
 const worker=readFileSync('public/sw.js','utf8');const files=worker.match(/const FILES=\[([^;]+)\]/)[1].match(/'([^']+)'/g).map(x=>x.slice(1,-1));
 for(const url of files){const path=url.split('?')[0];assert.ok(existsSync(path==='./'?'public/index.html':'public/'+path.slice(2)),url);}
 const index=readFileSync('public/index.html','utf8'),app=readFileSync('public/app-v4.js','utf8');assert.ok(index.includes('v=042'));assert.ok(app.includes('core.js?v=042'));assert.ok(worker.includes('forja-042'));
});
