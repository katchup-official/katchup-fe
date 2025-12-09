import React from "react";
import { View, Text } from "react-native";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";

export default function PartyListTitle() {
  return (
    <View className="px-5 mt-6 mb-0">
      <Text
        style={[
          fonts.mediumText,
          { fontSize: 26, color: colors.black }
        ]}
      >
        파티 목록
      </Text>
    </View>
  );
}