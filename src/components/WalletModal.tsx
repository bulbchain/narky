import React from 'react';
import { X, Wallet, Check, AlertCircle, PlusCircle } from 'lucide-react';
import { WalletState } from '../types';
import { sounds } from '../audio';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  onConnect: (walletName: string) => void;
  onDisconnect: () => void;
  onAddTestSol: () => void;
}

const WALLET_OPTIONS = [
  {
    name: 'Phantom',
    icon: '🟣',
    color: '#ab9ff2',
    description: 'Solana & Multi-chain Vector Wallet',
  },
  {
    name: 'Solflare',
    icon: '🟠',
    color: '#fc8024',
    description: 'High-security Web3 Vault',
  },
  {
    name: 'Backpack',
    icon: '🎒',
    color: '#e54245',
    description: 'xNFT & Protocol Client',
  },
];

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onConnect,
  onDisconnect,
  onAddTestSol,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080f18]/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-xl bg-[#19202a] border border-[#00f5d4]/40 p-6 shadow-[0_0_40px_rgba(0,245,212,0.25)] flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3a4a46]/40 pb-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#00f5d4]" />
            <h3 className="font-display text-lg uppercase font-bold text-[#dce3f0]">
              {wallet.isConnected ? 'CONNECTED WALLET' : 'CONNECT VECTOR WALLET'}
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

        {wallet.isConnected ? (
          /* Connected State */
          <div className="flex flex-col gap-4 font-mono text-xs">
            <div className="p-4 rounded-lg bg-[#080f18] border border-[#00f5d4]/30 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[#83948f]">
                <span>WALLET PROVIDER:</span>
                <span className="text-[#00f5d4] font-bold">{wallet.walletName}</span>
              </div>
              <div className="flex items-center justify-between text-[#83948f]">
                <span>ADDRESS:</span>
                <span className="text-[#dce3f0] font-bold">
                  {wallet.address?.slice(0, 8)}...{wallet.address?.slice(-8)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#83948f] pt-2 border-t border-[#3a4a46]/30">
                <span>SOL BALANCE:</span>
                <span className="text-[#f9bd22] font-bold text-sm">{wallet.solBalance} SOL</span>
              </div>
              <div className="flex items-center justify-between text-[#83948f]">
                <span>$NARKY BALANCE:</span>
                <span className="text-[#00dfc1] font-bold text-sm">{wallet.narkyBalance} $NARKY</span>
              </div>
            </div>

            {/* Test Faucet Trigger */}
            <button
              type="button"
              onClick={() => {
                sounds.playBeep(780);
                onAddTestSol();
              }}
              className="py-2.5 px-4 rounded bg-[#151c26] hover:bg-[#242a34] border border-[#f9bd22]/40 text-[#f9bd22] flex items-center justify-center gap-2 transition-colors font-bold uppercase"
            >
              <PlusCircle className="w-4 h-4" />
              <span>TESTNET FAUCET (+0.50 SOL)</span>
            </button>

            {/* Disconnect */}
            <button
              type="button"
              onClick={() => {
                sounds.playBeep(440);
                onDisconnect();
              }}
              className="py-2.5 px-4 rounded bg-[#26131c] hover:bg-[#40000d] border border-[#ffb2b7]/40 text-[#ffb2b7] font-bold uppercase transition-colors"
            >
              DISCONNECT WALLET
            </button>
          </div>
        ) : (
          /* Available Wallets */
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[10px] text-[#83948f] uppercase tracking-wider">
              SELECT SOLANA PROVIDER:
            </span>
            {WALLET_OPTIONS.map((w) => (
              <button
                key={w.name}
                type="button"
                onClick={() => {
                  sounds.playBeep(740);
                  onConnect(w.name);
                }}
                className="p-3.5 rounded-lg bg-[#080f18] hover:bg-[#151c26] border border-[#3a4a46]/50 hover:border-[#00f5d4]/50 flex items-center justify-between transition-all group/opt text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{w.icon}</span>
                  <div>
                    <h4 className="font-display text-sm font-bold text-[#dce3f0] group-hover/opt:text-[#00f5d4] transition-colors">
                      {w.name}
                    </h4>
                    <p className="font-mono text-[10px] text-[#83948f]">{w.description}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#00dfc1] opacity-0 group-hover/opt:opacity-100 transition-opacity font-bold">
                  CONNECT →
                </span>
              </button>
            ))}

            <div className="p-3 rounded bg-[#080f18]/60 border border-[#3a4a46]/30 flex items-start gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-[#00dfc1] shrink-0 mt-0.5" />
              <p className="font-mono text-[10px] text-[#83948f] leading-relaxed">
                Connect your Web3 wallet to authorize non-custodial wagers in Staked Run. In Free Arena, zero wallet connection is required.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
