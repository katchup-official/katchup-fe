import React from "react";
import { Platform, View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <View 
      className="absolute inset-0 items-center justify-center"
      pointerEvents="auto"
    >
      <View className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
      <View className="w-[160px] h-[160px] items-center justify-center rounded-3xl bg-white">
        {Platform.OS === "web" ? (
          <Text>불러오는 중...</Text>
        ) : (
          <LottieView
            source={require("@/assets/lottie/katchup-loading.json")}
            autoPlay
            loop
            style={{ width: 120, height: 120 }}
          />
        )}
        <Text className="mt-2">불러오는 중...</Text>
      </View>
    </View>
  );
}