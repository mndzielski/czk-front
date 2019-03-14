import Vue from "vue";
import Router from "vue-router";

import { paths } from "./paths.js";

Vue.use(Router);

function route(path) {
  return {
    path: path.url,
    component: resolve => import(`pages/${path.view}.vue`).then(resolve),
    meta: {requireAuth: path.requireAuth}
  };
}

function createRoutes() {
  const routes = paths.map(p => route(p));
  routes.push({ path: "*", redirect: "/404" });
  return routes;
}

export const router = new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: createRoutes()
});

router.beforeEach((to, from, next) => {  
  const authRequired = to.meta.requireAuth;
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }
  
  next();
});
