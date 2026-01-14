import React from "react";
import { View, Text } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type ShortToastProps = {
  message: string;
};

export default function ShortToast({ message }: ShortToastProps) {
  return (
    <View 
        className="absolute left-0 right-0 items-center"
        style={{
          position: "absolute",
          top: -10,
          zIndex: 9999,
          elevation: 9999,
      }}
    >
      <View className="px-4 py-2 rounded-lg bg-black/70">
        <Text style={[fonts.smallText, { color: colors.white }]}>
          {message}
        </Text>
      </View>
    </View>
  );
}