// 公共钩子函数
import { TOKEN_KEY } from "@/constant";

export function useEnv() {
  const { VITE_MODE, VITE_BASE_URL } = import.meta.env;
  return {
    VITE_MODE,
    VITE_BASE_URL,
  };
}

// 获取token
export function getToken(): string {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) return JSON.parse(token);
  else return "";
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return `Bearer ${token}`;
};
