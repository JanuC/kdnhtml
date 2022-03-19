import Vue from "vue";
import VueRouter from "vue-router";
import checkToken from "../utils/checkToken";
import HomeView from "../components/HomeView.vue";
import LoginView from "../components/LoginView.vue";
import FaceSheetView from "../components/FaceSheet.vue";
import FaceMessage from "../components/FaceMessage.vue";
import store from "../store/index";

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
      {
        path: "/home/facemessage",
        component: FaceMessage,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

// 解决ElementUI导航栏中重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

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
        store.state.user.token = null;
        // 移除 token
        localStorage.removeItem("token");
        router.push({ path: "/login" });
      }
    });
  }
});

export default router;
