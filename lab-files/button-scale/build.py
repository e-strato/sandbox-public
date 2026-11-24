# Лаба «(C) Кнопки: сдвиг сетки» (дирижёр 24.11: «как кнопки сейчас и как со смещением, и где используются — как будут выглядеть»).
# Сверху — сетка кнопок атома Button v3 (CSS и токены из ui/, ui/ не трогаем), рядом сегмент и кнопка шапки «О турнире».
# Ниже — настоящие страницы (ui-pages) в рамке, в них подставлены высоты варианта. Запуск: python3 sandbox-project/lab/button-scale/build.py
import json, re, pathlib
HERE = pathlib.Path(__file__).parent
UI = HERE.parents[2] / 'ui' / 'src'
TOK = (UI / 'tokens/tokens.css').read_text()
BTN = (UI / 'atoms/Button/v3/Button.css').read_text()
SEG = (UI / 'atoms/Segment/v2/Segment.css').read_text()
SRC = (UI / 'atoms/Icon/v1/Icon.tsx').read_text()
ICONS = {m.group(1): json.loads(m.group(2)) for m in re.finditer(r"^\s+'?([\w-]+)'?: \{ vb: \[24, 24\][^\n]*?__html: (\".*?\") \}\} />", SRC, re.M)}
ic = lambda n: f'<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{ICONS[n]}</svg>'

# вариант: файл · имя · высоты xs/sm/md/lg · сегмент и кнопки шапки (None — как сейчас) · пояснение
VARS = [
  ('v1-сейчас', 'v1 · Сейчас', (24, 32, 40, 48), None, 'Сетка 24 · 32 · 40 · 48. Сегмент — ряд 34 (маленький 30), кнопки шапки «О турнире» — 28: мимо сетки.'),
  ('v3-сдвиг-2', 'v3 · Сдвиг +2', (26, 34, 42, 50), 34, 'Вся сетка на 2 выше: 26 · 34 · 42 · 50, шаг 8 ровный. Сегмент (ряд 34, пункт 28) и кнопки шапки — S 34.'),
]
SZ = ['xs', 'sm', 'md', 'lg']
PAGES = [('tournament-engine', 'Турнир'), ('match-engine', 'Матч'), ('tournaments-engine', 'Список турниров'), ('schedule-engine', 'Расписание'),
  ('player-engine', 'Игрок'), ('team-engine', 'Команда'), ('hero-engine', 'Герой'), ('news', 'Новости (сайт)'), ('match', 'Матч (сайт)')]

def over(h, seg):
    """CSS варианта: высоты кнопок; сегмент и кнопки шапки — по S"""
    css = ''.join(f'.btn--{s}{{--btn-h:{v}px}}' for s, v in zip(SZ, h))
    if seg:
        pad = (seg - 28) // 2
        css += (f'.segment{{min-height:{seg}px;box-sizing:border-box;padding:{pad}px}}.segment__thumb{{top:{pad}px;bottom:{pad}px}}'
                '.segment--sm{border-radius:var(--radius-10)}.segment--sm .segment__thumb{border-radius:var(--radius-8)}'
                '.segment .segment__btn{min-height:28px;height:auto;padding:0 var(--space-10);border-radius:var(--radius-8)}'
                f'.ph2-btn{{min-height:{seg}px;border-radius:var(--radius-10)}}')
    return css

PAGE = '''<!doctype html>
<html lang="ru"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Кнопки · {name}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" />
<style>
{tok}
{btn}
{seg}
.ph2-btn {{ display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 var(--space-10); border: 0; border-radius: var(--radius-8); background: var(--w-muted); color: var(--c-text); font: var(--type-caption-1-medium); }}
{over}
body {{ margin: 0; padding: 32px 0 64px; background: #000; color: var(--c-text); font: var(--type-body-1); }}
h1 {{ font: 600 20px/28px var(--font-sans, system-ui); margin: 0 32px 4px; }}
h2 {{ font: var(--type-subtitle-2); margin: 32px 32px 8px; }}
.lead {{ color: var(--c-text-2); margin: 0 32px 20px; max-width: 900px; }}
.panel {{ margin: 0 32px; padding: 20px 24px; border-radius: 12px; background: var(--c-surface); overflow-x: auto; }}
.grid {{ display: grid; grid-template-columns: 96px repeat(5, max-content); align-items: center; gap: 14px 20px; }}
.lbl {{ color: var(--c-text-2); font: var(--type-caption-1); white-space: nowrap; }}
.lbl b {{ color: var(--c-text); font-weight: 600; }}
.row {{ display: flex; align-items: center; gap: 12px; }}
.spot {{ margin: 0 0 24px; }}
.spot b {{ display: block; font: 500 12px/16px system-ui; color: var(--c-text-2); margin: 0 32px 8px; }}
iframe {{ display: block; width: 100%; height: 560px; border: 0; border-top: 1px solid #18181b; border-bottom: 1px solid #18181b; background: #000; }}
</style></head><body>
<h1>{name}</h1>
<p class="lead">{note}</p>
<h2>Сетка</h2>
<div class="panel"><div class="grid">{grid}</div>
<div class="row" style="margin-top:20px"><span class="lbl" style="width:96px">Рядом</span>
<button class="btn btn--tonal btn--sm">Кнопка S</button>
<div class="segment" role="tablist"><span class="segment__thumb" style="width:{thw}px;transform:translateX({thx}px)"></span><button class="segment__btn is-on" style="width:{thw}px">Групповой этап</button><button class="segment__btn">Плей-офф</button></div>
<button class="ph2-btn">{info}О турнире</button></div></div>
<h2>На страницах</h2>
{spots}
<script>
const CSS = {cssj}
for (const f of document.querySelectorAll('iframe')) f.addEventListener('load', () => {{ const d = f.contentDocument, st = d.createElement('style'); st.textContent = CSS; d.head.appendChild(st) }})
</script>
</body></html>
'''
for fn, name, h, seg, note in VARS:
    grid = '<span></span>' + ''.join(f'<span class="lbl">{k}</span>' for k in ['Primary', 'Tonal', 'Outline', 'Иконка слева', 'Только иконка'])
    for s, v in zip(SZ, h):
        grid += (f'<span class="lbl"><b>{s.upper()}</b> · {v}</span>'
          f'<span><button class="btn btn--primary btn--{s}">Взять в состав</button></span>'
          f'<span><button class="btn btn--tonal btn--{s}">Показать ещё</button></span>'
          f'<span><button class="btn btn--outline btn--{s}">Все турниры</button></span>'
          f'<span><button class="btn btn--tonal btn--{s} has-start">{ic("plus")}Добавить</button></span>'
          f'<span><button class="btn btn--tonal btn--{s} btn--icon" aria-label="Обновить">{ic("reset")}</button></span>')
    spots = '\n'.join(f'<div class="spot"><b>{lbl}</b><iframe src="../ui-pages/{pg}.html" loading="lazy"></iframe></div>' for pg, lbl in PAGES)
    (HERE / f'{fn}.html').write_text(PAGE.format(name=name, note=note, tok=TOK, btn=BTN, seg=SEG, over=over(h, seg), grid=grid, spots=spots,
      thw=110, thx=0, info=ic('info') if 'info' in ICONS else '', cssj=json.dumps(over(h, seg))))
print('ok')
