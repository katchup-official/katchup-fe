import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { buttonBase } from "@/styles/inputBox";

export type SegmentOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentGroupProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (next: T) => void;
  className?: string;
};

export default function SegmentGroup<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentGroupProps<T>) {
  return (
    <View className={`flex-row gap-x-2 ${className ?? ""}`}>
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            className={buttonBase}
            activeOpacity={0.8}
            style={{
              borderColor: isActive ? colors.orange : colors.gray,
              backgroundColor: isActive ? `${colors.orange}1A` : "#fff",
            }}
            onPress={() => onChange(option.value)}
          >
            <Text
              style={[
                fonts.mediumText,
                { color: isActive ? colors.orange : colors.darkGray },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}