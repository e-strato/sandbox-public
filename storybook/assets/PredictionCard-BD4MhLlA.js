import{j as e}from"./iframe-CVgOj2D3.js";import{E as v}from"./EventIcon-D_9fM7TS.js";import{e as g}from"./data-JlDz-jzs.js";import{O as f}from"./OutcomeButton-C7Zf8vo-.js";import{D as y}from"./DeckCounter-KaW_nWDm.js";import{B as q}from"./Button-CXoHiDIv.js";/* empty css             */import{t}from"./index-4Rfbaa0x.js";function b({x:r,pick:a=null,index:u=0,total:i=1,glow:s,ping:l,onPick:o,onClose:d,onNav:m,className:c}){return e.jsxs("div",{className:["pred-card",s&&"is-glow",s&&l&&"is-ping",c].filter(Boolean).join(" "),children:[e.jsxs("div",{className:"pred-card__hd",children:[i>1&&e.jsx(y,{index:u,total:i,onNav:m}),e.jsx(q,{variant:"secondary",size:"sm",className:"pred-card__cls",title:t("match:pred.close"),"aria-label":t("match:pred.close"),disabled:a!=null,onClick:d,icon:"close"})]}),e.jsxs("span",{className:"pred-card__ev",children:[e.jsx(v,{ev:r.ev}),r.fresh&&e.jsxs(e.Fragment,{children:[e.jsx("em",{children:t("match:pred.new")})," · "]}),g(r.ev)," · ",t("match:pred.until")," ",r.t]}),e.jsx("b",{className:"pred-card__q",children:r.q}),e.jsx("div",{className:"pred-card__btns",children:r.o.map((p,n)=>e.jsx(f,{outcome:p,side:n?"n":"y",on:a===n,off:a!=null&&a!==n,onClick:()=>o?.(n)},n))})]})}b.__docgenInfo={description:`Карточка прогноза в колоде (лаба w-predict-4 v34 → gs-match-2 v86; w-predict-col: .qz-dc): сверху «‹ 1 / 3 ›» и крестик «Закрыть»,
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
  /** Сторона команды на текущей карте — кнопка цветом стороны (OutcomeButton v2, 16.11) */
  team?: 'radiant' | 'dire'
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0},description:"Подпись исхода: «Да» / «Нет» или среднее имя команды"},{key:"pct",value:{name:"number",required:!0},description:"Шанс исхода, % (на кнопках не показываем — по нему считаются баллы)"},{key:"logo",value:{name:"string",required:!1},description:"Лого команды — у исходов-команд"},{key:"team",value:{name:"union",raw:"'radiant' | 'dire'",elements:[{name:"literal",value:"'radiant'"},{name:"literal",value:"'dire'"}],required:!1},description:"Сторона команды на текущей карте — кнопка цветом стороны (OutcomeButton v2, 16.11)"}]}},{name:"signature",type:"object",raw:`{
  /** Подпись исхода: «Да» / «Нет» или среднее имя команды */
  label: string
  /** Шанс исхода, % (на кнопках не показываем — по нему считаются баллы) */
  pct: number
  /** Лого команды — у исходов-команд */
  logo?: string
  /** Сторона команды на текущей карте — кнопка цветом стороны (OutcomeButton v2, 16.11) */
  team?: 'radiant' | 'dire'
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0},description:"Подпись исхода: «Да» / «Нет» или среднее имя команды"},{key:"pct",value:{name:"number",required:!0},description:"Шанс исхода, % (на кнопках не показываем — по нему считаются баллы)"},{key:"logo",value:{name:"string",required:!1},description:"Лого команды — у исходов-команд"},{key:"team",value:{name:"union",raw:"'radiant' | 'dire'",elements:[{name:"literal",value:"'radiant'"},{name:"literal",value:"'dire'"}],required:!1},description:"Сторона команды на текущей карте — кнопка цветом стороны (OutcomeButton v2, 16.11)"}]}}],required:!0}},{key:"fresh",value:{name:"boolean",required:!1},description:"Пришёл по событию только что — «Новый» на карточке"}]}},description:""},pick:{required:!1,tsType:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]},description:"Выбранный исход (0 / 1); нет — не ответил",defaultValue:{value:"null",computed:!1}},index:{required:!1,tsType:{name:"number"},description:"Номер в колоде и сколько всего; одна карточка — счётчика нет",defaultValue:{value:"0",computed:!1}},total:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},glow:{required:!1,tsType:{name:"boolean"},description:"Блик по рамке: золотой отрезок медленно (8 с) идёт по кругу — пока есть прогноз без ответа (PC_ACT + PC_SPIN + PC_CARDGLOW)"},ping:{required:!1,tsType:{name:"boolean"},description:"Только что пришёл — вспышка по рамке 3 с (pc--ping)"},onPick:{required:!1,tsType:{name:"signature",type:"function",raw:"(i: number) => void",signature:{arguments:[{type:{name:"number"},name:"i"}],return:{name:"void"}}},description:""},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onNav:{required:!1,tsType:{name:"signature",type:"function",raw:"(d: -1 | 1) => void",signature:{arguments:[{type:{name:"union",raw:"-1 | 1",elements:[{name:"literal",value:"-1"},{name:"literal",value:"1"}]},name:"d"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{b as P};
