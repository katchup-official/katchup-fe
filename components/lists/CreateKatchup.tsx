import React from "react";
import { View, Text, Image } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type CreateKatchupProps = {
  message?: string;
};

export default function CreateKatchup({message}: CreateKatchupProps) {
  return (
    <View
      className="items-center justify-center rounded-2xl py-8"
      style={{ backgroundColor: colors.white, marginTop: 120 }}
    >
      <Image 
        source={require("@/assets/images/sauce.png")} 
        className="w-[110px] h-[110px] mb-10"
        resizeMode="contain"
      />

      <Text style={[fonts.mediumText, { color: colors.black }]}>
        {message}
      </Text>
    </View>
  );
}