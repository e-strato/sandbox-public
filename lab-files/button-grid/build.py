# Лаба «Кнопки: размерная сетка» (дирижёр 23.11): v1 — как было (атом Button v2 из ui/), v2 — как станет (сетка по логике Material).
# Токены, CSS кнопки и иконки берутся из ui/ при сборке, ui/ не трогаем. Запуск: python3 sandbox-project/lab/button-grid/build.py
import json, re, pathlib
HERE = pathlib.Path(__file__).parent
UI = HERE.parents[2] / 'ui' / 'src'
TOK = (UI / 'tokens/tokens.css').read_text()
BTN = (UI / 'atoms/Button/v2/Button.css').read_text()
SRC = (UI / 'atoms/Icon/v1/Icon.tsx').read_text()
ICONS = {m.group(1): json.loads(m.group(2)) for m in re.finditer(r"^\s+'?([\w-]+)'?: \{ vb: \[24, 24\][^\n]*?__html: (\".*?\") \}\} />", SRC, re.M)}

def ic(name, size):
    return f'<svg class="ic" width="{size}" height="{size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{ICONS[name]}</svg>'

HEAD = '''<!doctype html>
<html lang="ru"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" />
<style>
{tok}
body {{ padding: 40px 48px 80px; }}
h1 {{ font: var(--type-title-2, 600 22px/28px var(--font-sans)); margin: 0 0 6px; }}
h2 {{ font: var(--type-subtitle-2); margin: 40px 0 6px; }}
.lead {{ color: var(--c-text-2); font: var(--type-body-1); margin: 0 0 16px; max-width: 820px; }}
.panel {{ background: var(--c-surface); border-radius: 12px; padding: 20px 24px; overflow-x: auto; }}
.grid {{ display: grid; align-items: center; gap: 14px 20px; }}
.lbl {{ color: var(--c-text-2); font: var(--type-caption-1); white-space: nowrap; }}
.ch {{ color: var(--c-text-3, var(--c-text-2)); font: var(--type-caption-2); white-space: nowrap; }}
table.spec {{ border-collapse: collapse; font: var(--type-body-1); }}
table.spec th, table.spec td {{ padding: 8px 16px 8px 0; text-align: left; border-bottom: 1px solid var(--c-border); white-space: nowrap; }}
table.spec th {{ color: var(--c-text-2); font: var(--type-caption-1-medium); }}
table.spec td.n {{ font: var(--num-body-1, var(--type-body-1)); }}
.bad {{ color: var(--c-danger); }}
.ok {{ color: var(--c-success); }}
.ic {{ flex: none; display: block; }}
{extra}
</style></head><body>
'''

# ───────────────────────── v1: как было ─────────────────────────
OLD_SIZES = [('xs', 20, '8', '5', 'Tag · моно', 't-part__ib--text'), ('sm', 28, '10', '6', 'Caption 1 Medium', 'фильтры, «Сбросить»'),
             ('md', 32, '14', '8', 'Body 1 Medium', '«Мои прогнозы»'), ('lg', 36, '16', '10', 'Body 1 Strong', '«Войти»'),
             ('xl', 40, '20', '10', 'Body 1 Medium', '«Показать ещё»'), ('2xl', 50, '14', '10', 'Subtitle 2', '«Да» / «Нет»')]
OLD_ICON = [('icon-xs', 22, '6', 'шапка матча: назад'), ('icon-sm', 24, '6', 'свернуть панель'), ('icon-md', 28, '8', 'турнир: назад'), ('icon-lg', 32, '8', 'закрыть прогноз')]
VARS = ['primary', 'secondary', 'tonal', 'outline', 'ghost', 'chip']

def v1():
    rows = ''
    for v in VARS:
        rows += f'<div class="lbl">{v.capitalize()}</div>' + ''.join(f'<div><button class="btn btn--{v} btn--{s}">Показать ещё</button></div>' for s, *_ in OLD_SIZES)
    head = '<div></div>' + ''.join(f'<div class="ch">{s} · {h}</div>' for s, h, *_ in OLD_SIZES)
    icons = '<div class="lbl">Под иконку</div>' + ''.join(f'<div><button class="btn btn--secondary btn--{s}">{ic("reset", 16)}</button> <span class="ch">{s} · {h}</span></div>' for s, h, *_ in OLD_ICON)
    withi = '<div class="lbl">С иконкой</div>' + ''.join(f'<div><button class="btn btn--secondary btn--{s}">{ic("plus", 16)}Добавить</button></div>' for s, *_ in OLD_SIZES)
    spec = ''.join(f'<tr><td>{s}</td><td class="n">{h}</td><td class="n">{p}</td><td class="n">{r}</td><td>{f}</td><td class="n">16 всегда</td><td class="lbl">{src}</td></tr>' for s, h, p, r, f, src in OLD_SIZES)
    spec += ''.join(f'<tr><td>{s}</td><td class="n">{h}×{h}</td><td class="n">—</td><td class="n">{r}</td><td>—</td><td class="n">16 всегда</td><td class="lbl">{src}</td></tr>' for s, h, r, src in OLD_ICON)
    body = f'''<h1>Как было: кнопка v2</h1>
<p class="lead">Атом собран 12.11 из готовых кнопок продукта один в один: у каждого размера — своя кнопка-источник. Поэтому 6 высот текста и 4 высоты иконок не совпадают, шаг не постоянный, места под иконку нет — иконку кладут прямо в текст, всегда 16.</p>
<div class="panel"><div class="grid" style="grid-template-columns:100px repeat(6,max-content)">{head}{rows}{withi}</div>
<div class="grid" style="grid-template-columns:100px repeat(4,max-content);margin-top:20px">{icons}</div></div>
<h2>Размеры сейчас</h2>
<p class="lead"><span class="bad">Высоты 20 · 28 · 32 · 36 · 40 · 50 и 22 · 24 · 28 · 32</span> — текстовая и квадратная кнопка одной высоты не стоят рядом ровно (28 и 28 есть, 36 и 40 — нет). Отступы и скругления — свои у каждой.</p>
<div class="panel"><table class="spec"><tr><th>Размер</th><th>Высота</th><th>Отступ по бокам</th><th>Скругление</th><th>Текст</th><th>Иконка</th><th>Откуда</th></tr>{spec}</table></div>
'''
    return HEAD.format(title='Кнопки · как было', tok=TOK, extra=BTN) + body + '</body></html>'

# ───────────────────────── v2: как станет ─────────────────────────
# Сетка на 8 (шаг 8, как у Material): высота · отступ · отступ со стороны иконки · промежуток · иконка · скругление · текст
NEW = [('XS', 24, 8, 6, 4, 16, 6, 'Caption 1 Medium', '--type-caption-1-medium'),
       ('S', 32, 12, 8, 6, 18, 8, 'Body 1 Medium', '--type-body-1-medium'),
       ('M', 40, 16, 12, 8, 20, 10, 'Body 1 Medium', '--type-body-1-medium'),
       ('L', 48, 20, 16, 8, 24, 12, 'Subtitle 2', '--type-subtitle-2')]
CSS2 = '''
.b { --h: 32px; --px: 12px; --pi: 8px; --g: 6px; --r: 8px; flex: none; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center;
  gap: var(--g); height: var(--h); padding: 0 var(--px); border: 0; border-radius: var(--r); background: none; color: var(--c-text); white-space: nowrap; cursor: pointer; }
.b.has-s { padding-left: var(--pi); } .b.has-e { padding-right: var(--pi); }
.b.only { width: var(--h); padding: 0; }
''' + ''.join(f'.b--{k.lower()} {{ --h: {h}px; --px: {px}px; --pi: {pi}px; --g: {g}px; --r: {r}px; font: var({tok}); }}\n' for k, h, px, pi, g, i, r, _, tok in NEW) + '''
.b--primary { background: var(--c-brand); color: var(--c-on-brand); }
.b--secondary { background: var(--c-surface-2); }
.b--secondary.is-h { background: var(--w-muted); }
.b--tonal { background: var(--w-muted); } .b--tonal.is-h { background: var(--w-ring); }
.b--outline { box-shadow: inset 0 0 0 1px var(--c-border); } .b--outline.is-h { background: var(--c-surface-2); }
.b--ghost { color: var(--c-text-2); } .b--ghost.is-h { background: var(--w-muted); color: var(--c-text); }
.b--chip { box-shadow: inset 0 0 0 1px var(--c-border); color: var(--c-text-2); } .b--chip.is-on { box-shadow: none; background: var(--w-muted); color: var(--c-text); }
.b--primary.is-h { filter: brightness(1.15); }
.b.is-p { filter: brightness(.9); }
.b.is-d { opacity: .35; cursor: default; }
.b--radiant { background: color-mix(in srgb, var(--c-radiant) 14%, transparent); color: var(--c-radiant); }
.b--dire { background: color-mix(in srgb, var(--c-dire) 14%, transparent); color: var(--c-dire); }
.anat { display: inline-flex; position: relative; }
.anat .b { outline: 1px dashed color-mix(in srgb, var(--c-accent) 70%, transparent); }
'''

def btn(v, k, kind, extra=''):
    i = next(x[5] for x in NEW if x[0] == k)
    if kind == 'text':  return f'<button class="b b--{k.lower()} b--{v} {extra}">Показать ещё</button>'
    if kind == 'start': return f'<button class="b b--{k.lower()} b--{v} has-s {extra}">{ic("plus", i)}Добавить</button>'
    if kind == 'end':   return f'<button class="b b--{k.lower()} b--{v} has-e {extra}">Все турниры{ic("chevron-right", i)}</button>'
    return f'<button class="b b--{k.lower()} b--{v} only {extra}" aria-label="Обновить">{ic("reset", i)}</button>'

def v2():
    spec = ''.join(f'<tr><td>{k}</td><td class="n">{h}</td><td class="n">{px}</td><td class="n">{pi}</td><td class="n">{g}</td><td class="n">{i}</td><td class="n">{r}</td><td>{f}</td><td class="n">{h}×{h} · иконка {i}</td></tr>' for k, h, px, pi, g, i, r, f, _ in NEW)
    sizes = ''
    for k, *_ in NEW:
        sizes += f'<div class="lbl">{k}</div>' + ''.join(f'<div>{btn("secondary", k, t)}</div>' for t in ('text', 'start', 'end', 'only'))
    vars_ = ''
    for v in ['primary', 'secondary', 'tonal', 'outline', 'ghost', 'chip', 'radiant', 'dire']:
        vars_ += f'<div class="lbl">{v.capitalize()}</div>' + ''.join(f'<div>{btn(v, "S", t)}</div>' for t in ('text', 'start', 'end', 'only'))
    states = ''
    for v in ['primary', 'secondary', 'outline', 'ghost']:
        states += f'<div class="lbl">{v.capitalize()}</div>' + ''.join(f'<div>{btn(v, "S", "start", c)}</div>' for c in ('', 'is-h', 'is-p', 'is-d'))
    states += '<div class="lbl">Chip</div>' + f'<div>{btn("chip", "S", "text")}</div><div>{btn("chip", "S", "text", "is-on")}</div><div></div><div>{btn("chip", "S", "text", "is-d")}</div>'
    MAP = [('xs 20', 'XS 24', '+4'), ('sm 28', 'XS 24 или S 32 — решить: фильтры плотнее или крупнее', '−4 / +4'), ('md 32', 'S 32', '='), ('lg 36', 'S 32', '−4'),
           ('xl 40', 'M 40', '='), ('2xl 50', 'L 48', '−2'), ('icon-xs 22', 'XS 24', '+2'), ('icon-sm 24', 'XS 24', '='), ('icon-md 28', 'S 32', '+4'), ('icon-lg 32', 'S 32', '=')]
    mp = ''.join(f'<tr><td>{a}</td><td>{b}</td><td class="n">{c}</td></tr>' for a, b, c in MAP)
    body = f'''<h1>Как станет: размерная сетка кнопок</h1>
<p class="lead">Логика Material: шаг высоты 8 (24 · 32 · 40 · 48), на каждый размер — один набор: отступ, промежуток, иконка, скругление, текст. Иконка — свои места слева и справа (iconStart / iconEnd); со стороны иконки отступ меньше на 4 — на глаз кнопка ровная, как у Material. Квадратная кнопка-иконка — той же высоты, что текстовая: в ряду встают ровно.</p>
<div class="panel"><table class="spec"><tr><th>Размер</th><th>Высота</th><th>Отступ</th><th>Со стороны иконки</th><th>Промежуток</th><th>Иконка</th><th>Скругление</th><th>Текст</th><th>Только иконка</th></tr>{spec}</table></div>
<h2>Размеры × иконка</h2>
<p class="lead">Текст · иконка слева · иконка справа · только иконка.</p>
<div class="panel"><div class="grid" style="grid-template-columns:60px repeat(4,max-content)"><div></div><div class="ch">Текст</div><div class="ch">Иконка слева</div><div class="ch">Иконка справа</div><div class="ch">Только иконка</div>{sizes}</div></div>
<h2>Виды — размер S</h2>
<p class="lead">Виды прежние. «Да / Нет» — это primary / secondary размера L, отдельного вида не нужно; Radiant / Dire — цветом стороны.</p>
<div class="panel"><div class="grid" style="grid-template-columns:100px repeat(4,max-content)">{vars_}</div></div>
<h2>Состояния</h2>
<p class="lead">Обычная · наведение · нажатие · отключена. Chip — ещё «выбран».</p>
<div class="panel"><div class="grid" style="grid-template-columns:100px repeat(4,max-content)"><div></div><div class="ch">Обычная</div><div class="ch">Наведение</div><div class="ch">Нажатие</div><div class="ch">Отключена</div>{states}</div></div>
<h2>Что куда переедет</h2>
<p class="lead">Было 10 размеров — станет 4. Разница по высоте на страницах продукта:</p>
<div class="panel"><table class="spec"><tr><th>Было</th><th>Станет</th><th>Высота</th></tr>{mp}</table></div>
'''
    return HEAD.format(title='Кнопки · как станет', tok=TOK, extra=CSS2) + body + '</body></html>'

(HERE / 'v1-как-было.html').write_text(v1())
(HERE / 'v2-как-станет.html').write_text(v2())
print('ok', len(ICONS))
