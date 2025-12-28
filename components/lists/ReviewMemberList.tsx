import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { profileImages } from "@/utils/profileImgMapper";
import ReviewMemberHeader from "../bars/ReviewMemberHeader";
import ReviewMemberButton from "../buttons/ReviewMemberButton";

import { reviews } from "@/mocks/reviews";
import type { ReviewMemberItem } from "@/types/review";

type ReviewMember = ReviewMemberItem["partyMember"][number];

export default function ReviewMemberList({ partyId }: { partyId: number }) {
  const targetPartyId = partyId || undefined;

  const party = React.useMemo(() => {
    if (!targetPartyId) return reviews[0];
    return reviews.find((r) => r.partyId === targetPartyId) ?? reviews[0];
  }, [targetPartyId]);

  const renderItem = ({ item }: { item: ReviewMember }) => {
    const done = item.isFeedbackGiven;

    return (
      <View className="flex-row items-center justify-between px-5 py-2">
        <View className="flex-row items-center flex-1">
          <View className="w-[70px] h-[70px] rounded-full items-center justify-center mr-4">
            <Image
              source={profileImages[item.profileImage ?? 1]}
              className="w-[48px] h-[48px]"
              resizeMode="contain"
            />
          </View>

          <Text style={[fonts.smallTitle, { color: colors.black, fontSize: 20 }]}>
            {item.nickname ?? "익명"}
          </Text>
        </View>

        <ReviewMemberButton
          isDone={done}
          onPress={() => {
           //API 연동 후 수정예정
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ReviewMemberHeader />
      <FlatList
        data={party?.partyMember ?? []}
        keyExtractor={(m) => String(m.memberId)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      />
    </View>
  );
}