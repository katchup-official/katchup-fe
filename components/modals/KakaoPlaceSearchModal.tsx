import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import type { KakaoPlace } from "@/types/kakao-place";
import { searchKakaoPlaces } from "@/apis/kakaoApi"

type KakaoPlaceSearchModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (place: KakaoPlace) => void;
  title?: string;
};

export default function KakaoPlaceSearchModal({
  visible,
  onClose,
  onSelect,
  title = "장소 검색",
}: KakaoPlaceSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchKakaoPlaces(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place: KakaoPlace) => {
    onSelect(place);
    setQuery("");
    setResults([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl px-5 pt-5 pb-24 max-h-[85%]">
            <Text
              style={[
                fonts.mediumText,
                { fontSize: 18, color: colors.black, marginBottom: 12 },
              ]}
            >
              {title}
            </Text>

            <View className="flex-row items-center mb-4">
              <View className="flex-1 border rounded-xl px-3 py-2 border-gray-300">
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="장소명을 입력하세요"
                  placeholderTextColor={colors.gray}
                  style={[fonts.mediumText, { color: colors.black }]}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
              </View>
              <TouchableOpacity
                className="ml-2 rounded-xl justify-center items-center"
                style={{
                  backgroundColor: colors.orange,
                  height: 40,
                  paddingHorizontal: 20,
                  minWidth: 70,
                }}
                onPress={handleSearch}
              >
                <Text style={[fonts.smallText, { color: "#fff" }]}>검색</Text>
              </TouchableOpacity>
            </View>

            {loading && (
              <View className="py-4 items-center">
                <ActivityIndicator />
              </View>
            )}

            <FlatList
              data={results}
              keyExtractor={(item) => item.kakaoMapId}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                  <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => handleSelect(item)}
                  >
                  <Text
                      style={[
                      fonts.mediumText,
                      { color: colors.black, marginBottom: 2 },
                      ]}
                  >
                      {item.placeName}
                  </Text>
                  {item.roadAddressName ? (
                      <Text style={[fonts.smallText, { color: colors.darkGray }]}>
                      {item.roadAddressName}
                      </Text>
                  ) : (
                      <Text style={[fonts.smallText, { color: colors.darkGray }]}>
                      {item.addressName}
                      </Text>
                  )}
                  </TouchableOpacity>
              )}
              ListEmptyComponent={
                  !loading ? (
                  <View className="py-6 items-center">
                      <Text style={[fonts.smallText, { color: colors.gray }]}>
                      검색 결과가 없습니다.
                      </Text>
                  </View>
                  ) : null
              }
              />

            <TouchableOpacity
              className="mt-4 self-center px-4 py-2 rounded-xl"
              style={{ backgroundColor: colors.lightGray }}
              onPress={onClose}
            >
              <Text style={[fonts.smallText, { color: colors.darkGray }]}>
                닫기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}