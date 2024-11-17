// store/index.js
import { createStore } from "vuex";

const user = createStore({
  state: {
    userId: null,
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.userId = user.id;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
  },
});

export default user;
