import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

interface CreatePartyButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export default function CreatePartyButton({
  onPress,
  disabled = false,
}: CreatePartyButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      className="py-4 rounded-xl"
      style={{
        backgroundColor: disabled ? colors.gray : colors.orange,
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? 0.6 : 1,
      }}
      onPress={onPress}
    >
      <Text
        style={[
          fonts.mediumText,
          { color: "#fff", fontSize: 16 },
        ]}
      >
        생성하기
      </Text>
    </TouchableOpacity>
  );
}