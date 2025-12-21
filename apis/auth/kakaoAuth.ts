import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export async function getKakaoCode(): Promise<string> {
  const clientId = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
  if (!clientId) throw new Error("Missing EXPO_PUBLIC_KAKAO_REST_API_KEY");

  const base = process.env.EXPO_PUBLIC_API_BASE_URI;
  if (!base) throw new Error("Missing EXPO_PUBLIC_API_BASE_URI");

  const backendCallback = new URL("/auth/kakao/callback", base).toString();

  const returnTo = Linking.createURL("login");

  const authUrl =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(backendCallback)}` +
    `&response_type=code` +
    `&state=${encodeURIComponent(returnTo)}`;

  const result = await WebBrowser.openAuthSessionAsync(authUrl, returnTo);

  if (result.type !== "success") {
    console.warn("[KakaoAuth] cancelled or failed:", result);
    throw new Error("카카오 로그인에 실패했습니다.");
  }

  if (!result.url) {
    throw new Error("카카오 로그인 응답 URL을 받지 못했습니다.");
  }

  const parsed = Linking.parse(result.url);
  const code = parsed.queryParams?.code;

  if (!code || typeof code !== "string") {
    throw new Error("카카오 인증 코드가 전달되지 않았습니다. 다시 시도해주세요.");
  }

  return code;
}