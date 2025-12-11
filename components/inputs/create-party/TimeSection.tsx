import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import type { RouteType } from "@/types/party";
import { inputBoxStyle } from "@/styles/inputBox";
import ShortToast from "@/components/toasts/ShortToast";

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
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg("");
    }, 1500);
  };

  const isValidTime = (value: string) => {
    // 00:00 ~ 23:59
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(value);
  };

  const handleChangeTime = (
    text: string,
    onChange: (v: string) => void
  ) => {
    const numeric = text.replace(/[^0-9]/g, "");

    if (numeric.length === 0) {
      onChange("");
      return;
    }

    if (numeric.length <= 2) {
      const hh = numeric;

      // 시가 두 자리일 때 바로 검증 (00~23)
      if (hh.length === 2 && Number(hh) > 23) {
        onChange("");
        showToast("00~23시 사이로 입력해주세요");
        return;
      }

      onChange(hh);
      return;
    }

    const hh = numeric.slice(0, 2);
    const mm = numeric.slice(2, 4);
    const value = `${hh}:${mm}`;

    if (Number(hh) > 23) {
      onChange("");
      showToast("00 ~ 23시 사이로 입력해주세요");
      return;
    }

    if (numeric.length >= 4) {
      if (!isValidTime(value)) {
        onChange("");
        showToast("00:00 ~ 23:59 사이로 입력해주세요");
        return;
      }
    }

    onChange(value);
  };

  return (
    <>
      <View>
        {routeType === "ONE_WAY" ? (
          <View style={[inputBoxStyle, { backgroundColor: "#fff" }]}>
            <TextInput
              value={startAt}
              onChangeText={(text) => handleChangeTime(text, onChangeStartAt)}
              placeholder="예) 18:30"
              placeholderTextColor={colors.gray}
              style={[fonts.mediumText, { color: colors.black }]}
              keyboardType="number-pad"
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
                onChangeText={(text) => handleChangeTime(text, onChangeStartAt)}
                placeholder="예) 18:30"
                placeholderTextColor={colors.gray}
                style={[fonts.mediumText, { color: colors.black }]}
                keyboardType="number-pad"
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
                onChangeText={(text) => handleChangeTime(text, onChangeReturnAt)}
                placeholder="예) 22:30"
                placeholderTextColor={colors.gray}
                style={[fonts.mediumText, { color: colors.black }]}
                keyboardType="number-pad"
              />
            </View>
          </>
        )}
      </View>

      {toastMsg !== "" && <ShortToast message={toastMsg} />}
    </>
  );
}