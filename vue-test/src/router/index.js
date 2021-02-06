import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "../views/Home.vue"; // 引入方式一

// 引入方式二
const Home = () => import("../views/Home.vue");
const Index = () => import("../views/About.vue");
const Login = () => import("../views/Login.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children:[
      {
        path: "/index",
        name: "Index",
        component: Index
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
