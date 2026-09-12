import React, { useState } from 'react';
import { Coins, Copy, Check, ExternalLink, ShieldCheck, Flame, TrendingUp } from 'lucide-react';
import { sounds } from '../audio';
import { WalletState } from '../types';

interface TokenRewardsProps {
  wallet: WalletState;
  onOpenWalletModal: () => void;
}

const CONTRACT_ADDRESS = 'Dr1ftL1ne7xS9zKpK8vQmW3aReap4UjT7kZ9sY2cSol';

export const TokenRewardsView: React.FC<TokenRewardsProps> = ({ wallet, onOpenWalletModal }) => {
  const [copied, setCopied] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('500');

  const handleCopy = () => {
    navigator.clipboard?.writeText(CONTRACT_ADDRESS);
    sounds.playBeep(880);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
        <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#19202a] border border-[#f9bd22]/30 text-[#f9bd22] mx-auto">
          <Coins className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
            DRIFTLINE ECONOMY // $DRIFT PROTOCOL
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-[#dce3f0] tracking-wider">
          TOKENOMICS &amp; PILOT REWARDS
        </h1>
        <p className="font-mono text-sm text-[#b9cac4] leading-relaxed">
          The native utility and governance asset of the Driftline vector matrix. Earn $DRIFT through arena takedowns, wormhole extractions, and protocol staking.
        </p>
      </div>

      {/* Contract Verification Banner */}
      <div className="rounded-xl p-4 sm:p-5 bg-[#080f18] border border-[#00f5d4]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00f5d4]/20 border border-[#00f5d4]/40 flex items-center justify-center text-[#00f5d4] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#00f5d4] font-bold uppercase tracking-wider">
                AUDITED SOLANA PROGRAM ID
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#19202a] text-[#00dfc1] font-mono">
                MAINNET-BETA
              </span>
            </div>
            <span className="font-mono text-xs text-[#dce3f0] break-all">{CONTRACT_ADDRESS}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-3.5 py-2 rounded bg-[#19202a] hover:bg-[#242a34] border border-[#3a4a46]/60 text-[#00f5d4] font-mono text-xs flex items-center gap-1.5 transition-all shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#00dfc1]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'COPIED!' : 'COPY ID'}</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#19202a]/85 border border-[#00f5d4]/20 flex flex-col gap-2">
          <span className="font-mono text-[10px] text-[#83948f] uppercase">TOTAL ARENA VALUE (TVL)</span>
          <span className="font-display text-3xl font-bold text-[#00f5d4]">$1,428,500</span>
          <span className="font-mono text-xs text-[#b9cac4] mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#00dfc1]" />
            +18.4% volume past 24h
          </span>
        </div>

        <div className="p-6 rounded-xl bg-[#19202a]/85 border border-[#f9bd22]/25 flex flex-col gap-2">
          <span className="font-mono text-[10px] text-[#83948f] uppercase">STAKING VAULT APR</span>
          <span className="font-display text-3xl font-bold text-[#f9bd22]">24.8% APY</span>
          <span className="font-mono text-xs text-[#b9cac4] mt-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#f9bd22]" />
            Funded by 6% arena escrow cuts
          </span>
        </div>

        <div className="p-6 rounded-xl bg-[#19202a]/85 border border-[#ffb2b7]/25 flex flex-col gap-2">
          <span className="font-mono text-[10px] text-[#83948f] uppercase">TOTAL LUMENS SHATTERED</span>
          <span className="font-display text-3xl font-bold text-[#ffb2b7]">48,920,400</span>
          <span className="font-mono text-xs text-[#b9cac4] mt-1">12,410 pilot takedowns recorded</span>
        </div>
      </div>

      {/* Staking / Rewards Terminal */}
      <div className="rounded-xl p-6 sm:p-8 bg-[#19202a]/90 border border-[#00f5d4]/30 shadow-2xl flex flex-col lg:flex-row gap-8 justify-between items-center">
        <div className="flex flex-col gap-4 max-w-lg w-full">
          <div>
            <span className="font-mono text-[10px] text-[#f9bd22] uppercase tracking-widest font-semibold">
              SECTOR STAKING VAULT
            </span>
            <h3 className="font-display text-2xl uppercase font-bold text-[#dce3f0] mt-0.5">
              STAKE $DRIFT · EARN ARENA CUTS
            </h3>
            <p className="font-mono text-xs text-[#b9cac4] mt-1 leading-relaxed">
              Locked $DRIFT stakes generate daily yield derived from arena wager transaction pools and extraction penalties.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#83948f]">STAKE AMOUNT ($DRIFT)</span>
              <span className="text-[#00f5d4]">
                AVAILABLE: {wallet.isConnected ? `${wallet.driftBalance} $DRIFT` : '0 $DRIFT'}
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#080f18] text-[#dce3f0] font-mono text-sm rounded border border-[#3a4a46]/70 focus:border-[#00f5d4] outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#83948f] font-bold">
                $DRIFT
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:max-w-xs flex flex-col gap-3 font-mono text-xs bg-[#080f18] p-5 rounded-lg border border-[#3a4a46]/50">
          <div className="flex items-center justify-between">
            <span className="text-[#83948f]">EST. DAILY YIELD:</span>
            <span className="text-[#f9bd22] font-bold">
              +{((Number(stakeAmount) || 0) * 0.00068).toFixed(2)} SOL
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#83948f]">LOCKUP PERIOD:</span>
            <span className="text-[#dce3f0]">FLEXIBLE (0 DAYS)</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#3a4a46]/40 pt-2">
            <span className="text-[#83948f]">PROTOCOL REWARD:</span>
            <span className="text-[#00dfc1] font-bold">+24.8% APY</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!wallet.isConnected) {
                onOpenWalletModal();
              } else {
                sounds.playBeep(780);
                alert(`Successfully staked ${stakeAmount} $DRIFT in the Driftline Vault!`);
              }
            }}
            className="w-full py-3 mt-2 rounded bg-[#f9bd22] hover:bg-[#ffd57d] text-[#261a00] font-display text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(249,189,34,0.4)] cursor-pointer"
          >
            {wallet.isConnected ? 'CONFIRM VAULT STAKE' : 'CONNECT WALLET TO STAKE'}
          </button>
        </div>
      </div>
    </div>
  );
};
