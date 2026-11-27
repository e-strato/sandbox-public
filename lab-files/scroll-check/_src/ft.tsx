/** Лаба scroll-check v5 (158-37 + 166-7): под страницей — футер последнего варианта лабы Claude-B «(B) Футер сайта» (v12 «Просто текстом»; его файлы — только чтение).
 *  На матче футера нет (дирижёр 27.11: «на матче точно футера не будет»).
 *  Правило с футером: до футера — отступ раскладки (12) всегда; страница короче окна — футер сразу за ней, а его фон тянется до низа окна (не пустота над футером). */
import { createRoot } from 'react-dom/client'
import { SiteFooter } from '../../site-footer/_src/SiteFooter'
const st = document.createElement('style')
st.textContent = `body { display: flex; flex-direction: column; min-height: 100vh; margin: 0; }
#root > *, #root .etpage, #root .spage, #root .etours:not(.tmon) { min-height: 0 !important; }
#ft { flex: 1; display: flex; flex-direction: column; } #ft > * { flex: 1; }`
document.head.append(st)
createRoot(document.getElementById('ft')!).render(<SiteFooter v="12" />)
