import axiosWithAuthorization from "@/apis/auth/axiosWithAuthorization";
import { clearAccessToken } from "@/apis/auth/authStorage";
import { useMemberStore } from "@/stores/useMemberStore";

export async function clearClientSession() {
  await clearAccessToken();
  useMemberStore.getState().clearProfile();
}

export async function memberLogout() {
  try {
    await axiosWithAuthorization.post("/members/logout");
  } catch (e) {
    console.warn("[Logout] server logout failed", e);
  } finally {
    await clearClientSession();
  }
}

export async function memberWithdrawal() {
  try {
    await axiosWithAuthorization.post("/members/withdrawal");
  } catch (e) {
    console.warn("[Withdrawal] server withdrawal failed", e);
  } finally {
    await clearClientSession();
  }
}