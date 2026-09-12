import React from 'react';
import { CircleDot, Zap, KeyRound, Compass } from 'lucide-react';
import { sounds } from '../audio';

export const BentoMechanics: React.FC = () => {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#00dfc1] mb-1">
            <Compass className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              VECTOR FLIGHT MANUAL
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#dce3f0] tracking-wider">
            TACTICAL SURVIVAL DYNAMICS
          </h2>
        </div>
        <p className="font-mono text-sm text-[#b9cac4] max-w-md leading-relaxed">
          Master inertia and light trails. In this ruthless vector arena, every millisecond of acceleration shapes your survival.
        </p>
      </div>

      {/* 3 Core Mechanics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento Card 1: Feed on Light */}
        <div
          onMouseEnter={() => sounds.playBeep(660)}
          className="group relative rounded-xl bg-[#19202a]/80 border border-[#00f5d4]/20 p-6 sm:p-8 flex flex-col justify-between hover:bg-[#242a34]/90 hover:border-[#00f5d4]/50 transition-all overflow-hidden shadow-lg"
        >
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#00f5d4]/10 rounded-full blur-2xl group-hover:bg-[#00f5d4]/20 transition-all" />
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-[#080f18] flex items-center justify-center text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.3)] border border-[#00f5d4]/30">
              <CircleDot className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] text-[#26fedc] tracking-widest font-semibold uppercase">
              01 // ACCRUAL
            </span>
            <h3 className="font-display text-xl uppercase text-[#dce3f0] font-bold tracking-wide">
              FEED ON LIGHT
            </h3>
            <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
              Absorb ambient phosphor photon spheres scattered across the void. Each harvested cluster extends your radiant light trail, accelerates turning inertia, and supercharges boost reserve batteries.
            </p>
          </div>
          <div className="mt-8 pt-3 bg-[#080f18]/60 p-3 rounded border border-[#3a4a46]/40 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#83948f]">TRAIL GROWTH RATE</span>
            <span className="font-mono text-xs font-bold text-[#00f5d4]">+14.2% / ORB</span>
          </div>
        </div>

        {/* Bento Card 2: Cut & Shatter */}
        <div
          onMouseEnter={() => sounds.playBeep(740)}
          className="group relative rounded-xl bg-[#19202a]/80 border border-[#ffb2b7]/25 p-6 sm:p-8 flex flex-col justify-between hover:bg-[#242a34]/90 hover:border-[#ffb2b7]/60 transition-all overflow-hidden shadow-lg"
        >
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#ffb2b7]/15 rounded-full blur-2xl group-hover:bg-[#ffb2b7]/25 transition-all" />
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-[#080f18] flex items-center justify-center text-[#ffb2b7] shadow-[0_0_15px_rgba(255,178,183,0.3)] border border-[#ffb2b7]/30">
              <Zap className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] text-[#ffb2b7] tracking-widest font-semibold uppercase">
              02 // COMBAT
            </span>
            <h3 className="font-display text-xl uppercase text-[#dce3f0] font-bold tracking-wide">
              CUT &amp; SHATTER
            </h3>
            <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
              Maneuver your lethal neon trail across an adversary’s flight vector. When rival pilots collide with your exhaust perimeter, their craft shatters into high-yield radiant fragments ready for consumption.
            </p>
          </div>
          <div className="mt-8 pt-3 bg-[#080f18]/60 p-3 rounded border border-[#3a4a46]/40 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#83948f]">IMPACT CASUALTY RATE</span>
            <span className="font-mono text-xs font-bold text-[#ffb2b7]">100% INSTANT</span>
          </div>
        </div>

        {/* Bento Card 3: Extract or Perish */}
        <div
          onMouseEnter={() => sounds.playBeep(820)}
          className="group relative rounded-xl bg-[#19202a]/80 border border-[#f9bd22]/25 p-6 sm:p-8 flex flex-col justify-between hover:bg-[#242a34]/90 hover:border-[#f9bd22]/60 transition-all overflow-hidden shadow-lg"
        >
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#f9bd22]/15 rounded-full blur-2xl group-hover:bg-[#f9bd22]/25 transition-all" />
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-[#080f18] flex items-center justify-center text-[#f9bd22] shadow-[0_0_15px_rgba(249,189,34,0.3)] border border-[#f9bd22]/30">
              <KeyRound className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] text-[#ffd57d] tracking-widest font-semibold uppercase">
              03 // EXTRACTION
            </span>
            <h3 className="font-display text-xl uppercase text-[#dce3f0] font-bold tracking-wide">
              EXTRACT OR PERISH
            </h3>
            <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
              Holding mass makes you the primary bounty on every pilot's radar HUD. In Staked Run, navigate to spontaneous wormhole gates to extract your accumulated spoils before apex hunters encircle you.
            </p>
          </div>
          <div className="mt-8 pt-3 bg-[#080f18]/60 p-3 rounded border border-[#3a4a46]/40 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#83948f]">GATE EXTRACTION WINDOW</span>
            <span className="font-mono text-xs font-bold text-[#f9bd22]">8.4 SECONDS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
