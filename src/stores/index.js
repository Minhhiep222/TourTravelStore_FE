import Vue from "vue";
import Vuex from "vuex";
import chat from "./chat";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
    user,
  },
});
