/** v1 · Один вопрос (созвон 20.11, задачи 79-18 … 84-23): прошлая версия — один вопрос и две кнопки — доделанная по задачам.
 *  Колонка как правая на странице матча (340): виджет небольшой, ниже — место под другие виджеты. Справа — тот же виджет, когда вопросов нет. */
import { AskWidget } from '../Ask'
import { start } from '../lab'
start(() => (
  <div className="lab-pg">
    <div className="lab-col"><AskWidget /><div className="lab-free">Свободно — под другие виджеты колонки</div></div>
    <div className="lab-col"><p className="lab-cap">Вопросов нет — следующий придёт сам</p><AskWidget start="empty" /></div>
  </div>
))
