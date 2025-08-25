// stores/useUserStore.ts

import { create } from 'zustand';

interface UserProfile {
  id: number; 
  nickname: string;
  gender: 'MALE' | 'FEMALE';
  birthYear: number;
  tendency: string;
}


interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchMyProfile: () => Promise<void>; 
  clearProfile: () => void;
}


export const useUserStore = create<UserState>((set) => ({
  //상태의 초기값 설정
  profile: null,
  isLoading: false,
  error: null,

  fetchMyProfile: async () => {
    set({ isLoading: true, error: null }); // 로딩 시작
    
    try {
      // 추후에 API 연동 시 코드 추가 예정

      // 임시 데이터
      const mockProfile: UserProfile = {
        id: 1,
        nickname: '주디무디',
        gender: 'FEMALE',
        birthYear: 1999,
        tendency: '꼼꼼한 계획가',
      };
      set({ profile: mockProfile, isLoading: false });

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '오류가 발생했습니다!';
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearProfile: () => {
    set({ profile: null, error: null });
  },
}));