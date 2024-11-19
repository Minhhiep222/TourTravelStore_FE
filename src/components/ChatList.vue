<template>
  <div class="chat-container">
    Danh sách cuộc trò chuyện
    <div class="conversations-list">
      <div
        v-for="conv in conversations"
        :key="conv.id"
        @click="selectConversation(conv)"
        :class="[
          'conversation-item',
          { active: currentConversation?.id === conv.id },
        ]"
      >
        <div class="conversation-info">
          <h3>{{ conv.other_user.name }}</h3>
          <p>{{ conv.last_message?.content || "No messages yet" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref, computed, onMounted, nextTick } from "vue";
// import { useStore } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "ChatComponent",

  // setup() {
  //   const store = useStore();
  //   const newMessage = ref("");
  //   const messagesList = ref(null);
  //   const currentUserId = ref(1); // Thay bằng ID user thực tế

  //   // Chat State
  //   const conversations = computed(() => store.state.chat.conversations);
  //   const currentConversation = computed(
  //     () => store.state.chat.currentConversation
  //   );
  //   const messages = computed(() => store.state.chat.messages);

  //   // Price State
  //   const totalPrice = computed(() => store.state.price.totalPrice);
  //   const numAdults = computed(() => store.state.price.numAdults);
  //   const numChildren = computed(() => store.state.price.numChildren);

  //   // Methods for chat
  //   const selectConversation = async (conversation) => {
  //     store.dispatch("chat/setCurrentConversation", conversation);
  //     await store.dispatch("chat/fetchMessages", conversation.id);
  //     scrollToBottom();
  //   };

  //   const sendNewMessage = async () => {
  //     if (!newMessage.value.trim() || !currentConversation.value) return;

  //     await store.dispatch("chat/sendMessage", {
  //       conversationId: currentConversation.value.id,
  //       content: newMessage.value,
  //     });

  //     newMessage.value = "";
  //     await nextTick();
  //     scrollToBottom();
  //   };

  //   // Methods for price calculation
  //   const increaseAdults = () => {
  //     store.dispatch("price/updateNumAdults", numAdults.value + 1);
  //     calculateTotal();
  //   };

  //   const decreaseAdults = () => {
  //     if (numAdults.value > 1) {
  //       store.dispatch("price/updateNumAdults", numAdults.value - 1);
  //       calculateTotal();
  //     }
  //   };

  //   const increaseChildren = () => {
  //     store.dispatch("price/updateNumChildren", numChildren.value + 1);
  //     calculateTotal();
  //   };

  //   const decreaseChildren = () => {
  //     if (numChildren.value > 0) {
  //       store.dispatch("price/updateNumChildren", numChildren.value - 1);
  //       calculateTotal();
  //     }
  //   };

  //   const calculateTotal = () => {
  //     // Giả sử giá cơ bản là 100 cho người lớn và 50 cho trẻ em
  //     const total = numAdults.value * 100 + numChildren.value * 50;
  //     store.dispatch("price/updateTotalPrice", total);
  //   };

  //   // Utility functions
  //   const scrollToBottom = () => {
  //     if (messagesList.value) {
  //       messagesList.value.scrollTop = messagesList.value.scrollHeight;
  //     }
  //   };

  //   const formatTime = (timestamp) => {
  //     return new Date(timestamp).toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //   };

  //   const formatPrice = (price) => {
  //     return new Intl.NumberFormat("vi-VN", {
  //       style: "currency",
  //       currency: "VND",
  //     }).format(price);
  //   };

  //   // Lifecycle hooks
  //   onMounted(async () => {
  //     await store.dispatch("chat/fetchConversations");
  //     store.dispatch("chat/initializeRealTimeListeners");
  //     calculateTotal();
  //   });

  //   return {
  //     // Chat state and methods
  //     conversations,
  //     currentConversation,
  //     messages,
  //     newMessage,
  //     messagesList,
  //     currentUserId,
  //     selectConversation,
  //     sendNewMessage,

  //     // Price state and methods
  //     totalPrice,
  //     numAdults,
  //     numChildren,
  //     increaseAdults,
  //     decreaseAdults,
  //     increaseChildren,
  //     decreaseChildren,

  //     // Utility methods
  //     formatTime,
  //     formatPrice,
  //   };
  // },

  methods: {
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
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.fetchConversations();
  },
};
</script>
