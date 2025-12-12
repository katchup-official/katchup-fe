import React from "react";
import { View, Text } from "react-native";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";

interface PartyListTitleProps {
  title: string;
}

export default function PartyListTitle({ title }: PartyListTitleProps) {
  return (
    <View className="px-5 mt-6 mb-0">
      <Text
        style={[
          fonts.mediumText,
          { fontSize: 21, color: colors.black }
        ]}
      >
        {title}
      </Text>
    </View>
  );
}