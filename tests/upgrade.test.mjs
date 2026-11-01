import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,validateState} from '../public/core.js';
test('atualização preserva backup anterior com diário e conquistas',()=>{
 const old=initialState();old.days['2026-11-01']={done:['training'],note:'Registro fictício',mood:'Bem'};old.claims.push({id:'training',week:'2026-10-26',reward:'Exemplo',date:'2026-11-01'});
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(old))),old);
});
test('backup novo mantém tarefas, notas e referências de imagem',()=>{
 const s=initialState();s.settings.heroImage='exemplo';s.challenges[0].image='recompensa';s.days['2026-11-01']={done:[],planned:[],missed:['training'],items:[{title:'Exemplo',time:'15:00',done:false}],shortNote:'Nota fictícia'};
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(s))),s);
});
test('backup rejeita tarefas malformadas',()=>{
 const s=initialState();s.days['2026-11-01']={done:[],items:[null]};assert.throws(()=>validateState(s));
});
