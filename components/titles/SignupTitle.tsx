import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

type SignupTitleProps = {
  mainText?: string;
  subText?: string;
  showIcon?: boolean;                                   
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconSize?: number;
  iconColor?: string;
};

export default function SignupTitle({
  mainText,
  subText,
  showIcon,
  iconName = "hand-right",
  iconSize = 50,
  iconColor = colors.orange,
}: SignupTitleProps) {
  return (
    <>
      <View className="px-6 flex-row items-center ml-5 mt-12">
        <Text
          style={[fonts.extraLargeTitle, { color: colors.orange }]}
          className="mr-2"
        >
          {mainText}
        </Text>
        {showIcon && (
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        )}
      </View>

      <View className="px-6 flex-row items-center ml-5 mt-2 mb-12">
        <Text style={[fonts.mediumTitle, { color: colors.black }]}>
          {subText}
        </Text>
      </View>
    </>
  );
}