/** Футер лабы site-footer: монтируется под страницей (#ft после #root). Вариант — ?ft=1…20 (0 — без футера); переходы по ссылкам шапки его помнят (sessionStorage). */
import { createRoot } from 'react-dom/client'
import { SiteFooter } from './SiteFooter'
const K = 'lab-site-footer'
let v = new URLSearchParams(location.search).get('ft')
try { if (v) sessionStorage.setItem(K, v); else v = sessionStorage.getItem(K) } catch { /* без хранилища — по адресу */ }
// 27.11: футер v12 уже в продукте (Claude-A, engine/common/SiteFooter) — страницы рисуют его сами; в вариантах лабы прячем его, остаётся только футер варианта
if (v && v !== '0') { const st = document.createElement('style'); st.textContent = '#root footer.sft { display: none !important; }'; document.head.append(st) }
if (v && /^([1-9]|1[0-9]|2[0-9]|3[0-6])$/.test(v)) createRoot(document.getElementById('ft')!).render(<SiteFooter v={v as '1'} />)
