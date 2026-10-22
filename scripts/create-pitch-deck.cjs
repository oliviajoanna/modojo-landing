const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Modojo';
pptx.company = 'Modojo';
pptx.subject = 'Modojo promotional sales and investor pitch deck';
pptx.title = 'Modojo — Run your studio with less admin and more momentum';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Manrope', bodyFontFace: 'Aptos', lang: 'en-US'
};
pptx.defineSlideMaster({
  title: 'LIGHT',
  background: { color: 'F7F7F5' },
  objects: [
    { line: { x: 0.5, y: 7.08, w: 12.33, h: 0, line: { color: 'DCDDD9', width: 0.7 } } },
    { text: { text: 'MODOJO', options: { x: 0.52, y: 7.18, w: 0.8, h: 0.14, fontFace: 'Aptos', fontSize: 6.5, bold: true, color: '8B8E8B', charSpacing: 1.5, margin: 0 } } },
    { text: { text: 'CONFIDENTIAL · PRODUCT STORY', options: { x: 10.68, y: 7.18, w: 2.1, h: 0.14, fontFace: 'Aptos', fontSize: 6.5, color: '8B8E8B', align: 'right', charSpacing: 0.6, margin: 0 } } },
  ],
  slideNumber: { x: 12.85, y: 7.17, color: '8B8E8B', fontFace: 'Aptos', fontSize: 7 }
});
pptx.defineSlideMaster({
  title: 'DARK',
  background: { color: '211848' },
  objects: [
    { line: { x: 0.5, y: 7.08, w: 12.33, h: 0, line: { color: '554A83', width: 0.7, transparency: 55 } } },
    { text: { text: 'MODOJO', options: { x: 0.52, y: 7.18, w: 0.8, h: 0.14, fontFace: 'Aptos', fontSize: 6.5, bold: true, color: 'A8A3C4', charSpacing: 1.5, margin: 0 } } },
    { text: { text: 'THE OPERATING SYSTEM FOR YOUR STUDIO', options: { x: 9.5, y: 7.18, w: 2.65, h: 0.14, fontFace: 'Aptos', fontSize: 6.5, color: 'A8A3C4', align: 'right', charSpacing: 0.45, margin: 0 } } },
  ],
  slideNumber: { x: 12.85, y: 7.17, color: 'A8A3C4', fontFace: 'Aptos', fontSize: 7 }
});

const C = { bg:'F7F7F5', paper:'FFFFFF', ink:'202123', muted:'6C706E', line:'DCDDD9', purple:'5B4BDB', deep:'211848', darkPurple:'30246F', teal:'0F766E', mint:'E5F8F1', lavender:'ECEAFF', lime:'D9FA78', orange:'F6A368', sand:'FFF0E6', white:'FFFFFF', soft:'ECEEEC', gray:'A8ADAA', green:'198A6F', yellow:'F2C55F' };
const W=13.333, H=7.5;
const logo = path.join(__dirname, '..', 'public', 'modojo_logo_wide.png');
const logoWhite = path.join(__dirname, '..', 'public', 'modojo_logo_white.png');
const out = path.join(__dirname, '..', 'docs', 'pitch-deck', 'modojo-promotional-pitch-deck.pptx');

function tx(slide, text, x,y,w,h, opts={}) { slide.addText(text, { x,y,w,h, margin:0, fontFace:opts.fontFace||'Aptos', fontSize:opts.fontSize||16, color:opts.color||C.ink, bold:opts.bold||false, italic:opts.italic||false, breakLine: false, fit:'shrink', valign:opts.valign||'mid', align:opts.align||'left', charSpacing:opts.charSpacing||0, paraSpaceAfterPt:opts.paraSpaceAfterPt||0, bullet:opts.bullet, transparency:opts.transparency, isTextBox:true, ...opts }); }
function rect(slide,x,y,w,h,fill,round=false,line='none',trans=0) { slide.addShape(round ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {x,y,w,h,rectRadius:0.08,fill:{color:fill,transparency:trans},line:line==='none'?{color:fill,transparency:100}:{color:line,width:0.8},radius:0.08}); }
function line(slide,x,y,w,h,color=C.line,width=1,dash='solid') { slide.addShape(pptx.ShapeType.line,{x,y,w,h,line:{color,width,dashType:dash,beginArrowType:'none',endArrowType:'none'}}); }
function circle(slide,x,y,d,fill,lineColor=fill) { slide.addShape(pptx.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{color:lineColor,transparency:100}}); }
function logoOn(slide,dark=false) { slide.addImage({path:dark?logoWhite:logo,x:0.58,y:0.35,w:1.04,h:0.207}); }
function eyebrow(slide,text,x,y,dark=false) { line(slide,x,y+0.105,0.28,0,dark?'B0A8FF':C.purple,1.4); tx(slide,text,x+0.38,y,3.5,0.22,{fontSize:8.5,bold:true,color:dark?'B0A8FF':C.purple,charSpacing:1.4}); }
function title(slide,text,x,y,w,h,dark=false,size=31) { tx(slide,text,x,y,w,h,{fontFace:'Manrope',fontSize:size,bold:true,color:dark?C.white:C.ink,charSpacing:-1.2,breakLine:false,fit:'shrink',valign:'top'}); }
function footerNote(slide,text,dark=false) { tx(slide,text,0.58,6.72,7.5,0.18,{fontSize:7.5,color:dark?'B0A8FF':'8B8E8B',charSpacing:.4}); }
function notes(slide, text) { slide.addNotes(text); }
function pill(slide,text,x,y,w,fill,color=C.ink) { rect(slide,x,y,w,.28,fill,true); tx(slide,text,x,y,w,.28,{fontSize:8,bold:true,color,align:'center'}); }
function dotLabel(slide,icon,heading,body,x,y,w,accent=C.purple) { circle(slide,x,y,.3,accent); tx(slide,icon,x,y+.01,.3,.26,{fontSize:11,bold:true,color:C.white,align:'center'}); tx(slide,heading,x+.43,y-.02,w-.43,.17,{fontSize:12,bold:true}); tx(slide,body,x+.43,y+.18,w-.43,.42,{fontSize:9.5,color:C.muted,valign:'top',breakLine:false,fit:'shrink'}); }
function dashboard(slide,x,y,w,h,small=false) {
  const s=small?0.74:1; const side=0.95*s;
  rect(slide,x,y,w,h,C.paper,true,'DCDDE5');
  rect(slide,x,y,w,.28*s,'F0F0F2',true);
  circle(slide,x+.13*s,y+.1*s,.07*s,'F3AD9C'); circle(slide,x+.25*s,y+.1*s,.07*s,'F3D489'); circle(slide,x+.37*s,y+.1*s,.07*s,'B7DDBD');
  tx(slide,'modojo.app / dashboard',x+.55*s,y+.095*s,2*s,.1*s,{fontSize:5.5*s,color:'96999B',fontFace:'Aptos'});
  rect(slide,x,y+.28*s,side,h-.28*s,'FAFAFA',false,'E9EAE8');
  rect(slide,x+.14*s,y+.52*s,.13*s,.13*s,C.purple,true); tx(slide,'modojo',x+.33*s,y+.51*s,.43*s,.15*s,{fontSize:6.7*s,bold:true,color:C.purple});
  ['Overview','Schedule','Members','Payments','Reports'].forEach((v,i)=>{ if(i===0) rect(slide,x+.1*s,y+(1.02+i*.28)*s,.72*s,.2*s,'EBE9FF',true); tx(slide,v,x+.27*s,y+(1.05+i*.28)*s,.54*s,.12*s,{fontSize:5.5*s,bold:i===0,color:i===0?C.purple:'858B88'}); });
  const mx=x+side+.22*s, my=y+.53*s;
  tx(slide,'THURSDAY, 24 JULY 2025',mx,my,w-side-.43*s,.1*s,{fontSize:5.5*s,color:'A8ADAA',charSpacing:.4});
  tx(slide,'Good morning, Ardi ✦',mx,my+.16*s,2.5*s,.22*s,{fontFace:'Manrope',fontSize:10*s,bold:true});
  rect(slide,x+w-.83*s,my+.12*s,.62*s,.22*s,C.purple,true); tx(slide,'+ Add member',x+w-.78*s,my+.155*s,.52*s,.1*s,{fontSize:5*s,color:C.white,bold:true,align:'center'});
  const cardY=my+.52*s; const gap=.1*s; const cardW=(w-side-.42*s-gap*2)/3;
  [['Active members','248','↗ 12.4%'],['Monthly revenue','Rp 84.6m','↗ 8.2%'],['Class occupancy','78%','● 42 classes']].forEach((a,i)=>{ const cx=mx+i*(cardW+gap); rect(slide,cx,cardY,cardW,.68*s,C.paper,true,'E5E7E5'); tx(slide,a[0],cx+.1*s,cardY+.12*s,cardW-.2*s,.1*s,{fontSize:5.5*s,color:'8A908C'}); tx(slide,a[1],cx+.1*s,cardY+.28*s,cardW-.2*s,.2*s,{fontFace:'Manrope',fontSize:11*s,bold:true}); tx(slide,a[2],cx+.1*s,cardY+.53*s,cardW-.2*s,.1*s,{fontSize:5*s,color:i===2?C.yellow:C.green}); });
  const by=cardY+.84*s; const leftW=(w-side-.51*s)*.59; rect(slide,mx,by,leftW,1.45*s,C.paper,true,'E5E7E5'); tx(slide,'TODAY',mx+.12*s,by+.13*s,.5*s,.1*s,{fontSize:5*s,color:'A8ADAA',charSpacing:.4}); tx(slide,'Upcoming classes',mx+.12*s,by+.27*s,1.2*s,.15*s,{fontFace:'Manrope',fontSize:7.5*s,bold:true}); tx(slide,'View schedule →',mx+leftW-1.0*s,by+.28*s,.87*s,.1*s,{fontSize:4.7*s,color:C.purple,bold:true,align:'right'});
  [['07:00','Morning Flow Yoga','18 / 20',C.teal],['09:30','Reformer Pilates','8 / 8',C.purple],['18:00','Boxing Conditioning','14 / 20',C.orange]].forEach((a,i)=>{ const yy=by+(.55+i*.3)*s; line(slide,mx+.12*s,yy-.06*s,leftW-.24*s,0,'EFF0EE',.6); tx(slide,a[0],mx+.12*s,yy,.36*s,.11*s,{fontSize:5*s,bold:true}); rect(slide,mx+.56*s,yy+.01*s,.03*s,.2*s,a[3],true); tx(slide,a[1],mx+.7*s,yy,.95*s,.11*s,{fontSize:5*s,bold:true}); tx(slide,a[2],mx+leftW-0.52*s,yy,.4*s,.11*s,{fontSize:5*s,color:i===1?'B875D4':C.green,bold:true,align:'right'}); });
  const rx=mx+leftW+.12*s, rw=w-side-.43*s-leftW-.12*s; rect(slide,rx,by,rw,1.45*s,C.paper,true,'E5E7E5'); tx(slide,'THIS MONTH',rx+.12*s,by+.13*s,rw-.24*s,.1*s,{fontSize:5*s,color:'A8ADAA',charSpacing:.4}); tx(slide,'Member activity',rx+.12*s,by+.27*s,rw-.24*s,.15*s,{fontFace:'Manrope',fontSize:7.5*s,bold:true}); line(slide,rx+.13*s,by+1.05*s,rw-.26*s,-.18*s,C.purple,2); line(slide,rx+.13*s,by+1.08*s,rw*.35,0,C.purple,2); tx(slide,'1,284',rx+.12*s,by+1.16*s,.6*s,.16*s,{fontFace:'Manrope',fontSize:11*s,bold:true}); tx(slide,'check-ins this month',rx+.76*s,by+1.2*s,rw-.88*s,.1*s,{fontSize:5*s,color:'9AA09C'});
}
function addStandardSlide(titleText, section, opts={}) { const slide=pptx.addSlide(opts.master||'LIGHT'); logoOn(slide,opts.dark||false); eyebrow(slide,section,0.58,0.78,opts.dark||false); title(slide,titleText,0.58,1.15,12,0.7,opts.dark||false,opts.size||31); return slide; }

// 1 Cover
{ const s=pptx.addSlide('DARK'); s.background={color:C.deep};
  s.addShape(pptx.ShapeType.arc,{x:8.4,y:-1.45,w:5.6,h:5.6,line:{color:'6C5DE1',transparency:75,width:1.1},adjustPoint:.18});
  s.addShape(pptx.ShapeType.arc,{x:9.0,y:-.84,w:4.4,h:4.4,line:{color:'6C5DE1',transparency:70,width:1.1},adjustPoint:.18});
  s.addImage({path:logoWhite,x:.62,y:.45,w:1.3,h:.258});
  pill(s,'STUDIO OPERATIONS · INDONESIA-FIRST',.62,1.52,2.45,'4B3D91','D9FA78');
  title(s,'Run your studio with less admin\nand more momentum.',.62,2.05,7.2,1.55,true,35);
  tx(s,'The operating system for fitness, wellness, and class-based studios.',.65,3.88,5.1,.45,{fontSize:16,color:'C7C3DE',valign:'top'});
  rect(s,.65,5.18,1.65,.46,C.lime,true); tx(s,'Book a demo  ↗',.65,5.3,1.65,.18,{fontSize:10,bold:true,color:C.deep,align:'center'});
  tx(s,'PROMOTIONAL PITCH DECK',.65,6.55,2.4,.16,{fontSize:8,color:'A8A3C4',charSpacing:1.1});
  dashboard(s,7.0,1.55,5.72,4.5,.82); notes(s,'Opening: Modojo is the operating system for studios. This deck is designed for a studio-owner sales conversation or an investor-style introduction.');
}
// 2 reality
{ const s=addStandardSlide('The studio is growing.\nThe operating system is not.','01 · THE DAILY REALITY',{size:30});
  tx(s,'Every day, studio teams coordinate the same work across a patchwork of tools.',.6,2.08,5.5,.35,{fontSize:15,color:C.muted});
  const items=[['01','SPREADSHEETS','Member lists, packages, and balances'],['02','WHATSAPP','Bookings, reminders, and follow-ups'],['03','PAPER ATTENDANCE','Check-ins and no-show tracking'],['04','CALENDAR TOOLS','Schedules disconnected from capacity'],['05','BANK TRANSFERS','Payments checked and reconciled manually']];
  items.forEach((a,i)=>{ const y=2.82+i*.62; line(s,.62,y+.22,4.55,0,C.line,.7); tx(s,a[0],.64,y,.3,.18,{fontSize:8,color:C.purple,bold:true,fontFace:'DM Mono'}); tx(s,a[1],1.12,y,1.55,.18,{fontSize:10,bold:true,charSpacing:.3}); tx(s,a[2],2.82,y,2.3,.18,{fontSize:10,color:C.muted}); });
  rect(s,7.05,2.04,5.65,3.7,C.deep,true); tx(s,'THE RESULT',7.48,2.44,1.1,.16,{fontSize:8,color:'B0A8FF',bold:true,charSpacing:1.2}); title(s,'Admin work\nstarts to run\nthe business.',7.46,2.82,4.6,1.4,true,28); tx(s,'Instead of the other way around.',7.5,4.65,3.3,.22,{fontSize:12,color:'C9C4DF',italic:true}); circle(s,11.3,4.72,.66,C.lime); tx(s,'↗',11.3,4.82,.66,.3,{fontSize:20,bold:true,color:C.deep,align:'center'}); footerNote(s,'Illustrative operating reality · validate with customer discovery'); notes(s,'Frame the problem in familiar moments: spreadsheets, WhatsApp, paper attendance, calendars, and manual payment checks. Avoid claiming quantified losses without validated customer data.');
}
// 3 consequences
{ const s=addStandardSlide('Fragmented tools create\nfriction everywhere.','02 · THE COST OF FRAGMENTATION',{size:30});
  const cards=[['Admin overload','The same member or booking gets re-entered across multiple places.',C.lavender,'↻'],['Missed moments','Follow-ups, renewals, and waitlist openings depend on memory.',C.mint,'!'],['Limited visibility','Owners cannot see the full picture of occupancy, payments, and retention.',C.sand,'◌']];
  cards.forEach((a,i)=>{ const x=.62+i*4.13; rect(s,x,2.2,3.75,2.44,a[2],true); circle(s,x+.28,2.52,.42,i===0?C.purple:i===1?C.teal:C.orange); tx(s,a[3],x+.28,2.58,.42,.2,{fontSize:15,bold:true,color:C.white,align:'center'}); tx(s,a[0],x+.3,3.2,2.9,.27,{fontFace:'Manrope',fontSize:17,bold:true}); tx(s,a[1],x+.3,3.68,3.05,.55,{fontSize:11,color:C.muted,valign:'top'}); });
  tx(s,'The operating system should reduce coordination—not add another layer to it.',.62,5.35,9.5,.3,{fontFace:'Manrope',fontSize:19,bold:true,color:C.purple}); footerNote(s,'Problem framing · qualitative by design; no unsupported market statistics'); notes(s,'Use this slide to connect tool fragmentation to operational friction. The statements are qualitative and intentionally avoid invented percentages or financial losses.');
}
// 4 solution
{ const s=addStandardSlide('One place to run the\nwhole member journey.','03 · THE MODOJO ANSWER',{size:30});
  tx(s,'From the first hello to the next renewal, Modojo keeps the work connected.',.62,2.06,5.8,.3,{fontSize:15,color:C.muted});
  const steps=[['01','Lead','Capture interest'],['02','Trial','Book the first class'],['03','Member','Track the relationship'],['04','Booking','Fill the right class'],['05','Check-in','See who showed up'],['06','Renewal','Keep the rhythm going']];
  steps.forEach((a,i)=>{ const x=.68+i*2.02; circle(s,x,3.0,.62,i===5?C.lime:C.purple); tx(s,a[0],x,3.16,.62,.14,{fontSize:7,bold:true,color:i===5?C.deep:C.white,align:'center'}); if(i<steps.length-1) line(s,x+.65,3.31,1.3,0,C.purple,1.5); tx(s,a[1],x-.05,3.9,.72,.18,{fontSize:10,bold:true,align:'center'}); tx(s,a[2],x-.28,4.17,1.18,.3,{fontSize:8.5,color:C.muted,align:'center',valign:'top'}); });
  rect(s,.62,5.18,12.05,.74,C.deep,true); tx(s,'“One organized system for the work that keeps a studio moving.”',.98,5.42,8.5,.22,{fontFace:'Manrope',fontSize:16,bold:true,color:C.white}); pill(s,'MOD OJO',11.15,5.39,1.08,C.purple,C.white); footerNote(s,'Core product promise · bookings, memberships, payments, attendance, and communication'); notes(s,'Introduce Modojo as a connected operating flow, not just another feature list. The member journey is the organizing narrative.');
}
// 5 dashboard
{ const s=addStandardSlide('A clearer command center\nfor the owner.','04 · OWNER VISIBILITY',{size:30});
  tx(s,'See what needs attention today—without opening five different tabs.',.62,2.02,5.5,.25,{fontSize:15,color:C.muted});
  dashboard(s,.7,2.53,7.1,3.75,.76);
  const labels=[['ACTIVE MEMBERS','A living view of your community'],['TODAY’S CLASSES','Capacity, instructors, and rooms'],['PAYMENTS','Invoices, renewals, and reminders'],['ATTENDANCE','Check-ins, patterns, and no-shows']];
  labels.forEach((a,i)=>{ const y=2.68+i*.72; circle(s,8.45,y+.03,.22,i===0?C.purple:i===1?C.teal:i===2?C.orange:C.green); tx(s,String(i+1).padStart(2,'0'),8.45,y+.08,.22,.1,{fontSize:6,bold:true,color:C.white,align:'center'}); tx(s,a[0],8.84,y,2.4,.13,{fontSize:8,bold:true,charSpacing:.5}); tx(s,a[1],8.84,y+.2,3.1,.18,{fontSize:9,color:C.muted}); });
  footerNote(s,'Illustrative dashboard data · sample numbers are not Modojo traction'); notes(s,'Explain that the dashboard surfaces the questions owners ask most often: active members, classes, payments, attendance, and what needs attention. The dashboard values are illustrative demo data.');
}
// 6 bookings
{ const s=addStandardSlide('Fill every class\nwith confidence.','05 · BOOKINGS & CAPACITY',{size:30});
  rect(s,.62,2.14,5.1,3.65,C.mint,true); tx(s,'WEDNESDAY · 23 JULY',.92,2.48,2,.15,{fontSize:8,color:C.teal,bold:true,charSpacing:.8}); tx(s,'All classes',.92,2.84,1.5,.25,{fontFace:'Manrope',fontSize:17,bold:true}); tx(s,'‹  July 2025  ›',4.0,2.89,1.25,.14,{fontSize:8,color:C.muted,align:'right'}); const days=['M','T','W','T','F','S','S']; days.forEach((d,i)=>tx(s,d,.93+i*.53,3.45,.25,.12,{fontSize:8,color:C.gray,bold:true,align:'center'})); ['21','22','23','24','25','26','27'].forEach((d,i)=>{ if(i===2) circle(s,1.0+i*.53,3.79,.28,C.purple); tx(s,d,.98+i*.53,3.86,.31,.1,{fontSize:8,bold:true,color:i===2?C.white:C.ink,align:'center'}); }); rect(s,.9,4.43,4.55,.78,C.white,true); rect(s,1.05,4.58,.04,.42,C.purple,true); tx(s,'Reformer Pilates',1.3,4.54,1.7,.15,{fontSize:9,bold:true}); tx(s,'6:00 PM · 8 / 8 spots',1.3,4.77,1.7,.12,{fontSize:8,color:C.muted}); pill(s,'FULL',4.62,4.67,.58,C.lavender,C.purple);
  title(s,'A better booking experience\nfor both sides of the desk.',6.45,2.3,5.9,1.0,false,24); tx(s,'Members discover classes, book a spot, and join a waitlist. Your team sees capacity, cancellations, and what happens next.',6.48,3.65,5.2,.7,{fontSize:12,color:C.muted,valign:'top'}); dotLabel(s,'⌁','Schedules','Recurring and one-time classes',6.48,4.62,2.3,C.purple); dotLabel(s,'+','Waitlists','Capacity that stays visible',9.15,4.62,2.3,C.teal); footerNote(s,'Illustrative booking flow · product scope reference'); notes(s,'Show the booking experience as a direct response to capacity and waitlist coordination. Do not claim specific booking conversion improvements without validated data.');
}
// 7 attendance
{ const s=addStandardSlide('Turn attendance\ninto insight.','06 · CHECK-IN & RETENTION',{size:30});
  title(s,'A 30-second check-in\nshould lead to better decisions.',.62,2.18,5.1,1.0,false,24); tx(s,'Fast for instructors. Clear for owners. More useful for the member relationship.',.65,3.52,4.6,.5,{fontSize:13,color:C.muted,valign:'top'});
  const boxes=[['INSTRUCTOR','Today’s roster','Mark check-in or no-show'],['OWNER','Attendance patterns','See who is showing up'],['MEMBER','A smoother visit','Less friction at the door']]; boxes.forEach((a,i)=>{ const x=6.2+i*2.12; rect(s,x,2.38,1.85,2.15,i===0?C.purple:i===1?C.mint:C.lavender,true); tx(s,a[0],x+.17,2.67,1.5,.14,{fontSize:7,bold:true,charSpacing:.8,color:i===0?C.white:C.purple}); tx(s,a[1],x+.17,3.16,1.45,.42,{fontFace:'Manrope',fontSize:15,bold:true,color:i===0?C.white:C.ink,valign:'top'}); tx(s,a[2],x+.17,4.25,1.48,.25,{fontSize:8.5,color:i===0?'D7D1F0':C.muted,valign:'top'}); });
  rect(s,6.2,5.05,6.1,.55,C.deep,true); tx(s,'86',6.5,5.18,.48,.2,{fontFace:'Manrope',fontSize:19,bold:true,color:C.lime}); tx(s,'members checked in today',7.12,5.22,2.1,.13,{fontSize:9,color:C.white}); tx(s,'ILLUSTRATIVE DEMO DATA',10.28,5.23,1.65,.12,{fontSize:7,color:'B0A8FF',align:'right',charSpacing:.5}); footerNote(s,'Attendance and retention workflows · sample check-in figure is illustrative'); notes(s,'Position attendance as an operational signal, not surveillance. The product helps instructors act quickly and owners see patterns over time.');
}
// 8 cash
{ const s=addStandardSlide('Keep memberships\nand cash flow moving.','07 · MEMBERSHIPS & PAYMENTS',{size:30});
  tx(s,'The financial details are visible, timely, and connected to the member record.',.62,2.03,6.1,.25,{fontSize:15,color:C.muted});
  rect(s,.62,2.62,5.55,2.88,C.sand,true); tx(s,'PAYMENT ACTIVITY',.94,2.98,2,.13,{fontSize:8,color:'AF856C',bold:true,charSpacing:.8});
  [['✓','Package renewal','Yoga Flow · Today','+ Rp 1.2m',C.green],['!','Invoice reminder','Sent via WhatsApp · 2h ago','Pending',C.yellow],['↗','New membership','Reformer · Yesterday','+ Rp 2.4m',C.purple]].forEach((a,i)=>{ const y=3.42+i*.61; line(s,.94,y-.12,4.86,0,'EBDDD3',.65); circle(s,.95,y,.27,a[4]); tx(s,a[0],.95,y+.065,.27,.11,{fontSize:9,bold:true,color:C.white,align:'center'}); tx(s,a[1],1.4,y,1.75,.13,{fontSize:9,bold:true}); tx(s,a[2],1.4,y+.2,2.2,.12,{fontSize:8,color:C.muted}); tx(s,a[3],5.0,y+.07,.68,.13,{fontSize:8,bold:true,color:a[4],align:'right'}); });
  title(s,'From “who still needs a reminder?”\nto “what should we do next?”',6.72,2.65,5.7,1.0,false,22); tx(s,'Track packages, remaining sessions, expiry dates, invoices, payments, and renewal reminders—without chasing a spreadsheet.',6.75,4.05,5.1,.55,{fontSize:12,color:C.muted,valign:'top'}); pill(s,'READY FOR YOUR WORKFLOW',6.75,4.9,1.9,C.lavender,C.purple); footerNote(s,'Illustrative payment activity · verify live payment integrations before external claims'); notes(s,'Describe payment support carefully. Modojo supports invoice and payment tracking workflows; QRIS and payment-gateway capabilities should be described as readiness or planned integration unless verified as live.');
}
// 9 three experiences
{ const s=pptx.addSlide('DARK'); s.background={color:C.deep}; logoOn(s,true); eyebrow(s,'08 · ONE CONNECTED PLATFORM',.58,.78,true); title(s,'One platform.\nThree experiences.',.58,1.17,7.0,1.08,true,32); tx(s,'Everyone gets the clarity they need to do their best work—from the front desk to the studio floor.',.62,2.53,5.3,.38,{fontSize:13,color:'C2BDD9',valign:'top'});
  const cards=[['OWNER DASHBOARD','See the whole picture.','Performance, revenue, occupancy, and what needs attention.','⌂'],['INSTRUCTOR PORTAL','Stay in the moment.','Today’s schedule, roster access, and fast check-in actions.','✓'],['MEMBER PORTAL','Make it easy to come back.','Class discovery, booking, packages, invoices, and contact.','♧']]; cards.forEach((a,i)=>{ const x=.62+i*4.15; rect(s,x,3.43,3.8,2.25,i===1?'41358A':'2B2255',true,i===1?'9D91FF':'5A4E84'); circle(s,x+.27,3.72,.43,i===1?C.lime:'6557C9'); tx(s,a[3],x+.27,3.81,.43,.17,{fontSize:15,bold:true,color:i===1?C.deep:C.white,align:'center'}); tx(s,a[0],x+.3,4.36,2.8,.12,{fontSize:7.5,bold:true,color:i===1?'B9FF8E':'B0A8FF',charSpacing:.9}); tx(s,a[1],x+.3,4.63,3.1,.26,{fontFace:'Manrope',fontSize:16,bold:true,color:C.white}); tx(s,a[2],x+.3,5.12,3.1,.35,{fontSize:9.5,color:'C2BDD9',valign:'top'}); }); footerNote(s,'Three product surfaces · shared identity, role-appropriate complexity',true); notes(s,'This is the product architecture in one slide: owners need visibility, instructors need speed, and members need a lightweight booking experience.');
}
// 10 Indonesia
{ const s=addStandardSlide('Built around how\nstudios work here.','09 · INDONESIA-FIRST',{size:30});
  tx(s,'The best operating system fits the daily reality—not the other way around.',.62,2.08,6.2,.25,{fontSize:15,color:C.muted});
  const points=[['WhatsApp-first communication','Keep reminders and member conversations close to the workflow.',C.teal,'◌'],['Bank-transfer tracking','Make offline payment follow-up visible to the team.',C.purple,'◇'],['Mobile-friendly access','Help members and instructors act from wherever the day takes them.',C.orange,'⌁'],['Packages & drop-ins','Support the commercial models studios already use.',C.green,'✦']]; points.forEach((a,i)=>{ const x=.62+(i%2)*6.05; const y=2.72+Math.floor(i/2)*1.33; rect(s,x,y,5.45,1.04,C.paper,true,'E2E4E0'); circle(s,x+.25,y+.25,.39,a[2]); tx(s,a[3],x+.25,y+.34,.39,.14,{fontSize:13,bold:true,color:C.white,align:'center'}); tx(s,a[0],x+.84,y+.24,3.8,.16,{fontSize:11,bold:true}); tx(s,a[1],x+.84,y+.51,4.15,.28,{fontSize:9.5,color:C.muted,valign:'top'}); });
  pill(s,'QRIS / PAYMENT GATEWAY READINESS',.62,5.76,2.55,C.lavender,C.purple); tx(s,'Label capabilities accurately: live, in progress, or planned.',3.43,5.82,4.3,.15,{fontSize:9,color:C.muted}); footerNote(s,'Indonesia-first product direction · integration status must be verified before publication'); notes(s,'Use local context as a product advantage without overclaiming. Mention WhatsApp, bank-transfer tracking, mobile access, packages, and payment readiness with precise status labels.');
}
// 11 differentiation
{ const s=addStandardSlide('From scattered tasks\nto one operating rhythm.','10 · WHY MODOJO',{size:30});
  tx(s,'The differentiation is not another isolated tool. It is the connection between the work.',.62,2.05,7.1,.25,{fontSize:15,color:C.muted});
  const x1=.62,x2=6.75; pill(s,'TODAY',x1,2.72,1.0,'E4E6E3','747A76'); pill(s,'WITH MODOJO',x2,2.72,1.45,C.purple,C.white);
  const rows=[['Separate tools for each task','One connected operating flow'],['Manual booking coordination','Online bookings, capacity, and waitlists'],['Paper or scattered attendance','Fast check-in and attendance history'],['Manual renewal follow-up','Package, invoice, and reminder visibility'],['Limited owner visibility','Operational and business dashboards']]; rows.forEach((r,i)=>{ const y=3.22+i*.5; rect(s,x1,y,5.45,.36,i%2===0?'FFFFFF':'F0F1EE',true); rect(s,x2,y,5.95,.36,i%2===0?'EAE8FF':'F1F0FF',true); tx(s,'×',x1+.18,y+.1,.12,.12,{fontSize:10,bold:true,color:'A3A8A4'}); tx(s,r[0],x1+.47,y+.095,4.6,.13,{fontSize:9.2,color:C.muted}); tx(s,'✓',x2+.18,y+.1,.12,.12,{fontSize:10,bold:true,color:C.purple}); tx(s,r[1],x2+.47,y+.095,5.1,.13,{fontSize:9.2,bold:true,color:C.ink}); });
  footerNote(s,'Comparison against fragmented workflows · no named competitor claims'); notes(s,'Present a fair comparison against the status quo. Do not make unsupported claims about named competitors or market share.');
}
// 12 GTM
{ const s=addStandardSlide('Start with the studios\nthat feel the pain most.','11 · GO-TO-MARKET',{size:30});
  tx(s,'Modojo is designed for recurring-class businesses where coordination compounds as the studio grows.',.62,2.05,8.0,.25,{fontSize:15,color:C.muted});
  const rings=[['01','FITNESS & WELLNESS','Studios running recurring classes, packages, and member follow-up'],['02','GROWING OPERATIONS','Owners moving beyond spreadsheets and manual tracking'],['03','MULTI-BRANCH POTENTIAL','Teams that need shared visibility across locations']]; rings.forEach((a,i)=>{ const y=2.75+i*.82; circle(s,.7,y,.5,i===0?C.purple:i===1?C.teal:C.orange); tx(s,a[0],.7,y+.16,.5,.13,{fontSize:8,bold:true,color:C.white,align:'center'}); tx(s,a[1],1.45,y+.03,3.2,.2,{fontSize:8,bold:true,color:i===0?C.purple:i===1?C.teal:'B36D36',charSpacing:.7}); tx(s,a[2],1.45,y+.3,4.4,.24,{fontSize:10,color:C.muted,valign:'top'}); });
  rect(s,7.35,2.72,5.18,2.66,C.deep,true); tx(s,'GROWTH LOOP',7.78,3.05,2,.14,{fontSize:8,color:'B0A8FF',bold:true,charSpacing:1}); const loop=[['Reach','Studio communities\n& direct sales'],['Activate','Core daily\noperations'],['Expand','Branches, payments\n& retention']]; loop.forEach((a,i)=>{ const x=7.75+i*1.48; circle(s,x,3.72,.65,i===1?C.lime:C.purple); tx(s,String(i+1),x,3.94,.65,.15,{fontSize:10,bold:true,color:i===1?C.deep:C.white,align:'center'}); tx(s,a[0],x-.1,4.58,.85,.15,{fontSize:9,bold:true,color:C.white,align:'center'}); tx(s,a[1],x-.35,4.84,1.35,.3,{fontSize:7.5,color:'C2BDD9',align:'center',valign:'top'}); if(i<2) line(s,x+.72,4.05,.65,0,'8C82D3',1.4); }); footerNote(s,'Go-to-market hypotheses · insert validated channel and conversion data when available'); notes(s,'This slide is intentionally framed as a go-to-market hypothesis. Replace with validated channels, pricing, CAC, LTV, or conversion data when those are known.');
}
// 13 roadmap/proof
{ const s=addStandardSlide('Build the operating system\none daily workflow at a time.','12 · ROADMAP & PROOF',{size:30});
  tx(s,'When validated traction is available, replace this slide with sourced proof points. Until then, show the path.',.62,2.04,8.5,.25,{fontSize:15,color:C.muted});
  const roadmap=[['NOW','Core studio operations','Members · classes · bookings · attendance · packages'],['NEXT','Deeper engagement','Reminders · payments · promotions · member communication'],['LATER','Multi-branch intelligence','Retention signals · cross-location visibility · automation']]; roadmap.forEach((a,i)=>{ const x=.62+i*4.1; rect(s,x,2.82,3.72,2.22,i===0?C.deep:i===1?C.lavender:C.mint,true); tx(s,a[0],x+.27,3.1,1,.14,{fontSize:8,bold:true,color:i===0?C.lime:i===1?C.purple:C.teal,charSpacing:1}); tx(s,a[1],x+.27,3.55,2.95,.3,{fontFace:'Manrope',fontSize:17,bold:true,color:i===0?C.white:C.ink}); tx(s,a[2],x+.27,4.27,3.05,.4,{fontSize:9.5,color:i===0?'C2BDD9':C.muted,valign:'top'}); if(i<2) tx(s,'→',x+3.77,3.78,.3,.2,{fontSize:18,bold:true,color:C.purple,align:'center'}); });
  pill(s,'PROOF POINTS TO INSERT',.62,5.63,1.8,C.sand,'A26A3F'); tx(s,'[validated customers] · [retention] · [revenue] · [pilot outcomes]',2.65,5.69,5.8,.14,{fontSize:9,color:C.muted}); footerNote(s,'Roadmap framing · no fabricated traction or customer logos'); notes(s,'Use this as a responsible placeholder until Modojo has validated proof points. If you have sourced data, replace the placeholders and add dates/sources.');
}
// 14 close
{ const s=pptx.addSlide('DARK'); s.background={color:C.deep}; s.addShape(pptx.ShapeType.arc,{x:-2.2,y:3.7,w:6.5,h:6.5,line:{color:'6659C7',transparency:70,width:1.1},adjustPoint:.16}); s.addShape(pptx.ShapeType.arc,{x:8.7,y:-2.2,w:6.8,h:6.8,line:{color:'6659C7',transparency:70,width:1.1},adjustPoint:.16}); s.addImage({path:logoWhite,x:.62,y:.45,w:1.3,h:.258}); eyebrow(s,'13 · THE ASK',.62,1.55,true); title(s,'Your studio deserves\na better rhythm.',.62,2.08,7.0,1.0,true,35); tx(s,'Book a Modojo demo and see how a calmer operating rhythm could look for your studio.',.65,3.6,5.4,.45,{fontSize:15,color:'C7C3DE',valign:'top'}); rect(s,.65,4.55,1.76,.5,C.lime,true); tx(s,'Book a demo  ↗',.65,4.7,1.76,.18,{fontSize:10,bold:true,color:C.deep,align:'center'}); rect(s,8.0,2.06,3.95,2.58,'30266D',true); tx(s,'MODOJO',8.4,2.46,2,.18,{fontSize:10,bold:true,color:'B0A8FF',charSpacing:1.6}); title(s,'Less admin.\nMore momentum.',8.38,2.98,3.05,.83,true,24); tx(s,'[insert contact]\n[insert QR code or demo URL]',8.42,4.47,2.6,.45,{fontSize:9,color:'C7C3DE',valign:'top'}); tx(s,'SALES DECK · INVESTOR INTRODUCTION',.65,6.48,3.5,.15,{fontSize:8,color:'A8A3C4',charSpacing:1.1}); notes(s,'Sales close: invite the studio owner to book a demo. Investor variant: replace the CTA with the validated investment or partnership ask. Do not invent the ask in the deck.');
}

pptx.writeFile({ fileName: out });
console.log(out);
