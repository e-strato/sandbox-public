import{j as e}from"./iframe-DJapxiKZ.js";import{B as a}from"./Button-BhfpQAr1.js";import{I as t}from"./Icon-CQeUycSL.js";import"./preload-helper-PPVm8Dsz.js";const w={title:"Сайт/Атомы/Кнопка/Button v2",component:a,args:{variant:"secondary",size:"md",children:"Мои прогнозы"},argTypes:{variant:{control:"select",description:"Вид (v2, 16.11: primary — акцент #3f238b, chip — прямоугольный, yes/no — серые, radiant/dire — исход-команда цветом стороны). primary — главное действие (сохранить, добавить) · secondary — второстепенное («Показать ещё») · tonal — тихое на подложке («Сбросить») · outline — вход, кнопка с меню · ghost — без подложки: кнопка-иконка, сегмент, переключатель · link — текст-ссылка («Все новости ›») · chip — пилюля фильтра · yes / no — ответ в прогнозе"},size:{control:"select",description:"Высота: xs 20 · sm 28 · md 32 · lg 36 · xl 40 · 2xl 50. Квадратные под иконку (с `<Icon>` и aria-label): icon-xs 22 · icon-sm 24 · icon-md 28 · icon-lg 32"},pressed:{control:"boolean",description:"Выбрана (переключатель, сегмент, фильтр) → aria-pressed. Не задано — обычная кнопка"},href:{control:"text",description:"Есть — рисуется ссылкой `<a>` того же вида"},disabled:{control:"boolean",description:"Недоступна (только для `<button>`)"},forceState:{control:"select",options:[void 0,"hover","focus"],description:"Только для историй: показать наведение / фокус без мыши"},children:{control:"text",description:"Текст или `<Icon name>`; у кнопки-иконки обязательно aria-label"}},parameters:{docs:{description:{component:'Кнопка продукта (образец — shadcn/ui Button). Кнопка-иконка — только `variant="ghost" size="icon-*"` + `<Icon name>` + `aria-label`. Нельзя: своя `<button>` со своим CSS, `<div onClick>`, иконка без aria-label. Таблица «какую брать» — `ui/README.md`.'}}},decorators:[r=>e.jsx("div",{style:{padding:16,background:"var(--c-surface)"},children:e.jsx(r,{})})]};function d({label:r,...o}){const n=(b,k)=>e.jsxs("div",{style:{display:"grid",gap:8,justifyItems:"start"},children:[e.jsx("small",{style:{font:"var(--type-caption-2)",color:"var(--c-text-3)"},children:b}),k]});return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, minmax(120px, auto))",gap:24,alignItems:"end"},children:[n("обычное",e.jsx(a,{...o,children:r})),n("наведение",e.jsx(a,{...o,forceState:"hover",children:r})),n("фокус",e.jsx(a,{...o,forceState:"focus",children:r})),n("нажато",e.jsx(a,{...o,pressed:!0,children:r})),n("недоступно",e.jsx(a,{...o,disabled:!0,children:r}))]})}const s=(r,o,n,b)=>({render:()=>e.jsx(d,{variant:r,size:o,label:n,"aria-label":b})}),m={},l=s("primary","sm","Добавить"),p=s("secondary","xl","Показать ещё 16 из 40"),u={name:"Secondary · иконка",...s("secondary","icon-lg",e.jsx(t,{name:"close"}),"Закрыть")},x=s("tonal","sm",e.jsxs(e.Fragment,{children:[e.jsx(t,{name:"reset"}),"Сбросить"]})),g=s("outline","lg","Войти"),h={name:"Outline · меню",...s("outline","md",e.jsxs(e.Fragment,{children:["Dota 2",e.jsx(t,{name:"chevron-down"})]}))},y=s("ghost","sm","Pos 1"),v={name:"Ghost · иконка",...s("ghost","icon-md",e.jsx(t,{name:"chevron-left"}),"Назад")},S=s("link","md",e.jsxs(e.Fragment,{children:["Архив",e.jsx(t,{name:"chevron-right",size:12})]})),j={name:"Link · мелкая",...s("link","sm","Все новости ›")},f=s("chip","sm","Трансферы"),z={name:"Да / Нет",render:()=>e.jsxs("div",{style:{display:"grid",gap:16,width:760},children:[e.jsx(d,{variant:"yes",size:"2xl",label:"Да"}),e.jsx(d,{variant:"no",size:"2xl",label:"Нет"})]})},I={name:"Radiant / Dire",render:()=>e.jsxs("div",{style:{display:"grid",gap:16,width:760},children:[e.jsx(d,{variant:"radiant",size:"2xl",label:"Team Spirit · Radiant"}),e.jsx(d,{variant:"dire",size:"2xl",label:"PARIVISION · Dire"})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[["xs","sm","md","lg","xl","2xl"].map(r=>e.jsx(a,{variant:"secondary",size:r,children:r},r)),["icon-xs","icon-sm","icon-md","icon-lg"].map(r=>e.jsx(a,{variant:"secondary",size:r,"aria-label":r,children:e.jsx(t,{name:"plus"})},r))]})},c={name:"Ссылкой (a)",args:{variant:"link",size:"sm",href:"#",children:"Все новости ›"}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"ряд('primary', 'sm', 'Добавить')",...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"ряд('secondary', 'xl', 'Показать ещё 16 из 40')",...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Secondary · иконка',
  ...ряд('secondary', 'icon-lg', <Icon name="close" />, 'Закрыть')
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`ряд('tonal', 'sm', <><Icon name="reset" />Сбросить</>)`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"ряд('outline', 'lg', 'Войти')",...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Outline · меню',
  ...ряд('outline', 'md', <>Dota 2<Icon name="chevron-down" /></>)
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:"ряд('ghost', 'sm', 'Pos 1')",...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Ghost · иконка',
  ...ряд('ghost', 'icon-md', <Icon name="chevron-left" />, 'Назад')
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`ряд('link', 'md', <>Архив<Icon name="chevron-right" size={12} /></>)`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Link · мелкая',
  ...ряд('link', 'sm', 'Все новости ›')
}`,...j.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"ряд('chip', 'sm', 'Трансферы')",...f.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Да / Нет',
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    width: 760
  }}><Состояния variant="yes" size="2xl" label="Да" /><Состояния variant="no" size="2xl" label="Нет" /></div>
}`,...z.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Radiant / Dire',
  render: () => <div style={{
    display: 'grid',
    gap: 16,
    width: 760
  }}><Состояния variant="radiant" size="2xl" label="Team Spirit · Radiant" /><Состояния variant="dire" size="2xl" label="PARIVISION · Dire" /></div>
}`,...I.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as ButtonSize[]).map(s => <Button key={s} variant="secondary" size={s}>{s}</Button>)}
      {(['icon-xs', 'icon-sm', 'icon-md', 'icon-lg'] as ButtonSize[]).map(s => <Button key={s} variant="secondary" size={s} aria-label={s}><Icon name="plus" /></Button>)}
    </div>
}`,...i.parameters?.docs?.source},description:{story:"Все размеры одного вида",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Ссылкой (a)',
  args: {
    variant: 'link',
    size: 'sm',
    href: '#',
    children: 'Все новости ›'
  }
}`,...c.parameters?.docs?.source},description:{story:"С href — ссылка того же вида",...c.parameters?.docs?.description}}};const G=["Песочница","Primary","Secondary","SecondaryИконка","Tonal","Outline","OutlineМеню","Ghost","GhostИконка","Link","LinkМелкая","Chip","ДаНет","Стороны","Размеры","Ссылкой"];export{f as Chip,y as Ghost,v as GhostИконка,S as Link,j as LinkМелкая,g as Outline,h as OutlineМеню,l as Primary,p as Secondary,u as SecondaryИконка,x as Tonal,G as __namedExportsOrder,w as default,z as ДаНет,m as Песочница,i as Размеры,c as Ссылкой,I as Стороны};
