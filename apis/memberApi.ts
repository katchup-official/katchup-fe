import axiosWithAuthorization from "@/apis/auth/axiosWithAuthorization";
import type { Member } from "@/types/member";

export type MemberResponse = {
  success: boolean;
  status: number;
  data: Member;
  timestamp?: string;
};

export async function getMemberInfo(): Promise<Member> {
  const res = await axiosWithAuthorization.get<MemberResponse>("/members/me");
  return res.data.data;
}