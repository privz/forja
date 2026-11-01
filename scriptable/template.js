// FORJA 0.8.2 — Cole este arquivo inteiro no Scriptable e nomeie Forja.
// Progresso local. A rede baixa somente uma arte pública, sem enviar registros.
/* BUNDLED_CONTENT */
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
