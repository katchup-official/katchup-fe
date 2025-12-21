import React from "react";
import { View, ImageBackground, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";

import LoginTitle from "../components/titles/LoginTitle";
import { colors } from "../constants/colors";

const BG_IMG = require("../assets/images/login-background.png");
const LOGO3 = require("../assets/images/katchup-logo3.png"); 
const KAKAO_BTN = require("../assets/images/kakao-login-btn.png");

import { getKakaoCode } from "@/apis/auth/kakaoAuth";
import { socialLoginWithCode } from "@/apis/loginApi";
import { getMyMemberInfo } from "@/apis/memberApi";

export default function LoginScreen() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleKakaoLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const code = await getKakaoCode();
      if (!code) throw new Error("인가 코드(code)를 받지 못했습니다.");

      await socialLoginWithCode(code);
      Alert.alert("로그인 성공", "카카오 로그인에 성공했습니다!");

      const me = await getMyMemberInfo();
      const needSignup = !me?.nickname || !me?.style;
      router.replace(needSignup ? "/signup/nickname" : "/mainTabs");
    } catch (e: any) {
      console.error("[KakaoLogin] error:", e);
      Alert.alert("로그인 실패", "카카오 로그인에 실패했습니다.\n잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

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
            source={LOGO3}
            className="w-56 h-24 ml-1" 
            resizeMode="contain"
          />
        </View>

        <View className="px-8 mb-10">
          <TouchableOpacity 
            onPress={handleKakaoLogin}
            activeOpacity={0.8}
            disabled={isLoading}
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