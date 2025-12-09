import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import EmptyBox from "./EmptyBox";
import { formatPartyStatus, formatPartyType, formatRoute, formatGender } from "@/utils/formatParty";
import { formatDate } from "@/utils/dateTime";
import { profileImages } from "@/utils/profileImgMapper";

import type { PartyItem } from "@/types/party";

type PartyListProps = {
  partyData: PartyItem[];
  countPartyNum?: number | null;
  onToggleLike: (id: number) => void;
  onSelectParty?: (party: PartyItem) => void;
  selectedPartyId?: number | null;
};

const truncateText = (text: string, length = 6) => {
  return text.length > length ? text.slice(0, length) + "···" : text;
};

type TagProps = {
  label: string;
  isSelected?: boolean;
};

const Tag = ({ label, isSelected  }: TagProps) => (
  <View 
    className="px-3 py-1 rounded-lg mr-2 mb-2" 
    style={{ backgroundColor: isSelected ? "#FFFFFF" : "#E9E9E9" }}>
    <Text 
      className="text-[11px] font-[Paperlogy-Regular]"
      style={{ color: colors.black }}
    >
      {label}</Text>
  </View>
);

export default function PartyList({ 
  partyData, 
  onToggleLike, 
  countPartyNum, 
  onSelectParty, 
  selectedPartyId 
}: PartyListProps) {
  const shouldShowEmpty = countPartyNum === 0;

  return (
    <View className="px-4 py-2 mt-5">
      {shouldShowEmpty ? (
        <EmptyBox message="등록된 파티가 없습니다"/>
      ) : (
      partyData.map((item) => {
        const { label, color } = formatPartyStatus(item.status);
        const { label: routeLabel, arrow } = formatRoute(item.routeType);

        const isSelected = selectedPartyId === item.partyId;

        return (
        <TouchableOpacity
          key={item.partyId}
          onPress={() => onSelectParty?.(item)}
          activeOpacity={0.9}
        >
          <View
            className="flex-row items-center justify-between px-5 py-5 mb-4 rounded-2xl"
            style={{ backgroundColor: isSelected ? "#FFEDE9" : "#FAF9F7" }}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-[60px] h-[60px] rounded-full justify-center items-center mr-4">
                <Image
                  source={profileImages[item.host.profileImageUrl]}
                  className="w-[55px] h-[55px]"
                  resizeMode="contain"
                />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center flex-1 min-w-0">
                  <Text
                    className="mr-1 flex-shrink"
                    style={[fonts.smallTitle, { color: colors.orange, fontSize: 15}]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.host.nickname ?? "익명"}
                  </Text>

                  <Text style={[fonts.smallText, { color: colors.black }]}> 님의 파티 </Text>

                  <Text
                    style={[fonts.smallText, { color: colors.black }]}
                    className="ml-2 flex-shrink-0"
                  >
                    {item.currentParticipants}/{item.capacity} (명)
                  </Text>
                </View>

                <View className="ml-2">
                  <View
                    className="px-2 py-[2px] rounded-md"
                    style={{
                      borderWidth: 1,
                      borderColor: color,
                    }}
                  >
                    <Text style={[fonts.smallText, { color }]}>{label}</Text>
                  </View>
                </View>
              </View>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[fonts.largeText, { color: colors.black }]}
                  className="mt-1"
                >
                  {truncateText(item.location.startLocation)} {arrow} {truncateText(item.location.placeName)}
                </Text>

                <View className="flex-row flex-wrap mt-3">
                  <Tag label={formatDate(item.startAt)} isSelected={isSelected}/>
                  <Tag label={formatPartyType(item.type)} isSelected={isSelected}/>
                  <Tag label={routeLabel} isSelected={isSelected}/>
                  <Tag label={formatGender(item.gender)} isSelected={isSelected}/>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => onToggleLike(item.partyId)} 
              className="ml-3"
            >
              <Ionicons
                name={item.isLiked ? "heart" : "heart-outline"}
                size={28}
                color={colors.orange}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        );
      })
    )}
    </View>
  );
}