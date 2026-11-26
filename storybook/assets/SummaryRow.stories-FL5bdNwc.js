import{j as i,r as c}from"./iframe-mjJN3hdL.js";import{S as u}from"./SummaryRow-CH6w8fGm.js";import{l as w}from"./data-DrTFFsqh.js";import"./preload-helper-PPVm8Dsz.js";import"./EventIcon-DNQiX7AR.js";import"./Icon-DreIrXhw.js";/* empty css             */import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-C_-vD55g.js";import"./gold-owUtUbD0.js";function h(r){const[t]=c.useState(()=>Date.now()),[m,p]=c.useState(t);return c.useEffect(()=>{const d=setInterval(()=>p(Date.now()),250);return()=>clearInterval(d)},[]),i.jsx(u,{...r,x:w()[r.which],due:r.secs?[t,t+r.secs*1e3]:void 0,now:m})}const N={title:"Сайт/Матч/Прогнозы/Строка итога/SummaryRow v2",component:h,parameters:{layout:"padded"},argTypes:{which:{control:"number",description:"Какой прогноз колоды (0–2)"},secs:{control:"number",description:"Сколько секунд до итога — отсчёт идёт заново при открытии истории; нет — без отсчёта"},pick:{control:"inline-radio",options:[null,0,1],description:"Выбранный исход; нет — не ответил"},res:{control:"inline-radio",options:[void 0,"ok","no","gone"],description:"Итог: ok — угадал · no — мимо · gone — не ответил, решился без тебя; нет — ещё ждём"},win:{control:"inline-radio",options:[0,1],description:"Какой исход сбылся (у решённого) — по нему полоса «кто как ответил»"},onBack:{description:"Не ответил — нажали строку: вернуться к прогнозу"}},decorators:[r=>i.jsx("div",{style:{width:294,background:"var(--w-bg)"},children:i.jsx(r,{})})]},e={name:"Не ответил — вернуться (золотая линия)",args:{which:1,secs:10}},n={name:"Ответил — ждёт итога (серая линия)",args:{which:2,pick:1,secs:15}},o={name:"Угадал ✓ +N",args:{which:0,pick:0,res:"ok",win:0}},s={name:"Мимо ✕",args:{which:2,pick:0,res:"no",win:1}},a={name:"Не ответил, решился —",args:{which:1,res:"gone",win:1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Не ответил — вернуться (золотая линия)',
  args: {
    which: 1,
    secs: 10
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Ответил — ждёт итога (серая линия)',
  args: {
    which: 2,
    pick: 1,
    secs: 15
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Угадал ✓ +N',
  args: {
    which: 0,
    pick: 0,
    res: 'ok',
    win: 0
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Мимо ✕',
  args: {
    which: 2,
    pick: 0,
    res: 'no',
    win: 1
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Не ответил, решился —',
  args: {
    which: 1,
    res: 'gone',
    win: 1
  }
}`,...a.parameters?.docs?.source}}};const R=["НеОтветил","Ждёт","Угадал","Мимо","НеУспел"];export{R as __namedExportsOrder,N as default,n as Ждёт,s as Мимо,e as НеОтветил,a as НеУспел,o as Угадал};
