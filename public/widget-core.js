// Pure functions shared by the PWA and the generated Scriptable script.
export function widgetWeek(date){const d=new Date(date);d.setDate(d.getDate()-((d.getDay()+6)%7));return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function validateWidget(data){
 if(!data||![1,2].includes(data.version)||!Array.isArray(data.challenges)||data.challenges.length>6)throw Error('Dados incompatíveis. Atualize o script Forja.');
 if(data.appUrl&&data.appUrl!=='https://privz.github.io/forja/')throw Error('Endereço do app inválido.');
 if(typeof data.week!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(data.week)||typeof data.updatedAt!=='string'||!Number.isFinite(Date.parse(data.updatedAt)))throw Error('Data inválida.');
 for(const c of data.challenges){const limit=c.period==='monthly'?31:7;if(typeof c.title!=='string'||c.title.length>70||!Number.isInteger(c.count)||c.count<0||c.count>limit||!Number.isInteger(c.target)||c.target<1||c.target>limit)throw Error('Desafio inválido.');if(c.period==='monthly'&&!/^\d{4}-(0[1-9]|1[0-2])$/.test(c.month||''))throw Error('Mês inválido.');}
 if(data.inspiration){const i=data.inspiration;if(typeof i.text!=='string'||i.text.length>180||typeof i.credit!=='string'||i.credit.length>400||typeof i.art!=='string'||i.art.length>80||typeof i.fixed!=='boolean'||typeof i.twice!=='boolean')throw Error('Inspiração inválida.');}
 return data;
}
export function widgetChallenge(data,parameter='treino',now=new Date()){
 const list=data.challenges||[],month=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
 const c=parameter==='mensal'?list.find(c=>c.period==='monthly'):parameter.startsWith('desafio:')?list.find(c=>c.id===parameter.slice(8)):(list.find(c=>c.period!=='monthly')||list[0]);
 if(!c)return null;
 const current=c.period==='monthly'?c.month===month:data.week===widgetWeek(now);
 return {...c,current};
}
export function widgetInspiration(data,quotes,arts,now=new Date()){
 const i=data.inspiration||{},index=Math.floor(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/86400000),slot=index*(i.twice===false?1:2)+(i.twice!==false&&now.getHours()>=12?1:0);
 return {quote:i.fixed&&i.text?{text:i.text,credit:i.credit}:quotes[slot%quotes.length],art:i.fixed?(arts.find(a=>a.id===i.art)||arts[0]):arts[index%arts.length]};
}
