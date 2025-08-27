import { Text } from "react-native";
import type { ReactNode } from "react"; 
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

interface TitleTextProps {
  children: ReactNode;
}

export default function LoginTitle({ children }: TitleTextProps) {
  return (
    <Text
      style={[fonts.largeTitle, { color: colors.black }]}
      className="mb-2 text-left w-full"
    >
      {children}
    </Text>
  );
}