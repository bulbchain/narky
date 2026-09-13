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
} from 'lucide-react';

interface ArenaCanvasProps {
  callsign: string;
  onKillsUpdate?: (kills: number) => void;
  onScoreUpdate?: (score: number) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
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

    const intent =
      'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(text);

    window.open(intent, '_blank', 'noopener');
  }, [lastScore]);

  const shareThenRestart = useCallback(() => {
    shareOnX();

    setShowDeathModal(false);

    try {
      restartRef.current();
    } catch {
      try {
        // @ts-ignore
        restartGame();
      } catch {}
    }
  }, [shareOnX]);

  const playAgain = useCallback(() => {
    setShowDeathModal(false);

    try {
      restartRef.current();
    } catch {
      try {
        // @ts-ignore
        restartGame();
      } catch {}
    }
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*
   * MOBILE INPUT
   *
   * dx / dy are normalized joystick directions.
   */
  const mobileInputRef = useRef({
    active: false,
    dx: 0,
    dy: -1,
    boost: false,
  });

  // HUD
  const [score, setScore] = useState<number>(0);
  const [kills, setKills] = useState<number>(0);
  const [bestToday, setBestToday] = useState<number>(5245);

  const [alertText, setAlertText] =
    useState<string>('TRAIL COLLISION');

  const [alertColor, setAlertColor] =
    useState<string>('#ffb2b7');

  const [hintVisible, setHintVisible] =
    useState<boolean>(true);

  // Match roster
  const [roster, setRoster] = useState<
    {
      name: string;
      score: number;
      isPlayer?: boolean;
    }[]
  >([
    {
      name: 'RATTAIL',
      score: 617,
    },
    {
      name: 'CHIMAERA',
      score: 548,
    },
    {
      name: 'SIREN',
      score: 484,
    },
    {
      name: 'BULPER',
      score: 481,
    },
    {
      name: 'BRISTLE',
      score: 369,
    },
    {
      name: callsign || 'CYBER_GHOST',
      score: 250,
      isPlayer: true,
    },
  ]);

  /*
   * Sync player name into roster
   */
  useEffect(() => {
    setRoster((prev) =>
      prev.map((item) =>
        item.isPlayer
          ? {
              ...item,
              name: callsign || 'CYBER_GHOST',
            }
          : item
      )
    );
  }, [callsign]);

  /*
   * Restart game
   */
  const restartGame = useCallback(() => {
    sounds.playBeep(440);

    try {
      restartRef.current();
    } catch {
      setScore(0);
      setKills(0);

      if (onKillsUpdate) {
        onKillsUpdate(0);
      }

      if (onScoreUpdate) {
        onScoreUpdate(0);
      }
    }
  }, [onKillsUpdate, onScoreUpdate]);

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

    /*
     * Resize canvas
     */
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

    const observer = new ResizeObserver(() => {
      resize();
    });

    observer.observe(container);

    /*
     * ORBS
     */
    const orbPalette = [
      '#00f5d4',
      '#ffd57d',
      '#ffb2b7',
      '#70a4ff',
      '#ffffff',
    ];

    const createOrb = (
      x?: number,
      y?: number
    ): Orb => ({
      x:
        x !== undefined
          ? x
          : Math.random() * (width - 60) + 30,

      y:
        y !== undefined
          ? y
          : Math.random() * (height - 60) + 30,

      radius: Math.random() * 2.2 + 2,

      color:
        orbPalette[
          Math.floor(
            Math.random() * orbPalette.length
          )
        ],

      pulse: Math.random() * Math.PI * 2,

      vx: (Math.random() - 0.5) * 0.4,

      vy: (Math.random() - 0.5) * 0.4,

      value:
        Math.random() > 0.75
          ? 50
          : 25,
    });

    let orbs: Orb[] = Array.from(
      {
        length: 65,
      },
      () => createOrb()
    );

    /*
     * PARTICLES
     */
    let particles: Spark[] = [];

    let floatingTexts: FloatingText[] = [];

    const emitSparks = (
      x: number,
      y: number,
      color: string,
      count = 10,
      speedMult = 1
    ) => {
      for (let i = 0; i < count; i++) {
        const angle =
          Math.random() * Math.PI * 2;

        const speed =
          (Math.random() * 3 + 1.5) *
          speedMult;

        particles.push({
          x,
          y,

          vx:
            Math.cos(angle) *
            speed,

          vy:
            Math.sin(angle) *
            speed,

          life: 1.0,

          decay:
            Math.random() * 0.035 +
            0.02,

          color,

          size:
            Math.random() * 2.5 +
            1.5,
        });
      }
    };

    const addScorePopup = (
      x: number,
      y: number,
      text: string,
      color = '#00f5d4'
    ) => {
      floatingTexts.push({
        x,
        y,
        text,
        color,
        life: 1.0,
        decay: 0.025,
      });
    };

    /*
     * PLAYER
     */
    const player = {
      name: callsign || 'CYBER_GHOST',

      x: width * 0.5,

      y: height * 0.6,

      angle: -Math.PI / 2,

      baseSpeed: 2.5,

      boostSpeed: 4.8,

      trail: [] as TrailPoint[],

      maxTrail: 34,

      thickness: 7.5,

      color: '#00f5d4',
    };

    /*
     * Initial player trail
     */
    for (let i = 0; i < 20; i++) {
      player.trail.push({
        x: player.x,
        y: player.y + i * 3,
      });
    }

    /*
     * BOTS
     */
    const bots: BotCraft[] = [
      {
        name: 'WILL',
        color: '#38bdf8',
        coreColor: '#ffffff',

        x: width * 0.52,
        y: height * 0.22,

        angle: Math.PI * 0.35,

        speed: 1.9,

        trail: [],

        maxTrail: 26,

        thickness: 7.5,

        turnRate: 0.04,

        score: 617,
      },

      {
        name: 'VORTEX_9',
        color: '#00f5d4',
        coreColor: '#ffffff',

        x: width * 0.18,
        y: height * 0.68,

        angle: 0.3,

        speed: 2.0,

        trail: [],

        maxTrail: 30,

        thickness: 7.5,

        turnRate: 0.045,

        score: 548,
      },

      {
        name: 'PYRE',
        color: '#c084fc',
        coreColor: '#ffffff',

        x: width * 0.86,
        y: height * 0.15,

        angle: -0.1,

        speed: 2.1,

        trail: [],

        maxTrail: 28,

        thickness: 7,

        turnRate: 0.04,

        score: 484,
      },
    ];

    /*
     * Initial bot trails
     */
    bots.forEach((bot, idx) => {
      if (idx === 0) {
        for (let i = 0; i < 18; i++) {
          bot.trail.push({
            x: bot.x - i * 2,
            y: bot.y - i * 4,
          });
        }
      } else if (idx === 1) {
        for (let i = 0; i < 18; i++) {
          bot.trail.push({
            x: bot.x - i * 3.5,
            y:
              bot.y -
              Math.sin(i * 0.3) * 2,
          });
        }
      } else {
        for (let i = 0; i < 18; i++) {
          bot.trail.push({
            x: bot.x - i * 3,
            y: bot.y - i * 0.5,
          });
        }
      }
    });

    let isBoosting = false;

    const mouse = {
      x: width / 2,
      y: height / 2,
      active: false,
    };

    const mobileInput =
      mobileInputRef.current;

    let frame = 0;

    let localScore = 0;

    let localKills = 0;

    /*
     * RESTART REF
     */
    restartRef.current = () => {
      localScore = 0;

      localKills = 0;

      player.x = width * 0.5;

      player.y = height * 0.6;

      player.angle = -Math.PI / 2;

      player.trail = [];

      isBoosting = false;

      mobileInput.active = false;

      mobileInput.dx = 0;

      mobileInput.dy = -1;

      mobileInput.boost = false;

      bots.forEach((b) => {
        b.x =
          Math.random() *
            (width - 80) +
          40;

        b.y =
          Math.random() *
            (height - 80) +
          40;

        b.trail = [];
      });

      orbs = Array.from(
        {
          length: 65,
        },
        () => createOrb()
      );

      setScore(0);

      setKills(0);

      if (onKillsUpdate) {
        onKillsUpdate(0);
      }

      if (onScoreUpdate) {
        onScoreUpdate(0);
      }

      setShareAvailable(false);

      setLastScore(null);

      setShowDeathModal(false);

      isPausedRef.current = false;
    };

    /*
     * MOUSE MOVE
     */
    const onMouseMove = (e: MouseEvent) => {
      const rect =
        container.getBoundingClientRect();

      mouse.x =
        e.clientX - rect.left;

      mouse.y =
        e.clientY - rect.top;

      mouse.active = true;

      setHintVisible(false);
    };

    /*
     * TOUCH MOVE
     *
     * Ignore mobile controls.
     */
    const onTouchMove = (e: TouchEvent) => {
      if (
        (e.target as HTMLElement)?.closest(
          '[data-mobile-control="true"]'
        )
      ) {
        return;
      }

      if (!e.touches.length) {
        return;
      }

      const rect =
        container.getBoundingClientRect();

      mouse.x =
        e.touches[0].clientX -
        rect.left;

      mouse.y =
        e.touches[0].clientY -
        rect.top;

      mouse.active = true;

      setHintVisible(false);

      e.preventDefault();
    };

    /*
     * MOUSE DOWN
     */
    const onMouseDown = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest(
          'button'
        )
      ) {
        return;
      }

      isBoosting = true;

      sounds.playBoostSound();
    };

    const onMouseUp = () => {
      isBoosting = false;
    };

    /*
     * TOUCH START
     */
    const onTouchStart = (e: TouchEvent) => {
      if (
        (e.target as HTMLElement)?.closest(
          '[data-mobile-control="true"]'
        )
      ) {
        return;
      }

      if (
        (e.target as HTMLElement).closest(
          'button'
        )
      ) {
        return;
      }

      isBoosting = true;

      sounds.playBoostSound();
    };

    const onTouchEnd = () => {
      isBoosting = false;
    };

    /*
     * KEYBOARD
     */
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        ['Space', 'ShiftLeft'].includes(
          e.code
        )
      ) {
        if (!isBoosting) {
          sounds.playBoostSound();
        }

        isBoosting = true;
      }

      if (
        e.key === 'ArrowLeft' ||
        e.key === 'a' ||
        e.key === 'A'
      ) {
        player.angle -= 0.12;

        mouse.active = false;
      }

      if (
        e.key === 'ArrowRight' ||
        e.key === 'd' ||
        e.key === 'D'
      ) {
        player.angle += 0.12;

        mouse.active = false;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (
        ['Space', 'ShiftLeft'].includes(
          e.code
        )
      ) {
        isBoosting = false;
      }
    };

    /*
     * EVENT LISTENERS
     */
    container.addEventListener(
      'mousemove',
      onMouseMove
    );

    container.addEventListener(
      'touchmove',
      onTouchMove,
      {
        passive: false,
      }
    );

    container.addEventListener(
      'mousedown',
      onMouseDown
    );

    window.addEventListener(
      'mouseup',
      onMouseUp
    );

    container.addEventListener(
      'touchstart',
      onTouchStart
    );

    window.addEventListener(
      'touchend',
      onTouchEnd
    );

    window.addEventListener(
      'keydown',
      onKeyDown
    );

    window.addEventListener(
      'keyup',
      onKeyUp
    );

    /*
     * HEX GRID
     */
    const drawGrid = (t: number) => {
      ctx.save();

      ctx.strokeStyle =
        'rgba(0, 245, 212, 0.07)';

      ctx.lineWidth = 0.8;

      const hexR = 24;

      const hexH =
        hexR * Math.sqrt(3);

      const shiftX =
        (t *
          (isBoosting
            ? 1.4
            : 0.5)) %
        (hexR * 3);

      for (
        let x =
          -shiftX -
          hexR * 2;

        x <
        width +
          hexR * 2;

        x += hexR * 3
      ) {
        for (
          let y =
            -hexH;

          y <
          height +
            hexH * 2;

          y += hexH
        ) {
          ctx.beginPath();

          for (
            let i = 0;
            i < 6;
            i++
          ) {
            const angle =
              (Math.PI / 3) *
              i;

            const hx =
              x +
              hexR *
                Math.cos(
                  angle
                );

            const hy =
              y +
              hexR *
                Math.sin(
                  angle
                );

            if (i === 0) {
              ctx.moveTo(hx, hy);
            } else {
              ctx.lineTo(hx, hy);
            }
          }

          ctx.closePath();

          ctx.stroke();

          ctx.beginPath();

          for (
            let i = 0;
            i < 6;
            i++
          ) {
            const angle =
              (Math.PI / 3) *
              i;

            const hx =
              x +
              hexR * 1.5 +
              hexR *
                Math.cos(
                  angle
                );

            const hy =
              y +
              hexH * 0.5 +
              hexR *
                Math.sin(
                  angle
                );

            if (i === 0) {
              ctx.moveTo(hx, hy);
            } else {
              ctx.lineTo(hx, hy);
            }
          }

          ctx.closePath();

          ctx.stroke();
        }
      }

      ctx.restore();
    };

    /*
     * MAIN RENDER LOOP
     */
    const render = () => {
      frame++;

      /*
       * Clear canvas
       */
      ctx.fillStyle = '#07111a';

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      drawGrid(frame);

      /*
       * Boundary
       */
      ctx.strokeStyle =
        'rgba(255, 70, 85, 0.3)';

      ctx.lineWidth = 1;

      ctx.strokeRect(
        4,
        4,
        width - 8,
        height - 8
      );

      /*
       * ORBS
       */
      for (
        let i = 0;
        i < orbs.length;
        i++
      ) {
        const orb = orbs[i];

        if (
          !isPausedRef.current
        ) {
          orb.x += orb.vx;

          orb.y += orb.vy;

          orb.pulse += 0.05;
        }

        if (orb.x < 8) {
          orb.x = width - 8;
        }

        if (
          orb.x >
          width - 8
        ) {
          orb.x = 8;
        }

        if (orb.y < 8) {
          orb.y = height - 8;
        }

        if (
          orb.y >
          height - 8
        ) {
          orb.y = 8;
        }

        const currentR =
          orb.radius +
          Math.sin(
            orb.pulse
          ) *
            0.7;

        ctx.save();

        ctx.shadowBlur = 10;

        ctx.shadowColor =
          orb.color;

        ctx.fillStyle =
          orb.color;

        ctx.beginPath();

        ctx.arc(
          orb.x,
          orb.y,
          Math.max(
            1,
            currentR
          ),
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
      }

      /*
       * PLAYER STEERING
       */
      const boostActive =
        isBoosting ||
        mobileInput.boost;

      const currentSpeed =
        boostActive
          ? player.boostSpeed
          : player.baseSpeed;

      if (
        !isPausedRef.current
      ) {
        /*
         * MOBILE JOYSTICK
         */
        if (
          mobileInput.active
        ) {
          const targetAngle =
            Math.atan2(
              mobileInput.dy,
              mobileInput.dx
            );

          let diff =
            targetAngle -
            player.angle;

          while (
            diff < -Math.PI
          ) {
            diff +=
              Math.PI * 2;
          }

          while (
            diff > Math.PI
          ) {
            diff -=
              Math.PI * 2;
          }

          player.angle +=
            diff *
            (isBoosting
              ? 0.16
              : 0.13);
        }

        /*
         * MOUSE
         */
        else if (
          mouse.active
        ) {
          const targetAngle =
            Math.atan2(
              mouse.y -
                player.y,
              mouse.x -
                player.x
            );

          let diff =
            targetAngle -
            player.angle;

          while (
            diff < -Math.PI
          ) {
            diff +=
              Math.PI * 2;
          }

          while (
            diff > Math.PI
          ) {
            diff -=
              Math.PI * 2;
          }

          player.angle +=
            diff *
            (isBoosting
              ? 0.12
              : 0.08);
        }

        player.x +=
          Math.cos(
            player.angle
          ) *
          currentSpeed;

        player.y +=
          Math.sin(
            player.angle
          ) *
          currentSpeed;
      }

      /*
       * PLAYER BOUNDARY
       */
      const margin = 16;

      if (
        player.x < margin ||
        player.x >
          width - margin ||
        player.y < margin ||
        player.y >
          height - margin
      ) {
        emitSparks(
          player.x,
          player.y,
          player.color,
          35,
          3
        );

        addScorePopup(
          player.x,
          player.y - 20,
          `CRASHED! -200`,
          '#ffb2b7'
        );

        sounds.playShatter();

        setAlertText(
          'YOU CRASHED'
        );

        setAlertColor(
          '#ffb2b7'
        );

        setTimeout(() => {
          setAlertText(
            'TRAIL COLLISION'
          );
        }, 2600);

        localScore =
          Math.max(
            0,
            localScore - 200
          );

        setScore(
          Math.floor(
            localScore
          )
        );

        setBestToday(
          (prev) =>
            Math.max(
              prev,
              Math.floor(
                localScore
              )
            )
        );

        if (onScoreUpdate) {
          onScoreUpdate(
            Math.floor(
              localScore
            )
          );
        }

        player.x =
          width * 0.5;

        player.y =
          height * 0.6;

        player.angle =
          -Math.PI / 2;

        player.trail = [];

        isBoosting = false;

        mobileInput.boost =
          false;

        isPausedRef.current =
          true;

        setLastScore(
          Math.floor(
            localScore
          )
        );

        setShareAvailable(
          true
        );

        setShowDeathModal(
          true
        );

        setTimeout(() => {
          setShareAvailable(
            false
          );
        }, 15000);
      }

      /*
       * PLAYER TRAIL
       */
      if (
        !isPausedRef.current
      ) {
        player.trail.unshift({
          x: player.x,
          y: player.y,
        });

        if (
          player.trail.length >
          player.maxTrail
        ) {
          player.trail.pop();
        }
      }

      /*
       * BOOST
       */
      if (
        !isPausedRef.current &&
        boostActive
      ) {
        localScore =
          Math.max(
            10,
            localScore - 0.2
          );

        if (
          frame % 3 === 0
        ) {
          emitSparks(
            player.x,
            player.y,
            '#00f5d4',
            2,
            1.2
          );
        }
      }

      /*
       * ORB COLLECTION
       */
      for (
        let i =
          orbs.length - 1;
        i >= 0;
        i--
      ) {
        const orb =
          orbs[i];

        const dx =
          player.x -
          orb.x;

        const dy =
          player.y -
          orb.y;

        const dist =
          Math.hypot(
            dx,
            dy
          );

        if (
          dist <
          player.thickness +
            orb.radius +
            6
        ) {
          if (
            !isPausedRef.current
          ) {
            localScore +=
              orb.value;

            player.maxTrail =
              Math.min(
                80,
                player.maxTrail +
                  1
              );

            emitSparks(
              orb.x,
              orb.y,
              orb.color,
              8,
              1.2
            );

            addScorePopup(
              orb.x,
              orb.y - 10,
              `+${orb.value}`,
              orb.color
            );

            sounds.playOrbChime(
              orb.value
            );

            orbs[i] =
              createOrb();

            setScore(
              Math.floor(
                localScore
              )
            );

            setBestToday(
              (prev) =>
                Math.max(
                  prev,
                  Math.floor(
                    localScore
                  )
                )
            );

            if (onScoreUpdate) {
              onScoreUpdate(
                Math.floor(
                  localScore
                )
              );
            }
          }
        }
      }

      /*
       * BOTS
       */
      bots.forEach(
        (bot) => {
          if (
            isPausedRef.current
          ) {
            return;
          }

          let closestOrb:
            | Orb
            | null = null;

          let minDist = 180;

          for (
            let i = 0;
            i < orbs.length;
            i++
          ) {
            const d =
              Math.hypot(
                orbs[i].x -
                  bot.x,
                orbs[i].y -
                  bot.y
              );

            if (
              d < minDist
            ) {
              minDist = d;

              closestOrb =
                orbs[i];
            }
          }

          if (
            closestOrb
          ) {
            const targetAngle =
              Math.atan2(
                closestOrb.y -
                  bot.y,
                closestOrb.x -
                  bot.x
              );

            let diff =
              targetAngle -
              bot.angle;

            while (
              diff < -Math.PI
            ) {
              diff +=
                Math.PI * 2;
            }

            while (
              diff > Math.PI
            ) {
              diff -=
                Math.PI * 2;
            }

            bot.angle +=
              diff *
              bot.turnRate;
          } else {
            bot.angle +=
              (Math.random() -
                0.5) *
              0.08;
          }

          bot.x +=
            Math.cos(
              bot.angle
            ) *
            bot.speed;

          bot.y +=
            Math.sin(
              bot.angle
            ) *
            bot.speed;

          /*
           * BOT BOUNDARY
           */
          if (
            bot.x < 24 ||
            bot.x >
              width - 24 ||
            bot.y < 24 ||
            bot.y >
              height - 24
          ) {
            localKills += 1;

            localScore +=
              420;

            emitSparks(
              bot.x,
              bot.y,
              bot.color,
              35,
              3
            );

            addScorePopup(
              bot.x,
              bot.y - 20,
              `${bot.name} ELIMINATED! +420`,
              '#ffb2b7'
            );

            sounds.playShatter();

            setAlertText(
              `${bot.name} ELIMINATED`
            );

            setAlertColor(
              '#ffb2b7'
            );

            setTimeout(() => {
              setAlertText(
                'TRAIL COLLISION'
              );
            }, 2600);

            setKills(
              localKills
            );

            setScore(
              Math.floor(
                localScore
              )
            );

            setBestToday(
              (prev) =>
                Math.max(
                  prev,
                  Math.floor(
                    localScore
                  )
                )
            );

            if (
              onKillsUpdate
            ) {
              onKillsUpdate(
                localKills
              );
            }

            if (
              onScoreUpdate
            ) {
              onScoreUpdate(
                Math.floor(
                  localScore
                )
              );
            }

            bot.x =
              Math.random() *
                (width - 80) +
              40;

            bot.y =
              Math.random() *
                (height - 80) +
              40;

            bot.trail = [];
          }

          /*
           * BOT TRAIL
           */
          bot.trail.unshift({
            x: bot.x,
            y: bot.y,
          });

          if (
            bot.trail.length >
            bot.maxTrail
          ) {
            bot.trail.pop();
          }

          /*
           * BOT ORBS
           */
          for (
            let i =
              orbs.length - 1;
            i >= 0;
            i--
          ) {
            const d =
              Math.hypot(
                orbs[i].x -
                  bot.x,
                orbs[i].y -
                  bot.y
              );

            if (
              d <
              bot.thickness +
                orbs[i].radius +
                5
            ) {
              emitSparks(
                orbs[i].x,
                orbs[i].y,
                bot.color,
                4,
                0.8
              );

              orbs[i] =
                createOrb();
            }
          }

          /*
           * PLAYER CUTS BOT
           */
          for (
            let t = 6;
            t <
            player.trail.length;
            t++
          ) {
            const td =
              Math.hypot(
                player.trail[t].x -
                  bot.x,
                player.trail[t].y -
                  bot.y
              );

            if (
              td <
              player.thickness +
                5
            ) {
              localKills += 1;

              localScore +=
                420;

              emitSparks(
                bot.x,
                bot.y,
                bot.color,
                35,
                3
              );

              addScorePopup(
                bot.x,
                bot.y - 20,
                `${bot.name} SHATTERED! +420`,
                '#ffb2b7'
              );

              sounds.playShatter();

              setAlertText(
                `${bot.name} ELIMINATED`
              );

              setAlertColor(
                '#ffb2b7'
              );

              setTimeout(() => {
                setAlertText(
                  'TRAIL COLLISION'
                );
              }, 2600);

              setKills(
                localKills
              );

              setScore(
                Math.floor(
                  localScore
                )
              );

              setBestToday(
                (prev) =>
                  Math.max(
                    prev,
                    Math.floor(
                      localScore
                    )
                  )
              );

              if (
                onKillsUpdate
              ) {
                onKillsUpdate(
                  localKills
                );
              }

              if (
                onScoreUpdate
              ) {
                onScoreUpdate(
                  Math.floor(
                    localScore
                  )
                );
              }

              bot.x =
                Math.random() *
                  (width - 80) +
                40;

              bot.y =
                Math.random() *
                  (height - 80) +
                40;

              bot.trail = [];

              break;
            }
          }

          /*
           * BOT CUTS PLAYER
           */
          for (
            let t = 6;
            t <
            bot.trail.length;
            t++
          ) {
            const pd =
              Math.hypot(
                bot.trail[t].x -
                  player.x,
                bot.trail[t].y -
                  player.y
              );

            if (
              pd <
              player.thickness +
                5
            ) {
              emitSparks(
                player.x,
                player.y,
                player.color,
                35,
                3
              );

              addScorePopup(
                player.x,
                player.y - 20,
                `KILLED BY ${bot.name}`,
                '#ffb2b7'
              );

              sounds.playShatter();

              setAlertText(
                `KILLED BY ${bot.name}`
              );

              setAlertColor(
                '#ffb2b7'
              );

              setTimeout(() => {
                setAlertText(
                  'TRAIL COLLISION'
                );
              }, 2600);

              bot.score =
                (bot.score || 0) +
                420;

              localScore =
                Math.max(
                  0,
                  localScore - 200
                );

              setScore(
                Math.floor(
                  localScore
                )
              );

              setBestToday(
                (prev) =>
                  Math.max(
                    prev,
                    Math.floor(
                      localScore
                    )
                  )
              );

              if (
                onScoreUpdate
              ) {
                onScoreUpdate(
                  Math.floor(
                    localScore
                  )
                );
              }

              player.x =
                width * 0.5;

              player.y =
                height * 0.6;

              player.angle =
                -Math.PI / 2;

              player.trail = [];

              isBoosting = false;

              mobileInput.boost =
                false;

              isPausedRef.current =
                true;

              setLastScore(
                Math.floor(
                  localScore
                )
              );

              setShareAvailable(
                true
              );

              setShowDeathModal(
                true
              );

              setTimeout(() => {
                setShareAvailable(
                  false
                );
              }, 15000);

              break;
            }
          }
        }
      );

      /*
       * BOT TRAILS
       */
      bots.forEach((bot) => {
        if (
          bot.trail.length >
          2
        ) {
          ctx.save();

          ctx.lineCap = 'round';

          ctx.lineJoin = 'round';

          ctx.shadowBlur = 14;

          ctx.shadowColor =
            bot.color;

          ctx.strokeStyle =
            bot.color;

          ctx.lineWidth =
            bot.thickness;

          ctx.beginPath();

          ctx.moveTo(
            bot.trail[0].x,
            bot.trail[0].y
          );

          for (
            let i = 1;
            i <
            bot.trail.length;
            i++
          ) {
            ctx.lineTo(
              bot.trail[i].x,
              bot.trail[i].y
            );
          }

          ctx.stroke();

          /*
           * White core
           */
          ctx.shadowBlur = 4;

          ctx.shadowColor =
            '#ffffff';

          ctx.strokeStyle =
            bot.coreColor ||
            '#ffffff';

          ctx.lineWidth = 2.5;

          ctx.stroke();

          /*
           * Bot head
           */
          ctx.fillStyle =
            '#ffffff';

          ctx.beginPath();

          ctx.arc(
            bot.x,
            bot.y,
            5,
            0,
            Math.PI * 2
          );

          ctx.fill();

          /*
           * Bot name
           */
          ctx.shadowBlur = 0;

          ctx.fillStyle =
            bot.color;

          ctx.font =
            '700 10px "JetBrains Mono", monospace';

          ctx.fillText(
            bot.name,
            bot.x - 14,
            bot.y - 12
          );

          ctx.restore();
        }
      });

      /*
       * PLAYER TRAIL
       */
      if (
        player.trail.length >
        2
      ) {
        ctx.save();

        ctx.lineCap = 'round';

        ctx.lineJoin = 'round';

        ctx.shadowBlur =
          boostActive
            ? 26
            : 18;

        ctx.shadowColor =
          boostActive
            ? '#26fedc'
            : player.color;

        ctx.strokeStyle =
          player.color;

        ctx.lineWidth =
          boostActive
            ? player.thickness + 2
            : player.thickness;

        ctx.beginPath();

        ctx.moveTo(
          player.trail[0].x,
          player.trail[0].y
        );

        for (
          let i = 1;
          i <
          player.trail.length;
          i++
        ) {
          ctx.lineTo(
            player.trail[i].x,
            player.trail[i].y
          );
        }

        ctx.stroke();

        /*
         * White laser core
         */
        ctx.shadowBlur = 8;

        ctx.shadowColor =
          '#ffffff';

        ctx.strokeStyle =
          '#ffffff';

        ctx.lineWidth = 3;

        ctx.stroke();

        /*
         * Player head
         */
        ctx.shadowBlur =
          boostActive
            ? 20
            : 12;

        ctx.shadowColor =
          '#00f5d4';

        ctx.fillStyle =
          '#ffffff';

        ctx.beginPath();

        ctx.arc(
          player.x,
          player.y,
          boostActive
            ? 6.5
            : 5.5,
          0,
          Math.PI * 2
        );

        ctx.fill();

        /*
         * Callsign
         */
        ctx.shadowBlur = 0;

        ctx.fillStyle =
          '#00f5d4';

        ctx.font =
          '700 10px "JetBrains Mono", monospace';

        ctx.fillText(
          callsign ||
            'CYBER_GHOST',
          player.x - 18,
          player.y - 14
        );

        ctx.restore();
      }

      /*
       * PARTICLES
       */
      for (
        let i =
          particles.length - 1;
        i >= 0;
        i--
      ) {
        const p =
          particles[i];

        p.x += p.vx;

        p.y += p.vy;

        p.life -= p.decay;

        if (
          p.life <= 0
        ) {
          particles.splice(
            i,
            1
          );

          continue;
        }

        ctx.save();

        ctx.globalAlpha =
          p.life;

        ctx.fillStyle =
          p.color;

        ctx.shadowBlur = 8;

        ctx.shadowColor =
          p.color;

        ctx.beginPath();

        ctx.arc(
          p.x,
          p.y,
          p.size *
            p.life,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
      }

      /*
       * FLOATING TEXT
       */
      for (
        let i =
          floatingTexts.length - 1;
        i >= 0;
        i--
      ) {
        const ft =
          floatingTexts[i];

        ft.y -= 0.8;

        ft.life -= ft.decay;

        if (
          ft.life <= 0
        ) {
          floatingTexts.splice(
            i,
            1
          );

          continue;
        }

        ctx.save();

        ctx.globalAlpha =
          ft.life;

        ctx.font =
          '700 11px "JetBrains Mono", monospace';

        ctx.fillStyle =
          ft.color;

        ctx.shadowBlur = 8;

        ctx.shadowColor =
          ft.color;

        ctx.fillText(
          ft.text,
          ft.x - 10,
          ft.y
        );

        ctx.restore();
      }

      /*
       * ROSTER UPDATE
       */
      if (
        frame % 30 === 0 &&
        !isPausedRef.current
      ) {
        try {
          setRoster((prev) => {
            const botEntries =
              bots.map((b) => ({
                name: b.name,
                score: Math.floor(
                  b.score || 0
                ),
              }));

            const nonPlayerPrev =
              prev
                .filter(
                  (p) => !p.isPlayer
                )
                .map((p) => ({
                  name: p.name,
                  score: p.score,
                }));

            const filler =
              nonPlayerPrev.slice(
                botEntries.length
              );

            const playerEntry = {
              name:
                callsign ||
                'CYBER_GHOST',

              score: Math.floor(
                localScore
              ),

              isPlayer: true,
            };

            const combined = [
              ...botEntries,
              ...filler,
              playerEntry,
            ].slice(0, 6);

            return combined;
          });
        } catch {}
      }

      animFrameId =
        requestAnimationFrame(
          render
        );
    };

    animFrameId =
      requestAnimationFrame(
        render
      );

    /*
     * CLEANUP
     */
    return () => {
      cancelAnimationFrame(
        animFrameId
      );

      observer.disconnect();

      container.removeEventListener(
        'mousemove',
        onMouseMove
      );

      container.removeEventListener(
        'touchmove',
        onTouchMove
      );

      container.removeEventListener(
        'mousedown',
        onMouseDown
      );

      window.removeEventListener(
        'mouseup',
        onMouseUp
      );

      container.removeEventListener(
        'touchstart',
        onTouchStart
      );

      window.removeEventListener(
        'touchend',
        onTouchEnd
      );

      window.removeEventListener(
        'keydown',
        onKeyDown
      );

      window.removeEventListener(
        'keyup',
        onKeyUp
      );
    };
  }, [
    callsign,
    onKillsUpdate,
    onScoreUpdate,
  ]);

  return (
    <div
      ref={containerRef}
      className={`
        relative
        rounded-xl
        bg-[#07111a]
        border
        border-[#00f5d4]/40
        shadow-[0_0_30px_rgba(0,245,212,0.15),0_8px_40px_rgba(0,0,0,0.9)]
        ${isFullscreen ? 'overflow-visible' : 'overflow-hidden'}
        flex
        flex-col
        justify-between
        p-4
        select-none
        group/arena

        ${
          isFullscreen
            ? 'w-full h-full min-h-screen'
            : 'h-[min(78vh,620px)] min-h-[440px] sm:min-h-[500px] sm:h-[600px]'
        }
      `}
    >
      {/* =========================================================
          GAME CANVAS
      ========================================================== */}

      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          w-full
          h-full
          block
          cursor-crosshair
          z-0
        "
      />

      {/* =========================================================
          MOBILE CONTROLLER

          IMPORTANT:
          BOOST = LEFT
          JOYSTICK = RIGHT
      ========================================================== */}

      <div
        className={
          `absolute inset-x-0 z-30 pointer-events-none px-4 ${
            isFullscreen ? 'bottom-12 md:bottom-12' : 'bottom-0 md:bottom-2'
          }`
        }
        style={{
          paddingBottom: isFullscreen
            ? 'calc(48px + env(safe-area-inset-bottom))'
            : 'calc(18px + env(safe-area-inset-bottom))',
        }}
        aria-label="Mobile game controls"
      >
        <div
          className="
            relative
            w-full
            h-[104px]
          "
        >
          {/* =====================================================
              BOOST BUTTON - LEFT
          ====================================================== */}

          <button
            data-mobile-control="true"
            type="button"
            aria-label="Hold to boost"
            className="
              absolute
              left-0
              bottom-3

              w-[78px]
              h-[78px]

              rounded-full

              border
              border-[#f9bd22]/60

              bg-[#1b1913]/90

              text-[#ffdf9f]

              font-mono
              text-[10px]
              font-bold
              tracking-widest

              shadow-[0_0_20px_rgba(249,189,34,0.18)]

              active:scale-95
              active:bg-[#2b2216]

              touch-none
              select-none

              flex
              items-center
              justify-center

              z-40
            "
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();

              try {
                e.currentTarget.setPointerCapture(
                  e.pointerId
                );
              } catch {}

              if (
                !mobileInputRef
                  .current
                  .boost
              ) {
                sounds.playBoostSound();
              }

              mobileInputRef.current.boost =
                true;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              e.stopPropagation();

              mobileInputRef.current.boost =
                false;

              try {
                e.currentTarget.releasePointerCapture(
                  e.pointerId
                );
              } catch {}
            }}
            onPointerCancel={() => {
              mobileInputRef.current.boost =
                false;
            }}
          >
            BOOST
          </button>

          {/* =====================================================
              JOYSTICK - RIGHT
          ====================================================== */}

          <div
            data-mobile-control="true"
            className="
              absolute
              right-0
              bottom-0

              w-[104px]
              h-[104px]

              rounded-full

              border
              border-[#00f5d4]/35

              bg-[#07111a]/80

              backdrop-blur-sm

              shadow-[0_0_22px_rgba(0,245,212,0.12)]

              pointer-events-auto

              touch-none
              select-none

              z-40
            "
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();

              e.currentTarget.setPointerCapture(
                e.pointerId
              );

              const el =
                e.currentTarget;

              const r =
                el.getBoundingClientRect();

              const updateJoystick = (
                clientX: number,
                clientY: number
              ) => {
                const cx =
                  r.left +
                  r.width / 2;

                const cy =
                  r.top +
                  r.height / 2;

                const max =
                  r.width * 0.36;

                let dx =
                  clientX - cx;

                let dy =
                  clientY - cy;

                const len =
                  Math.hypot(
                    dx,
                    dy
                  ) || 1;

                const amount =
                  Math.min(
                    1,
                    len / max
                  );

                dx =
                  (dx / len) *
                  amount;

                dy =
                  (dy / len) *
                  amount;

                mobileInputRef.current.active =
                  amount > 0.05;

                mobileInputRef.current.dx =
                  dx;

                mobileInputRef.current.dy =
                  dy;
              };

              updateJoystick(
                e.clientX,
                e.clientY
              );

              setHintVisible(
                false
              );
            }}
            onPointerMove={(e) => {
              if (
                !e.currentTarget.hasPointerCapture(
                  e.pointerId
                )
              ) {
                return;
              }

              const r =
                e.currentTarget.getBoundingClientRect();

              const cx =
                r.left +
                r.width / 2;

              const cy =
                r.top +
                r.height / 2;

              const max =
                r.width * 0.36;

              let dx =
                e.clientX - cx;

              let dy =
                e.clientY - cy;

              const len =
                Math.hypot(
                  dx,
                  dy
                ) || 1;

              const amount =
                Math.min(
                  1,
                  len / max
                );

              dx =
                (dx / len) *
                amount;

              dy =
                (dy / len) *
                amount;

              mobileInputRef.current.active =
                amount > 0.05;

              mobileInputRef.current.dx =
                dx;

              mobileInputRef.current.dy =
                dy;
            }}
            onPointerUp={(e) => {
              e.preventDefault();

              mobileInputRef.current.active =
                false;

              mobileInputRef.current.dx =
                0;

              mobileInputRef.current.dy =
                -1;

              try {
                e.currentTarget.releasePointerCapture(
                  e.pointerId
                );
              } catch {}
            }}
            onPointerCancel={() => {
              mobileInputRef.current.active =
                false;

              mobileInputRef.current.dx =
                0;

              mobileInputRef.current.dy =
                -1;
            }}
          >
            {/* Outer ring */}
            <div
              className="
                absolute
                inset-2
                rounded-full
                border
                border-[#00f5d4]/15
              "
            />

            {/* Inner ring */}
            <div
              className="
                absolute
                inset-5
                rounded-full
                border
                border-[#00f5d4]/10
              "
            />

            {/* Center joystick */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2

                w-12
                h-12

                rounded-full

                border
                border-[#00f5d4]/70

                bg-[#0b2027]/95

                shadow-[0_0_14px_rgba(0,245,212,0.25)]

                flex
                items-center
                justify-center
              "
            >
              <span
                className="
                  text-[8px]
                  font-mono
                  tracking-widest
                  text-[#83948f]
                "
              >
                MOVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE CONTROL HINT
      ========================================================== */}

      {hintVisible && (
        <div
          className="
            absolute
            bottom-[125px]
            left-1/2
            -translate-x-1/2
            z-20
            pointer-events-none
            whitespace-nowrap
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              tracking-widest
              text-[#26fedc]
              uppercase
              px-2.5
              py-1
              rounded
              bg-[#080f18]/80
              border
              border-[#00f5d4]/25
            "
          >
            DRAG TO STEER · HOLD BOOST
          </span>
        </div>
      )}

      {/* =========================================================
          DEATH MODAL
      ========================================================== */}

      {showDeathModal && (
        <div
          className="
            absolute
            inset-0
            z-40

            flex
            items-center
            justify-center

            bg-black/40
          "
        >
          <div
            className="
              bg-[#0d1722]/95
              border
              border-[#00f5d4]/20
              rounded-lg
              p-6
              w-[320px]
              text-center

              shadow-[0_10px_30px_rgba(0,0,0,0.8)]
            "
          >
            <div
              className="
                font-mono
                text-[14px]
                font-bold
                text-[#ffb2b7]
              "
            >
              You Were Eliminated
            </div>

            <div
              className="
                font-mono
                text-[12px]
                text-[#dce3f0]
                mt-2
              "
            >
              Final Score:{' '}
              {lastScore?.toLocaleString() ||
                0}
            </div>

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <button
                onClick={
                  shareThenRestart
                }
                className="
                  px-4
                  py-2
                  rounded
                  bg-[#1d9bf0]/95
                  hover:bg-[#1290e8]
                  text-white
                  font-mono
                  text-[12px]
                "
              >
                Share on X
              </button>

              <button
                onClick={playAgain}
                className="
                  px-4
                  py-2
                  rounded
                  bg-[#00f5d4]/95
                  hover:bg-[#26fedc]
                  text-black
                  font-mono
                  text-[12px]
                "
              >
                Play Again
              </button>
            </div>

            <div
              className="
                text-[10px]
                text-[#83948f]
                mt-3
              "
            >
              Share will include your
              site and X handle.
            </div>
          </div>
        </div>
      )}


      {/* =========================================================
          TOP HUD
      ========================================================== */}

      <div
        className="
          relative
          z-10

          w-full

          flex
          items-start
          justify-between

          gap-4

          pointer-events-none
        "
      >
        {/* SCORE */}
        <div
          className="
            pointer-events-auto

            bg-[#0d1722]/90

            border
            border-[#00f5d4]/40

            rounded-lg

            p-2
            md:p-3

            shadow-[0_0_15px_rgba(0,245,212,0.15)]

            flex
            flex-col

            min-w-[100px]
            md:min-w-[130px]

            backdrop-blur-md
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              md:text-[9px]
              text-[#83948f]
              tracking-widest
              uppercase
            "
          >
            SCORE
          </span>

          <span
            className="
              font-mono
              text-[18px]
              md:text-[28px]
              leading-tight
              font-bold
              text-[#d7fff3]

              my-0.5

              tracking-tight

              drop-shadow-[0_0_8px_rgba(0,245,212,0.4)]
            "
          >
            {score.toLocaleString()}
          </span>

          <div
            className="
              flex
              items-center
              justify-between

              text-[9px]
              md:text-[10px]

              font-mono
              text-[#83948f]

              pt-1

              border-t
              border-[#3a4a46]/40

              mt-1
            "
          >
            <span>KILLS</span>

            <span
              className="
                text-[#dce3f0]
                font-bold
              "
            >
              {kills}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              justify-between

              text-[9px]
              md:text-[10px]

              font-mono

              text-[#83948f]

              mt-0.5
            "
          >
            <span>
              BEST TODAY
            </span>

            <span
              className="
                text-[#00f5d4]
                font-bold
              "
            >
              {bestToday.toLocaleString()}
            </span>
          </div>
        </div>

        {/* TOP RIGHT */}
        <div
          className="
            pointer-events-auto

            flex
            flex-col
            items-end

            gap-2
          "
        >
          {/* FULLSCREEN */}
          <div
            className="
              pointer-events-auto
            "
          >
            {onToggleFullscreen && (
              <button
                onClick={() => {
                  sounds.playBeep(600);

                  onToggleFullscreen();
                }}
                className="
                  text-[#83948f]
                  hover:text-[#00f5d4]

                  transition-colors

                  cursor-pointer

                  p-1

                  rounded

                  hover:bg-[#00f5d4]/10
                "
                title={
                  isFullscreen
                    ? 'Exit Fullscreen'
                    : 'Toggle Fullscreen Arena'
                }
              >
                {isFullscreen ? (
                  <Minimize2
                    className="
                      w-4
                      h-4
                    "
                  />
                ) : (
                  <Maximize2
                    className="
                      w-4
                      h-4
                    "
                  />
                )}
              </button>
            )}
          </div>

          {/* COLLISION ALERT */}
          <div
            className="
              hidden
              md:flex

              bg-[#26131c]/90

              border
              border-[#ffb2b7]/40

              rounded-full

              px-3
              py-1

              items-center
              gap-1.5

              shadow-[0_0_12px_rgba(255,178,183,0.25)]

              backdrop-blur-md
            "
            style={{
              borderColor:
                alertColor + '60',
            }}
          >
            <span
              className="
                w-2
                h-2
                rounded-full

                animate-pulse

                shadow-[0_0_6px_#ffb2b7]
              "
              style={{
                backgroundColor:
                  alertColor,
              }}
            />

            <span
              className="
                font-mono
                text-[9px]
                font-bold
                tracking-wider
                uppercase
              "
              style={{
                color: alertColor,
              }}
            >
              {alertText}
            </span>
          </div>

          {/* ROSTER */}
          <div
            className="
              hidden
              md:flex

              relative

              bg-[#0d1722]/90

              border
              border-[#00f5d4]/40

              rounded-lg

              p-3

              shadow-[0_0_15px_rgba(0,245,212,0.15)]

              min-w-[160px]

              flex-col

              backdrop-blur-md
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                text-[9px]

                font-mono
                text-[#83948f]

                uppercase

                pb-1
                mb-1

                border-b
                border-[#3a4a46]/40
              "
            >
              <span
                className="
                  tracking-wider
                "
              >
                LIVE MATCH
              </span>
            </div>

            <div
              className="
                flex
                flex-col
                gap-0.5

                font-mono
                text-[10px]
              "
            >
              {roster.map(
                (
                  item,
                  idx
                ) => (
                  <div
                    key={idx}
                    className={`
                      flex
                      items-center
                      justify-between

                      ${
                        item.isPlayer
                          ? 'text-[#00f5d4] font-bold pt-0.5 border-t border-[#3a4a46]/30'
                          : 'text-[#dce3f0]'
                      }
                    `}
                  >
                    <span>
                      <strong
                        className={
                          item.isPlayer
                            ? 'text-[#00f5d4] mr-1'
                            : 'text-[#83948f] mr-1'
                        }
                      >
                        {(
                          idx + 1
                        )
                          .toString()
                          .padStart(
                            2,
                            '0'
                          )}
                      </strong>{' '}
                      {item.name}
                    </span>

                    <span
                      className={
                        item.isPlayer
                          ? 'text-[#00f5d4]'
                          : 'text-[#00dfc1] font-bold'
                      }
                    >
                      {item.score}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};