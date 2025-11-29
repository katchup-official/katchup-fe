import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootTabParamList } from "@/app/navigation/_types";
import type { MainStackParamList } from "@/app/navigation/MainStack";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { events } from "@/mocks/events";
import { colors } from "@/constants/colors";
import EventListTitle from "../titles/EventListTitle";
import EmptyBox from "./EmptyBox";

interface EventListProps {
  searchEvent?: string;
  countEventNum?: number | null;
  isSearched?: boolean;
}

export default function EventList({ 
  searchEvent="", countEventNum, isSearched = false, 
}: EventListProps) {

  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  
  const title = isSearched
    ? `검색 결과 (${countEventNum ?? 0})`
    : "실시간 인기 있는 행사";

  const shouldShowEmpty = isSearched && countEventNum === 0;

  return (
    <View className="mx-5 my-10">
      <EventListTitle title={title}/>
      {shouldShowEmpty ? (
        <EmptyBox />
      ) : (
        events.map((item) => (
          <TouchableOpacity
            key={item.eventId}
            activeOpacity={0.8}
            className="flex-row items-center mb-5"
            onPress={() =>
              navigation.navigate("MainStack", {
                screen: "MainPartyScreen",
                params: {
                  eventName: item.eventName,
                  facilityName: item.facilityName,
                  startDate: item.startDate,
                  endDate: item.endDate,
                },
              })
            }
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
        ))
      )}
    </View>
  );
}