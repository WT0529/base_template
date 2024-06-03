import { createRouter, createWebHashHistory } from 'vue-router';
import routers from "virtual:generated-pages"
// import routers from "@pages"

console.log(routers, 'routers');

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
})
export default router;