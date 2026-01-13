import React from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, styleColors } from "@/constants/colors";
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

const STYLE_ROW_UI = {
  ICON_SIZE: 44,
  TRACK_HEIGHT: 22,
  MIN_FILL_PX: 5,
  TRACK_BG: styleColors.styleBg,
  ICON_BORDER: 4,
} as const;

const clampPct = (v: number) => Math.max(0, Math.min(100, v));

const SCALE_EXP = 0.75;
const scaledRatio = (pct: number) =>
  Math.pow(clampPct(pct) / 100, SCALE_EXP);

const calcFillPx = (half: number, value: number) => {
  const pct = clampPct(value);
  if (pct <= 0) return 0;

  const raw = half * scaledRatio(pct);
  return Math.max(STYLE_ROW_UI.MIN_FILL_PX, raw);
};

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

  const onTrackLayout = React.useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setTrackWidth((prev) => (prev === w ? prev : w));
  }, []);

  const { half, leftFillPx, rightFillPx, iconLeftPx } = React.useMemo(() => {
    const half = trackWidth / 2;

    return {
      half,
      leftFillPx: calcFillPx(half, leftValue),
      rightFillPx: calcFillPx(half, rightValue),
      iconLeftPx: half - STYLE_ROW_UI.ICON_SIZE / 2,
    };
  }, [trackWidth, leftValue, rightValue]);

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
          height: STYLE_ROW_UI.TRACK_HEIGHT,
          borderRadius: STYLE_ROW_UI.TRACK_HEIGHT / 2,
          backgroundColor: STYLE_ROW_UI.TRACK_BG,
          overflow: "visible",
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            right: half,
            top: 0,
            height: STYLE_ROW_UI.TRACK_HEIGHT,
            width: leftFillPx,
            backgroundColor: barColor,
            borderTopLeftRadius: STYLE_ROW_UI.TRACK_HEIGHT / 2,
            borderBottomLeftRadius: STYLE_ROW_UI.TRACK_HEIGHT / 2,
          }}
        />
        <View
          style={{
            position: "absolute",
            left: half,
            top: 0,
            height: STYLE_ROW_UI.TRACK_HEIGHT,
            width: rightFillPx,
            backgroundColor: barColor,
            borderTopRightRadius: STYLE_ROW_UI.TRACK_HEIGHT / 2,
            borderBottomRightRadius: STYLE_ROW_UI.TRACK_HEIGHT / 2,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: -(STYLE_ROW_UI.ICON_SIZE - STYLE_ROW_UI.TRACK_HEIGHT) / 2,
            left: iconLeftPx,
            width: STYLE_ROW_UI.ICON_SIZE,
            height: STYLE_ROW_UI.ICON_SIZE,
            borderRadius: STYLE_ROW_UI.ICON_SIZE / 2,
            backgroundColor: colors.white,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: STYLE_ROW_UI.ICON_BORDER,
            borderColor: barColor,
          }}
        >
          <Ionicons name={icon} size={22} color={barColor} />
        </View>
      </View>
    </View>
  );
}