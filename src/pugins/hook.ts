// 公共钩子函数
import { TOKEN_KEY } from "@/constant";

export function useEnv() {
  const { VITE_PORT, VITE_MODE,VITE_HOST, VITE_BASE_URL,VITE_PAGE_TITLE } = import.meta.env;
  return {
    VITE_PORT,
    VITE_HOST,
    VITE_PAGE_TITLE,
    VITE_BASE_URL,
    VITE_MODE,
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
