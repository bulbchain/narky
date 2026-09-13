import React from 'react';
import { X, User, Award, Shield, Zap, Sparkles } from 'lucide-react';
import { sounds } from '../audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  callsign: string;
  setCallsign: (val: string) => void;
  score: number;
  kills: number;
}

const BADGES = [
  { name: 'APEX HUNTER', desc: '10+ arena takedowns in single match', icon: '⚡', unlocked: true },
  { name: 'LIGHT CONSUMER', desc: 'Absorbed 10,000+ phosphor lumens', icon: '✨', unlocked: true },
  { name: 'VECTOR ACE', desc: 'Maintained 3.2x boost for 15s', icon: '🚀', unlocked: true },
  { name: 'WORMHOLE RUNNER', desc: 'Successful Staked Run extraction', icon: '🌀', unlocked: false },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  callsign,
  setCallsign,
  score,
  kills,
}) => {
  if (!isOpen) return null;

  const pilotRank =
    score >= 15000
      ? 'VECTOR COMMANDER'
      : score >= 9000
        ? 'TACTICAL VETERAN'
        : score >= 5000
          ? 'VECTOR FIGHTER'
          : 'RISING PILOT';

  const pilotLevel = Math.min(99, 8 + Math.floor(kills / 2) + Math.floor(score / 2500));
  const boostEfficiency = Math.min(99.9, 68 + kills * 2.8 + score / 600).toFixed(1);
  const escapeRate = Math.min(99.9, 52 + kills * 3.1 + score / 800).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080f18]/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-xl bg-[#19202a] border border-[#00f5d4]/40 p-6 shadow-[0_0_40px_rgba(0,245,212,0.25)] flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3a4a46]/40 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#00f5d4]" />
            <h3 className="font-display text-lg uppercase font-bold text-[#dce3f0]">
              PILOT TELEMETRY MATRIX
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playBeep(520);
              onClose();
            }}
            className="p-1 rounded text-[#83948f] hover:text-[#dce3f0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Identity & Rank */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-[#080f18] border border-[#00f5d4]/30">
          <div className="w-14 h-14 rounded-full bg-[#00f5d4]/20 border-2 border-[#00f5d4] flex items-center justify-center text-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.4)]">
            <User className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#83948f] uppercase">ACTIVE PILOT CALLSIGN</span>
            <span className="font-display text-xl font-bold text-[#00f5d4] uppercase">
              {callsign || 'CYBER_GHOST'}
            </span>
            <span className="font-mono text-[10px] text-[#ffd57d] mt-0.5">
              PILOT RANK: {pilotRank} (LVL {pilotLevel})
            </span>
          </div>
        </div>

        {/* Lifetime Stats */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#080f18] rounded border border-[#3a4a46]/40 flex flex-col">
            <span className="text-[#83948f] text-[9px]">LIFETIME TAKEDOWNS</span>
            <span className="text-[#00f5d4] text-base font-bold mt-0.5">{kills} KILLS</span>
          </div>
          <div className="p-3 bg-[#080f18] rounded border border-[#3a4a46]/40 flex flex-col">
            <span className="text-[#83948f] text-[9px]">PEAK LIGHT MASS</span>
            <span className="text-[#d7fff3] text-base font-bold mt-0.5">
              {score.toLocaleString()}
            </span>
          </div>
          <div className="p-3 bg-[#080f18] rounded border border-[#3a4a46]/40 flex flex-col">
            <span className="text-[#83948f] text-[9px]">BOOST EFFICIENCY</span>
            <span className="text-[#f9bd22] text-base font-bold mt-0.5">{boostEfficiency}%</span>
          </div>
          <div className="p-3 bg-[#080f18] rounded border border-[#3a4a46]/40 flex flex-col">
            <span className="text-[#83948f] text-[9px]">ARENA ESCAPE RATE</span>
            <span className="text-[#ffb2b7] text-base font-bold mt-0.5">{escapeRate}%</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-[#83948f] uppercase tracking-wider">
            ACHIEVED TACTICAL BADGES:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {BADGES.map((b) => (
              <div
                key={b.name}
                className={`p-2.5 rounded border flex items-center gap-2 font-mono text-[10px] ${
                  b.unlocked
                    ? 'bg-[#080f18] border-[#00f5d4]/40 text-[#dce3f0]'
                    : 'bg-[#080f18]/50 border-[#3a4a46]/30 text-[#83948f] opacity-60'
                }`}
              >
                <span className="text-base">{b.icon}</span>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold truncate text-[#00f5d4]">{b.name}</span>
                  <span className="text-[8px] text-[#83948f] truncate">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
