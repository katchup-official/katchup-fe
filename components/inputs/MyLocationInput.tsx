import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type MyLocationInputProps = {
  value: string;
  onSearch: () => void;
};

export default function MyLocationInput({
  value,
  onSearch,
}: MyLocationInputProps) {
  return (
    <View className="px-6 mt-6">
      <View className="flex-row items-center">
        <View
          className="flex-1 rounded-md px-4 py-5 mr-3"
          style={{
            borderWidth: 1,
            borderColor: colors.gray,
            backgroundColor: colors.white,
          }}
        >
          <TextInput
            value={value}
            editable={false}
            placeholder="내 위치를 입력하세요"
            placeholderTextColor={colors.gray}
            style={[fonts.mediumText, { fontSize: 16, color: colors.black }]}
          />
        </View>
        
        <TouchableOpacity
          onPress={onSearch}
          className="rounded-md px-4 py-5 items-center justify-center"
          style={{
            borderWidth: 1,
            borderColor: colors.gray,
            backgroundColor: colors.white,
          }}
          activeOpacity={0.8}
        >
          <Text style={[fonts.mediumText, { fontSize: 16, color: colors.black }]}>
            주소 검색
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}