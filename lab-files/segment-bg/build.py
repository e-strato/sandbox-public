# Лаба «Сегмент: фон ряда» (дирижёр 23.11): сегмент на всех настоящих страницах (ui-pages), фон ряда — по варианту.
# Каждая строка — страница продукта в рамке, прокручена к своему сегменту; в страницу подставляется --seg-bg варианта.
# Запуск: python3 sandbox-project/lab/segment-bg/build.py
import pathlib, json
HERE = pathlib.Path(__file__).parent
SPOTS = [  # страница · какой по счёту сегмент · подпись
  ('match-engine', 0, 'Матч (движок) — вкладки карт в шапке'), ('match-engine', 1, 'Матч (движок) — «Прогнозы / Мои ответы»'),
  ('tournament-engine', 0, 'Турнир — «Групповой этап / Плей-офф»'), ('tournaments-engine', 0, 'Список турниров — «Календарь / Прошедшие» и «Месяц / Год»'),
  ('schedule-engine', 0, 'Расписание — «Live / Скоро / Итоги»'), ('player-engine', 0, 'Игрок — «Обзор / Матчи / Герои»'),
  ('player-engine', 1, 'Игрок — метрика тренда'), ('player-engine', 2, 'Игрок — «Колесо / Таблица»'),
  ('match', 0, 'Матч (сайт) — вкладки карт'),
]
VARS = [
  ('v1-сейчас', 'v1 · Сейчас', '#141416', 'как сейчас: muted 70 % на чёрном и ещё на 25 % темнее'),
  ('v2-surface-2', 'v2 · Как surface-2', '#18181b', 'на шаг светлее — цвет второй подложки (surface-2, токен есть)'),
  ('v3-muted-70', 'v3 · Muted 70 %', '#1b1b1d', 'без затемнения на 25 %'),
  ('v4-muted', 'v4 · Muted', '#27272a', 'как подложка tonal-кнопки и выбранного chip — самый светлый'),
  ('v5-блик-наискосок', 'v5 · Surface-2 + блик наискосок', '#18181b', 'как v2; у выбранного — тонкий блик по кромке наискосок: светлее сверху слева и снизу справа, к середине сторон гаснет; тень мягче'),
  ('v6-блик-10', 'v6 · Блик 10 / 4 %', '#18181b', 'как v5, блик тише: сверху слева 10 %, снизу справа 4 %'),
  ('v7-блик-7', 'v7 · Блик 7 / 3 %', '#18181b', 'как v5, блик тише: сверху слева 7 %, снизу справа 3 %'),
  ('v8-блик-5', 'v8 · Блик 5 / 2 %', '#18181b', 'как v5, блик тише: сверху слева 5 %, снизу справа 2 %'),
]
# доп. CSS варианта (подставляется в страницу вместе с фоном)
EXTRA = {
  'v6-блик-10': '.segment__thumb{box-shadow:0 2px 8px rgba(0,0,0,.35) !important;border:1px solid transparent;box-sizing:border-box;background:linear-gradient(var(--c-surface),var(--c-surface)) padding-box,linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0) 30%,rgba(255,255,255,0) 70%,rgba(255,255,255,0.04)) border-box !important}',
  'v7-блик-7': '.segment__thumb{box-shadow:0 2px 8px rgba(0,0,0,.35) !important;border:1px solid transparent;box-sizing:border-box;background:linear-gradient(var(--c-surface),var(--c-surface)) padding-box,linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0) 30%,rgba(255,255,255,0) 70%,rgba(255,255,255,0.03)) border-box !important}',
  'v8-блик-5': '.segment__thumb{box-shadow:0 2px 8px rgba(0,0,0,.35) !important;border:1px solid transparent;box-sizing:border-box;background:linear-gradient(var(--c-surface),var(--c-surface)) padding-box,linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0) 30%,rgba(255,255,255,0) 70%,rgba(255,255,255,0.02)) border-box !important}',
  'v5-блик-наискосок': '.segment__thumb{box-shadow:0 2px 8px rgba(0,0,0,.35) !important;border:1px solid transparent;box-sizing:border-box;'
    'background:linear-gradient(var(--c-surface),var(--c-surface)) padding-box,'
    'linear-gradient(135deg,rgba(255,255,255,.16),rgba(255,255,255,0) 30%,rgba(255,255,255,0) 70%,rgba(255,255,255,.07)) border-box !important}',
}
PAGE = '''<!doctype html>
<html lang="ru"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Сегмент · {name}</title>
<style>
body {{ margin: 0; padding: 32px 0 64px; background: #000; color: #fafafa; font: 400 13px/18px system-ui, sans-serif; }}
h1 {{ font: 600 20px/28px system-ui; margin: 0 32px 4px; }}
.lead {{ color: #a1a1aa; margin: 0 32px 24px; }}
.sw {{ display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: -1px; margin-right: 6px; box-shadow: 0 0 0 1px #3f3f46; }}
.spot {{ margin: 0 0 28px; }}
.spot b {{ display: block; font: 500 12px/16px system-ui; color: #a1a1aa; margin: 0 32px 8px; }}
iframe {{ display: block; width: 100%; height: 150px; border: 0; border-top: 1px solid #18181b; border-bottom: 1px solid #18181b; background: #000; }}
</style></head><body>
<h1>{name}</h1>
<p class="lead"><span class="sw" style="background:{bg}"></span>Фон ряда {bg} — {note}. Плашка выбранного и всё остальное — как сейчас. Ниже — сегмент на каждой странице продукта, где он стоит.</p>
{spots}
<script>
const BG = {bgj};
for (const f of document.querySelectorAll('iframe')) f.addEventListener('load', () => {{
  const d = f.contentDocument, st = d.createElement('style'); st.textContent = '.segment{{--seg-bg:' + BG + ' !important}}' + {extraj}; d.head.appendChild(st)
  let n = 0; const t = setInterval(() => {{ const s = d.querySelectorAll('.segment')[+f.dataset.i]; if (s || ++n > 50) {{ clearInterval(t)
    if (s) {{ for (const el of d.querySelectorAll('body *')) {{ const ps = f.contentWindow.getComputedStyle(el).position; if (ps === 'sticky' || ps === 'fixed') el.style.position = 'relative' }}
      const r = s.getBoundingClientRect(); f.contentWindow.scrollTo(0, Math.max(0, r.top + f.contentWindow.scrollY - 50)) }} }} }}, 100)
}})
</script>
</body></html>
'''
for fn, name, bg, note in VARS:
    spots = '\n'.join(f'<div class="spot"><b>{lbl}</b><iframe data-i="{i}" src="../ui-pages/{pg}.html" loading="lazy" scrolling="no"></iframe></div>' for pg, i, lbl in SPOTS)
    (HERE / f'{fn}.html').write_text(PAGE.format(name=name, bg=bg, note=note, spots=spots, bgj=json.dumps(bg), extraj=json.dumps(EXTRA.get(fn, ''))))
print('ok')

# v14, v15 (дирижёр 24.11): v13 с блик 40/30 %; v15 — + одна высота, как вкладки матча
# v13 (дирижёр 24.11: «самому выбрать цвет блика — яркость от белого до чёрного и прозрачность десятками») — оси «Блик: яркость», «Блик: непрозрачность»
# v12 (дирижёр 24.11: «полупрозрачность у блика, не у плашки; плашка того же цвета») — ось «Блик», плашка как есть
# v11 (дирижёр 24.11: «блик полупрозрачным или темнее — много внимания забирает») — как v10 + ось «Плашка» выбранного
# v10 (дирижёр 24.11; v9 — выбор на странице, снят: настройки — в «Настройки примера», window.LAB)
# v9 (дирижёр 24.11): «О турнире» (кнопка шапки турнира) и «О серии» (сегмент матча) рядом, один общий цвет — выбирается сверху
V9 = '''<!doctype html>
<html lang="ru"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Сегмент · __NAME__</title>
<style>
body { margin: 0; padding: 32px 0 64px; background: #000; color: #fafafa; font: 400 13px/18px system-ui, sans-serif; }
h1 { font: 600 20px/28px system-ui; margin: 0 32px 4px; }
.lead { color: #a1a1aa; margin: 0 32px 16px; }
.spot { margin: 0 0 28px; }
.spot b { display: block; font: 500 12px/16px system-ui; color: #a1a1aa; margin: 0 32px 8px; }
iframe { display: block; width: 100%; height: 230px; border: 0; border-top: 1px solid #18181b; border-bottom: 1px solid #18181b; background: #000; }
</style></head><body>
<h1>__NAME__</h1>
<p class="lead">Кнопка «О турнире» и ряд сегмента «О серии» одним цветом. Сейчас они разные: у кнопки #27272a, у сегмента #18181b. Цвет и блик у выбранного — в «Настройках примера»; плашка — того же цвета, что сейчас.</p>
<div class="spot"><b>Турнир — кнопка «О турнире»</b><iframe data-sel=".ph-d .ph2-rt > .ph2-btn" src="../ui-pages/tournament-engine.html" scrolling="no"></iframe></div>
<div class="spot"><b>Матч — «О серии · карты»</b><iframe data-sel=".segment" src="../ui-pages/match-engine.html" scrolling="no"></iframe></div>
<script>
const HI = __HI__
const OPTS = [['Как сейчас', null], ['#18181b', '#18181b'], ['#1b1b1d', '#1b1b1d'], ['#202023', '#202023'], ['#232326', '#232326'], ['#27272a', '#27272a']]
let cur = '#202023', hi = 'now'
const GL = (a, b) => 'linear-gradient(135deg,rgba(255,255,255,' + a + '),rgba(255,255,255,0) 30%,rgba(255,255,255,0) 70%,rgba(255,255,255,' + b + ')) border-box'
// блик: цвет серый от белого (100 %) до чёрного (0 %), непрозрачность сверху слева; снизу справа — 3/7 от неё, как в v7
let gl = 40, ga = 30
const PB = 'background:linear-gradient(var(--c-surface),var(--c-surface)) padding-box,'
const TEN = [...Array(11)].map((_, i) => 100 - i * 10)
const thumb = () => { const v = Math.round(gl * 2.55), c = (a) => 'rgba(' + v + ',' + v + ',' + v + ',' + a + ')'
  return PB + 'linear-gradient(135deg,' + c(ga / 100) + ',' + c(0) + ' 30%,' + c(0) + ' 70%,' + c(ga / 100 * 3 / 7) + ') border-box !important' }
const css = () => (cur ? '.ph2-btn:not(.ph2-btn--live):not(:hover):not([data-state="open"]){background:' + cur + ' !important}.segment{--seg-bg:' + cur + ' !important}' : '') + '.segment__thumb{' + thumb() + '}' + (hi === 'eq' ? '.segment{min-height:34px;box-sizing:border-box}.segment--sm{border-radius:var(--radius-10)}.segment--sm .segment__thumb{border-radius:var(--radius-8)}.segment .segment__btn{min-height:28px;height:auto;padding:0 var(--space-10);border-radius:var(--radius-8)}.ph2-btn{min-height:34px;border-radius:var(--radius-10)}' : '')
const paint = () => { for (const f of document.querySelectorAll('iframe')) { const st = f.contentDocument?.getElementById('v9'); if (st) st.textContent = css() } }
window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
  axes: () => [{ key: 'c', name: 'Цвет', value: cur || 'now', options: OPTS.map(([t, v]) => ({ v: v || 'now', label: t })) },
    { key: 'gl', name: 'Блик: яркость', value: String(gl), options: TEN.map((n) => ({ v: String(n), label: n === 100 ? 'Белый · 100 %' : n === 0 ? 'Чёрный · 0 %' : n + ' %' })) },
    ...(HI ? [{ key: 'hi', name: 'Высота', value: hi, options: [{ v: 'now', label: 'Как сейчас' }, { v: 'eq', label: 'Как «О серии» · ряд 34' }] }] : []),
    { key: 'ga', name: 'Блик: непрозрачность', value: String(ga), options: TEN.map((n) => ({ v: String(n), label: n + ' %' })) }],
  set(k, x) { if (k === 'hi') hi = x; else if (k === 'gl') gl = +x; else if (k === 'ga') ga = +x; else cur = x === 'now' ? null : x; paint() }, toggles: () => [], toggle() {}, caption: () => '' }
for (const f of document.querySelectorAll('iframe')) f.addEventListener('load', () => {
  const d = f.contentDocument, st = d.createElement('style'); st.id = 'v9'; st.textContent = css(); d.head.appendChild(st)
  let n = 0; const t = setInterval(() => { const s = d.querySelector(f.dataset.sel); if (s || ++n > 50) { clearInterval(t)
    if (s) { for (const el of d.querySelectorAll('body *')) { const ps = f.contentWindow.getComputedStyle(el).position; if (ps === 'sticky' || ps === 'fixed') el.style.position = 'relative' }
      const r = s.getBoundingClientRect(); f.contentWindow.scrollTo(0, Math.max(0, r.top + f.contentWindow.scrollY - 50)) } } }, 100)
})
</script>
</body></html>
'''
# v14 — v13 с выбранным дирижёром 24.11 (#202023, блик 40 % · 30 %); v15 — то же + «Высота»: всё как вкладки матча
(HERE / 'v14-блик-40-30.html').write_text(V9.replace('__NAME__', 'v14 · Блик 40 / 30 %').replace('__HI__', 'false'))
(HERE / 'v15-высота-как-о-серии.html').write_text(V9.replace('__NAME__', 'v15 · Высота как «О серии»').replace('__HI__', 'true').replace("hi = 'now'", "hi = 'eq'"))

# v16 (дирижёр 24.11: «покажи, как v15 будет выглядеть по итогу»): v15 с выбранным, без настроек — на всех страницах, где стоит сегмент
V16_CSS = ('.ph2-btn:not(.ph2-btn--live):not(:hover):not([data-state="open"]){background:#202023 !important}'
  '.segment__thumb{background:linear-gradient(var(--c-surface),var(--c-surface)) padding-box,linear-gradient(135deg,rgba(102,102,102,.3),rgba(102,102,102,0) 30%,rgba(102,102,102,0) 70%,rgba(102,102,102,.129)) border-box !important}'
  '.segment{min-height:34px;box-sizing:border-box}.segment--sm{border-radius:var(--radius-10)}.segment--sm .segment__thumb{border-radius:var(--radius-8)}'
  '.segment .segment__btn{min-height:28px;height:auto;padding:0 var(--space-10);border-radius:var(--radius-8)}.ph2-btn{min-height:34px;border-radius:var(--radius-10)}')
spots = '\n'.join([f'<div class="spot"><b>Турнир — шапка с «О турнире»</b><iframe data-i="-1" src="../ui-pages/tournament-engine.html" loading="lazy" scrolling="no"></iframe></div>']
  + [f'<div class="spot"><b>{lbl}</b><iframe data-i="{i}" src="../ui-pages/{pg}.html" loading="lazy" scrolling="no"></iframe></div>' for pg, i, lbl in SPOTS])
if False:  # v16 снят 24.11 — перенесён в tour-chat-24 v12
 (HERE / 'v16-итог.html').write_text(PAGE.format(name='v16 · Итог', bg='#202023',
  note='как v15 с выбранным: блик яркость 40 % · непрозрачность 30 %, ряд не ниже 34, пункт 28, кнопки шапки 34 и того же цвета', spots=spots,
  bgj=json.dumps('#202023'), extraj=json.dumps(V16_CSS)).replace('height: 150px', 'height: 230px').replace(' Плашка выбранного и всё остальное — как сейчас.', ''))
