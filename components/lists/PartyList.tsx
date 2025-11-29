import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import type { PartyStatus, PartyType, RouteType, GenderType, PartyItem, } from "@/mocks/parties";

type PartyListProps = {
  partyData: PartyItem[];
  onToggle: (id: number) => void;
};

const profileImages: Record<number, any> = {
  1: require("@/assets/images/profiles/tomato.png"),
  2: require("@/assets/images/profiles/flower.png"),
  3: require("@/assets/images/profiles/ketchup.png"),
  4: require("@/assets/images/profiles/basket.png"),
};

const truncateText = (text: string, length = 6) => {
  return text.length > length ? text.slice(0, length) + ".." : text;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${month}/${day}`;
};

const formatPartyStatus = (status: PartyStatus) => {
  switch (status) {
    case "RECRUITING":
      return { label: "진행중", color: colors.orange };
    case "FULL":
      return { label: "모집마감", color: colors.black };
    case "CLOSED":
      return { label: "파티완료", color: colors.darkGray };
    default:
      return { label: "", color: colors.orange };
  }
};

const formatPartyType = (type: PartyType) => {
  switch (type) {
    case "SCHEDULE_AND_TRANSPORT":
      return "교통&일정";
    case "SCHEDULE_ONLY":
      return "일정만";
    case "TRANSPORT_ONLY":
      return "교통만";
    default:
      return "";
  }
};

const formatRoute = (route: RouteType) => {
  switch (route) {
    case "ONE_WAY":
      return { label: "편도", arrow: "→" };
    case "ROUND_TRIP":
      return { label: "왕복", arrow: "↔" };
    default:
      return { label: "", arrow: "→" };
  }
};

const formatGender = (gender: GenderType) => {
  switch (gender) {
    case "FEMALE":
      return "여자만";
    case "MALE":
      return "남자만";
    case "ALL":
      return "성별무관";
    default:
      return "";
  }
};

type TagProps = {
  label: string;
};

const Tag = ({ label }: TagProps) => (
  <View 
    className="px-3 py-1 rounded-lg mr-2 mb-2" 
    style={{ backgroundColor: "#E9E9E9" }}>
    <Text 
      className="text-[11px] font-[Paperlogy-Regular]"
      style={{ color: colors.black }}
    >
      {label}</Text>
  </View>
);

export default function PartyList({ partyData, onToggle }: PartyListProps) {

  return (
    <View className="px-4 py-2">
      {partyData.map((item) => {
        const { label, color } = formatPartyStatus(item.status);
        const { label: routeLabel, arrow } = formatRoute(item.routeType);

        return (
        <View
          key={item.partyId}
          className="flex-row items-center justify-between px-5 py-5 mb-4 rounded-2xl"
          style={{ backgroundColor: "#FAF9F7" }}
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
              <View className="flex-row items-center mb-1">
                <Text className="mr-1" style={[fonts.smallText, { color: colors.orange }]}>
                  {item.host.nickname ?? "익명"}
                </Text>
                <Text style={[fonts.smallText, { color: colors.black }]}>님의 파티</Text>

                <Text style={[fonts.smallText, { color: colors.darkGray, marginLeft: 6 }]}>
                  {item.currentParticipants}/{item.capacity} (명)
                </Text>
                <View
                  className="ml-2 px-2 py-[2px] rounded-md"
                  style={{ 
                    borderWidth: 1,
                    borderColor: color,
                  }}
                >
                  <Text style={[fonts.smallText, { color }]}>{label}</Text>
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
                <Tag label={formatDate(item.startAt)} />
                <Tag label={formatPartyType(item.type)} />
                <Tag label={routeLabel} />
                <Tag label={formatGender(item.gender)} />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => onToggle(item.partyId)} 
            className="ml-3"
          >
            <Ionicons
              name={item.isLiked ? "heart" : "heart-outline"}
              size={28}
              color={colors.orange}
            />
          </TouchableOpacity>
        </View>
        );
      })}
    </View>
  );
}