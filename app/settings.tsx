import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-14 mt-5">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="w-[40px] h-[40px] justify-center"
        >
          <Ionicons name="chevron-back" size={30} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View className="px-10 mt-10 pl-16">
        <TouchableOpacity
          activeOpacity={0.6}
          className="py-4"
          onPress={() => {
          }}
        >
          <Text
            style={[
              fonts.mediumText,
              { color: colors.black, fontSize: 20 },
            ]}
          >
            로그아웃
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          activeOpacity={0.6}
          className="py-3 mt-4"
          onPress={() => {
          }}
        >
          <Text
            style={[
              fonts.mediumText,
              { color: colors.black, fontSize: 20 },
            ]}
          >
            회원탈퇴
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}