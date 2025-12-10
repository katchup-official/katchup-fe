import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import PartyList from "@/components/lists/PartyList";
import PartyBottomSheet from "@/components/lists/PartyBottomSheet";

import type { PartyItem } from "@/types/party";
import { parties } from "@/mocks/parties";
import { colors } from "@/constants/colors";
import PartyListTitle from "@/components/titles/PartyListTitle";
import PartyListButtons from "@/components/buttons/PartyListButtons";

export default function PartyListScreen(){
  
  const [partyData, setPartyData] = useState(parties);
  const [selectedTab, setSelectedTab] = useState<"ALL" | "MY">("ALL");

  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  
  const selectedParty =
    partyData.find((party) => party.partyId === selectedPartyId) ?? null;

  const handleToggleLike = (id: number) => {
    setPartyData(prev =>
      prev.map(item =>
        item.partyId === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const handleSelectParty = (party: PartyItem) => {
      setSelectedPartyId(party.partyId);
      setIsBottomSheetOpen(true);
  };

  const clearSelection = () => {
    if (!isBottomSheetOpen) setSelectedPartyId(null);
  };

  return (
    <>
      <TouchableOpacity 
        activeOpacity={1} 
        style={{ flex: 1 }} 
        onPress={clearSelection}
      >
        <ScrollView className="flex-1" style={{ backgroundColor: colors.white }}>
          <PartyListTitle />
          <PartyListButtons 
            selectedTab={selectedTab}
            onChangeTab={setSelectedTab}
          />
          <PartyList 
            partyData={partyData} 
            countPartyNum={10}
            onToggleLike={handleToggleLike}
            onSelectParty={handleSelectParty}
            selectedPartyId={selectedPartyId}
          />
        </ScrollView>
      </TouchableOpacity>

      <PartyBottomSheet
        isVisible={isBottomSheetOpen}
        party={selectedParty}
        onClose={() => { setIsBottomSheetOpen(false);}}
        onToggleLike={handleToggleLike}
      />
    </>
  );
}