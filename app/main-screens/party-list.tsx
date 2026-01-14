import React, { useState, useMemo, useEffect } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import PartyList from "@/components/lists/PartyList";
import PartyBottomSheet from "@/components/sections/PartyBottomSheet";

import type { PartyItem } from "@/types/party";
import { colors } from "@/constants/colors";
import PartyListTitle from "@/components/titles/PartyListTitle";
import PartyListBar from "@/components/bars/PartyListBar";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";
import ShortToast from "@/components/toasts/ShortToast";

import { getPartyList, PartyListType } from "@/apis/partyApi";

type TabType = "ALL" | "MY";

export default function PartyListScreen(){
  const [selectedTab, setSelectedTab] = useState<TabType>("ALL");

  const [allPartyData, setAllPartyData] = useState<PartyItem[]>([]);
  const [myPartyData, setMyPartyData] = useState<PartyItem[]>([]);

  const [cursor, setCursor] = useState<{ ALL?: number; MY?: number }>({});
  const [hasMore, setHasMore] = useState<{ ALL: boolean; MY: boolean }>({
    ALL: true,
    MY: true,
  });
  const [isFetching, setIsFetching] = useState<{ ALL: boolean; MY: boolean }>({
    ALL: false,
    MY: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const partyData = useMemo(() => {
    return selectedTab === "ALL" ? allPartyData : myPartyData;
  }, [selectedTab, allPartyData, myPartyData]);

  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const isInitialLoading = isFetching[selectedTab] && partyData.length === 0;
  
  const selectedParty =
    partyData.find((party) => party.partyId === selectedPartyId) ?? null;

  const handleToggleLike = (id: number) => {
    if (selectedTab === "ALL") {
      setAllPartyData((prev) =>
        prev.map((item) =>
          item.partyId === id ? { ...item, isLiked: !item.isLiked } : item
        )
      );
    } else {
      setMyPartyData((prev) =>
        prev.map((item) =>
          item.partyId === id ? { ...item, isLiked: !item.isLiked } : item
        )
      );
    }
  };

  const handleSelectParty = (party: PartyItem) => {
      setSelectedPartyId(party.partyId);
      setIsBottomSheetOpen(true);
  };

  const clearSelection = () => {
    if (!isBottomSheetOpen) setSelectedPartyId(null);
  };

  const getListTypeByTab = (tab: TabType): PartyListType => {
    if (tab === "ALL") return "participant";
    return "host";
  };

  const loadParties = async (tab: TabType, mode: "RESET" | "MORE") => {
    if (isFetching[tab]) return;
    if (mode === "MORE" && !hasMore[tab]) return;

    setIsFetching((prev) => ({ ...prev, [tab]: true }));
    try {
      const type = getListTypeByTab(tab);
      const lastId = mode === "RESET" ? undefined : cursor[tab];

      const res = await getPartyList(type, { lastParticipantId: lastId });
      const newItems = res.content ?? [];

      if (tab === "ALL") {
        setAllPartyData((prev) => (mode === "RESET" ? newItems : [...prev, ...newItems]));
      } else {
        setMyPartyData((prev) => (mode === "RESET" ? newItems : [...prev, ...newItems]));
      }

      setHasMore((prev) => ({ ...prev, [tab]: !res.last }));

      const lastItem = newItems[newItems.length - 1];
      if (lastItem) setCursor((prev) => ({ ...prev, [tab]: lastItem.partyId }));
    } catch (e) {
      console.warn("파티 목록 조회 실패:", e);
      setToastMessage("파티 목록을 불러오지 못했어요.");
      setTimeout(() => setToastMessage(null), 1500);
    } finally {
      setIsFetching((prev) => ({ ...prev, [tab]: false }));
    }
  };

  useEffect(() => {
    setIsBottomSheetOpen(false);
    setSelectedPartyId(null);

    if (selectedTab === "ALL" && allPartyData.length === 0) {
      setCursor((prev) => ({ ...prev, ALL: undefined }));
      setHasMore((prev) => ({ ...prev, ALL: true }));
      loadParties("ALL", "RESET");
    }
    if (selectedTab === "MY" && myPartyData.length === 0) {
      setCursor((prev) => ({ ...prev, MY: undefined }));
      setHasMore((prev) => ({ ...prev, MY: true }));
      loadParties("MY", "RESET");
    }
  }, [selectedTab]);

  return (
    <>
      <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={clearSelection}>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <PartyListTitle title="파티 목록" />
          <PartyListBar selectedTab={selectedTab} onChangeTab={setSelectedTab} />
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
              onEndReached={() => loadParties(selectedTab, "MORE")}
              contentContainerStyle={{ paddingTop: 16, paddingBottom: 90 }}
            />
        </View>
      </TouchableOpacity>

      <PartyBottomSheet
        isVisible={isBottomSheetOpen}
        party={selectedParty}
        onClose={() => { setIsBottomSheetOpen(false);}}
        onToggleLike={handleToggleLike}
      />

      {toastMessage && <ShortToast message={toastMessage} />}

      <LoadingOverlay visible={isInitialLoading} />
    </>
  );
}