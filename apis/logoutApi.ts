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

export async function memberWithdrawal() {
  try {
    await axiosWithAuthorization.post("/members/withdrawal");
  } catch (e) {
    console.warn("[Withdrawal] server withdrawal failed", e);
  } finally {
    await clearAccessToken();
  }
}