import Vue from "vue";
import VueRouter from "vue-router";
import checkToken from "../utils/checkToken";
import HomeView from "../components/HomeView.vue";
import LoginView from "../components/LoginView.vue";
import FaceSheetView from "../components/FaceSheet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    redirect: "/home/facesheet",
    children: [
      {
        path: "/home/facesheet",
        component: FaceSheetView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(from.path);
  if (to.path === "/login") {
    next();
  } else {
    checkToken().then((res) => {
      // console.log(res.code);
      if (res.code === 200) {
        next();
      } else {
        // console.log(this);
        router.push({ path: "/login" });
      }
    });
  }
});

export default router;
