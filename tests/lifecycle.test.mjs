import test from 'node:test';
import assert from 'node:assert/strict';
import {challengeStatus,challengeTasks,checkpointDay,weeklyOverview,dayComplete,validateState,initialState,redeemed,canRecordChallenge} from '../public/core.js';
import {widgetSnapshot} from '../public/widget-snapshot.js';
const challenge={id:'train',title:'Treinar',target:2,reward:'Livro',createdOn:'2026-11-02'};
const history=()=>({'2026-11-02':{done:['train'],items:[]},'2026-11-03':{done:['train'],items:[]}});
test('meta encerra ao atingir o alvo e não gera tarefas nos dias restantes',()=>{
 const days=history();assert.equal(challengeStatus(challenge,days,[],'2026-11-03'),'completed');
 assert.equal(challengeTasks([challenge],days,'2026-11-04').length,0);
 assert.equal(challengeTasks([challenge],days,'2026-11-03')[0].done,true);
 assert.equal(dayComplete([challenge],{...days,'2026-11-04':{done:[],items:[]}},'2026-11-04'),false);
});
test('resgate sai dos atuais e a meta semanal retorna só na segunda seguinte',()=>{
 const claims=[{id:'train',week:'2026-11-02',date:'2026-11-03'}];
 assert.equal(challengeStatus(challenge,history(),claims,'2026-11-08'),'claimed');
 assert.equal(challengeStatus(challenge,history(),claims,'2026-11-09'),'active');
 assert.equal(challengeTasks([challenge],history(),'2026-11-09',claims).length,1);
});
test('excluir entrada de resgate não permite resgatar novamente no mesmo período',()=>{
 const c={...challenge,redeemedPeriods:['2026-11-02']};
 assert.equal(redeemed(c,[],'2026-11-08'),true);
 assert.equal(challengeStatus(c,history(),[],'2026-11-08'),'claimed');
 assert.equal(redeemed(c,[],'2026-11-09'),false);
});
test('mensal não reaparece no mês seguinte e mês futuro ainda não inicia',()=>{
 const c={...challenge,period:'monthly',month:'2026-11'};
 assert.equal(challengeStatus(c,{},[],'2026-10-31'),'upcoming');
 assert.equal(challengeStatus(c,{},[],'2026-12-01'),'ended');
 assert.equal(challengeTasks([c],{},'2026-12-01').length,0);
 assert.equal(challengeStatus(c,history(),[],'2026-12-01'),'completed');
});
test('resumo soma feitos e pendentes, inclui horários e exclui dias futuros',()=>{
 const state={challenges:[{...challenge,target:7}],claims:[],days:history()};
 state.days['2026-11-02'].items=[{title:'Terapia',time:'15:00',done:true}];
 state.days['2026-11-03'].items=[{title:'Ler',time:'',done:false}];
 state.days['2026-11-06']={done:['train'],items:[{title:'Futuro',done:true}]};
 const w=weeklyOverview(state,'2026-11-02','2026-11-04');
 assert.equal(w.done,3);assert.equal(w.pending,2);assert.equal(w.completeDays,1);assert.equal(w.plannedDays,3);
 assert.equal(w.days[4].tasks.length,0);assert.equal(w.estimated,true);
});
test('tarefas de desafio deixam de ser cobradas após atingir meta no resumo',()=>{
 const w=weeklyOverview({challenges:[challenge],days:history(),claims:[]},'2026-11-02','2026-11-08');
 assert.equal(w.done,2);assert.equal(w.pending,0);assert.equal(w.completeDays,2);assert.equal(w.plannedDays,2);
});
test('resgate no fim da semana não apaga tarefas pendentes anteriores',()=>{
 const days={'2026-11-08':{done:['train'],items:[]}},c={...challenge,target:1};
 const claims=[{id:'train',week:'2026-11-02',date:'2026-11-08'}];
 const w=weeklyOverview({challenges:[c],days,claims},'2026-11-02','2026-11-08');
 assert.equal(w.done,1);assert.equal(w.pending,6);assert.equal(w.plannedDays,7);
});
test('registro retroativo não ultrapassa o alvo já atingido no período',()=>{
 assert.equal(canRecordChallenge(challenge,history(),[],'2026-11-02','2026-11-08'),false);
 assert.equal(canRecordChallenge(challenge,history(),[],'2026-11-09','2026-11-09'),true);
 assert.equal(canRecordChallenge(challenge,{},[],'2026-11-10','2026-11-09'),false);
 assert.equal(canRecordChallenge(challenge,{},[],'2026-11-01','2026-11-09'),false);
});
test('histórico de planejamento mantém títulos e vitórias após edição ou exclusão',()=>{
 const state={challenges:[challenge],claims:[],days:history()};
 checkpointDay(state,'2026-11-02');state.challenges=[];state.days['2026-11-02'].done=[];
 const w=weeklyOverview(state,'2026-11-02','2026-11-03');
 assert.equal(w.days[0].tasks[0].title,'Treinar');assert.equal(w.days[0].tasks[0].done,true);
 assert.equal(w.days[0].complete,true);assert.equal(w.estimated,false);
});
test('dia sem tarefas nunca conta como dia completo',()=>{
 const w=weeklyOverview({challenges:[],claims:[],days:{}},'2026-11-02','2026-11-08');
 assert.equal(w.total,0);assert.equal(w.completeDays,0);assert.equal(w.pending,0);
});
test('backup mantém compatibilidade e valida novos campos de histórico',()=>{
 const s=initialState();checkpointDay(s,'2026-11-08');s.challenges[0].redeemedPeriods=['2026-11-02'];
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(s))),s);
 s.days['2026-11-08'].challengePlan=[{id:'training',title:'Treinar',done:'sim'}];assert.throws(()=>validateState(s));
});
test('widget usa a mesma regra: meta já terminada não vira pendência amanhã',()=>{
 const snapshot=widgetSnapshot({challenges:[challenge],days:history(),claims:[]},new Date('2026-11-04T12:00:00'));
 assert.equal(snapshot.today.total,0);assert.equal(snapshot.today.completed,false);
 assert.ok(snapshot.completed.includes('2026-11-03'));
});
