<template>
  <div>
    <main>
      <router-view />
    </main>
    <Login
      v-if="displayLogin"
      :handleDisplayLogin="handleDisplayLogin"
      :setCurrentUser="setCurrentUser"
    ></Login>
    <Register
      v-if="displayRegister"
      :handleDisplayRegister="handleDisplayRegister"
    ></Register>
    <!-- <button @click="logData">logData</button> -->
  </div>
</template>

<script>
import { ref, provide, onMounted } from "vue";
import Login from "./components/Login/Login.vue";
import Register from "./components/Register/Register.vue";
import axios from "axios";
import Cookies from "js-cookie";

// import Map from './components/Map/Map.vue';

export default {
  components: {
    Login,
    Register,
  },
  setup() {
    const dataValue = ref(null);
    const valueCurrentUser = ref(null);
    const displayLogin = ref(false);
    const displayRegister = ref(false);

    const setCurrentUser = (data) => {
      valueCurrentUser.value = data;
      displayLogin.value = false;
    };

    const logData = () => {
      console.log("valueCurrentUser", valueCurrentUser.value);
      console.log("displayLogin", displayLogin.value);
      console.log("displayRegister", displayRegister.value);
    };

    const handleDisplayLogin = (item) => {
      displayLogin.value = item;
    };

    const handleDisplayRegister = (item) => {
      displayRegister.value = item;
    };

    const handleDataCurrentUser = async () => {
      try {
        const token = Cookies.get("tokenLogin");
        if (token) {
          const response = await axios.get(
            "http://localhost:8000/api/inforCurrentUser",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          valueCurrentUser.value = response.data.data;
        } else {
          valueCurrentUser.value = null;
        }
      } catch (error) {
        console.error("Failed to retrieve user info:", error.response.data);
        alert(error.response.data.message);
      }
    };

    onMounted(() => {
      handleDataCurrentUser();
      // window.Echo.channel('tour-channel').listen('Notify',(e) => {
      //     console.log('logSocket',e);
      // });
    });

    provide("dataValue", dataValue);
    provide("valueCurrentUser", valueCurrentUser);
    provide("setCurrentUser", setCurrentUser);
    provide("handleDisplayLogin", handleDisplayLogin);
    provide("handleDisplayRegister", handleDisplayRegister);

    return {
      dataValue,
      valueCurrentUser,
      setCurrentUser,
      logData,
      displayLogin,
      displayRegister,
      handleDisplayLogin,
      handleDisplayRegister,
      // listenForTourCreated,
    };
  },
};
</script>
