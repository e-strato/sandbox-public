/** Что ставит лаба в правую колонку страницы матча: v2–v5 — AskWidget (вид из setLook), v6–v8 — колода DeckAsk (раскладка из setDeck) */
import { AskWidget } from './Ask'
import { DeckAsk, type DeckLayout } from './Deck'
import { FinalAsk, type FinalOpts } from './Final'
let DECK: DeckLayout | null = null
export const setDeck = (d: DeckLayout) => { DECK = d }
let FIN: FinalOpts | null = null
export const setFinal = (o: FinalOpts) => { FIN = o }
export function EnginePredictions(_: { state?: string }) {
  return <>{FIN ? <FinalAsk {...FIN} /> : DECK ? <DeckAsk layout={DECK} /> : <AskWidget />}<div className="lab-free" style={{ height: 300 }}>Другие виджеты колонки</div></>
}
