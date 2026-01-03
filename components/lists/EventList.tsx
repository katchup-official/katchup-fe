import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootTabParamList } from "@/app/navigation/_types";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { colors } from "@/constants/colors";
import EventListTitle from "../titles/EventListTitle";
import EmptyBox from "./EmptyBox";
import CreateKatchup from "./CreateKatchup";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import type { EventItem } from "@/types/event";
import { getEventList, searchEventList } from "@/apis/eventApi";

interface EventListProps {
  searchEvent?: string | null;
  isSearched?: boolean;
  isAllEventMode?: boolean;
  isCreatePartyMode?: boolean;
  onLoadingChange?: (loading: boolean) => void;
}

export default function EventList({ 
  searchEvent, isSearched = false, 
  isAllEventMode = false, isCreatePartyMode = false, onLoadingChange,
}: EventListProps) {
  const tabBarHeight = useBottomTabBarHeight();

  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const [eventList, setEventList] = React.useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const [hasMore, setHasMore] = React.useState(true);

  const [lastEventId, setLastEventId] = React.useState<number | undefined>(undefined);

  const lastEventIdRef = React.useRef<number | undefined>(undefined);

  const keyword = React.useMemo(() => (searchEvent ?? "").trim(), [searchEvent]);
  const isSearchMode = isSearched && keyword.length > 0;

  React.useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  React.useEffect(() => {
    let mounted = true;

    const initFetch = async () => {
      setIsLoading(true);

      setEventList([]);
      setHasMore(true);
      setLastEventId(undefined);
      lastEventIdRef.current = undefined;

      try {
        const data = isSearchMode
          ? await searchEventList({ eventName: keyword })
          : await getEventList();

        if (!mounted) return;

        const content = data.content ?? [];
        setEventList(content);
        setHasMore(!data.last);

        if (content.length > 0) {
          const nextCursor = content[content.length - 1].id;

          setLastEventId(nextCursor);
          lastEventIdRef.current = nextCursor;
        }

      } catch (e: any) {
        if (!mounted) return;

        setEventList([]);
        setHasMore(false);
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    };

    initFetch();

    return () => {
      mounted = false;
    };
  }, [isSearchMode, keyword]);

  const loadMore = React.useCallback(async () => {
    if (isLoading || isFetchingMore || !hasMore) return;

    setIsFetchingMore(true);

    try {
      const cursor = lastEventIdRef.current;

      const data = isSearchMode
        ? await searchEventList({ eventName: keyword, lastEventId: cursor })
        : await getEventList({ lastEventId: cursor });

      const content = data.content ?? [];

      setEventList((prev) => {
        const prevIds = new Set(prev.map((v) => v.id));
        const merged = [...prev, ...content.filter((v) => !prevIds.has(v.id))];
        return merged;
      });

      setHasMore(!data.last);

      if (content.length > 0) {
        const nextCursor = content[content.length - 1].id;

        setLastEventId(nextCursor);
        lastEventIdRef.current = nextCursor;
      }
    } finally {
      setIsFetchingMore(false);
    }
  }, [isLoading, isFetchingMore, hasMore, isSearchMode, keyword]);

  const title = isAllEventMode
    ? "모든 행사 보기"
    : isSearched
    ? `검색 결과 (${eventList.length})`
    : "실시간 인기 있는 행사";

  const shouldShowEmpty = isSearched && !isLoading && eventList.length === 0;

  const shouldHideListBeforeSearch =
    isCreatePartyMode && !isAllEventMode && !isSearched;

  const renderItem = ({ item }: { item: EventItem }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center mb-5"
      onPress={() => {
        if (isAllEventMode) return;

        const payload = {
          eventId: item.eventId,
          eventName: item.eventName,
          facilityName: item.facilityName,
          startDate: item.startDate,
          endDate: item.endDate,
        };

        if (isCreatePartyMode) {
          navigation.navigate("CreatePartyStack", {
            screen: "CreatePartyScreen",
            params: payload,
          });
          return;
        }

        navigation.navigate("MainStack", {
          screen: "MainPartyScreen",
          params: payload,
        });
      }}
    >
      <Image
        source={{ uri: item.posterUrl }}
        className="w-[90px] h-[120px] rounded-md"
        resizeMode="cover"
      />

      <View className="ml-4 flex-1">
        <Text
          className="text-[18px] font-[Paperlogy-Bold]"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: colors.black }}
        >
          {item.eventName}
        </Text>

        <Text
          className="text-[15px] font-[Paperlogy-Regular] mt-3"
          style={{ color: colors.black }}
        >
          {item.facilityName}
        </Text>

        <Text
          className="text-[12px] font-[Paperlogy-Regular] mt-2"
          style={{ color: colors.darkGray }}
        >
          {`${item.startDate} ~ ${item.endDate}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
      <View className="mx-5 my-10">
      {!shouldHideListBeforeSearch && <EventListTitle title={title} />}

      {shouldHideListBeforeSearch ? (
        <CreateKatchup message="가고 싶은 행사를 검색하고, 파티를 만들어보세요!" />
      ) : shouldShowEmpty ? (
        <EmptyBox message="검색 결과가 존재하지 않습니다" />
      ) : (
        <FlatList
          data={eventList}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          contentContainerStyle={{
            paddingBottom: tabBarHeight + 32,
          }}
          ListFooterComponent={
            isFetchingMore && hasMore ? (
              <Text
                className="text-center mt-2"
                style={{ color: colors.darkGray }}
              >
                불러오는 중...
              </Text>
            ) : null
          }
        />
      )}
    </View>
  );
}