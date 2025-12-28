import React from "react";
import { View, Text } from "react-native";
import { colors, reviewColors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

export default function ReviewMemberHeader() {
  return (
    <View className="px-5 mt-4">
      <View className="flex-row items-end">
        <View
          className="px-4 py-2"
          style={{
            backgroundColor: reviewColors.primary,
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
          }}
        >
          <Text style={[fonts.smallTitle, { color: colors.white, fontSize: 18 }]}>
            파티원 평가
          </Text>
        </View>

        <View
          className="flex-1"
          style={{ height: 3, backgroundColor: reviewColors.primary }}
        />
      </View>
    </View>
  );
}