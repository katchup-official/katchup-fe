import React from "react";
import { View, Text, TextInput } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import type { RouteType } from "@/types/party";
import { inputBoxStyle } from "@/styles/inputBox";

type TimeSectionProps = {
  routeType: RouteType;
  startAt: string;
  returnAt: string;
  onChangeStartAt: (value: string) => void;
  onChangeReturnAt: (value: string) => void;
};

export default function TimeSection({
  routeType,
  startAt,
  returnAt,
  onChangeStartAt,
  onChangeReturnAt,
}: TimeSectionProps) {

  return (
    <View>
      {routeType === "ONE_WAY" ? (
        <View style={[inputBoxStyle, { backgroundColor: "#fff" }]}>
          <TextInput
            value={startAt}
            onChangeText={onChangeStartAt}
            placeholder="예) 18:30"
            placeholderTextColor={colors.gray}
            style={[fonts.mediumText, { color: colors.black }]}
          />
        </View>
      ) : (
        <>
          <Text
            style={[
              fonts.smallText,
              { color: colors.darkGray, marginTop: 4, marginBottom: 4 },
            ]}
          >
            집합시간 1
          </Text>
          <View
            style={[
              inputBoxStyle,
              { backgroundColor: "#fff", marginBottom: 8 },
            ]}
          >
            <TextInput
              value={startAt}
              onChangeText={onChangeStartAt}
              placeholder="예) 18:30"
              placeholderTextColor={colors.gray}
              style={[fonts.mediumText, { color: colors.black }]}
            />
          </View>

          <Text
            style={[
              fonts.smallText,
              { color: colors.darkGray, marginTop: 4, marginBottom: 4 },
            ]}
          >
            집합시간 2
          </Text>
          <View style={[inputBoxStyle, { backgroundColor: "#fff" }]}>
            <TextInput
              value={returnAt}
              onChangeText={onChangeReturnAt}
              placeholder="예) 22:30"
              placeholderTextColor={colors.gray}
              style={[fonts.mediumText, { color: colors.black }]}
            />
          </View>
        </>
      )}
    </View>
  );
}