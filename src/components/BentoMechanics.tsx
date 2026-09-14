import React from 'react';
import {
  CircleDot,
  Swords,
  Trophy,
  Compass,
} from 'lucide-react';
import { sounds } from '../audio';

export const BentoMechanics = () => {
  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

        <div>

          <div className="mb-1 flex items-center gap-1.5 text-[#00dfc1]">

            <Compass className="h-4 w-4" />

            <span className="font-mono text-[10px] uppercase tracking-widest">
              NARKY FIELD GUIDE
            </span>

          </div>

          <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-[#dce3f0] sm:text-3xl lg:text-4xl">
            HOW TO BECOME THE BIGGEST WORM
          </h2>

        </div>

        <p className="max-w-md font-mono text-sm leading-relaxed text-[#b9cac4]">
          Eat your way up the food chain, outsmart rival worms, and survive
          long enough to become the biggest thing crawling through the arena.
        </p>

      </div>

      {/* =========================================================
          3 CORE MECHANICS
      ========================================================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* =====================================================
            CARD 1 — EAT & GROW
        ===================================================== */}

        <div
          onMouseEnter={() => sounds.playBeep(660)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#00f5d4]/20 bg-[#19202a]/80 p-6 shadow-lg transition-all hover:border-[#00f5d4]/50 hover:bg-[#242a34]/90 sm:p-8"
        >

          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#00f5d4]/10 blur-2xl transition-all group-hover:bg-[#00f5d4]/20" />

          <div className="relative z-10 flex flex-col gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#00f5d4]/30 bg-[#080f18] text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.3)]">

              <CircleDot className="h-6 w-6" />

            </div>

            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#26fedc]">
              01 // GROWTH
            </span>

            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#dce3f0]">
              EAT &amp; GROW
            </h3>

            <p className="font-mono text-sm leading-relaxed text-[#b9cac4]">
              Start small. Hunt glowing food across the arena and watch your
              worm grow with every bite. The bigger you get, the harder you
              are to stop — and the easier you are to spot.
            </p>

          </div>

          <div className="mt-8 flex items-center justify-between rounded border border-[#3a4a46]/40 bg-[#080f18]/60 p-3">

            <span className="font-mono text-[10px] text-[#83948f]">
              PRIMARY OBJECTIVE
            </span>

            <span className="font-mono text-xs font-bold text-[#00f5d4]">
              GET BIGGER
            </span>

          </div>

        </div>

        {/* =====================================================
            CARD 2 — TRAP & CRASH
        ===================================================== */}

        <div
          onMouseEnter={() => sounds.playBeep(740)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#ffb2b7]/25 bg-[#19202a]/80 p-6 shadow-lg transition-all hover:border-[#ffb2b7]/60 hover:bg-[#242a34]/90 sm:p-8"
        >

          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#ffb2b7]/15 blur-2xl transition-all group-hover:bg-[#ffb2b7]/25" />

          <div className="relative z-10 flex flex-col gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#ffb2b7]/30 bg-[#080f18] text-[#ffb2b7] shadow-[0_0_15px_rgba(255,178,183,0.3)]">

              <Swords className="h-6 w-6" />

            </div>

            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#ffb2b7]">
              02 // COMBAT
            </span>

            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#dce3f0]">
              TRAP &amp; CRASH
            </h3>

            <p className="font-mono text-sm leading-relaxed text-[#b9cac4]">
              Your body is your weapon. Cut off rival worms, force bad turns,
              and make them crash into you. Outsmart your enemies instead of
              trying to outrun them.
            </p>

          </div>

          <div className="mt-8 flex items-center justify-between rounded border border-[#3a4a46]/40 bg-[#080f18]/60 p-3">

            <span className="font-mono text-[10px] text-[#83948f]">
              BEST STRATEGY
            </span>

            <span className="font-mono text-xs font-bold text-[#ffb2b7]">
              DON'T GET BIT
            </span>

          </div>

        </div>

        {/* =====================================================
            CARD 3 — SURVIVE & DOMINATE
        ===================================================== */}

        <div
          onMouseEnter={() => sounds.playBeep(820)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#f9bd22]/25 bg-[#19202a]/80 p-6 shadow-lg transition-all hover:border-[#f9bd22]/60 hover:bg-[#242a34]/90 sm:p-8"
        >

          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#f9bd22]/15 blur-2xl transition-all group-hover:bg-[#f9bd22]/25" />

          <div className="relative z-10 flex flex-col gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#f9bd22]/30 bg-[#080f18] text-[#f9bd22] shadow-[0_0_15px_rgba(249,189,34,0.3)]">

              <Trophy className="h-6 w-6" />

            </div>

            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#ffd57d]">
              03 // SURVIVAL
            </span>

            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#dce3f0]">
              SURVIVE &amp; DOMINATE
            </h3>

            <p className="font-mono text-sm leading-relaxed text-[#b9cac4]">
              Every rival you outplay is another chance to grow. Stay alive,
              collect the drops left behind by fallen worms, and push your
              score higher until the arena knows your name.
            </p>

          </div>

          <div className="mt-8 flex items-center justify-between rounded border border-[#3a4a46]/40 bg-[#080f18]/60 p-3">

            <span className="font-mono text-[10px] text-[#83948f]">
              END GAME
            </span>

            <span className="font-mono text-xs font-bold text-[#f9bd22]">
              LAST WORM STANDING
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};