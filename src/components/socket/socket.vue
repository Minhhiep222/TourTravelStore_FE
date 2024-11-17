<template>
  <div class="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
    <div
      class="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full p-4"
    >
      <!-- Chat Container -->
      <div class="flex-1 bg-white rounded-lg shadow-lg flex flex-col">
        <!-- Header -->
        <div class="px-6 py-4 border-b bg-white">
          <h2 class="text-xl font-semibold text-gray-800">Chat Room</h2>
        </div>

        <!-- Messages -->
        <div
          ref="messageContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <div v-if="isLoading" class="flex justify-center items-center h-full">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
            ></div>
          </div>

          <template v-else>
            <div
              v-for="message in messages"
              :key="message.id"
              :class="[
                'flex',
                message.user.id === userStore?.id
                  ? 'justify-end'
                  : 'justify-start',
              ]"
            >
              <div
                :class="[
                  'max-w-[80%] rounded-lg px-4 py-2',
                  message.user.id === userStore?.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900',
                ]"
              >
                <div class="text-sm font-medium mb-1">
                  {{ message.user.name }}
                </div>
                <div class="break-words">
                  {{ message.message }}
                </div>
                <div
                  :class="[
                    'text-xs mt-1',
                    message.user.id === userStore?.id
                      ? 'text-blue-100'
                      : 'text-gray-500',
                  ]"
                >
                  {{ new Date(message.created_at).toLocaleTimeString() }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Input Form -->
        <div class="p-4 border-t bg-white">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useStore } from "vuex"; // Thay vì Pinia, ta dùng Vuex
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

window.Pusher = Pusher;

const store = useStore();
const messages = ref([]);
const newMessage = ref("");
const messageContainer = ref(null);
const isLoading = ref(true);

// Lấy thông tin người dùng từ Vuex
const userStore = store.state;

const scrollToBottom = async () => {
  await nextTick();
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const fetchMessages = async () => {
  try {
    const token = Cookies.get("tokenLogin");
    const response = await axios.get("http://127.0.0.1:8000/api/messages", {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    messages.value = response.data;
    console.log(messages.value);
    await scrollToBottom();
  } catch (error) {
    console.error("Error fetching messages:", error);
  } finally {
    isLoading.value = false;
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  const token = Cookies.get("tokenLogin");
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/messages",
      {
        message: newMessage.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      }
    );
    // messages.value.push(response.data);
    newMessage.value = "";
    await scrollToBottom();
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const initializeEcho = () => {
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "3e4fadf6091f7e34865d",
    cluster: "ap1",
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    disableStats: true,
  });

  window.Echo.channel("chat").listen("MessageSent", (event) => {
    messages.value.push(event.message);
    scrollToBottom();
  });
};

onMounted(async () => {
  await fetchMessages();
  initializeEcho();
});
</script>

<script>
export default {
  name: "ChatRealTime",
};
</script>
