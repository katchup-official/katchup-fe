import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import PartyCard from "@/components/sections/PartyCard";
import ReviewMemberList from "@/components/lists/ReviewMemberList";

import { party } from "@/mocks/party";

export default function ReviewMemberListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const partyId = Number(params.partyId);

  const selectedParty = React.useMemo(() => {
    return party.find((p) => p.partyId === partyId) ?? party[0];
  }, [partyId]);


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 pt-3 items-start">
        <TouchableOpacity onPress={router.back} hitSlop={10} activeOpacity={0.9}>
          <Ionicons name="chevron-back" size={28} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View className="px-4 mt-6">
        <PartyCard
          item={selectedParty}
        />
      </View>
      <ReviewMemberList partyId={partyId} />
    </SafeAreaView>
  );
}