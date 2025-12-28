import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { colors, reviewColors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type ReviewMemberListButtonProps = {
  partyId: number;
  onClose?: () => void;
};

export default function ReviewMemberListButton({ partyId, onClose }: ReviewMemberListButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center justify-center h-12 rounded-xl mb-3"
      style={{ backgroundColor: reviewColors.primary }}
      onPress={() => {
        onClose?.();
        router.push({
          pathname: "/review/member-list",
          params: { partyId },
        });
      }}
    >
      <Ionicons name="happy-outline" size={22} color={colors.white} />
      <Text style={[fonts.mediumText, { color: colors.white, marginLeft: 8 }]}>
        파티원 평가
      </Text>
    </TouchableOpacity>
  );
}