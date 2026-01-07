import { useState, useMemo, useEffect, useRef } from "react";
import { View, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard, SafeAreaView,
 } from "react-native";
import { useRouter } from "expo-router";

import SignupTitle from "@/components/titles/SignupTitle";
import SignupBar from "@/components/bars/SignupBar";
import NicknameInput from "@/components/inputs/NicknameInput";
import SignupButton from "@/components/buttons/SignupButton";

import { checkNicknameTaken } from "@/apis/onboardingApi";
import { useOnboardingStore } from "@/stores/onBoardingStore";

type NicknameError = "ALREADY_USED" | "ERROR" | null;

export default function NicknameScreen() {
    const router = useRouter();

    const [nickname,setNickname] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [nicknameError, setNicknameError] = useState<NicknameError>(null);
    const [isVerified, setIsVerified] = useState(false);

    // 닉네임 정규식(1-8자, 공백 불가, 한글/영어/숫자/특수문자 허용)
    const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-]{1,8}$/;

    const isLengthValid = nicknameRegex.test(nickname);

    //닉네임 중복확인
    async function verifyNickname(name: string) {
        if (!nicknameRegex.test(name)) return;

        setIsChecking(true);
        try {
            const isTaken = await checkNicknameTaken(name);

            if (name !== nickname) return;

            setNicknameError(isTaken ? "ALREADY_USED" : null);
            setIsVerified(!isTaken);
        } catch (e) {
            setNicknameError("ERROR");
            setIsVerified(false);
        } finally {
            if (name === nickname) setIsChecking(false);
        }
    }

    function onChangeText(text: string) {
        const next = text.slice(0, 8);
        setNickname(next);
        setNicknameError(null);
        setIsVerified(false);
    }

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
            debounceRef.current = null;
    }
        if (!nickname) return;
        if (!isLengthValid) return;

        debounceRef.current = setTimeout(() => {
            verifyNickname(nickname);
        }, 500);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                debounceRef.current = null;
            }
        };
    }, [nickname, isLengthValid]);

    const setStoreNickname = useOnboardingStore((s) => s.setNickname);

    const canProceed = useMemo(() => {
        return isLengthValid && isVerified && !nicknameError && !isChecking;
    }, [isLengthValid, isVerified, nicknameError, isChecking]);

    function handleNext() {
        if (!canProceed) return;

        setStoreNickname(nickname);
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
                            placeholder="한글/영어/숫자/특수문자 조합 최대 8글자"
                            maxLength={8}
                            errorMessage={
                                nicknameError === "ALREADY_USED"
                                ? "* 이미 사용 중인 닉네임입니다."
                                : nicknameError === "ERROR"
                                ? "* 닉네임 확인에 실패했어요. 잠시 후 다시 시도해주세요."
                                : null
                            }
                            successMessage={
                                isVerified && isLengthValid && !nicknameError && nickname.length > 0
                                ? "* 사용 가능한 닉네임입니다."
                                : null
                            }
                            />
                        <SignupButton
                            label="다음"
                            onPress={handleNext}
                            disabled={!canProceed}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}