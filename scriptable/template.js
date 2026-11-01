// FORJA 0.7.0 — Cole este arquivo inteiro no Scriptable e nomeie Forja.
// Progresso local. A rede baixa somente uma arte pública, sem enviar registros.
/* BUNDLED_CONTENT */
const APP='https://privz.github.io/forja/';
const fm=FileManager.local(),path=fm.joinPath(fm.documentsDirectory(),'forja-widget-v1.json');
let data={version:2,challenges:[],updatedAt:null};
try{if(fm.fileExists(path))data=validateWidget(JSON.parse(fm.readString(path)));}catch(_){data={version:2,challenges:[],updatedAt:null};}
const incoming=args.queryParameters.payload;
if(incoming){try{const next=validateWidget(JSON.parse(incoming));fm.writeString(path,JSON.stringify(next));data=next;const a=new Alert();a.title='FORJA · Recebido';a.message='Progresso e inspiração salvos neste iPhone. O iOS determina quando atualizar os widgets.';a.addAction('OK');await a.presentAlert();}catch(e){const a=new Alert();a.title='Não foi possível receber';a.message=String(e.message);a.addAction('OK');await a.presentAlert();}}
let family=config.widgetFamily||'medium';
if(!config.runsInWidget&&!incoming){const a=new Alert();a.title='Prévia do FORJA';a.message='Escolha o widget para conferir.';['Inicial pequeno','Inicial médio','Inicial grande','Bloqueio · frase','Bloqueio · circular','Bloqueio · acima do relógio'].forEach(x=>a.addAction(x));a.addCancelAction('Cancelar');const n=await a.presentSheet();if(n<0){Script.complete();return;}family=['small','medium','large','accessoryRectangular','accessoryCircular','accessoryInline'][n];}
const now=new Date(),parameter=String(args.widgetParameter||'frase').trim().toLowerCase();
const inspiration=widgetInspiration(data,QUOTES,ARTS,now),challenge=widgetChallenge(data,parameter,now),lock=family.startsWith('accessory');
const w=new ListWidget();w.url=APP;const next=new Date(now);next.setHours(now.getHours()<12&&data.inspiration?.twice!==false?12:24,0,0,0);w.refreshAfterDate=next;
const ink=lock?Color.dynamic(Color.black(),Color.white()):new Color('fff5df');
function line(parent,text,size=12,bold=false,limit=2){const t=parent.addText(text);t.font=bold?Font.boldSystemFont(size):Font.systemFont(size);t.textColor=ink;t.lineLimit=limit;t.minimumScaleFactor=.75;return t;}
const current=challenge?.current,score=challenge&&current?`${challenge.count}/${challenge.target}`:'—';
const period=challenge?.period==='monthly'?'no mês':'na semana';
function symbol(parent,name,size){const image=parent.addImage(SFSymbol.named(name).image);image.imageSize=new Size(size,size);image.tintColor=ink;return image;}
if(lock){
 w.addAccessoryWidgetBackground=true;
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
