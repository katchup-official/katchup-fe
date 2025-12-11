import React from "react";
import { View, TextInput } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { inputBoxStyle } from "@/styles/inputBox";

type EtcSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EtcSection({ value, onChange }: EtcSectionProps) {

  return (
    <View style={[inputBoxStyle, { minHeight: 90, backgroundColor: "#fff" }]}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="파티에 대한 추가 설명을 입력해주세요."
        placeholderTextColor={colors.gray}
        style={[fonts.mediumText, { color: colors.black }]}
        multiline
      />
    </View>
  );
}