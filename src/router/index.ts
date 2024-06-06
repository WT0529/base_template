import { createRouter, createWebHashHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes),
});

export default router;
