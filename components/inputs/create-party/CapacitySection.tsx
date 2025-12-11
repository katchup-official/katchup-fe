import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  type TextInput as RNTextInput,
} from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import ShortToast from "@/components/toasts/ShortToast";

type CapacitySectionProps = {
  capacity: string;
  onChangeCapacity: (value: string) => void;
  inputRef: React.RefObject<RNTextInput| null>;
};

export default function CapacitySection({
  capacity,
  onChangeCapacity,
  inputRef,
}: CapacitySectionProps) {
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg("");
    }, 1500);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
            inputRef.current?.focus();
        }}
        className="flex-row items-center justify-between"
      >
      <Text
        style={[
        fonts.mediumText,
        { color: colors.black, fontSize: 17 },
        ]}
      >
        모집 인원
      </Text>

      <View
        className="flex-row items-center"
        style={{ marginTop: 10 }}
      >
        <View
          style={{
            minWidth: 60,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: colors.gray,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TextInput
            ref={inputRef}
            value={capacity}
            keyboardType="number-pad"
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, "");

              if (numeric === "") {
                onChangeCapacity("");
                return;
              }

              const num = Number(numeric);

              if (num > 20) {
                onChangeCapacity("");
                showToast("20명 이내여야 합니다.");
                return;
              }

              onChangeCapacity(numeric);
            }}
          style={[
          fonts.mediumText,
          {
            color: colors.black,
            textAlign: "center",
            paddingVertical: 0,
          },
          ]}
        />
        </View>
        <Text
          style={[
              fonts.mediumText,
              { marginLeft: 4, color: colors.darkGray, fontSize: 14 },
          ]}
          >
          (명)
        </Text>
      </View>
    </TouchableOpacity>

    {toastMsg !== "" && <ShortToast message={toastMsg} />}
  </>      
  );
}