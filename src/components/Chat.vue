<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-6xl mx-auto grid grid-cols-3 gap-4 h-[calc(100vh-2rem)]">
      <ChatList @select-conversation="setCurrentConversation" />
      <div class="col-span-2">
        <ChatWindow
          :conversation="currentConversation"
          :current-user-id="currentUserId"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChatList from "@/components/ChatList.vue";
import ChatWindow from "@/components/ChatMessage.vue";

const currentConversation = ref(null);
const currentUserId = ref(1);

const setCurrentConversation = (conversation) => {
  currentConversation.value = conversation;
};
</script>
