import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { MainStackParamList } from "@/app/navigation/MainStack";
import PartyHeader from "@/components/bars/PartyHeader";
import PartySortFilterBar, { SortOption, FilterOption } from "@/components/bars/PartySortFilterBar";
import PartyList from "@/components/lists/PartyList";
import PartyBottomSheet from "@/components/lists/PartyBottomSheet";

import type { PartyItem } from "@/types/party";
import { parties } from "@/mocks/parties";

export default function MainPartyScreen() {
  const route = useRoute<RouteProp<MainStackParamList, "MainPartyScreen">>();
  const { eventName, facilityName, startDate, endDate } = route.params;

  const [partyData, setPartyData] = useState(parties);

  const [sortOption, setSortOption] = useState<SortOption>("LATEST");
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const selectedParty =
    partyData.find((party) => party.partyId === selectedPartyId) ?? null;
    
  const handleSortOption = (option: SortOption) => {
  setSortOption(option);
  };

  const handleFilterOption = (filter: FilterOption) => {
    setFilterOptions(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

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
        <ScrollView className="flex-1 bg-white">
          <PartyHeader
            eventName={eventName}
            facilityName={facilityName}
            startDate={startDate}
            endDate={endDate}
            countPartyNum={10}
          />
          <PartySortFilterBar
            sortOption={sortOption}
            filterOptions={filterOptions}
            setSortOption={handleSortOption}
            setFilterOption={handleFilterOption}
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