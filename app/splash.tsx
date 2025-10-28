// app/splash.tsx
import { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../constants/colors";

const LOGO2 = require("../assets/images/katchup-logo2.png");
const LOGO3 = require("../assets/images/katchup-logo3.png");

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.replace("/login");
      } catch (e) {
        console.error(e);
        router.replace("/login");
      }
    };
    prepareApp();
  }, [router]);

  return (
    <View 
        className="flex-1 justify-between items-center py-10"
        style={{ backgroundColor: colors.white }} 
    >
      <View className="flex-1 justify-center items-center">
        <Image
          source={LOGO2}
          className="w-[200px] h-[100px]"
          resizeMode="contain"
        />
        <Image
          source={LOGO3}
          className="w-[170px] h-[85px]"
          resizeMode="contain"
        />
      </View>

      <Text 
        className="text-[17px]"
        style={{ color: colors.darkGray }}>
        © 2025. katchup All rights reserved.
      </Text>
    </View>
  );
}