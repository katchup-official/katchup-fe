import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type TabType = "ALL" | "MY";

type PartyListButtonsProps = {
  selectedTab: TabType;
  onChangeTab: (tab: TabType) => void;
};

export default function PartyListButtons({ selectedTab, onChangeTab }: PartyListButtonsProps) {
  const tabs = [
    { key: "ALL" as TabType, label: "전체", color: colors.orange },
    { key: "MY" as TabType, label: "MY", color: colors.green },
  ];

  return (
    <View className="px-5 items-end mt-1">
      <View className="flex-row">
        {tabs.map((tab, index) => {
          const isActive = selectedTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              className={`px-6 py-2 rounded-t-2xl ${
                index === 0 ? "mr-2" : ""
              }`}
              style={{
                backgroundColor: isActive ? tab.color : colors. gray,
              }}
              onPress={() => onChangeTab(tab.key)}
            >
              <Text style={[fonts.mediumText, { color: colors.white, fontSize: 15 }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        className="h-[3px] w-full"
        style={{
          backgroundColor:
            selectedTab === "ALL" ? colors.orange : colors.green,
        }}
      />
    </View>
  );
}