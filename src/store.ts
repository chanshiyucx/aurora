import Vue from "vue";
import Vuex from "vuex";
import { queryTag } from "@/utils/services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    // 获取标签
    async queryTag() {
      let data = await queryTag();
      const filterLabel = ["Mood", "Friend", "Book", "About"];
      data = data.filter((o: any) => !filterLabel.includes(o.name));
      return data;
    }
  }
});
