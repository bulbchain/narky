import React from 'react';
import { UserCheck, Infinity as InfinityIcon, Trophy, Lightbulb } from 'lucide-react';
import { sounds } from '../audio';

export const EngagementLoop: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-10">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">

        <span className="font-mono text-[10px] text-[#00f5d4] uppercase tracking-widest font-semibold">
          NARKY SURVIVAL GUIDE
        </span>

        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#dce3f0] font-bold mt-1 tracking-wider">
          3-STEP WORM LOOP
        </h2>

        <p className="font-mono text-sm text-[#b9cac4] mt-2">
          Start small, get bigger, and outsmart anything standing between you and the top of the arena.
        </p>

      </div>


      {/* 3-Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ========================================================= */}
        {/* STEP 1 */}
        {/* ========================================================= */}

        <div
          onMouseEnter={() => sounds.playBeep(580)}
          className="p-6 sm:p-8 rounded-xl bg-[#19202a]/80 border border-[#00f5d4]/20 flex flex-col gap-4 shadow-md hover:bg-[#242a34]/80 hover:border-[#00f5d4]/50 transition-all"
        >

          <div className="flex items-center justify-between">

            <div className="w-10 h-10 rounded bg-[#080f18] border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4]">
              <UserCheck className="w-5 h-5" />
            </div>

            <span className="font-display text-2xl text-[#3a4a46] font-bold">
              01
            </span>

          </div>

          <div>

            <h3 className="font-display text-base sm:text-lg uppercase text-[#dce3f0] font-bold">
              NAME &amp; CRAWL
            </h3>

            <p className="font-mono text-xs sm:text-sm text-[#b9cac4] mt-2 leading-relaxed">
              Pick your worm name, enter the arena, and start crawling. Every Narky begins small — your first job is simply to stay alive.
            </p>

          </div>

        </div>


        {/* ========================================================= */}
        {/* STEP 2 */}
        {/* ========================================================= */}

        <div
          onMouseEnter={() => sounds.playBeep(680)}
          className="p-6 sm:p-8 rounded-xl bg-[#19202a]/80 border border-[#00f5d4]/20 flex flex-col gap-4 shadow-md hover:bg-[#242a34]/80 hover:border-[#00f5d4]/50 transition-all"
        >

          <div className="flex items-center justify-between">

            <div className="w-10 h-10 rounded bg-[#080f18] border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4]">
              <InfinityIcon className="w-5 h-5" />
            </div>

            <span className="font-display text-2xl text-[#3a4a46] font-bold">
              02
            </span>

          </div>

          <div>

            <h3 className="font-display text-base sm:text-lg uppercase text-[#dce3f0] font-bold">
              EAT &amp; GROW
            </h3>

            <p className="font-mono text-xs sm:text-sm text-[#b9cac4] mt-2 leading-relaxed">
              Hunt glowing food scattered across the arena. Every bite makes you bigger, longer, and harder for rival worms to ignore.
            </p>

          </div>

        </div>


        {/* ========================================================= */}
        {/* STEP 3 */}
        {/* ========================================================= */}

        <div
          onMouseEnter={() => sounds.playBeep(780)}
          className="p-6 sm:p-8 rounded-xl bg-[#19202a]/80 border border-[#00f5d4]/20 flex flex-col gap-4 shadow-md hover:bg-[#242a34]/80 hover:border-[#00f5d4]/50 transition-all"
        >

          <div className="flex items-center justify-between">

            <div className="w-10 h-10 rounded bg-[#080f18] border border-[#ffb2b7]/30 flex items-center justify-center text-[#ffb2b7]">
              <Trophy className="w-5 h-5" />
            </div>

            <span className="font-display text-2xl text-[#3a4a46] font-bold">
              03
            </span>

          </div>

          <div>

            <h3 className="font-display text-base sm:text-lg uppercase text-[#dce3f0] font-bold">
              TRAP &amp; DOMINATE
            </h3>

            <p className="font-mono text-xs sm:text-sm text-[#b9cac4] mt-2 leading-relaxed">
              Use your growing body as a weapon. Cut off rival worms, force bad turns, make them crash, and collect what they leave behind.
            </p>

          </div>

        </div>

      </div>


      {/* Pro Tip Callout Box */}
      <div className="w-full p-5 sm:p-6 rounded-xl bg-[#242a34]/60 border border-[#f9bd22]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner">

        <div className="flex items-start gap-4">

          <div className="w-10 h-10 rounded-full bg-[#f9bd22]/20 border border-[#f9bd22]/40 text-[#f9bd22] flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>

          <div>

            <span className="font-mono text-[10px] text-[#ffd57d] uppercase tracking-wider font-semibold">
              WORM TIP
            </span>

            <p className="font-mono text-xs sm:text-sm text-[#dce3f0] mt-0.5 leading-relaxed">
              <strong>Hold to boost —</strong> use it to escape danger, cut off a rival, or grab food before someone else does. Speed helps, but a reckless worm is a dead worm.
            </p>

          </div>

        </div>

        <span className="font-mono text-[11px] text-[#83948f] whitespace-nowrap bg-[#080f18] border border-[#3a4a46]/50 px-3 py-1.5 rounded uppercase tracking-wider">
          RULE #1: DON'T HIT THE BODY
        </span>

      </div>

    </section>
  );
};
