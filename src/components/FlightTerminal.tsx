import React from 'react';
import { ArenaMode } from '../types';
import { sounds } from '../audio';
import {
  Gamepad2,
  Shuffle,
  Rocket,
  ShieldCheck,
  Flame,
  Lock,
  Zap,
} from 'lucide-react';

interface FlightTerminalProps {
  callsign: string;
  setCallsign: (val: string) => void;
  setWormColor?: (color: string) => void;
  arenaMode: ArenaMode;
  setArenaMode: (mode: ArenaMode) => void;
  onEnterArena: () => void;
}

const RANDOM_CALLSIGNS = [
  'NEON_WORM',
  'VOID_WORM',
  'NARKY_07',
  'WORM_LORD',
  'GLOW_CRAWLER',
  'BITE_FORCE',
  'TUBE_TERROR',
  'SNAKE_BYTE',
  'WORM_X',
  'DARK_CRAWLER',
  'NEON_BITE',
  'LAST_WORM',
];

const WORM_COLORS = [
  '#00f5d4', // Neon Cyan
  '#ff0055', // Electric Pink
  '#a855f7', // Neon Purple
  '#2bd966', // Vibrant Green
  '#ffd57d', // Warm Gold
  '#ff5500', // Crimson Orange
  '#00c3ff', // Deep Cyan
  '#e60067', // Hot Pink
];

export const FlightTerminal: React.FC<FlightTerminalProps> = ({
  callsign,
  setCallsign,
  setWormColor,
  arenaMode,
  setArenaMode,
  onEnterArena,
}) => {
  const handleRandomize = () => {
    sounds.playBeep(700);

    const filteredNames = RANDOM_CALLSIGNS.filter((c) => c !== callsign);
    const pickName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
    setCallsign(pickName);

    if (setWormColor) {
      const pickColor = WORM_COLORS[Math.floor(Math.random() * WORM_COLORS.length)];
      setWormColor(pickColor);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-[#00f5d4]/20 bg-[#19202a]/90 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:p-8">

      <div className="flex flex-col gap-4">

        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-[#00f5d4]" />

            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#00f5d4]">
              WORM TERMINAL
            </span>
          </div>

          <span className="font-mono text-[10px] tracking-wider text-[#83948f]">
            ARENA: ONLINE
          </span>

        </div>

        {/* Small status line */}
        <div className="flex items-center gap-2 border-b border-[#3a4a46]/30 pb-3">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f5d4] shadow-[0_0_8px_rgba(0,245,212,0.8)]" />

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#83948f]">
            Neon soil detected · Arena ready
          </span>
        </div>

        {/* =========================================================
            WORM NAME
        ========================================================= */}

        <div className="mt-1 flex flex-col gap-1.5">

          <label className="font-mono text-[10px] uppercase tracking-wider text-[#b9cac4]">
            WORM NAME
          </label>

          <div className="relative flex items-center">

            <input
              type="text"
              maxLength={14}
              value={callsign}
              onChange={(e) =>
                setCallsign(
                  e.target.value.toUpperCase().replace(/\s+/g, '_')
                )
              }
              placeholder="NAME YOUR WORM..."
              className="w-full rounded border border-[#3a4a46]/70 bg-[#080f18] px-4 py-3 font-mono text-sm uppercase text-[#d7fff3] outline-none shadow-inner transition-all placeholder:text-[#83948f]/50 focus:border-[#00f5d4] focus:bg-[#151c26]"
            />

            <button
              type="button"
              onClick={handleRandomize}
              title="Randomize Worm Name & Color"
              className="absolute right-2 flex items-center gap-1 rounded bg-[#2e353f]/80 px-2.5 py-1 font-mono text-xs font-bold text-[#00f5d4] transition-all hover:bg-[#00f5d4] hover:text-[#00382f]"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span className="text-[10px]">RND</span>
            </button>

          </div>

          <span className="font-mono text-[9px] text-[#83948f]">
            Pick a name. Then go make it famous.
          </span>

        </div>

        {/* =========================================================
            GAME MODE
        ========================================================= */}

        <div className="mt-1 flex flex-col gap-1.5">

          <label className="font-mono text-[10px] uppercase tracking-wider text-[#b9cac4]">
            CHOOSE YOUR HUNT
          </label>

          <div className="grid grid-cols-2 gap-2">

            {/* FREE ARENA */}

            <button
              type="button"
              onClick={() => {
                sounds.playBeep(640);
                setArenaMode('free');
              }}
              className={`flex flex-col rounded p-2.5 text-left transition-all ${
                arenaMode === 'free'
                  ? 'border border-[#00f5d4]/40 bg-[#2e353f]/90 text-[#00f5d4] shadow-md'
                  : 'border border-transparent bg-[#151c26] text-[#b9cac4] hover:text-[#dce3f0]'
              }`}
            >

              <div className="flex w-full items-center justify-between">

                <span className="font-display text-xs font-bold uppercase text-[#d7fff3]">
                  FREE ARENA
                </span>

                <span className="h-2 w-2 rounded-full bg-[#00dfc1] shadow-[0_0_6px_#00dfc1]" />

              </div>

              <span className="mt-1 font-mono text-[9px] leading-tight text-[#b9cac4]">
                Free to crawl · Eat · Grow · Survive
              </span>

            </button>

            {/* STAKED RUN - COMING SOON */}

            <button
              type="button"
              onClick={() => {
                sounds.playBeep(680);
                setArenaMode('staked');
              }}
              className={`relative flex flex-col rounded p-2.5 text-left transition-all ${
                arenaMode === 'staked'
                  ? 'border border-[#f9bd22]/40 bg-[#2e353f]/90 shadow-md'
                  : 'border border-transparent bg-[#151c26] hover:border-[#f9bd22]/20'
              }`}
            >

              <div className="flex w-full items-center justify-between">

                <span className="font-display text-xs font-bold uppercase text-[#f9bd22]">
                  STAKED RUN
                </span>

                <Lock className="h-3.5 w-3.5 text-[#f9bd22]/80" />

              </div>

              <span className="mt-1 font-mono text-[9px] leading-tight text-[#83948f]">
                SOL battles · Bigger rewards
              </span>

              {/* Coming soon label */}
              <span className="mt-2 inline-flex w-fit items-center gap-1 rounded border border-[#f9bd22]/20 bg-[#f9bd22]/5 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#f9bd22]/80">
                <Zap className="h-2.5 w-2.5" />
                Coming Soon
              </span>

            </button>

          </div>
        </div>

        {/* =========================================================
            MODE INFORMATION
        ========================================================= */}

        <div className="flex items-start gap-2 rounded border border-[#3a4a46]/40 bg-[#080f18]/80 p-3 font-mono text-xs text-[#b9cac4]">

          {arenaMode === 'free' ? (
            <>
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00dfc1]" />

              <span className="text-[11px] leading-relaxed">
                Drop straight into the arena. Eat glowing food, grow your
                worm, dodge rivals, and climb the leaderboard.
              </span>
            </>
          ) : (
            <>
              <Flame className="mt-0.5 h-4 w-4 shrink-0 text-[#f9bd22]" />

              <span className="text-[11px] leading-relaxed text-[#ffd57d]">
               
                SOL entry, rewards, and competitive worm battles will be
                activated in a future release.
              </span>
            </>
          )}

        </div>

        {/* =========================================================
            PLAY BUTTON
        ========================================================= */}

        <button
          type="button"
          onClick={() => {
            sounds.playBoostSound();
            onEnterArena();
          }}
          className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-[#00f5d4] py-4 font-display text-base font-bold uppercase tracking-widest text-[#00382f] shadow-[0_0_30px_rgba(0,245,212,0.6)] transition-all hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(0,245,212,0.85)] active:scale-[0.99] sm:text-lg"
        >

          <Rocket className="h-5 w-5" />

          <span>
            ENTER ARENA · CRAWL
          </span>

        </button>

      </div>

      {/* =========================================================
          CONTROLS
      ========================================================= */}

      <div className="mt-6 flex flex-col gap-1 rounded border border-[#3a4a46]/30 bg-[#080f18]/50 p-3">

        <div className="flex items-center gap-2">

          <span className="font-mono text-[9px] uppercase tracking-wider text-[#83948f]">
            WORM CONTROLS:
          </span>

          <span className="h-1 w-1 rounded-full bg-[#00f5d4]" />

          <span className="font-mono text-[9px] uppercase tracking-wider text-[#00f5d4]/70">
            LIVE
          </span>

        </div>

        <p className="font-mono text-[10px] leading-tight text-[#26fedc]">
          Drag or move to steer · Hold to boost · Eat the glowing orbs ·
          Don't hit another worm
        </p>

      </div>

    </div>
  );
};