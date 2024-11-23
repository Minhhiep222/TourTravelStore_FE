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

window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  cluster: "local",
});

library.add(faHeart, faBookmark, faClock, faRoad, faBell, faBellSlash);

const app = createApp(App);

app.use(BootstrapVue3);
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
