"""Лаба players-list-26: данные для «Все игроки» (26.11) → data/players.json.
   Valve-рейтинг и регион — официальный лидерборд Valve (dota2.com/webapi/ILeaderboard, 4 региона, по нику), снято 26.11.
   Паб — OpenDota /players/{steam}: wl, totals, герои и последние 20 матчей, ranked (lobby_type=7), за всё время (свежие пабы про-игроков OpenDota почти не видит).
   Форма Про — карты TI 2026 из базы (_db/src/od-ti-players.json): очки за карту 3·K − D + 1,5·A + NW/2000, победа / поражение."""
import json, os, re
H = os.path.dirname(os.path.abspath(__file__)); DB = os.path.join(H, '../../_db')
META = json.load(open('/private/tmp/claude-502/-Users-xcode-Desktop-FantasyWeb/14f7de27-eaff-44d8-a9d7-f47c5e6605d3/scratchpad/meta.json'))
steam = json.load(open('/private/tmp/claude-502/-Users-xcode-Desktop-FantasyWeb/14f7de27-eaff-44d8-a9d7-f47c5e6605d3/scratchpad/steam.json'))
REG = {'americas': 'Америка', 'europe': 'Европа', 'se_asia': 'Юго-Восточная Азия', 'china': 'Китай'}
norm = lambda s: re.sub(r'[^a-z0-9а-я一-龥]', '', (s or '').lower())
# ник может совпасть у разных людей: берём запись с тегом команды (значит, про) или ту, где совпала страна игрока
lb = {}
for d in REG:
    for r in json.load(open(os.path.join(H, f'lb-{d}.json')))['leaderboard']:
        k = norm(r.get('name'))
        if k: lb.setdefault(k, []).append((REG[d], r['rank'], (r.get('team_tag') or '').lower(), (r.get('country') or '').lower()))
global_db = {}
exec(open(os.path.join(H, 'dbmeta.py')).read()) if os.path.exists(os.path.join(H, 'dbmeta.py')) else None
ti = json.load(open(os.path.join(DB, 'src/od-ti-players.json')))
out = {}
# герои OpenDota: id → наш id (npc_dota_hero_drow_ranger → drow_ranger)
try: HN = {h['id']: h['name'].replace('npc_dota_hero_', '') for h in json.load(open(os.path.join(H, 'od-heroes.json')))}
except Exception: HN = {}
for pid, nick, s in steam:
    o = {}
    meta = META.get(pid, {})
    ok = [x for x in lb.get(norm(nick), []) if x[2] or (x[3] and x[3] == meta.get('country', ''))]   # про-запись (есть тег команды) или та же страна
    if ok: v = min(ok, key=lambda x: x[1]); o['region'], o['valve'] = v[0], v[1]
    def j(n):
        try: return json.load(open(os.path.join(H, 'od', f'{s}-{n}.json')))
        except Exception: return None
    wl, tot, mt = j('wl'), j('tot'), j('mt')
    if wl and isinstance(wl, dict) and wl.get('win', 0) + wl.get('lose', 0):
        T = {x['field']: x for x in tot} if isinstance(tot, list) else {}
        n = T.get('kills', {}).get('n') or (wl['win'] + wl['lose'])
        avg = lambda f: round(T[f]['sum'] / T[f]['n'], 1) if f in T and T[f]['n'] else None
        o['pub'] = {'maps': wl['win'] + wl['lose'], 'wins': wl['win'], 'k': avg('kills'), 'd': avg('deaths'), 'a': avg('assists'), 'gpm': avg('gold_per_min'), 'xpm': avg('xp_per_min'), 'dmg': avg('hero_damage')}
        if isinstance(mt, list) and mt:
            o['pubForm'] = [[round(3 * m['kills'] - m['deaths'] + 1.5 * m['assists'], 1), int((m['player_slot'] < 128) == m['radiant_win'])] for m in reversed(mt)]
    hs = j('hero')
    if isinstance(hs, list) and hs:
        top = sorted([h for h in hs if h.get('games')], key=lambda h: -h['games'])[:3]
        o['pubHeroes'] = [{'hero': HN.get(int(h['hero_id'])), 'maps': h['games'], 'wins': h['win']} for h in top if HN.get(int(h['hero_id']))]
    pf = []
    for mid in sorted(ti, key=int):
        for r in ti[mid]:
            if r[0] == s: pf.append([round(3 * r[2] - r[3] + 1.5 * r[4] + r[11] / 2000, 1), r[12]])
    if pf: o['proForm'] = pf
    out[pid] = o
# рейтинг Паб — место среди игроков по очкам за паб-матч (3·K − D + 1,5·A), от 100 матчей
sc = sorted([(p, (o['pub']['k'] * 3 - o['pub']['d'] + o['pub']['a'] * 1.5)) for p, o in out.items() if o.get('pub') and o['pub']['maps'] >= 100 and o['pub']['k'] is not None], key=lambda x: -x[1])
for i, (p, v) in enumerate(sc): out[p]['pub']['rank'], out[p]['pub']['pts'] = i + 1, round(v, 1)
json.dump(out, open(os.path.join(H, 'players.json'), 'w'), ensure_ascii=False)
print(len(out), 'valve', sum('valve' in o for o in out.values()), 'pub', sum('pub' in o for o in out.values()), 'pubForm', sum('pubForm' in o for o in out.values()), 'proForm', sum('proForm' in o for o in out.values()))
