import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

export type PartyDateOption = {
  key: string;
  label: string;
  weekday: string;
};

interface PartyDateSectionProps {
  label?: string;
  options: PartyDateOption[];
  value: string;
  onChange: (nextKey: string) => void;
}

export default function PartyDateSection({
  options,
  value,
  onChange,
}: PartyDateSectionProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 4 }}
    >
      {options.map((d) => {
        const isSelected = value === d.key;

        return (
          <TouchableOpacity
            key={d.key}
            className="mr-2"
            onPress={() => onChange(d.key)}
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: isSelected ? colors.orange : colors.gray,
              backgroundColor: isSelected ? `${colors.orange}1A` : "#ffffff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                fonts.mediumText,
                {
                  fontSize: 14,
                  color: isSelected ? colors.orange : colors.darkGray,
                },
              ]}
            >
              {d.label}
            </Text>

            <Text
              style={[
                fonts.smallText,
                {
                  marginTop: 2,
                  fontSize: 11,
                  color: isSelected ? colors.orange : colors.darkGray,
                },
              ]}
            >
              {d.weekday}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}