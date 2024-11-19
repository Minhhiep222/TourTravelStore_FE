<template>
  <div
    v-if="conversation"
    class="flex flex-col h-full bg-white rounded-lg shadow"
  >
    <!-- Chat Header -->
    <div class="p-4 border-b">
      <h3 class="text-lg font-semibold">{{ conversation.other_user.name }}</h3>
    </div>

    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'flex',
          message.sender_id === currentUserId ? 'justify-end' : 'justify-start',
        ]"
      >
        <div
          :class="[
            'max-w-[70%] rounded-lg px-4 py-2',
            message.sender_id === currentUserId
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100',
          ]"
        >
          <div class="break-words">{{ message.content }}</div>
          <div class="text-xs mt-1 opacity-70">
            {{ formatTime(message.created_at) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="p-4 border-t">
      <form @submit.prevent="sendMessage" class="flex space-x-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-200"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          :disabled="!newMessage.trim()"
        >
          Send
        </button>
      </form>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-full">
    <p class="text-gray-500">Select a conversation to start chatting</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;
const props = defineProps({
  conversation: {
    type: Object,
    required: false,
  },
  currentUserId: {
    type: Number,
    required: true,
  },
});

const messages = ref([]);
const newMessage = ref("");
const messagesContainer = ref(null);
let echo = null;

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const fetchMessages = async () => {
  if (!props.conversation) return;

  try {
    const response = await axios.get(
      `/api/conversations/${props.conversation.id}/messages`
    );
    messages.value = response.data.data.reverse();
    await scrollToBottom();
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  try {
    const response = await axios.post(
      `/api/conversations/${props.conversation.id}/messages`,
      {
        content: newMessage.value,
      }
    );
    messages.value.push(response.data);
    newMessage.value = "";
    await scrollToBottom();
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const initializeEcho = () => {
  if (!props.conversation) return;

  echo = new Echo({
    broadcaster: "pusher",
    key: "3e4fadf6091f7e34865d",
    cluster: "ap1",
    forceTLS: true,
  });

  echo
    .channel(`conversation.${props.conversation.id}`)
    .listen("MessageSent", (event) => {
      messages.value.push(event.message);
      scrollToBottom();
    });
};

watch(
  () => props.conversation,
  async (newConversation) => {
    if (echo) {
      echo.leave(`conversation.${props.conversation.id}`);
    }
    if (newConversation) {
      messages.value = [];
      await fetchMessages();
      initializeEcho();
    }
  }
);

onMounted(() => {
  if (props.conversation) {
    fetchMessages();
    initializeEcho();
  }
});
</script>
