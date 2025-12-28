import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { formatPartyStatus, formatPartyType, formatRoute, formatGender } from "@/utils/formatParty";
import { formatDate } from "@/utils/dateTime";
import { profileImages } from "@/utils/profileImgMapper";

import type { PartyItem } from "@/types/party";

const truncateText = (text: string, length = 6) =>
  text.length > length ? text.slice(0, length) + "···" : text;

type TagProps = {
  label: string;
  isSelected?: boolean;
};

const Tag = ({ label, isSelected }: TagProps) => (
  <View
    className="px-3 py-1 rounded-lg mr-2 mb-2"
    style={{ backgroundColor: isSelected ? colors.white : colors.mediumGray }}
  >
    <Text className="text-[11px] font-[Paperlogy-Regular]" style={{ color: colors.black }}>
      {label}
    </Text>
  </View>
);

type Props = {
  item: PartyItem;
  onToggleLike?: (partyId: number) => void;
  selectable?: boolean;
  isSelected?: boolean;
  onSelect?: (party: PartyItem) => void;
};

export default function PartyCard({ item, onToggleLike, onSelect, selectable = false, isSelected = false }: Props) {
  const { label, color } = formatPartyStatus(item.status);
  const { label: routeLabel, arrow } = formatRoute(item.routeType);

  const isPressable = !!onSelect;
  const selected = selectable && isSelected;
  const showHeart = selectable && !!onToggleLike;

  return (
    <TouchableOpacity 
      onPress={() => onSelect?.(item)} 
      activeOpacity={isPressable ? 0.9 : 1}
      disabled={!isPressable}
    >
      <View
        className="flex-row items-center justify-between px-5 py-5 mb-4 rounded-2xl"
        style={{ backgroundColor: selected ? colors.bgOrange : colors.lightGray }}
      >
        <View className="flex-row items-center flex-1">
          <View className="w-[60px] h-[60px] rounded-full justify-center items-center mr-4">
            <Image
              source={profileImages[item.host.profileImage ?? 1]}
              className="w-[55px] h-[55px]"
              resizeMode="contain"
            />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <View className="flex-row items-center flex-1 min-w-0">
                <Text
                  className="mr-1 flex-shrink"
                  style={[fonts.smallTitle, { color: colors.orange, fontSize: 15 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.host.nickname ?? "익명"}
                </Text>

                <Text style={[fonts.smallText, { color: colors.black }]}> 님의 파티 </Text>

                <Text style={[fonts.smallText, { color: colors.black }]} className="ml-2 flex-shrink-0">
                  {item.currentParticipants}/{item.capacity} (명)
                </Text>
              </View>

              <View className="ml-2">
                <View className="px-2 py-[2px] rounded-md" style={{ borderWidth: 1, borderColor: color }}>
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
              {truncateText(item.departure.placeName)} {arrow} {truncateText(item.arrival.placeName)}
            </Text>

            <View className="flex-row flex-wrap mt-3">
              <Tag label={formatDate(item.startAt)} isSelected={selected} />
              <Tag label={formatPartyType(item.type)} isSelected={selected} />
              <Tag label={routeLabel} isSelected={selected} />
              <Tag label={formatGender(item.gender)} isSelected={selected} />
            </View>
          </View>
        </View>

        {showHeart && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleLike?.(item.partyId);
            }}
            className="ml-3"
            activeOpacity={0.9}
          >
            <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={28} color={colors.orange} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}