import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {artworks,quotes} from '../public/ui.js';
test('pacote aura preserva autoria, referências e imagens disponíveis offline',()=>{
 const source=JSON.parse(readFileSync('public/content/aura-frases.json','utf8'));
 assert.equal(source.quotes.length,30);assert.equal(source.images.length,2);
 const worker=readFileSync('public/sw.js','utf8');
 for(const q of source.quotes){const installed=quotes.find(x=>x.id===q.id);assert.ok(installed);for(const key of ['text','character','sourceUrl','reference','translation','verificationLevel'])assert.equal(installed[key],q[key]);assert.ok(installed.credit.includes(q.character));}
 for(const image of source.images){const installed=artworks.find(x=>x.id===image.id);assert.ok(installed);assert.ok(existsSync('public/'+installed.src.slice(2)));assert.ok(worker.includes(installed.src));}
 assert.equal(new Set(quotes.map(q=>q.text+'|'+q.credit)).size,quotes.length);
});

test('novos personagens estão instalados e disponíveis offline',()=>{
 const catalog=JSON.parse(readFileSync('public/content/personagens-aura.json','utf8')),worker=readFileSync('public/sw.js','utf8');assert.equal(catalog.images.length,6);
 for(const source of catalog.images){const art=artworks.find(a=>a.id===source.id);assert.ok(art,source.id);assert.equal(art.name,source.character);assert.ok(existsSync('public/'+art.src.slice(2)));assert.ok(worker.includes(art.src));}
});
