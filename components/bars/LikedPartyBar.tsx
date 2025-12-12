import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function LikePartyBar() {
  return (
    <View className="px-5 items-end mt-1">
      <View
        className="px-6 py-2 rounded-t-2xl"
        style={{
          backgroundColor: colors.red,
        }}
      >
        <Ionicons name="heart" size={18} color={colors.white} />
      </View>

      <View
        className="h-[3px] w-full"
        style={{
          backgroundColor: colors.red,
        }}
      />
    </View>
  );
}