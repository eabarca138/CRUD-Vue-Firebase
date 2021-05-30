import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Inventario from "../views/Inventario.vue";
import AgregarProducto from "../views/AgregarProducto.vue";

import Firebase from "firebase"

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/inventario",
    name: "Inventario",
    component: Inventario,
    meta: {
      login: true,
    },
  },
    {
      path: "/agregarProducto",
      name: "AgregarProducto",
      component: AgregarProducto,
      meta: {
        login: true,
      },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some((route) => route.meta.login);
  if (!user && authRequired) {
    next("login");
  } else if (user && !authRequired) {
    next("inventario");
  } else {
    next();
  }
});

export default router;
