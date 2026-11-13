import{j as e}from"./iframe-F93FfCMw.js";import{E as p}from"./EventIcon-uyTvos10.js";import{O as g}from"./OutcomeButton-DA_DWKQc.js";import{D as v}from"./DeckCounter-CFPVyAKu.js";import{B as f}from"./Button-BciHEVR6.js";import{I as y}from"./Icon-lgHgIxDE.js";/* empty css             */function q({x:r,pick:a=null,index:s=0,total:i=1,glow:t,ping:u,onPick:o,onClose:l,onNav:d,className:m}){return e.jsxs("div",{className:["pred-card",t&&"is-glow",t&&u&&"is-ping",m].filter(Boolean).join(" "),children:[e.jsxs("div",{className:"pred-card__hd",children:[i>1&&e.jsx(v,{index:s,total:i,onNav:d}),e.jsx(f,{variant:"secondary",size:"icon-lg",className:"pred-card__cls",title:"Закрыть","aria-label":"Закрыть",disabled:a!=null,onClick:l,children:e.jsx(y,{name:"close"})})]}),e.jsxs("span",{className:"pred-card__ev",children:[e.jsx(p,{ev:r.ev}),r.fresh&&e.jsxs(e.Fragment,{children:[e.jsx("em",{children:"Новый"})," · "]}),r.ev," · до ",r.t]}),e.jsx("b",{className:"pred-card__q",children:r.q}),e.jsx("div",{className:"pred-card__btns",children:r.o.map((c,n)=>e.jsx(g,{outcome:c,side:n?"n":"y",on:a===n,off:a!=null&&a!==n,onClick:()=>o?.(n)},n))})]})}q.__docgenInfo={description:`Карточка прогноза в колоде (лаба w-predict-4 v34 → gs-match-2 v86; w-predict-col: .qz-dc): сверху «‹ 1 / 3 ›» и крестик «Закрыть»,
 внизу — значок и «Новый · Событие · до 37:10», вопрос и две кнопки исхода. Ответил — крестика нет (к ответу закрывать нечего).`,methods:[],displayName:"PredictionCard",props:{x:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string
  /** Событие: «Рошан», «Событие», «Карта»… — по нему значок */
  ev: string
  q: string
  /** До какого времени карты можно ответить */
  t: string
  o: [Outcome, Outcome]
  /** Пришёл по событию только что — «Новый» на карточке */
  fresh?: boolean
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"ev",value:{name:"string",required:!0},description:"Событие: «Рошан», «Событие», «Карта»… — по нему значок"},{key:"q",value:{name:"string",required:!0}},{key:"t",value:{name:"string",required:!0},description:"До какого времени карты можно ответить"},{key:"o",value:{name:"tuple",raw:"[Outcome, Outcome]",elements:[{name:"signature",type:"object",raw:`{
  /** Подпись исхода: «Да» / «Нет» или среднее имя команды */
  label: string
  /** Шанс исхода, % (на кнопках не показываем — по нему считаются баллы) */
  pct: number
  /** Лого команды — у исходов-команд */
  logo?: string
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0},description:"Подпись исхода: «Да» / «Нет» или среднее имя команды"},{key:"pct",value:{name:"number",required:!0},description:"Шанс исхода, % (на кнопках не показываем — по нему считаются баллы)"},{key:"logo",value:{name:"string",required:!1},description:"Лого команды — у исходов-команд"}]}},{name:"signature",type:"object",raw:`{
  /** Подпись исхода: «Да» / «Нет» или среднее имя команды */
  label: string
  /** Шанс исхода, % (на кнопках не показываем — по нему считаются баллы) */
  pct: number
  /** Лого команды — у исходов-команд */
  logo?: string
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0},description:"Подпись исхода: «Да» / «Нет» или среднее имя команды"},{key:"pct",value:{name:"number",required:!0},description:"Шанс исхода, % (на кнопках не показываем — по нему считаются баллы)"},{key:"logo",value:{name:"string",required:!1},description:"Лого команды — у исходов-команд"}]}}],required:!0}},{key:"fresh",value:{name:"boolean",required:!1},description:"Пришёл по событию только что — «Новый» на карточке"}]}},description:""},pick:{required:!1,tsType:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]},description:"Выбранный исход (0 / 1); нет — не ответил",defaultValue:{value:"null",computed:!1}},index:{required:!1,tsType:{name:"number"},description:"Номер в колоде и сколько всего; одна карточка — счётчика нет",defaultValue:{value:"0",computed:!1}},total:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},glow:{required:!1,tsType:{name:"boolean"},description:"Блик по рамке: золотой отрезок медленно (8 с) идёт по кругу — пока есть прогноз без ответа (PC_ACT + PC_SPIN + PC_CARDGLOW)"},ping:{required:!1,tsType:{name:"boolean"},description:"Только что пришёл — вспышка по рамке 3 с (pc--ping)"},onPick:{required:!1,tsType:{name:"signature",type:"function",raw:"(i: number) => void",signature:{arguments:[{type:{name:"number"},name:"i"}],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onNav:{required:!1,tsType:{name:"signature",type:"function",raw:"(d: -1 | 1) => void",signature:{arguments:[{type:{name:"union",raw:"-1 | 1",elements:[{name:"literal",value:"-1"},{name:"literal",value:"1"}]},name:"d"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{q as P};
