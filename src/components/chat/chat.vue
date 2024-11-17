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
      <div class="flex-1 p-4 flex flex-col justify-end">
        <div class="flex items-center mb-4">
          <img
            alt="Profile picture of Nguyễn Thị Ngọc Như"
            class="rounded-full w-8 h-8"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/3xbiUbVTIjZSJVNHTJWVFppsyXPA2Ppr3bwavi6r2E9ufU4JA.jpg"
            width="50"
          />
          <div class="ml-4">
            <div class="text-sm bg-gray-200 p-2 rounded-lg">Hông á</div>
            <div class="text-xs text-gray-500 mt-1">20 Oct 2024, 13:29</div>
          </div>
        </div>
        <div class="flex items-center justify-end mb-4">
          <div class="mr-4">
            <div class="text-sm bg-blue-500 text-white p-2 rounded-lg">
              có vẻ quê hong
            </div>
            <div class="text-xs text-gray-500 mt-1 text-right">
              20 Oct 2024, 20:01
            </div>
          </div>
          <img
            alt="Profile picture of the user"
            class="rounded-full w-8 h-8"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/KZFftVOykFVJXq3hleuerK3cm9GtxbllSBRvDeokOVtq7nCPB.jpg"
            width="50"
          />
        </div>
      </div>
      <div class="p-4 border-t border-gray-300 flex items-center">
        <i class="far fa-smile text-xl mr-4"> </i>
        <div
          class="flex-1 flex items-center border border-gray-300 rounded-lg forcus:border"
        >
          <input
            class="w-full p-2 outline-none"
            placeholder="Message..."
            type="text"
          />
          <i class="fa-solid fa-paper-plane ml-4 p-2 cursor-pointer"></i>
        </div>
        <i class="fas fa-microphone text-xl ml-4"> </i>
        <i class="far fa-image text-xl ml-4"> </i>
        <i class="far fa-heart text-xl ml-4"> </i>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
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
</script> -->

<script>
export default {
  name: "ChatRealTime",
};
</script>
