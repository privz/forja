import {scheduled,dayComplete,localDate} from './core.js?v=069';
export function widgetSnapshot(state,now=new Date()){
 const today=localDate(now),first=new Date(now.getFullYear(),now.getMonth(),1),last=new Date(now.getFullYear(),now.getMonth()+1,0),monday=new Date(now);monday.setDate(now.getDate()-((now.getDay()+6)%7));const sunday=new Date(monday);sunday.setDate(monday.getDate()+6);
 const start=first<monday?first:monday,end=last>sunday?last:sunday,dates=[];for(const d=new Date(start);d<=end;d.setDate(d.getDate()+1))dates.push(localDate(d));
 const record=state.days[today]||{done:[],items:[]};const tasks=[...state.challenges.filter(c=>scheduled(c,today)).map(c=>({title:c.title.slice(0,80),done:record.done.includes(c.id)})),...(record.items||[]).map(i=>({title:i.title.slice(0,80),done:i.done}))];
 return {completed:dates.filter(k=>k<=today&&((k<today&&state.days[k]?.completed)||dayComplete(state.challenges,state.days,k))),active:dates.filter(k=>(state.days[k]?.items||[]).length||state.challenges.some(c=>scheduled(c,k))),today:{date:today,total:tasks.length,done:tasks.filter(t=>t.done).length,completed:dayComplete(state.challenges,state.days,today),items:tasks.slice(0,6)}};
}
