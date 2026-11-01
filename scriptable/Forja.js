// Instale no Scriptable com o nome exato: Forja
// Não exige assinatura. Nenhum dado é enviado a um servidor.
const fm = FileManager.local();
const path = fm.joinPath(fm.documentsDirectory(), 'forja-widget-v1.json');
let data = {version:1,challenges:[],updatedAt:null};
try { if(fm.fileExists(path)) data=JSON.parse(fm.readString(path)); } catch (_) {}
const incoming=args.queryParameters.payload;
if(incoming){
  try {
    const next=JSON.parse(incoming);
    if(next.version!==1||!Array.isArray(next.challenges)||next.challenges.length>6)throw Error('Dados incompatíveis.');
    for(const c of next.challenges){if(typeof c.title!=='string'||!Number.isInteger(c.count)||c.count<0||c.count>7||!Number.isInteger(c.target)||c.target<1||c.target>7)throw Error('Desafio inválido.');}
    if(next.appUrl&&!/^https?:\/\//.test(next.appUrl))throw Error('Endereço inválido.');
    data=next;fm.writeString(path,JSON.stringify(data));
    const alert=new Alert();alert.title='FORJA';alert.message='Progresso recebido. O iPhone atualizará os widgets quando permitido.';alert.addAction('OK');await alert.presentAlert();
  } catch(error) {const alert=new Alert();alert.title='Não foi possível importar';alert.message=String(error.message);alert.addAction('OK');await alert.presentAlert();}
}
const now=new Date();
const quotes=['O próximo passo é seu.','Seu esforço de hoje constrói o amanhã.','Você pode recomeçar com uma pequena ação.','Continue no seu ritmo. O caminho é seu.','Faça hoje algo de que você vai se orgulhar.','Coragem também é tentar de novo.'];
const index=(Math.floor(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())/86400000)*2+(now.getHours()>=12?1:0))%quotes.length;
const widget=new ListWidget();
const family=config.widgetFamily||'medium';
const lock=family.startsWith('accessory');
const textColor=lock?Color.dynamic(Color.black(),Color.white()):new Color('eef6ed');
function line(text,size=13,bold=false){const t=widget.addText(text);t.font=bold?Font.boldSystemFont(size):Font.systemFont(size);t.textColor=textColor;return t;}
if(data.appUrl)widget.url=data.appUrl;
const next=new Date(now);next.setHours(now.getHours()<12?12:24,0,0,0);widget.refreshAfterDate=next;
// Não reutiliza números da semana passada como se fossem atuais.
function start(date){const d=new Date(date);d.setDate(d.getDate()-((d.getDay()+6)%7));return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
const current=data.week===start(now);
const challenge=data.challenges[0];
const parameter=String(args.widgetParameter||'frase').toLowerCase();
if(lock){
  if(family==='accessoryCircular'){
    const image=widget.addImage(SFSymbol.named('dumbbell.fill').image);image.imageSize=new Size(21,18);image.tintColor=textColor;image.centerAlignImage();
    const t=line(challenge&&current?`${challenge.count}/${challenge.target}`:'—',15,true);t.centerAlignText();
  }else if(parameter==='treino'){
    line(challenge?challenge.title:'Seus desafios',12,true);
    line(challenge&&current?`${challenge.count}/${challenge.target} nesta semana`:'Envie o progresso pelo app',12);
  }else{line(quotes[index],family==='accessoryInline'?12:14,true);}
}else{
  widget.backgroundGradient=(()=>{const g=new LinearGradient();g.colors=[new Color('163e2b'),new Color('0b1913')];g.locations=[0,1];return g;})();
  widget.setPadding(16,16,16,16);line('FORJA /',12,true);widget.addSpacer(8);line(quotes[index],family==='small'?15:19,true);widget.addSpacer();
  line(challenge&&current?`${challenge.title}: ${challenge.count}/${challenge.target}`:'Abra o app e envie seu progresso',12);
  if(data.updatedAt){const d=new Date(data.updatedAt);line('Enviado em '+d.toLocaleDateString('pt-BR')+' '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),9);}
}
Script.setWidget(widget);
if(!config.runsInWidget&&!incoming)await widget.presentMedium();
Script.complete();
