import { View, Text, TextInput } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

type NicknameInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onEndEditing?: () => void;
  placeholder?: string;
  errorMessage?: string | null;
  successMessage?: string | null;
  maxLength?: number;
};

export default function NicknameInput({
  value,
  onChangeText,
  onEndEditing,
  placeholder = "",
  errorMessage,
  successMessage,
  maxLength = 50,
}: NicknameInputProps) {
  const hasError = !!errorMessage;
  const hasSuccess = !!successMessage && !hasError;

  return (
    <View className="px-6 mt-6">
      <View
        className="w-full rounded-md px-4 py-7"
        style={{
          borderWidth: 1,
          borderColor: hasError ? colors.red : colors.gray,
          backgroundColor: colors.white,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={maxLength}
          style={[fonts.mediumText, { fontSize: 16, color: colors.black }]}
          returnKeyType="done"
        />
      </View>

      {hasError ? (
        <Text
          style={[fonts.mediumText, { fontSize: 16, color: colors.red, textAlign: "right" }]}
          className="mt-3"
        >
          {errorMessage}
        </Text>
      ) : hasSuccess ? (
        <Text
          style={[fonts.mediumText, { fontSize: 16, color: colors.green, textAlign: "right" }]}
          className="mt-3"
        >
          {successMessage}
        </Text>
      ) : null}
    </View>
  );
}