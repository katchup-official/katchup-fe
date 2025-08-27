import { Text } from "react-native";
import type { ReactNode } from "react"; 
import { fonts } from "../../constants/fonts";

interface TitleTextProps {
  children: ReactNode;
}

export default function LoginTitle({ children }: TitleTextProps) {
  return (
    <Text
      style={fonts.largeTitle}
      className="text-gray-900 mb-2 text-left w-full"
    >
      {children}
    </Text>
  );
}