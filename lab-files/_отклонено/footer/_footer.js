/* Лаба «Футер» — страница варианта: заголовок, окно десктопа 1440 и телефон 390 с одним и тем же футером (разметка — <template id="ft"> в файле варианта).
   Над футером — кусок низа главной (три панели), в телефоне снизу — таб-бар сайта (60px): футер не должен под ним прятаться. */
;(() => {
  const КОНТЕКСТ = `<div class="ft-ctx">
    <div class="card card--ui"><div class="card__h"><h2>Лучшие выступления дня</h2><small>DreamLeague</small></div><div class="card__b"><p>Malr1ne · 9.5 · Ace · 9.4 · tOfu · 9.4</p></div></div>
    <div class="card card--ui"><div class="card__h"><h2>DreamLeague · плей-офф</h2><small>Призовой $1 000 000</small></div><div class="card__b"><p>Полуфинал: Team Spirit — Tundra Esports, сегодня</p></div></div>
    <div class="card card--ui"><div class="card__h"><h2>Лидеры недели</h2></div><div class="card__b"><p>Kotik_TS · 2 340 · ArtStyleFan · 2 295</p></div></div>
  </div>`
  const ТАББАР = `<nav class="ft-tabbar" aria-label="Разделы"><a class="is-on"><i>▦</i>Матчи</a><a><i>⌕</i>Поиск</a><a><i>★</i>Fantasy</a><a><i>☆</i>Избранное</a><a><i>◉</i>Профиль</a></nav>`

  function страница({ имя, описание, заметка = '' }) {
    const футер = document.getElementById('ft').innerHTML
    document.getElementById('lab').innerHTML = `
<h1 class="ft-lab__h">${имя}</h1><p class="ft-lab__p">${описание}</p>
<span class="ft-lab__label">Десктоп · 1440</span>
<div class="ft-desk">${КОНТЕКСТ}${футер}</div>
<span class="ft-lab__label">Телефон · 390 — листается внутри, таб-бар прибит к низу</span>
<div class="ft-row"><div class="ft-phone"><div class="ft-phone__scr">${КОНТЕКСТ}${футер}${ТАББАР}</div></div>${заметка ? `<p class="ft-note">${заметка}</p>` : ''}</div>`
    // Телефон показываем прокрученным к футеру — сразу видно, как он стоит над таб-баром
    const экран = document.querySelector('.ft-phone__scr'); экран.scrollTop = экран.scrollHeight
  }

  window.FOOTER = { страница }
})()
