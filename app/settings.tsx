import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

import { memberLogout, memberWithdrawal } from "@/apis/logoutApi";

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말 로그아웃 하시겠어요?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "로그아웃",
          style: "destructive",
          onPress: async () => {
            try {
              await memberLogout();
            } finally {
              router.replace("/login");
            }
          },
        },
      ]
    );
  };

  const handleWithdrawal = () => {
    Alert.alert(
      "회원탈퇴",
      "회원탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.\n정말 탈퇴하시겠어요?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "탈퇴하기",
          style: "destructive",
          onPress: async () => {
            try {
              await memberWithdrawal();
            } finally {
              router.replace("/login");
            }
          },
        },
      ]
    );
  };

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
          onPress={handleLogout}
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
          onPress={handleWithdrawal}
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