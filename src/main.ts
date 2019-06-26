import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

// 引入highlight代码高亮插件
// @ts-ignore
import hljs from "highlight.js";
import "@/assets/styles/atelier-dune-dark.css"; //样式文件
Vue.directive("highlight", function(el) {
  let blocks: any = el.querySelectorAll("pre code");
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block);
  });
});

// 引入gitalk评论模块
import "gitalk/dist/gitalk.css";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vm;
