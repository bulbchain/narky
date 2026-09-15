import React from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { ArenaCanvas } from './ArenaCanvas';
import { sounds } from '../audio';
import logo from '../asset/narkywbg.png';

interface FullscreenArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  callsign: string;
  wormColor?: string;
  onKillsUpdate?: (k: number) => void;
  onScoreUpdate?: (s: number) => void;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const FullscreenArenaModal: React.FC<FullscreenArenaModalProps> = ({
  isOpen,
  onClose,
  callsign,
  wormColor,
  onKillsUpdate,
  onScoreUpdate,
  soundMuted,
  onToggleSound,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#07111a] flex flex-col">
      {/* Top Thin HUD Command Bar */}
      <div className="h-14 w-full bg-[#080f18]/90 border-b border-[#00f5d4]/20 px-4 sm:px-6 flex items-center justify-between z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="NARKY logo"
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_14px_rgba(0,245,212,0.6)]"
          />
          <div className="flex items-center gap-2">
            {/* <span className="font-display font-bold text-sm uppercase text-[#d7fff3] tracking-wider">
              NARKY
            </span> */}
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#19202a] text-[#00dfc1] border border-[#00dfc1]/30">
              SECTOR-09 ACTIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSound}
            title={soundMuted ? 'Unmute sound' : 'Mute sound'}
            className="p-1.5 rounded bg-[#151c26] text-[#b9cac4] hover:text-[#00f5d4] border border-[#3a4a46]/50 transition-colors"
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-[#ffb2b7]" /> : <Volume2 className="w-4 h-4 text-[#00f5d4]" />}
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playBeep(520);
              onClose();
            }}
            className="px-3 py-1.5 rounded bg-[#242a34] hover:bg-[#ffb2b7] hover:text-[#00382f] text-[#dce3f0] font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 border border-[#3a4a46]/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>EXIT ARENA (ESC)</span>
          </button>
        </div>
      </div>

      {/* Main Full-Size Arena Area */}
      <div className="flex-1 w-full h-full relative overflow-hidden">
        <ArenaCanvas
          callsign={callsign}
          wormColor={wormColor}
          onKillsUpdate={onKillsUpdate}
          onScoreUpdate={onScoreUpdate}
          isFullscreen={true}
          onToggleFullscreen={onClose}
        />
      </div>
    </div>
  );
};
