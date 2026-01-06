import { useState } from "react";
import { View, KeyboardAvoidingView, Platform, SafeAreaView, 
    TouchableWithoutFeedback, Keyboard
 } from "react-native";
import { useRouter } from "expo-router";
import type { KakaoPlace } from "@/types/kakao-place";

import SignupTitle from "@/components/titles/SignupTitle";
import SignupBar from "@/components/bars/SignupBar";
import SignupButton from "@/components/buttons/SignupButton";
import MyLocationInput from "@/components/inputs/MyLocationInput";

import KakaoPlaceSearchModal from "@/components/modals/KakaoPlaceSearchModal";

export default function MyLocationScreen() {
    const router = useRouter();

    const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [locationPlace, setLocationPlace] = useState<KakaoPlace | null>(null);

    const handleSelectLocation = (place: KakaoPlace) => {
        setLocation(place.roadAddressName || place.addressName || place.placeName);
        setLocationPlace(place);
        setIsLocationSearchOpen(false);
    };

    const canSubmit = !!locationPlace;

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
                            onPress={() => router.push("/signup/greeting")}
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