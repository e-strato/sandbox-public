/* Оболочка лабы «(C) Карточка команды: кнопки»: страница во фрейме. <body data-src="адрес без ?tour" data-q="&доп. параметры">.
   Оси: «Турнир» — Universe Ep. 7 (группы, как на скрине начальника) / TI 2026 (швейцарка), «Вид» — компьютер 1440 / телефон 390. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.style.cssText = 'display:block;border:0;margin:0 auto;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#171717'; b.append(f)
  let view = 'desk', tour = 'ep7', who = 'fan', badge = 'brand', coach = 'hide', coic = 'now'
  const apply = () => { f.style.width = view === 'phone' ? '390px' : '100%'; const s = b.dataset.src + '?tour=' + tour + '&who=' + who + (b.dataset.badge ? '&badge=' + badge : '') + (b.dataset.coach ? '&coach=' + coach + '&coic=' + coic : '') + (b.dataset.q || ''); if (f.getAttribute('src') !== s) f.src = s }
  window.LAB = { view: 'toolbar', flows: () => [], go() {}, cur: () => ({ f: 0, i: 0 }),
    axes: () => [
      { key: 'tour', name: 'Турнир', value: tour, options: [{ v: 'ep7', label: 'Universe Ep. 7' }, { v: 'ti', label: 'TI 2026' }] },
      { key: 'who', name: 'Кто смотрит', value: who, options: [{ v: 'fan', label: 'Зритель' }, { v: 'ed', label: 'Редактор' }] },
      ...(b.dataset.badge ? [{ key: 'badge', name: 'Счётчик запасных', value: badge, options: [{ v: 'brand', label: 'Фиолетовый' }, { v: 'black', label: 'Чёрный' }, { v: 'white', label: 'Белый' }, { v: 'gray', label: 'Серый (как сейчас)' }] }] : []),
      ...(b.dataset.coach ? [{ key: 'coach', name: 'Тренер не указан', value: coach, options: [{ v: 'hide', label: 'Не показывать' }, { v: 'dim', label: 'Тусклой строкой' }] },
        { key: 'coic', name: 'Значок тренера', value: coic, options: [{ v: 'now', label: 'Как сейчас' }, { v: 'sports', label: 'Свисток' }, { v: 'headset_mic', label: 'Гарнитура' }, { v: 'school', label: 'Шапочка' }, { v: 'record_voice_over', label: 'Говорит' }, { v: 'psychology', label: 'Голова' }, { v: 'clinical_notes', label: 'Планшет' }] }] : []),
      { key: 'view', name: 'Вид', value: view, options: [{ v: 'desk', label: 'Компьютер 1440' }, { v: 'phone', label: 'Телефон 390' }] }],
    set(k, x) { if (k === 'view') view = x; if (k === 'tour') tour = x; if (k === 'who') who = x; if (k === 'badge') badge = x; if (k === 'coach') coach = x; if (k === 'coic') coic = x; apply() }, toggles: () => [], toggle() {}, caption: () => '' }
  apply()
})()
