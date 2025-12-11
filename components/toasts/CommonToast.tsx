import React from "react";
import { View, Text } from "react-native";
import { fonts } from "@/constants/fonts";

interface CommonToastProps {
  visible: boolean;
  message: string;
  subMessage?: string;
}

export default function CommonToast({ visible, message, subMessage }
: CommonToastProps) {
  if (!visible) return null;

  return (
    <View
      className="
        absolute bottom-10 left-5 right-5 
        py-[14px] px-4 
        rounded-xl bg-black/80
        justify-center items-center
      "
      style={{
        zIndex: 9999,
        elevation: 9999, 
      }}
    >
      <Text
        style={[
          fonts.mediumText,
          {
            color: "#fff",
            marginBottom: subMessage ? 4 : 0,
          },
        ]}
      >
        {message}
      </Text>

      {subMessage && (
        <Text
          style={[
            fonts.smallText,
            {
              color: "#fff",
              opacity: 0.9,
            },
          ]}
        >
          {subMessage}
        </Text>
      )}
    </View>
  );
}