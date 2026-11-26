/** Лаба hero-base — страница героя движка: базовая информация (задача 153-32, созвон 26.11 блок 50). ?v=0 — как сейчас (HeroPage v1 из ui), ?v=1 — с «О герое» и «В пабликах», ?v=2 — один компактный блок посередине, ?v=3–5 — герой в центре, постер, шапка крупнее; ?v=6–8 — шапка крупно, сворачивается при прокрутке; ?hero= */
import { useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import '@/tokens/tokens.css'
import { useSideSticky } from '@/engine/common/useSideSticky'
import { SiteHeader } from '@/engine/common/SiteHeader'
import { CellTagsProvider } from '@/common/Table/Cell'
import { hero } from '@/engine/hero/data'
import { HeroPage } from '@/engine/pages/Hero/v1/HeroPage'
import { HeroHeader } from '@/engine/hero/HeroHeader'
import { HeroMatchups } from '@/engine/hero/HeroMatchups'
import { HeroMeta } from '@/engine/hero/HeroMeta'
import { HeroPlayers } from '@/engine/hero/HeroPlayers'
import { HeroTotals } from '@/engine/hero/HeroTotals'
import { HeroSides } from '@/engine/hero/HeroSides'
import { HeroTeams } from '@/engine/hero/HeroTeams'
import { HeroAbout, HeroPub, HeroBrief, HeroCenter, HeroPoster, HeroHead } from './HeroBase'
import { HeroShrink } from './HeroShrink'

const q = new URLSearchParams(location.search), id = q.get('hero') || 'earth_spirit', v = q.get('v') || '1'
function V1({ two, look }: { two?: boolean; look?: string }) {
  const h = useMemo(() => hero(id), [])
  const side = useSideSticky()
  return (
    <CellTagsProvider>
    <div className="etpage etpage3 etpage5 eng-surface plpage hp">
      <SiteHeader active={'heroes' as 'matches'} viewer="in" />
      <main className="etpage__main">
        <div className="etpage__l">{look === '5' ? <HeroHead id={id} name={h.name} /> : look === '6' ? <HeroShrink id={id} name={h.name} mode="smooth" layout="a" /> : look === '7' ? <HeroShrink id={id} name={h.name} mode="snap" layout="a" /> : look === '8' ? <HeroShrink id={id} name={h.name} mode="smooth" layout="b" /> : look === '9' ? <HeroShrink id={id} name={h.name} mode="snap" layout="a" bar="std" img={h.img} /> : look === '10' ? <HeroShrink id={id} name={h.name} mode="snap" layout="a" bar="wr" img={h.img} /> : look === '14' ? <HeroShrink id={id} name={h.name} mode="snap" layout="a" bar="wr" img={h.img} about icon /> : look === '13' ? <HeroShrink id={id} name={h.name} mode="snap" layout="a" bar="wr" img={h.img} about /> : look === '12' ? <HeroShrink id={id} name={h.name} mode="snap" layout="a" bar="wr" img={h.img} about /> : look === '11' ? <HeroShrink id={id} name={h.name} mode="snap" layout="a" bar="attrs" img={h.img} /> : <HeroHeader h={h} />}{look === '3' ? <HeroCenter id={id} /> : look === '4' ? <HeroPoster id={id} name={h.name} /> : ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14'].includes(look ?? '') ? null : two ? <HeroBrief id={id} /> : <HeroPub id={id} name={h.name} />}<HeroMatchups h={h} /><HeroMeta h={h} /><HeroPlayers h={h} /></div>
        <aside className="etpage__r hp-side" ref={side}>{!two && !look && <HeroAbout id={id} />}<HeroTotals h={h} /><HeroSides h={h} />{look === '14' ? <HeroTeams h={h} n={5} /> : look !== '13' && <HeroTeams h={h} />}</aside>
      </main>
    </div>
    </CellTagsProvider>)
}
createRoot(document.getElementById('root')!).render(v === '0' ? <HeroPage id={id} /> : <V1 two={v === '2'} look={['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'].includes(v) ? v : undefined} />)
