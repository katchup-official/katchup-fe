import { useState, useMemo } from "react";
import { View, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard, SafeAreaView,
 } from "react-native";
import { useRouter } from "expo-router";

import SignupTitle from "@/components/titles/SignupTitle";
import SignupBar from "@/components/bars/SignupBar";
import NicknameInput from "@/components/inputs/NicknameInput";
import SignupButton from "@/components/buttons/SignupButton";

export default function NicknameScreen() {
    const router = useRouter();

    const [nickname,setNickname] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [dupError, setDupError] = useState<string | null>(null);

    // 닉네임 정규식(1-8자, 공백 불가, 한글/영어/숫자/특수문자 허용)
    const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-]{1,8}$/;

    const isLengthValid = nicknameRegex.test(nickname);

    async function verifyNickname(name: string) {
        //닉네임 중복확인
    }

    function onChangeText(text: string) {
        // 8글자 제한
        const next = text.slice(0, 8);
        setNickname(next);
        setDupError(null);
    }

    function onEndEditing() {
        if (isLengthValid) {
        verifyNickname(nickname);
        }
    }

    const canSubmit = useMemo(() => {
        return isLengthValid && !dupError && !isChecking;
    }, [isLengthValid, dupError, isChecking]);

    async function onSubmit() {
        if (!canSubmit) return;
        router.push("/signup/style-test"); 
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1">
                        <SignupBar currentStep={1} />
                        <SignupTitle mainText="Hi, There" subText="닉네임을 입력해주세요" showIcon={true} />
                        <NicknameInput
                            value={nickname}
                            onChangeText={onChangeText}
                            onEndEditing={onEndEditing}
                            placeholder="한글/영어/숫자/특수문자 조합 최대 8글자"
                            maxLength={8}
                            errorMessage={
                                dupError
                                ? "* 이미 사용 중인 닉네임입니다."
                                : !isLengthValid && nickname.length > 0
                                ? "* 닉네임은 1~8 글자로 입력해주세요."
                                : null
                            }
                            successMessage={
                                isLengthValid && !dupError && nickname.length > 0
                                ? "* 사용 가능한 닉네임입니다."
                                : null
                            }
                            />
                        <SignupButton
                            label="다음"
                            onPress={onSubmit}
                            disabled={!canSubmit}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}