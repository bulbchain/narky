import React, { useState } from 'react';
import { Compass, Zap, Flame, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { sounds } from '../audio';

export const HowItWorksView: React.FC = () => {
  const [testMass, setTestMass] = useState(5000);
  const [boostEngaged, setBoostEngaged] = useState(false);

  // Computed flight values
  const speed = boostEngaged ? (4.8).toFixed(1) : (2.4).toFixed(1);
  const trailSegments = Math.floor(30 + testMass / 150);
  const turnRate = Math.max(0.04, 0.12 - (testMass / 20000) * 0.05).toFixed(3);
  const massBleed = (testMass * 0.035).toFixed(0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
        <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#19202a] border border-[#00f5d4]/30 text-[#00f5d4] mx-auto">
          <Cpu className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
            PILOT VECTOR DIRECTIVE // TECHNICAL MANUAL
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-[#dce3f0] tracking-wider">
          HOW NARKY WORKS
        </h1>
        <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
          The tactical physics engine combines continuous vector curves, light-mass economics, and ruthless 100% cutoff lethality.
        </p>
      </div>

      {/* Interactive Physics Calculator / Playground */}
      <div className="rounded-xl p-6 sm:p-8 bg-[#19202a]/85 border border-[#00f5d4]/30 shadow-xl flex flex-col lg:flex-row gap-8 items-center justify-between">
        <div className="flex flex-col gap-4 max-w-lg w-full">
          <div>
            <span className="font-mono text-[10px] text-[#00f5d4] uppercase tracking-widest font-semibold">
              TELEMETRY SIMULATOR
            </span>
            <h3 className="font-display text-2xl uppercase font-bold text-[#dce3f0] mt-0.5">
              MASS &amp; INERTIA CALCULATOR
            </h3>
            <p className="font-mono text-xs text-[#b9cac4] mt-1">
              Adjust your pilot light mass to evaluate how trail length, turning radius, and boost consumption scale.
            </p>
          </div>

          {/* Mass Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#83948f]">ACCUMULATED MASS</span>
              <span className="text-[#00f5d4] font-bold">{testMass.toLocaleString()} LUMENS</span>
            </div>
            <input
              type="range"
              min="500"
              max="25000"
              step="250"
              value={testMass}
              onChange={(e) => {
                sounds.playBeep(500 + Number(e.target.value) / 50, 0.03);
                setTestMass(Number(e.target.value));
              }}
              className="w-full accent-[#00f5d4] cursor-pointer"
            />
          </div>

          {/* Boost Toggle */}
          <div className="flex items-center justify-between p-3 rounded bg-[#080f18] border border-[#3a4a46]/50">
            <div className="flex items-center gap-2">
              <Flame className={`w-4 h-4 ${boostEngaged ? 'text-[#00f5d4]' : 'text-[#83948f]'}`} />
              <span className="font-mono text-xs font-semibold text-[#dce3f0]">
                THRUSTER OVERDRIVE (BOOST)
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                sounds.playBoostSound();
                setBoostEngaged(!boostEngaged);
              }}
              className={`px-3 py-1 rounded font-mono text-xs font-bold uppercase transition-all ${
                boostEngaged
                  ? 'bg-[#00f5d4] text-[#00382f] shadow-[0_0_12px_#00f5d4]'
                  : 'bg-[#242a34] text-[#b9cac4] hover:text-[#dce3f0]'
              }`}
            >
              {boostEngaged ? 'ENGAGED' : 'IDLE'}
            </button>
          </div>
        </div>

        {/* Output Metrics Box */}
        <div className="grid grid-cols-2 gap-4 w-full lg:max-w-md font-mono">
          <div className="p-4 rounded-lg bg-[#080f18] border border-[#00f5d4]/30 flex flex-col">
            <span className="text-[10px] text-[#83948f] uppercase">VELOCITY</span>
            <span className="text-xl font-bold text-[#00f5d4] mt-1">{speed}x MACH</span>
            <span className="text-[9px] text-[#b9cac4] mt-0.5">
              {boostEngaged ? '3.2x boosted velocity' : 'Cruising vector speed'}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-[#080f18] border border-[#00f5d4]/30 flex flex-col">
            <span className="text-[10px] text-[#83948f] uppercase">TRAIL LENGTH</span>
            <span className="text-xl font-bold text-[#d7fff3] mt-1">{trailSegments} SECTORS</span>
            <span className="text-[9px] text-[#b9cac4] mt-0.5">Lethal collision barrier</span>
          </div>

          <div className="p-4 rounded-lg bg-[#080f18] border border-[#00f5d4]/30 flex flex-col">
            <span className="text-[10px] text-[#83948f] uppercase">TURN RATE INERTIA</span>
            <span className="text-xl font-bold text-[#f9bd22] mt-1">{turnRate} RAD/F</span>
            <span className="text-[9px] text-[#b9cac4] mt-0.5">Tightness of vector arc</span>
          </div>

          <div className="p-4 rounded-lg bg-[#080f18] border border-[#00f5d4]/30 flex flex-col">
            <span className="text-[10px] text-[#83948f] uppercase">BOOST BURN RATE</span>
            <span className="text-xl font-bold text-[#ffb2b7] mt-1">-{massBleed} / SEC</span>
            <span className="text-[9px] text-[#b9cac4] mt-0.5">3.5% mass burned while boosting</span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-xl bg-[#19202a]/80 border border-[#3a4a46]/50 flex flex-col gap-3">
          <div className="w-10 h-10 rounded bg-[#080f18] border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0]">
            1. Vector Steering &amp; Momentum
          </h3>
          <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
            Unlike rigid grid cycles, craft steer on smooth, continuous curves. Dragging your cursor or touching the screen updates your target vector angle. Turning at high speed carries angular inertia.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#19202a]/80 border border-[#ffb2b7]/40 flex flex-col gap-3">
          <div className="w-10 h-10 rounded bg-[#080f18] border border-[#ffb2b7]/30 flex items-center justify-center text-[#ffb2b7]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0]">
            2. The Lethal Cutoff Rule
          </h3>
          <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
            The core axiom is absolute: <strong>A pilot craft shatters if its cockpit touches any other neon line</strong> (hostile trail, boundary, or opponent body). Your own trail is harmless to you for the first 6 segments.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#19202a]/80 border border-[#f9bd22]/40 flex flex-col gap-3">
          <div className="w-10 h-10 rounded bg-[#080f18] border border-[#f9bd22]/30 flex items-center justify-center text-[#f9bd22]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0]">
            3. Light Harvest &amp; Loot Drops
          </h3>
          <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
            Shattering a rival pilot causes their craft to disintegrate into high-yield luminous photon debris. Consuming this debris instantly grants huge mass surges, extending your trail to trap other contenders.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#19202a]/80 border border-[#00f5d4]/40 flex flex-col gap-3">
          <div className="w-10 h-10 rounded bg-[#080f18] border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4]">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl uppercase font-bold text-[#dce3f0]">
            4. Wormhole Extraction in Staked Run
          </h3>
          <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
            In Staked matches, surviving is not enough. Quantum wormhole portals open spontaneously for 8.4-second windows. Enter the vortex while maintaining line integrity to withdraw your accumulated Solana loot.
          </p>
        </div>
      </div>
    </div>
  );
};
