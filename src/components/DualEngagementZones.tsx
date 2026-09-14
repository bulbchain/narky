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

        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-[10px] text-[#00f5d4] uppercase tracking-widest font-semibold">
            CHOOSE YOUR HUNT
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#dce3f0] font-bold mt-1 tracking-wider">
            PICK YOUR ARENA
          </h2>

          <p className="font-mono text-sm text-[#b9cac4] mt-2">
            Start crawling for free, grow your worm, and prove you belong at the top of the Narky leaderboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">

          {/* ========================================================= */}
          {/* CARD 1: FREE ARENA */}
          {/* ========================================================= */}

          <div className="relative rounded-xl p-6 sm:p-8 bg-[#19202a]/85 border border-[#00f5d4]/30 backdrop-blur-xl flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#00f5d4]/60 transition-all">

            {/* Neon top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00f5d4] shadow-[0_0_12px_#00f5d4]" />

            <div className="flex flex-col gap-4">

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00f5d4] px-2.5 py-1 bg-[#080f18] rounded border border-[#00f5d4]/30 tracking-wider">
                  ARENA-01 // FREE CRAWL
                </span>

                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#00dfc1]">
                  <span className="w-2 h-2 rounded-full bg-[#00dfc1] animate-pulse" />
                  ARENA ONLINE
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-2xl uppercase text-[#dce3f0] font-bold tracking-wide">
                  FREE ARENA
                </h3>

                <p className="font-mono text-[11px] text-[#83948f] tracking-wider mt-1">
                  eat · grow · survive · climb
                </p>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
                Start small and crawl your way to the top. Eat glowing food,
                grow your worm, dodge rival players, and use your trail to
                trap anyone reckless enough to cross your path.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    ENTRY COST
                  </span>

                  <span className="text-[#00f5d4] text-sm font-bold mt-0.5">
                    FREE
                  </span>
                </div>

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    RESPAWN
                  </span>

                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">
                    INSTANT
                  </span>
                </div>

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    LEADERBOARD
                  </span>

                  <span className="text-[#00f5d4] text-sm font-bold mt-0.5">
                    GLOBAL
                  </span>
                </div>

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    BOOST
                  </span>

                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">
                    AVAILABLE
                  </span>
                </div>

              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  sounds.playBeep(700);
                  onSelectFree();
                }}
                className="w-full py-3.5 rounded bg-[#242a34] hover:bg-[#00f5d4] hover:text-[#00382f] text-[#00f5d4] font-display text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group/btn border border-[#00f5d4]/40 cursor-pointer shadow-md"
              >
                <span>ENTER FREE ARENA</span>

                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>


          {/* ========================================================= */}
          {/* CARD 2: STAKED RUN */}
          {/* ========================================================= */}

          <div className="relative rounded-xl p-6 sm:p-8 bg-[#19202a]/85 border border-[#f9bd22]/30 backdrop-blur-xl flex flex-col justify-between shadow-xl overflow-hidden group hover:border-[#f9bd22]/60 transition-all">

            {/* Gold top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#f9bd22] shadow-[0_0_12px_#f9bd22]" />

            <div className="flex flex-col gap-4">

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#f9bd22] px-2.5 py-1 bg-[#080f18] rounded border border-[#f9bd22]/30 tracking-wider">
                  ARENA-02 // HIGH STAKES
                </span>

                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#f9bd22]">
                  <Flame className="w-3.5 h-3.5" />
                  COMING SOON
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-2xl uppercase text-[#dce3f0] font-bold tracking-wide">
                  STAKED RUN
                </h3>

                <p className="font-mono text-[11px] text-[#83948f] tracking-wider mt-1">
                  bigger risk · bigger battles · coming soon
                </p>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
                A future competitive mode for worms that want more than the
                leaderboard. Enter high-stakes battles, hunt rival worms,
                collect valuable drops, and fight to survive until the end.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    ENTRY
                  </span>

                  <span className="text-[#f9bd22] text-sm font-bold mt-0.5">
                    COMING SOON
                  </span>
                </div>

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    REWARDS
                  </span>

                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">
                    TBA
                  </span>
                </div>

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    WORM BATTLES
                  </span>

                  <span className="text-[#f9bd22] text-sm font-bold mt-0.5">
                    PLANNED
                  </span>
                </div>

                <div className="p-3 bg-[#080f18]/80 rounded border border-[#3a4a46]/40 flex flex-col">
                  <span className="text-[#83948f] text-[10px]">
                    SOL MODE
                  </span>

                  <span className="text-[#dce3f0] text-sm font-bold mt-0.5">
                    LOCKED
                  </span>
                </div>

              </div>
            </div>

            {/* CTA */}
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

                <span>STAKED RUN · COMING SOON</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
