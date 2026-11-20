// ЛАБА «Теги» (62-2): копия ui/src/match/MapGraph/v3/LanePanel.tsx — команды тегом S (с тегом v7)
import { Tag, tagVer } from '~lab/Tag'
import { Button } from '@/atoms/Button'
import { Icon } from '@/atoms/Icon'
import { kAbs, kSigned } from '@/data/format'
import type { MapData } from '@/match/data/maps'
import { EXPECTED_PICKS, LANE_FORECAST, LANE_OF_POS, LANE_VS, type LaneKey } from '@/match/data/lanes'
import { heroIcon, heroName, teamOf } from '@/match/data/refs'

const NM: Record<LaneKey, string> = { hard: 'Hard', mid: 'Mid', easy: 'Easy' }

/** Блок «Линии · золото 0–12′» у метки 12′ (лаба w-lane/_wl.js, WL_PANEL с WL_AT12): кого ждут впереди к 12′ и по каждой линии —
 *  герои друг против друга, шанс выиграть / ничья / проиграть, золото к 12′. До начала — ожидаемые герои из «Составов». ‼️ Цифры — пример, как в лабе. */
export function LanePanel({ map: m, pre, onClose }: { map: MapData; pre: boolean; onClose: () => void }) {
  const D = LANE_FORECAST, TA = teamOf(m.radiant), TB = teamOf(m.dire), lead = D.g12 >= 0 ? TA : TB
  const heroes = (rad: boolean) => pre
    ? EXPECTED_PICKS[rad ? 'radiant' : 'dire'].map((p) => ({ pos: p.pos, hero: p.hero as number | string }))
    : m.players.filter((p) => p.radiant === rad).map((p) => ({ pos: p.pos, hero: p.hero as number | string }))
  const ic = (rad: boolean, ln: LaneKey) => heroes(rad).filter((h) => LANE_OF_POS[h.pos] === ln).sort((a, b) => a.pos - b.pos)
    .map((h, i) => <img key={i} src={heroIcon(h.hero).src} alt="" title={heroName(h.hero)} />)
  return (
    <div className="map-graph__wl">
      <div className="map-graph__wl-hd"><b>Линии · золото 0–12′</b>
        <Button variant="ghost" size="icon-sm" title="Свернуть в точку 12′" aria-label="Свернуть в точку 12′" onClick={(e) => { e.stopPropagation(); onClose() }}>
          <Icon name="minimize" />
        </Button></div>
      <div className="map-graph__wl-sum">{tagVer() >= 7 ? <span>к 12′ ждут <Tag kind="team" id={lead.name} size="s" /></span> : <>{lead.logo && <img src={lead.logo} alt="" />}<span>к 12′ ждут <b>{lead.name}</b></span></>}<em>+{kAbs(D.g12)}</em></div>
      <div className="map-graph__wl-who">{tagVer() >= 7 ? <><Tag kind="team" id={TA.name} size="s" /> против <Tag kind="team" id={TB.name} size="s" /></> : <>{TA.name} против {TB.name}</>} — {pre ? 'ожидаемые герои, до драфта' : 'по драфту'}</div>
      {(['hard', 'mid', 'easy'] as LaneKey[]).map((ln) => { const L = D.lanes[ln], dr = 100 - L.win - L.lose, up = L.win > L.lose
        return <div key={ln} className="map-graph__wl-r">
          <div className="map-graph__wl-ln"><b>{NM[ln]}</b><small className={up ? 'up' : 'dn'}>{up ? '▲' : '▼'}{L.win}%</small></div>
          <div>
            <div className="map-graph__wl-hs"><span>{ic(true, ln)}</span><i>vs</i><span>{ic(false, LANE_VS[ln])}</span></div>
            <div className="map-graph__wl-bar"><i className="w" style={{ width: L.win + '%' }} /><i className="d" style={{ width: dr + '%' }} /><i className="l" style={{ width: L.lose + '%' }} /></div>
            <div className="map-graph__wl-p">выиграть {L.win}% · ничья {dr}% · проиграть {L.lose}%</div>
          </div>
          <div className={'map-graph__wl-g ' + (L.g12 >= 0 ? 'up' : 'dn')}>{kSigned(L.g12)}<small>к 12′</small></div>
        </div> })}
      <div className="map-graph__wl-ft">Пример данных</div>
    </div>
  )
}
