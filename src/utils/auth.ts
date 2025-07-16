import { useAuthStore } from "../store/authStore";

// 인증 헤더 생성
export const getAuthHeaders = (): Record<string, string> => {
  const { accessToken } = useAuthStore.getState();

  return accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};

// 로그인 상태 확인
export const checkAuthStatus = (): boolean => {
  const { accessToken, isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated || !accessToken) {
    return false;
  }

  return true;
};
