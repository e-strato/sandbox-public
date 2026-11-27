/** Лаба match-draft (162-3) — страница матча из ui в состоянии «Драфт»; драфт подменён сборкой (_build.mjs → _src/MapDraft.tsx, вариант по ?v). */
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { MatchPage } from '@/engine/pages/Match'

createRoot(document.getElementById('root')!).render(<MatchPage state="draft" />)
