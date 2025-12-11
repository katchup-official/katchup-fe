import React,  { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import ShortToast from "../toasts/ShortToast";

type PartyChatLinkButtonProps = {
  chatUrl: string;
};

export default function PartyChatLinkButton({ chatUrl }: PartyChatLinkButtonProps) {
    const [showToast, setShowToast] = useState(false);
    const handleCopy = async () => {
    await Clipboard.setStringAsync(chatUrl);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <View className="mb-6">
      <Text
        className="mb-2"
        style={[fonts.mediumText, { fontSize: 15, color: colors.black, }]}
      >
        오카방 링크
      </Text>

      <View className="flex-row items-center">
        <View className="flex-1 mr-3">
          <View
            className="rounded-xl px-3 flex-row items-center"
            style={{
              borderWidth: 1,
              borderColor: colors.yellow,
              height: 44,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[fonts.smallText, { color: colors.black }]}
            >
              {chatUrl}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-11 h-11 rounded-2xl items-center justify-center"
          style={{ backgroundColor: colors.yellow }}
          onPress={handleCopy}
        >
          <Ionicons name="copy-outline" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

    {showToast && (
    <View className="absolute -bottom-3 left-0 right-0 items-center">
        <ShortToast message="복사되었습니다." />
    </View>
    )}

    </View>
  );
}