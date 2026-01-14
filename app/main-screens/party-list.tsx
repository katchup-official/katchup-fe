import React, { useState, useMemo, useEffect, useRef, useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, TouchableOpacity, FlatList } from "react-native";
import PartyList from "@/components/lists/PartyList";
import PartyBottomSheet from "@/components/sections/PartyBottomSheet";

import type { PartyItem } from "@/types/party";
import { colors } from "@/constants/colors";
import PartyListTitle from "@/components/titles/PartyListTitle";
import PartyListBar from "@/components/bars/PartyListBar";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";
import ShortToast from "@/components/toasts/ShortToast";

import { getPartyList, PartyListType, togglePartyLike } from "@/apis/partyApi";

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

  const likingIdsRef = useRef<Set<number>>(new Set());

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const partyData = useMemo(() => {
    return selectedTab === "ALL" ? allPartyData : myPartyData;
  }, [selectedTab, allPartyData, myPartyData]);

  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const isInitialLoading = isFetching[selectedTab] && partyData.length === 0;

  const toggleLikeInState = (tab: TabType, partyId: number) => {
    if (tab === "ALL") {
      setAllPartyData((prev) =>
        prev.map((item) =>
          item.partyId === partyId ? { ...item, isLiked: !item.isLiked } : item
        )
      );
    } else {
      setMyPartyData((prev) =>
        prev.map((item) =>
          item.partyId === partyId ? { ...item, isLiked: !item.isLiked } : item
        )
      );
    }
  };

  const handleToggleLike = async (partyId: number) => {
    const tab = selectedTab;

    if (likingIdsRef.current.has(partyId)) return;

    likingIdsRef.current.add(partyId);
    toggleLikeInState(tab, partyId);

    try {
      await togglePartyLike(partyId);
    } catch (e) {
      toggleLikeInState(tab, partyId);

      console.warn("파티 찜 실패:", e);
      setToastMessage("찜 처리에 실패했어요.");
      setTimeout(() => setToastMessage(null), 1500);
    } finally {
      likingIdsRef.current.delete(partyId);
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

  const loadParties = useCallback(
    async (tab: TabType, mode: "RESET" | "MORE", forceReset?: boolean) => {
      if (!forceReset) {
        if (isFetching[tab]) return;
        if (mode === "MORE" && !hasMore[tab]) return;
      }

      setIsFetching((prev) => ({ ...prev, [tab]: true }));
      try {
        const type = getListTypeByTab(tab);
        const lastId = mode === "RESET" ? undefined : cursor[tab];

        const res = await getPartyList(type, { lastParticipantId: lastId });
        const newItems = res.content ?? [];

        if (tab === "ALL") {
          setAllPartyData((prev) =>
            mode === "RESET" ? newItems : [...prev, ...newItems]
          );
        } else {
          setMyPartyData((prev) =>
            mode === "RESET" ? newItems : [...prev, ...newItems]
          );
        }

        setHasMore((prev) => ({ ...prev, [tab]: !res.last }));

        const lastItem = newItems[newItems.length - 1];
        setCursor((prev) => ({
          ...prev,
          [tab]: lastItem ? lastItem.partyId : undefined,
        }));
      } catch (e) {
        console.warn("파티 목록 조회 실패:", e);
        setToastMessage("파티 목록을 불러오지 못했어요.");
        setTimeout(() => setToastMessage(null), 1500);
      } finally {
        setIsFetching((prev) => ({ ...prev, [tab]: false }));
      }
    },
    [isFetching, hasMore, cursor]
  );

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    setIsBottomSheetOpen(false);
    setSelectedPartyId(null);

    if (selectedTab === "ALL") {
      if (allPartyData.length > 0) return;
      loadParties("ALL", "RESET");
    } else {
      if (myPartyData.length > 0) return;
      loadParties("MY", "RESET");
    }
  }, [selectedTab]);

  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetOpen(false);
      setSelectedPartyId(null);

      setCursor({ ALL: undefined, MY: undefined });
      setHasMore({ ALL: true, MY: true });

      setAllPartyData([]);
      setMyPartyData([]);

      loadParties("ALL", "RESET", true);
      loadParties("MY", "RESET", true);
    }, [])
  );

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