import React from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

type StyleRowProps = {
  leftLabel: string;
  rightLabel: string;
  leftValue: number;
  rightValue: number;
  barColor: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  isLast?: boolean;
};

const ICON_SIZE = 44;
const TRACK_HEIGHT = 22;

export default function StyleRow({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  barColor,
  icon,
  isLast = false,
}: StyleRowProps) {
  const [trackWidth, setTrackWidth] = React.useState(0);

  const onTrackLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setTrackWidth((prev) => (prev === w ? prev : w));
  };

  const half = trackWidth / 2;

  const leftFillPx = half * (Math.max(0, Math.min(100, leftValue)) / 100);
  const rightFillPx = half * (Math.max(0, Math.min(100, rightValue)) / 100);

  const iconLeftPx = half - ICON_SIZE / 2;

  return (
    <View className={isLast ? "mb-4" : "mb-8"}>
      <View className="flex-row justify-between mb-2 px-1">
        <Text style={[fonts.smallText, { color: colors.black }]}>
          {leftLabel} {leftValue}%
        </Text>
        <Text style={[fonts.smallText, { color: colors.black }]}>
          {rightLabel} {rightValue}%
        </Text>
      </View>

      <View
        onLayout={onTrackLayout}
        style={{
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: "#D9D9D9",
          overflow: "visible",
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            right: half,
            top: 0,
            height: TRACK_HEIGHT,
            width: leftFillPx,
            backgroundColor: barColor,
            borderTopLeftRadius: TRACK_HEIGHT / 2,
            borderBottomLeftRadius: TRACK_HEIGHT / 2,
          }}
        />

        <View
          style={{
            position: "absolute",
            left: half,
            top: 0,
            height: TRACK_HEIGHT,
            width: rightFillPx,
            backgroundColor: barColor,
            borderTopRightRadius: TRACK_HEIGHT / 2,
            borderBottomRightRadius: TRACK_HEIGHT / 2,
          }}
        />

        <View
          style={{
            position: "absolute",
            top: -(ICON_SIZE - TRACK_HEIGHT) / 2,
            left: iconLeftPx,
            width: ICON_SIZE,
            height: ICON_SIZE,
            borderRadius: ICON_SIZE / 2,
            backgroundColor: colors.white,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 4,
            borderColor: barColor,
          }}
        >
          <Ionicons name={icon} size={22} color={barColor} />
        </View>
      </View>
    </View>
  );
}