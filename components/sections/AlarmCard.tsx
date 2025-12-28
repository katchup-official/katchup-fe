import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { AlarmItem } from "@/types/alarm";
import { colors, reviewColors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { formatRoute } from "@/utils/formatParty";
import { profileImages } from "@/utils/profileImgMapper";

type Props = {
  item: AlarmItem;
  onAccept?: (partyId: number) => void;
  onReject?: (partyId: number) => void;
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
  const bg = variant === "accept" ? colors.orange : colors.darkGray;
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

export default function AlarmCard({ item, onAccept, onReject }: Props) {
  const router = useRouter();
  const { arrow } = formatRoute(item.routeType);
  const title = `${item.departure.placeName} ${arrow} ${item.arrival.placeName}`;

  switch (item.type) {
    case "HOST_REQUEST": {
      const profile =
        profileImages[item.guest.profileImage ?? 1];
      const nickname = item.guest.nickname ?? "익명";

      return (
        <View 
          className="rounded-2xl px-5 py-4 flex-row items-center"
          style={{ backgroundColor: colors.lightGray }}
        >
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
        <View 
          className="rounded-2xl px-5 py-4 flex-row items-center"
          style={{ backgroundColor: colors.lightGray }}
        >
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
        <TouchableOpacity 
          className="rounded-2xl px-5 py-4 flex-row items-center" 
          style={{ backgroundColor: reviewColors.cardBg }}
          activeOpacity={0.9}
          onPress={() => {
            router.push({
              pathname: "/review/member-list",
              params: { partyId: item.partyId },
            });
        }}>
          <View
            className="w-[72px] h-[72px] items-center justify-center mr-4"
            style={{ borderRadius: 9999 }}
          >
            <View
              className="w-[56px] h-[56px] items-center justify-center"
              style={{ backgroundColor: reviewColors.primary, borderRadius: 9999 }}
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
              <Text style={[fonts.smallText, { color: reviewColors.primary }]}>
                파티원들에 대한 평가를 진행해주세요:)
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    default:
      return null;
  }
}