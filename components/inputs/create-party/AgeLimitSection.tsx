import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { buttonBase } from "@/styles/inputBox";
import { inputBoxStyle } from "@/styles/inputBox";
import ShortToast from "@/components/toasts/ShortToast";

type AgeLimitSectionProps = {
  hasAgeLimit: boolean;
  onChangeHasAgeLimit: (value: boolean) => void;
  minBirthYear: string;
  maxBirthYear: string;
  onChangeMinBirthYear: (value: string) => void;
  onChangeMaxBirthYear: (value: string) => void;
};

export default function AgeLimitSection({
  hasAgeLimit,
  onChangeHasAgeLimit,
  minBirthYear,
  maxBirthYear,
  onChangeMinBirthYear,
  onChangeMaxBirthYear,
}: AgeLimitSectionProps) {
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 1800);
  };

  const handleYearChange = (text: string, onChange: (v: string) => void) => {
    const numeric = text.replace(/[^0-9]/g, "");
    if (numeric.length <= 4) {
      onChange(numeric);
    }
  };

  const validateYear = (
    value: string,
    onChange: (v: string) => void,
    type: "min" | "max"
  ) => {
    if (!value) return;

    const year = Number(value);

    if (value.length < 4) {
      onChange("");
      showToast("4자리 연도를 입력해주세요.");
      return;
    }

    if (year < 1960) {
      onChange("");
      showToast("1960년생 이후부터 입력 가능합니다.");
      return;
    }

    if (year > 2025) {
      onChange("");
      showToast("유효하지 않은 값입니다.");
      return;
    }

    const max = type === "max" ? year : Number(maxBirthYear || NaN);
    const min = type === "min" ? year : Number(minBirthYear || NaN);

    if (!isNaN(min) && !isNaN(max) && max > min) {
      onChangeMinBirthYear("");
      onChangeMaxBirthYear("");
      showToast("최소 연도가 최대 연도보다 클 수 없습니다.");
    }
  };

  return (
    <View className="mb-3">
      <View className="flex-row gap-x-2 mb-3">
        <TouchableOpacity
          className={buttonBase}
          style={{
            borderColor: hasAgeLimit ? colors.orange : colors.gray,
            backgroundColor: hasAgeLimit ? `${colors.orange}1A` : "#fff",
          }}
          onPress={() => onChangeHasAgeLimit(true)}
        >
          <Text
            style={[
              fonts.mediumText,
              { color: hasAgeLimit ? colors.orange : colors.darkGray },
            ]}
          >
            O
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={buttonBase}
          style={{
            borderColor: !hasAgeLimit ? colors.orange : colors.gray,
            backgroundColor: !hasAgeLimit ? `${colors.orange}1A` : "#fff",
          }}
          onPress={() => onChangeHasAgeLimit(false)}
        >
          <Text
            style={[
              fonts.mediumText,
              { color: !hasAgeLimit ? colors.orange : colors.darkGray },
            ]}
          >
            X
          </Text>
        </TouchableOpacity>
      </View>

      {hasAgeLimit && (
        <View className="flex-row items-center">
          <View style={[inputBoxStyle, { flex: 1, backgroundColor: "#fff" }]}>
            <TextInput
              value={maxBirthYear}
              onChangeText={(text) =>
                handleYearChange(text, onChangeMaxBirthYear)
              }
              onEndEditing={() =>
                validateYear(maxBirthYear, onChangeMaxBirthYear, "max")
              }
              placeholder="예) 1995"
              placeholderTextColor={colors.gray}
              keyboardType="number-pad"
              style={[fonts.mediumText, { color: colors.black }]}
            />
          </View>

          <Text
            style={[
              fonts.mediumText,
              { marginHorizontal: 8, color: colors.darkGray },
            ]}
          >
            ~
          </Text>

          <View style={[inputBoxStyle, { flex: 1, backgroundColor: "#fff" }]}>
            <TextInput
              value={minBirthYear}
              onChangeText={(text) =>
                handleYearChange(text, onChangeMinBirthYear)
              }
              onEndEditing={() =>
                validateYear(minBirthYear, onChangeMinBirthYear, "min")
              }
              placeholder="예) 2000"
              placeholderTextColor={colors.gray}
              keyboardType="number-pad"
              style={[fonts.mediumText, { color: colors.black }]}
            />
          </View>
        </View>
      )}

      {toastMsg !== "" && <ShortToast message={toastMsg} />}
    </View>
  );
}