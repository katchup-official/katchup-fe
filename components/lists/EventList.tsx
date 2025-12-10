import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootTabParamList } from "@/app/navigation/_types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { events } from "@/mocks/events";
import { colors } from "@/constants/colors";
import EventListTitle from "../titles/EventListTitle";
import EmptyBox from "./EmptyBox";
import CreateKatchup from "./CreateKatchup";

interface EventListProps {
  searchEvent?: string | null;
  countEventNum?: number | null;
  isSearched?: boolean;
  isAllEventMode?: boolean;
  isCreatePartyMode?: boolean;
}

export default function EventList({ 
  searchEvent="", countEventNum, isSearched = false, 
  isAllEventMode = false, isCreatePartyMode = false,
}: EventListProps) {

  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  
  const title = isAllEventMode
    ? "모든 행사 보기"
    : isSearched
    ? `검색 결과 (${countEventNum ?? 0})`
    : "실시간 인기 있는 행사";

  const shouldShowEmpty = isSearched && countEventNum === 0;

  const shouldHideListBeforeSearch =
    isCreatePartyMode && !isAllEventMode && !isSearched;

  return (
    <View className="mx-5 my-10">
      {!shouldHideListBeforeSearch && <EventListTitle title={title} />}

      {shouldHideListBeforeSearch ? (
        <CreateKatchup message="가고 싶은 행사를 검색하고, 파티를 만들어보세요!" />
      ) : shouldShowEmpty ? (
        <EmptyBox message="검색 결과가 존재하지 않습니다" />
      ) : (
        <>
          {events.map((item) => (
            <TouchableOpacity
              key={item.eventId}
              activeOpacity={0.8}
              className="flex-row items-center mb-5"
              onPress={() => {
                if (isAllEventMode) return;

                if (isCreatePartyMode) {
                  navigation.navigate("CreatePartyStack", {
                    screen: "CreatePartyScreen",
                    params: {
                      eventId: Number(item.eventId),
                      eventName: item.eventName,
                      facilityName: item.facilityName,
                      startDate: item.startDate,
                      endDate: item.endDate,
                    },
                  });
                  return;
                }

                navigation.navigate("MainStack", {
                  screen: "MainPartyScreen",
                  params: {
                    eventId: Number(item.eventId),
                    eventName: item.eventName,
                    facilityName: item.facilityName,
                    startDate: item.startDate,
                    endDate: item.endDate,
                  },
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
          ))}
        </>
      )}
    </View>
  );
}