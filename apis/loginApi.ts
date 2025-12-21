import { setAccessToken } from "@/apis/auth/authStorage";

export type SocialLoginResponse = {
  success: boolean;
  status: number;
  data: {
    accessToken: string;
  };
  timestamp: string;
};

export async function socialLoginWithCode(
  code: string
): Promise<SocialLoginResponse> {
  const base = process.env.EXPO_PUBLIC_API_BASE_URI;
  if (!base) {
    console.error("[LoginApi] Missing EXPO_PUBLIC_API_BASE_URI");
    throw new Error("로그인 환경 설정에 문제가 발생했습니다.");
  }

  const res = await fetch(`${base}/auth/social-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", //쿠키 받기
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[LoginApi] social-login failed", {
      status: res.status
    });
    throw new Error("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }

  const json = (await res.json()) as SocialLoginResponse;

  const accessToken = json?.data?.accessToken;
  if (!accessToken) {
    console.error("[LoginApi] No accessToken in response", json);
    throw new Error("로그인 처리 중 오류가 발생했습니다.");
  }

  await setAccessToken(accessToken);

  return json;
}