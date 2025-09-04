import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

type SignupButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  noMargin?: boolean;
  containerStyle?: ViewStyle;
};

export default function SignupButton({
  label,
  onPress,
  disabled = false,
  noMargin = false,
  containerStyle,
}: SignupButtonProps) {
  return (
    <View className={["px-6", noMargin ? "" : "mt-8"].join(" ")} style={containerStyle}>
      <TouchableOpacity
        className="w-full rounded-md py-6 items-center"
        style={{
          backgroundColor: disabled ? colors.gray : colors.orange,
          paddingVertical: 18,
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[fonts.largeText, { color: colors.white, lineHeight: 24 }]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}