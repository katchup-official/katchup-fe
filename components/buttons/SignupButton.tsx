import { View, Text, TouchableOpacity } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

type SignupButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function SignupButton({
  label,
  onPress,
  disabled = false,
}: SignupButtonProps) {
  return (
    <View className="px-6 mt-8">
      <TouchableOpacity
        className="w-full rounded-md py-6 items-center"
        style={{
          backgroundColor: disabled ? colors.gray : colors.orange,
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[fonts.largeText, { color: colors.white }]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}