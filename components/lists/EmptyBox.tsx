import React from "react";
import { View, Text, Image } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type EmptyBoxProps = {
  message?: string;
};

export default function EmptyBox({message}: EmptyBoxProps) {
  return (
    <View
      className="items-center justify-center rounded-2xl py-8"
      style={{ backgroundColor: colors.lightGray }}
    >
      <Image 
        source={require("@/assets/images/empty-box.png")} 
        className="w-[60px] h-[60px] mb-4"
        resizeMode="contain"
      />

      <Text style={[fonts.mediumText, { color: colors.black }]}>
        {message}
      </Text>
    </View>
  );
}