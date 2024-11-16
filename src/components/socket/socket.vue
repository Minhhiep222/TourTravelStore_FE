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
    const echo = new Echo({
      broadcaster: "socket.io",
      host: window.location.hostname + ":6001",
    });

    echo.join("chat");
  },
  methods: {
    sendMessage() {
      axios
        .post("http://127.0.0.1:8000/api/chat/send-message", {
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
