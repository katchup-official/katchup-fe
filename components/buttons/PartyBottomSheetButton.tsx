import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import PartyChatLinkModal from "../modals/PartyChatLinkModal";
import type { PartyItem } from "@/types/party";

type PartyBottomSheetButtonProps = {
  party: PartyItem;
  onToggleLike?: (id: number) => void;
};

export default function PartyBottomSheetButton({
  party,
  onToggleLike,
}: PartyBottomSheetButtonProps) {
  const isHost = party.role === "HOST";

  const [partyStatus, setPartyStatus] = useState<PartyItem["status"]>(
    party.status
  );
  const [isPartyJoined, setIsPartyJoined] = useState(false);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [chatUrl, setChatUrl] = useState(party.chatUrl ?? "");

  useEffect(() => {
    setPartyStatus(party.status);
    setIsPartyJoined(false);
  }, [party]);

  const isRecruiting = partyStatus === "RECRUITING";
  const isRecruitCompleted = partyStatus === "RECRUIT_COMPLETED";
  const isCompleted = partyStatus === "COMPLETED";

  const isButtonDisabled = isRecruitCompleted || isCompleted;

  const handlePartyJoin = () => {
    if (!isRecruiting || isHost || isButtonDisabled) return;
    setIsPartyJoined((prev) => !prev);
  };

  const handlePartyConfirm = () => {
    if (!isRecruiting || !isHost || isButtonDisabled) return;
    setIsChatModalVisible(true);
  };

  // 오카방 링크 입력 후 파티 status 변경
  const handleChatConfirm = () => {
    setPartyStatus("RECRUIT_COMPLETED");
    setIsChatModalVisible(false);
  };

  const getButtonBackgroundColor = () => {
  if (isCompleted || isRecruitCompleted) return colors.gray;
  if (isRecruiting && isHost) return colors.green;
  if (isRecruiting && !isHost && isPartyJoined) return colors.darkGray;
  return colors.orange;
};

const getButtonLabel = () => {
  if (isCompleted) return "파티 종료";
  if (isRecruitCompleted) return "파티 모집마감";
  if (isRecruiting && isHost) return "파티 확정하기";
  if (isRecruiting && !isHost) return isPartyJoined ? "파티 참여취소" : "파티 참여하기";
  return "";
};

const buttonBackgroundColor = getButtonBackgroundColor();
const buttonLabel = getButtonLabel();

  let guideText: string | null = null;
  if (isRecruiting) {
    if (isHost) {
      guideText = "* 파티 확정 후 취소가 불가합니다.";
    } else if (isPartyJoined) {
      guideText = "* 파티 참여취소는 파티 확정 전까지만 가능합니다.";
    }
  }

  return (
    <>
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-12 h-12 rounded-xl items-center justify-center"
          style={{
            borderWidth: 1,
            borderColor: colors.orange,
          }}
          onPress={() => onToggleLike?.(party.partyId)}
        >
          <Ionicons
            name={party.isLiked ? "heart" : "heart-outline"}
            size={26}
            color={colors.orange}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isButtonDisabled}
          className="flex-1 h-12 ml-3 rounded-xl items-center justify-center"
          style={{
            backgroundColor: buttonBackgroundColor,
            opacity: isButtonDisabled ? 0.6 : 1,
          }}
          onPress={
            isButtonDisabled
              ? undefined
              : isHost
              ? handlePartyConfirm
              : handlePartyJoin
          }
        >
          <Text style={[fonts.mediumText, { color: colors.white }]}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className="mt-2 ml-5 h-[18px] justify-start"
      >
        {guideText && (
          <Text
            className="ml-11"
            style={[fonts.smallText, { color: colors.darkGray }]}
          >
            {guideText}
          </Text>
        )}
      </View>

      <TouchableOpacity activeOpacity={0.7} className="mt-3 self-end">
        <Text
          style={[
            fonts.smallText,
            { color: colors.black, textDecorationLine: "underline" },
          ]}
        >
          신고하기
        </Text>
      </TouchableOpacity>
      <PartyChatLinkModal
        visible={isChatModalVisible}
        chatUrl={chatUrl}
        onChangeChatUrl={setChatUrl}
        onCancel={() => setIsChatModalVisible(false)}
        onConfirm={handleChatConfirm}
      />
    </>
  );
}