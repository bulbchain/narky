
import React, { useState } from 'react';
import { Gamepad2, Copy, Check } from 'lucide-react';
import { sounds } from '../audio';
import twitterIcon from '../asset/twitter.png';
import narkyLogo from '../asset/nlogo.jpg';

interface ReadyToDriftCTAProps {
  onLaunchNow: () => void;
}

export const ReadyToDriftCTA: React.FC<ReadyToDriftCTAProps> = ({ onLaunchNow }) => {
  const [copied, setCopied] = useState(false);

  // Replace this with your actual NARKY token contract address
  const NARKY_CONTRACT = 'A4AvZYrRsgj3VjumCpNn1iFmv77NC6m6jRTDyM8Bpump';

  const handleCopyContract = async () => {
    try {
      await navigator.clipboard.writeText(NARKY_CONTRACT);
      setCopied(true);
      sounds.playBeep(800);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy contract address:', error);
    }
  };

  return (
    <section className="relative w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center text-center">

      {/* Ambient Arena Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-t from-[#00f5d4]/20 via-[#00dfc1]/5 to-transparent blur-3xl rounded-full" />

        {/* Arena grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">

        {/* Status */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#242a34] border border-[#00f5d4]/30 text-[#00f5d4]">
          <span className="w-2 h-2 rounded-full bg-[#00dfc1] animate-pulse" />

          <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">
            NARKY ARENA · ONLINE
          </span>
        </div>

        {/* Main heading */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase text-[#dce3f0] font-extrabold tracking-wider leading-none">
          READY TO CRAWL?
        </h2>

        <p className="font-mono text-sm sm:text-base text-[#b9cac4] max-w-2xl leading-relaxed">
          Start small. Eat glowing food. Grow your worm. Hunt your rivals.
          Survive long enough to become the biggest menace in the arena.
        </p>

        {/* Main Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-3 w-full sm:w-auto">

          {/* Launch Game */}
          <button
            type="button"
            onClick={() => {
              sounds.playBoostSound();
              onLaunchNow();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded bg-[#00f5d4] text-[#00382f] font-display text-sm sm:text-base font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(0,245,212,0.6)] hover:shadow-[0_0_45px_rgba(0,245,212,0.9)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>ENTER THE ARENA</span>
          </button>

          {/* X / Twitter */}
          <a
            href="https://x.com/playnarky"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.playBeep(640)}
            className="w-full sm:w-auto px-6 py-4 rounded bg-[#19202a] hover:bg-[#242a34] border border-[#3a4a46]/50 text-[#dce3f0] hover:text-[#00f5d4] hover:border-[#00f5d4]/40 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
          >
            <img
              src={twitterIcon}
              alt="X / Twitter"
              className="w-4 h-4 object-contain"
            />

            <span>JOIN THE HUNT</span>
          </a>
        </div>

        {/* NARKY Coin CTA */}
        <div className="w-full max-w-2xl mt-7 p-4 sm:p-5 rounded-xl bg-[#111820]/90 border border-[#f9bd22]/20 shadow-[0_0_30px_rgba(249,189,34,0.05)]">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-1 text-left">

              <div className="w-14 h-14 flex items-center justify-center overflow-hidden rounded-lg bg-transparent">
                <img src={narkyLogo} alt="NARKY logo" className="w-full h-full object-contain" />
              </div>

              <div>
                <div className="font-display text-sm text-[#f9bd22] tracking-widest uppercase">
                  $NARKY
                </div>

                <div className="font-mono text-[10px] text-[#83948f] uppercase tracking-wider">
                  Fuel the swarm · Contract
                </div>
              </div>

            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">

              {/* Contract */}
              <button
                type="button"
                onClick={handleCopyContract}
                className="flex-1 sm:flex-none min-w-0 px-4 py-3 rounded bg-[#19202a] border border-[#3a4a46]/60 hover:border-[#f9bd22]/50 text-[#b9cac4] hover:text-[#f9bd22] transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="font-mono text-[10px] tracking-wider uppercase">
                      COPIED
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="font-mono text-[10px] tracking-wider uppercase">
                      COPY CA
                    </span>
                  </>
                )}
              </button>

              {/* Buy */}
              <a
                href="https://pump.fun/coin/A4AvZYrRsgj3VjumCpNn1iFmv77NC6m6jRTDyM8Bpump"
                onClick={() => sounds.playBeep(720)}
                className="px-5 py-3 rounded bg-[#f9bd22] text-[#201700] hover:scale-105 font-display text-[11px] tracking-widest uppercase font-bold transition-all"
              >
                GET $NARKY
              </a>

            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#3a4a46]/30">
            <p className="font-mono text-[9px] text-[#65736f] break-all text-center tracking-wide">
              {NARKY_CONTRACT}
            </p>
          </div>
        </div>

        {/* Tech / game status */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3 font-mono text-[#65736f] text-[9px] tracking-widest uppercase">
          <span>WEBGL ARENA</span>
          <span className="text-[#00f5d4]/40">•</span>
          <span>REAL-TIME MULTIPLAYER</span>
          <span className="text-[#00f5d4]/40">•</span>
          <span>NEON WORM COMBAT</span>
        </div>

      </div>
    </section>
  );
};
