import { useState, useMemo, useCallback } from "react";
import { View, KeyboardAvoidingView, Platform, SafeAreaView, 
    TouchableWithoutFeedback, Keyboard
 } from "react-native";
import { useRouter } from "expo-router";

import SignupTitle from "@/components/titles/SignupTitle";
import SignupBar from "@/components/bars/SignupBar";
import SignupButton from "@/components/buttons/SignupButton";

export default function MyLocationScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1">
                        <SignupBar
                            currentStep={3}
                            showBack
                            onBack={() => router.back()}
                        />
                        <SignupTitle
                            mainText="Location"
                            subText="내 위치를 설정해주세요"
                            showIcon={false}
                        />
                        <SignupButton
                            label="회원가입 완료"
                            onPress={() => router.push("/signup/greeting")}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
    
}