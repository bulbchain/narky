import React from 'react';
import { Gamepad2, Users } from 'lucide-react';
import { sounds } from '../audio';

interface ReadyToDriftCTAProps {
  onLaunchNow: () => void;
}

export const ReadyToDriftCTA: React.FC<ReadyToDriftCTAProps> = ({ onLaunchNow }) => {
  return (
    <section className="relative w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Ambient Backdrop Halo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-[#00f5d4]/20 via-[#00dfc1]/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#242a34] border border-[#00f5d4]/30 text-[#00f5d4]">
          <span className="w-2 h-2 rounded-full bg-[#00dfc1] animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">
            1,482 PILOTS IN SECTOR NOW
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase text-[#dce3f0] font-extrabold tracking-wider leading-none">
          READY TO DRIFT?
        </h2>

        <p className="font-mono text-sm sm:text-base text-[#b9cac4] max-w-xl leading-relaxed">
          Free forever in browser. Zero download required. Jump straight into the arena and claim your reign over the neon grid.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              sounds.playBoostSound();
              onLaunchNow();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded bg-[#00f5d4] text-[#00382f] font-display text-sm sm:text-base font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,245,212,0.6)] hover:shadow-[0_0_45px_rgba(0,245,212,0.9)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>LAUNCH NARKY NOW</span>
          </button>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.playBeep(640)}
            className="w-full sm:w-auto px-6 py-4 rounded bg-[#19202a] hover:bg-[#242a34] border border-[#3a4a46]/50 text-[#dce3f0] hover:text-[#00f5d4] hover:border-[#00f5d4]/40 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>JOIN DISCORD SQUAD</span>
          </a>
        </div>

        <p className="font-mono text-[#83948f] text-[10px] tracking-widest uppercase mt-3">
          WEBGL 2.0 ACCELERATED · SUB-30MS WEBSOCKET SERVERS · SOLANA ESCROW
        </p>
      </div>
    </section>
  );
};
