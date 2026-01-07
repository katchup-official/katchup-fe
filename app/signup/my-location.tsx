import { useState } from "react";
import { View, KeyboardAvoidingView, Platform, SafeAreaView, 
    TouchableWithoutFeedback, Keyboard, Alert
 } from "react-native";
import { useRouter } from "expo-router";
import type { KakaoPlace } from "@/types/kakao-place";

import SignupTitle from "@/components/titles/SignupTitle";
import SignupBar from "@/components/bars/SignupBar";
import SignupButton from "@/components/buttons/SignupButton";
import MyLocationInput from "@/components/inputs/MyLocationInput";

import KakaoPlaceSearchModal from "@/components/modals/KakaoPlaceSearchModal";

import { addNickname, addStylesAnswers } from "@/apis/onboardingApi";

import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { useMyLocationStore } from "@/stores/useMyLocationStore";

export default function MyLocationScreen() {
    const router = useRouter();

    const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [locationPlace, setLocationPlace] = useState<KakaoPlace | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nickname = useOnboardingStore((s) => s.nickname);
    const stylesAnswer = useOnboardingStore((s) => s.stylesAnswer);
    const resetOnboarding = useOnboardingStore((s) => s.reset);

    const setMyLocation = useMyLocationStore((s) => s.setMyLocation);

    const handleSelectLocation = (place: KakaoPlace) => {
        setLocation(place.roadAddressName || place.addressName || place.placeName);
        setLocationPlace(place);
        setIsLocationSearchOpen(false);
    };

    const canSubmit =
        !!locationPlace &&
        nickname.trim().length > 0 &&
        stylesAnswer.answers.length > 0 &&
        !isSubmitting;

    const handleSubmit = async () => {
        if (!locationPlace) return;
        if (!nickname.trim()) return;
        if (!stylesAnswer.answers.length) return;

        try {
            setIsSubmitting(true);

            await addNickname({ nickname });

            await addStylesAnswers(stylesAnswer);

            const myLocationPayload = {
                placeName: locationPlace.placeName,
                addressName: locationPlace.addressName,
                roadAddressName: locationPlace.roadAddressName,
                latitude: locationPlace.latitude,
                longitude: locationPlace.longitude,
            };
            setMyLocation(myLocationPayload);

            resetOnboarding();
            router.push("/signup/greeting");
            } catch (e) {
            Alert.alert("회원가입 실패", "잠시 후 다시 시도해주세요.");
            console.log("[MyLocationScreen] submit error:", e);
            } finally {
            setIsSubmitting(false);
            }
        };

    return (
        <>
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
                        <MyLocationInput
                            value={location}
                            onSearch={() => setIsLocationSearchOpen(true)}
                            />
                        <SignupButton
                            label="회원가입 완료"
                            onPress={handleSubmit}
                            disabled={!canSubmit}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>

        <KakaoPlaceSearchModal
            visible={isLocationSearchOpen}
            onClose={() => setIsLocationSearchOpen(false)}
            onSelect={handleSelectLocation}
            title="내 위치 검색"
        />
        </>
    );    
}