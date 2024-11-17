<template>
  <div>
    <h1>Chat</h1>
    <input type="text" v-model="message" />
    <div v-for="message in messages" :key="message.id">
      <p>{{ message.text }}</p>
    </div>
    <button @click="sendMessage">Send Message</button>
    <button @click="listen">Listten</button>
  </div>
</template>

<script>
import Echo from "laravel-echo";
import { io } from "socket.io-client";
import axios from "axios";
// import Pusher from "pusher-js";
window.io = io;

export default {
  name: "ChatSocket",
  data() {
    return {
      messages: [],
      message: "",
    };
  },
  mounted() {
    window.Echo = new Echo({
      broadcaster: "socket.io",
      client: io, // Cấu hình client là socket.io-client
      host: window.location.hostname + ":6001", // URL của server WebSocket
    });

    // Join vào kênh "chat" và lắng nghe sự kiện "MessageSent"
    window.Echo.join("chat").listen("MessageSent", (event) => {
      console.log("Message received:", event); // Kiểm tra sự kiện MessageSent
      this.messages.push(event.message); // Thêm tin nhắn vào mảng messages
    });

    // Để kiểm tra xem có nhận được sự kiện không
  },
  methods: {
    sendMessage() {
      axios
        .post("http://127.0.0.1:6001/apps/APP_ID/chat/send-message", {
          message: this.message,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
