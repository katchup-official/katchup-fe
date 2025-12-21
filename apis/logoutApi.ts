import axiosWithAuthorization from "@/apis/auth/axiosWithAuthorization";
import { clearAccessToken } from "@/apis/auth/authStorage";

export async function memberLogout() {
  try {
    await axiosWithAuthorization.post("/members/logout");
  } catch (e) {
    console.warn("[Logout] server logout failed", e);
  } finally {
    await clearAccessToken();
  }
}