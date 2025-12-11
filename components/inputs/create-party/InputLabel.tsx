import React from "react";
import { Text } from "react-native";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";

type LabelProps = {
  children: string;
  style?: object;
};

export default function Label({ children, style }: LabelProps) {
  return (
    <Text
      style={[
        fonts.mediumText,
        { color: colors.black, marginBottom: 6, fontSize: 17 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}