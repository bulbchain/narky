import React from 'react';
import {
  Swords,
  Users2,
  CircleDollarSign,
  Radio,
  Zap,
} from 'lucide-react';

const features = [
  {
    label: 'Play with your friends for free',
    icon: Users2,
    color: 'text-[#00f5d4]',
  },
  {
    label: 'Challenge rivals',
    icon: Swords,
    color: 'text-[#f9bd22]',
  },
  {
    label: 'Bet your SOL',
    icon: CircleDollarSign,
    color: 'text-[#26fedc]',
  },
];

export const NarkyIntroBanner = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
      <div className="relative overflow-hidden rounded-[28px] border border-[#00f5d4]/20 bg-[#0b1118] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">

        {/* =========================================================
            BACKGROUND ATMOSPHERE
        ========================================================= */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,245,212,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,189,34,0.12),_transparent_30%)]" />

        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#00f5d4]/10 blur-3xl" />

        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#f9bd22]/10 blur-3xl" />

        {/* =========================================================
            GAME ARENA DECORATIONS
            Everything below is absolute + pointer-events-none,
            so it does not affect the layout of other components.
        ========================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Subtle arena grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,212,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,212,1) 1px, transparent 1px)
              `,
              backgroundSize: '34px 34px',
            }}
          />

          {/* Top-left worm trail */}
          <div className="absolute left-[6%] top-[17%] hidden sm:block">
            <div className="flex items-center gap-1.5 opacity-40">
              <span className="h-2 w-2 rounded-full bg-[#00f5d4]/20" />
              <span className="h-2 w-2 rounded-full bg-[#00f5d4]/30" />
              <span className="h-2 w-2 rounded-full bg-[#00f5d4]/45" />
              <span className="h-2 w-2 rounded-full bg-[#00f5d4]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#00f5d4] shadow-[0_0_14px_rgba(0,245,212,0.7)]" />
            </div>
          </div>

          {/* Bottom-right worm trail */}
          <div className="absolute right-[7%] bottom-[18%] hidden sm:block">
            <div className="flex items-center gap-1.5 opacity-30 rotate-[-12deg]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f9bd22] shadow-[0_0_12px_rgba(249,189,34,0.6)]" />
              <span className="h-2 w-2 rounded-full bg-[#f9bd22]/60" />
              <span className="h-2 w-2 rounded-full bg-[#f9bd22]/45" />
              <span className="h-2 w-2 rounded-full bg-[#f9bd22]/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f9bd22]/20" />
            </div>
          </div>

          {/* Energy / food particles */}
          <div className="absolute right-[11%] top-[23%] hidden sm:flex items-center gap-4 opacity-70">
            <span className="h-2 w-2 rounded-full bg-[#f9bd22] shadow-[0_0_14px_rgba(249,189,34,0.9)]" />

            <span className="mt-5 h-1.5 w-1.5 rounded-full bg-[#00f5d4] shadow-[0_0_12px_rgba(0,245,212,0.9)]" />

            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f9bd22]/80 shadow-[0_0_14px_rgba(249,189,34,0.8)]" />
          </div>

          {/* Left floating HUD */}
          <div className="absolute left-5 bottom-6 hidden lg:block">
            <div className="rounded-lg border border-[#00f5d4]/15 bg-[#081016]/60 px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f5d4]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#00f5d4]/60">
                  ARENA ONLINE
                </span>
              </div>

              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-[#83948f]/60">
                Worm activity detected
              </div>
            </div>
          </div>

          {/* Right floating HUD */}
          <div className="absolute right-5 bottom-6 hidden lg:block">
            <div className="rounded-lg border border-[#f9bd22]/15 bg-[#081016]/60 px-3 py-2 text-right backdrop-blur-sm">
              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#f9bd22]/60">
                LAST WORM STANDING
              </div>

              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-[#83948f]/60">
                Eat • Grow • Survive
              </div>
            </div>
          </div>

          {/* Decorative corner brackets */}
          <div className="absolute left-3 top-3 h-8 w-8 border-l border-t border-[#00f5d4]/20" />
          <div className="absolute right-3 top-3 h-8 w-8 border-r border-t border-[#00f5d4]/20" />
          <div className="absolute left-3 bottom-3 h-8 w-8 border-b border-l border-[#f9bd22]/15" />
          <div className="absolute right-3 bottom-3 h-8 w-8 border-b border-r border-[#f9bd22]/15" />

        </div>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <div className="relative z-10 flex flex-col items-center text-center gap-6">

          {/* Live Arena Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5d4]/30 bg-[#0c1720]/85 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00f5d4] shadow-[inset_0_0_18px_rgba(0,245,212,0.06)] backdrop-blur-sm">
            <Radio className="h-3.5 w-3.5" />

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f5d4] shadow-[0_0_8px_rgba(0,245,212,0.9)]" />

            Live Worm Arena
          </div>

          {/* Title */}
          <div className="space-y-3">

            <h1 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.065em] text-white sm:text-5xl lg:text-7xl">
              NARKY
            </h1>

            <p className="mx-auto max-w-2xl font-display text-lg font-medium uppercase tracking-[0.12em] text-[#d7fff3] sm:text-2xl">
              Eat. Grow. Wreck. Repeat.
            </p>

          </div>

          {/* Description */}
          <p className="max-w-2xl font-mono text-sm leading-relaxed text-[#b9cac4] sm:text-[15px]">
            Enter the neon dirt. Outsmart rival worms, gobble your way to the
            top, and survive long enough to become the biggest menace in the
            arena.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {features.map(({ label, icon: Icon, color }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-[#3a4a46]/60 bg-[#101922]/90 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e9f3ef] shadow-[0_0_20px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-200 hover:border-[#00f5d4]/30 hover:bg-[#132029]"
              >
                <Icon className={`h-3.5 w-3.5 ${color}`} />

                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Bottom Status */}
          <div className="flex items-center justify-center gap-2">

            <Zap className="h-3 w-3 text-[#f9bd22]/70" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#83948f] text-center">
              24/7 live arena • eat or get eaten • last worm standing
            </span>

            <Zap className="h-3 w-3 text-[#00f5d4]/70" />

          </div>

        </div>
      </div>
    </section>
  );
};