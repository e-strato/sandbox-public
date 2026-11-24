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
