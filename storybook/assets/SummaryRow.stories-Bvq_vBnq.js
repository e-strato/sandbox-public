import{j as i,r as t}from"./iframe-F93FfCMw.js";import{S as u}from"./SummaryRow-DcYnENtd.js";import{l as w}from"./data-BJzxN2gZ.js";import"./preload-helper-PPVm8Dsz.js";import"./EventIcon-uyTvos10.js";import"./Icon-lgHgIxDE.js";/* empty css             */import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-B6wJA9nB.js";function h(r){const[c]=t.useState(()=>Date.now()),[m,p]=t.useState(c);return t.useEffect(()=>{const d=setInterval(()=>p(Date.now()),250);return()=>clearInterval(d)},[]),i.jsx(u,{...r,x:w()[r.which],due:r.secs?[c,c+r.secs*1e3]:void 0,now:m})}const E={title:"Матч/Прогнозы/Строка итога/SummaryRow v1",component:h,parameters:{layout:"padded"},argTypes:{which:{control:"number",description:"Какой прогноз колоды (0–2)"},secs:{control:"number",description:"Сколько секунд до итога — отсчёт идёт заново при открытии истории; нет — без отсчёта"},pick:{control:"inline-radio",options:[null,0,1],description:"Выбранный исход; нет — не ответил"},res:{control:"inline-radio",options:[void 0,"ok","no","gone"],description:"Итог: ok — угадал · no — мимо · gone — не ответил, решился без тебя; нет — ещё ждём"},win:{control:"inline-radio",options:[0,1],description:"Какой исход сбылся (у решённого) — по нему полоса «кто как ответил»"},onBack:{description:"Не ответил — нажали строку: вернуться к прогнозу"}},decorators:[r=>i.jsx("div",{style:{width:294,background:"var(--w-bg)"},children:i.jsx(r,{})})]},e={name:"Не ответил — вернуться (золотая линия)",args:{which:1,secs:10}},n={name:"Ответил — ждёт итога (серая линия)",args:{which:2,pick:1,secs:15}},s={name:"Угадал ✓ +N",args:{which:0,pick:0,res:"ok",win:0}},o={name:"Мимо ✕",args:{which:2,pick:0,res:"no",win:1}},a={name:"Не ответил, решился —",args:{which:1,res:"gone",win:1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Угадал ✓ +N',
  args: {
    which: 0,
    pick: 0,
    res: 'ok',
    win: 0
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Мимо ✕',
  args: {
    which: 2,
    pick: 0,
    res: 'no',
    win: 1
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Не ответил, решился —',
  args: {
    which: 1,
    res: 'gone',
    win: 1
  }
}`,...a.parameters?.docs?.source}}};const N=["НеОтветил","Ждёт","Угадал","Мимо","НеУспел"];export{N as __namedExportsOrder,E as default,n as Ждёт,o as Мимо,e as НеОтветил,a as НеУспел,s as Угадал};
