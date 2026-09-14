import React, { useEffect, useState } from 'react';
import { NavTab, WalletState } from '../types';
import { sounds } from '../audio';
import { Zap, Wallet, User, Volume2, VolumeX, Radio } from 'lucide-react';
import logo from '../asset/narkywbg.png';
interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
  onOpenProfileModal: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wallet,
  onOpenWalletModal,
  onOpenProfileModal,
  soundMuted,
  onToggleSound,
}) => {
  const [pilotsCount, setPilotsCount] = useState(1482);
  const [ping, setPing] = useState(24);

  // Subtle realistic live telemetry fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setPilotsCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(1400, Math.min(1600, prev + delta));
      });
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(18, Math.min(32, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'play-now', label: 'Home' },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'leaderboard', label: 'LEADERBOARD' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#080f18]/85 backdrop-blur-xl border-b border-[#00f5d4]/10 shadow-[0_1px_16px_rgba(0,0,0,0.6)]">
      <div className="w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-3">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-3 sm:gap-6 xl:gap-8 min-w-0 flex-1">
          {/* Logo */}
          <button
            onClick={() => {
              sounds.playBeep(600);
              setActiveTab('play-now');
            }}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none min-w-0"
          >
           <img
  alt="NARKY Neon Logo"
  className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(0,245,212,0.6)]"
  src={logo}
/>

          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.playBeep(720);
                    setActiveTab(item.id);
                  }}
                  className={`font-mono text-[11px] font-semibold tracking-wider px-3.5 py-2 rounded transition-all ${
                    isActive
                      ? 'bg-[#19202a] text-[#00f5d4] shadow-[inset_0_0_8px_rgba(0,245,212,0.25)] border border-[#00f5d4]/30'
                      : 'text-[#b9cac4] hover:text-[#dce3f0] hover:bg-[#242a34]/60 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Live Telemetry & Wallet Trigger */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sounds.playBeep(520);
            }}
            title={soundMuted ? 'Unmute arcade sound effects' : 'Mute arcade sound effects'}
            className="p-1.5 sm:p-2 rounded bg-[#151c26] text-[#b9cac4] hover:text-[#00f5d4] hover:bg-[#19202a] border border-[#3a4a46]/40 transition-colors"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb2b7]" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f5d4]" />}
          </button>

          {/* Live Pilots & Ping Indicator */}
          <div className="hidden md:flex items-center gap-3 bg-[#151c26]/90 border border-[#3a4a46]/50 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00dfc1] animate-pulse shadow-[0_0_8px_#00dfc1]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[#d7fff3]">
                {pilotsCount.toLocaleString()} PILOTS ONLINE
              </span>
            </div>
            <span className="text-[#3a4a46] font-mono text-[11px]">|</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#f9bd22]" />
              <span className="font-mono text-[11px] text-[#b9cac4]">PING: {ping}ms</span>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <button
            onClick={() => {
              sounds.playBeep(840);
              onOpenWalletModal();
            }}
            className="font-display text-[9px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-2 sm:px-5 sm:py-2.5 bg-[#00f5d4] text-[#00382f] rounded hover:bg-[#26fedc] shadow-[0_0_20px_rgba(0,245,212,0.45)] hover:shadow-[0_0_30px_rgba(0,245,212,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 sm:gap-2 max-w-[160px] sm:max-w-none"
          >
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">
              {wallet.isConnected && wallet.address
                ? `${wallet.address.slice(0, 4)}...${wallet.address.slice(-4)} (${wallet.solBalance} SOL)`
                : 'WALLET'}
            </span>
          </button>

          {/* Profile Trigger */}
          <button
            onClick={() => {
              sounds.playBeep(640);
              onOpenProfileModal();
            }}
            title="Pilot Profile & Telemetry Matrix"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00f5d4]/20 border border-[#00f5d4]/50 flex items-center justify-center hover:bg-[#00f5d4] hover:text-[#00382f] text-[#00f5d4] transition-all shadow-[0_0_10px_rgba(0,245,212,0.2)] shrink-0"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="xl:hidden flex items-center justify-start overflow-x-auto gap-2 px-3 sm:px-4 py-2 bg-[#0d141d]/95 border-t border-[#3a4a46]/40 text-xs [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playBeep(720);
                setActiveTab(item.id);
              }}
              className={`font-mono text-[10px] font-semibold whitespace-nowrap px-3 py-1.5 rounded transition-colors ${
                isActive
                  ? 'bg-[#19202a] text-[#00f5d4] border border-[#00f5d4]/40 shadow-[0_0_8px_rgba(0,245,212,0.2)]'
                  : 'text-[#b9cac4] hover:text-[#dce3f0]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
