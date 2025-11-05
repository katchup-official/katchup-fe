import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Image,
  InteractionManager,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import GreetingTitle from "@/components/titles/GreetingTitle";
import SignupButton from "@/components/buttons/SignupButton";
import GreetingConfetti from "@/components/confetti/GreetingConfetti";

import { colors, confettiColors } from "@/constants/colors";
import { withAlpha } from "@/utils/color";

const LOGO2 = require("@/assets/images/katchup-logo2.png");

const MASK_HEIGHT = 110;
const MASK_SHOW_MS = 1000;
const MASK_FADE_MS = 220;

export default function GreetingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [afterInteraction, setAfterInteraction] = useState(false);
  const [clipSize, setClipSize] = useState<{ width: number; height: number } | null>(null);
  const [fire, setFire] = useState(false);
  const hasFired = useRef(false);

  const maskOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setAfterInteraction(true);
    });
    return () => task.cancel();
  }, []);

  useEffect(() => {
    if (!afterInteraction || hasFired.current) return;
    hasFired.current = true;
    setFire(true);
    const t = setTimeout(() => {
      Animated.timing(maskOpacity, {
        toValue: 0,
        duration: MASK_FADE_MS,
        useNativeDriver: true,
      }).start();
    }, MASK_SHOW_MS);
    return () => clearTimeout(t);
  }, [afterInteraction]);

  const CLIP_LEFT = 16;
  const CLIP_RIGHT = 16;
  const CLIP_TOP = Math.max(insets.top, 10);
  const CLIP_BOTTOM = 56 + Math.max(insets.bottom, 24) + 12;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Image
          source={LOGO2}
          className="w-60 h-60 mt-10"
          resizeMode="contain"
        />
      <GreetingTitle />
      </View>

        <SignupButton
        label="시작하기"
        onPress={() => router.push("/mainTabs")} 
        containerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
      />

      <View
        pointerEvents="none"
        className="rounded-3xl overflow-hidden z-10"
        style={[
          StyleSheet.absoluteFillObject,
          {
            left: CLIP_LEFT,
            right: CLIP_RIGHT,
            top: CLIP_TOP,
            bottom: CLIP_BOTTOM,
          },
        ]}
        onLayout={(e) =>
          setClipSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          })
        }
      >
        {clipSize && (
          <>
          <GreetingConfetti
            fire={fire}
            colors={confettiColors}
            originOverride={{
              x: clipSize.width / 2,
              y: Math.max(12, clipSize.height * 0.18),
            }}
          />

          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 50,
              height: MASK_HEIGHT,
              backgroundColor: colors.white,
              opacity: maskOpacity,
            }}
          />

          <LinearGradient
              pointerEvents="none"
              colors={[
                withAlpha(colors.white, 0),
                withAlpha(colors.white, 0.6),
                colors.white,
              ]}
              locations={[0, 0.6, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 110,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
              }}
            />
        </>
      )}
      </View>
    </View>
  );
}