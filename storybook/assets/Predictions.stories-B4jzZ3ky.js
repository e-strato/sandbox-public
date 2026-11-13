import{v as b,s as w,M as k}from"./storyArgs-DRdiFJgq.js";import{s as A}from"./WidgetStatus-CWntMLnJ.js";import{P as h}from"./Predictions-WLMLcW_O.js";import"./iframe-F93FfCMw.js";import"./preload-helper-PPVm8Dsz.js";import"./Button-BciHEVR6.js";import"./EmptyState-BXZ7l5Kf.js";import"./Skeleton-BVwrIdBl.js";import"./data-BJzxN2gZ.js";import"./db-C0JPCiI4.js";import"./format-CX8-8sml.js";import"./series-B6wJA9nB.js";import"./PredictionCard-yOvmnvHP.js";import"./EventIcon-uyTvos10.js";import"./OutcomeButton-DA_DWKQc.js";import"./DeckCounter-CFPVyAKu.js";import"./Icon-lgHgIxDE.js";/* empty css             */import"./SummaryRow-DcYnENtd.js";const J={title:"Матч/Прогнозы/Predictions v1",component:h,parameters:{layout:"padded",docs:{description:{component:`Виджет живой: ответ, «Закрыть», стрелки по кругу, через 1 с — следующая карточка; всё отвечено или закрыто — итог, решается раз в 5 с.
 Сценарий — ось «Прогнозы» песочницы: ждём событие · пришло событие · накопились · 3 · всё собрано.`}}},args:{state:"live",viewer:"in",scenario:"one"},argTypes:{state:{...w(),description:"Состояние матча: виджет есть только в лайве (live12 · live), до и после матча его нет"},viewer:{...b,description:"Зритель: in — вошёл · guest — гость (видит то же, что вошедший)"},scenario:{control:"inline-radio",options:["wait","one","many","done"],description:"Что пришло к этой минуте: wait — ждём событие · one — пришло событие · many — накопились три · done — всё отвечено"},init:{control:"object",description:"Стартовое состояние для историй: pick — ответы, skip — закрытые, i — открытая карточка, allDone — открыт итог, resAgo — сколько мс назад начали решаться"},...A}},e={name:"Пришло событие (по умолчанию)"},s={name:"Колода · накопились 3",args:{scenario:"many"}},a={args:{scenario:"many",init:{pick:{rosh:0}}}},o={args:{scenario:"many",init:{skip:{rosh:!0},i:1}}},t={name:"Все отвечены — решаются",args:{scenario:"done"}},n={args:{scenario:"many",init:{pick:{rosh:0,map:1},skip:{die:!0},allDone:!0,resAgo:2e4}}},c={name:"Ждём событие",args:{scenario:"wait"}},i={name:"Гость (как у вошедшего)",args:{viewer:"guest"}},r=v=>({name:"Матч: "+k[v].label+(["live12","live"].includes(k[v].value)?"":" — виджета нет"),args:{state:k[v].value}}),m=r(0),p=r(1),d=r(2),u=r(3),g=r(4),l=r(5),S={args:{status:"loading"}},y={args:{status:"error"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  name: 'Пришло событие (по умолчанию)'
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Колода · накопились 3',
  args: {
    scenario: 'many'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    scenario: 'many',
    init: {
      pick: {
        rosh: 0
      }
    }
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    scenario: 'many',
    init: {
      skip: {
        rosh: true
      },
      i: 1
    }
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: 'Все отвечены — решаются',
  args: {
    scenario: 'done'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    scenario: 'many',
    init: {
      pick: {
        rosh: 0,
        map: 1
      },
      skip: {
        die: true
      },
      allDone: true,
      resAgo: 20000
    }
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Ждём событие',
  args: {
    scenario: 'wait'
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Гость (как у вошедшего)',
  args: {
    viewer: 'guest'
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"byState(0)",...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"byState(1)",...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"byState(2)",...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"byState(3)",...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"byState(4)",...g.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"byState(5)",...l.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'loading'
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error'
  }
}`,...y.parameters?.docs?.source}}};const K=["ПришлоСобытие","Колода","Ответил","Закрыл","ВсеОтвечены","Итог","ЖдёмСобытие","Гость","ДоМатча","Драфт","ПикиГотовы","Первые12","Live","После","Загрузка","Ошибка"];export{g as Live,K as __namedExportsOrder,J as default,t as ВсеОтвечены,i as Гость,m as ДоМатча,p as Драфт,c as ЖдёмСобытие,S as Загрузка,o as Закрыл,n as Итог,s as Колода,a as Ответил,y as Ошибка,u as Первые12,d as ПикиГотовы,l as После,e as ПришлоСобытие};
