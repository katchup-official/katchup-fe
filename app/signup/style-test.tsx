import { useState, useMemo, useCallback } from "react";
import { View, KeyboardAvoidingView, Platform, SafeAreaView, 
    ScrollView, NativeSyntheticEvent, NativeScrollEvent
 } from "react-native";
import { useRouter } from "expo-router";

import SignupTitle from "@/components/titles/SignupTitle";
import SignupBar from "@/components/bars/SignupBar";
import StyleQuestionList from "@/components/list/StyleQuestionList";
import SignupButton from "@/components/buttons/SignupButton";

const BUTTON_HEIGHT = 88;

const questions = [
        {
            id: 1,
            question: "나는 콘서트에서 노래가 나오면",
            options: ["노래를 함께 따라 부르는 편이다", "조용히 감상만 하는 편이다"],
        },
        {
            id: 2,
            question: "나는 좋아하는 가수의 굿즈샵에서",
            options: ["굿즈를 구경하고 종종 구매하는 편이다", "굿즈에 돈을 쓰지 않는 편이다"],
        },
        {
            id: 3,
            question: "옆자리 초면인 사람과",
            options: ["쉽게 친해지고 이야기를 나누는 편이다", "말을 걸지 않는 편이다"],
        },
        {
            id: 4,
            question: "내가 좋아하는 장르는",
            options: ["스펙트럼이 넓고 다양한 편이다", "소수이고 마이너하다"],
        },
    ];

export default function StyleTest() {
    const router = useRouter();

    const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

    const [atBottom, setAtBottom] = useState(false);
    const [viewportH, setViewportH] = useState(0);
    const [contentH, setContentH] = useState(0);

    const canSubmit = useMemo(() => {
        return questions.every(q => answers[q.id] !== undefined);
    }, [answers]);


    async function onSubmit() {
        if (!canSubmit) return;
        router.push("/event"); 
    }

    const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

    const reachThreshold = 40;
    const releaseThreshold = 80;

    const bottomLine = contentSize.height - layoutMeasurement.height;

    if (!atBottom) {
      if (contentOffset.y >= bottomLine - reachThreshold) {
        setAtBottom(true);
      }
    } else {
      if (contentOffset.y <= bottomLine - releaseThreshold) {
        setAtBottom(false);
      }
    }
  }, [atBottom]);

  const handleLayout = useCallback((e: any) => {
    setViewportH(e.nativeEvent.layout.height);
  }, []);

  const handleContentSizeChange = useCallback((_w: number, h: number) => {
    setContentH(h);
  }, []);

  const showButton = atBottom || contentH <= viewportH;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
            <View className="flex-1">
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: BUTTON_HEIGHT }} // 항상 동일
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    onLayout={handleLayout}
                    onContentSizeChange={handleContentSizeChange}
                >
                    <SignupBar 
                        progressWidth="w-1/2"
                        showBack={true}
                        onBack={() => router.back()}
                    />
                    <SignupTitle 
                        mainText="Style Test" 
                        subText="성향에 맞게 응답해주세요" 
                        showIcon={false} 
                    />
                    
                    <StyleQuestionList
                        questions={questions}
                        answers={answers}
                        onSelect={(id, idx) =>
                        setAnswers((prev) => ({ ...prev, [id]: idx }))
                        }
                    />
                </ScrollView>

                <View
                    style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: showButton ? 1 : 0,
                    pointerEvents: showButton ? "auto" : "none",
                    }}
                >
                {showButton && (
                    <SignupButton
                        label="다음"
                        onPress={onSubmit}
                        disabled={!canSubmit}
                        noMargin
                    />
                )}
                </View>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );

}