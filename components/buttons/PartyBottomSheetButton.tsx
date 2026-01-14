import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import PartyChatLinkModal from "../modals/PartyChatLinkModal";
import type { PartyItem } from "@/types/party";
import ShortToast from "@/components/toasts/ShortToast";

import axios from "axios";
import { confirmParty } from "@/apis/partyApi";

type PartyBottomSheetButtonProps = {
  party: PartyItem;
  onToggleLike?: (id: number) => void;
  onConfirmed?: () => Promise<void> | void;
};

export default function PartyBottomSheetButton({
  party,
  onToggleLike,
  onConfirmed,
}: PartyBottomSheetButtonProps) {
  const isHost = party.role === "HOST";

  const [partyStatus, setPartyStatus] = useState<PartyItem["status"]>(
    party.status
  );
  const [isPartyJoined, setIsPartyJoined] = useState(false);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [chatUrl, setChatUrl] = useState(party.chatUrl ?? "");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    setPartyStatus(party.status);
    setIsPartyJoined(false);
    setChatUrl(party.chatUrl ?? "");
  }, [party]);

  const isRecruiting = partyStatus === "RECRUITING";
  const isRecruitCompleted = partyStatus === "RECRUIT_COMPLETED";
  const isCompleted = partyStatus === "COMPLETED";

  const isButtonDisabled = isRecruitCompleted || isCompleted || isConfirming;;

  const handlePartyJoin = () => {
    if (!isRecruiting || isHost || isButtonDisabled) return;
    setIsPartyJoined((prev) => !prev);
  };

  const handlePartyConfirm = () => {
    if (!isRecruiting || !isHost || isButtonDisabled) return;
    setIsChatModalVisible(true);
  };

  // 오카방 링크 입력 후 파티 status 변경
  const handleChatConfirm = async () => {
    if (!party.partyId) return;

    const trimmed = chatUrl.trim();

    if (!trimmed) {
      setToastMessage("오픈채팅방 링크를 입력해주세요.");
      setTimeout(() => setToastMessage(null), 1500);
      return;
    }

    // 카카오 오픈채팅 URL 검증
    const isValid = /^https:\/\/open\.kakao\.com\/o\/.+/.test(trimmed);
    if (!isValid) {
      setToastMessage("올바른 오픈채팅방 링크를 입력해주세요.");
      setTimeout(() => setToastMessage(null), 1500);
      return;
    }

    try {
      setIsConfirming(true);

      await confirmParty(party.partyId, { chatUrl: trimmed });

      await onConfirmed?.();
      setPartyStatus("RECRUIT_COMPLETED");
      setIsChatModalVisible(false);

      setToastMessage("파티가 확정되었습니다!");
      setTimeout(() => setToastMessage(null), 1500);
    } catch (e: unknown) {
      let msg = "파티 확정에 실패했어요. 다시 시도해주세요.";
      if (axios.isAxiosError(e)) {
        const data = e.response?.data as any;
        const serverMsg =
          data?.data?.message ||
          data?.message ||
          data?.error ||
          data?.detail ||
          data?.title;

        if (typeof serverMsg === "string" && serverMsg.trim()) {
          msg = serverMsg;
        }

        console.warn("파티 확정 실패:", e.response?.status, e.response?.data);
      } else {
        console.warn("파티 확정 실패:", e);
      }

      throw new Error(msg);
    } finally {
      setIsConfirming(false);
    }
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