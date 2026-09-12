import React from 'react';
import { MessageSquare, Twitter, Send, Terminal } from 'lucide-react';
import { sounds } from '../audio';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080f18] border-t border-[#00f5d4]/10 py-12 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center lg:items-start gap-1">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl uppercase text-[#d7fff3] font-bold tracking-wider">
                DRIFTLINE
              </span>
              <span className="font-mono text-[10px] bg-[#19202a] border border-[#3a4a46]/50 px-2 py-0.5 rounded text-[#83948f]">
                v2.4.0-PROD
              </span>
            </div>
            <p className="font-mono text-[11px] text-[#83948f] tracking-widest text-center lg:text-left uppercase">
              FEED ON LIGHT · OUTGROW THE DARK
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playBeep(600)}
              className="flex items-center gap-1.5 text-[#b9cac4] hover:text-[#00f5d4] transition-colors font-mono text-xs tracking-wider"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>DISCORD</span>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playBeep(600)}
              className="flex items-center gap-1.5 text-[#b9cac4] hover:text-[#00f5d4] transition-colors font-mono text-xs tracking-wider"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>#X / TWITTER</span>
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playBeep(600)}
              className="flex items-center gap-1.5 text-[#b9cac4] hover:text-[#00f5d4] transition-colors font-mono text-xs tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TELEGRAM</span>
            </a>
            <a
              href="#docs"
              onClick={(e) => {
                e.preventDefault();
                sounds.playBeep(600);
              }}
              className="flex items-center gap-1.5 text-[#b9cac4] hover:text-[#00f5d4] transition-colors font-mono text-xs tracking-wider"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>DOCS / API</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#3a4a46]/30 text-xs font-mono">
          <div className="flex items-center gap-2 bg-[#151c26] border border-[#3a4a46]/50 px-3.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00dfc1] animate-pulse" />
            <span className="text-[#b9cac4] text-[10px]">SERVER CLUSTER: NA-EAST · ONLINE 99.9%</span>
          </div>

          <div className="flex items-center gap-3 text-[#83948f] text-[11px]">
            <a href="#terms" className="hover:text-[#dce3f0] transition-colors">
              Terms of Engagement
            </a>
            <span>•</span>
            <a href="#disclaimers" className="hover:text-[#dce3f0] transition-colors">
              Protocol Disclaimers
            </a>
            <span>•</span>
            <a href="#fairplay" className="hover:text-[#dce3f0] transition-colors">
              Fair Play Matrix
            </a>
          </div>

          <span className="text-[#83948f] text-[11px] text-center md:text-right">
            © 2025 DRIFTLINE SYSTEMS CORP. ALL VECTOR RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
};
