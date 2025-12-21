import { create } from 'zustand';
import type { Member } from "@/types/member";
import { getMyMemberInfo } from "@/apis/memberApi";

interface MemberState {
  profile: Member | null;
  isLoading: boolean;
  error: string | null;
  fetchMyProfile: () => Promise<Member | null>;
  clearProfile: () => void;
}


export const useMemberStore = create<MemberState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchMyProfile: async () => {
    set({ isLoading: true, error: null }); // 로딩 시작
    
    try {
      const me = await getMyMemberInfo();
      set({ profile: me, isLoading: false });
      return me;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "회원 정보를 불러오지 못했습니다.";

      set({ error: message, isLoading: false });
      return null;
    }
  },

  clearProfile: () => {
    set({ profile: null, error: null, isLoading: false });
  },
}));