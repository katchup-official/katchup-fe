import axiosWithAuthorization from "@/apis/auth/axiosWithAuthorization";

export async function checkNicknameTaken(nickname: string): Promise<boolean> {
  const res = await axiosWithAuthorization.get("/members/nickname/check", {
    params: { nickname },
    timeout: 5000,
  });

  return res.data.data;;
}