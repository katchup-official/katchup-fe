import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./authStorage";

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URI;

type Listener = () => void;
let onLogout: Listener | null = null;
let isLoggingOut = false; // 로그아웃 중복 방지

export function setOnLogoutListener(listener: Listener) {
  onLogout = listener;
}

export function clearOnLogoutListener() {
  onLogout = null;
}

async function logoutOnce() {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    await clearAccessToken();
  } finally {
    onLogout?.();
  }
}

export const axiosWithAuthorization = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosWithAuthorization.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithAuthorization.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | (typeof error.config & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const headerAuth =
        error.response.headers?.authorization ||
        error.response.headers?.Authorization;

      const bodyAuth =
        error.response.data?.data?.accessToken ||
        error.response.data?.accessToken;

      const newAccessToken = headerAuth || bodyAuth;

      if (newAccessToken) {
        const pureToken = newAccessToken.startsWith("Bearer ")
          ? newAccessToken.slice(7)
          : newAccessToken;

        await setAccessToken(pureToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${pureToken}`;

        return axiosWithAuthorization(originalRequest);
      }

      await logoutOnce();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosWithAuthorization;