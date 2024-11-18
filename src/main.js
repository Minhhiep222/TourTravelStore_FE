import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.css";
import { BootstrapVue3 } from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "./assets/tailwind.css";
import { store } from "./store";
import axios from "axios";
axios.defaults.baseURL = "/api"; // This will use the current domain
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router);
app.use(store);

app.mount("#app");
