import{j as i,r as c}from"./iframe-CVgOj2D3.js";import{S as u}from"./SummaryRow-CCr4Za8V.js";import{l as w}from"./data-JlDz-jzs.js";import"./preload-helper-PPVm8Dsz.js";import"./EventIcon-D_9fM7TS.js";import"./Icon-BSeGJTM9.js";/* empty css             */import"./index-4Rfbaa0x.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-CNOQj-iv.js";import"./gold-t09_eRNS.js";function h(r){const[t]=c.useState(()=>Date.now()),[m,p]=c.useState(t);return c.useEffect(()=>{const d=setInterval(()=>p(Date.now()),250);return()=>clearInterval(d)},[]),i.jsx(u,{...r,x:w()[r.which],due:r.secs?[t,t+r.secs*1e3]:void 0,now:m})}const R={title:"Сайт/Матч/Прогнозы/Строка итога/SummaryRow v2",component:h,parameters:{layout:"padded"},argTypes:{which:{control:"number",description:"Какой прогноз колоды (0–2)"},secs:{control:"number",description:"Сколько секунд до итога — отсчёт идёт заново при открытии истории; нет — без отсчёта"},pick:{control:"inline-radio",options:[null,0,1],description:"Выбранный исход; нет — не ответил"},res:{control:"inline-radio",options:[void 0,"ok","no","gone"],description:"Итог: ok — угадал · no — мимо · gone — не ответил, решился без тебя; нет — ещё ждём"},win:{control:"inline-radio",options:[0,1],description:"Какой исход сбылся (у решённого) — по нему полоса «кто как ответил»"},onBack:{description:"Не ответил — нажали строку: вернуться к прогнозу"}},decorators:[r=>i.jsx("div",{style:{width:294,background:"var(--w-bg)"},children:i.jsx(r,{})})]},e={name:"Не ответил — вернуться (золотая линия)",args:{which:1,secs:10}},o={name:"Ответил — ждёт итога (серая линия)",args:{which:2,pick:1,secs:15}},n={name:"Угадал ✓ +N",args:{which:0,pick:0,res:"ok",win:0}},s={name:"Мимо ✕",args:{which:2,pick:0,res:"no",win:1}},a={name:"Не ответил, решился —",args:{which:1,res:"gone",win:1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Не ответил — вернуться (золотая линия)',
  args: {
    which: 1,
    secs: 10
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Ответил — ждёт итога (серая линия)',
  args: {
    which: 2,
    pick: 1,
    secs: 15
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Угадал ✓ +N',
  args: {
    which: 0,
    pick: 0,
    res: 'ok',
    win: 0
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const D=["НеОтветил","Ждёт","Угадал","Мимо","НеУспел"];export{D as __namedExportsOrder,R as default,o as Ждёт,s as Мимо,e as НеОтветил,a as НеУспел,n as Угадал};
