// 引入插件和语言包
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'








// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh',
  messages:{
    'zh':zh,
    'en':en
  },
})

export default i18n;




