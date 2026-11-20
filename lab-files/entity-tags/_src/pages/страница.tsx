/** Куда ведёт тег команды / игрока: своих страниц пока нет — заглушка с тегом крупно и «Назад». */
import { Tag, tagInfo, type TagKind } from '../Tag'
import { start } from '../lab'
import '../lab.css'
const q = new URLSearchParams(location.search)
const k = (q.get('k') as TagKind) || 'team', id = q.get('id') || ''
start(() => (
  <main className="lab-stub">
    <a className="lab-stub__back" href="javascript:history.back()">← Назад</a>
    <div className="lab-stub__head"><Tag kind={k} id={id} size="l" plain /></div>
    <p>{tagInfo(k, id).sub}</p>
    <p className="lab-stub__note">Здесь будет страница {k === 'team' ? 'команды' : k === 'player' ? 'игрока' : k === 'hero' ? 'героя' : 'турнира'}. В лабе — заглушка: показывает, что тег ведёт сюда.</p>
  </main>
))
