// components/bars/PartySortFilterBar.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

const SORT_OPTIONS = {
  LATEST: "최신순",
  OLDEST: "오래된순",
  NEAREST: "가까운순",
} as const;

const FILTER_OPTIONS = {
  RECRUITING: "모집중",
  JOINABLE: "참여가능",
} as const;

export type SortOption = keyof typeof SORT_OPTIONS;
export type FilterOption = keyof typeof FILTER_OPTIONS;

const SORT_OPTION_LIST = Object.keys(SORT_OPTIONS) as SortOption[];
const FILTER_OPTION_LIST = Object.keys(FILTER_OPTIONS) as FilterOption[];

type PartySortFilterBarProps = {
  sortOption: SortOption;
  filterOptions: FilterOption[];
  setSortOption: (option: SortOption) => void;
  setFilterOption: (filter: FilterOption) => void;
};

export default function PartySortFilterBar({
  sortOption,
  filterOptions,
  setSortOption,
  setFilterOption,
}: PartySortFilterBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasOverlay = isSortOpen || isFilterOpen;

  return (
    <View
      className="mx-5 mt-6"
      style={{
        position: "relative",
        zIndex: hasOverlay ? 30 : 0,
        elevation: hasOverlay ? 30 : 0,
      }}
    >
      <View className="flex-row items-center justify-between">
        {/* ================= 필터 버튼 ================ */}
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-9 h-9 rounded-lg items-center justify-center"
            style={{ backgroundColor: isFilterOpen ? "#E9E9E9" : colors.lightGray,  }}
            onPress={() => {
              setIsFilterOpen(prev => !prev);
            }}
          >
            <Ionicons name="filter" size={20} color={colors.black} />
          </TouchableOpacity>

          <View className="ml-3 flex-row h-9 items-center">
            <View
              className="flex-row"
              style={{
                opacity: isFilterOpen ? 1 : 0,
                pointerEvents: (isFilterOpen ? "auto" : "none") as "auto" | "none",
              }}
            >
              {FILTER_OPTION_LIST.map((opt) => {
                const selected = filterOptions.includes(opt);
                return (
                  <TouchableOpacity
                    key={opt}
                    activeOpacity={0.8}
                    className="px-4 py-2 mr-2 rounded-full border"
                    style={{
                      borderColor: selected ? "#2F80ED" : colors.lightGray,
                      backgroundColor: selected ? "#E7F3FF" : colors.white,
                    }}
                    onPress={() => setFilterOption(opt)}
                  >
                    <Text
                      style={[
                        fonts.smallText,
                        { color: selected ? "#2F80ED" : colors.black },
                      ]}
                    >
                      {FILTER_OPTIONS[opt]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* ================= 정렬 버튼 ================ */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center"
          onPress={() => {
            setIsSortOpen(prev => !prev);
          }}
        >
          <Text style={[fonts.mediumText, { color: colors.black }]}>
            {SORT_OPTIONS[sortOption]}
          </Text>
          <Ionicons
            name={isSortOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={colors.black}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>
      
      {/* ================= 정렬 드롭다운 ================ */}
      {isSortOpen && (
        <View
          className="rounded-xl py-2"
          style={{
            position: "absolute",
            right: 0,
            top: 40,
            backgroundColor: colors.white,
            shadowColor: colors.black,
            shadowOpacity: 0.08,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          {SORT_OPTION_LIST.map((opt) => (
            <TouchableOpacity
              key={opt}
              className="px-4 py-2"
              activeOpacity={0.8}
              onPress={() => {
                setSortOption(opt);
                setIsSortOpen(false);
              }}
            >
              <Text
                style={[
                  fonts.mediumText,
                  {
                    color:
                      sortOption === opt ? colors.orange : colors.black,
                  },
                ]}
              >
                {SORT_OPTIONS[opt]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}