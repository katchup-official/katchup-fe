import { create } from "zustand";
import type { StylesAnswer } from "@/types/styles";

type OnboardingState = {
    nickname: string;
    stylesAnswer: StylesAnswer;

    setNickname: (nickname: string) => void;
    setStylesAnswer: (stylesAnswer: StylesAnswer) => void;
    
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    nickname: "",
    stylesAnswer: { answers: [] },

    setNickname: (nickname) => set({ nickname }),
    setStylesAnswer: (stylesAnswer) => set({ stylesAnswer }),

    reset: () =>
        set({
        nickname: "",
        stylesAnswer: { answers: [] },
    }),
}));