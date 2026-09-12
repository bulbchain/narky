import React from 'react';
import { ArrowRight, Wallet, Shield, Flame } from 'lucide-react';
import { sounds } from '../audio';

interface DualEngagementZonesProps {
  onSelectFree: () => void;
  onSelectStaked: () => void;
}

export const DualEngagementZones: React.FC<DualEngagementZonesProps> = ({
  onSelectFree,
  onSelectStaked,
}) => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#080f18]/60 border-y border-[#00f5d4]/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-[10px] text-[#00f5d4] uppercase tracking-widest font-semibold">
            CHOOSE YOUR ARENA
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#dce3f0] font-bold mt-1 tracking-wider">
            DUAL ENGAGEMENT ZONES
          </h2>
          <p className="font-mono text-sm text-[#b9cac4] mt-2">
            From zero-stake rapid respawns to high-octane Solana wagers, configure your combat risk threshold.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
          {/* CARD 1: FREE ARENA */}
          <div className="relative rounded-xl p-6 sm:p-8 bg-[#19202a]/85 border border-[#00f5d4]/30 backdrop-blur-xl flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#00f5d4]/60 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00f5d4] shadow-[0_0_12px_#00f5d4]" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00f5d4] px-2.5 py-1 bg-[#080f18] rounded border border-[#00f5d4]/30 tracking-wider">
                  TIER-01 // DRIFT DRILL
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#00dfc1]">
                  <span className="w-2 h-2 rounded-full bg-[#00dfc1] animate-pulse" />
                  INSTANT LAUNCH
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl uppercase text-[#dce3f0] font-bold tracking-wide">
                  FREE ARENA
                </h3>
                <p className="font-mono text-[11px] text-[#83948f] tracking-wider mt-1">
                  play now · no wallet · glory board
                </p>
              </div>

              <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
                The premier playground for testing drift turn-rates, bait tactics, and boosting maneuvers. Hop straight in using any browser without connecting Web3 wallets or approvals.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">ENTRY FEE</span>
                  <span className="text-[#00f5d4] text-sm font-bold mt-0.5">0.00 SOL / FREE</span>
                </div>
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">RESPAWN TIME</span>
                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">INSTANT (&lt;1s)</span>
                </div>
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">LEADERBOARD</span>
                  <span className="text-[#00f5d4] text-sm font-bold mt-0.5">GLOBAL DAILY</span>
                </div>
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">MAX SPEED MULTIPLIER</span>
                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">3.2x BOOST</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  sounds.playBeep(700);
                  onSelectFree();
                }}
                className="w-full py-3.5 rounded bg-[#242a34] hover:bg-[#00f5d4] hover:text-[#00382f] text-[#00f5d4] font-display text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group/btn border border-[#00f5d4]/40 cursor-pointer shadow-md"
              >
                <span>PLAY FREE ARENA NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* CARD 2: STAKED RUN */}
          <div className="relative rounded-xl p-6 sm:p-8 bg-[#19202a]/85 border border-[#f9bd22]/30 backdrop-blur-xl flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#f9bd22]/60 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#f9bd22] shadow-[0_0_12px_#f9bd22]" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#f9bd22] px-2.5 py-1 bg-[#080f18] rounded border border-[#f9bd22]/30 tracking-wider">
                  TIER-02 // HIGH ROLLER GRID
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#f9bd22]">
                  <Flame className="w-3.5 h-3.5" />
                  ESCROW VERIFIED
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl uppercase text-[#dce3f0] font-bold tracking-wide">
                  STAKED RUN
                </h3>
                <p className="font-mono text-[11px] text-[#83948f] tracking-wider mt-1">
                  risk SOL · hunt players · escape with what you take
                </p>
              </div>

              <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
                Every downed pilot yields their accumulated vault balance directly into your tail vector. Escape through the quantum wormhole gate with your harvest or be hunted into dust.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">WAGER SLOTS</span>
                  <span className="text-[#f9bd22] text-sm font-bold mt-0.5">0.05 - 2.5 SOL</span>
                </div>
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">LOOT SPLIT</span>
                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">94% PILOT BOUNTY</span>
                </div>
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">EXTRACTION LOCK</span>
                  <span className="text-[#f9bd22] text-sm font-bold mt-0.5">ACTIVE GATE</span>
                </div>
                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">SMART CONTRACT</span>
                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">AUDITED ON SOL</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  sounds.playBeep(800);
                  onSelectStaked();
                }}
                className="w-full py-3.5 rounded bg-[#f9bd22] text-[#261a00] font-display text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_25px_rgba(249,189,34,0.6)] hover:bg-[#ffd57d] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Wallet className="w-4 h-4" />
                <span>CONNECT &amp; ENTER STAKED RUN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
