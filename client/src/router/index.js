import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
  if (!loggedIn) {
  next({
  path: '/login',
  query: { redirect: to.fullPath },
  });
  } else {
  next();
  }
  } else {
  next();
  }
});

export default router;
