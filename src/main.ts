import { createApp } from "vue";
import "./style.css";
import "virtual:windi.css";
import "virtual:svg-icons-register";

import App from "./App.vue";
import i18n from "./locale";
import router from "./router";
import pinia from "./stores";
// import { setGlobalOptions } from 'vue-request'

const Vue = createApp(App);
Vue.use(i18n);
Vue.use(router);
Vue.use(pinia);
Vue.mount("#app");
