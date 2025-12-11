import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { inputBoxStyle } from "@/styles/inputBox";

type LocationSectionProps = {
  departure: string;
  arrivalLabel: string;
  onChangeDeparture: (value: string) => void;
  onPressSearchDeparture: () => void;
};

export default function LocationSection({
  departure,
  arrivalLabel,
  onChangeDeparture,
  onPressSearchDeparture,
}: LocationSectionProps) {

  return (
    <>
      <Text
        style={[
          fonts.smallText,
          { color: colors.darkGray, marginTop: 4, marginBottom: 4 },
        ]}
      >
        출발지
      </Text>
      <View className="flex-row items-center">
        <View style={[inputBoxStyle, { backgroundColor: "#fff", flex: 1 }]}>
          <TextInput
            value={departure}
            onChangeText={onChangeDeparture}
            placeholder="출발지 주소를 입력하세요"
            placeholderTextColor={colors.gray}
            style={[fonts.mediumText, { color: colors.black }]}
          />
        </View>

        <TouchableOpacity
          className="ml-2 rounded-md border"
          style={{
            height: 51,
            borderColor: colors.gray,
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPressSearchDeparture}
        >
          <Text style={[fonts.smallText, { color: colors.black }]}>
            주소 검색
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          fonts.smallText,
          { color: colors.darkGray, marginTop: 10, marginBottom: 4 },
        ]}
      >
        목적지
      </Text>
      <View style={[inputBoxStyle, { flex: 1 }]}>
        <TextInput
          value={arrivalLabel}
          editable={false}
          selectTextOnFocus={false}
          placeholderTextColor={colors.gray}
          style={[fonts.mediumText, { color: colors.black, opacity: 0.7 }]}
        />
      </View>
    </>
  );
}