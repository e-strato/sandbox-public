# Лаба «О серии — статистика как у Sentry Bot» (96-1, начальник 24.11, разбор calls/2026-11-24-chat блок 1).
# v0 — настоящая страница матча движка до начала (ui-pages/match-engine.html?state=pre0), вкладка «О серии», как сейчас.
# v00 — снимки Sentry Bot. v1 (снят 24.11: «не то») — в _отклонено/. v2 — блок «Составы» заменён «Статистикой» один в один по виду с Sentry Bot.
# Блок v1 подставляется в страницу скриптом (составы и фото берутся из самой страницы), ui/ не тронут. Цифры и герои — пример.
# Запуск: python3 sandbox-project/lab/match-series-stats/build.py
import pathlib, json
HERE = pathlib.Path(__file__).parent

CSS = r'''
.sx { margin-top: var(--space-28); }
.sx--one { margin-top: 0; }
.sx__kick { display: flex; flex-direction: column; align-items: center; gap: var(--space-8); padding: var(--space-40, 40px) var(--space-16); margin-bottom: var(--space-28); border: 1px solid color-mix(in srgb, var(--c-text) 9%, transparent); border-radius: var(--radius-12); background: var(--w-surface); text-align: center; }
.sx__kick small { font: var(--type-caption-1); color: var(--c-text-2); }
.sx__kick em { font: 500 13px/18px var(--font-mono); font-style: normal; color: var(--c-brand); }
.sx__kick b { font: 500 44px/52px var(--font-mono); color: var(--c-text); }
.sx__kick p { margin: 0; font: var(--type-caption-1); color: var(--c-text-3); }
.sx__sub { margin: var(--space-20) 0 var(--space-10); font: var(--type-caption-1-medium, 500 12px/16px var(--font-sans)); color: var(--c-text-2); }
.sx__top + .sx__sub { margin-top: 0; }
.sx__top { display: flex; align-items: center; gap: var(--space-16); margin-bottom: var(--space-12); }
.sx__top h3 { margin: 0; color: var(--c-text); font: var(--type-subtitle-1); }
.sx__per { margin-left: auto; }
.sx__grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-16); }
.sx__card { min-width: 0; border: 1px solid color-mix(in srgb, var(--c-text) 9%, transparent); border-radius: var(--radius-12); background: var(--w-surface); overflow: hidden; }
.sx__hd { display: flex; align-items: center; justify-content: space-between; gap: var(--space-8); height: 36px; padding: 0 var(--space-16); background: color-mix(in srgb, var(--c-text) 4%, transparent); }
.sx__hd .etag { min-width: 0; pointer-events: none; }
.sx__cap { color: var(--c-text-3); font: var(--type-caption-2); white-space: nowrap; }
.sx__row { display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; align-items: center; height: 67px; padding-right: var(--space-12); border-top: 1px solid color-mix(in srgb, var(--c-text) 7%, transparent); cursor: pointer; }
.sx__row:hover { background: color-mix(in srgb, var(--c-text) 3%, transparent); }
.sx__row.is-on { background: color-mix(in srgb, var(--c-text) 8%, transparent); }
.sx__pos { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.sx__pos b { font: 500 17px/20px var(--font-mono); color: var(--c-text); }
.sx__pos small { font: var(--type-caption-2); color: var(--c-text-3); }
.sx__nick { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center; font: var(--type-body-1-medium, 500 13px/18px var(--font-sans)); color: var(--c-text); }
.sx__heroes { display: grid; grid-template-columns: auto auto; gap: var(--space-6) var(--space-8); }
.sx__h { display: flex; align-items: center; gap: var(--space-6); font: 400 12px/16px var(--font-mono); color: var(--c-text-3); white-space: nowrap; }
.sx__h img { width: 36px; height: 22px; border-radius: 3px; object-fit: cover; }
.sx__h b { color: var(--c-text); font-weight: 400; }
.sx__h span { color: var(--w-green); }
.sx__cmp { padding: 0 var(--space-16) var(--space-16); }
.sx__vs { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--space-8); height: 72px; margin-bottom: var(--space-8); border-bottom: 1px solid color-mix(in srgb, var(--c-text) 7%, transparent); }
.sx__vs > div { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.sx__vs > div:last-child { align-items: flex-end; text-align: right; }
.sx__vs b { font: 600 18px/24px var(--font-sans); color: var(--c-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sx__vs small { font: var(--type-caption-2); color: var(--c-text-2); }
.sx__vs em { font: var(--type-caption-2-medium); font-style: normal; color: var(--c-text-2); }
.sx__cmp.is-team { padding-top: var(--space-16); }
.sx__m { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 31px; margin-top: 2px; padding: 0 var(--space-6); border-radius: var(--radius-6); }
.sx__m:nth-child(odd) { background: color-mix(in srgb, var(--c-text) 4%, transparent); }
.sx__m > span { font: var(--type-caption-2); color: var(--c-text-3); text-align: center; }
.sx__m > b { justify-self: center; min-width: 44px; padding: 2px 6px; border-radius: 4px; box-sizing: border-box; text-align: center; font: 400 13px/18px var(--font-mono); color: var(--c-text-2); }
.sx__m > b.is-best { color: var(--c-text); background: color-mix(in srgb, var(--c-brand) 35%, transparent); }
.sx__team { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-16); height: 228px; }
.sx__team img { width: 64px; height: 64px; object-fit: contain; }
.sx__team b { font: 600 16px/22px var(--font-sans); color: var(--c-text); }
.sx__best { margin: 0 var(--space-28); padding: var(--space-8) 0 var(--space-16); border-top: 1px solid color-mix(in srgb, var(--c-text) 9%, transparent); }
.sx__best .sx__cap { display: block; text-align: center; margin-bottom: var(--space-12); }
.sx__best .sx__heroes { justify-content: center; gap: var(--space-10) var(--space-28); }

/* v4–v6: заголовки «Игроки» / «Команды» крупно, ник — тег с фото, герои — иконки, цифры в колонках */
.sx4hd { display: flex; align-items: center; gap: var(--space-16); margin: var(--space-32, 32px) 0 var(--space-16); }
.sx4hd h3 { margin: 0; font: 600 22px/28px var(--font-sans); color: var(--c-text); }
.sx4r { grid-template-columns: minmax(0, 1fr) auto; gap: var(--space-12); height: 64px; padding: 0 var(--space-16); }
.sx4t { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; min-width: 0; }
.sx4t .etag { max-width: 100%; }
.sx4t .etag { min-width: 0; pointer-events: none; }
.sx4t small { padding-left: 48px; font: var(--type-caption-2); color: var(--c-text-3); }
.sx4hs { gap: var(--space-4) var(--space-10); }
.sx4h { display: grid; grid-template-columns: 20px 2ch 3.4ch; align-items: center; gap: var(--space-4); font: 400 12px/16px var(--font-mono); white-space: nowrap; }
.sx4h img { width: 20px; height: 20px; }
.sx4h b { color: var(--c-text); font-weight: 400; text-align: right; }
.sx4h span { color: var(--w-green); text-align: right; }
.sx__best .sx4hs { gap: var(--space-8) var(--space-28); }
/* v5 — четыре героя в ряд: иконка, под ней % побед и карт */
.sx5 .sx4hs { grid-template-columns: repeat(4, 34px); gap: 0 var(--space-2); }
.sx5 .sx__best .sx4hs { grid-template-columns: repeat(6, 40px); gap: 0 var(--space-6); }
.sx5h { display: flex; flex-direction: column; align-items: center; gap: 3px; font: 400 11px/14px var(--font-mono); }
.sx5h img { width: 24px; height: 24px; }
.sx5h > span { display: flex; flex-direction: column; align-items: center; }
.sx5h b { color: var(--w-green); font-weight: 400; }
.sx5h small { color: var(--c-text-3); font: inherit; }
/* v6 — правая команда зеркально: тег справа, герои слева */
.sx6 .is-b .sx4r { grid-template-columns: auto minmax(0, 1fr); }
.sx6 .is-b .sx4r .sx4t { order: 2; align-items: flex-end; text-align: right; }
.sx6 .is-b .sx4r .sx4t .etag { flex-direction: row-reverse; }
.sx6 .is-b .sx4r .sx4t small { padding: 0 48px 0 0; }
.sx6 .is-b .sx__hd { flex-direction: row-reverse; }


/* v7–v9 — ровная сетка, без разделителей и рамок */
.sxn-grid { display: grid; grid-template-columns: 1fr 300px 1fr; gap: var(--space-12); }
.sxn-card { min-width: 0; border-radius: var(--radius-12); background: var(--w-surface); padding: var(--space-12); }
.sxn-hd { display: flex; align-items: center; height: 32px; padding: 0 var(--space-6); }
.sxn-hd .etag, .sxn-p .etag, .sxn-vs .etag, .sxn-vhd .etag { pointer-events: none; min-width: 0; max-width: 100%; }
.sxn-cols { display: grid; grid-template-columns: 132px 1fr; padding: 0 var(--space-6) var(--space-6); }
.sxn-cols small, .sxn-cap, .sxn-tm small { font: var(--type-caption-2); color: var(--c-text-3); }
.sxn-row { display: grid; grid-template-columns: 132px repeat(4, 1fr); align-items: center; height: 58px; padding: 0 var(--space-6); border-radius: var(--radius-8); cursor: pointer; }
.sxn-row:hover { background: color-mix(in srgb, var(--c-text) 3%, transparent); }
.sxn-row.is-on { background: color-mix(in srgb, var(--c-text) 7%, transparent); }
.sxn-p { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.sxn-p small { padding-left: 48px; font: var(--type-caption-2); color: var(--c-text-3); }
.sxn-h { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.sxn-h__i { position: relative; width: 26px; height: 26px; }
.sxn-h__i img { width: 26px; height: 26px; }
.sxn-h__i em { position: absolute; right: -7px; bottom: -3px; min-width: 14px; height: 14px; padding: 0 3px; box-sizing: border-box; border-radius: 7px; background: var(--w-surface-2); font: 500 9px/14px var(--font-mono); font-style: normal; color: var(--c-text-2); text-align: center; }
.sxn-h b { font: 400 11px/14px var(--font-mono); color: var(--w-green); }
.sxn-mid { display: flex; flex-direction: column; gap: 2px; }
.sxn-vs { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--space-8); height: 48px; margin-bottom: var(--space-6); }
.sxn-vs > div { min-width: 0; display: flex; }
.sxn-vs > div:last-child { justify-content: flex-end; }
.sxn-vs > div:last-child .etag { flex-direction: row-reverse; }
.sxn-vs em { font: var(--type-caption-2-medium); font-style: normal; color: var(--c-text-2); }
.sxn-m { display: grid; grid-template-columns: 56px 1fr 56px; align-items: center; height: 30px; }
.sxn-m > span { font: var(--type-caption-2); color: var(--c-text-3); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sxn-m > b { width: 56px; height: 24px; border-radius: 6px; font: 400 13px/24px var(--font-mono); color: var(--c-text-2); text-align: center; }
.sxn-m > b.is-best { color: var(--c-text); background: color-mix(in srgb, var(--c-brand) 35%, transparent); }
.sxn-bar { display: grid; grid-template-columns: 52px 1fr 176px 1fr 52px; align-items: center; gap: var(--space-6); height: 28px; }
.sxn-bar > b { font: 400 13px/18px var(--font-mono); color: var(--c-text-3); }
.sxn-bar > b:last-child { text-align: right; }
.sxn-bar > b.is-best { color: var(--c-text); }
.sxn-bar__t { font: var(--type-caption-2); color: var(--c-text-3); text-align: center; white-space: nowrap; }
.sxn-bar__l, .sxn-bar__r { display: flex; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--c-text) 6%, transparent); }
.sxn-bar__l { justify-content: flex-end; }
.sxn-bar i { display: block; height: 100%; border-radius: 2px; background: color-mix(in srgb, var(--c-text) 22%, transparent); }
.sxn-bar i.is-best { background: var(--c-brand); }
.sxn-mid .sxn-bar { grid-template-columns: 40px 1fr 92px 1fr 40px; gap: var(--space-4); }
.sxn-mid .sxn-bar__t { white-space: normal; line-height: 13px; }
.sxn-tm { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-10); }
.sxn-logo { width: 64px; height: 64px; object-fit: contain; }
.sxn-tm > b, .sxn-tm2 > b { font: 600 16px/22px var(--font-sans); color: var(--c-text); }
.sxn-tm > small { margin-top: var(--space-16); }
.sxn-best { display: grid; grid-template-columns: repeat(6, 38px); justify-content: center; }
.sxn-vs.is-txt > div { flex-direction: column; gap: 1px; }
.sxn-vs.is-txt > div:last-child { align-items: flex-end; text-align: right; }
.sxn-vs.is-txt b { font: 600 15px/20px var(--font-sans); color: var(--c-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.sxn-vs.is-txt small { font: var(--type-caption-2); color: var(--c-text-3); }
/* v8 — одна таблица */
.sxn-wide { padding: var(--space-12) var(--space-16); }
.sxn-wide + .sxn-wide { margin-top: var(--space-12); }
.sxn-vhd, .sxn-vrow { display: grid; grid-template-columns: 168px minmax(0, 1fr) 96px minmax(0, 1fr) 168px; align-items: center; gap: var(--space-12); }
.sxn-vhd { height: 36px; padding: 0 var(--space-6); }
.sxn-vhd > .etag:nth-of-type(2) { justify-self: end; flex-direction: row-reverse; }
.sxn-vhd .sxn-cap:last-child { text-align: right; }
.sxn-vrow { height: 56px; }
.sxn-hs { display: grid; grid-template-columns: repeat(4, 1fr); }
.sxn-role { display: flex; flex-direction: column; align-items: center; }
.sxn-role b { font: 500 15px/18px var(--font-mono); color: var(--c-text); }
.sxn-role small { font: var(--type-caption-2); color: var(--c-text-3); }
.sxn-p.is-b { align-items: flex-end; }
.sxn-p.is-b .etag { flex-direction: row-reverse; }
.sxn-cmp { padding: var(--space-8) var(--space-24, 24px) var(--space-16); }
.sxn-cmp .sxn-vs { max-width: 560px; margin: 0 auto var(--space-6); width: 100%; }
.sxn-cmp .sxn-bar, .sxn-t8m .sxn-bar { max-width: 640px; margin: 0 auto; width: 100%; }
.sxn-t8 { display: grid; grid-template-columns: 240px 1fr 240px; align-items: center; gap: var(--space-16); padding: var(--space-20) var(--space-16); }
.sxn-tm2 { display: flex; flex-direction: column; align-items: center; gap: var(--space-10); }
.sxn-tm2 .sxn-best { grid-template-columns: repeat(3, 38px); row-gap: var(--space-10); margin-top: var(--space-8); }

/* v10 — от v7: игрок — фото + ник и роль ровной колонкой; шапка команды с лого; у команд — список героев с именами */
.sxt { padding: var(--space-8) var(--space-8) var(--space-12); }
.sxt-hd { display: flex; align-items: center; gap: var(--space-8); height: 40px; padding: 0 var(--space-8); }
.sxt-hd img { width: 20px; height: 20px; object-fit: contain; }
.sxt-hd b { font: 600 14px/20px var(--font-sans); color: var(--c-text); white-space: nowrap; }
.sxt-hd small { margin-left: auto; font: var(--type-caption-2); color: var(--c-text-3); white-space: nowrap; }
.sxt-hd--big { height: 64px; gap: var(--space-12); }
.sxt-hd--big img { width: 40px; height: 40px; }
.sxt-hd--big b { font: 600 16px/22px var(--font-sans); }
.sxt-row { grid-template-columns: 136px repeat(4, 1fr); padding: 0 var(--space-8); }
.sxp { display: flex; align-items: center; gap: var(--space-10); min-width: 0; }
.sxp__pic { flex: none; display: flex; }
.sxp__t { display: flex; flex-direction: column; min-width: 0; }
.sxp__t b { font: 500 13px/18px var(--font-sans); color: var(--c-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sxp__t small { font: var(--type-caption-2); color: var(--c-text-3); }
.sxt-cap, .sxt-hero { display: grid; grid-template-columns: 1fr 40px 48px; align-items: center; gap: var(--space-8); padding: 0 var(--space-8); }
.sxt-cap { height: 28px; }
.sxt-cap small { font: var(--type-caption-2); color: var(--c-text-3); }
.sxt-cap small + small { text-align: right; }
.sxt-hero { grid-template-columns: 28px 1fr 40px 48px; height: 44px; border-radius: var(--radius-8); }
.sxt-cap { grid-template-columns: 1fr 40px 48px; }
.sxt-hero:nth-child(even) { background: color-mix(in srgb, var(--c-text) 3%, transparent); }
.sxt-hero img { width: 28px; height: 28px; }
.sxt-hero span { font: 500 13px/18px var(--font-sans); color: var(--c-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sxt-hero b { font: 400 13px/18px var(--font-mono); color: var(--c-text-2); text-align: right; }
.sxt-hero b.is-w { color: var(--w-green); }

/* v11 — команда тегом (как у игроков, один размер) */
.sxt-hd .etag { pointer-events: none; }
/* v12 — середина: все пары сразу */
.sxq { display: flex; flex-direction: column; }
.sxq-hd { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-8); }
.sxq-hd small { margin: 0; text-align: center; }
.sxq-r { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-8); align-items: center; height: 58px; padding: 0 var(--space-8); }
.sxq-r:nth-child(odd) { background: color-mix(in srgb, var(--c-text) 3%, transparent); border-radius: var(--radius-8); }
.sxq-c { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.sxq-c b { height: 22px; border-radius: 5px; font: 400 12px/22px var(--font-mono); color: var(--c-text-3); text-align: center; }
.sxq-c b.is-best { color: var(--c-text); background: color-mix(in srgb, var(--c-brand) 35%, transparent); }
/* v13 — разница под подписью */
.sxd { height: 38px; }
.sxd > span { display: flex; flex-direction: column; line-height: 14px; }
.sxd > span small { font: 400 10px/13px var(--font-mono); color: var(--c-text-3); opacity: .8; }
/* v14 — форма команды: последние 5 серий */
.sxf { display: flex; gap: 3px; margin-left: auto; }
.sxf i { width: 18px; height: 18px; border-radius: 4px; background: color-mix(in srgb, var(--c-text) 8%, transparent); font: 500 10px/18px var(--font-sans); font-style: normal; color: var(--c-text-3); text-align: center; }
.sxf i.is-w { background: color-mix(in srgb, var(--w-green) 22%, transparent); color: var(--w-green); }

/* v15 — всё тегами (команда, игрок с ролью, герой), форма точками, карточки ряда одной высоты */
.sxz-grid { align-items: stretch; }
.sxz { display: flex; flex-direction: column; padding: var(--space-8); }
.sxz-hd { display: flex; align-items: center; gap: var(--space-8); flex: none; height: 44px; padding: 0 var(--space-6); }
.sxz-hd .sxz-form { margin-left: auto; }
.sxz-row { flex: 1; display: grid; grid-template-columns: minmax(0, 1fr) repeat(4, 34px); gap: var(--space-4); align-items: center; padding: 0 var(--space-6); border-radius: var(--radius-8); cursor: pointer; }
.sxz-row:hover { background: color-mix(in srgb, var(--c-text) 3%, transparent); }
.sxz-row.is-on { background: color-mix(in srgb, var(--c-text) 7%, transparent); }
.sxz-p { min-width: 0; }
.sxz-p .etag__end { font: var(--type-caption-2); }
.sxz-p .player-photo__img { width: 30px !important; height: 30px !important; border-radius: 15px !important; }
.sxz-p .player-photo__pos { transform: scale(.85); transform-origin: left bottom; }
.sxz-p .etag__name b { font-weight: 500; }
.sxz-h { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.sxz-h .etag--hero { padding: 2px 6px; }
.sxz-h > span { display: flex; gap: 3px; font: 400 11px/14px var(--font-mono); }
.sxz-h > span b { color: var(--c-text-3); font-weight: 400; }
.sxz-h > span i { color: var(--w-green); font-style: normal; }
.sxz-mid { display: flex; flex-direction: column; }
.sxz-mid .sxn-m { flex: 1; height: auto; min-height: 28px; }
.sxz-vs { flex: none; height: 52px; }
.sxz-cap, .sxz-hero { display: grid; grid-template-columns: minmax(0, 1fr) 40px 48px; align-items: center; gap: var(--space-8); padding: 0 var(--space-6); }
.sxz-cap { flex: none; height: 28px; }
.sxz-cap small { font: var(--type-caption-2); color: var(--c-text-3); }
.sxz-cap small + small { text-align: right; }
.sxz-hero { flex: 1; border-radius: var(--radius-8); }
.sxz-hero:nth-of-type(even) { background: color-mix(in srgb, var(--c-text) 3%, transparent); }
.sxz-hero .etag { justify-self: start; }
.sxz-hero b { font: 400 13px/18px var(--font-mono); color: var(--c-text-2); text-align: right; }
.sxz-hero b.is-w { color: var(--w-green); }
.c3__form { display: inline-flex; gap: 3px; vertical-align: middle; }
.c3__dot { width: 8px; height: 8px; border-radius: 50%; }
.c3__dot--w { background: var(--w-up); } .c3__dot--l { background: var(--w-down); }

/* v16 — один левый край у всего внутри карточек: 16 от края карточки (тег — по краю картинки, текст — по первой букве) */
.sx16 .sxz { padding: var(--space-8); }
.sx16 :is(.sxz-hd, .sxz-row, .sxz-cap, .sxz-hero) { padding-left: var(--space-8); padding-right: var(--space-8); }
.sx16 :is(.sxz-hd, .sxz-row, .sxz-hero) > .etag:first-child, .sx16 .sxz-p > .etag { margin-left: -2px; }
.sx16 .sxz-hero > .etag--hero { margin-left: -6px; }
.sx16 .sxz-mid { padding: var(--space-8) var(--space-16); }
.sx16 .sxz-mid .sxn-m > b:first-child { text-align: left; padding-left: 0; width: auto; justify-self: start; }
.sx16 .sxz-mid .sxn-m > b { padding: 0 8px; width: auto; min-width: 56px; box-sizing: border-box; }
.sx16 .sxz-mid .sxn-m > b:first-child.is-best, .sx16 .sxz-mid .sxn-m > b:first-child { padding: 0 8px; margin-left: -8px; }
.sx16 .sxz-mid .sxn-m > b:last-child { margin-right: -8px; }
.sx16 .sxz-vs { padding: 0; }

/* v17 — один отступ: у карточки 0, у строк 16; подсветка строки — во всю ширину карточки */
.sx17 .sxz { padding: 0 0 var(--space-8); overflow: hidden; }
.sx17 :is(.sxz-hd, .sxz-row, .sxz-cap, .sxz-hero) { padding-left: var(--space-16); padding-right: var(--space-16); border-radius: 0; }
.sx17 .sxz-hd { height: 48px; }
.sx17 .sxz-mid { padding: 0 var(--space-16) var(--space-8); }
.sx17 .sxz-mid .sxz-vs { height: 48px; }

/* v18 — цифры в середине зеркально: обе плашки одной ширины (64), прижаты к краям, число по центру плашки */
.sx18 .sxz-mid .sxn-m { grid-template-columns: 64px 1fr 64px; }
.sx18 .sxz-mid .sxn-m > b, .sx18 .sxz-mid .sxn-m > b:first-child, .sx18 .sxz-mid .sxn-m > b:last-child { width: 64px; min-width: 0; margin: 0; padding: 0; text-align: center; justify-self: center; }
.sx18 .sxz-vs > div:first-child { padding-left: 0; }

/* v19 — у наведённой и выбранной строки скругление 4; снизу у карточек отступа нет — строки тянутся до низа */
.sx19 .sxz { padding-bottom: 0; }
.sx19 :is(.sxz-row, .sxz-hero) { border-radius: 4px; }
.sx19 .sxz-mid { padding-bottom: var(--space-8); }
'''

JS = r'''
(() => {
const d = document, HERO = k => '../gs-match/img/heroes/' + k + '.png'
const POOL = [['faceless_void','luna','terrorblade','morphling','phantom_assassin','troll_warlord','medusa','naga_siren'],
  ['puck','storm_spirit','ember_spirit','queenofpain','void_spirit','lina','invoker','pangolier'],
  ['mars','centaur','tidehunter','beastmaster','dark_seer','axe','primal_beast','bristleback'],
  ['tusk','earth_spirit','rubick','hoodwink','mirana','earthshaker','snapfire','rattletrap'],
  ['crystal_maiden','dazzle','shadow_shaman','lion','oracle','jakiro','witch_doctor','disruptor']]
const V = window.__SX_V || 0, ONE = !!window.__SX_ONE || V >= 4  // v3: «О серии» — только начало матча и статистика, игроки над командами, без переключателя
const PER = ONE ? ['Турнир', 'Патч 7.42', 'Месяц', '3 месяца', '6 месяцев', 'Год'] : ['Турнир', 'Патч 7.42', 'Месяц', '3 месяца', 'Год']
const ROLE = ['Керри', 'Мид', 'Оффлейн', 'Саппорт', 'Саппорт']
let seed = 1; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
const R = (a, b) => a + rnd() * (b - a)
const st = { tab: 0, per: 2, pos: 0 }

function seg(opts, val, cls) {
  return '<div class="segment segment--sm ' + cls + '" role="tablist"><span class="segment__thumb"></span>' +
    opts.map((o, i) => '<button type="button" class="segment__btn' + (i === val ? ' is-on' : '') + '" data-i="' + i + '">' + o + '</button>').join('') + '</div>'
}
function placeThumbs(root) { for (const s of root.querySelectorAll('.segment')) { const b = s.querySelector('.is-on'), t = s.querySelector('.segment__thumb'); if (b) { t.style.width = b.offsetWidth + 'px'; t.style.transform = 'translateX(' + b.offsetLeft + 'px)' } } }

function data(T) {
  seed = 7 + st.per * 31
  const span = (ONE ? [1, .8, 1, 2.6, 5, 8] : [1, .8, 1, 2.6, 8])[st.per]
  return T.map((t, k) => ({ ...t,
    players: t.players.map((p, i) => ({ ...p, heroes: POOL[i].slice(k * 2, k * 2 + 6).sort(() => rnd() - .5).slice(0, 4).map(h => ({ h, g: Math.max(1, Math.round(R(2, 10) * span / (k ? 1.2 : 1))), w: Math.round(R(45, 92)) })),
      m: { win: Math.round(R(40, 70)), maps: Math.round(R(22, 40) * span), k: R(2, 10), d: R(2, 6), a: R(5, 16), kp: Math.round(R(52, 74)), gpm: Math.round(i < 3 ? R(520, 720) : R(300, 420)), xpm: Math.round(i < 3 ? R(620, 860) : R(380, 520)), dmg: R(i < 3 ? 22 : 9, i < 3 ? 36 : 16) } })),
    team: { win: Math.round(R(42, 70)), maps: Math.round(R(26, 44) * span), k: R(26, 33), d: R(25, 33), fb: Math.round(R(42, 60)), r10: Math.round(R(36, 56)), ft: Math.round(R(40, 58)), rosh: Math.round(R(40, 56)), wfb: Math.round(R(55, 80)), w10: Math.round(R(66, 90)), len: Math.round(R(38, 46) * 60 + R(0, 59)) },
    best: POOL.flatMap(x => x.slice(k * 2, k * 2 + 2)).sort(() => rnd() - .5).slice(0, 6).map(h => ({ h, g: Math.round(R(4, 13) * span), w: Math.round(R(50, 88)) })) }))
}
const ICON = k => '../gs-match/img/heroes/icon/' + k + '.png'
const hero = x => V === 5 ? '<span class="sx5h"><img src="' + ICON(x.h) + '" alt=""><span><b>' + x.w + '%</b><small>' + x.g + '</small></span></span>'
  : V ? '<span class="sx4h"><img src="' + ICON(x.h) + '" alt=""><b>' + x.g + '</b><span>' + x.w + '%</span></span>'
  : '<span class="sx__h"><img src="' + HERO(x.h) + '" alt=""><b>' + x.g + '</b><span>· ' + x.w + '%</span></span>'
const f1 = v => v.toFixed(1), mmss = s => Math.floor(s / 60) + ':' + String(Math.round(s % 60)).padStart(2, '0')
function rows(list) {  // [подпись, a, b, формат, меньше — лучше]
  return list.map(([l, a, b, f, low]) => { const best = a === b ? -1 : (low ? (a < b ? 0 : 1) : (a > b ? 0 : 1))
    return '<div class="sx__m"><b class="' + (best === 0 ? 'is-best' : '') + '">' + f(a) + '</b><span>' + l + '</span><b class="' + (best === 1 ? 'is-best' : '') + '">' + f(b) + '</b></div>' }).join('')
}
const pc = v => v + '%', n = v => String(v), k1 = v => f1(v) + 'K'

/* v7–v9: ровная сетка, без разделителей */
const pmet = (a, b) => [['Победы', a.m.win, b.m.win, pc], ['Карты', a.m.maps, b.m.maps, n], ['Убийства', a.m.k, b.m.k, f1], ['Смерти', a.m.d, b.m.d, f1, 1], ['Помощь', a.m.a, b.m.a, f1],
  ['Участие в убийствах', a.m.kp, b.m.kp, pc], ['GPM', a.m.gpm, b.m.gpm, n], ['XPM', a.m.xpm, b.m.xpm, n], ['Урон', a.m.dmg, b.m.dmg, k1]]
const tmet = (a, b) => [['Победы', a.win, b.win, pc], ['Карты', a.maps, b.maps, n], ['Убийства', a.k, b.k, f1], ['Смерти', a.d, b.d, f1, 1], ['Первая кровь', a.fb, b.fb, pc],
  ['Гонка до 10', a.r10, b.r10, pc], ['Первая башня', a.ft, b.ft, pc], ['Первый Рошан', a.rosh, b.rosh, pc], ['Победа после первой крови', a.wfb, b.wfb, pc], ['Победа после 10 убийств', a.w10, b.w10, pc], ['Длительность', a.len, b.len, mmss, 1]]
const win = (a, b, low) => a === b ? -1 : (low ? (a < b ? 0 : 1) : (a > b ? 0 : 1))
// числа — фиксированные колонки, плашка одной ширины
const nrows = L => L.map(([l, a, b, f, low]) => { const w = win(a, b, low); return '<div class="sxn-m"><b' + (w === 0 ? ' class="is-best"' : '') + '>' + f(a) + '</b><span>' + l + '</span><b' + (w === 1 ? ' class="is-best"' : '') + '>' + f(b) + '</b></div>' }).join('')
// полоски: доля каждой стороны
const brows = L => L.map(([l, a, b, f, low]) => { const w = win(a, b, low), sa = low ? b / (a + b) : a / (a + b)
  return '<div class="sxn-bar"><b' + (w === 0 ? ' class="is-best"' : '') + '>' + f(a) + '</b><span class="sxn-bar__l"><i style="width:' + (sa * 100).toFixed(1) + '%"' + (w === 0 ? ' class="is-best"' : '') + '></i></span><span class="sxn-bar__t">' + l + '</span><span class="sxn-bar__r"><i style="width:' + ((1 - sa) * 100).toFixed(1) + '%"' + (w === 1 ? ' class="is-best"' : '') + '></i></span><b' + (w === 1 ? ' class="is-best"' : '') + '>' + f(b) + '</b></div>' }).join('')
const drows = L => L.map(([l, a, b, f, low]) => { const w = win(a, b, low), d = Math.abs(a - b), ds = f === mmss ? mmss(d) : f === pc ? d + ' п.п.' : f === k1 ? f1(d) + 'K' : f === n ? String(d) : f1(d)
  return '<div class="sxn-m sxd"><b' + (w === 0 ? ' class="is-best"' : '') + '>' + f(a) + '</b><span>' + l + '<small>' + (w < 0 ? 'поровну' : (w === 0 ? '← ' : '') + 'на ' + ds + (w === 1 ? ' →' : '')) + '</small></span><b' + (w === 1 ? ' class="is-best"' : '') + '>' + f(b) + '</b></div>' }).join('')
const hicon = x => '<span class="sxn-h"><span class="sxn-h__i"><img src="' + ICON(x.h) + '" alt=""><em>' + x.g + '</em></span><b>' + x.w + '%</b></span>'

const HN = {faceless_void:'Faceless Void',luna:'Luna',terrorblade:'Terrorblade',morphling:'Morphling',phantom_assassin:'Phantom Assassin',troll_warlord:'Troll Warlord',medusa:'Medusa',naga_siren:'Naga Siren',puck:'Puck',storm_spirit:'Storm Spirit',ember_spirit:'Ember Spirit',queenofpain:'Queen of Pain',void_spirit:'Void Spirit',lina:'Lina',invoker:'Invoker',pangolier:'Pangolier',mars:'Mars',centaur:'Centaur Warrunner',tidehunter:'Tidehunter',beastmaster:'Beastmaster',dark_seer:'Dark Seer',axe:'Axe',primal_beast:'Primal Beast',bristleback:'Bristleback',tusk:'Tusk',earth_spirit:'Earth Spirit',rubick:'Rubick',hoodwink:'Hoodwink',mirana:'Mirana',earthshaker:'Earthshaker',snapfire:'Snapfire',rattletrap:'Clockwerk',crystal_maiden:'Crystal Maiden',dazzle:'Dazzle',shadow_shaman:'Shadow Shaman',lion:'Lion',oracle:'Oracle',jakiro:'Jakiro',witch_doctor:'Witch Doctor',disruptor:'Disruptor'}
function renderNew(box, T) {
  const D = data(T), [A, B] = D, per = PER[st.per] === 'Турнир' ? 'на турнире' : 'за ' + PER[st.per].toLowerCase()
  D.forEach((x, k) => { const w = FORM[k] ?? 3; x.form = [1, 0, 1, 1, 0, 1, 1, 0, 1, 1].slice(0, 5).map((_, i) => i < 5 - w ? 0 : 1).reverse() })
  const a = A.players[st.pos], b = B.players[st.pos]
  const vs = '<div class="sxn-vs"><div>' + a.tag + '</div><em>' + ROLE[st.pos] + '</em><div>' + b.tag + '</div></div>'
  let P = '', C = ''
  if (V >= 15) {
    const htag = (k, sz, name) => '<a class="etag etag--' + sz + ' etag--hero" title="' + (HN[k] || k) + '"><span class="etag__pic"><img src="' + ICON(k) + '" alt=""></span>' + (name ? '<span class="etag__name">' + (HN[k] || k) + '</span>' : '') + '</a>'
    const ptag = (p, i) => p.tag.replace('</span></a>', '</span><span class="etag__end">' + ROLE[i] + '</span></a>').replace(/<\/b><\/span><span class="etag__end">/, '</b></span><span class="etag__end">')
    const dots = t => '<span class="c3__form sxz-form" title="Последние 5 серий">' + t.form.map(w => '<i class="c3__dot c3__dot--' + (w ? 'w' : 'l') + '"></i>').join('') + '</span>'
    const hcell = x => '<span class="sxz-h">' + htag(x.h, 'm', false) + '<span><b>' + x.g + '</b><i>' + x.w + '%</i></span></span>'
    const side = t => '<div class="sxn-card sxz"><div class="sxz-hd">' + t.tag + (V === 15 ? dots(t) : '') + '</div>' +
      t.players.map((p, i) => '<div class="sxz-row' + (i === st.pos ? ' is-on' : '') + '" data-pos="' + i + '"><span class="sxz-p">' + ptag(p, i) + '</span>' + p.heroes.map(hcell).join('') + '</div>').join('') + '</div>'
    const vsT = '<div class="sxn-vs is-txt sxz-vs"><div><b>' + a.nick + '</b><small>' + A.name + '</small></div><em>' + ROLE[st.pos] + '</em><div><b>' + b.nick + '</b><small>' + B.name + '</small></div></div>'
    P = '<div class="sxn-grid sxz-grid">' + side(A) + '<div class="sxn-card sxn-mid sxz-mid">' + vsT + nrows(pmet(a, b)) + '</div>' + side(B) + '</div>'
    const tside = t => '<div class="sxn-card sxz"><div class="sxz-hd">' + t.tag + dots(t) + '</div><div class="sxz-cap"><small>Лучшие герои ' + per + '</small><small>Карт</small><small>Побед</small></div>' +
      t.best.map(x => '<div class="sxz-hero">' + htag(x.h, 'm', true) + '<b>' + x.g + '</b><b class="is-w">' + x.w + '%</b></div>').join('') + '</div>'
    C = '<div class="sxn-grid sxz-grid">' + tside(A) + '<div class="sxn-card sxn-mid sxz-mid">' + nrows(tmet(A.team, B.team)) + '</div>' + tside(B) + '</div>'
  } else if (V >= 10) {
    const who = (p, i) => '<span class="sxp"><span class="sxp__pic">' + p.pic + '</span><span class="sxp__t"><b>' + p.nick + '</b><small>' + ROLE[i] + '</small></span></span>'
    const thd = t => V >= 11 ? t.tag : '<img src="' + t.logo + '" alt=""><b>' + t.name + '</b>'
    const side = t => '<div class="sxn-card sxt"><div class="sxt-hd">' + thd(t) + '<small>Лучшие герои ' + per + '</small></div>' +
      t.players.map((p, i) => '<div class="sxn-row sxt-row' + (i === st.pos ? ' is-on' : '') + '" data-pos="' + i + '">' + who(p, i) + p.heroes.map(hicon).join('') + '</div>').join('') + '</div>'
    const vsT = '<div class="sxn-vs is-txt"><div><b>' + a.nick + '</b><small>' + A.name + '</small></div><em>' + ROLE[st.pos] + '</em><div><b>' + b.nick + '</b><small>' + B.name + '</small></div></div>'
    // v12: середина — все пять пар сразу, каждая строка напротив своих игроков
    const pairs = () => '<div class="sxn-card sxt sxq"><div class="sxt-hd sxq-hd"><small>Победы</small><small>KDA</small><small>GPM</small></div>' + A.players.map((p, i) => { const q = B.players[i], ka = (p.m.k + p.m.a) / p.m.d, kb = (q.m.k + q.m.a) / q.m.d
      const c = (x, y, f) => '<span class="sxq-c"><b' + (x > y ? ' class="is-best"' : '') + '>' + f(x) + '</b><b' + (y > x ? ' class="is-best"' : '') + '>' + f(y) + '</b></span>'
      return '<div class="sxq-r">' + c(p.m.win, q.m.win, pc) + c(ka, kb, f1) + c(p.m.gpm, q.m.gpm, n) + '</div>' }).join('') + '</div>'
    const nr = V === 13 ? drows : nrows
    P = '<div class="sxn-grid">' + side(A) + (V === 12 ? pairs() : '<div class="sxn-card sxn-mid">' + vsT + nr(pmet(a, b)) + '</div>') + side(B) + '</div>'
    const form = t => V === 14 ? '<span class="sxf" title="Последние 5 серий: В — победа, П — поражение">' + t.form.map(w => '<i class="' + (w ? 'is-w' : '') + '">' + (w ? 'В' : 'П') + '</i>').join('') + '</span>' : ''
    const tside = t => '<div class="sxn-card sxt"><div class="sxt-hd' + (V >= 11 ? '' : ' sxt-hd--big') + '">' + (V >= 11 ? t.tag + form(t) : '<img src="' + t.logo + '" alt=""><b>' + t.name + '</b>') + '</div><div class="sxt-cap"><small>Лучшие герои ' + per + '</small><small>Карт</small><small>Побед</small></div>' +
      t.best.map(x => '<div class="sxt-hero"><img src="' + ICON(x.h) + '" alt=""><span>' + (HN[x.h] || x.h) + '</span><b>' + x.g + '</b><b class="is-w">' + x.w + '%</b></div>').join('') + '</div>'
    C = '<div class="sxn-grid">' + tside(A) + '<div class="sxn-card sxn-mid">' + nr(tmet(A.team, B.team)) + '</div>' + tside(B) + '</div>'
  } else if (V === 7 || V === 9) {
    const side = t => '<div class="sxn-card"><div class="sxn-hd">' + t.tag + '</div><div class="sxn-cols"><span></span><small>Лучшие герои ' + per + '</small></div>' +
      t.players.map((p, i) => '<div class="sxn-row' + (i === st.pos ? ' is-on' : '') + '" data-pos="' + i + '"><span class="sxn-p">' + p.tag + '<small>' + ROLE[i] + '</small></span>' + p.heroes.map(hicon).join('') + '</div>').join('') + '</div>'
    const vsT = '<div class="sxn-vs is-txt"><div><b>' + a.nick + '</b><small>' + A.name + '</small></div><em>' + ROLE[st.pos] + '</em><div><b>' + b.nick + '</b><small>' + B.name + '</small></div></div>'
    const mid = '<div class="sxn-card sxn-mid">' + vsT + (V === 9 ? brows(pmet(a, b)) : nrows(pmet(a, b))) + '</div>'
    P = '<div class="sxn-grid">' + side(A) + mid + side(B) + '</div>'
    const tside = t => '<div class="sxn-card sxn-tm"><img class="sxn-logo" src="' + t.logo + '" alt=""><b>' + t.name + '</b><small>Лучшие герои ' + per + '</small><div class="sxn-best">' + t.best.map(hicon).join('') + '</div></div>'
    C = '<div class="sxn-grid">' + tside(A) + '<div class="sxn-card sxn-mid">' + (V === 9 ? brows(tmet(A.team, B.team)) : nrows(tmet(A.team, B.team))) + '</div>' + tside(B) + '</div>'
  } else {  // v8 — одна таблица «друг напротив друга», сравнение полосками под ней
    const rowsV = A.players.map((p, i) => { const q = B.players[i]
      return '<div class="sxn-row sxn-vrow' + (i === st.pos ? ' is-on' : '') + '" data-pos="' + i + '"><span class="sxn-hs">' + p.heroes.map(hicon).join('') + '</span><span class="sxn-p">' + p.tag + '</span><span class="sxn-role"><b>' + (i + 1) + '</b><small>' + ROLE[i] + '</small></span><span class="sxn-p is-b">' + q.tag + '</span><span class="sxn-hs">' + q.heroes.map(hicon).join('') + '</span></div>' }).join('')
    P = '<div class="sxn-card sxn-wide"><div class="sxn-vhd"><span class="sxn-cap">Лучшие герои ' + per + '</span>' + A.tag + '<span></span>' + B.tag + '<span class="sxn-cap">Лучшие герои ' + per + '</span></div>' + rowsV + '</div>' +
      '<div class="sxn-card sxn-wide sxn-cmp">' + vs + brows(pmet(a, b)) + '</div>'
    const tm = t => '<div class="sxn-tm2"><img class="sxn-logo" src="' + t.logo + '" alt=""><b>' + t.name + '</b><div class="sxn-best">' + t.best.map(hicon).join('') + '</div></div>'
    C = '<div class="sxn-card sxn-wide sxn-t8">' + tm(A) + '<div class="sxn-t8m">' + brows(tmet(A.team, B.team)) + '</div>' + tm(B) + '</div>'
  }
  box.innerHTML = kick() + '<div class="sx4hd"><h3>Игроки</h3>' + seg(PER, st.per, 'sx__per') + '</div>' + P + '<div class="sx4hd"><h3>Команды</h3></div>' + C
  placeThumbs(box)
}

function render(box, T) {
  if (V >= 7) return renderNew(box, T)
  const D = data(T), [A, B] = D, per = PER[st.per] === 'Турнир' ? 'на турнире' : 'за ' + PER[st.per].toLowerCase().replace('патч', 'патч')
  let h = ONE ? '<div class="sx__top"><h3>Статистика</h3>' + seg(PER, st.per, 'sx__per') + '</div>' : '<div class="sx__top"><h3>Статистика</h3>' + seg(['Игроки', 'Команды'], st.tab, 'sx__tab') + seg(PER, st.per, 'sx__per') + '</div>'
  const P = () => {
    const side = t => '<div class="sx__card"><div class="sx__hd">' + t.tag + '<span class="sx__cap">Лучшие герои ' + per + '</span></div>' +
      t.players.map((p, i) => V ? '<div class="sx__row sx4r' + (i === st.pos ? ' is-on' : '') + '" data-pos="' + i + '"><span class="sx4t">' + p.tag + '<small>' + ROLE[i] + '</small></span><div class="sx__heroes sx4hs">' + p.heroes.map(hero).join('') + '</div></div>'
        : '<div class="sx__row' + (i === st.pos ? ' is-on' : '') + '" data-pos="' + i + '"><span class="sx__pos"><b>' + (i + 1) + '</b><small>' + ROLE[i] + '</small></span><span class="sx__nick">' + p.nick + '</span><div class="sx__heroes">' + p.heroes.map(hero).join('') + '</div></div>').join('') + '</div>'
    const a = A.players[st.pos], b = B.players[st.pos]
    const cmp = '<div class="sx__card sx__cmp"><div class="sx__vs"><div><b>' + a.nick + '</b><small>' + A.name + '</small></div><em>' + ROLE[st.pos] + '</em><div><b>' + b.nick + '</b><small>' + B.name + '</small></div></div>' +
      rows([['Победы', a.m.win, b.m.win, pc], ['Карты', a.m.maps, b.m.maps, n], ['Убийства', a.m.k, b.m.k, f1], ['Смерти', a.m.d, b.m.d, f1, 1], ['Помощь', a.m.a, b.m.a, f1],
        ['Участие в убийствах', a.m.kp, b.m.kp, pc], ['GPM', a.m.gpm, b.m.gpm, n], ['XPM', a.m.xpm, b.m.xpm, n], ['Урон', a.m.dmg, b.m.dmg, k1]]) + '</div>'
    return side(A) + cmp + side(B).replace('class="sx__card"', 'class="sx__card is-b"')
  }
  const C = () => {
    const side = t => '<div class="sx__card"><div class="sx__team"><img src="' + t.logo + '" alt=""><b>' + t.name + '</b></div><div class="sx__best"><span class="sx__cap">Лучшие герои ' + per + '</span><div class="sx__heroes' + (V ? ' sx4hs' : '') + '">' + t.best.map(hero).join('') + '</div></div></div>'
    const a = A.team, b = B.team
    const cmp = '<div class="sx__card sx__cmp is-team">' + rows([['Победы', a.win, b.win, pc], ['Карты', a.maps, b.maps, n], ['Убийства', a.k, b.k, f1], ['Смерти', a.d, b.d, f1, 1], ['Первая кровь', a.fb, b.fb, pc],
      ['Гонка до 10', a.r10, b.r10, pc], ['Первая башня', a.ft, b.ft, pc], ['Первый Рошан', a.rosh, b.rosh, pc], ['Победа после первой крови', a.wfb, b.wfb, pc], ['Победа после 10 убийств', a.w10, b.w10, pc], ['Длительность', a.len, b.len, mmss, 1]]) + '</div>'
    return side(A) + cmp + side(B)
  }
  if (V) h = ''
  h += V ? '<div class="sx4hd"><h3>Игроки</h3>' + seg(PER, st.per, 'sx__per') + '</div><div class="sx__grid">' + P() + '</div><div class="sx4hd"><h3>Команды</h3></div><div class="sx__grid">' + C() + '</div>'
    : ONE ? '<h4 class="sx__sub">Игроки</h4><div class="sx__grid">' + P() + '</div><h4 class="sx__sub">Команды</h4><div class="sx__grid">' + C() + '</div>'
    : '<div class="sx__grid">' + (st.tab === 0 ? P() : C()) + '</div>'
  box.innerHTML = (ONE ? kick() : '') + h; placeThumbs(box)
}

let KICK = '17:12', FORM = []
const kick = () => '<div class="sx__kick"><small>Начало матча</small><em>через 23 мин</em><b>' + KICK + '</b><p>Страница сама откроет карту, как только начнётся драфт.</p></div>'

let tries = 0; const t = setInterval(() => {
  const lu = d.querySelector('.ss10__lu .st-lineups'); if (!lu && ++tries < 100) return; clearInterval(t); if (!lu) return
  const T = [...lu.querySelectorAll('.st-lineups__cols > div')].map(c => { const tag = c.querySelector('.st-lineups__team .etag')
    return { tag: tag.outerHTML, name: tag.title, logo: tag.querySelector('img').getAttribute('src'),
      players: [...c.querySelectorAll('.st-lineups__row')].map(r => { const e = r.querySelector('.etag'); return { tag: e.outerHTML, nick: e.title, pic: e.querySelector('.etag__pic').innerHTML } }) } })
  const mt = (d.querySelector('.ss10__meta')?.textContent || '').match(/(\d{1,2}:\d{2})/); if (mt) KICK = mt[1]
  FORM = [...d.querySelectorAll('.ss10__team small')].map(s => { const m = s.textContent.match(/форма\s*(\d)/); return m ? +m[1] : 3 })
  const box = d.createElement('div'); box.className = 'sx' + (ONE ? ' sx--one' : '') + (V ? ' sx' + V : '') + (V === 16 ? ' sx15' : V === 17 ? ' sx15 sx16 sx17' : V === 18 ? ' sx15 sx16 sx17 sx18' : V === 19 ? ' sx15 sx16 sx17 sx18 sx19' : '')
  if (ONE) { const ss = lu.closest('.ss5'); ss.replaceChildren(box) } else lu.closest('.ss10__lu').replaceWith(box)
  box.addEventListener('click', e => { const b = e.target.closest('.segment__btn'), r = e.target.closest('.sx__row, .sxn-row, .sxz-row')
    if (b) { if (b.closest('.sx__tab')) st.tab = +b.dataset.i; else st.per = +b.dataset.i; render(box, T) }
    else if (r) { st.pos = +r.dataset.pos; render(box, T) } })
  render(box, T)
}, 100)
})()
'''

PAGE = '''<!doctype html>
<html lang="ru"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>О серии · {name}</title>
<style>html, body {{ margin: 0; background: #000; }} iframe {{ display: block; width: 100%; height: 100vh; border: 0; }}</style>
</head><body>
<iframe src="../ui-pages/match-engine.html?state=pre0" scrolling="no"></iframe>
<script>
const f = document.querySelector('iframe'), CSS = {css}, JS = {js}
f.addEventListener('load', () => {{
  const d = f.contentDocument
  if (CSS) {{ const s = d.createElement('style'); s.textContent = CSS; d.head.appendChild(s) }}
  if (JS) {{ const s = d.createElement('script'); s.textContent = JS; d.body.appendChild(s) }}
  for (const el of d.querySelectorAll('body *')) {{ const p = f.contentWindow.getComputedStyle(el).position; if (p === 'fixed') el.style.position = 'absolute' }}
  const fit = () => {{ f.style.height = d.documentElement.scrollHeight + 'px' }}
  new f.contentWindow.ResizeObserver(fit).observe(d.body); fit()
}})
</script>
</body></html>
'''
VARS = [('v0-как-сейчас', 'v0 · Как сейчас', '', ''), ('v10-ровная-сетка-2', 'v10 · Ровная сетка 2', CSS, 'window.__SX_V = 10;' + JS),
  ('v11-теги-команд', 'v11 · Теги команд', CSS, 'window.__SX_V = 11;' + JS), ('v14-форма-команды', 'v14 · Форма команды', CSS, 'window.__SX_V = 14;' + JS),
  ('v15-всё-тегами', 'v15 · Всё тегами', CSS, 'window.__SX_V = 15;' + JS),
  ('v16-ровный-край', 'v16 · Ровный край', CSS, 'window.__SX_V = 16;' + JS),
  ('v17-без-двойного-отступа', 'v17 · Без двойного отступа', CSS, 'window.__SX_V = 17;' + JS),
  ('v18-цифры-симметрично', 'v18 · Цифры симметрично', CSS, 'window.__SX_V = 18;' + JS),
  ('v19-строки-до-низа', 'v19 · Строки до низа', CSS, 'window.__SX_V = 19;' + JS)]
# v12, v13 — сняты 24.11, в _отклонено/
# снятые v1–v9 лежат в _отклонено/match-series-stats/ (их код здесь остался: V 0–9)
for fn, name, css, js in VARS:
    (HERE / f'{fn}.html').write_text(PAGE.format(name=name, css=json.dumps(css), js=json.dumps(js)))
print('ok')

# Переключатель «Состояние» — в «Настройках примера» песочницы (window.LAB: axes / set)
LABJS = r'''
function lab(axes, apply) { const cur = Object.fromEntries(axes.map((a) => [a.key, a.options[0].v])); apply(cur)
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }), axes: () => axes.map((a) => ({ ...a, value: cur[a.key] })),
    set(k, x) { cur[k] = x; apply(cur) }, toggles: () => [], toggle() {}, caption: () => '' } }
const STATE = (opts) => [{ key: 'state', name: 'Состояние', options: opts }]
'''

# v00 — Sentry Bot (24.11) по состояниям: не начался (Spirit Academy — InterActive), идёт (тот же матч, карта 1), закончился (Aurora — LGD, 2 : 0)
(HERE / 'v00-sentry.html').write_text('''<!doctype html><html lang="ru"><head><meta charset="utf-8" /><title>О серии · v00 Sentry Bot</title>
<style>body{margin:0;background:#000}img{display:block;width:100%;max-width:1440px;margin:0 auto}</style></head><body><img id="im" alt="">
<script>''' + LABJS + '''
const IM = { pre: 'v00-игроки.png', live: 'v00-идёт.png', post: 'v00-закончился.png' }
lab(STATE([{ v: 'pre', label: 'Не начался' }, { v: 'live', label: 'Идёт' }, { v: 'post', label: 'Закончился' }]), (c) => { document.getElementById('im').src = IM[c.state] })
</script></body></html>''')

# v24 — продукт (SeriesStats v1 на странице матча v32), вкладка «О серии»; v21–v23 (по версии на состояние) — сняты в _отклонено/
(HERE / 'v24-продукт.html').write_text('''<!doctype html><html lang="ru"><head><meta charset="utf-8" /><title>О серии · v24 продукт</title>
<style>html,body{margin:0;background:#000}iframe{display:block;width:100%;height:100vh;border:0}</style></head><body><iframe scrolling="no"></iframe>
<script>''' + LABJS + '''
const f = document.querySelector('iframe')
f.addEventListener('load', () => { const d = f.contentDocument, w = f.contentWindow
  // «О серии» — жмём, пока не станет выбранной (страница может переключиться на карту после первой отрисовки)
  let n = 0; const t = setInterval(() => { const b = d.querySelector('.mpage__main .segment__btn'); n++
    if (b && !b.classList.contains('is-on') && n < 60) { b.click(); return } if (!b && n < 60) return; if (n < 6) return; clearInterval(t)
    for (const el of d.querySelectorAll('body *')) { if (w.getComputedStyle(el).position === 'fixed') el.style.position = 'absolute' }
    const fit = () => { const s = d.querySelector('.sst'); if (s) f.style.height = Math.ceil(s.getBoundingClientRect().bottom + w.scrollY + 64) + 'px' }; new w.ResizeObserver(fit).observe(d.querySelector('.sst') || d.body); fit() }, 100) })
lab(STATE([{ v: 'pre0', label: 'Не начался' }, { v: 'live', label: 'Идёт' }, { v: 'post', label: 'Закончился' }]), (c) => { f.src = '../ui-pages/match-engine.html?state=' + c.state })
</script></body></html>''')

# v25 — как v24 + во время матча и после — крупный счёт на месте «Начала матча» (дирижёр 24.11: «во время матча ничего не показываем — хотя бы большой счёт»).
# Блок подставляется в страницу продукта скриптом: команды, счёт и карты — из шапки страницы и вкладок карт.
SCORE_CSS = r'''
.sxsc { display: flex; flex-direction: column; align-items: center; gap: var(--space-16); padding: 32px var(--space-16) 28px; margin-bottom: 0; border: 1px solid color-mix(in srgb, var(--c-text) 9%, transparent); border-radius: var(--radius-12); background: var(--w-surface); }
.sxsc__top { display: flex; align-items: center; gap: var(--space-6); font: var(--type-caption-1); color: var(--c-text-2); }
.sxsc__top i { width: 8px; height: 8px; border-radius: 50%; background: var(--w-down); box-shadow: 0 0 0 3px color-mix(in srgb, var(--w-down) 25%, transparent); }
.sxsc__top b { font: 500 12px/16px var(--font-mono); color: var(--c-text); }
.sxsc__vs { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 40px; width: 100%; max-width: 760px; }
.sxsc__t { display: flex; align-items: center; gap: var(--space-16); min-width: 0; }
.sxsc__t:first-child { justify-content: flex-end; text-align: right; }
.sxsc__t img { width: 56px; height: 56px; object-fit: contain; flex: none; }
.sxsc__t b { font: 600 20px/26px var(--font-sans); color: var(--c-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sxsc__t.is-lost { opacity: .45; }
.sxsc__n { font: 500 56px/60px var(--font-mono); color: var(--c-text); letter-spacing: .02em; }
.sxsc__maps { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-8); }
.sxsc__m { display: inline-flex; align-items: center; gap: var(--space-6); height: 28px; padding: 0 var(--space-10) 0 var(--space-8); border-radius: 6px; background: color-mix(in srgb, var(--c-text) 5%, transparent); font: var(--type-caption-2); color: var(--c-text-3); }
.sxsc__m img { width: 16px; height: 16px; object-fit: contain; }
.sxsc__m b { font-weight: 500; color: var(--c-text-2); }
.sxsc__m.is-live { color: var(--c-text); }
.sxsc__m.is-live i { width: 6px; height: 6px; border-radius: 50%; background: var(--w-down); }
.sxsc__m.is-next { opacity: .5; }
.sst > .sxsc + .sst__h3 { margin-top: 32px; }
'''
SCORE_JS = r'''
function score(d, state) {
  const sst = d.querySelector('.sst'); if (!sst || state === 'pre0' || sst.querySelector('.sxsc')) return
  const tags = [...d.querySelectorAll('.ph-d .ph-title .etag--team')].slice(0, 2), sc = d.querySelector('.ph-d .ph-score')?.textContent.trim() || '0 : 0'
  const [a, b] = sc.split(':').map((x) => +x.trim()), T = tags.map((t) => ({ name: t.title, logo: t.querySelector('img')?.getAttribute('src') }))
  const tabs = [...(d.querySelector('.mpage__main .segment')?.querySelectorAll('.segment__btn') ?? [])].slice(1)
  const live = tabs.find((x) => x.querySelector('.match-header__live')), min = live?.querySelector('.match-header__min')?.textContent || ''
  const maps = tabs.map((x, i) => { const w = x.querySelector('.match-header__won img'), l = x.querySelector('.match-header__live')
    return w ? '<span class="sxsc__m"><b>Карта ' + (i + 1) + '</b><img src="' + w.getAttribute('src') + '" alt="">' + w.alt + '</span>'
      : l ? '<span class="sxsc__m is-live"><b>Карта ' + (i + 1) + '</b><i></i>идёт · ' + min + '</span>'
      : '<span class="sxsc__m is-next"><b>Карта ' + (i + 1) + '</b>' + (state === 'post' ? 'не понадобилась' : 'если понадобится') + '</span>' }).join('')
  const done = state === 'post', win = a > b ? 0 : 1
  const top = done ? 'Матч завершён · Bo' + tabs.length : '<i></i>Идёт · Карта ' + (tabs.indexOf(live) + 1) + ' · <b>' + min + '</b>'
  const t = (k) => '<span class="sxsc__t' + (done && k !== win ? ' is-lost' : '') + '">' + (k ? '<img src="' + T[k].logo + '" alt=""><b>' + T[k].name + '</b>' : '<b>' + T[k].name + '</b><img src="' + T[k].logo + '" alt="">') + '</span>'
  const el = d.createElement('div'); el.className = 'sxsc'
  el.innerHTML = '<span class="sxsc__top">' + top + '</span><div class="sxsc__vs">' + t(0) + '<span class="sxsc__n">' + a + ' : ' + b + '</span>' + t(1) + '</div><div class="sxsc__maps">' + maps + '</div>'
  sst.prepend(el)
}
'''
(HERE / 'v25-счёт.html').write_text('''<!doctype html><html lang="ru"><head><meta charset="utf-8" /><title>О серии · v25 счёт</title>
<style>html,body{margin:0;background:#000}iframe{display:block;width:100%;height:100vh;border:0}</style></head><body><iframe scrolling="no"></iframe>
<script>''' + LABJS + SCORE_JS + '''
const f = document.querySelector('iframe'), CSS = ''' + json.dumps(SCORE_CSS) + '''
let state = 'pre0'
f.addEventListener('load', () => { const d = f.contentDocument, w = f.contentWindow
  const st = d.createElement('style'); st.textContent = CSS; d.head.appendChild(st)
  // «О серии» — жмём, пока не станет выбранной (страница может переключиться на карту после первой отрисовки)
  let n = 0; const t = setInterval(() => { const b = d.querySelector('.mpage__main .segment__btn'); n++
    if (b && !b.classList.contains('is-on') && n < 60) { b.click(); return } if (!b && n < 60) return; if (n < 6) return; clearInterval(t)
    setTimeout(() => score(d, state), 50)
    for (const el of d.querySelectorAll('body *')) { if (w.getComputedStyle(el).position === 'fixed') el.style.position = 'absolute' }
    const fit = () => { const s = d.querySelector('.sst'); if (s) f.style.height = Math.ceil(s.getBoundingClientRect().bottom + w.scrollY + 64) + 'px' }; new w.ResizeObserver(fit).observe(d.querySelector('.sst') || d.body); fit() }, 100) })
lab(STATE([{ v: 'live', label: 'Идёт' }, { v: 'post', label: 'Закончился' }, { v: 'pre0', label: 'Не начался' }]), (c) => { state = c.state; f.src = '../ui-pages/match-engine.html?state=' + c.state })
</script></body></html>''')

# v26 — как v25, правки дирижёра 24.11: «Map 3», а не «Карта 3»; «идёт» — фиолетовой мигающей точкой, как в шапке; команды — тегами;
# MVP в правой колонке — с отступом 20 от шапки, как прогнозы (правило 03.11); до начала матча — один прогноз «Кто выиграет серию?».
# Всё подставляется в страницу продукта скриптом, ui/ не тронут (прогноз до матча — копия виджета прогнозов с live-страницы).
SCORE2_CSS = SCORE_CSS.replace('.sxsc__top i { width: 8px; height: 8px; border-radius: 50%; background: var(--w-down); box-shadow: 0 0 0 3px color-mix(in srgb, var(--w-down) 25%, transparent); }',
  '.sxsc__top i, .sxsc__m.is-live i { width: 6px; height: 6px; border-radius: 50%; background: var(--wts-violet); box-shadow: none; animation: match-header-blink 1.4s ease-in-out infinite; }') + r'''
.sxsc__t .etag { font: 600 20px/26px var(--font-sans); }
.sxsc__t .etag__pic { display: none; }
.sxsc__m .etag { font: inherit; color: var(--c-text-2); }
.mpage__side > :first-child { margin-top: 20px; }
.sxsc .sxsc__m.is-live i { background: var(--wts-violet); }
.mpage__side > .epq.sx-pre .epq__q { min-height: 0; }
'''
SCORE2_JS = r'''
function score2(d, state) {
  const sst = d.querySelector('.sst'); if (!sst || state === 'pre0' || sst.querySelector('.sxsc')) return
  const tags = [...d.querySelectorAll('.ph-d .ph-title .etag--team')].slice(0, 2), sc = d.querySelector('.ph-d .ph-score')?.textContent.trim() || '0 : 0'
  const [a, b] = sc.split(':').map((x) => +x.trim())
  const tabs = [...(d.querySelector('.mpage__main .segment')?.querySelectorAll('.segment__btn') ?? [])].slice(1)
  const live = tabs.find((x) => x.querySelector('.match-header__live')), min = live?.querySelector('.match-header__min')?.textContent || ''
  const tagOf = (alt) => { const t = tags.find((x) => x.title === alt || x.title.includes(alt) || alt.includes(x.title)); return t ? t.outerHTML.replace('etag--l', 'etag--s') : alt }
  const done = state === 'post', win = a > b ? 0 : 1
  const maps = tabs.map((x, i) => { const w = x.querySelector('.match-header__won img'), l = x.querySelector('.match-header__live')
    return w ? '<span class="sxsc__m"><b>Map ' + (i + 1) + '</b>' + tagOf(w.alt) + '</span>'
      : l ? '<span class="sxsc__m is-live"><b>Map ' + (i + 1) + '</b><i></i>идёт · ' + min + '</span>'
      : done ? '' : '<span class="sxsc__m is-next"><b>Map ' + (i + 1) + '</b>если понадобится</span>' }).join('')
  const top = done ? 'Матч завершён · Bo' + tabs.length : '<i></i>Идёт · Map ' + (tabs.indexOf(live) + 1) + ' · <b>' + min + '</b>'
  const t = (k) => '<span class="sxsc__t' + (done && k !== win ? ' is-lost' : '') + '">' + (k ? '<img src="' + tags[k].querySelector('img').getAttribute('src') + '" alt="">' + tags[k].outerHTML : tags[k].outerHTML + '<img src="' + tags[k].querySelector('img').getAttribute('src') + '" alt="">') + '</span>'
  const el = d.createElement('div'); el.className = 'sxsc'
  el.innerHTML = '<span class="sxsc__top">' + top + '</span><div class="sxsc__vs">' + t(0) + '<span class="sxsc__n">' + a + ' : ' + b + '</span>' + t(1) + '</div><div class="sxsc__maps">' + maps + '</div>'
  sst.prepend(el)
}
// до начала: виджет прогнозов с live-страницы (те же классы и вид), один вопрос «Кто выиграет серию?» с командами этого матча
function prePredict(d, w) {
  const side = d.querySelector('.mpage__side'); if (!side || side.querySelector('.epq')) return
  const hf = document.createElement('iframe'); hf.style.cssText = 'position:absolute;left:-9999px;width:1440px;height:900px'; hf.src = '../ui-pages/match-engine.html?state=live'; document.body.appendChild(hf)
  hf.addEventListener('load', () => { let n = 0; const t = setInterval(() => { const e = hf.contentDocument.querySelector('.epq'); if (!e && ++n < 60) return; clearInterval(t); if (!e) return
    const box = d.createElement('div'); box.innerHTML = e.outerHTML; const q = box.firstElementChild; q.classList.add('sx-pre')
    const tags = [...d.querySelectorAll('.ph-d .ph-title .etag--team')].slice(0, 2)
    q.querySelector('.epq__tabs .segment__btn small')?.replaceChildren('1')
    const qq = q.querySelector('.epq__q'); if (qq) { const i = qq.querySelector('.epq__i'); qq.replaceChildren('Кто выиграет серию? '); if (i) qq.append(i) }
    const ops = [...q.querySelectorAll('.epq__out')], pct = [46, 54]
    ops.forEach((o, k) => { const tg = tags[k]; if (!tg) return
      const plain = '<span class="etag etag--m etag--team etag--plain"><span class="etag__pic"><img src="' + tg.querySelector('img').getAttribute('src') + '" alt=""></span><span class="etag__name">' + tg.title + '</span></span>'
      o.querySelector('.epq__ol').innerHTML = plain; o.querySelector('.epq__op b').textContent = '+' + (k ? 9 : 11); o.querySelector('.epq__op small').textContent = pct[k] + '%' })
    side.prepend(q); hf.remove() }, 100) })
}
'''
(HERE / 'v26-счёт-mvp-прогноз.html').write_text('''<!doctype html><html lang="ru"><head><meta charset="utf-8" /><title>О серии · v26</title>
<style>html,body{margin:0;background:#000}iframe{display:block;width:100%;height:100vh;border:0}</style></head><body><iframe id="pg" scrolling="no"></iframe>
<script>''' + LABJS + SCORE2_JS + '''
const f = document.getElementById('pg'), CSS = ''' + json.dumps(SCORE2_CSS) + '''
let state = 'live'
f.addEventListener('load', () => { const d = f.contentDocument, w = f.contentWindow
  const st = d.createElement('style'); st.textContent = CSS; d.head.appendChild(st)
  // «О серии» — жмём, пока не станет выбранной (страница может переключиться на карту после первой отрисовки)
  let n = 0; const t = setInterval(() => { const b = d.querySelector('.mpage__main .segment__btn'); n++
    if (b && !b.classList.contains('is-on') && n < 60) { b.click(); return } if (!b && n < 60) return; if (n < 6) return; clearInterval(t)
    setTimeout(() => { score2(d, state); if (state === 'pre0') prePredict(d, w) }, 50)
    for (const el of d.querySelectorAll('body *')) { if (w.getComputedStyle(el).position === 'fixed') el.style.position = 'absolute' }
    const fit = () => { const s = d.querySelector('.sst'); if (s) f.style.height = Math.ceil(s.getBoundingClientRect().bottom + w.scrollY + 64) + 'px' }; new w.ResizeObserver(fit).observe(d.querySelector('.sst') || d.body); fit() }, 100) })
lab(STATE([{ v: 'live', label: 'Идёт' }, { v: 'post', label: 'Закончился' }, { v: 'pre0', label: 'Не начался' }]), (c) => { state = c.state; f.src = '../ui-pages/match-engine.html?state=' + c.state })
</script></body></html>''')

# v27 — как v26, «Начало матча» собрано как счёт (дирижёр 24.11: «по-разному выглядит — должно быть единообразно»):
# во всех состояниях — мелкая строка сверху · крупно команды по краям, между ними время или счёт · мелкая строка снизу.
KICK2_JS = r'''
function kick2(d) {
  const k = d.querySelector('.sst__kick'); if (!k) return
  const tags = [...d.querySelectorAll('.ph-d .etag--team')].slice(0, 2), time = k.querySelector('b')?.textContent || '', inn = k.querySelector('em')?.textContent || ''
  const t = (i) => '<span class="sxsc__t">' + (i ? '<img src="' + tags[i].querySelector('img').getAttribute('src') + '" alt="">' + tags[i].outerHTML : tags[i].outerHTML + '<img src="' + tags[i].querySelector('img').getAttribute('src') + '" alt="">') + '</span>'
  const el = d.createElement('div'); el.className = 'sxsc'
  el.innerHTML = '<span class="sxsc__top">Начало матча · <b class="sxsc__in">' + inn + '</b></span><div class="sxsc__vs">' + t(0) + '<span class="sxsc__n">' + time + '</span>' + t(1) + '</div><div class="sxsc__maps"><span class="sxsc__cap">Страница сама откроет карту, как только начнётся драфт</span></div>'
  k.replaceWith(el)
}
'''
KICK2_CSS = r'''
.sxsc__t .etag { font: 600 20px/26px var(--font-sans); }
.sxsc__in { color: var(--c-brand) !important; font-weight: 500; }
.sxsc__cap { display: inline-flex; align-items: center; height: 28px; font: var(--type-caption-2); color: var(--c-text-3); }
.sxsc__t .etag--l { --etag-pic: 22px; }
'''
src27 = (HERE / 'v26-счёт-mvp-прогноз.html').read_text()
src27 = src27.replace('<title>О серии · v26</title>', '<title>О серии · v27</title>')
src27 = src27.replace('function score2(d, state) {', KICK2_JS + '\nfunction score2(d, state) {', 1)
src27 = src27.replace("score2(d, state); if (state === 'pre0') prePredict(d, w)", "score2(d, state); if (state === 'pre0') { kick2(d); prePredict(d, w) }")
src27 = src27.replace("const f = document.getElementById('pg'), CSS = ", "const f = document.getElementById('pg'), CSS2 = " + json.dumps(KICK2_CSS) + ", CSS = ")
src27 = src27.replace("st.textContent = CSS;", "st.textContent = CSS + CSS2;")
(HERE / 'v27-единообразно.html').write_text(src27)

# v28 — как v27: блок счёта / начала матча без рамки и подложки — прямо на чёрном фоне;
# без мигания: страница скрыта, пока не подставлен новый блок (раньше на миг был виден старый вид «Начала матча»).
src28 = (HERE / 'v27-единообразно.html').read_text().replace('<title>О серии · v27</title>', '<title>О серии · v28</title>')
src28 = src28.replace('iframe{display:block;width:100%;height:100vh;border:0}', 'iframe{display:block;width:100%;height:100vh;border:0;visibility:hidden}iframe.is-ready{visibility:visible}')
src28 = src28.replace("CSS2 = ", "CSS3 = " + json.dumps('.sxsc { border: 0 !important; background: none !important; padding: 8px 0 4px !important; } .sst__kick { visibility: hidden; }') + ", CSS2 = ")
src28 = src28.replace("st.textContent = CSS + CSS2;", "st.textContent = CSS + CSS2 + CSS3;")
src28 = src28.replace("score2(d, state); if (state === 'pre0') { kick2(d); prePredict(d, w) }", "score2(d, state); if (state === 'pre0') { kick2(d); prePredict(d, w) }; f.classList.add('is-ready')")
src28 = src28.replace("lab(STATE(", "lab(STATE(").replace("(c) => { state = c.state; f.src =", "(c) => { state = c.state; f.classList.remove('is-ready'); f.src =")
(HERE / 'v28-на-чёрном.html').write_text(src28)
