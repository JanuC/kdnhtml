import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { apiAddress } from "./request/api";
import timeFormate from "./utils/timeFormate";
import changePages from "./utils/changePages";
import inputFilterOrder from "./utils/inputFilterOrder";

Vue.prototype.post = apiAddress;
Vue.prototype.timeFormate = timeFormate;
Vue.prototype.changePages = changePages;
Vue.prototype.inputFilterOrder = inputFilterOrder;
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
