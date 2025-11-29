import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { MainStackParamList } from "@/app/navigation/MainStack";
import PartyHeader from "@/components/bars/PartyHeader";
import PartyList from "@/components/lists/PartyList";
import { events } from "@/mocks/parties";

export default function MainPartyScreen() {
  const route = useRoute<RouteProp<MainStackParamList, "MainPartyScreen">>();
  const { eventName, facilityName, startDate, endDate } = route.params;

  const [partyData, setPartyData] = useState(events);

  const toggleLike = (id: number) => {
    setPartyData(prev =>
      prev.map(item =>
        item.partyId === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <PartyHeader
        eventName={eventName}
        facilityName={facilityName}
        startDate={startDate}
        endDate={endDate}
      />
      <PartyList 
        partyData={partyData} 
        countPartyNum={10}
        onToggle={toggleLike}
    />
    </ScrollView>
  );
}