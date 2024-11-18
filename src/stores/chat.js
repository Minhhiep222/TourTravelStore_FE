import axios from "axios";
import Cookies from "js-cookie";

export default {
  state() {
    return {
      conversations: [],
      currentConversation: null,
      messages: [],
      loading: false,
      error: null,
    };
  },
  mutations: {
    SET_CONVERSATIONS(state, conversations) {
      state.conversations = conversations;
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    ADD_CONVERSATION(state, conversation) {
      state.conversations.push(conversation);
    },
  },
  actions: {
    async fetchConversations() {
      try {
        const jwt = Cookies.get("tokenLogin");
        if (!jwt) {
          console.log("CÓ LỖI");
          return;
        }
        const response = await axios.get(
          "http://127.0.0.1:8000/api/conversations",
          {
            headers: {
              Authorization: `Bearer ${jwt}`, // Nếu cần sử dụng token để xác thực
            },
          }
        );
        console.log("CÓ LỖI");
        commit("SET_CONVERSATIONS", response.data);
      } catch (error) {
        commit("SET_ERROR", error.message);
      }
    },

    async fetchMessages({ commit }, conversationId) {
      try {
        commit("SET_LOADING", true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/conversations/${conversationId}/messages`
        );
        commit("SET_MESSAGES", response.data);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async sendMessage({ commit }, { conversationId, message }) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/conversations/${conversationId}/messages`,
          {
            message,
          }
        );
        commit("ADD_MESSAGE", response.data);
      } catch (error) {
        commit("SET_ERROR", error.message);
      }
    },

    async startConversation({ commit }, userId) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/conversations",
          {
            user_id: userId,
          }
        );
        commit("ADD_CONVERSATION", response.data);
        return response.data;
      } catch (error) {
        commit("SET_ERROR", error.message);
      }
    },
  },
  getters: {
    conversations: (state) => state.conversations,
    currentConversation: (state) => state.currentConversation,
    messages: (state) => state.messages,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
