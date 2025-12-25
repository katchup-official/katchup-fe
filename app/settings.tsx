import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

import { memberLogout, memberWithdrawal } from "@/apis/logoutApi";

export default function SettingsScreen() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "로그아웃",
          style: "destructive",
          onPress: async () => {
            if (isProcessing) return;
            setIsProcessing(true);
            try {
              await memberLogout();
              Alert.alert("완료", "로그아웃 되었습니다!", [
                { text: "확인", 
                  onPress: () => {
                    setIsProcessing(false);
                    router.replace("/signup/login");
                  },
                },
              ]);
              return;
            } catch {
              Alert.alert("실패", "로그아웃에 실패했습니다.\n잠시 후 다시 시도해주세요.");
            }
            setIsProcessing(false);
          },
        },
      ]
    );
  };

  const handleWithdrawal = () => {
    Alert.alert(
      "회원탈퇴",
      "회원탈퇴 시 정보를 복구할 수 없습니다.\n탈퇴하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "탈퇴하기",
          style: "destructive",
          onPress: async () => {
            if (isProcessing) return;
            setIsProcessing(true);
            try {
              await memberWithdrawal();
              Alert.alert("완료", "회원탈퇴 되었습니다!", [
                { text: "확인",
                  onPress: () => {
                    setIsProcessing(false);
                    router.replace("/signup/login");
                  },
                },
              ]);
            } catch {
              Alert.alert("실패", "회원탈퇴에 실패했습니다.\n잠시 후 다시 시도해주세요.");
            }
              setIsProcessing(false);
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
          disabled={isProcessing}
          style={{ opacity: isProcessing ? 0.5 : 1 }}
        >
          <Ionicons name="chevron-back" size={30} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View className="px-10 mt-10 pl-16">
        <TouchableOpacity
          activeOpacity={0.6}
          className="py-4"
          onPress={handleLogout}
          disabled={isProcessing}
          style={{ opacity: isProcessing ? 0.5 : 1 }}
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
          disabled={isProcessing}
          style={{ opacity: isProcessing ? 0.5 : 1 }}
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