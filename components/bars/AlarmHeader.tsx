import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

export default function AlarmHeader() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.white }}>
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text style={[fonts.smallTitle, { fontSize: 25, color: colors.black }]}>
            알림
        </Text>

        <TouchableOpacity onPress={router.back} hitSlop={10}>
          <Ionicons name="close" size={26} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View 
        className="h-[1px] opacity-40"
        style={{ backgroundColor: colors.darkGray }}
      />
    </SafeAreaView>
  );
}