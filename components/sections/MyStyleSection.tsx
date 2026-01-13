import React from "react";
import { View, Text } from "react-native";
import { colors, styleColors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import StyleRow from "./StyleRow";

import type { Member } from "@/types/member";

type MyStyleSectionProps = {
  member: Member;
};

export default function MyStyleSection({ member }: MyStyleSectionProps) {
  const style = member.style;

  if (!style) return null;

  return (
    <View
      className="mx-6 mt-10 p-5 rounded-2xl"
      style={{ borderWidth: 1.5, borderColor: colors.orange }}
    >
      <Text
        style={[
          fonts.smallTitle,
          {
            color: colors.orange,
            textAlign: "center",
            marginBottom: 24,
          },
        ]}
      >
        성향 지표
      </Text>

      <StyleRow
        leftLabel="외향형"
        rightLabel="내향형"
        leftValue={style.eScore}
        rightValue={style.iScore}
        barColor={styleColors.style1}
        icon="people-outline"
      />

      <StyleRow
        leftLabel="가수 중심"
        rightLabel="장르 중심"
        leftValue={style.artistScore}
        rightValue={style.genreScore}
        barColor={styleColors.style2}
        icon="musical-notes-outline"
      />

      <StyleRow
        leftLabel="기록형"
        rightLabel="몰입형"
        leftValue={style.recordScore}
        rightValue={style.immerseScore}
        barColor={styleColors.style3}
        icon="headset-outline"
      />

      <StyleRow
        leftLabel="호응형"
        rightLabel="관람형"
        leftValue={style.frontScore}
        rightValue={style.backScore}
        barColor={styleColors.style4}
        icon="happy-outline"
        isLast
      />
    </View>
  );
}

