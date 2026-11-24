import{j as o}from"./iframe-D87XLeni.js";import{p as t,o as n}from"./data-B_hf87vJ.js";import{P as s}from"./ProfilePredictions-BKBm7mP1.js";import"./preload-helper-PPVm8Dsz.js";import"./db-C0JPCiI4.js";import"./Widget-D9h-qEOd.js";import"./Segment-Dsb1aZjK.js";import"./EntityTag-WJ_QPf-X.js";import"./Icon-Bf6l5vFt.js";const x={title:"Движок/Профиль/Прогнозы/ProfilePredictions v1",component:s,tags:["concept"],parameters:{layout:"fullscreen",docs:{description:{component:"Профиль пользователя движка (концепт) — «Прогнозы». Стоит на странице профиля v1."}}},decorators:[e=>o.jsx("div",{className:"eng-surface",style:{padding:20,width:1040},children:o.jsx(e,{})})]},r={render:()=>{const e=t("month");return o.jsx(s,{p:{...e,series:[...n(),...e.series]}})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const p = profile("month");
    return <ProfilePredictions p={{
      ...p,
      series: [...openSeries(), ...p.series]
    }} />;
  }
}`,...r.parameters?.docs?.source}}};const P=["Месяц"];export{P as __namedExportsOrder,x as default,r as Месяц};
