
import React, { useState } from 'react';
import {
  Compass,
  Zap,
  Flame,
  ShieldAlert,
  Cpu,
  Sparkles,
  Skull,
  CircleDot,
  Crosshair,
} from 'lucide-react';
import { sounds } from '../audio';

export const HowItWorksView = () => {
  const [testMass, setTestMass] = useState(5000);
  const [boostEngaged, setBoostEngaged] = useState(false);

  // NARKY gameplay simulation values
  const speed = boostEngaged ? 4.8 : 2.4;
  const trailSegments = Math.floor(30 + testMass / 150);
  const turnRate = Math.max(
    0.04,
    0.12 - (testMass / 20000) * 0.05
  ).toFixed(3);

  const massBleed = Math.floor(testMass * 0.035);

  const survivalScore = Math.min(
    99,
    Math.floor(45 + testMass / 500)
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">

      {/* =========================================================
          HEADER
      ========================================================== */}
      <div className="text-center max-w-4xl mx-auto flex flex-col gap-3">

        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#101820] border border-[#00f5d4]/30 text-[#00f5d4] mx-auto shadow-[0_0_20px_rgba(0,245,212,0.08)]">
          <Cpu className="w-3.5 h-3.5" />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            NARKY // SURVIVAL PROTOCOL
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase font-black text-[#dce3f0] tracking-wider">
          HOW NARKY WORKS
        </h1>

        <p className="font-mono text-sm sm:text-base text-[#8fa39d] leading-relaxed max-w-2xl mx-auto">
          Grow your worm. Control your momentum. Cut off your enemies.
          One mistake turns your run into scrap.
        </p>
      </div>

      {/* =========================================================
          GAMEPLAY FLOW
      ========================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="group p-5 rounded-xl bg-[#111923] border border-[#3a4a46]/60 hover:border-[#00f5d4]/50 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center">
              <CircleDot className="w-4 h-4 text-[#00f5d4]" />
            </div>

            <span className="font-mono text-[10px] tracking-widest text-[#00f5d4]">
              01 / GROW
            </span>
          </div>

          <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0]">
            Harvest Mass
          </h3>

          <p className="font-mono text-xs text-[#8fa39d] mt-2 leading-relaxed">
            Collect luminous fragments scattered across the arena and
            turn them into size, length and power.
          </p>
        </div>

        <div className="group p-5 rounded-xl bg-[#111923] border border-[#3a4a46]/60 hover:border-[#f9bd22]/50 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#f9bd22]/10 border border-[#f9bd22]/30 flex items-center justify-center">
              <Crosshair className="w-4 h-4 text-[#f9bd22]" />
            </div>

            <span className="font-mono text-[10px] tracking-widest text-[#f9bd22]">
              02 / OUTPLAY
            </span>
          </div>

          <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0]">
            Control The Space
          </h3>

          <p className="font-mono text-xs text-[#8fa39d] mt-2 leading-relaxed">
            Force opponents into bad angles, close escape routes and
            turn your trail into a weapon.
          </p>
        </div>

        <div className="group p-5 rounded-xl bg-[#111923] border border-[#3a4a46]/60 hover:border-[#ffb2b7]/50 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#ffb2b7]/10 border border-[#ffb2b7]/30 flex items-center justify-center">
              <Skull className="w-4 h-4 text-[#ffb2b7]" />
            </div>

            <span className="font-mono text-[10px] tracking-widest text-[#ffb2b7]">
              03 / SURVIVE
            </span>
          </div>

          <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0]">
            Be The Last Worm
          </h3>

          <p className="font-mono text-xs text-[#8fa39d] mt-2 leading-relaxed">
            Touch the wrong line and your run is over. Survive longer,
            collect more and dominate the arena.
          </p>
        </div>

      </div>

      {/* =========================================================
          TELEMETRY SIMULATOR
      ========================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-[#101820] border border-[#00f5d4]/30 shadow-[0_0_40px_rgba(0,245,212,0.06)]">

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative p-6 sm:p-8 lg:p-10">

          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT */}
            <div className="flex-1 flex flex-col gap-6">

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f5d4] shadow-[0_0_8px_#00f5d4]" />

                  <span className="font-mono text-[10px] text-[#00f5d4] uppercase tracking-[0.2em] font-bold">
                    LIVE TELEMETRY
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl uppercase font-black text-[#dce3f0]">
                  WORM PHYSICS LAB
                </h2>

                <p className="font-mono text-xs text-[#8fa39d] mt-2 max-w-xl leading-relaxed">
                  Increase your mass and see how Narky's movement,
                  turning and trail density change in real time.
                </p>
              </div>

              {/* MASS */}
              <div className="p-5 rounded-xl bg-[#080f18] border border-[#3a4a46]/70">

                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-[#83948f] uppercase tracking-wider">
                    WORM MASS
                  </span>

                  <span className="font-mono text-sm font-bold text-[#00f5d4]">
                    {testMass.toLocaleString()} MASS
                  </span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={testMass}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    sounds.playBeep(
                      500 + value / 50,
                      0.03
                    );

                    setTestMass(value);
                  }}
                  className="w-full accent-[#00f5d4] cursor-pointer"
                />

                <div className="flex justify-between mt-2">
                  <span className="font-mono text-[9px] text-[#52615d]">
                    SMALL
                  </span>

                  <span className="font-mono text-[9px] text-[#52615d]">
                    GIANT
                  </span>
                </div>

              </div>

              {/* BOOST */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#080f18] border border-[#3a4a46]/70">

                <div className="flex items-center gap-3">

                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                      boostEngaged
                        ? 'bg-[#00f5d4]/10 border-[#00f5d4]/40'
                        : 'bg-[#19202a] border-[#3a4a46]'
                    }`}
                  >
                    <Flame
                      className={`w-4 h-4 ${
                        boostEngaged
                          ? 'text-[#00f5d4]'
                          : 'text-[#83948f]'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="font-mono text-xs font-bold text-[#dce3f0]">
                      BOOST
                    </div>

                    <div className="font-mono text-[9px] text-[#83948f]">
                      Trade mass for speed
                    </div>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playBoostSound();
                    setBoostEngaged(!boostEngaged);
                  }}
                  className={`px-4 py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                    boostEngaged
                      ? 'bg-[#00f5d4] text-[#00382f] shadow-[0_0_18px_rgba(0,245,212,0.4)]'
                      : 'bg-[#19202a] text-[#8fa39d] border border-[#3a4a46] hover:border-[#00f5d4]/40'
                  }`}
                >
                  {boostEngaged ? 'BOOST ON' : 'BOOST'}
                </button>

              </div>

            </div>

            {/* RIGHT METRICS */}
            <div className="lg:w-[460px]">

              <div className="grid grid-cols-2 gap-3">

                {/* SPEED */}
                <div className="p-4 rounded-xl bg-[#080f18] border border-[#00f5d4]/25">
                  <span className="font-mono text-[9px] text-[#83948f] uppercase">
                    SPEED
                  </span>

                  <div className="font-display text-2xl font-bold text-[#00f5d4] mt-2">
                    {speed.toFixed(1)}x
                  </div>

                  <span className="font-mono text-[9px] text-[#61716c]">
                    {boostEngaged ? 'OVERDRIVE' : 'CRUISING'}
                  </span>
                </div>

                {/* TRAIL */}
                <div className="p-4 rounded-xl bg-[#080f18] border border-[#00f5d4]/25">
                  <span className="font-mono text-[9px] text-[#83948f] uppercase">
                    TRAIL
                  </span>

                  <div className="font-display text-2xl font-bold text-[#d7fff3] mt-2">
                    {trailSegments}
                  </div>

                  <span className="font-mono text-[9px] text-[#61716c]">
                    SECTORS
                  </span>
                </div>

                {/* TURN */}
                <div className="p-4 rounded-xl bg-[#080f18] border border-[#f9bd22]/25">
                  <span className="font-mono text-[9px] text-[#83948f] uppercase">
                    TURN RATE
                  </span>

                  <div className="font-display text-2xl font-bold text-[#f9bd22] mt-2">
                    {turnRate}
                  </div>

                  <span className="font-mono text-[9px] text-[#61716c]">
                    VECTOR / FRAME
                  </span>
                </div>

                {/* MASS BURN */}
                <div className="p-4 rounded-xl bg-[#080f18] border border-[#ffb2b7]/25">
                  <span className="font-mono text-[9px] text-[#83948f] uppercase">
                    BOOST COST
                  </span>

                  <div className="font-display text-2xl font-bold text-[#ffb2b7] mt-2">
                    -{massBleed}
                  </div>

                  <span className="font-mono text-[9px] text-[#61716c]">
                    MASS / SEC
                  </span>
                </div>

              </div>

              {/* SURVIVAL INDEX */}
              <div className="mt-3 p-4 rounded-xl bg-[#080f18] border border-[#3a4a46]/70">

                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[9px] text-[#83948f] uppercase tracking-wider">
                    SURVIVAL INDEX
                  </span>

                  <span className="font-mono text-sm font-bold text-[#00f5d4]">
                    {survivalScore}%
                  </span>
                </div>

                <div className="h-1.5 rounded-full bg-[#19202a] overflow-hidden">
                  <div
                    className="h-full bg-[#00f5d4] transition-all duration-300"
                    style={{ width: `${survivalScore}%` }}
                  />
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =========================================================
          CORE MECHANICS
      ========================================================== */}
      <div>

        <div className="text-center mb-7">
          <span className="font-mono text-[10px] text-[#00f5d4] tracking-[0.2em] uppercase">
            CORE MECHANICS
          </span>

          <h2 className="font-display text-3xl sm:text-4xl uppercase font-black text-[#dce3f0] mt-1">
            KNOW THE RULES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 01 */}
          <div className="group p-6 sm:p-7 rounded-2xl bg-[#111923] border border-[#3a4a46]/60 hover:border-[#00f5d4]/50 transition-all">

            <div className="flex items-start gap-4">

              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#00f5d4]" />
              </div>

              <div>
                <span className="font-mono text-[9px] text-[#00f5d4] tracking-widest">
                  MECHANIC 01
                </span>

                <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0] mt-1">
                  Smooth Vector Movement
                </h3>

                <p className="font-mono text-xs sm:text-sm text-[#8fa39d] leading-relaxed mt-3">
                  Narky doesn't move on a rigid grid. Your worm follows
                  smooth vector movement, allowing fast turns, tight
                  escapes and aggressive plays.
                </p>
              </div>

            </div>

          </div>

          {/* 02 */}
          <div className="group p-6 sm:p-7 rounded-2xl bg-[#111923] border border-[#ffb2b7]/30 hover:border-[#ffb2b7]/60 transition-all">

            <div className="flex items-start gap-4">

              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#ffb2b7]/10 border border-[#ffb2b7]/30 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-[#ffb2b7]" />
              </div>

              <div>
                <span className="font-mono text-[9px] text-[#ffb2b7] tracking-widest">
                  MECHANIC 02
                </span>

                <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0] mt-1">
                  One Touch = Game Over
                </h3>

                <p className="font-mono text-xs sm:text-sm text-[#8fa39d] leading-relaxed mt-3">
                  Your head is vulnerable. Hit an enemy trail, the arena
                  boundary or another worm and your run ends instantly.
                  Every turn matters.
                </p>
              </div>

            </div>

          </div>

          {/* 03 */}
          <div className="group p-6 sm:p-7 rounded-2xl bg-[#111923] border border-[#f9bd22]/30 hover:border-[#f9bd22]/60 transition-all">

            <div className="flex items-start gap-4">

              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#f9bd22]/10 border border-[#f9bd22]/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#f9bd22]" />
              </div>

              <div>
                <span className="font-mono text-[9px] text-[#f9bd22] tracking-widest">
                  MECHANIC 03
                </span>

                <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0] mt-1">
                  Kill. Collect. Grow.
                </h3>

                <p className="font-mono text-xs sm:text-sm text-[#8fa39d] leading-relaxed mt-3">
                  When an opponent crashes, their energy becomes loot.
                  Collect the fragments, increase your mass and turn
                  your growing body into a bigger threat.
                </p>
              </div>

            </div>

          </div>

          {/* 04 */}
          <div className="group p-6 sm:p-7 rounded-2xl bg-[#111923] border border-[#00f5d4]/30 hover:border-[#00f5d4]/60 transition-all">

            <div className="flex items-start gap-4">

              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00f5d4]" />
              </div>

              <div>
                <span className="font-mono text-[9px] text-[#00f5d4] tracking-widest">
                  MECHANIC 04
                </span>

                <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0] mt-1">
                  Boost With A Price
                </h3>

                <p className="font-mono text-xs sm:text-sm text-[#8fa39d] leading-relaxed mt-3">
                  Boost gives you the speed to chase, escape and cut off
                  opponents — but every second burns mass. Use it at
                  the right moment or become smaller and slower.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================
          FINAL RULE
      ========================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b1118] border border-[#ffb2b7]/30 p-7 sm:p-10 text-center">

        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute w-40 h-40 rounded-full bg-[#ffb2b7]/10 blur-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">

          <ShieldAlert className="w-8 h-8 text-[#ffb2b7] mx-auto mb-4" />

          <span className="font-mono text-[10px] text-[#ffb2b7] uppercase tracking-[0.25em]">
            THE ONLY RULE THAT MATTERS
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase font-black text-[#dce3f0] mt-2">
            DON'T HIT THE LINE.
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#8fa39d] max-w-xl mx-auto mt-3 leading-relaxed">
            Grow until you're dangerous. Move until you're unpredictable.
            Then make everyone else crash first.
          </p>

        </div>

      </div>

    </div>
  );
};
