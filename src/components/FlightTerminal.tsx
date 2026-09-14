import React from 'react';
import { ArenaMode } from '../types';
import { sounds } from '../audio';
import { Gamepad2, Shuffle, Rocket, ShieldCheck, Flame } from 'lucide-react';

interface FlightTerminalProps {
  callsign: string;
  setCallsign: (val: string) => void;
  arenaMode: ArenaMode;
  setArenaMode: (mode: ArenaMode) => void;
  onEnterArena: () => void;
}

const RANDOM_CALLSIGNS = [
  'CYBER_GHOST',
  'VORTEX_9',
  'NEON_ECHO',
  'HYPER_DRIFT',
  'SOLAR_LANCE',
  'VOID_WALKER',
  'APEX_SURGE',
  'ZERO_PULSE',
  'PHANTOM_07',
  'QUANTUM_AXIS',
  'CHRONO_JET',
  'NOVA_REAPER',
];

export const FlightTerminal: React.FC<FlightTerminalProps> = ({
  callsign,
  setCallsign,
  arenaMode,
  setArenaMode,
  onEnterArena,
}) => {
  const handleRandomize = () => {
    sounds.playBeep(700);
    const filtered = RANDOM_CALLSIGNS.filter((c) => c !== callsign);
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    setCallsign(pick);
  };

  return (
    <div className="flex h-full flex-col justify-between p-6 lg:p-8 rounded-xl bg-[#19202a]/90 border border-[#00f5d4]/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col gap-4">
        {/* Card Header & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-[#00f5d4]" />
            <span className="font-mono text-[11px] font-bold text-[#00f5d4] uppercase tracking-widest">
              FLIGHT TERMINAL
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#83948f] tracking-wider">NET_PING: 21MS</span>
        </div>

        {/* Callsign / Handle Input with Randomizer */}
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="font-mono text-[10px] uppercase tracking-wider text-[#b9cac4]">
            PILOT CALLSIGN
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              maxLength={14}
              value={callsign}
              onChange={(e) => setCallsign(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
              placeholder="ENTER HANDLE..."
              className="w-full bg-[#080f18] text-[#d7fff3] font-mono text-sm px-4 py-3 rounded outline-none border border-[#3a4a46]/70 focus:border-[#00f5d4] focus:bg-[#151c26] transition-all uppercase placeholder-[#83948f]/50 shadow-inner"
            />
            <button
              type="button"
              onClick={handleRandomize}
              title="Randomize Callsign"
              className="absolute right-2 px-2.5 py-1 rounded bg-[#2e353f]/80 hover:bg-[#00f5d4] hover:text-[#00382f] text-[#00f5d4] transition-all text-xs flex items-center gap-1 font-mono font-bold"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="text-[10px]">RND</span>
            </button>
          </div>
        </div>

        {/* Arena Mode Selector Tabs */}
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="font-mono text-[10px] uppercase tracking-wider text-[#b9cac4]">
            ENGAGEMENT PROTOCOL
          </label>
          <div className="grid grid-cols-2 gap-2">
            {/* Free Arena Tab */}
            <button
              type="button"
              onClick={() => {
                sounds.playBeep(640);
                setArenaMode('free');
              }}
              className={`flex flex-col text-left p-2.5 rounded transition-all ${
                arenaMode === 'free'
                  ? 'bg-[#2e353f]/90 text-[#00f5d4] border border-[#00f5d4]/40 shadow-md'
                  : 'bg-[#151c26] text-[#b9cac4] hover:text-[#dce3f0] border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-display text-xs uppercase font-bold text-[#d7fff3]">FREE ARENA</span>
                <span className="w-2 h-2 rounded-full bg-[#00dfc1] shadow-[0_0_6px_#00dfc1]" />
              </div>
              <span className="font-mono text-[9px] text-[#b9cac4] mt-1 leading-tight">
                Instant play · Zero wallet · Global glory
              </span>
            </button>

            {/* Staked Run Tab */}
            <button
              type="button"
              onClick={() => {
                sounds.playBeep(680);
                setArenaMode('staked');
              }}
              className={`flex flex-col text-left p-2.5 rounded transition-all ${
                arenaMode === 'staked'
                  ? 'bg-[#2e353f]/90 text-[#f9bd22] border border-[#f9bd22]/40 shadow-md'
                  : 'bg-[#151c26] text-[#b9cac4] hover:text-[#dce3f0] border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-display text-xs uppercase font-bold text-[#f9bd22]">STAKED RUN</span>
                <Flame className="w-3.5 h-3.5 text-[#f9bd22]" />
              </div>
              <span className="font-mono text-[9px] text-[#83948f] mt-1 leading-tight">
                0.1 - 1.0 SOL · Hunt pilots · Extract loot
              </span>
            </button>
          </div>
        </div>

        {/* Mode Info Context Banner */}
        <div className="p-3 rounded bg-[#080f18]/80 text-[#b9cac4] font-mono text-xs flex items-start gap-2 border border-[#3a4a46]/40">
          {arenaMode === 'free' ? (
            <>
              <ShieldCheck className="w-4 h-4 text-[#00dfc1] mt-0.5 shrink-0" />
              <span className="text-[11px] leading-relaxed">
                Spawn immediately in Sector-09 with full telemetry tracking. Climb the hourly leaderboard.
              </span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 text-[#f9bd22] mt-0.5 shrink-0" />
              <span className="text-[11px] leading-relaxed text-[#ffd57d]">
                Deposit 0.1 - 1.0 SOL into non-custodial smart escrow. Harvest defeated pilots and extract safely.
              </span>
            </>
          )}
        </div>

        {/* Massive Play CTA Button */}
        <button
          type="button"
          onClick={() => {
            sounds.playBoostSound();
            onEnterArena();
          }}
          className="w-full py-4 mt-1 rounded bg-[#00f5d4] text-[#00382f] font-display text-base sm:text-lg font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,245,212,0.6)] hover:shadow-[0_0_45px_rgba(0,245,212,0.85)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Rocket className="w-5 h-5" />
          <span>ENTER ARENA · PLAY</span>
        </button>
      </div>

      {/* Controls Legend Bar */}
      <div className="mt-6 pt-3 bg-[#080f18]/50 p-3 rounded border border-[#3a4a46]/30 flex flex-col gap-1">
        <span className="font-mono text-[9px] text-[#83948f] tracking-wider uppercase">
          FLIGHT DIRECTIVES:
        </span>
        <p className="font-mono text-[#26fedc] text-[10px] leading-tight">
          Drag or move to steer · Press and hold to boost · Never touch another line
        </p>
      </div>
    </div>
  );
};
