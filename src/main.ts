import { createApp } from 'vue'
import './style.css'
// import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'

const Vue = createApp(App)
// Vue.use(VueI18n)
Vue.use(router)
Vue.mount('#app')
