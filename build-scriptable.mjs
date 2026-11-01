import fs from 'node:fs';
import {artworks,quotes} from './public/ui.js';
const core=fs.readFileSync('public/widget-core.js','utf8').replaceAll('export function','function');
const content=`const ARTS=${JSON.stringify(artworks)};\nconst QUOTES=${JSON.stringify(quotes.map(({text,credit})=>({text,credit})))};\n`+core;
const script=fs.readFileSync('scriptable/template.js','utf8').replace('/* BUNDLED_CONTENT */',content);
// Top-level return in template lives inside an async function supported by Scriptable.
const output='// Instale com o nome Forja. Gerado por build-scriptable.mjs.\nawait (async()=>{\n'+script+'\n})();\n';
fs.writeFileSync('scriptable/Forja.js',output);fs.writeFileSync('public/Forja.js',output);
