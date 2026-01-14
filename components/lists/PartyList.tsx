import React from "react";
import { View } from "react-native";
import EmptyBox from "./EmptyBox";
import PartyCard from "@/components/sections/PartyCard";

import type { PartyItem } from "@/types/party";

type PartyListProps = {
  partyData: PartyItem[];
  countPartyNum?: number | null;
  onToggleLike: (id: number) => void;
  onSelectParty?: (party: PartyItem) => void;
  selectedPartyId?: number | null;
  isLoading?: boolean;
};

export default function PartyList({
  partyData,
  onToggleLike,
  countPartyNum,
  onSelectParty,
  selectedPartyId,
  isLoading
}: PartyListProps) {
  const shouldShowEmpty = countPartyNum === 0;

  if (isLoading) return null;

  if (shouldShowEmpty) {
    return (
      <View className="px-4">
        <EmptyBox message="등록된 파티가 없습니다" />
      </View>
    );
  }

  return (
    <View className="px-4">
      {partyData.map((item) => (
        <PartyCard
          key={item.partyId}
          item={item}
          selectable
          isSelected={selectedPartyId === item.partyId}
          onSelect={onSelectParty}
          onToggleLike={onToggleLike}
        />
      ))}
    </View>
  );
}