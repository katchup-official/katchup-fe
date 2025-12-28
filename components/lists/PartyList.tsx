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
};

export default function PartyList({
  partyData,
  onToggleLike,
  countPartyNum,
  onSelectParty,
  selectedPartyId,
}: PartyListProps) {
  const shouldShowEmpty = countPartyNum === 0;

  return (
    <View className="px-4 py-2 mt-5">
      {shouldShowEmpty ? (
        <EmptyBox message="등록된 파티가 없습니다" />
      ) : (
        partyData.map((item) => (
          <PartyCard
            key={item.partyId}
            item={item}
            selectable
            isSelected={selectedPartyId === item.partyId}
            onSelect={onSelectParty}
            onToggleLike={onToggleLike}
          />
        ))
      )}
    </View>
  );
}