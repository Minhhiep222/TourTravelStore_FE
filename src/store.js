import { createStore } from "vuex";
import chat from "./stores/chat"; // import module chat
import price from "./stores/price"; // import module price

export const store = createStore({
  modules: {
    chat: chat, // module chat
    price: price, // module price
  },
});
