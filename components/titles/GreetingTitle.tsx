import React from "react";
import { View, Text, Image } from "react-native";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";

const LOGO3 = require("@/assets/images/katchup-logo3.png");

export default function GreetingTitle() {
  return (
    <View className="w-5/6 mt-10 items-center">
      <View className="flex-row items-center justify-center">
        <Image
          source={LOGO3}
          className="w-[130px] h-10 mr-1.5"
          resizeMode="contain"
        />
        <Text 
          style={[fonts.mediumTitle, { color: colors.black }]} 
          className="text-center">
          가입을 축하드려요
        </Text>
      </View>

      <Text
        style={[fonts.smallText, { color: colors.darkGray, fontSize: 22 }]} 
        className="mt-2 text-center"
      >
        동행을 함께 시작해 보아요
      </Text>
    </View>
  );
}