import React from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type PartyChatLinkModalProps = {
  visible: boolean;
  chatUrl: string;
  onChangeChatUrl: (text: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function PartyChatLinkModal({
  visible,
  chatUrl,
  onChangeChatUrl,
  onCancel,
  onConfirm,
}: PartyChatLinkModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-center bg-black/40">
        <View className="w-11/12 rounded-2xl px-5 py-6" style={{ backgroundColor: colors.white }}>
          <Text style={[fonts.smallTitle, { color: colors.black, marginBottom: 8 }]}>
            카톡 오픈채팅방 링크 입력
          </Text>

          <Text style={[fonts.smallText, { color: colors.darkGray, marginBottom: 10 }]}>
            파티원들과 함께 대화할 오픈채팅방 링크를 입력해주세요.
          </Text>

          <TextInput
            value={chatUrl}
            onChangeText={onChangeChatUrl}
            placeholder="예: https://open.kakao.com/..."
            placeholderTextColor={colors.gray}
            className="border rounded-xl px-3 py-3 mb-4"
            style={{
                borderColor: colors.gray,
                color: colors.black,
            }}
          />

          <View className="flex-row justify-end">
            <TouchableOpacity className="px-3 py-2 mr-2 rounded-lg" onPress={onCancel}>
              <Text style={[fonts.smallText, { color: colors.darkGray }]}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: colors.orange }}
              onPress={onConfirm}
            >
              <Text style={[fonts.smallText, { color: colors.white }]}>확정하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}