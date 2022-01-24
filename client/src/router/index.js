import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/guest/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/author",
    name: "About",
    component: () => import("../views/guest/Author.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/guest/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/guest/Login.vue"),
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: () => import("../views/user/ForgotPassword.vue"),
  },
  {
    path: "/userinterface",
    name: "UserInterface",
    component: () => import("../views/user/UserInterface.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
