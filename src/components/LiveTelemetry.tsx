import React, { useState, useEffect } from 'react';
import { LeaderboardPilot, TelemetryLogItem } from '../types';
import { Radio, Crosshair } from 'lucide-react';
import { sounds } from '../audio';

interface LiveTelemetryProps {
  playerCallsign: string;
  playerScore: number;
  playerKills: number;
}

const INITIAL_LOGS: TelemetryLogItem[] = [
  {
    id: '1',
    killer: 'MIRA',
    victim: 'ZEPHYR',
    method: 'with neon trail cutoff',
    lumensReaped: 420,
    timeAgo: '4s AGO',
  },
  {
    id: '2',
    killer: 'QUILL',
    victim: 'KRONOS',
    method: 'in corner vortex',
    lumensReaped: 680,
    timeAgo: '14s AGO',
  },
  {
    id: '3',
    killer: 'PYRE',
    victim: 'NEO_VECTOR',
    method: 'on perimeter barrier',
    lumensReaped: 1100,
    timeAgo: '28s AGO',
  },
];

const MOCK_KILLERS = ['MIRA', 'QUILL', 'PYRE', 'VORTEX_9', 'CYBER_VIPER', 'RAZOR_7', 'ECHO_VOID'];
const MOCK_VICTIMS = ['AERO_FLUX', 'DRIFT_PUP', 'SOLAR_PULSE', 'NEXUS_9', 'GLITCH_BOY', 'VECTOR_X'];
const MOCK_METHODS = [
  'with high-speed perimeter cutoff',
  'in dual-orbit collision',
  'after wormhole interception',
  'during high-risk boost maneuver',
  'inside gravity funnel snare',
];

export const LiveTelemetry: React.FC<LiveTelemetryProps> = ({
  playerCallsign,
  playerScore,
  playerKills,
}) => {
  const [logs, setLogs] = useState<TelemetryLogItem[]>(INITIAL_LOGS);
  const [aggregateLumens, setAggregateLumens] = useState(884920);

  // Live dynamic combat kill feed updates
  useEffect(() => {
    const timer = setInterval(() => {
      const killer = MOCK_KILLERS[Math.floor(Math.random() * MOCK_KILLERS.length)];
      const victim = MOCK_VICTIMS[Math.floor(Math.random() * MOCK_VICTIMS.length)];
      const method = MOCK_METHODS[Math.floor(Math.random() * MOCK_METHODS.length)];
      const reaped = Math.floor(Math.random() * 800) + 200;

      const newEntry: TelemetryLogItem = {
        id: Date.now().toString(),
        killer,
        victim,
        method,
        lumensReaped: reaped,
        timeAgo: 'JUST NOW',
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 3)]);
      setAggregateLumens((prev) => prev + reaped);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] text-[#00f5d4] uppercase tracking-widest font-semibold">
            TACTICAL RADAR STREAM
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-[#dce3f0] font-bold tracking-wider mt-1">
            LIVE ARENA TELEMETRY
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] animate-pulse shadow-[0_0_8px_#00f5d4]" />
          <span className="font-mono text-xs text-[#b9cac4]">REALTIME REFRESH RATE: 60Hz</span>
        </div>
      </div>

      {/* Telemetry Table + Live Kill Feed Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Top Pilots Leaderboard Table (8 cols) */}
        <div className="lg:col-span-8 rounded-xl bg-[#19202a]/80 border border-[#00f5d4]/20 overflow-hidden shadow-xl">
          <div className="p-4 bg-[#242a34]/70 border-b border-[#3a4a46]/40 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#00f5d4] tracking-wider uppercase font-semibold">
              CURRENT SECTOR PILOT HIERARCHY
            </span>
            <span className="font-mono text-[10px] text-[#83948f]">SEASON-04 · CYCLE 81</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-[#080f18]/60 text-[#83948f] uppercase text-[10px] tracking-wider border-b border-[#3a4a46]/30">
                  <th className="p-4">RANK</th>
                  <th className="p-4">CALLSIGN</th>
                  <th className="p-4">MASS / LENGTH</th>
                  <th className="p-4">TAKEDOWNS</th>
                  <th className="p-4">BOUNTY</th>
                  <th className="p-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3a4a46]/20">
                {/* Row 1 */}
                <tr className="bg-[#19202a]/40 hover:bg-[#242a34]/60 transition-colors">
                  <td className="p-4 font-bold text-[#00dfc1]">#01</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffb2b7] shadow-[0_0_8px_#ffb2b7]" />
                      <span className="font-bold text-[#dce3f0]">MIRA</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#080f18] text-[#ffb2b7] rounded border border-[#ffb2b7]/30 font-semibold">
                        APEX
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#dce3f0]">14,280</td>
                  <td className="p-4 font-bold text-[#00f5d4]">18 KILLS</td>
                  <td className="p-4 text-[#f9bd22] font-bold">2.45 SOL</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/40 text-[10px] font-semibold uppercase">
                      DOMINATING
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#242a34]/60 transition-colors">
                  <td className="p-4 font-bold text-[#83948f]">#02</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00dfc1]" />
                      <span className="font-bold text-[#dce3f0]">QUILL</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#dce3f0]">11,940</td>
                  <td className="p-4 font-bold text-[#00f5d4]">14 KILLS</td>
                  <td className="p-4 text-[#f9bd22] font-bold">1.80 SOL</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#080f18] text-[#26fedc] border border-[#26fedc]/30 text-[10px] font-semibold uppercase">
                      HUNTING
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-[#242a34]/60 transition-colors">
                  <td className="p-4 font-bold text-[#83948f]">#03</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffdadb]" />
                      <span className="font-bold text-[#dce3f0]">PYRE</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#dce3f0]">9,850</td>
                  <td className="p-4 font-bold text-[#00f5d4]">11 KILLS</td>
                  <td className="p-4 text-[#f9bd22] font-bold">0.95 SOL</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#080f18] text-[#b9cac4] border border-[#3a4a46]/50 text-[10px] font-semibold uppercase">
                      EXTRACTING
                    </span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-[#242a34]/60 transition-colors">
                  <td className="p-4 font-bold text-[#83948f]">#04</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
                      <span className="font-bold text-[#dce3f0]">VORTEX_9</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#dce3f0]">7,420</td>
                  <td className="p-4 font-bold text-[#00f5d4]">8 KILLS</td>
                  <td className="p-4 text-[#f9bd22] font-bold">0.60 SOL</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#080f18] text-[#b9cac4] border border-[#3a4a46]/50 text-[10px] font-semibold uppercase">
                      ACTIVE
                    </span>
                  </td>
                </tr>

                {/* Row 5 - Player synced */}
                <tr className="bg-[#00f5d4]/10 hover:bg-[#00f5d4]/15 border-t border-[#00f5d4]/40 transition-colors">
                  <td className="p-4 font-bold text-[#00f5d4]">#05</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f5d4] shadow-[0_0_8px_#00f5d4]" />
                      <span className="font-bold text-[#00f5d4]">{playerCallsign || 'CYBER_GHOST'}</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#2e353f] text-[#00f5d4] rounded border border-[#00f5d4]/40 font-bold">
                        YOU
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#00f5d4]">{playerScore.toLocaleString()}</td>
                  <td className="p-4 font-bold text-[#00f5d4]">{playerKills} KILLS</td>
                  <td className="p-4 text-[#f9bd22] font-bold">0.45 SOL</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/50 text-[10px] font-bold uppercase">
                      IN COMBAT
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Recent Takedowns Stream (4 cols) */}
        <div className="lg:col-span-4 rounded-xl bg-[#19202a]/80 border border-[#00f5d4]/20 p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3a4a46]/40">
              <span className="font-mono text-[#ffb2b7] uppercase text-[10px] tracking-wider flex items-center gap-1.5 font-bold">
                <Crosshair className="w-3.5 h-3.5" />
                COMBAT TELEMETRY LOG
              </span>
              <span className="w-2 h-2 rounded-full bg-[#ffb2b7] animate-ping" />
            </div>

            <div className="flex flex-col gap-2.5">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded bg-[#080f18]/80 border border-[#3a4a46]/40 flex flex-col gap-1 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#ffb2b7] font-bold">{log.killer}</span>
                    <span className="text-[#83948f] text-[9px]">{log.timeAgo}</span>
                  </div>
                  <span className="text-[11px] text-[#b9cac4] font-mono">
                    Shattered <strong className="text-[#dce3f0]">{log.victim}</strong> {log.method}
                  </span>
                  <span className="text-[10px] text-[#00dfc1] font-mono font-bold">
                    +{log.lumensReaped.toLocaleString()} LIGHT REAPED
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 bg-[#080f18]/50 p-2.5 rounded border border-[#3a4a46]/30 flex items-center justify-between text-[10px] font-mono text-[#83948f]">
            <span>AGGREGATE ARENA ENERGY</span>
            <span className="text-[#00f5d4] font-bold text-xs">
              {aggregateLumens.toLocaleString()} LUMENS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
