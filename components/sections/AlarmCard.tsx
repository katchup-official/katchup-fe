import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { AlarmItem } from "@/types/alarm";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { formatRoute } from "@/utils/formatParty";
import { profileImages } from "@/utils/profileImgMapper";

type Props = {
  item: AlarmItem;
  onAccept?: (partyId: number) => void;
  onReject?: (partyId: number) => void;
  onReview?: (partyId: number) => void;
};

function BadgeButton({
  label,
  variant,
  onPress,
}: {
  label: string;
  variant: "accept" | "reject"
  onPress?: () => void;
}) {
  const bg = variant === "accept" ? colors.orange : "#3B2F2A";
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="px-5 py-2 rounded-xl"
      style={{ backgroundColor: bg }}
    >
      <Text style={[fonts.smallText, { color: colors.white }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function AlarmCard({ item, onAccept, onReject, onReview }: Props) {
  const { arrow } = formatRoute(item.routeType);
  const title = `${item.departure.placeName} ${arrow} ${item.arrival.placeName}`;

  switch (item.type) {
    case "HOST_REQUEST": {
      const profile =
        profileImages[item.guest.profileImage ?? 1];
      const nickname = item.guest.nickname ?? "익명";

      return (
        <View className="bg-[#F6F6F6] rounded-2xl px-5 py-4 flex-row items-center">
          <View className="w-[72px] h-[72px] rounded-full items-center justify-center mr-4">
            <Image source={profile} className="w-[56px] h-[56px] rounded-full" />
          </View>

          <View className="flex-1">
            <Text style={[fonts.smallTitle, { color: colors.black, fontSize: 20 }]} numberOfLines={1}>
              {title}
            </Text>

            <Text style={[fonts.smallText, { color: colors.black, marginTop: 6 }]} numberOfLines={2}>
              <Text style={[fonts.smallText, { color: colors.orange }]}>{nickname}</Text>
              {" "}님께서 참여요청을 보내셨습니다!
            </Text>

            <View className="flex-row mt-3">
              <BadgeButton label="승인" variant="accept" onPress={() => onAccept?.(item.partyId)} />
              <View style={{ width: 10 }} />
              <BadgeButton label="거절" variant="reject" onPress={() => onReject?.(item.partyId)} />
            </View>
          </View>
        </View>
      );
    }

    case "GUEST_RESULT": {
      const profile =
        profileImages[item.host.profileImage ?? 1];
      const nickname = item.host.nickname ?? "익명";

      const text =
        item.requestResult === "ACCEPTED"
          ? "님께서 참여요청을 승인하셨습니다!"
          : item.requestResult === "REJECTED"
          ? "님께서 참여요청을 거절하셨습니다!"
          : "님의 참여요청이 처리 대기중입니다.";

      return (
        <View className="bg-[#F6F6F6] rounded-2xl px-5 py-4 flex-row items-center">
          <View className="w-[72px] h-[72px] rounded-full items-center justify-center mr-4">
            <Image source={profile} className="w-[56px] h-[56px] rounded-full" />
          </View>

          <View className="flex-1">
            <Text style={[fonts.smallTitle, { color: colors.black, fontSize: 20 }]} numberOfLines={1}>
              {title}
            </Text>

            <Text style={[fonts.smallText, { color: colors.black, marginTop: 6 }]} numberOfLines={2}>
              <Text style={[fonts.smallText, { color: colors.orange }]}>{nickname}</Text>
              {" "}{text}
            </Text>
          </View>
        </View>
      );
    }

    case "MEMBER_REVIEW": {

      return (
        <View className="rounded-2xl px-5 py-4 flex-row items-center" style={{ backgroundColor: "#EAF6FF" }}>
          <View
            className="w-[72px] h-[72px] items-center justify-center mr-4"
            style={{ borderRadius: 9999 }}
          >
            <View
              className="w-[56px] h-[56px] items-center justify-center"
              style={{ backgroundColor: "#7C88D6", borderRadius: 9999 }}
            >
            <Ionicons name="happy" size={40} color={colors.white} />
          </View>
        </View>

          <View className="flex-1">
            <Text style={[fonts.smallTitle, { color: colors.black, fontSize: 20 }]} numberOfLines={1}>
              {title}
            </Text>

            <Text style={[fonts.smallText, { color: colors.black, marginTop: 6 }]} numberOfLines={2}>
              파티에 잘 다녀오셨나요?{"\n"}
              <Text style={[fonts.smallText, { color: "#7C88D6" }]}>
                파티원들에 대한 평가를 진행해주세요:)
              </Text>
            </Text>
          </View>
        </View>
      );
    }
    default:
      return null;
  }
}