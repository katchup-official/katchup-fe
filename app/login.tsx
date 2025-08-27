import { View, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import LoginTitle from "../components/titles/LoginTitle";
import { colors } from "../constants/colors";

const BG_IMG = require("../assets/images/login-background.png");
const LOGO_IMG = require("../assets/images/katchup-logo3.png"); 
const KAKAO_BTN = require("../assets/images/kakao-login-btn.png");

export default function Login() {
  const router = useRouter();

  const moveToSignUp = () => {
    router.push("/signup/nickname");
  }

  return (
      <ImageBackground
        source={BG_IMG}
        resizeMode="cover"
        className="flex-1 justify-center"
        style={{ backgroundColor: colors.white }} 
        imageClassName="opacity-30 mt-24"        
      >
        <View className="flex-1 items-start px-8 justify-center mb-80 ml-5">
          <LoginTitle>취향을</LoginTitle>
          <LoginTitle>함께 하는 동행</LoginTitle>
          <Image
            source={LOGO_IMG}
            className="w-56 h-24 ml-1" 
            resizeMode="contain"
          />
        </View>

        <View className="px-8 mb-10">
          <TouchableOpacity 
            onPress={moveToSignUp}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel="카카오 로그인"
            accessibilityRole="button"
          >
            <Image
              source={KAKAO_BTN}
              resizeMode="contain"
              className="w-full h-[56px]"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
  );
}