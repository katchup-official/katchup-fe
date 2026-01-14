import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, PanResponder, } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import type { PartyItem } from "@/types/party";
import { formatPartyStatus, formatPartyType, formatRoute, formatGender } from "@/utils/formatParty";
import { formatDate, formatTime } from "@/utils/dateTime";
import { profileImages } from "@/utils/profileImgMapper";
import PartyBottomSheetButton from "@/components/buttons/PartyBottomSheetButton";
import PartyChatLinkButton from "@/components/buttons/PartyChatLinkButton";
import ReviewMemberListButton from "../buttons/ReviewMemberListButton";

import { getPartyDetail } from "@/apis/partyApi";

type PartyBottomSheetProps = {
  isVisible: boolean;  
  partyId: number | null;
  onClose: () => void;
  onToggleLike?: (id: number) => void;
};

const { height } = Dimensions.get("window");
const SHEET_HEIGHT = height * 0.72;
const CLOSE_THRESHOLD = 70;

export default function PartyBottomSheet({
  isVisible,
  partyId,
  onClose,
  onToggleLike,
}: PartyBottomSheetProps) {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  const [party, setParty] = useState<PartyItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > CLOSE_THRESHOLD) {
        Animated.timing(translateY, {
          toValue: SHEET_HEIGHT,
          duration: 200,
          useNativeDriver: false,
        }).start(onClose);
      } else {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  })
).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : SHEET_HEIGHT,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [isVisible, translateY]);

  useEffect(() => {
    if (!isVisible) return;
    if (!partyId) return;

    let alive = true;

    (async () => {
      setIsLoading(true);
      try {
        const detail = await getPartyDetail(partyId);
        if (!alive) return;
        setParty(detail);
      } catch (e) {
        console.warn("파티 상세 조회 실패:", e);
        if (!alive) return;
        setParty(null);
        onClose();
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [isVisible, partyId, onClose]);

  if (!isVisible) return null;

  if (isLoading || !party) {
    return (
      <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
        <View className="flex-1">
          <TouchableOpacity style={StyleSheet.absoluteFillObject} activeOpacity={1} onPress={onClose}>
            <View className="flex-1 bg-black/40" />
          </TouchableOpacity>

          <Animated.View
            className="absolute left-0 right-0 rounded-t-3xl"
            style={{
              bottom: 0,
              height: SHEET_HEIGHT,
              backgroundColor: colors.white,
              transform: [{ translateY }],
            }}
            {...panResponder.panHandlers}
          >
            <View className="items-center pt-3 pb-2">
              <View className="w-12 h-1.5 rounded-full" style={{ backgroundColor: colors.gray }} />
            </View>

            <View className="flex-1 items-center justify-center">
              <Text style={[fonts.mediumText, { color: colors.black }]}>
                상세 정보를 불러오는 중...
              </Text>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  const { label: statusLabel, color: statusColor } = formatPartyStatus(
    party.status
  );
  const { label: routeLabel, arrow } = formatRoute(party.routeType);

  const tags = [
    formatDate(party.startAt),
    formatPartyType(party.type),
    ...(party.type !== "SCHEDULE_ONLY" ? [routeLabel] : []),
    formatGender(party.gender),
  ];

  const isJoined = party.role !== "NONE";

  const canViewChatLink =
    party.status === "RECRUIT_COMPLETED" && isJoined && !!party.chatUrl;

  const canShowReviewButton = party.status === "COMPLETED";

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1">
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={onClose}
        >
          <View className="flex-1 bg-black/40" />
        </TouchableOpacity>

        <Animated.View
          className="absolute left-0 right-0 rounded-t-3xl"
          style={{
            bottom: 0,
            height: SHEET_HEIGHT,
            backgroundColor: colors.white,
            transform: [{ translateY }],
          }}
          {...panResponder.panHandlers}
        >
          <View className="items-center pt-3 pb-2">
            <View 
              className="w-12 h-1.5 rounded-full"
              style={{ backgroundColor: colors.gray }}/>
          </View>

          <View className="flex-1 px-6 pt-5 pb-8">
            <View className="flex-1">
              <View className="flex-row items-center mb-5">
                  <Image
                    source={profileImages[party.host.profileImage ?? 1] ?? profileImages[1]}
                    className="w-[76px] h-[76px] rounded-full ml-6 mr-8"
                    resizeMode="cover"
                  />

                  <View className="flex-1">
                    <View className="flex-row items-baseline mb-1">
                      <Text style={[fonts.smallTitle, { color: colors.orange, fontSize: 26 }]}>
                        {party.host.nickname ?? "익명"}
                      </Text>
                      <Text style={[fonts.mediumTitle, { color: colors.black, fontSize: 18 }]}>
                        {" "}님의 파티
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between mt-1">
                      <Text style={[fonts.mediumText, { color: colors.black, fontSize: 17 }]}>
                        모집 인원 : {party.currentParticipants} / {party.capacity} (명)
                      </Text>

                      <View
                        className="px-2 py-[2px] rounded-md mr-6"
                        style={{ borderWidth: 1, borderColor: statusColor }}
                      >
                        <Text style={[fonts.mediumText, { color: statusColor }]}>{statusLabel}</Text>
                      </View>
                    </View>
                  </View>
              </View>

              <View 
                className="h-[2px] mb-4"
                style={{ backgroundColor: colors.orange }}
              />

              <Text className="mb-3 text-center" style={[fonts.smallTitle, { color: colors.black, fontSize: 24 }]}>
                {party.departure.placeName} {arrow} {party.arrival.placeName}
              </Text>

              <View className="border rounded-xl px-4 py-3 mb-4" style={{ borderColor: colors.orange }}>
                <Text style={[fonts.smallText, { color: colors.black }]}>
                  • 출발 시간: {formatTime(party.startAt)}
                </Text>
              </View>

              <View className="flex-row flex-wrap mb-4">
                {tags.map((tag, index) => (
                  <View key={index} className="px-3 py-1 rounded-xl bg-[#FFD7D0] mr-2 mb-2">
                    <Text style={[fonts.smallText, { color: colors.black }]}>{tag}</Text>
                  </View>
                ))}
              </View>

              {party.description && (
                <View className="bg-gray-200 rounded-xl px-4 py-3 mb-6">
                  <Text style={[fonts.smallText, { color: colors.black }]}>
                    {party.description}
                  </Text>
                </View>
              )}
            </View>

            {canViewChatLink && (
              <PartyChatLinkButton
                chatUrl={party.chatUrl!}
              />
            )}

            {canShowReviewButton && (
              <ReviewMemberListButton 
                partyId={party.partyId}
                onClose={onClose}
              />
            )}

            <PartyBottomSheetButton
              party={party}
              onToggleLike={onToggleLike}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}