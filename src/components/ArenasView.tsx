import React, { useState } from 'react';
import { Compass, Flame, Shield, Users, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { sounds } from '../audio';

interface ArenasViewProps {
  onSelectArena: (mode: 'free' | 'staked') => void;
}

const ARENA_SECTORS = [
  {
    id: 'sector-09',
    name: 'SECTOR-09: ACTIVE MATRIX',
    badge: 'FLAGSHIP ARENA',
    badgeColor: '#00f5d4',
    type: 'free' as const,
    pilots: 842,
    hazardRating: 'MODERATE (LEVEL 3)',
    entryFee: '0.00 SOL (FREE)',
    respawn: 'INSTANT (<1s)',
    description: 'The high-density proving ground for neon vector pilots. Standard inertia fields, abundant ambient photon clusters, and low friction turning.',
    rules: ['No wager requirements', 'Global leaderboard eligibility', 'Standard 3.2x boost limit'],
    active: true,
  },
  {
    id: 'high-roller',
    name: 'STAKED RUN: HIGH ROLLER GRID',
    badge: 'ESCROW VERIFIED',
    badgeColor: '#f9bd22',
    type: 'staked' as const,
    pilots: 418,
    hazardRating: 'EXTREME (LEVEL 5)',
    entryFee: '0.1 - 1.0 SOL',
    respawn: 'PERMADEATH / EXTRACT',
    description: 'Ruthless high-stakes zone where defeated pilots forfeit their vault mass directly to the killer. Extract through spontaneous wormhole gates.',
    rules: ['0.05 to 2.5 SOL wager options', '94% pilot kill bounty', 'Timed extraction portals'],
    active: true,
  },
  {
    id: 'apex-vortex',
    name: 'SECTOR-04: APEX VORTEX',
    badge: 'PULSE HAZARD',
    badgeColor: '#ffb2b7',
    type: 'free' as const,
    pilots: 222,
    hazardRating: 'CRITICAL (LEVEL 4)',
    entryFee: '0.00 SOL (FREE)',
    respawn: 'INSTANT (<1s)',
    description: 'A gravitational vortex pulls craft toward a central singularity. High photon concentrations spawn at the rim, rewarding risky maneuvers.',
    rules: ['Gravitational well pull', '+25% photon energy density', 'Perimeter magnetic barriers'],
    active: false,
  },
];

export const ArenasView: React.FC<ArenasViewProps> = ({ onSelectArena }) => {
  const [selectedId, setSelectedId] = useState('sector-09');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#19202a] border border-[#00f5d4]/30 text-[#00f5d4] mx-auto">
          <Compass className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
            NAVIGATION SECTOR MATRIX
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-[#dce3f0] tracking-wider">
          ARENAS &amp; ENGAGEMENT MODES
        </h1>
        <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
          Select your combat sector. Each zone offers distinct physics anomalies, hazard thresholds, and wager protocols.
        </p>
      </div>

      {/* Grid of Sectors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {ARENA_SECTORS.map((sector) => {
          const isSelected = selectedId === sector.id;
          return (
            <div
              key={sector.id}
              onClick={() => {
                sounds.playBeep(640);
                setSelectedId(sector.id);
              }}
              className={`relative rounded-xl p-6 sm:p-7 bg-[#19202a]/85 border flex flex-col justify-between transition-all cursor-pointer shadow-xl ${
                isSelected
                  ? 'border-[#00f5d4] shadow-[0_0_25px_rgba(0,245,212,0.25)] bg-[#19202a]'
                  : 'border-[#3a4a46]/50 hover:border-[#00f5d4]/40 hover:bg-[#242a34]/70'
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] px-2.5 py-1 rounded border tracking-wider font-semibold uppercase"
                    style={{
                      borderColor: sector.badgeColor + '60',
                      color: sector.badgeColor,
                      backgroundColor: '#080f18',
                    }}
                  >
                    {sector.badge}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#b9cac4]">
                    <Users className="w-3.5 h-3.5 text-[#00dfc1]" />
                    <span>{sector.pilots} PILOTS</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0] tracking-wide">
                    {sector.name}
                  </h3>
                  <p className="font-mono text-xs text-[#b9cac4] mt-2 leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-[11px]">
                  <div className="p-2.5 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                    <span className="text-[#83948f] text-[9px]">ENTRY</span>
                    <span className="text-[#00f5d4] font-bold mt-0.5">{sector.entryFee}</span>
                  </div>
                  <div className="p-2.5 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                    <span className="text-[#83948f] text-[9px]">HAZARD RATING</span>
                    <span className="text-[#dce3f0] font-bold mt-0.5">{sector.hazardRating}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#3a4a46]/30">
                  <span className="font-mono text-[10px] text-[#83948f] uppercase tracking-wider">
                    ZONE PROTOCOLS:
                  </span>
                  {sector.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-mono text-xs text-[#b9cac4]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00dfc1] shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playBoostSound();
                    onSelectArena(sector.type);
                  }}
                  className="w-full py-3 rounded bg-[#00f5d4] hover:bg-[#26fedc] text-[#00382f] font-display text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,245,212,0.4)]"
                >
                  <span>WARP TO SECTOR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
