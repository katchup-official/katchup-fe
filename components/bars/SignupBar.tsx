import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

type SignupBarProps = {
  progressWidth: string;
  showBack?: boolean;
  onBack?: () => void;  
};

export default function SignupBar({
  progressWidth,
  showBack = false,
  onBack,
}: SignupBarProps) {
  return (
    <View className="px-6 pt-2 pb-3">
        <TouchableOpacity
          onPress={onBack}
          className="w-8 h-8 items-center justify-center -ml-1 mt-3 mb-3"
        >
        {showBack && (
          <Ionicons name="chevron-back" size={28} color={colors.black} />
        )}
        </TouchableOpacity>
      <View 
        className="mt-2 h-[3px] rounded-full overflow-hidden"
        style={{ backgroundColor: colors.gray }}
        >
        <View
          className={["h-full", progressWidth, showBack ? "ml-auto" : ""].join(
            " "
          )}
          style={{ backgroundColor: colors.orange }}
        />
      </View>
    </View>
  );
}