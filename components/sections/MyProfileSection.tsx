import React from "react";
import { View, Text, Image } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

import { profileImages } from "@/utils/profileImgMapper";
import { member } from "@/mocks/member";

export default function MyProfileSection() {
  return (
    <View>
      <View className="flex-row items-center px-6 pt-10">
        <View
          className="items-center justify-center ml-6"
        >
          <Image
            source={profileImages[member.profileImage]}
            className="w-[110px] h-[110px]"
            resizeMode="contain"
          />
        </View>

        <View className="ml-9 mt-1">
          <Text
            style={[
              fonts.smallTitle,
              { fontSize: 30, color: colors.orange },
            ]}
          >
            {member.nickname}
          </Text>

          <View className="flex-row items-center mt-3">
            <Text style={[fonts.mediumText, { color: colors.black }]}>
              {member.birthYear}년생
            </Text>
            <Text style={[fonts.mediumText, { color: colors.black }]}>
              {"  ·  "}
            </Text>
            <Text style={[fonts.mediumText, { color: colors.black }]}>
              {member.gender === "MALE" ? "남성" : "여성"}
            </Text>
          </View>
        </View>
      </View>

      <View
        className="mx-6 mt-8 h-[3px]"
        style={{ backgroundColor: colors.orange }}
      />
    </View>
  );
}