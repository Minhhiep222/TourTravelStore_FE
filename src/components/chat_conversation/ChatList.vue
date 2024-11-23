<template>
  <div class="min-h-full flex bg-gray-50" style="height: 87vh">
    <!-- Sidebar -->
    <div class="w-1/4 bg-white border-r border-gray-200 shadow-sm">
      <!-- Header -->
      <div
        class="p-4 flex items-center justify-between border-b border-gray-200 bg-white"
      >
        <div class="text-xl font-bold text-blue-600">
          {{ user_current?.name }}
        </div>
        <i
          class="fas fa-edit text-xl hover:text-blue-600 transition-colors duration-200"
        >
        </i>
      </div>

      <!-- Tabs -->
      <div class="flex justify-around border-b border-gray-200 bg-white">
        <div
          class="py-2 px-4 border-b-2 border-blue-600 text-blue-600 font-medium"
        >
          Primary
        </div>
        <div
          class="py-2 px-4 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
        >
          General
        </div>
        <div
          class="py-2 px-4 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
        >
          Requests
        </div>
      </div>

      <!-- Notes -->
      <div
        class="p-4 flex items-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
      >
        <img
          alt="Profile picture of a person looking at a flower"
          class="rounded-full w-12 h-12 object-cover border-2 border-gray-200"
          height="50"
          src="https://storage.googleapis.com/a1aa/image/w6e1eTNxEMgnrkdkoZWVmKFkVb55bnaIZV5XCR5CfYGy9ThnA.jpg"
          width="50"
        />
        <div class="ml-4">
          <div class="text-sm font-medium">Your note</div>
        </div>
      </div>

      <!-- Conversation List -->
      <div class="overflow-y-auto" style="height: calc(87vh - 160px)">
        <div
          v-for="conversation in conversations"
          v-bind:key="conversation.id"
          @click="
            cleanup(),
              fetchMessages(conversation.id),
              getUser(conversation.other_user);
            currentConversationId = conversation.id;
            setCurentConversation(conversation);
          "
          class="p-4 flex items-center cursor-pointer transition-all duration-200 hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-600"
        >
          <img
            alt="Profile picture"
            class="rounded-full w-12 h-12 object-cover border-2 border-gray-200"
            height="50"
            :src="
              conversation?.other_user?.avatar_url ||
              'https://via.placeholder.com/50'
            "
            width="50"
          />
          <div class="ml-4 w-full">
            <div class="text-sm font-bold text-gray-900">
              {{ conversation?.other_user?.name }}
            </div>
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600 truncate max-w-[150px]">
                {{ conversation?.last_message?.message?.substring(0, 20) }}
              </div>
              <div class="text-xs text-gray-500">Active 3h ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div v-if="user_other" class="bg-white w-3/4 flex flex-col shadow-sm">
      <!-- Chat Header -->
      <div
        class="p-4 flex items-center justify-between border-b border-gray-200 bg-white"
      >
        <div class="flex items-center">
          <img
            alt="Profile picture"
            class="rounded-full w-12 h-12 object-cover border-2 border-gray-200"
            height="50"
            :src="user_other?.avatar_url || 'https://via.placeholder.com/50'"
            width="50"
          />
          <div class="ml-4">
            <div class="text-lg font-bold text-gray-900">
              {{ user_other?.name }}
            </div>
            <div class="text-sm text-gray-500">Active 3h ago</div>
          </div>
        </div>
        <div class="flex space-x-4">
          <i
            class="fas fa-phone text-xl hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
          </i>
          <i
            class="fas fa-video text-xl hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
          </i>
          <i
            class="fas fa-info-circle text-xl hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
          </i>
        </div>
      </div>

      <!-- Messages Container -->
      <div
        class="flex-1 p-4 flex flex-col overflow-y-auto bg-gray-50"
        ref="messageContainer"
        style="max-height: calc(87vh - 140px)"
      >
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex items-start mb-1 animate-fade-in"
          :class="{
            'justify-end': message.sender_id === currentUserId,
            'justify-start': message.sender_id !== currentUserId,
          }"
        >
          <img
            v-if="message.sender_id !== currentUserId"
            alt="Profile picture"
            class="rounded-full w-8 h-8 object-cover mt-1"
            :src="message?.user?.avatar_url || 'https://via.placeholder.com/50'"
          />
          <div
            :class="{
              'ml-2': message.sender_id !== currentUserId,
              'mr-2': message.sender_id === currentUserId,
            }"
          >
            <div
              class="max-w-md break-words shadow-sm"
              :class="{
                'bg-white rounded-r-lg rounded-bl-lg p-2':
                  message.sender_id !== currentUserId,
                'bg-blue-600 text-white rounded-l-lg rounded-br-lg p-2':
                  message.sender_id === currentUserId,
              }"
            >
              {{ message.message }}
            </div>
            <div
              class="text-xs mt-1 text-gray-500"
              :class="{
                'text-left': message.sender_id !== currentUserId,
                'text-right': message.sender_id === currentUserId,
              }"
            >
              {{ formatTime(message.updated_at) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-gray-200 bg-white">
        <div class="flex items-center space-x-4">
          <button
            class="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <i class="far fa-smile text-xl"> </i>
          </button>
          <div
            class="flex-1 flex items-center bg-gray-50 rounded-full border border-gray-200 focus-within:border-blue-400 transition-colors duration-200"
          >
            <input
              @keydown.enter="sendMessage(currentConversationId)"
              v-model="newMessage"
              class="w-full p-2 bg-transparent outline-none px-4"
              placeholder="Type a message..."
              type="text"
            />
            <button
              @click="sendMessage(currentConversationId)"
              class="p-2 mr-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <i class="fa-solid fa-paper-plane text-xl"></i>
            </button>
          </div>
          <button
            class="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <i class="fas fa-microphone text-xl"> </i>
          </button>
          <button
            class="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <i class="far fa-image text-xl"> </i>
          </button>
          <button
            class="text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <i class="far fa-heart text-xl"> </i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

window.Pusher = Pusher;

const messages = ref([]);
const newMessage = ref("");
const messageContainer = ref(null);
const isLoading = ref(true);
const user_other = ref(null);
const user_current = ref(null);
const currentUserId = ref(null);
const currentConversationId = ref(null);
const conversations = ref([]);
// const router = useRouter();
// const route = useRoute();
// Lấy thông tin người dùng từ Vuex
// const userStore = store.state;

//CUộn xuống cuối
const scrollToBottom = async () => {
  await nextTick();
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

//Hàm get user trong cuộc trò chuyện
const getUser = (user) => {
  user_other.value = user;
};

//Hàm lấy danh sách các tính nhắn
const fetchMessages = async (conversation_id) => {
  try {
    const token = Cookies.get("tokenLogin");
    const response = await axios.get(
      `http://127.0.0.1:8000/api/conversations/${conversation_id}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      }
    );
    messages.value = response.data;
    await scrollToBottom();
  } catch (error) {
    console.error("Error fetching messages:", error);
  } finally {
    isLoading.value = false;
  }
};

//Hàm gửi tin nhắn đế người tham gia cuộc trò chuyện
const sendMessage = async (conversation_id) => {
  if (!newMessage.value.trim()) return;
  const token = Cookies.get("tokenLogin");
  try {
    await axios.post(
      `http://127.0.0.1:8000/api/conversations/${conversation_id}/messages`,
      {
        message: newMessage.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    newMessage.value = "";
    await scrollToBottom();
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

//Hàm lấy user hiện tại
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
    user_current.value = user;
    currentUserId.value = user.id;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // this.$router.push({ name: "login" });
    // return null;
  }
};

//Hàm danh sách cuộc trò chuyện
const fetchConversations = async () => {
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
    conversations.value.push(...response.data);
    console.log(conversations.value);
  } catch (error) {
    console.log(error);
  }
};

//Format time send
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

//Hàm kiểm tra cuộc sự tham gia hội thoại của người dùng
const initializeEcho = (conversation_id) => {
  const jwt = Cookies.get("tokenLogin");
  console.log(jwt);
  if (!jwt) {
    console.log("CÓ LỖI");
    return;
  }
  //Sử dụng Larevl echo để set các giá trị pusher
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "3e4fadf6091f7e34865d",
    cluster: "ap1",
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
      },
    },
  });

  // Gắn error handler cho Echo
  window.Echo.connector.pusher.connection.bind("error", (err) => {
    console.error("Pusher connection error:", err);
  });

  // Gắn state change handler
  window.Echo.connector.pusher.connection.bind("state_change", (states) => {
    console.log(
      "Connection state changed from",
      states.previous,
      "to",
      states.current
    );
  });

  // Kiểm tra currentConversationId có tồn tại không
  if (!currentConversationId.value) {
    console.log("currentConversationId is not defined");
    return;
  }

  //Set broad channel mà user có thể tham gia
  const channel = `chat.${conversation_id}`;
  console.log("Subscribing to channel:", channel);

  //Thêm gia vào hộp trò chuyện và lắm nghe sự kiện
  window.Echo.private(channel)
    .listen(".MessageSent", (event) => {
      // Thêm dấu chấm trước tên event để matche với App.Event.MessageSent
      messages.value.push(event.message);
      console.log(event.message);
      scrollToBottom();
    })
    .error((error) => {
      console.error("Channel error:", error);
    });
};

// Cleanup function khi component unmount
const cleanup = () => {
  if (window.Echo) {
    window.Echo.disconnect();
  }
};

//setConversation
const setCurentConversation = (conversation) => {
  localStorage.setItem("conversation", JSON.stringify(conversation));
};

//setConversation
const getCurentConversation = () => {
  if (localStorage.getItem("conversation")) {
    const conversation = JSON.parse(localStorage.getItem("conversation"));
    currentConversationId.value = conversation.id;
    user_other.value = conversation.user_two;
    if (!conversation.user_two) {
      user_other.value = conversation.other_user;
    } else {
      user_other.value = conversation.user_two;
    }
    fetchMessages(conversation.id);
  }
};

//Kiểm tra trạng thái của conversation id
watch(currentConversationId, (newId) => {
  initializeEcho(newId);
});

watch(newMessage, (mes) => {
  if (mes.length > 300) {
    console.log("nhiều từ quá");
    newMessage.value = "";
  }
});

//Lấy user và lấy hộp trò chuyện
onMounted(async () => {
  await fetchConversations();
  await fetchUserData();
  getCurentConversation();
});

//Clean
onUnmounted(() => {
  cleanup();
  localStorage.removeItem("conversation");
});
</script>

<script>
export default {
  name: "ChatRealTime",
};
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
