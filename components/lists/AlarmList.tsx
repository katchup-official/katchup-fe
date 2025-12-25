import React from "react";
import { View, FlatList } from "react-native";
import type { AlarmItem } from "@/types/alarm";
import AlarmCard from "@/components/sections/AlarmCard";

type AlarmListProps = {
  data: AlarmItem[];
  onAccept?: (partyId: number) => void;
  onReject?: (partyId: number) => void;
  onReview?: (partyId: number) => void;
};

export default function AlarmList({
  data,
  onAccept,
  onReject,
  onReview,
}: AlarmListProps) {
  return (
    <View className="flex-1 px-5">
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.type}-${item.partyId}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <AlarmCard
            item={item}
            onAccept={onAccept}
            onReject={onReject}
            onReview={onReview}
          />
        )}
      />
    </View>
  );
}