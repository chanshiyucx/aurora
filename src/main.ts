import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vm;
