// 引入插件和语言包
import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";

const messages = {
  zh: zh,
  en: en,
};

// 通过选项创建 VueI18n 实例
const i18n = createI18n({
  locale: localStorage.getItem("lang") || "zh", // 设置默认语言
  fallbackLocale: "zh", // 语言包不支持时，使用此语言包
  messages: messages, // 语言包
});

export default i18n;
