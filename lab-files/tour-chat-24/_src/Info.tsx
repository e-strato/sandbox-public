/** Лаба tour-chat-24: кнопка «i» в шапке каждой таблицы — значок на подложке 28, как «О турнире» (v2, выбрана дирижёром 24.11).
 *  v3–v5 (дирижёр 24.11: «в открытой подсказке контент должен быть понятно разложен, а не кривой текст») — вид содержимого из адреса ?tip=:
 *  text — строки текстом (v2) · list — заголовок, «подпись — значение» в две колонки, легенда цветов и значков · tiles — заголовок и плитки 2×N (подпись мелко, значение крупно), легенда · legend — заголовок, сначала легенда (что значит цвет / значок), под ней факты одной строкой */
import type { ReactNode } from 'react'
import { Tooltip } from '@/atoms/Tooltip'
import { Icon } from '@/atoms/Icon'
import { PhIcon } from '@/engine/common/PageHeader/v4/icons'

/** Что в подсказке: заголовок, факты «подпись — значение», легенда (цвет зоны или значок + что значит) */
export type InfoData = { title: string; rows: [string, ReactNode][]; note?: string; legend?: { mark: 'up' | 'down' | 'mid' | 'shield' | 'ph-player' | 'swap'; text: string }[] }
const TIP = new URLSearchParams(location.search).get('tip') || 'text'

const Mark = ({ m }: { m: NonNullable<InfoData['legend']>[number]['mark'] }) =>
  m === 'up' || m === 'down' || m === 'mid' ? <i className={'lab-tip__sw lab-tip__sw--' + m} /> : <span className={'lab-tip__ic' + (m === 'swap' ? ' is-sw' : '')}><Icon name={m as 'shield'} size={12} /></span>

function Body({ d }: { d: InfoData }) {
  const legend = d.legend?.length ? <ul className="lab-tip__lg">{d.legend.map((l) => <li key={l.text}><Mark m={l.mark} />{l.text}</li>)}</ul> : null
  if (TIP === 'text') return <span className="lab-info__tip">{d.rows.map(([k, v]) => <span key={k}>{k}: {v}</span>)}{d.legend?.map((l) => <span key={l.text}>{l.text}</span>)}</span>
  if (TIP === 'list') return (
    <div className="lab-tip lab-tip--list"><b className="lab-tip__h">{d.title}</b>
      <dl>{d.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>{legend && <><hr />{legend}</>}{d.note && <><hr /><small className="lab-tip__note">{d.note}</small></>}</div>)
  if (TIP === 'tiles') return (
    <div className="lab-tip lab-tip--tiles"><b className="lab-tip__h">{d.title}</b>
      <dl>{d.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>{legend}</div>)
  return (
    <div className="lab-tip lab-tip--legend"><b className="lab-tip__h">{d.title}</b>{legend}
      <p className="lab-tip__facts">{d.rows.map(([k, v], i) => <span key={k}>{i > 0 && <em> · </em>}<span>{k}</span> {v}</span>)}</p></div>)
}

export const Info = ({ data }: { data: InfoData }) => (
  <Tooltip side="top" align="end" content={<Body d={data} />}>
    <button type="button" className="lab-info lab-info--pill" aria-label={data.title}><PhIcon name="info" size={15} /></button>
  </Tooltip>)
