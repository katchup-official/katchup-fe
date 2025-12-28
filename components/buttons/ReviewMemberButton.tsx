import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors, reviewColors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type ReviewMemberButtonProps = {
  isDone: boolean;
  onPress?: () => void;
};

export default function ReviewMemberButton({ isDone, onPress }: ReviewMemberButtonProps) {
  const bg = isDone ? reviewColors.disabled : reviewColors.button;
  const label = isDone ? "평가 완료" : "평가하기";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={isDone}
      onPress={onPress}
      className="px-6 py-3 rounded-2xl"
      style={{ backgroundColor: bg }}
    >
      <Text style={[fonts.smallTitle, { color: colors.white, fontSize: 16 }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}