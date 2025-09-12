import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, LayoutRectangle, Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

import { confettiColors } from "@/constants/colors";

type ShotOpts = {
  particleRatio: number;
  startVelocity?: number;
  fallSpeed?: number;
  spread?: number;
  delay: number;
}; 

type Props = {
  fire?: boolean;
  targetRect?: LayoutRectangle | null;
  colors?: string[];
  baseCount?: number;
  sequence?: ShotOpts[];
  rain?: boolean;
  onComplete?: () => void;
  originOverride?: { x: number; y: number };
};

const { width: SCREEN_W } = Dimensions.get("window");

const REALISTIC_DEFAULTS: ShotOpts[] = [
  { delay: 0,   particleRatio: 0.25, startVelocity: 55, fallSpeed: 3600, spread: 20 },
  { delay: 80,  particleRatio: 0.20, startVelocity: 45, fallSpeed: 3800, spread: 30 },
  { delay: 160, particleRatio: 0.35, startVelocity: 50, fallSpeed: 4000, spread: 40 },
  { delay: 240, particleRatio: 0.10, startVelocity: 60, fallSpeed: 3600, spread: 20 },
  { delay: 320, particleRatio: 0.10, startVelocity: 35, fallSpeed: 4200, spread: 24 },
];

const RAIN_DEFAULTS: ShotOpts[] = [
  { delay: 0,   particleRatio: 0.60, startVelocity: 8,  fallSpeed: 4200, spread: 40 },
  { delay: 150, particleRatio: 0.30, startVelocity: 10, fallSpeed: 4400, spread: 30 },
  { delay: 300, particleRatio: 0.20, startVelocity: 8,  fallSpeed: 4600, spread: 20 },
];

export default function GreetingConfetti({
  fire = false,
  targetRect = null,
  colors = confettiColors,
  baseCount = 160,
  sequence,
  rain = true,
  onComplete,
  originOverride,
}: Props) {
    const [keys, setKeys] = useState<number[]>([]);
    const refs = useRef<any[]>([]);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const prevFire = useRef(false);

    const shots = useMemo<ShotOpts[]>(() => {
    if (sequence?.length) return sequence;
    return rain ? RAIN_DEFAULTS : REALISTIC_DEFAULTS;
  }, [sequence, rain]);

  const { originX, originY } = useMemo(() => {
  if (originOverride) {
    return { originX: originOverride.x, originY: originOverride.y };
  }
  if (targetRect) {
    return {
      originX: targetRect.x + targetRect.width / 2,
      originY: Math.max(1, targetRect.y - 40),
    };
  }
  return { originX: SCREEN_W * 0.5, originY: 12 };
}, [originOverride, targetRect]);

  useEffect(() => {
    const risingEdge = fire && !prevFire.current;
    prevFire.current = fire;

    timers.current.forEach(clearTimeout);
    timers.current = [];
    setKeys([]);

    if (!risingEdge) return;

    setKeys(shots.map((_, i) => i));

    const kickoff = setTimeout(() => {
      shots.forEach((shot, idx) => {
        const t = setTimeout(() => {
          refs.current[idx]?.start?.();
          if (idx === shots.length - 1 && onComplete) {
            setTimeout(onComplete, 1000);
          }
        }, shot.delay);
        timers.current.push(t);
      });
    }, 16);
    timers.current.push(kickoff);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [fire, shots, onComplete]);

  return (
    <View pointerEvents="none" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      {keys.map((k, i) => {
        const { particleRatio, startVelocity = 8, fallSpeed = 4400, spread = 30 } = shots[i];
        const jitterPx = Math.min(60, spread * 1.5);
        const jitterDir = Math.random() < 0.5 ? -1 : 1;
        const clampedX = originX + jitterDir * (jitterPx * 0.5);
        const count = Math.max(4, Math.floor(baseCount * particleRatio));

        return (
          <ConfettiCannon
            key={`shot-${k}`}
            ref={(r: any) => (refs.current[i] = r)}
            autoStart={false}
            fadeOut
            count={count}
            colors={colors}
            explosionSpeed={startVelocity}
            fallSpeed={fallSpeed}
            origin={{ x: clampedX, y: originY }}
          />
        );
      })}
    </View>
  );
}