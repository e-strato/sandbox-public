/* Лаба «Таблицы на телефоне». 4 таблицы из базы (window.DB + GS_DATA), подача — window.TM_MODE:
   'tabs' (v5) — первая колонка всегда, остальные — группами на вкладках;
   'expand' (v7) — в строке 2–3 главные цифры, нажал — открылось остальное.
   В обеих: сортировка по заголовку, «Показать ещё» по 10. */
(function(){
const D=window.DB,MODE=window.TM_MODE||'tabs';
const tn=id=>D.team(id)?.name||id,logo=id=>D.logo(id)||'',himg=k=>D.url(D.data.heroes[k]?.img)||'';
const fmt=n=>n.toLocaleString('ru-RU'),k1=n=>(n/1000).toFixed(1).replace('.',',')+'k',pc=(a,b)=>b?Math.round(a/b*100)+'%':'—';
const dm=s=>s?s.slice(8,10)+'.'+s.slice(5,7):'';
const wr=(w,n)=>{if(!n)return '<span class="mu">—</span>';const d=w/n-.5;return `<span class="${d>0?'up':d<0?'down':''}">${pc(w,n)}</span>`};
const CHEV='<svg class="chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>';
const lead=(img,cls,b,sm,pre='')=>`<div class="tm-lead">${pre}${img?`<img class="${cls}" src="${img}" alt="">`:''}<div><b>${b}</b>${sm?`<small>${sm}</small>`:''}</div></div>`;
const c=(t,v,s,o={})=>({t,v,s,...o});   // колонка: заголовок, ячейка, значение для сортировки

/* ── 1. Игроки на картах — сняты дирижёром 16.11 (такой таблицы у нас нет), данные оставлены для сравнения в исследовании; (GS_DATA, 11 карт TI 2026) ── */
const P=[];
for(const s of window.GS_DATA.series) s.maps.forEach((m,i)=>{for(const p of m.players){
  const t=p.isRadiant?m.radiant_team_id:m.dire_team_id,o=p.isRadiant?m.dire_team_id:m.radiant_team_id,pl=D.player(p.account_id)||{},h=D.hero(p.hero_id)||{};
  P.push({nick:pl.nick||'—',team:D.team(t)?.name,vs:D.team(o)?.name,map:i+1,win:p.isRadiant===m.radiant_win,hero:h.name,img:D.url(h.img),pos:pl.role||p.lane_role,
    k:p.kills,d:p.deaths,a:p.assists,kda:(p.kills+p.assists)/Math.max(1,p.deaths),lh:p.last_hits,dn:p.denies,gpm:p.gold_per_min,xpm:p.xp_per_min,nw:p.net_worth,dmg:p.hero_damage,td:p.tower_damage,heal:p.hero_healing,lvl:p.level})}});
const kd=r=>r.kda.toFixed(1).replace('.',',');
const T_PLAYERS={title:'Игроки на картах',sub:'The International 2026 · 21.08 · 11 карт',rows:P,sort:['gpm',-1],
  lead:c('Игрок',r=>lead(r.img,'tm-hero',r.nick,r.hero+' · '+r.team),r=>r.nick.toLowerCase()),
  cols:{k:c('У',r=>r.k,r=>r.k,{num:1}),d:c('С',r=>r.d,r=>r.d,{num:1}),a:c('П',r=>r.a,r=>r.a,{num:1}),kda:c('KDA',kd,r=>r.kda,{num:1}),
    kda3:c('У / С / П',r=>`${r.k} / ${r.d} / ${r.a}`,r=>r.kda,{num:1}),
    gpm:c('GPM',r=>r.gpm,r=>r.gpm,{num:1}),xpm:c('XPM',r=>r.xpm,r=>r.xpm,{num:1}),lh:c('Доб. / Нев.',r=>`${r.lh} <span class="mu">/ ${r.dn}</span>`,r=>r.lh,{num:1}),
    nw:c('Нетворс',r=>k1(r.nw),r=>r.nw,{num:1}),dmg:c('Урон героям',r=>k1(r.dmg),r=>r.dmg,{num:1}),td:c('Урон башням',r=>k1(r.td),r=>r.td,{num:1}),
    heal:c('Лечение',r=>r.heal?k1(r.heal):'<span class="mu">—</span>',r=>r.heal,{num:1}),lvl:c('Уровень',r=>r.lvl,r=>r.lvl,{num:1}),
    vs:c('Против',r=>r.vs+' <span class="mu">· '+r.map+'</span>',r=>r.vs),win:c('Итог',r=>`<span class="${r.win?'up':'mu'}">${r.win?'Победа':'Поражение'}</span>`,r=>+r.win),pos:c('Поз.',r=>r.pos,r=>r.pos,{num:1})},
  tabs:[['Бой',['k','d','a','kda']],['Фарм',['gpm','xpm','lh','nw']],['Урон',['dmg','td','heal']],['Карта',['vs','win']]],
  desk:['vs','win','kda3','kda','lh','gpm','xpm','nw','dmg','td'],
  main:['kda3','gpm'],det:['nw','dmg','lh','xpm','td','lvl','vs','win','pos']};

/* ── 2. Групповой этап TI 2026 (швейцарка) ── */
const TI=D.data.tours['ti-2026'],done=D.matches({tour:'ti-2026',state:'done'});
const sw=done.filter(m=>m.stage==='Групповой этап · швейцарка'),er=done.filter(m=>m.stage==='Раунд на вылет');
const G=TI.standings.slice().sort((a,b)=>a.place-b.place).map(x=>{
  const ms=sw.filter(m=>m.a===x.team||m.b===x.team).sort((a,b)=>a.start<b.start?-1:1).map(m=>{const me=m.a===x.team?0:1;return {vs:me?m.a:m.b,s:[m.score[me],m.score[1-me]]}});
  const e=er.find(m=>m.a===x.team||m.b===x.team);let fin;
  if(x.place<=3) fin={up:1,t:'Плей-офф'};
  else if(!e) fin={up:0,t:'Выбыли'};
  else {const me=e.a===x.team?0:1,w=e.score[me]>e.score[1-me];fin={up:w,t:w?'Плей-офф':'Выбыли',sc:`${e.score[me]}:${e.score[1-me]} · ${tn(me?e.a:e.b)}`}}
  const [w,l]=x.wl.split('-').map(Number),[mw,ml]=x.maps.split('-').map(Number);
  return {place:x.place,id:x.team,team:tn(x.team),w,l,mw,ml,ms,fin,q:x.qualification||'',path:x.path||''}});
const mchip=m=>`<span title="${tn(m.vs)}"><img src="${logo(m.vs)}" alt=""><b class="${m.s[0]>m.s[1]?'up':'down'}">${m.s[0]}:${m.s[1]}</b></span>`;
const T_GROUP={title:'Групповой этап',sub:'TI 2026 · 13–16.08 · швейцарка, Bo3 · 1–3 места — сразу в плей-офф',rows:G,sort:['place',1],
  lead:c('Команда',r=>lead(logo(r.id),'tm-logo',r.team,null,`<span class="tm-place ${r.place<=3?'in':''}">${r.place}</span>`),r=>r.place),
  cols:{wl:c('Серии',r=>`${r.w}–${r.l}`,r=>r.w-r.l,{num:1}),maps:c('Карты',r=>`${r.mw}–${r.ml}`,r=>r.mw-r.ml,{num:1}),
    diff:c('Разница',r=>{const d=r.mw-r.ml;return `<span class="${d>0?'up':d<0?'down':'mu'}">${d>0?'+':''}${d}</span>`},r=>r.mw-r.ml,{num:1}),
    fin:c('Итог',r=>`<span class="${r.fin.up?'up':'mu'}">${r.fin.t}</span>`,r=>r.fin.up?1:0),
    ms:c('Матчи',r=>`<div class="tm-ms">${r.ms.map(mchip).join('')}</div>`,r=>r.w,{num:1,w:'62%'}),
    out:c('Раунд на вылет',r=>r.fin.sc||'<span class="mu">—</span>',r=>r.fin.sc||''),
    q:c('Как попали',r=>r.q.replace('Квалификация: ','')||'—',r=>r.q)},
  tabs:[['Таблица',['wl','maps','diff','fin']],['Матчи',['ms']],['Путь',['out','q']]],
  desk:[['ms','34%'],'wl','maps','diff','fin','out'],
  main:['wl','fin'],det:['maps','diff','out',['ms','wide'],['q','wide']]};

/* ── 3. Статистика героев TI 2026 ── */
const HS=D.heroStats('ti-2026'),HG=HS.games;
const H=HS.list.map(h=>({k:h.hero,n:D.data.heroes[h.hero]?.name||h.hero,img:himg(h.hero),p:h.picks,pw:h.pickWins,b:h.bans,pb:h.picks+h.bans,r:h.radiant,dr:h.dire}));
const T_HEROES={title:'Статистика героев',sub:`TI 2026 · ${HS.sub}`,rows:H,sort:['pb',-1],
  lead:c('Герой',r=>lead(r.img,'tm-hero',r.n),r=>r.n),
  cols:{pb:c('Пик + бан',r=>r.pb,r=>r.pb,{num:1}),pbp:c('% карт',r=>pc(r.pb,HG),r=>r.pb,{num:1}),
    p:c('Пики',r=>r.p,r=>r.p,{num:1}),pw:c('Победы',r=>r.pw,r=>r.pw,{num:1}),wr:c('Винрейт',r=>wr(r.pw,r.p),r=>r.p?r.pw/r.p:-1,{num:1}),
    b:c('Баны',r=>r.b,r=>r.b,{num:1}),bp:c('% банов',r=>pc(r.b,HG),r=>r.b,{num:1}),
    rd:c('Свет',r=>`${r.r[0]} <span class="mu">·</span> ${wr(r.r[1],r.r[0])}`,r=>r.r[0]?r.r[1]/r.r[0]:-1,{num:1}),
    dd:c('Тьма',r=>`${r.dr[0]} <span class="mu">·</span> ${wr(r.dr[1],r.dr[0])}`,r=>r.dr[0]?r.dr[1]/r.dr[0]:-1,{num:1})},
  tabs:[['Пик + бан',['pb','pbp']],['Пики',['p','pw','wr']],['Баны',['b','bp']],['Стороны',['rd','dd']]],
  desk:['pb','pbp','p','pw','wr','b','bp','rd','dd'],
  main:['pb','wr'],det:['p','pw','b','pbp','rd','dd']};

/* ── 4. Турниры ── */
const TIER={S:1,A:2,B:3},ST={live:'Идёт',soon:'Скоро',done:'Завершён'};
const TR=Object.values(D.data.tours).map(t=>({id:t.id,name:t.name,tier:TIER[t.tier]||null,st:t.state,from:t.from,to:t.to,prize:t.prize,pz:+String(t.prize).replace(/\D/g,''),
  stage:t.stage||'',fmt:typeof t.format==='string'?({groups:'Группы',bracket:'Сетка',soon:'Объявлен'}[t.format]||t.format):'Швейцарка + плей-офф',teams:(t.teams||[]).length,logo:D.url(t.logo)}));
const T_TOURS={title:'Турниры',sub:'Dota 2 · сезон 2026',rows:TR,sort:['from',1],
  lead:c('Турнир',r=>lead(r.logo,'tm-logo',r.name+(r.tier?`<span class="tm-tag">T${r.tier}</span>`:''),null),r=>r.name),
  cols:{st:c('Статус',r=>`<span class="tm-st ${r.st}"><i></i>${ST[r.st]}</span>`,r=>({live:0,soon:1,done:2})[r.st]),
    from:c('Даты',r=>`${dm(r.from)} – ${dm(r.to)}`,r=>r.from,{num:1}),prize:c('Призовые',r=>r.prize,r=>r.pz,{num:1}),
    tier:c('Уровень',r=>r.tier?'Tier '+r.tier:'—',r=>r.tier||9,{num:1}),stage:c('Стадия',r=>r.stage||'<span class="mu">—</span>',r=>r.stage),
    fmt:c('Формат',r=>r.fmt,r=>r.fmt),teams:c('Команд',r=>r.teams||'<span class="mu">—</span>',r=>r.teams,{num:1})},
  tabs:[['Когда',['st','from']],['Призовые',['prize','tier']],['Формат',['fmt','teams']]],
  desk:['st','from','prize','tier','stage','fmt','teams'],
  main:['st','from'],det:['prize','tier','fmt','teams',['stage','wide']]};


/* ── 5. Участники турнира списком (ui/tournament/Participants, режим «Список»; данные — как tournament/data/teams.ts) ── */
const PL=D.data.players,TT='ti-2026',hash=x=>{let h=7;for(const ch of x)h=(h*31+ch.charCodeAt(0))>>>0;return h};
const PS=Object.fromEntries(D.playerStats(TT).map(x=>[PL[x.player].nick,x]));
const ppm=(x,wk)=>wk?x.week/Math.max(1,x.weekMaps):x.pts/Math.max(1,x.maps),PV=Object.values(PS);
const lo=Math.min(...PV.map(x=>ppm(x))),hi=Math.max(...PV.map(x=>ppm(x))),sc=v=>Math.round(60+(v-lo)/Math.max(1,hi-lo)*34);
const rate=n=>{const x=PS[n];return {b:1200+(x?sc(ppm(x)):60)*7,d:1200+(x?sc(ppm(x,1)):60)*7}};
const subsAll=D.subs(),trAll=D.transfers();
const TEAMS=TI.standings.slice().sort((a,b)=>a.place-b.place).map((x,i)=>{
  const all=Object.values(PL).filter(p=>p.teamAt&&p.teamAt[TT]===x.team).sort((a,b)=>((b.mapsAt||{})[TT]??9)-((a.mapsAt||{})[TT]??9));
  const rl=p=>(p.roleAt||{})[TT]??p.role,main=all.slice(0,5).sort((a,b)=>(rl(a)||9)-(rl(b)||9)),subs=all.slice(5);
  const st=D.teamStats(TT,x.team),sw=subsAll.filter(s=>s.team===x.team).length;
  const notes=1+trAll.filter(t=>(t.to===x.team&&['join','standin','coach'].includes(t.kind))||(t.from===x.team&&['inactive','leave'].includes(t.kind))).length;
  const r=Math.round(main.reduce((a,p)=>a+rate(p.nick).b+hash(p.nick)%7,0)/Math.max(1,main.length));
  return {seed:i+1,id:x.team,name:tn(x.team),st:x.out?`Выбыли · ${x.out.place} место`:'Плей-офф',q:x.qualification||'',sw,subs:subs.length,notes,
    form:st?st.form.map(f=>({s:f.score,vs:f.vs})):[],r,dr:st?(st.series[0]-st.series[1])*3:0,main:main.map(p=>({nick:p.nick,role:rl(p),flag:D.url(p.flag)}))}});
const fchip=f=>`<span title="${tn(f.vs)}"><img src="${logo(f.vs)}" alt=""><b class="${f.s[0]>f.s[1]?'up':'down'}">${f.s[0]}:${f.s[1]}</b></span>`;
const T_PART={title:'Участники',sub:'TI 2026 · 16 команд · список',rows:TEAMS,sort:['seed',1],
  lead:c('Команда',r=>lead(logo(r.id),'tm-logo',r.name,r.st,`<span class="tm-place">${r.seed}</span>`),r=>r.seed),
  cols:{sw:c('Замены',r=>r.sw?`${r.sw} ${r.sw===1?'замена':'замены'}`:'<span class="mu">—</span>',r=>r.sw,{num:1}),
    subs:c('Запасные',r=>r.subs||'<span class="mu">—</span>',r=>r.subs,{num:1}),notes:c('Заметки',r=>r.notes||'<span class="mu">—</span>',r=>r.notes,{num:1}),
    form:c('Форма',r=>r.form.length?`<div class="tm-ms">${r.form.map(fchip).join('')}</div>`:'<span class="mu">—</span>',r=>r.form.filter(f=>f.s[0]>f.s[1]).length,{num:1,w:'30%'}),
    r:c('Рейтинг',r=>`<b>${r.r}</b>${r.dr?` <span class="${r.dr>0?'up':'down'}">${r.dr>0?'▲':'▼'}${Math.abs(r.dr)}</span>`:''}`,r=>r.r,{num:1}),
    q:c('Как попали',r=>r.q.replace('Квалификация: ','')||'—',r=>r.q),
    roster:c('Состав',r=>r.main.map(p=>`${p.role?`<span class="mu">${p.role}</span> `:''}${p.nick}`).join(' · '),r=>0)},
  desk:['sw','subs','notes',['form','30%'],'r'],
  tabs:[['Сводка',['r','sw','subs']],['Форма',['form']],['Состав',['roster']]],
  main:['r'],det:['sw','subs','notes',['form','wide'],['q','wide'],['roster','wide']]};

/* ── 6. Игроки по позициям (ui/tournament/Positions): позиция 1–5, место, игрок, команда, 3 героя, рейтинг ── */
const POS_ROWS=[];
for(let pos=1;pos<=5;pos++) TEAMS.map(t=>{const x=t.main.find(m=>+m.role===pos)||t.main[pos-1];if(!x) return null;
  const h=(PS[x.nick]?.heroes||[]).slice(0,3).map(y=>({k:y.hero,wr:Math.round(y.wins/y.maps*100),n:y.maps}));
  return {pos,nick:x.nick,flag:x.flag,team:t.name,tid:t.id,r:rate(x.nick),h}}).filter(Boolean).sort((a,b)=>b.r.b-a.r.b).forEach((r,i)=>POS_ROWS.push({...r,rank:i+1}));
const hchip=h=>h?`<span class="tm-hh"><img src="${himg(h.k)}" alt=""><b class="${h.wr>=55?'up':h.wr<45?'down':''}">${h.wr}%</b><small>${h.n}</small></span>`:'';
const T_POS={title:'Игроки по позициям',sub:'TI 2026 · рейтинг — пример, по очкам за карту',rows:POS_ROWS,sort:['rank',1],posTabs:1,
  lead:c('Игрок',r=>lead(r.flag,'tm-flag',r.nick,r.team,`<span class="tm-place">${r.rank}</span>`),r=>r.rank),
  cols:{h1:c('Герой 1',r=>hchip(r.h[0]),r=>r.h[0]?.wr??-1,{num:1}),h2:c('Герой 2',r=>hchip(r.h[1]),r=>r.h[1]?.wr??-1,{num:1}),h3:c('Герой 3',r=>hchip(r.h[2]),r=>r.h[2]?.wr??-1,{num:1}),
    hs:c('Главные герои',r=>`<div class="tm-ms">${r.h.map(hchip).join('')}</div>`,r=>r.h[0]?.n??0,{num:1}),
    r:c('Рейтинг',r=>`<b>${r.r.b}</b> <span class="mu">${r.r.d}</span>`,r=>r.r.b,{num:1}),team:c('Команда',r=>r.team,r=>r.team)},
  desk:['team',['hs','44%'],'r'],
  tabs:[['Рейтинг',['r']],['Герои',['hs']]],
  main:['r'],det:['team',['hs','wide']]};

/* ── отрисовка ── */
function make(T){
  const el=document.createElement('section');el.className='tm';
  const S={tab:0,sort:T.sort,show:10,open:new Set(),pos:1};
  const colOf=k=>Array.isArray(k)?[T.cols[k[0]],k[1]]:[T.cols[k],''];
  function sorted(){
    const [k,dir]=S.sort,col=k===T.lead.k?T.lead:(T.cols[k]||{s:r=>r[k]});
    return [...T.rows].sort((a,b)=>{const x=col.s(a),y=col.s(b);return (x>y?1:x<y?-1:0)*dir});
  }
  function th(key,col,extra=''){
    const on=S.sort[0]===key,ar=on?(S.sort[1]>0?'↑':'↓'):'';
    return `<th class="${col.num?'num':''} ${on?'on':''}" data-sort="${key}" ${col.w?`style="width:${col.w}"`:''} ${extra}>${col.t}<span class="ar">${ar}</span></th>`;
  }
  const narrow=()=>el.clientWidth&&el.clientWidth<640;
  let wasNarrow=null;
  function render(){
    wasNarrow=narrow();
    const all=sorted().filter(r=>!T.posTabs||r.pos===S.pos).map((r,i)=>T.posTabs?{...r,rank:i+1}:r),rs=all.slice(0,S.show),top=el.querySelector('.tm-body')?.scrollTop||0;
    T.lead.k='_lead';
    let h=`<div class="tm-hd"><div><h3>${T.title}</h3><p>${T.sub}</p></div><span class="n">${all.length}</span></div>`;
    if(T.posTabs) h+=`<div class="tm-seg tm-pos">${[1,2,3,4,5].map(p=>`<button class="${S.pos===p?'on':''}" data-pos="${p}">Pos ${p}</button>`).join('')}</div>`;
    if(!narrow()){
      const cols=T.desk.map(k=>Array.isArray(k)?k:[k,null]);
      h+=`<div class="tm-body"><table class="desk"><thead><tr>${th('_lead',T.lead,'style="width:220px"')}${cols.map(([k,w])=>th(k,T.cols[k],w?`style="width:${w}"`:'')).join('')}</tr></thead><tbody>`+
        rs.map(r=>`<tr><td>${T.lead.v(r)}</td>${cols.map(([k])=>`<td class="${T.cols[k].num?'num':''}">${T.cols[k].v(r)}</td>`).join('')}</tr>`).join('')+`</tbody></table>`;
    } else if(MODE==='tabs'){
      const cols=T.tabs[S.tab][1];
      h+=`<div class="tm-seg">${T.tabs.map((t,i)=>`<button class="${S.tab===i?'on':''}" data-tab="${i}">${t[0]}</button>`).join('')}</div>`;
      h+=`<div class="tm-body"><table><thead><tr>${th('_lead',T.lead,'style="width:'+(cols.length>3?'38%':cols.length>1?'46%':'38%')+'"')}${cols.map(k=>th(k,T.cols[k])).join('')}</tr></thead><tbody>`+
        rs.map(r=>`<tr><td>${T.lead.v(r)}</td>${cols.map(k=>`<td class="${T.cols[k].num?'num':''}">${T.cols[k].v(r)}</td>`).join('')}</tr>`).join('')+`</tbody></table>`;
    } else {
      h+=`<div class="tm-body"><table><thead><tr>${th('_lead',T.lead,'style="width:50%"')}${T.main.map(k=>th(k,T.cols[k])).join('')}<th style="width:36px;cursor:default"></th></tr></thead><tbody>`+
        rs.map((r,i)=>{const id=T.rows.indexOf(r),o=S.open.has(id);
          return `<tr class="row ${o?'open':''}" data-row="${id}"><td>${T.lead.v(r)}</td>${T.main.map(k=>`<td class="${T.cols[k].num?'num':''}">${T.cols[k].v(r)}</td>`).join('')}<td>${CHEV}</td></tr>`+
          (o?`<tr class="det"><td colspan="${T.main.length+2}"><div class="tm-det">${T.det.map(k=>{const [col,cls]=colOf(k);return `<div class="${cls}"><span>${col.t}</span><b>${col.v(r)}</b></div>`}).join('')}</div></td></tr>`:'')}).join('')+`</tbody></table>`;
    }
    h+=all.length>S.show?`<button class="tm-more" data-more>Показать ещё · осталось ${all.length-S.show}</button>`:'<div class="tm-end"></div>';
    h+=`</div>`;
    el.innerHTML=h;
    const b=el.querySelector('.tm-body');if(b) b.scrollTop=top;
  }
  T.lead.k='_lead';
  el.addEventListener('click',e=>{
    const t=e.target;
    const pz=t.closest('[data-pos]'),tab=t.closest('[data-tab]'),so=t.closest('[data-sort]'),more=t.closest('[data-more]'),row=t.closest('[data-row]');
    if(pz){S.pos=+pz.dataset.pos;S.show=10}
    else if(tab) S.tab=+tab.dataset.tab;
    else if(so){const k=so.dataset.sort;S.sort=S.sort[0]===k?[k,-S.sort[1]]:[k,(T.cols[k]&&T.cols[k].num)?-1:1]}
    else if(more) S.show+=10;
    else if(row){const id=+row.dataset.row;S.open.has(id)?S.open.delete(id):S.open.add(id)}
    else return;
    render();
  });
  new ResizeObserver(()=>{if(narrow()!==wasNarrow) render()}).observe(el);
  return el;
}
const page=document.querySelector('.tm-page');
const main=document.createElement('div');main.className='tm-main';
page.append(main);
[T_GROUP,T_HEROES,T_POS,T_PART].forEach(T=>main.appendChild(make(T)));   // главная колонка
// турниры сняты дирижёром 16.11: правая колонка, править не будем — лаба только про базовые таблицы главной колонки
/* ширина известна только после вставки — первая отрисовка через ResizeObserver */
})();
