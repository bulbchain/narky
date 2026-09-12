export type NavTab = 'play-now' | 'arenas-and-modes' | 'how-it-works' | 'leaderboard' | 'token-and-rewards';

export type ArenaMode = 'free' | 'staked';

export interface LeaderboardPilot {
  rank: string;
  rankNum: number;
  callsign: string;
  tag?: string;
  isPlayer?: boolean;
  mass: number;
  kills: number;
  bountySol: number;
  status: 'DOMINATING' | 'HUNTING' | 'EXTRACTING' | 'ACTIVE' | 'IN COMBAT';
  color: string;
}

export interface TelemetryLogItem {
  id: string;
  killer: string;
  victim: string;
  method: string;
  lumensReaped: number;
  timeAgo: string;
  isKillerPlayer?: boolean;
}

export interface WalletState {
  isConnected: boolean;
  walletName: string | null;
  address: string | null;
  solBalance: number;
  driftBalance: number;
}

export interface GameStats {
  score: number;
  kills: number;
  bestScore: number;
  mass: number;
  boostLevel: number;
}
