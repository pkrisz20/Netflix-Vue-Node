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
    name: "Author",
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
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/user/Profile.vue"),
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: () => import("../views/user/Favourites.vue"),
  },
  {
    path: "/mylist",
    name: "MyList",
    component: () => import("../views/user/MyList.vue"),
  },
  {
    path: "/detailsuser/:movieId",
    name: "MovieDetailsUser",
    component: () => import("../views/user/MovieDetails.vue"),
  },
  {
    path: "/detailsguest/:movieId",
    name: "MovieDetailsGuest",
    component: () => import("../views/guest/MovieDetails.vue"),
  },
  {
    path: "/moviesuser/:category",
    name: "Moviesuser",
    component: () => import("../views/user/Movies.vue"),
    props: true
  },
  {
    path: "/moviesguest/:category",
    name: "Moviesguest",
    component: () => import("../views/guest/Movies.vue"),
    props: true
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
