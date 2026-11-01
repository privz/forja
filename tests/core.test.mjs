import test from 'node:test';
import assert from 'node:assert/strict';
import {weekStart,progress,quoteFor,initialState,validateState} from '../public/core.js';
test('semana começa na segunda mesmo na virada do mês',()=>{assert.equal(weekStart('2026-11-01'),'2026-10-26');assert.equal(weekStart('2026-11-02'),'2026-11-02');});
test('progresso não inclui semana passada nem datas futuras',()=>{const c={id:'a'};const days={'2026-11-01':{done:['a']},'2026-11-02':{done:['a']},'2026-11-03':{done:['a']},'2026-11-05':{done:['a']}};assert.equal(progress(c,days,'2026-11-03'),2);});
test('frase é estável e muda à tarde quando habilitado',()=>{const a=new Date(2026,10,1,9),b=new Date(2026,10,1,18);assert.equal(quoteFor(a),quoteFor(a));assert.notEqual(quoteFor(a,true),quoteFor(b,true));assert.equal(quoteFor(a,false),quoteFor(b,false));});
test('backup aceita estado inicial e rejeita metas inválidas',()=>{assert.deepEqual(validateState(initialState()),initialState());const s=initialState();s.challenges[0].target=0;assert.throws(()=>validateState(s));assert.throws(()=>validateState({version:5}));});
