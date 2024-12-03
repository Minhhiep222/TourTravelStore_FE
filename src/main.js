import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.css";
import { BootstrapVue3 } from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "./assets/tailwind.css";
import { store } from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faBookmark,
  faClock,
  faRoad,
  faBell,
  faBellSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Echo from "laravel-echo";
// import axios from "axios";
// axios.defaults.baseURL = "/api";
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// window.Pusher = require("pusher-js");
// import Cookies from "js-cookie";

// window.Pusher = require("pusher-js");

// const jwt = Cookies.get("tokenLogin");

// console.log(jwt);
// if (!jwt) {
//   console.log("CÓ LỖI");
// }

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "3e4fadf6091f7e34865d",
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  cluster: "ap1",
  // authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
  // auth: {
  //   headers: {
  //     Authorization: `Bearer ${jwt}`,
  //     Accept: "application/json",
  //   },
  // },
});

window.Echo.connector.pusher.connection.bind("error", (err) => {
  console.error("Pusher connection error:", err);
});

// // Gắn state change handler
window.Echo.connector.pusher.connection.bind("state_change", (states) => {
  console.log(
    "Connection state changed from",
    states.previous,
    "to",
    states.current
  );
});

library.add(faHeart, faBookmark, faClock, faRoad, faBell, faBellSlash);

const app = createApp(App);

app.use(BootstrapVue3);
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
