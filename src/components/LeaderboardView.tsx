import React, { useState } from 'react';
import { Trophy, Search, Filter, Flame, Zap, Shield } from 'lucide-react';
import { sounds } from '../audio';

interface LeaderboardViewProps {
  playerCallsign: string;
  playerScore: number;
  playerKills: number;
}

interface FullPilot {
  rank: number;
  callsign: string;
  tag?: string;
  isPlayer?: boolean;
  tier: 'free' | 'staked';
  mass: number;
  kills: number;
  bountySol: number;
  winRate: string;
  status: 'DOMINATING' | 'HUNTING' | 'EXTRACTING' | 'ACTIVE' | 'IN COMBAT';
}

const LEADERBOARD_DATA: FullPilot[] = [
  {
    rank: 1,
    callsign: 'MIRA',
    tag: 'APEX',
    tier: 'staked',
    mass: 14280,
    kills: 18,
    bountySol: 2.45,
    winRate: '84%',
    status: 'DOMINATING',
  },
  {
    rank: 2,
    callsign: 'QUILL',
    tier: 'staked',
    mass: 11940,
    kills: 14,
    bountySol: 1.80,
    winRate: '79%',
    status: 'HUNTING',
  },
  {
    rank: 3,
    callsign: 'PYRE',
    tier: 'staked',
    mass: 9850,
    kills: 11,
    bountySol: 0.95,
    winRate: '72%',
    status: 'EXTRACTING',
  },
  {
    rank: 4,
    callsign: 'VORTEX_9',
    tier: 'free',
    mass: 7420,
    kills: 8,
    bountySol: 0.60,
    winRate: '68%',
    status: 'ACTIVE',
  },
  {
    rank: 5,
    callsign: 'HYPER_DRIFT',
    tier: 'staked',
    mass: 6910,
    kills: 7,
    bountySol: 0.52,
    winRate: '64%',
    status: 'ACTIVE',
  },
  {
    rank: 6,
    callsign: 'SOLAR_LANCE',
    tier: 'free',
    mass: 6120,
    kills: 6,
    bountySol: 0.40,
    winRate: '61%',
    status: 'ACTIVE',
  },
  {
    rank: 7,
    callsign: 'ZERO_PULSE',
    tier: 'free',
    mass: 5740,
    kills: 5,
    bountySol: 0.35,
    winRate: '59%',
    status: 'ACTIVE',
  },
];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  playerCallsign,
  playerScore,
  playerKills,
}) => {
  const [filterTier, setFilterTier] = useState<'all' | 'free' | 'staked'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPilots = LEADERBOARD_DATA.filter((p) => {
    if (filterTier !== 'all' && p.tier !== filterTier) return false;
    if (searchQuery && !p.callsign.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#19202a] border border-[#00f5d4]/30 text-[#00f5d4] mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
              SECTOR HIERARCHY // SEASON-04 CYCLE 81
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-[#dce3f0] tracking-wider">
            GLOBAL LEADERBOARD
          </h1>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#83948f] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH CALLSIGN..."
              className="w-full pl-9 pr-3 py-2 bg-[#080f18] text-[#dce3f0] font-mono text-xs rounded border border-[#3a4a46]/70 focus:border-[#00f5d4] outline-none uppercase placeholder-[#83948f]/50"
            />
          </div>

          {/* Tier Buttons */}
          <div className="flex items-center p-1 rounded bg-[#080f18] border border-[#3a4a46]/50">
            {(['all', 'free', 'staked'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  sounds.playBeep(640);
                  setFilterTier(t);
                }}
                className={`px-3 py-1 font-mono text-[11px] uppercase font-bold rounded transition-colors ${
                  filterTier === t
                    ? 'bg-[#00f5d4] text-[#00382f]'
                    : 'text-[#b9cac4] hover:text-[#dce3f0]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-xl bg-[#19202a]/85 border border-[#00f5d4]/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#080f18]/80 text-[#83948f] uppercase text-[10px] tracking-wider border-b border-[#3a4a46]/40">
                <th className="p-4">RANK</th>
                <th className="p-4">PILOT CALLSIGN</th>
                <th className="p-4">MODE</th>
                <th className="p-4">MASS / LENGTH</th>
                <th className="p-4">TAKEDOWNS</th>
                <th className="p-4">BOUNTY REAPED</th>
                <th className="p-4">WIN RATE</th>
                <th className="p-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3a4a46]/20">
              {/* Player Current Standings Row */}
              <tr className="bg-[#00f5d4]/10 border-b-2 border-[#00f5d4]/50">
                <td className="p-4 font-bold text-[#00f5d4]">#05</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] shadow-[0_0_8px_#00f5d4]" />
                    <span className="font-bold text-[#00f5d4]">{playerCallsign || 'CYBER_GHOST'}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#2e353f] text-[#00f5d4] rounded border border-[#00f5d4]/40 font-bold">
                      YOU
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#080f18] text-[#00f5d4] font-semibold border border-[#00f5d4]/30">
                    FREE / ACTIVE
                  </span>
                </td>
                <td className="p-4 font-bold text-[#00f5d4]">{playerScore.toLocaleString()}</td>
                <td className="p-4 font-bold text-[#00f5d4]">{playerKills} KILLS</td>
                <td className="p-4 font-bold text-[#f9bd22]">0.45 SOL</td>
                <td className="p-4 font-bold text-[#dce3f0]">62%</td>
                <td className="p-4 text-right">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/50 text-[10px] font-bold uppercase">
                    IN COMBAT
                  </span>
                </td>
              </tr>

              {/* Pilot List */}
              {filteredPilots.map((pilot) => (
                <tr
                  key={pilot.rank}
                  className="hover:bg-[#242a34]/60 transition-colors"
                >
                  <td className="p-4 font-bold text-[#83948f]">
                    {pilot.rank === 1 ? (
                      <span className="text-[#00dfc1] font-extrabold">#01</span>
                    ) : (
                      `#${pilot.rank.toString().padStart(2, '0')}`
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            pilot.rank === 1 ? '#ffb2b7' : pilot.tier === 'staked' ? '#f9bd22' : '#00dfc1',
                        }}
                      />
                      <span className="font-bold text-[#dce3f0]">{pilot.callsign}</span>
                      {pilot.tag && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#080f18] text-[#ffb2b7] rounded border border-[#ffb2b7]/30 font-semibold">
                          {pilot.tag}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold border ${
                        pilot.tier === 'staked'
                          ? 'bg-[#080f18] text-[#f9bd22] border-[#f9bd22]/40'
                          : 'bg-[#080f18] text-[#b9cac4] border-[#3a4a46]/50'
                      }`}
                    >
                      {pilot.tier}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[#dce3f0]">{pilot.mass.toLocaleString()}</td>
                  <td className="p-4 font-bold text-[#00f5d4]">{pilot.kills} KILLS</td>
                  <td className="p-4 font-bold text-[#f9bd22]">{pilot.bountySol.toFixed(2)} SOL</td>
                  <td className="p-4 text-[#dce3f0]">{pilot.winRate}</td>
                  <td className="p-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        pilot.status === 'DOMINATING'
                          ? 'bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/40'
                          : pilot.status === 'HUNTING'
                          ? 'bg-[#080f18] text-[#26fedc] border border-[#26fedc]/30'
                          : 'bg-[#080f18] text-[#b9cac4] border border-[#3a4a46]/50'
                      }`}
                    >
                      {pilot.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
