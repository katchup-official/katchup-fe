import { View, Text } from "react-native";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-3xl font-extrabold text-yellow-400 underline">
        Tailwind 적용 성공!!! 야호
      </Text>
      <View className="mt-6 h-16 w-16 rounded-full bg-green-500" />
    </View>
  );
}