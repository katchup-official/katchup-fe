import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { buttonBase } from "@/styles/inputBox";
import { inputBoxStyle } from "@/styles/inputBox";

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
                value={minBirthYear}
                onChangeText={onChangeMinBirthYear}
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
                value={maxBirthYear}
                onChangeText={onChangeMaxBirthYear}
                placeholder="예) 2002"
                placeholderTextColor={colors.gray}
                keyboardType="number-pad"
                style={[fonts.mediumText, { color: colors.black }]}
                />
            </View>
        </View>
        )}
    </View>
  );
}