import axiosWithAuthorization from "@/apis/auth/axiosWithAuthorization";
import type { Member } from "@/types/member";

export type MemberResponse = {
  success: boolean;
  status: number;
  data: Member;
  timestamp?: string;
};

export async function getMyMemberInfo(): Promise<Member> {
  const res = await axiosWithAuthorization.get<MemberResponse>("/members/me");
  return res.data.data;
}

export async function getOtherMemberInfo(memberId: number): Promise<Member> {
  const res = await axiosWithAuthorization.get<MemberResponse>(
    `/members/${memberId}`
  );
  return res.data.data;
}

