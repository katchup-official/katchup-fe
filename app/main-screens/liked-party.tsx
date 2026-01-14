import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, View, FlatList } from "react-native";
import PartyList from "@/components/lists/PartyList";
import PartyBottomSheet from "@/components/sections/PartyBottomSheet";

import type { PartyItem } from "@/types/party";
import { colors } from "@/constants/colors";
import PartyListTitle from "@/components/titles/PartyListTitle";
import LikedPartyBar from "@/components/bars/LikedPartyBar";
import ShortToast from "@/components/toasts/ShortToast";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";

import { getLikedPartyList, togglePartyLike } from "@/apis/partyApi";

export default function LikedPartyListScreen(){
  const [partyData, setPartyData] = useState<PartyItem[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    
  const isInitialLoading = isFetching && partyData.length === 0;

  const loadLikedParties = async (mode: "RESET" | "MORE") => {
    if (isFetching) return;
    if (mode === "MORE" && !hasMore) return;

    setIsFetching(true);
    try {
      const lastLikeId = mode === "RESET" ? undefined : cursor;

      const res = await getLikedPartyList({ lastLikeId });
      const newItems = res.content ?? [];

      setPartyData((prev) => (mode === "RESET" ? newItems : [...prev, ...newItems]));
      setHasMore(!res.last);

      const lastItem = newItems[newItems.length - 1];
      if (lastItem) setCursor(lastItem.partyId);
    } catch (e) {
      console.warn("관심 파티 목록 조회 실패:", e);
      setToastMessage("관심 목록을 불러오지 못했어요.");
      setTimeout(() => setToastMessage(null), 1500);
    } finally {
      setIsFetching(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetOpen(false);
      setSelectedPartyId(null);

      setCursor(undefined);
      setHasMore(true);
      setPartyData([]);

      loadLikedParties("RESET");
    }, [])
  );

  const handleToggleLike = async (partyId: number) => {
    if (selectedPartyId === partyId) {
      setIsBottomSheetOpen(false);
      setSelectedPartyId(null);
    }

    const backup = partyData;
    setPartyData((prev) => prev.filter((p) => p.partyId !== partyId));

    try {
      await togglePartyLike(partyId);
    } catch (e) {
      console.warn("찜 해제 실패:", e);
      setPartyData(backup);
      setToastMessage("찜 해제 처리에 실패했어요.");
      setTimeout(() => setToastMessage(null), 1500);
    }
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
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <PartyListTitle title="관심 목록" />
            <LikedPartyBar />
          <FlatList
            data={[{ key: "only" }]}
            keyExtractor={(item) => item.key}
            renderItem={() => (
              <PartyList
                partyData={partyData}
                countPartyNum={partyData.length}
                onToggleLike={handleToggleLike}
                onSelectParty={handleSelectParty}
                selectedPartyId={selectedPartyId}
                isLoading={isInitialLoading}
              />
            )}
            onEndReachedThreshold={0.6}
            onEndReached={() => loadLikedParties("MORE")}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableOpacity>

      <PartyBottomSheet
          isVisible={isBottomSheetOpen}
          partyId={selectedPartyId}
          onClose={() => {
            setIsBottomSheetOpen(false);
            setSelectedPartyId(null);
          }}
          onToggleLike={handleToggleLike}
      />
      {toastMessage && <ShortToast message={toastMessage} />}

      <LoadingOverlay visible={isInitialLoading} />
    </>
  );
}