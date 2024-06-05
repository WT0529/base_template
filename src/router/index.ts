import { createRouter, createWebHashHistory } from "vue-router";
import routers from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";

const router = createRouter({
  history: createWebHashHistory(),
  // routes: setupLayouts(routers),
  routes: routers,
});

export default router;
