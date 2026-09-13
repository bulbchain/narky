import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { sounds } from '../audio';

import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  Shield,
  Magnet,
} from 'lucide-react';

interface ArenaCanvasProps {
  callsign: string;
  onKillsUpdate?: (kills: number) => void;
  onScoreUpdate?: (score: number) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

type PowerUpType = 'magnet' | 'phase' | 'overclock';

interface PowerUp {
  x: number;
  y: number;
  type: PowerUpType;
  radius: number;
  pulse: number;
}

interface ActivePowerUp {
  type: PowerUpType;
  duration: number; // in frames (60 = 1 sec)
  maxDuration: number;
}

interface Orb {
  x: number;
  y: number;
  radius: number;
  color: string;
  pulse: number;
  vx: number;
  vy: number;
  value: number;
  isLoot?: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  size: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  decay: number;
  scale?: number;
}

interface TrailPoint {
  x: number;
  y: number;
}

interface BotCraft {
  name: string;
  color: string;
  coreColor: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  trail: TrailPoint[];
  maxTrail: number;
  thickness: number;
  turnRate: number;
  score: number;
}

export const ArenaCanvas: React.FC<ArenaCanvasProps> = ({
  callsign,
  onKillsUpdate,
  onScoreUpdate,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const restartRef = React.useRef<() => void>(() => {});
  const isPausedRef = React.useRef(false);

  const [shareAvailable, setShareAvailable] = React.useState(false);
  const [lastScore, setLastScore] = React.useState<number | null>(null);
  const [showDeathModal, setShowDeathModal] = React.useState(false);

  const WEBSITE_URL = 'https://your-website.example';
  const TWITTER_URL = 'https://x.com/yourhandle';

  const shareOnX = useCallback(() => {
    if (lastScore == null) return;
    const text = `I scored ${lastScore} points in PumpFun Arena! Join me at ${WEBSITE_URL} — follow ${TWITTER_URL} to play.`;
    const intent = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
    window.open(intent, '_blank', 'noopener');
  }, [lastScore]);

  const shareThenRestart = useCallback(() => {
    shareOnX();
    setShowDeathModal(false);
    try {
      restartRef.current();
    } catch {}
  }, [shareOnX]);

  const playAgain = useCallback(() => {
    setShowDeathModal(false);
    try {
      restartRef.current();
    } catch {}
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mobileInputRef = useRef({
    active: false,
    dx: 0,
    dy: -1,
    boost: false,
  });

  // HUD & Game State React Wrappers
  const [score, setScore] = useState<number>(0);
  const [kills, setKills] = useState<number>(0);
  const [bestToday, setBestToday] = useState<number>(5245);
  const [comboCount, setComboCount] = useState<number>(0);
  const [activeBuffs, setActiveBuffs] = useState<{ type: PowerUpType; percent: number }[]>([]);

  const [alertText, setAlertText] = useState<string>('TRAIL COLLISION');
  const [alertColor, setAlertColor] = useState<string>('#ffb2b7');
  const [hintVisible, setHintVisible] = useState<boolean>(true);

  const [roster, setRoster] = useState<{ name: string; score: number; isPlayer?: boolean }[]>([
    { name: 'RATTAIL', score: 617 },
    { name: 'CHIMAERA', score: 548 },
    { name: 'SIREN', score: 484 },
    { name: 'BULPER', score: 481 },
    { name: 'BRISTLE', score: 369 },
    { name: callsign || 'CYBER_GHOST', score: 250, isPlayer: true },
  ]);

  useEffect(() => {
    setRoster((prev) =>
      prev.map((item) =>
        item.isPlayer ? { ...item, name: callsign || 'CYBER_GHOST' } : item
      )
    );
  }, [callsign]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;
    const dpr = window.devicePixelRatio || 1;

    const WORLD_WIDTH = 3200;
    const WORLD_HEIGHT = 3200;
    const ARENA_CENTER_X = WORLD_WIDTH / 2;
    const ARENA_CENTER_Y = WORLD_HEIGHT / 2;
    const ARENA_RADIUS = WORLD_WIDTH / 2 - 40;

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    const observer = new ResizeObserver(() => resize());
    observer.observe(container);

    const orbPalette = ['#00f5d4', '#ffd57d', '#ffb2b7', '#70a4ff', '#ffffff', '#e60067', '#2bd966'];

    const createOrb = (x?: number, y?: number, isLoot = false, lootValue = 50): Orb => {
      let orbX = x;
      let orbY = y;

      if (orbX === undefined || orbY === undefined) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * (ARENA_RADIUS - 60);
        orbX = ARENA_CENTER_X + Math.cos(angle) * r;
        orbY = ARENA_CENTER_Y + Math.sin(angle) * r;
      }

      return {
        x: orbX,
        y: orbY,
        radius: isLoot ? Math.random() * 2 + 5 : Math.random() * 2.2 + 2,
        color: isLoot ? '#ff0055' : orbPalette[Math.floor(Math.random() * orbPalette.length)],
        pulse: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * (isLoot ? 2.5 : 0.4),
        vy: (Math.random() - 0.5) * (isLoot ? 2.5 : 0.4),
        value: isLoot ? lootValue : Math.random() > 0.75 ? 50 : 25,
        isLoot,
      };
    };

    let orbs: Orb[] = Array.from({ length: 400 }, () => createOrb());
    let powerUps: PowerUp[] = [];
    let activePowerUps: Map<PowerUpType, ActivePowerUp> = new Map();

    const spawnPowerUp = () => {
      if (powerUps.length >= 6) return;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * (ARENA_RADIUS - 120);
      const types: PowerUpType[] = ['magnet', 'phase', 'overclock'];
      powerUps.push({
        x: ARENA_CENTER_X + Math.cos(angle) * r,
        y: ARENA_CENTER_Y + Math.sin(angle) * r,
        type: types[Math.floor(Math.random() * types.length)],
        radius: 12,
        pulse: 0,
      });
    };

    // Spawn powerups periodically
    for (let i = 0; i < 4; i++) spawnPowerUp();

    let particles: Spark[] = [];
    let floatingTexts: FloatingText[] = [];

    let screenShake = 0;

    const emitSparks = (x: number, y: number, color: string, count = 10, speedMult = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 3 + 1.5) * speedMult;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          decay: Math.random() * 0.035 + 0.02,
          color,
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    const addScorePopup = (x: number, y: number, text: string, color = '#00f5d4', scale = 1) => {
      floatingTexts.push({
        x,
        y,
        text,
        color,
        life: 1.0,
        decay: 0.02,
        scale,
      });
    };

    const player = {
      name: callsign || 'CYBER_GHOST',
      x: ARENA_CENTER_X,
      y: ARENA_CENTER_Y,
      angle: -Math.PI / 2,
      baseSpeed: 2.5,
      boostSpeed: 4.8,
      trail: [] as TrailPoint[],
      maxTrail: 34,
      thickness: 7.5,
      color: '#00f5d4',
    };

    const camera = {
      x: player.x - width / 2,
      y: player.y - height / 2,
    };

    for (let i = 0; i < 20; i++) {
      player.trail.push({ x: player.x, y: player.y + i * 3 });
    }

    const createBotPool = (count: number): BotCraft[] => {
      const botNames = ['WILL', 'VORTEX_9', 'PYRE', 'DRIFTER', 'BARRELEYE', 'NAUTILUS', 'RATTATI', 'SWITCHHEAD', 'HYDRA', 'TITAN'];
      const colors = ['#00c3ff', '#2bd966', '#e60067', '#38bdf8', '#00f5d4', '#c084fc', '#ff4655', '#ffd57d'];

      return Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * (ARENA_RADIUS - 100);
        const bx = ARENA_CENTER_X + Math.cos(angle) * r;
        const by = ARENA_CENTER_Y + Math.sin(angle) * r;

        const bTrail: TrailPoint[] = [];
        for (let j = 0; j < 18; j++) {
          bTrail.push({ x: bx - j * 2, y: by - j * 2 });
        }

        return {
          name: `${botNames[i % botNames.length]}_${Math.floor(Math.random() * 89 + 10)}`,
          color: colors[i % colors.length],
          coreColor: '#ffffff',
          x: bx,
          y: by,
          angle: Math.random() * Math.PI * 2,
          speed: 1.8 + Math.random() * 0.6,
          trail: bTrail,
          maxTrail: Math.floor(Math.random() * 15 + 25),
          thickness: 7.5,
          turnRate: 0.04 + Math.random() * 0.01,
          score: Math.floor(Math.random() * 500 + 100),
        };
      });
    };

    let bots: BotCraft[] = createBotPool(20);
    let isBoosting = false;
    const mouse = { x: width / 2, y: height / 2, active: false };
    const mobileInput = mobileInputRef.current;

    let frame = 0;
    let localScore = 0;
    let localKills = 0;

    // Combo Tracker
    let comboTimer = 0;
    let currentCombo = 0;

    const dropLootOrbs = (x: number, y: number, totalScore: number) => {
      const numOrbs = Math.min(25, Math.max(8, Math.floor(totalScore / 50)));
      const valuePerOrb = Math.max(25, Math.floor(totalScore / numOrbs));
      for (let i = 0; i < numOrbs; i++) {
        orbs.push(createOrb(x, y, true, valuePerOrb));
      }
    };

    restartRef.current = () => {
      localScore = 0;
      localKills = 0;
      currentCombo = 0;
      comboTimer = 0;
      setComboCount(0);
      activePowerUps.clear();

      player.x = ARENA_CENTER_X;
      player.y = ARENA_CENTER_Y;
      player.angle = -Math.PI / 2;
      player.trail = [];

      isBoosting = false;
      mobileInput.active = false;
      mobileInput.dx = 0;
      mobileInput.dy = -1;
      mobileInput.boost = false;

      bots = createBotPool(20);
      orbs = Array.from({ length: 400 }, () => createOrb());
      powerUps = [];
      for (let i = 0; i < 4; i++) spawnPowerUp();

      setScore(0);
      setKills(0);
      if (onKillsUpdate) onKillsUpdate(0);
      if (onScoreUpdate) onScoreUpdate(0);

      setShareAvailable(false);
      setLastScore(null);
      setShowDeathModal(false);
      isPausedRef.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      setHintVisible(false);
    };

    const onTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest('[data-mobile-control="true"]')) return;
      if (!e.touches.length) return;
      const rect = container.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
      setHintVisible(false);
      e.preventDefault();
    };

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button')) return;
      isBoosting = true;
      sounds.playBoostSound();
    };

    const onMouseUp = () => { isBoosting = false; };

    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest('[data-mobile-control="true"]')) return;
      if ((e.target as HTMLElement).closest('button')) return;
      isBoosting = true;
      sounds.playBoostSound();
    };

    const onTouchEnd = () => { isBoosting = false; };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ShiftLeft'].includes(e.code)) {
        if (!isBoosting) sounds.playBoostSound();
        isBoosting = true;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        player.angle -= 0.12;
        mouse.active = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        player.angle += 0.12;
        mouse.active = false;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (['Space', 'ShiftLeft'].includes(e.code)) isBoosting = false;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.05)';
      ctx.lineWidth = 0.8;
      const hexR = 24;
      const hexH = hexR * Math.sqrt(3);

      const startX = Math.floor(camera.x / (hexR * 3)) * (hexR * 3) - hexR * 3;
      const endX = camera.x + width + hexR * 3;
      const startY = Math.floor(camera.y / hexH) * hexH - hexH;
      const endY = camera.y + height + hexH;

      for (let x = startX; x < endX; x += hexR * 3) {
        for (let y = startY; y < endY; y += hexH) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + hexR * Math.cos(angle);
            const hy = y + hexR * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + hexR * 1.5 + hexR * Math.cos(angle);
            const hy = y + hexH * 0.5 + hexR * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const render = () => {
      frame++;

      // PowerUp timer loop
      if (!isPausedRef.current) {
        const remainingBuffs: { type: PowerUpType; percent: number }[] = [];
        activePowerUps.forEach((buff, key) => {
          buff.duration--;
          if (buff.duration <= 0) {
            activePowerUps.delete(key);
          } else {
            remainingBuffs.push({
              type: key,
              percent: (buff.duration / buff.maxDuration) * 100,
            });
          }
        });
        setActiveBuffs(remainingBuffs);

        // Combo decay
        if (comboTimer > 0) {
          comboTimer--;
          if (comboTimer <= 0) {
            currentCombo = 0;
            setComboCount(0);
          }
        }
      }

      ctx.fillStyle = '#07111a';
      ctx.fillRect(0, 0, width, height);

      // Camera shake calculations
      let shakeX = 0;
      let shakeY = 0;
      if (screenShake > 0) {
        shakeX = (Math.random() - 0.5) * screenShake;
        shakeY = (Math.random() - 0.5) * screenShake;
        screenShake *= 0.88;
        if (screenShake < 0.5) screenShake = 0;
      }

      camera.x += (player.x - width / 2 - camera.x) * 0.1;
      camera.y += (player.y - height / 2 - camera.y) * 0.1;

      ctx.save();
      ctx.translate(-camera.x + shakeX, -camera.y + shakeY);

      drawGrid();

      // Circular Arena Boundary
      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00ff66';
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.8)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(ARENA_CENTER_X, ARENA_CENTER_Y, ARENA_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 255, 102, 0.2)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(ARENA_CENTER_X, ARENA_CENTER_Y, ARENA_RADIUS, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Power Ups render & collection
      if (frame % 300 === 0 && !isPausedRef.current) spawnPowerUp();

      for (let i = powerUps.length - 1; i >= 0; i--) {
        const p = powerUps[i];
        p.pulse += 0.05;

        ctx.save();
        ctx.translate(p.x, p.y);
        const scale = 1 + Math.sin(p.pulse) * 0.15;
        ctx.scale(scale, scale);

        let iconColor = '#00f5d4';
        if (p.type === 'magnet') iconColor = '#a855f7';
        if (p.type === 'phase') iconColor = '#3b82f6';
        if (p.type === 'overclock') iconColor = '#eab308';

        ctx.shadowBlur = 15;
        ctx.shadowColor = iconColor;
        ctx.fillStyle = iconColor;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const label = p.type === 'magnet' ? 'MAG' : p.type === 'phase' ? 'PHS' : 'OVC';
        ctx.fillText(label, 0, 0);

        ctx.restore();

        // Collect Power Up
        if (!isPausedRef.current) {
          const dist = Math.hypot(player.x - p.x, player.y - p.y);
          if (dist < player.thickness + p.radius + 4) {
            sounds.playOrbChime(150);
            const durationFrames = 360; // 6 seconds
            activePowerUps.set(p.type, { type: p.type, duration: durationFrames, maxDuration: durationFrames });
            emitSparks(p.x, p.y, iconColor, 20, 2);
            addScorePopup(p.x, p.y - 15, `${p.type.toUpperCase()} ACTIVATED!`, iconColor, 1.2);
            powerUps.splice(i, 1);
          }
        }
      }

      // Orbs Loop & Magnet effect
      const hasMagnet = activePowerUps.has('magnet');

      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];

        if (!isPausedRef.current) {
          if (hasMagnet) {
            const md = Math.hypot(player.x - orb.x, player.y - orb.y);
            if (md < 250) {
              const magAngle = Math.atan2(player.y - orb.y, player.x - orb.x);
              orb.vx += Math.cos(magAngle) * 0.6;
              orb.vy += Math.sin(magAngle) * 0.6;
            }
          }

          orb.x += orb.vx;
          orb.y += orb.vy;
          orb.vx *= 0.96;
          orb.vy *= 0.96;
          orb.pulse += 0.05;
        }

        const distFromCenter = Math.hypot(orb.x - ARENA_CENTER_X, orb.y - ARENA_CENTER_Y);
        if (distFromCenter > ARENA_RADIUS - 10) {
          const angle = Math.atan2(orb.y - ARENA_CENTER_Y, orb.x - ARENA_CENTER_X);
          orb.x = ARENA_CENTER_X + Math.cos(angle) * (ARENA_RADIUS - 20);
          orb.y = ARENA_CENTER_Y + Math.sin(angle) * (ARENA_RADIUS - 20);
          orb.vx = -orb.vx;
          orb.vy = -orb.vy;
        }

        const currentR = orb.radius + Math.sin(orb.pulse) * 0.7;

        ctx.save();
        ctx.shadowBlur = orb.isLoot ? 16 : 10;
        ctx.shadowColor = orb.color;
        ctx.fillStyle = orb.color;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, Math.max(1, currentR), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Player Steering & Speed
      const hasOverclock = activePowerUps.has('overclock');
      const boostActive = isBoosting || mobileInput.boost || hasOverclock;
      const currentSpeed = boostActive ? player.boostSpeed * (hasOverclock ? 1.2 : 1.0) : player.baseSpeed;

      if (!isPausedRef.current) {
        if (mobileInput.active) {
          const targetAngle = Math.atan2(mobileInput.dy, mobileInput.dx);
          let diff = targetAngle - player.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          player.angle += diff * (boostActive ? 0.16 : 0.13);
        } else if (mouse.active) {
          const worldMouseX = mouse.x + camera.x;
          const worldMouseY = mouse.y + camera.y;
          const targetAngle = Math.atan2(worldMouseY - player.y, worldMouseX - player.x);
          let diff = targetAngle - player.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          player.angle += diff * (boostActive ? 0.12 : 0.08);
        }

        player.x += Math.cos(player.angle) * currentSpeed;
        player.y += Math.sin(player.angle) * currentSpeed;
      }

      // Boundary Check
      const playerDistFromCenter = Math.hypot(player.x - ARENA_CENTER_X, player.y - ARENA_CENTER_Y);
      if (playerDistFromCenter >= ARENA_RADIUS - 10) {
        emitSparks(player.x, player.y, '#00ff66', 35, 3);
        screenShake = 15;
        addScorePopup(player.x, player.y - 20, `CRASHED! -200`, '#ffb2b7');
        sounds.playShatter();

        setAlertText('YOU CRASHED');
        setAlertColor('#ffb2b7');

        dropLootOrbs(player.x, player.y, localScore);

        setTimeout(() => setAlertText('TRAIL COLLISION'), 2600);

        localScore = Math.max(0, localScore - 200);
        setScore(Math.floor(localScore));
        setBestToday((prev) => Math.max(prev, Math.floor(localScore)));

        if (onScoreUpdate) onScoreUpdate(Math.floor(localScore));

        player.x = ARENA_CENTER_X;
        player.y = ARENA_CENTER_Y;
        player.angle = -Math.PI / 2;
        player.trail = [];

        isBoosting = false;
        mobileInput.boost = false;
        isPausedRef.current = true;

        setLastScore(Math.floor(localScore));
        setShareAvailable(true);
        setShowDeathModal(true);
      }

      // Player Trail update
      if (!isPausedRef.current) {
        player.trail.unshift({ x: player.x, y: player.y });
        if (player.trail.length > player.maxTrail) player.trail.pop();
      }

      // Score drain on boost (Overclock protects score!)
      if (!isPausedRef.current && boostActive && !hasOverclock) {
        localScore = Math.max(10, localScore - 0.2);
        if (frame % 3 === 0) emitSparks(player.x, player.y, '#00f5d4', 2, 1.2);
      }

      // Orb Collection
      for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];
        const dist = Math.hypot(player.x - orb.x, player.y - orb.y);

        if (dist < player.thickness + orb.radius + 6) {
          if (!isPausedRef.current) {
            const comboMult = 1 + Math.min(4, currentCombo * 0.5);
            const gainedScore = Math.floor(orb.value * comboMult);

            localScore += gainedScore;
            player.maxTrail = Math.min(140, player.maxTrail + (orb.isLoot ? 2 : 1));

            emitSparks(orb.x, orb.y, orb.color, orb.isLoot ? 12 : 8, 1.2);
            addScorePopup(orb.x, orb.y - 10, `+${gainedScore}`, orb.color);
            sounds.playOrbChime(orb.value);

            if (orb.isLoot) {
              orbs.splice(i, 1);
            } else {
              orbs[i] = createOrb();
            }

            setScore(Math.floor(localScore));
            setBestToday((prev) => Math.max(prev, Math.floor(localScore)));
            if (onScoreUpdate) onScoreUpdate(Math.floor(localScore));
          }
        }
      }

      // Bot logic
      const hasPhase = activePowerUps.has('phase');

      bots.forEach((bot) => {
        if (isPausedRef.current) return;

        let closestOrb: Orb | null = null;
        let minDist = 220;

        for (let i = 0; i < orbs.length; i++) {
          const d = Math.hypot(orbs[i].x - bot.x, orbs[i].y - bot.y);
          if (d < minDist) {
            minDist = d;
            closestOrb = orbs[i];
          }
        }

        if (closestOrb) {
          const targetAngle = Math.atan2(closestOrb.y - bot.y, closestOrb.x - bot.x);
          let diff = targetAngle - bot.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          bot.angle += diff * bot.turnRate;
        } else {
          bot.angle += (Math.random() - 0.5) * 0.08;
        }

        bot.x += Math.cos(bot.angle) * bot.speed;
        bot.y += Math.sin(bot.angle) * bot.speed;

        const botDistFromCenter = Math.hypot(bot.x - ARENA_CENTER_X, bot.y - ARENA_CENTER_Y);
        if (botDistFromCenter >= ARENA_RADIUS - 15) {
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnR = Math.sqrt(Math.random()) * (ARENA_RADIUS - 150);
          bot.x = ARENA_CENTER_X + Math.cos(spawnAngle) * spawnR;
          bot.y = ARENA_CENTER_Y + Math.sin(spawnAngle) * spawnR;
          bot.trail = [];
        }

        bot.trail.unshift({ x: bot.x, y: bot.y });
        if (bot.trail.length > bot.maxTrail) bot.trail.pop();

        for (let i = orbs.length - 1; i >= 0; i--) {
          const d = Math.hypot(orbs[i].x - bot.x, orbs[i].y - bot.y);
          if (d < bot.thickness + orbs[i].radius + 5) {
            emitSparks(orbs[i].x, orbs[i].y, bot.color, 4, 0.8);
            if (orbs[i].isLoot) {
              orbs.splice(i, 1);
            } else {
              orbs[i] = createOrb();
            }
          }
        }

        // PLAYER CUTS BOT
        for (let t = 6; t < player.trail.length; t++) {
          const td = Math.hypot(player.trail[t].x - bot.x, player.trail[t].y - bot.y);
          if (td < player.thickness + 5) {
            localKills += 1;
            currentCombo += 1;
            comboTimer = 240; // 4 second combo window
            setComboCount(currentCombo);

            const baseKillScore = 420;
            const comboBonus = currentCombo * 150;
            const totalKillAward = baseKillScore + comboBonus;
            localScore += totalKillAward;

            screenShake = 12;
            emitSparks(bot.x, bot.y, bot.color, 45, 3.5);

            const comboLabel = currentCombo > 1 ? ` (${currentCombo}X COMBO!)` : '';
            addScorePopup(bot.x, bot.y - 20, `${bot.name} SHATTERED! +${totalKillAward}${comboLabel}`, '#ffb2b7', 1.3);
            sounds.playShatter();

            // Explosive Loot Orbs burst from shattered bot!
            dropLootOrbs(bot.x, bot.y, bot.score || 350);

            setAlertText(currentCombo > 1 ? `MULTI-KILL x${currentCombo}!` : `${bot.name} ELIMINATED`);
            setAlertColor('#ffb2b7');
            setTimeout(() => setAlertText('TRAIL COLLISION'), 2600);

            setKills(localKills);
            setScore(Math.floor(localScore));
            setBestToday((prev) => Math.max(prev, Math.floor(localScore)));

            if (onKillsUpdate) onKillsUpdate(localKills);
            if (onScoreUpdate) onScoreUpdate(Math.floor(localScore));

            const spawnAngle = Math.random() * Math.PI * 2;
            const spawnR = Math.sqrt(Math.random()) * (ARENA_RADIUS - 150);
            bot.x = ARENA_CENTER_X + Math.cos(spawnAngle) * spawnR;
            bot.y = ARENA_CENTER_Y + Math.sin(spawnAngle) * spawnR;
            bot.score = 150;
            bot.trail = [];
            break;
          }
        }

        // BOT CUTS PLAYER (Ignored if PHASE SHIFT active)
        if (!hasPhase) {
          for (let t = 6; t < bot.trail.length; t++) {
            const pd = Math.hypot(bot.trail[t].x - player.x, bot.trail[t].y - player.y);
            if (pd < player.thickness + 5) {
              screenShake = 18;
              emitSparks(player.x, player.y, player.color, 40, 3);
              addScorePopup(player.x, player.y - 20, `KILLED BY ${bot.name}`, '#ffb2b7');
              sounds.playShatter();

              dropLootOrbs(player.x, player.y, localScore);

              setAlertText(`KILLED BY ${bot.name}`);
              setAlertColor('#ffb2b7');
              setTimeout(() => setAlertText('TRAIL COLLISION'), 2600);

              bot.score = (bot.score || 0) + 420;
              localScore = Math.max(0, localScore - 200);

              setScore(Math.floor(localScore));
              setBestToday((prev) => Math.max(prev, Math.floor(localScore)));
              if (onScoreUpdate) onScoreUpdate(Math.floor(localScore));

              player.x = ARENA_CENTER_X;
              player.y = ARENA_CENTER_Y;
              player.angle = -Math.PI / 2;
              player.trail = [];

              isBoosting = false;
              mobileInput.boost = false;
              isPausedRef.current = true;

              setLastScore(Math.floor(localScore));
              setShareAvailable(true);
              setShowDeathModal(true);
              break;
            }
          }
        }
      });

      // RENDER BOT TRAILS
      bots.forEach((bot) => {
        if (bot.trail.length > 2) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowBlur = 14;
          ctx.shadowColor = bot.color;
          ctx.strokeStyle = bot.color;
          ctx.lineWidth = bot.thickness;

          ctx.beginPath();
          ctx.moveTo(bot.trail[0].x, bot.trail[0].y);
          for (let i = 1; i < bot.trail.length; i++) {
            ctx.lineTo(bot.trail[i].x, bot.trail[i].y);
          }
          ctx.stroke();

          ctx.shadowBlur = 4;
          ctx.shadowColor = '#ffffff';
          ctx.strokeStyle = bot.coreColor || '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.save();
          ctx.translate(bot.x, bot.y);
          ctx.rotate(bot.angle + Math.PI / 2);

          const botCapW = 12;
          const botCapH = 24;
          const botCapR = botCapW / 2;

          ctx.shadowBlur = 12;
          ctx.shadowColor = bot.color;
          ctx.fillStyle = bot.color;

          ctx.beginPath();
          ctx.roundRect(-botCapW / 2, -botCapH / 2, botCapW, botCapH, botCapR);
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.roundRect(-botCapW / 2 + 2, -botCapH / 2 + 2, botCapW - 4, botCapH / 2, botCapR);
          ctx.fill();

          const botEyeY = -botCapH / 4;
          const botEyeOffset = botCapW / 3;
          const botEyeRadius = botCapW / 5;
          const botPupilRadius = botEyeRadius / 2;

          [-botEyeOffset, botEyeOffset].forEach((offsetX) => {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(offsetX, botEyeY, botEyeRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(offsetX, botEyeY, botPupilRadius, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.restore();

          ctx.shadowBlur = 0;
          ctx.fillStyle = bot.color;
          ctx.font = '700 10px "JetBrains Mono", monospace';
          ctx.fillText(bot.name, bot.x - 14, bot.y - 14);

          ctx.restore();
        }
      });

      // RENDER PLAYER TRAIL (Phase Shift visuals included)
      if (player.trail.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = hasPhase ? 0.45 : 1.0;

        ctx.shadowBlur = boostActive ? 26 : 18;
        ctx.shadowColor = hasPhase ? '#3b82f6' : boostActive ? '#26fedc' : player.color;
        ctx.strokeStyle = hasPhase ? '#3b82f6' : player.color;
        ctx.lineWidth = boostActive ? player.thickness + 2 : player.thickness;

        ctx.beginPath();
        ctx.moveTo(player.trail[0].x, player.trail[0].y);
        for (let i = 1; i < player.trail.length; i++) {
          ctx.lineTo(player.trail[i].x, player.trail[i].y);
        }
        ctx.stroke();

        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(player.angle + Math.PI / 2);

        const capW = boostActive ? 14 : 12;
        const capH = boostActive ? 28 : 24;
        const capR = capW / 2;

        ctx.shadowBlur = boostActive ? 20 : 12;
        ctx.shadowColor = boostActive ? '#26fedc' : player.color;
        ctx.fillStyle = player.color;

        ctx.beginPath();
        ctx.roundRect(-capW / 2, -capH / 2, capW, capH, capR);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.roundRect(-capW / 2 + 2, -capH / 2 + 2, capW - 4, capH / 2, capR);
        ctx.fill();

        const eyeY = -capH / 4;
        const eyeOffset = capW / 3;
        const eyeRadius = capW / 5;
        const pupilRadius = eyeRadius / 2;

        [-eyeOffset, eyeOffset].forEach((offsetX) => {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(offsetX, eyeY, eyeRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(offsetX, eyeY, pupilRadius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#00f5d4';
        ctx.font = '700 10px "JetBrains Mono", monospace';
        ctx.fillText(callsign || 'CYBER_GHOST', player.x - 18, player.y - 16);

        ctx.restore();
      }

      // PARTICLES
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // FLOATING TEXT
      for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y -= 0.8;
        ft.life -= ft.decay;

        if (ft.life <= 0) {
          floatingTexts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = ft.life;
        const textSize = Math.floor(11 * (ft.scale || 1));
        ctx.font = `700 ${textSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = ft.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = ft.color;
        ctx.fillText(ft.text, ft.x - 10, ft.y);
        ctx.restore();
      }

      ctx.restore();

      // ROSTER UPDATE
      if (frame % 30 === 0 && !isPausedRef.current) {
        try {
          setRoster(() => {
            const sortedBots = [...bots]
              .sort((a, b) => b.score - a.score)
              .map((b) => ({ name: b.name, score: Math.floor(b.score || 0) }));

            const playerEntry = {
              name: callsign || 'CYBER_GHOST',
              score: Math.floor(localScore),
              isPlayer: true,
            };

            return [...sortedBots, playerEntry]
              .sort((a, b) => b.score - a.score)
              .slice(0, 6);
          });
        } catch {}
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [callsign, onKillsUpdate, onScoreUpdate]);

  return (
    <div
      ref={containerRef}
      className={`
        relative rounded-xl bg-[#07111a] border border-[#00f5d4]/40
        shadow-[0_0_30px_rgba(0,245,212,0.15),0_8px_40px_rgba(0,0,0,0.9)]
        ${isFullscreen ? 'overflow-visible' : 'overflow-hidden'}
        flex flex-col justify-between p-4 select-none group/arena
        ${isFullscreen ? 'w-full h-full min-h-screen' : 'h-[min(78vh,620px)] min-h-[440px] sm:min-h-[500px] sm:h-[600px]'}
      `}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-crosshair z-0" />

      {/* ACTIVE POWER-UP HUD */}
      <div className="absolute top-16 left-4 z-20 flex flex-col gap-2 pointer-events-none">
        {activeBuffs.map((buff) => (
          <div
            key={buff.type}
            className="flex items-center gap-2 bg-[#0d1722]/90 border border-[#00f5d4]/30 px-3 py-1.5 rounded-md backdrop-blur-md shadow-lg"
          >
            {buff.type === 'magnet' && <Magnet className="w-4 h-4 text-purple-400 animate-pulse" />}
            {buff.type === 'phase' && <Shield className="w-4 h-4 text-blue-400 animate-pulse" />}
            {buff.type === 'overclock' && <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />}
            <span className="font-mono text-[10px] text-white font-bold uppercase">{buff.type}</span>
            <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00f5d4] transition-all duration-75"
                style={{ width: `${buff.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* MULTI-KILL COMBO OVERLAY */}
      {comboCount > 1 && (
        <div className="absolute top-24 right-1/2 translate-x-1/2 z-20 pointer-events-none animate-bounce">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-mono text-xs md:text-sm font-black px-4 py-1 rounded-full shadow-[0_0_20px_rgba(255,0,85,0.8)] border border-white/40 tracking-widest uppercase">
            🔥 {comboCount}X MULTI-KILL STREAK! 🔥
          </div>
        </div>
      )}

      {/* MOBILE CONTROLLER */}
      <div
        className={`absolute inset-x-0 z-30 pointer-events-none px-4 ${isFullscreen ? 'bottom-12 md:bottom-12' : 'bottom-0 md:bottom-2'}`}
        style={{ paddingBottom: isFullscreen ? 'calc(48px + env(safe-area-inset-bottom))' : 'calc(18px + env(safe-area-inset-bottom))' }}
      >
        <div className="relative w-full h-[104px]">
          <button
            data-mobile-control="true"
            type="button"
            className="absolute left-0 bottom-3 w-[78px] h-[78px] rounded-full border border-[#f9bd22]/60 bg-[#1b1913]/90 text-[#ffdf9f] font-mono text-[10px] font-bold tracking-widest shadow-[0_0_20px_rgba(249,189,34,0.18)] active:scale-95 active:bg-[#2b2216] touch-none select-none flex items-center justify-center z-40"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
              if (!mobileInputRef.current.boost) sounds.playBoostSound();
              mobileInputRef.current.boost = true;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              mobileInputRef.current.boost = false;
              try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
            }}
            onPointerCancel={() => { mobileInputRef.current.boost = false; }}
          >
            BOOST
          </button>

          <div
            data-mobile-control="true"
            className="absolute right-0 bottom-0 w-[104px] h-[104px] rounded-full border border-[#00f5d4]/35 bg-[#07111a]/80 backdrop-blur-sm shadow-[0_0_22px_rgba(0,245,212,0.12)] pointer-events-auto touch-none select-none z-40"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.currentTarget.setPointerCapture(e.pointerId);

              const el = e.currentTarget;
              const r = el.getBoundingClientRect();

              const updateJoystick = (clientX: number, clientY: number) => {
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const max = r.width * 0.36;

                let dx = clientX - cx;
                let dy = clientY - cy;
                const len = Math.hypot(dx, dy) || 1;
                const amount = Math.min(1, len / max);

                mobileInputRef.current.active = amount > 0.05;
                mobileInputRef.current.dx = (dx / len) * amount;
                mobileInputRef.current.dy = (dy / len) * amount;
              };

              updateJoystick(e.clientX, e.clientY);
              setHintVisible(false);
            }}
            onPointerMove={(e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
              const r = e.currentTarget.getBoundingClientRect();
              const cx = r.left + r.width / 2;
              const cy = r.top + r.height / 2;
              const max = r.width * 0.36;

              let dx = e.clientX - cx;
              let dy = e.clientY - cy;
              const len = Math.hypot(dx, dy) || 1;
              const amount = Math.min(1, len / max);

              mobileInputRef.current.active = amount > 0.05;
              mobileInputRef.current.dx = (dx / len) * amount;
              mobileInputRef.current.dy = (dy / len) * amount;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              mobileInputRef.current.active = false;
              mobileInputRef.current.dx = 0;
              mobileInputRef.current.dy = -1;
              try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
            }}
            onPointerCancel={() => {
              mobileInputRef.current.active = false;
              mobileInputRef.current.dx = 0;
              mobileInputRef.current.dy = -1;
            }}
          >
            <div className="absolute inset-2 rounded-full border border-[#00f5d4]/15" />
            <div className="absolute inset-5 rounded-full border border-[#00f5d4]/10" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#00f5d4]/70 bg-[#0b2027]/95 shadow-[0_0_14px_rgba(0,245,212,0.25)] flex items-center justify-center">
              <span className="text-[8px] font-mono tracking-widest text-[#83948f]">MOVE</span>
            </div>
          </div>
        </div>
      </div>

      {hintVisible && (
        <div className="absolute bottom-[125px] left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
          <span className="font-mono text-[8px] tracking-widest text-[#26fedc] uppercase px-2.5 py-1 rounded bg-[#080f18]/80 border border-[#00f5d4]/25">
            DRAG TO STEER · HOLD BOOST
          </span>
        </div>
      )}

      {/* DEATH MODAL */}
      {showDeathModal && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-[#0d1722]/95 border border-[#00f5d4]/20 rounded-lg p-6 w-[320px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="font-mono text-[14px] font-bold text-[#ffb2b7]">You Were Eliminated</div>
            <div className="font-mono text-[12px] text-[#dce3f0] mt-2">
              Final Score: {lastScore?.toLocaleString() || 0}
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button onClick={shareThenRestart} className="px-4 py-2 rounded bg-[#1d9bf0]/95 hover:bg-[#1290e8] text-white font-mono text-[12px]">
                Share on X
              </button>
              <button onClick={playAgain} className="px-4 py-2 rounded bg-[#00f5d4]/95 hover:bg-[#26fedc] text-black font-mono text-[12px]">
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP HUD */}
      <div className="relative z-10 w-full flex items-start justify-between gap-4 pointer-events-none">
        <div className="pointer-events-auto bg-[#0d1722]/90 border border-[#00f5d4]/40 rounded-lg p-2 md:p-3 shadow-[0_0_15px_rgba(0,245,212,0.15)] flex flex-col min-w-[100px] md:min-w-[130px] backdrop-blur-md">
          <span className="font-mono text-[8px] md:text-[9px] text-[#83948f] tracking-widest uppercase">SCORE</span>
          <span className="font-mono text-[18px] md:text-[28px] leading-tight font-bold text-[#d7fff3] my-0.5 tracking-tight drop-shadow-[0_0_8px_rgba(0,245,212,0.4)]">
            {score.toLocaleString()}
          </span>
          <div className="flex items-center justify-between text-[9px] md:text-[10px] font-mono text-[#83948f] pt-1 border-t border-[#3a4a46]/40 mt-1">
            <span>KILLS</span>
            <span className="text-[#dce3f0] font-bold">{kills}</span>
          </div>
          <div className="flex items-center justify-between text-[9px] md:text-[10px] font-mono text-[#83948f] mt-0.5">
            <span>BEST TODAY</span>
            <span className="text-[#00f5d4] font-bold">{bestToday.toLocaleString()}</span>
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <div>
            {onToggleFullscreen && (
              <button
                onClick={() => {
                  sounds.playBeep(600);
                  onToggleFullscreen();
                }}
                className="text-[#83948f] hover:text-[#00f5d4] transition-colors cursor-pointer p-1 rounded hover:bg-[#00f5d4]/10"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}
          </div>

          <div
            className="hidden md:flex bg-[#26131c]/90 border rounded-full px-3 py-1 items-center gap-1.5 shadow-[0_0_12px_rgba(255,178,183,0.25)] backdrop-blur-md"
            style={{ borderColor: alertColor + '60' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_6px_#ffb2b7]" style={{ backgroundColor: alertColor }} />
            <span className="font-mono text-[9px] font-bold tracking-wider uppercase" style={{ color: alertColor }}>
              {alertText}
            </span>
          </div>

          <div className="hidden md:flex relative bg-[#0d1722]/90 border border-[#00f5d4]/40 rounded-lg p-3 shadow-[0_0_15px_rgba(0,245,212,0.15)] min-w-[160px] flex-col backdrop-blur-md">
            <div className="flex items-center justify-between text-[9px] font-mono text-[#83948f] uppercase pb-1 mb-1 border-b border-[#3a4a46]/40">
              <span className="tracking-wider">LIVE MATCH</span>
            </div>
            <div className="flex flex-col gap-0.5 font-mono text-[10px]">
              {roster.map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between ${item.isPlayer ? 'text-[#00f5d4] font-bold pt-0.5 border-t border-[#3a4a46]/30' : 'text-[#dce3f0]'}`}>
                  <span>
                    <strong className={item.isPlayer ? 'text-[#00f5d4] mr-1' : 'text-[#83948f] mr-1'}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </strong>{' '}
                    {item.name}
                  </span>
                  <span className={item.isPlayer ? 'text-[#00f5d4]' : 'text-[#00dfc1] font-bold'}>
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};