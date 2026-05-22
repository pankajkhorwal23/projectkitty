import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Calendar, Heart, RefreshCw, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "../components/Button";
import { ThemeModeSwitch } from "../components/ThemeModeSwitch";
import styles from "./_index.module.css";

const DEPARTURE_TIME = new Date("2026-05-27T06:10:00");
const ARRIVAL_TIME = new Date("2026-05-27T09:00:00");

let audioCtx: AudioContext | null = null;

const playTick = () => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.04);

    gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (error) {
    console.warn("AudioContext error:", error);
  }
};

type TimeMode = "real" | "waiting_sad" | "waiting_happy" | "flight" | "landed";

type Decoration = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  type: "heart" | "star";
};

export default function LandingPage() {
  const [timeMode, setTimeMode] = useState<TimeMode>("real");
  const [now, setNow] = useState<Date>(new Date());
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [decorations, setDecorations] = useState<Decoration[]>([]);

  const pathRef = useRef<SVGPathElement>(null);
  const [planePos, setPlanePos] = useState({ x: 900, y: 350, angle: -15 });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let currentSimulatedTime = new Date();

      if (timeMode === "waiting_sad") {
        currentSimulatedTime = new Date(DEPARTURE_TIME.getTime() - 28 * 24 * 60 * 60 * 1000);
      } else if (timeMode === "waiting_happy") {
        currentSimulatedTime = new Date(DEPARTURE_TIME.getTime() - 1 * 60 * 60 * 1000);
      } else if (timeMode === "flight") {
        currentSimulatedTime = new Date(DEPARTURE_TIME.getTime() + 1.5 * 60 * 60 * 1000);
      } else if (timeMode === "landed") {
        currentSimulatedTime = new Date(ARRIVAL_TIME.getTime() + 1000);
      }

      setNow(currentSimulatedTime);

      if (!isMuted) {
        playTick();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeMode, isMuted]);

  useEffect(() => {
    const items = Array.from({ length: 15 }).map((_, index) => ({
      id: index,
      left: Math.random() * 90,
      top: 60 + Math.random() * 30,
      size: 15 + Math.random() * 20,
      delay: Math.random() * 8,
      type: Math.random() > 0.5 ? ("heart" as const) : ("star" as const)
    }));
    setDecorations(items);
  }, []);

  const timeToDeparture = DEPARTURE_TIME.getTime() - now.getTime();
  const timeToArrival = ARRIVAL_TIME.getTime() - now.getTime();

  const isFlightMode = now >= DEPARTURE_TIME && now < ARRIVAL_TIME;
  const isLanded = now >= ARRIVAL_TIME;

  const maxSadWindow = 30 * 24 * 60 * 60 * 1000;
  let happiness = 1;
  if (timeToDeparture > 0) {
    happiness = timeToDeparture >= maxSadWindow ? 0 : 1 - timeToDeparture / maxSadWindow;
  }

  useEffect(() => {
    if (isFlightMode && pathRef.current && pathLength > 0) {
      const totalFlightDuration = ARRIVAL_TIME.getTime() - DEPARTURE_TIME.getTime();
      const elapsed = now.getTime() - DEPARTURE_TIME.getTime();
      const progress = Math.min(1, Math.max(0, elapsed / totalFlightDuration));
      const pathProgress = 1 - progress;
      const point = pathRef.current.getPointAtLength(pathProgress * pathLength);

      const delta = 2;
      const progressAhead = Math.max(0, pathProgress - delta / pathLength);
      const pointAhead = pathRef.current.getPointAtLength(progressAhead * pathLength);
      const angle = Math.atan2(pointAhead.y - point.y, pointAhead.x - point.x) * (180 / Math.PI);

      setPlanePos({ x: point.x, y: point.y, angle: angle + 180 });
    }
  }, [isFlightMode, now, pathLength]);

  const totalSecondsRemaining = Math.max(0, Math.floor(timeToArrival / 1000));
  const days = Math.floor(totalSecondsRemaining / (24 * 3600));
  const hours = Math.floor((totalSecondsRemaining % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
  const seconds = totalSecondsRemaining % 60;

  return (
    <div className={styles.appContainer}>
      <Helmet>
        <title>Chibi Flight Countdown ✈️💕</title>
        <meta name="description" content="A gorgeous storybook-themed countdown till meeting time!" />
      </Helmet>

      <div className={styles.decorationLayer}>
        {decorations.map((dec) => (
          <div
            key={dec.id}
            className={`${styles.floatingDec} ${dec.type === "heart" ? styles.heart : styles.star}`}
            style={{
              left: `${dec.left}%`,
              top: `${dec.top}%`,
              width: `${dec.size}px`,
              height: `${dec.size}px`,
              animationDelay: `${dec.delay}s`,
              opacity: isLanded ? 0.9 : 0.4
            }}
          >
            {dec.type === "heart" ? <Heart fill="currentColor" /> : <Sparkles />}
          </div>
        ))}
      </div>

      <header className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.heartPulse}>💕</span>
          <h1 className={styles.appTitle}>Flight Tracker</h1>
        </div>

        <div className={styles.controlHeader}>
          <Button
            variant="outline"
            className={`${styles.muteButton} ${!isMuted ? styles.pulseBorder : ""}`}
            onClick={() => {
              setIsMuted(!isMuted);
              if (isMuted) playTick();
            }}
          >
            {isMuted ? (
              <>
                <VolumeX size={16} />
                <span>Muted</span>
              </>
            ) : (
              <>
                <Volume2 size={16} className={styles.audioWave} />
                <span>Soft Tick</span>
              </>
            )}
          </Button>
          <ThemeModeSwitch />
        </div>
      </header>

      <main className={styles.skyArena}>
        <div className={styles.introBanner}>
          <p className={styles.introText}>
            {isLanded
              ? "The wait is over! Together at last! 💕"
              : isFlightMode
                ? "He is in the air right now! ✈️ Heading home..."
                : "Counting down to when we're together... 💕"}
          </p>
          <div className={styles.targetBadge}>
            <Calendar size={14} />
            <span>Target Arrival: May 27, 2026 at 9:00 AM</span>
          </div>
        </div>

        <div className={styles.mainTrack}>
          <div className={styles.actorContainerLeft}>
            <div className={styles.kittyWrapper}>
              <img
                src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/48c8bfcc-972b-40af-b3ac-fb014035ac04.png"
                alt="Female Kitty"
                className={`${styles.kittyImage} ${isLanded ? styles.bouncingKitty : ""}`}
                style={{
                  filter: `grayscale(${Math.max(0, 1 - happiness)}) contrast(${0.9 + happiness * 0.1}) brightness(${0.95 + happiness * 0.05})`,
                  transform: isLanded ? "scale(1.1) scaleX(-1)" : "scaleX(-1)"
                }}
              />
            </div>

            <div className={styles.airportWrapper}>
              <img
                src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/80de626a-f746-4cb9-9c68-add1b5583100.png"
                alt="Airport Terminal"
                className={styles.airportImage}
              />
              {isLanded && (
                <div className={styles.arrivedGroup}>
                  <img
                    src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/cd16e5f0-4f15-4014-80fa-0ae101cc4e1b.png"
                    alt="Male Kitty Arrived"
                    className={`${styles.kittyImageSmall} ${styles.wiggleCelebration}`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.flightSvgContainer}>
            <svg viewBox="0 0 1000 400" className={styles.flightSvg}>
              <path
                ref={pathRef}
                id="flightPath"
                d="M 160 310 Q 500 40 840 310"
                fill="none"
                stroke="var(--flight-path-color)"
                strokeWidth="4"
                strokeDasharray="8,10"
                strokeLinecap="round"
              />

              {isFlightMode && (
                <g transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planePos.angle})`}>
                  <image
                    href="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/9f999e37-1eab-41cd-a3f8-5a1811b2a909.png"
                    x="-60"
                    y="-60"
                    width="120"
                    height="120"
                    className={styles.airplaneFlying}
                  />
                </g>
              )}
            </svg>
          </div>

          <div className={styles.actorContainerRight}>
            {!isLanded && (
              <>
                <div className={`${styles.kittyWrapper} ${isFlightMode ? styles.fadeDeparted : ""}`}>
                  <img
                    src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/cd16e5f0-4f15-4014-80fa-0ae101cc4e1b.png"
                    alt="Male Kitty"
                    className={styles.kittyImage}
                  />
                </div>

                {!isFlightMode && (
                  <div className={styles.waitingAirplane}>
                    <img
                      src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/9f999e37-1eab-41cd-a3f8-5a1811b2a909.png"
                      alt="Waiting Airplane"
                      className={styles.airplaneImageWaiting}
                    />
                    <div className={styles.statusPill}>Boarding Soon</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.countdownContainer}>
          {isLanded ? (
            <div className={styles.celebrationCard}>
              <div className={styles.celebrationBanner}>
                <Sparkles className={styles.spinIcon} />
                <h2>✨ He&apos;s Here! We are Together! ✨</h2>
                <Sparkles className={styles.spinIcon} />
              </div>
              <p>Arrived on May 27, 2026!</p>
            </div>
          ) : (
            <div className={styles.timerCard}>
              <div className={styles.countdownGrid}>
                <div className={styles.timerUnit}>
                  <div className={`${styles.numberBox} ${styles.tickPulse}`}>{String(days).padStart(2, "0")}</div>
                  <span className={styles.unitLabel}>Days</span>
                </div>
                <span className={styles.divider}>:</span>
                <div className={styles.timerUnit}>
                  <div className={`${styles.numberBox} ${styles.tickPulse}`}>{String(hours).padStart(2, "0")}</div>
                  <span className={styles.unitLabel}>Hours</span>
                </div>
                <span className={styles.divider}>:</span>
                <div className={styles.timerUnit}>
                  <div className={`${styles.numberBox} ${styles.tickPulse}`}>{String(minutes).padStart(2, "0")}</div>
                  <span className={styles.unitLabel}>Minutes</span>
                </div>
                <span className={styles.divider}>:</span>
                <div className={styles.timerUnit}>
                  <div className={`${styles.numberBox} ${styles.tickPulse}`}>{String(seconds).padStart(2, "0")}</div>
                  <span className={styles.unitLabel}>Seconds</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.timeMachineDrawer}>
        <div className={styles.sandboxLabel}>
          <RefreshCw size={14} className={styles.spinIcon} />
          <span>Simulation Time Machine:</span>
        </div>
        <div className={styles.sandboxControls}>
          <Button variant={timeMode === "real" ? "primary" : "outline"} size="sm" onClick={() => setTimeMode("real")}>
            Real Time (2026 Target)
          </Button>
          <Button variant={timeMode === "waiting_sad" ? "primary" : "outline"} size="sm" onClick={() => setTimeMode("waiting_sad")}>
            Sad (30 Days Away)
          </Button>
          <Button variant={timeMode === "waiting_happy" ? "primary" : "outline"} size="sm" onClick={() => setTimeMode("waiting_happy")}>
            Happy (1 Hour Away)
          </Button>
          <Button variant={timeMode === "flight" ? "primary" : "outline"} size="sm" onClick={() => setTimeMode("flight")}>
            Flight Mode (In progress)
          </Button>
          <Button variant={timeMode === "landed" ? "primary" : "outline"} size="sm" onClick={() => setTimeMode("landed")}>
            Landed (Celebration!)
          </Button>
        </div>
      </footer>
    </div>
  );
}
