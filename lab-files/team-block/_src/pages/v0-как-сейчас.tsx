/** v0-как-сейчас · Как сейчас — блок команд на странице матча движка (MapTeams v5): две строки, одна команда над другой. */
import { MatchPage } from '@/engine/pages/Match'
import { MIRROR } from '../flags'
import { start } from '../lab'
MIRROR.on = false
start(() => <MatchPage state="live" viewer="in" />)
