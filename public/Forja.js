// Instale com o nome Forja. Gerado por build-scriptable.mjs.
await (async()=>{
// FORJA 0.8.2 — Cole este arquivo inteiro no Scriptable e nomeie Forja.
// Progresso local. A rede baixa somente uma arte pública, sem enviar registros.
const ARTS=[{"id":"lee","name":"Rock Lee","src":"./assets/rock-lee.png"},{"id":"midoriya","name":"Midoriya","src":"./assets/midoriya.png"},{"id":"rock-lee-aura-05","name":"Rock Lee · Aura 1","src":"./assets/rock-lee-aura-05.png","alt":"Rock Lee concentra energia com os portões ativos e aura verde intensa sob chuva.","position":"46% 28.000000000000004%"},{"id":"rock-lee-aura-06","name":"Rock Lee · Aura 2","src":"./assets/rock-lee-aura-06.png","alt":"Rock Lee treina um soco com aura verde intensa e flocos caindo sobre o pátio molhado.","position":"53% 23%"},{"id":"might-guy-01","name":"Might Guy","src":"./assets/might-guy-01.png","alt":"Might Guy ativa os portões com aura verde sob chuva.","position":"50% 29%"},{"id":"naruto-01","name":"Naruto Uzumaki","src":"./assets/naruto-01.png","alt":"Naruto avança com chakra dourado e a silhueta da Kurama.","position":"62% 33%"},{"id":"minato-01","name":"Minato Namikaze","src":"./assets/minato-01.png","alt":"Minato concentra um Rasengan azul no pátio noturno.","position":"56% 22%"},{"id":"all-might-01","name":"All Might","src":"./assets/all-might-01.png","alt":"All Might desfere um soco com correntes de vento e luz.","position":"62% 23%"},{"id":"edward-elric-01","name":"Edward Elric","src":"./assets/edward-elric-01.png","alt":"Edward Elric inicia uma transmutação com energia azul.","position":"49% 20%"},{"id":"killua-01","name":"Killua Zoldyck","src":"./assets/killua-01.png","alt":"Killua avança envolto na eletricidade do Godspeed.","position":"61% 21%"}];
const QUOTES=[{"text":"O esforço com certeza será recompensado.","credit":"Rock Lee · Naruto · Episódio 49 · tradução própria"},{"text":"Você é um gênio do esforço.","credit":"Might Guy · Naruto · Episódio 49 · tradução própria"},{"text":"É uma boa meta, pela qual vale a pena se esforçar.","credit":"Might Guy · Naruto · Episódio 49 · tradução própria"},{"text":"Você também pode se tornar um herói.","credit":"All Might · My Hero Academia · T1 E3 — Roaring Muscles, recapitulação · tradução própria"},{"text":"Este presente, você o conquistou com seus próprios esforços corajosos.","credit":"All Might · My Hero Academia · T1 E3 — Roaring Muscles; entrega do poder · tradução própria"},{"text":"Exagerar terá o efeito contrário!","credit":"All Might · My Hero Academia · T1 E3 — Roaring Muscles; 12:43 na transcrição legendada · tradução própria"},{"text":"Vou fazer o que posso agora!","credit":"Izuku Midoriya · My Hero Academia · T1 E6 — Rage, You Damn Nerd; 00:06 na transcrição · tradução própria"},{"text":"Preciso aprender logo a controlar meu poder.","credit":"Izuku Midoriya · My Hero Academia · T1 E6; 07:56 na transcrição · tradução própria"},{"text":"Precisei de muita ajuda. Mas minha vida mudou completamente.","credit":"Izuku Midoriya · My Hero Academia · T1 E4 — Start Line; narração após aprovação · tradução própria"},{"text":"Estou com medo, mas vou dar o meu melhor!","credit":"Grey · Black Clover · Episódio 49 — Beyond Limits; 16:52 na transcrição · tradução própria"},{"text":"Ainda deve haver algo que possamos fazer!","credit":"Noelle Silva · Black Clover · Episódio 49; 16:42 na transcrição · tradução própria"},{"text":"Sério... vocês foram bem.","credit":"Yami Sukehiro · Black Clover · Episódio 49; 19:20 na transcrição · tradução própria"},{"text":"Do meu ponto de vista, não desistir é a arma mais forte que tenho!","credit":"Asta · Black Clover · Episódio 48 — Despair vs. Hope; abertura · tradução própria"},{"text":"Vamos superar ainda mais os nossos limites!","credit":"Asta, Finral e Vanessa · Black Clover · Episódio 48; resposta coletiva indicada como ALL · tradução própria"},{"text":"Não acabou. Ainda não terminei.","credit":"Asta · Black Clover · Episódio 2 — The Boys' Promise; abertura · tradução própria"},{"text":"Você tem um jeito de tornar possível o impossível.","credit":"Yuno · Black Clover · Episódio 2; fala para Asta · tradução própria"},{"text":"Eu vou ser o Rei Mago.","credit":"Asta · Black Clover · Episódio 1 — Asta and Yuno; durante o treino · tradução própria"},{"text":"E o primeiro passo é treinar meu corpo!","credit":"Asta · Black Clover · Episódio 1; durante o treino · tradução própria"},{"text":"Podemos sonhar o quanto quisermos!","credit":"Asta · Black Clover · Episódio 3 — To the Royal Capital of the Clover Kingdom!; conversa com Nash · tradução própria"},{"text":"Estou seguindo meus sonhos.","credit":"Asta · Black Clover · Episódio 3; conversa com Nash · tradução própria"},{"text":"Tenho um objetivo muito maior.","credit":"Asta · Black Clover · Episódio 5 — The Path to the Wizard King; após duelo com Sekke · tradução própria"},{"text":"Aproveite os desvios pelo caminho. Ao máximo.","credit":"Ging Freecss · Hunter × Hunter (2011) · Episódio 148 — Past × and × Future; conversa com Gon · tradução própria"},{"text":"Estou aproveitando a jornada.","credit":"Ging Freecss · Hunter × Hunter (2011) · Episódio 148; conversa com Gon · tradução própria"},{"text":"As coisas importantes vieram antes daquilo que eu queria.","credit":"Ging Freecss · Hunter × Hunter (2011) · Episódio 148; relato da exploração do túmulo · tradução própria"},{"text":"Ande de cabeça erguida, Simon.","credit":"Kamina · Gurren Lagann · Episódio 1 — Bust Through the Heavens with Your Drill! · tradução própria"},{"text":"Acredite no Kamina que acredita em você!","credit":"Kamina · Gurren Lagann · Episódio 1; incentivo para Simon pilotar · tradução própria"},{"text":"Você precisa continuar crescendo.","credit":"Kyojuro Rengoku · Demon Slayer: Mugen Train · Filme (2020); 01:45:35 conforme a página do trecho · tradução própria"},{"text":"Só vou saber se tentar.","credit":"Izuku Midoriya · My Hero Academia · T1 E2 — What It Takes to Be a Hero · tradução própria"},{"text":"Por isso, vou me esforçar ainda mais de agora em diante.","credit":"Izuku Midoriya · My Hero Academia · T3 E1 — Game Start; conversa com Iida · tradução própria"},{"text":"Vou ser um herói, mas do tipo que quero ser.","credit":"Shoto Todoroki · My Hero Academia · T3 E1 — Game Start; recapitulação · tradução própria"},{"text":"Um perdedor vencendo um gênio pela força de vontade.","credit":"Rock Lee · Naruto, ep. 48 · tradução própria"},{"text":"Estou me esforçando todos os dias para me tornar um herói.","credit":"Midoriya · My Hero Academia, ep. 13.5 · tradução própria"},{"text":"O próximo passo é seu.","credit":"FORJA"},{"text":"Um passo de cada vez.","credit":"FORJA"}];
// Pure functions shared by the PWA and the generated Scriptable script.
function widgetWeek(date){const d=new Date(date);d.setDate(d.getDate()-((d.getDay()+6)%7));return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function validateWidget(data){
 if(!data||![1,2].includes(data.version)||!Array.isArray(data.challenges)||data.challenges.length>6)throw Error('Dados incompatíveis. Atualize o script Forja.');
 if(data.appUrl&&data.appUrl!=='https://privz.github.io/forja/')throw Error('Endereço do app inválido.');
 if(typeof data.week!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(data.week)||typeof data.updatedAt!=='string'||!Number.isFinite(Date.parse(data.updatedAt)))throw Error('Data inválida.');
 for(const c of data.challenges){const limit=c.period==='monthly'?31:7;if(typeof c.title!=='string'||c.title.length>70||!Number.isInteger(c.count)||c.count<0||c.count>limit||!Number.isInteger(c.target)||c.target<1||c.target>limit)throw Error('Desafio inválido.');if(c.period==='monthly'&&!/^\d{4}-(0[1-9]|1[0-2])$/.test(c.month||''))throw Error('Mês inválido.');}
 if(data.inspiration){const i=data.inspiration;if(typeof i.text!=='string'||i.text.length>180||typeof i.credit!=='string'||i.credit.length>400||typeof i.art!=='string'||i.art.length>80||typeof i.fixed!=='boolean'||typeof i.twice!=='boolean')throw Error('Inspiração inválida.');}
 if(data.calendar){const c=data.calendar;if(!Array.isArray(c.completed)||c.completed.length>42||c.completed.some(d=>typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d)||widgetDate(new Date(d+'T12:00:00'))!==d))throw Error('Calendário inválido.');}
 return data;
}
function widgetChallenge(data,parameter='treino',now=new Date()){
 const list=data.challenges||[],month=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
 const c=parameter==='mensal'?list.find(c=>c.period==='monthly'):parameter.startsWith('desafio:')?list.find(c=>c.id===parameter.slice(8)):(list.find(c=>c.period!=='monthly')||list[0]);
 if(!c)return null;
 const current=c.period==='monthly'?c.month===month:data.week===widgetWeek(now);
 return {...c,current};
}
function widgetInspiration(data,quotes,arts,now=new Date()){
 const i=data.inspiration||{},index=Math.floor(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/86400000),slot=index*(i.twice===false?1:2)+(i.twice!==false&&now.getHours()>=12?1:0);
 return {quote:i.fixed&&i.text?{text:i.text,credit:i.credit}:quotes[slot%quotes.length],art:i.fixed?(arts.find(a=>a.id===i.art)||arts[0]):arts[index%arts.length]};
}
function widgetDate(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function widgetCalendar(data,now=new Date()){
 const year=now.getFullYear(),month=now.getMonth(),today=widgetDate(now),count=new Date(year,month+1,0).getDate(),offset=new Date(year,month,1).getDay();
 const completed=new Set(data.calendar?.completed||[]);
 const monthDays=Array.from({length:count},(_,i)=>{const date=widgetDate(new Date(year,month,i+1));return {date,day:i+1,today:date===today,completed:date<=today&&completed.has(date)};});
 const monday=new Date(now);monday.setDate(now.getDate()-((now.getDay()+6)%7));
 const weekDays=Array.from({length:7},(_,i)=>{const date=new Date(monday);date.setDate(monday.getDate()+i);const key=widgetDate(date);return {date:key,day:date.getDate(),today:key===today,completed:key<=today&&completed.has(key)};});
 return {today,year,month,offset,monthDays,weekDays,hasSnapshot:!!data.calendar,updatedAt:data.updatedAt};
}

const APP='https://privz.github.io/forja/';
const fm=FileManager.local(),path=fm.joinPath(fm.documentsDirectory(),'forja-widget-v1.json');
let data={version:2,challenges:[],updatedAt:null};
try{if(fm.fileExists(path))data=validateWidget(JSON.parse(fm.readString(path)));}catch(_){data={version:2,challenges:[],updatedAt:null};}
const incoming=args.queryParameters.payload;
if(incoming){try{const next=validateWidget(JSON.parse(incoming));fm.writeString(path,JSON.stringify(next));data=next;const a=new Alert();a.title='FORJA · Recebido';a.message='Progresso e inspiração salvos neste iPhone. O iOS determina quando atualizar os widgets.';a.addAction('OK');await a.presentAlert();}catch(e){const a=new Alert();a.title='Não foi possível receber';a.message=String(e.message);a.addAction('OK');await a.presentAlert();}}
let family=config.widgetFamily||'medium',previewCalendar=false;
if(!config.runsInWidget&&!incoming){const a=new Alert();a.title='Prévia do FORJA';a.message='Escolha o widget para conferir.';['Inicial pequeno','Inicial médio','Inicial grande','Bloqueio · frase','Bloqueio · circular','Bloqueio · acima do relógio','Calendário · inicial','Calendário · bloqueio'].forEach(x=>a.addAction(x));a.addCancelAction('Cancelar');const n=await a.presentSheet();if(n<0){Script.complete();return;}family=['small','medium','large','accessoryRectangular','accessoryCircular','accessoryInline','medium','accessoryRectangular'][n];previewCalendar=n>=6;}
const now=new Date(),parameter=String(previewCalendar?'calendario':(args.widgetParameter||'frase')).trim().toLowerCase();
const inspiration=widgetInspiration(data,QUOTES,ARTS,now),challenge=widgetChallenge(data,parameter,now),lock=family.startsWith('accessory');
const w=new ListWidget();w.url=APP;const next=new Date(now);next.setHours(now.getHours()<12&&data.inspiration?.twice!==false?12:24,0,0,0);w.refreshAfterDate=next;
const ink=lock?Color.dynamic(Color.black(),Color.white()):new Color('fff5df');
function line(parent,text,size=12,bold=false,limit=2){const t=parent.addText(text);t.font=bold?Font.boldSystemFont(size):Font.systemFont(size);t.textColor=ink;t.lineLimit=limit;t.minimumScaleFactor=.75;return t;}
const current=challenge?.current,score=challenge&&current?`${challenge.count}/${challenge.target}`:'—';
const period=challenge?.period==='monthly'?'no mês':'na semana';
function symbol(parent,name,size){const image=parent.addImage(SFSymbol.named(name).image);image.imageSize=new Size(size,size);image.tintColor=ink;return image;}
if(parameter==='calendario'){await renderCalendar();}
else if(lock){
 w.addAccessoryWidgetBackground=false;
 w.backgroundColor=new Color('000000',0);
 if(family==='accessoryCircular'){w.setPadding(2,2,2,2);const im=symbol(w,challenge?.period==='monthly'?'trophy.fill':'dumbbell.fill',18);im.centerAlignImage();line(w,score,16,true,1).centerAlignText();}
 else if(parameter==='frase'){if(family==='accessoryInline')line(w,inspiration.quote.text,12,true,1);else{line(w,inspiration.quote.text,13,true,3);line(w,inspiration.quote.credit.split(' · ')[0],9,false,1);}}
 else{line(w,challenge?.title||'Seu compromisso',12,true,1);line(w,current?`${score} ${period}`:'Envie pelo FORJA',12,false,family==='accessoryInline'?1:2);}
}else{
 w.backgroundColor=new Color('10251b');w.setPadding(14,14,14,14);
 // Public image cached locally; offline falls back to the green background.
 try{const cache=fm.joinPath(fm.cacheDirectory(),'forja-'+inspiration.art.id+'.png');let image;if(fm.fileExists(cache))image=fm.readImage(cache);else{const request=new Request(APP+inspiration.art.src.replace('./',''));request.timeoutInterval=12;image=await request.loadImage();fm.writeImage(cache,image);}const ctx=new DrawContext();ctx.size=new Size(720,480);ctx.respectScreenScale=false;ctx.opaque=true;const scale=Math.max(720/image.size.width,480/image.size.height),width=image.size.width*scale,height=image.size.height*scale;ctx.drawImageInRect(image,new Rect((720-width)/2,Math.min(0,100-height*.27),width,height));ctx.setFillColor(new Color('05120c',.67));ctx.fillRect(new Rect(0,0,720,480));w.backgroundImage=ctx.getImage();}catch(_){}
 line(w,'FORJA  /  SUA JORNADA',10,true,1);w.addSpacer(8);
 line(w,inspiration.quote.text,family==='small'?15:20,true,family==='large'?5:3);
 line(w,inspiration.quote.credit.split(' · ').slice(0,2).join(' · '),9,false,1);w.addSpacer();
 const goals=family==='large'?(data.challenges||[]).slice(0,3):challenge?[challenge]:[];
 for(const goal of goals){const c=widgetChallenge(data,'desafio:'+(goal.id||''),now)||challenge;if(!c)continue;line(w,c.title+' · '+(c.current?`${c.count}/${c.target}`:'Enviar progresso'),12,true,1);w.addSpacer(4);}
 if(!goals.length)line(w,'Envie seu progresso pelo FORJA',11,false,2);
 if(data.updatedAt){const d=new Date(data.updatedAt);line(w,'Último envio · '+d.toLocaleDateString('pt-BR')+' '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),8,false,1);}
}
Script.setWidget(w);
if(!config.runsInWidget&&!incoming){const methods={small:'presentSmall',medium:'presentMedium',large:'presentLarge',accessoryRectangular:'presentAccessoryRectangular',accessoryCircular:'presentAccessoryCircular',accessoryInline:'presentAccessoryInline'};await w[methods[family]||'presentMedium']();}
Script.complete();
async function renderCalendar(){
 const calendar=widgetCalendar(data,now),monthName=now.toLocaleDateString('pt-BR',{month:'long'});
 w.url=APP+'#jornada';const midnight=new Date(now);midnight.setHours(24,0,0,0);w.refreshAfterDate=midnight;
 if(lock){w.addAccessoryWidgetBackground=false;w.backgroundColor=new Color('000000',0);w.setPadding(0,0,0,0);
  if(family==='accessoryCircular'){line(w,String(now.getDate()),24,true,1).centerAlignText();line(w,monthName.slice(0,3).toUpperCase(),9,true,1).centerAlignText();return;}
  if(family==='accessoryInline'){line(w,now.toLocaleDateString('pt-BR',{weekday:'short',day:'numeric',month:'short'}),12,true,1);return;}
  const title=w.addStack();title.layoutHorizontally();line(title,monthName.toUpperCase(),10,true,1);title.addSpacer();line(title,'FORJA',8,true,1);w.addSpacer(3);
  calendarRow(w,['S','T','Q','Q','S','S','D'].map(label=>({label})),true,true);
  calendarRow(w,calendar.weekDays,false,true);w.addSpacer(2);
  const updated=data.updatedAt?new Date(data.updatedAt).toLocaleDateString('pt-BR',{day:'numeric',month:'numeric'}):'';
  line(w,calendar.hasSnapshot?'Checks · envio '+updated:'Envie os checks pelo FORJA',8,false,1);return;
 }
 w.backgroundColor=new Color('10251b');w.setPadding(10,10,10,10);
 if(family==='small'){line(w,monthName.toUpperCase()+' '+calendar.year,11,true,1);w.addSpacer(3);monthGrid(w,calendar,144);return;}
 const row=w.addStack();row.layoutHorizontally();row.centerAlignContent();const hero=row.addStack();hero.layoutVertically();hero.size=new Size(116,128);hero.cornerRadius=12;hero.setPadding(9,9,9,9);hero.backgroundColor=new Color('183526');
 try{const cache=fm.joinPath(fm.cacheDirectory(),'forja-'+inspiration.art.id+'.png');let image;if(fm.fileExists(cache))image=fm.readImage(cache);else{const request=new Request(APP+inspiration.art.src.replace('./',''));request.timeoutInterval=12;image=await request.loadImage();fm.writeImage(cache,image);}const ctx=new DrawContext();ctx.size=new Size(232,256);ctx.respectScreenScale=false;ctx.opaque=true;const scale=Math.max(232/image.size.width,256/image.size.height),width=image.size.width*scale,height=image.size.height*scale;ctx.drawImageInRect(image,new Rect((232-width)/2,Math.min(0,45-height*.25),width,height));ctx.setFillColor(new Color('05120c',.48));ctx.fillRect(new Rect(0,0,232,256));hero.backgroundImage=ctx.getImage();}catch(_){}
 line(hero,'FORJA /',9,true,1);hero.addSpacer();line(hero,inspiration.quote.text,12,true,4);hero.addSpacer(3);line(hero,inspiration.quote.credit.split(' · ')[0],8,false,1);hero.addSpacer(5);line(hero,challenge?.current?challenge.title+' · '+score:'No seu ritmo.',9,true,1);
 row.addSpacer();const grid=row.addStack();grid.layoutVertically();grid.size=new Size(145,0);line(grid,monthName.charAt(0).toUpperCase()+monthName.slice(1)+' '+calendar.year,11,true,1);grid.addSpacer(3);monthGrid(grid,calendar,145);
 if(family==='large'){w.addSpacer(14);line(w,'Um dia de cada vez.',14,true,1);line(w,calendar.hasSnapshot?'Checks do último envio do FORJA.':'Envie os dias concluídos pelo FORJA.',11,false,2);}
}
function monthGrid(parent,calendar,width){
 calendarRow(parent,['D','S','T','Q','Q','S','S'].map(label=>({label})),true,false,width);
 const cells=[...Array.from({length:calendar.offset},()=>({label:''})),...calendar.monthDays];while(cells.length%7)cells.push({label:''});
 for(let i=0;i<cells.length;i+=7)calendarRow(parent,cells.slice(i,i+7),false,false,width);
 parent.addSpacer(3);const stamp=data.updatedAt?new Date(data.updatedAt).toLocaleDateString('pt-BR',{day:'numeric',month:'numeric'}):'';line(parent,calendar.hasSnapshot?'✓ · envio '+stamp:'Envie os checks',8,false,1);
}
function calendarRow(parent,cells,heading=false,accessory=false,width=145){
 // Draw the entire row at a fixed size: native horizontal stacks can squeeze
 // two-digit labels between flexible spacers and truncate their second glyph.
 const height=heading?11:(accessory?20:15),column=width/7,fontSize=heading?7:(accessory?10:9);
 const ctx=new DrawContext();ctx.size=new Size(width,height);ctx.respectScreenScale=true;ctx.opaque=false;ctx.setTextAlignedCenter();
 cells.forEach((day,index)=>{const x=index*column,center=x+column/2;
  if(day.today){ctx.setFillColor(accessory?ink:new Color('f3cb75'));const diameter=accessory?16:13;ctx.fillEllipse(new Rect(center-diameter/2,0,diameter,diameter));}
  ctx.setFont(day.today?Font.boldSystemFont(fontSize):Font.systemFont(fontSize));
  const color=day.today?(accessory?Color.dynamic(Color.white(),Color.black()):new Color('10251b')):day.completed&&!accessory?new Color('83dfad'):ink;
  ctx.setTextColor(color);ctx.drawTextInRect(day.label??String(day.day),new Rect(x,0,column,heading?11:(accessory?15:12)));
  if(day.completed&&!heading){ctx.setStrokeColor(accessory?ink:new Color('83dfad'));ctx.setLineWidth(.8);const tick=new Path(),y=accessory?17:12;tick.move(new Point(center-2,y));tick.addLine(new Point(center-.5,y+1.5));tick.addLine(new Point(center+2.5,y-1.5));ctx.addPath(tick);ctx.strokePath();}
 });
 const image=parent.addImage(ctx.getImage());image.imageSize=new Size(width,height);image.leftAlignImage();
}

})();
