/** Подмена InfoTip в сборке лабы tables-rules: v2–v4 — «i» и настройки одной кнопкой; v0 / v1 и всё вне таблиц страницы — оригинал. */
import { InfoTip as Orig, type InfoTipData } from '../../../../ui/src/atoms/InfoTip/v1/InfoTip'
import { InfoSettings, SET } from './rules'
export type { InfoTipData }
const ON = new URLSearchParams(location.search).get('rules') !== '0' && SET !== 'v1'
export const InfoTip = ({ data }: { data: InfoTipData }) => (ON ? <InfoSettings data={data} /> : <Orig data={data} />)
