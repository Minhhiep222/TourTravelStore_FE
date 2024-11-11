import { createStore } from 'vuex';

export const store = createStore({
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
      commit('setTotalPrice', price);
    },
    updateNumbAdults({ commit }, numAdults) {
        commit('setNumAdults', numAdults);
      },
      updateNumbChildren({ commit }, numChildren) {
        commit('setNumChildren', numChildren);
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
});
