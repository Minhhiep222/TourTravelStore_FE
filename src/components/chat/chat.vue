<template>
  <div class="min-h-full flex" style="height: 87vh">
    <div class="w-1/4 bg-white border-r border-gray-300">
      <div
        class="p-4 flex items-center justify-between border-b border-gray-300"
      >
        <div class="text-xl font-bold">min_hiq</div>
        <i class="fas fa-edit text-xl"> </i>
      </div>
      <div class="flex justify-around border-b border-gray-300">
        <div class="py-2 px-4 border-b-2 border-black">Primary</div>
        <div class="py-2 px-4">General</div>
        <div class="py-2 px-4">Requests</div>
      </div>
      <div class="p-4 flex items-center">
        <img
          alt="Profile picture of a person looking at a flower"
          class="rounded-full w-12 h-12"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/w6e1eTNxEMgnrkdkoZWVmKFkVb55bnaIZV5XCR5CfYGy9ThnA.jpg"
          width="50"
        />
        <div class="ml-4">
          <div class="text-sm">Your note</div>
        </div>
      </div>
      <div class="p-4 flex items-center bg-gray-200">
        <img
          alt="Profile picture of Nguyễn Thị Ngọc Như"
          class="rounded-full w-12 h-12"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/3xbiUbVTIjZSJVNHTJWVFppsyXPA2Ppr3bwavi6r2E9ufU4JA.jpg"
          width="50"
        />
        <div class="ml-4">
          <div class="text-sm font-bold">Nguyễn Thị Ngọc Như</div>
          <div class="text-xs text-gray-500">Active 3h ago</div>
        </div>
      </div>
    </div>

    <div class="bg-white w-3/4 flex flex-col">
      <div
        class="p-4 flex items-center justify-between border-b border-gray-300"
      >
        <div class="flex items-center">
          <img
            alt="Profile picture of Nguyễn Thị Ngọc Như"
            class="rounded-full w-12 h-12"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/3xbiUbVTIjZSJVNHTJWVFppsyXPA2Ppr3bwavi6r2E9ufU4JA.jpg"
            width="50"
          />
          <div class="ml-4">
            <div class="text-lg font-bold">Nguyễn Thị Ngọc Như</div>
            <div class="text-sm text-gray-500">Active 3h ago</div>
          </div>
        </div>
        <div class="flex space-x-4">
          <i class="fas fa-phone text-xl"> </i>
          <i class="fas fa-video text-xl"> </i>
          <i class="fas fa-info-circle text-xl"> </i>
        </div>
      </div>

      <!-- Message Container -->
      <div
        class="flex-1 p-4 flex flex-col justify-end overflow-y-auto"
        ref="messageContainer"
      >
        <!-- Loop over messages -->
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex items-center mb-4"
          :class="{
            'justify-end': message.user_id === currentUserId,
            'justify-start': message.user_id !== currentUserId,
          }"
        >
          <img
            v-if="message.user_id !== currentUserId"
            alt="Profile picture"
            class="rounded-full w-8 h-8"
            :src="message.user.avatar_url || 'https://via.placeholder.com/50'"
            height="50"
            width="50"
          />
          <div
            :class="{
              'ml-2': message.user_id !== currentUserId,
              'mr-2': message.user_id === currentUserId,
            }"
          >
            <div
              :class="{
                'text-sm bg-gray-200 p-2 rounded-lg':
                  message.user_id !== currentUserId,
                'text-sm bg-blue-500 text-white p-2 rounded-lg':
                  message.user_id === currentUserId,
              }"
            >
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>

      <!-- Message input -->
      <div class="p-4 border-t border-gray-300 flex items-center">
        <i class="far fa-smile text-xl mr-4"> </i>
        <div class="flex-1 flex items-center border border-gray-300 rounded-lg">
          <input
            v-model="newMessage"
            class="w-full p-2 outline-none"
            placeholder="Message..."
            type="text"
          />
          <i
            @click.prevent="sendMessage"
            class="fa-solid fa-paper-plane ml-4 p-2 cursor-pointer"
          ></i>
        </div>
        <i class="fas fa-microphone text-xl ml-4"> </i>
        <i class="far fa-image text-xl ml-4"> </i>
        <i class="far fa-heart text-xl ml-4"> </i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";
// import user from "@/stores/user";

window.Pusher = Pusher;

const store = useStore();
const messages = ref([]);
const newMessage = ref("");
const messageContainer = ref(null);
const isLoading = ref(true);
const currentUserId = ref(null);
// Lấy thông tin người dùng từ Vuex
const userStore = store.state;

const scrollToBottom = async () => {
  console.log(userStore);
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
          Authorization: `Bearer ${token}`,
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

const fetchUserData = async () => {
  try {
    const jwt = Cookies.get("tokenLogin");
    if (!jwt) {
      return;
    }
    const token = jwt.split("|")[1];
    const response = await fetch(`http://localhost:8000/api/inforCurrentUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Nếu cần sử dụng token để xác thực
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const user = data.data;
    currentUserId.value = user.id;
    console.log(currentUserId.value);
  } catch (error) {
    console.error("Error fetching user data:", error);
    // this.$router.push({ name: "login" });
    // return null;
  }
};

onMounted(async () => {
  await fetchUserData();
  await fetchMessages();
  initializeEcho();
});
</script>

<script>
export default {
  name: "ChatRealTime",
};
</script>
