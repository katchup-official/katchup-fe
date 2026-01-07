import { useState, useMemo, useCallback, useEffect } from "react";
import { View, KeyboardAvoidingView, Platform, SafeAreaView, 
    ScrollView, NativeSyntheticEvent, NativeScrollEvent, Text, TouchableOpacity
 } from "react-native";
import { useRouter } from "expo-router";

import SignupTitle from "@/components/titles/SignupTitle";
import SignupBar from "@/components/bars/SignupBar";
import StyleQuestionList from "@/components/lists/StyleQuestionList";
import SignupButton from "@/components/buttons/SignupButton";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";

import { getStylesQuestionList } from "@/apis/onboardingApi";
import type { UIQuestion, StylesQuestion } from "@/types/styles";
import { useOnboardingStore } from "@/stores/useOnboardingStore"

import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

const BUTTON_HEIGHT = 88;

export default function StyleTestScreen() {
  const router = useRouter();

  const [questions, setQuestions] = useState<StylesQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const [atBottom, setAtBottom] = useState(false);
  const [viewportH, setViewportH] = useState(0);
  const [contentH, setContentH] = useState(0);

  const uiQuestions: UIQuestion[] = useMemo(() => {
    return questions.map((q) => ({
      id: q.questionId,
      question: q.text,
      options: [q.answerA, q.answerB],
      answerIds: [q.answerAId, q.answerBId],
    }));
  }, [questions]);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setLoadingError(null);

      const data = await getStylesQuestionList(0, 16);

      setQuestions(
        [...data.content].sort((a, b) => a.questionId - b.questionId)
      );
      setAnswers({});
    } catch (e) {
      setLoadingError(
        "성향 테스트 문항을 불러오지 못했어요.\n잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const setStylesAnswer = useOnboardingStore((s) => s.setStylesAnswer);

  const canProceed = useMemo(() => {
      if (questions.length === 0) return false;
      return questions.every((q) => answers[q.questionId] !== undefined);
  }, [questions, answers]);

  function handleSelect(questionId: number, answerId: number) {
      setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  }

  function handleNext() {
      if (!canProceed) return;

      const payload = {
        answers: questions.map((q) => {
          const answerId = answers[q.questionId];
          if (answerId == null) throw new Error("answerId missing");
          return { answerId };
        }),
      };

      setStylesAnswer(payload);
      router.push("/signup/my-location");
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1" style={{ position: "relative" }}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: BUTTON_HEIGHT }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onLayout={handleLayout}
            onContentSizeChange={handleContentSizeChange}
          >
            <SignupBar 
              currentStep={2}
              showBack
              onBack={() => router.back()}
            />
            <SignupTitle 
              mainText="Style Test" 
              subText="성향에 맞게 응답해주세요" 
              showIcon={false} 
            />

            {!isLoading && loadingError && (
            <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
              <Text
                style={[
                  fonts.mediumText,
                  { color: colors.orange, textAlign: "center" },
                ]}
              >
                {loadingError}
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: 16,
                  alignSelf: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  backgroundColor: colors.orange,
                }}
                onPress={fetchQuestions}
              >
                <Text style={[ fonts.smallText, { color: colors.white }]}>다시 시도</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isLoading && !loadingError && (
            <StyleQuestionList
              questions={uiQuestions}
              answers={answers}
              onSelect={handleSelect}
            />
          )}
          </ScrollView>

          {!isLoading && (
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
              onPress={handleNext}
              disabled={!canProceed}
              noMargin
            />
          )}
          </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    {isLoading && <LoadingOverlay visible />}
    </View>
  );
}