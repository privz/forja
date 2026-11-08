export const localDate=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export function weekStart(key){const d=new Date(key+'T12:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));return localDate(d);}
export function periodKey(challenge,date=localDate()){return challenge.period==='monthly'?'month:'+(challenge.month||date.slice(0,7)):weekStart(date);}
export function scheduled(challenge,date){if(challenge.createdOn&&date<challenge.createdOn)return false;if(challenge.period==='monthly'&&challenge.month&&date.slice(0,7)!==challenge.month)return false;return !challenge.weekdays?.length||challenge.weekdays.includes(new Date(date+'T12:00:00').getDay());}
export function progress(challenge,days,today=localDate()) {const start=challenge.period==='monthly'?(challenge.month||today.slice(0,7))+'-01':weekStart(today);const end=challenge.period==='monthly'?(challenge.month||today.slice(0,7))+'-31':today;return Object.entries(days).filter(([date,day])=>date>=start&&date<=end&&date<=today&&(!challenge.createdOn||date>=challenge.createdOn)&&day.done?.includes(challenge.id)).length;}
export function dayComplete(challenges,days,date,claims=[]){const d=days[date];if(!d)return false;const tasks=challengeTasks(challenges,days,date,claims),items=d.items||[];return tasks.length+items.length>0&&tasks.every(x=>x.done)&&items.every(x=>x.done);}

export function shiftDate(key,offset){const d=new Date(key+'T12:00:00');d.setDate(d.getDate()+offset);return localDate(d);}
export function redeemed(c,claims=[],date=localDate()){const key=periodKey(c,date);return c.redeemedPeriods?.includes(key)||claims.some(x=>x.id===c.id&&x.week===key);}
export function challengeStatus(c,days,claims=[],date=localDate()){
 if(redeemed(c,claims,date))return 'claimed';
 if(c.createdOn&&date<c.createdOn||c.period==='monthly'&&c.month&&date.slice(0,7)<c.month)return 'upcoming';
 if(progress(c,days,date)>=c.target)return 'completed';
 if(c.period==='monthly'&&c.month&&date.slice(0,7)>c.month)return 'ended';
 return 'active';
}
export function canRecordChallenge(c,days,claims=[],date=localDate(),today=localDate()){
 if(date>today||c.createdOn&&date<c.createdOn||redeemed(c,claims,date))return false;
 if(c.period==='monthly'&&c.month&&date.slice(0,7)!==c.month)return false;
 const end=c.period==='monthly'?localDate(new Date(Number(date.slice(0,4)),Number(date.slice(5,7)),0)):shiftDate(weekStart(date),6);
 return progress(c,days,end<today?end:today)<c.target;
}
// The target closes the remaining days of that period, including in calendar summaries.
export function challengeTasks(challenges,days,date,claims=[],useSnapshot=true){
 const record=days[date]||{done:[]};
 if(useSnapshot&&Array.isArray(record.challengePlan))return record.challengePlan.map(x=>({...x}));
 return challenges.filter(c=>{
  if(record.done.includes(c.id))return true;
  if(!scheduled(c,date))return false;
  const claim=claims.find(x=>x.id===c.id&&x.week===periodKey(c,date));
  if(claim&&claim.date<=date)return false;
  // On the first day of a new period, the preceding day's count belongs to the old one.
  const previous=shiftDate(date,-1);
  return periodKey(c,previous)!==periodKey(c,date)||progress(c,days,previous)<c.target;
 }).map(c=>({id:c.id,title:c.title,done:record.done.includes(c.id)}));
}
export function checkpointDay(state,date=localDate()){
 const d=state.days[date]??={done:[],items:[]};
 d.challengePlan=challengeTasks(state.challenges,state.days,date,state.claims,false);
 d.completed=dayComplete(state.challenges,state.days,date,state.claims);
}
export function weeklyOverview(state,key=localDate(),today=localDate()){
 const start=weekStart(key),end=shiftDate(start,6);
 const days=Array.from({length:7},(_,i)=>{
  const date=shiftDate(start,i),record=state.days[date],future=date>today;
  const tasks=future?[]:[...challengeTasks(state.challenges,state.days,date,state.claims,date!==today).map(x=>({...x,kind:'challenge'})),...(record?.items||[]).map(x=>({title:x.title,done:x.done,kind:'item'}))];
  return {date,future,tasks,done:tasks.filter(x=>x.done).length,total:tasks.length,complete:!future&&tasks.length>0&&tasks.every(x=>x.done),estimated:!future&&!Array.isArray(record?.challengePlan)&&tasks.some(x=>x.kind==='challenge')};
 });
 const elapsed=days.filter(d=>!d.future),done=elapsed.reduce((n,d)=>n+d.done,0),total=elapsed.reduce((n,d)=>n+d.total,0);
 return {start,end,days,done,total,pending:total-done,completeDays:elapsed.filter(d=>d.complete).length,plannedDays:elapsed.filter(d=>d.total>0).length,estimated:elapsed.some(d=>d.estimated)};
}
export function quoteFor(date=new Date(),twice=true){const quotes=['O próximo passo é seu.','Seu esforço de hoje constrói o amanhã.','Você pode recomeçar com uma pequena ação.','Continue no seu ritmo. O caminho é seu.','Faça hoje algo de que você vai se orgulhar.','Coragem também é tentar de novo.'];const day=Math.floor(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000);return quotes[(day*(twice?2:1)+(twice&&date.getHours()>=12?1:0))%quotes.length];}
export function initialState(){return {version:1,settings:{name:'',twice:true,character:'Rock Lee'},challenges:[{id:'training',title:'Treinar',target:4,reward:'Uma camiseta nova'},{id:'commitment',title:'Meu compromisso',target:7,reward:'Um jantar especial'}],days:{},claims:[]};}
export function validateState(s){if(!s||s.version!==1||!Array.isArray(s.challenges)||!s.days||typeof s.days!=='object'||Array.isArray(s.days)||!Array.isArray(s.claims)||!s.settings||typeof s.settings!=='object')throw Error('Backup incompatível.');if(s.challenges.length>30)throw Error('Muitos desafios.');for(const c of s.challenges){if(!c||typeof c.id!=='string'||typeof c.title!=='string'||typeof c.reward!=='string'||!Number.isInteger(c.target)||c.target<1||c.target>(c.period==='monthly'?31:7))throw Error('Desafio inválido.');if(c.redeemedPeriods!==undefined&&(!Array.isArray(c.redeemedPeriods)||c.redeemedPeriods.some(x=>typeof x!=='string'||!(/^(?:month:)?\d{4}-\d{2}(?:-\d{2})?$/.test(x)))))throw Error('Resgates inválidos.');if(c.period!==undefined&&!['weekly','monthly'].includes(c.period))throw Error('Período inválido.');if(c.month!==undefined&&!/^\d{4}-(0[1-9]|1[0-2])$/.test(c.month))throw Error('Mês inválido.');if(c.weekdays!==undefined&&(!Array.isArray(c.weekdays)||c.weekdays.some(d=>!Number.isInteger(d)||d<0||d>6)))throw Error('Dias inválidos.');}for(const [date,day] of Object.entries(s.days)){if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!day||!Array.isArray(day.done)||day.done.some(id=>typeof id!=='string')||(day.note!==undefined&&typeof day.note!=='string'))throw Error('Registro inválido.');if(day.challengePlan!==undefined&&(!Array.isArray(day.challengePlan)||day.challengePlan.some(x=>!x||typeof x.id!=='string'||typeof x.title!=='string'||typeof x.done!=='boolean')))throw Error('Histórico de tarefas inválido.');for(const key of ['planned','missed'])if(day[key]!==undefined&&(!Array.isArray(day[key])||day[key].some(id=>typeof id!=='string')))throw Error('Marcações inválidas.');if(day.items!==undefined&&(!Array.isArray(day.items)||day.items.some(x=>!x||typeof x.title!=='string'||typeof x.time!=='string'||typeof x.done!=='boolean')))throw Error('Tarefas inválidas.');}for(const c of s.claims)if(!c||typeof c.id!=='string'||typeof c.week!=='string'||typeof c.reward!=='string'||typeof c.date!=='string')throw Error('Conquista inválida.');return s;}
