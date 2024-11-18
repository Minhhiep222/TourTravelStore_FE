export default {
  state() {
    return {
      totalPrice: 0,
      numAdults: 1,
      numChildren: 0,
    };
  },
  mutations: {
    setTotalPrice(state, price) {
      state.totalPrice = price;
    },
    setNumAdults(state, numAdults) {
      state.numAdults = numAdults;
    },
    setNumChildren(state, numChildren) {
      state.numChildren = numChildren;
    },
  },
  actions: {
    updateTotalPrice({ commit }, price) {
      commit("setTotalPrice", price);
    },
    updateNumAdults({ commit }, numAdults) {
      commit("setNumAdults", numAdults);
    },
    updateNumChildren({ commit }, numChildren) {
      commit("setNumChildren", numChildren);
    },
  },
  getters: {
    getTotalPrice(state) {
      return state.totalPrice;
    },
    getNumAdults(state) {
      return state.numAdults;
    },
    getNumChildren(state) {
      return state.numChildren;
    },
  },
};
