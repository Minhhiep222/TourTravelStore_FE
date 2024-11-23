<template>
  <div :class="$style.wrapper">
    <div class="bg-white shadow-sm">
      <div class="pb-3 border-b">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center space-x-4">
            <div
              @click="homePage"
              class="flex items-center space-x-1 cursor-pointer"
            >
              <span class="text-2xl font-bold text-gray-800">Storel</span>
              <i class="fas fa-dove text-blue-500"></i>
              <span class="text-2xl font-bold text-gray-800">oka</span>
            </div>
            <span>|</span>
            <div
              class="cursor-pointer items-center hover:text-blue-500 text-lg"
              v-if="valueCurrentUser"
              @click="handleIntoPageVendor"
            >
              Trang quản lý
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-1">
              <img
                alt="Vietnam flag"
                class="w-5 h-5"
                src="https://storage.googleapis.com/a1aa/image/Gk1qI5bKGcoNOR3EPAXEGN3mX6XPN09tnbBZ9ytZDbghwa7E.jpg"
              />
              <span class="text-gray-800"
                >VI | VND <i class="fas fa-chevron-down"></i
              ></span>
            </div>
            <a class="text-gray-800 flex items-center space-x-1" href="#"
              ><i class="fas fa-percent text-green-500"></i
              ><span>Khuyến mãi</span></a
            >
            <a class="text-gray-800 flex items-center space-x-1" href="#"
              ><span @click="goToCustomerSupport"
                >Hỗ trợ <i class="fas fa-chevron-down"></i></span
            ></a>
            <a class="text-gray-800">Hợp tác với chúng tôi</a>
            <span
              @click="goToFavorite"
              class="text-gray-800 d-flex align-items-center justify-content-around"
              style="cursor: pointer"
            >
              Đã Lưu
              <font-awesome-icon
                :class="$style.solidSave"
                class="ml-0.5"
                icon="bookmark"
              />
            </span>
            <a class="text-gray-800" href="#">Đặt chỗ của tôi</a>

            <div class="flex items-center space-x-1">
              <img
                alt="User avatar"
                class="w-5 h-5 rounded-full"
                @click="goToUserDetails(valueCurrentUser.id)"
                src="https://storage.googleapis.com/a1aa/image/WZNnADVMnkqlKVQ5vH3H483t1j2I9eIbX5axZ5u0ejqFCrtTA.jpg"
                v-if="valueCurrentUser"
              />
              <span
                v-if="valueCurrentUser"
                class="text-blue-500"
                @click="goToUserDetails(valueCurrentUser.id)"
                >{{ valueCurrentUser.name }} |
              </span>
              <!-- <span v-if="valueCurrentUser" class="text-yellow-500">| {{ valueCurrentUser.points }} Điểm -->
              <!-- <i class="fas fa-chevron-down"></i></span> -->
              <button
                v-if="valueCurrentUser"
                @click="setLogout"
                class="text-blue-500"
              >
                Đăng xuất
              </button>
              <button v-else @click="setLogin" class="text-blue-500">
                Đăng nhập
              </button>
              <span>|</span>
              <button
                v-if="valueCurrentUser == null"
                @click="setRegister"
                class="text-blue-500"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4 px-4">
          <a class="text-gray-600 hover:text-gray-800" href="#">Khách sạn</a>
          <a class="text-gray-600 hover:text-gray-800" href="#">Vé máy bay</a>
          <div @click="showCurrentUser">logValue</div>
          <a class="text-gray-600 hover:text-gray-800" href="#">Vé xe khách</a>
          <a class="text-gray-600 hover:text-gray-800" href="#"
            >Đưa đón sân bay</a
          >
          <p @click="goToChatBot" class="text-gray-600 hover:text-gray-800">
            ChatBot
          </p>
          <a class="text-gray-600 hover:text-gray-800" href="#">Cho thuê xe</a>
          <a class="text-gray-600 hover:text-gray-800" href="#"
            >Hoạt động &amp; Vui chơi</a
          >
          <a class="text-gray-600 hover:text-gray-800" href="#"
            >More <i class="fas fa-chevron-down"></i
          ></a>
        </div>
      </div>
    </div>

    <!-- <div>
      <h1>Header</h1>
      <div v-if="valueCurrentUser == null">
        <button @click="setLogin">Login</button>
      </div>
      <div v-if="valueCurrentUser == null">
        <button @click="setRegister">Sign up</button>
      </div>
      <div v-if="valueCurrentUser != null">
        <button @click="setLogout">Logout</button>
      </div>
      <button @click="showCurrentUser">click</button>
    </div> -->
  </div>
</template>

<script>
import { inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

document.title = "Trang chủ";
export default {
  name: "HeaderComponent",

  methods: {
    handleIntoPageVendor() {
      this.$router.push("/minh-hiep/tours");
    },
    homePage() {
      this.$router.push("/");
    },
  },

  setup() {
    const router = useRouter();
    const valueCurrentUser = inject("valueCurrentUser");
    const displayNotification = ref(false);
    const notifications = ref([]);
    const setCurrentUser = inject("setCurrentUser");
    const handleDisplayLogin = inject("handleDisplayLogin");
    const handleDisplayRegister = inject("handleDisplayRegister");
    const totalNotRead = ref([]);
    const statusNotication = ref();
    const showCurrentUser = () => {
      console.log("notification", notifications);
      console.log("Current User Value:", valueCurrentUser);
      console.log("totalNotRead", totalNotRead);
    };

    const checkNotifyUser = async () => {
      if (
        valueCurrentUser &&
        valueCurrentUser.value &&
        valueCurrentUser.value.id
      ) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/checkNotifyUser",
            {
              params: {
                user_id: valueCurrentUser.value.id,
              },
            }
          );
          console.log("checkNotifi", response.data);
          statusNotication.value = response.data.data;
        } catch (error) {
          console.error(
            "Failed to retrieve notifications:",
            error.response ? error.response.data.message : error.message
          );
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response ? error.response.data.message : error.message,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      } else {
        return;
      }
    };

    const handleDisplayNotify = (status) => {
      displayNotification.value = status;
    };
    const fetchNotification = async () => {
      if (
        valueCurrentUser &&
        valueCurrentUser.value &&
        valueCurrentUser.value.id
      ) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/getNotification",
            {
              params: {
                user_id: valueCurrentUser.value.id,
              },
            }
          );
          console.log("Notifications:", response.data);
          notifications.value = response.data.data;
          totalNotRead.value = response.data.notRead;
        } catch (error) {
          console.error(
            "Failed to retrieve notifications:",
            error.response ? error.response.data.message : error.message
          );
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response ? error.response.data.message : error.message,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      } else {
        return;
      }
    };

    const seeAll = () => {
      router.push({ name: "Favorite" });
    };
    const setLogin = () => {
      handleDisplayLogin(true);
    };
    const setRegister = () => {
      handleDisplayRegister(true);
    };
    const goToFavorite = async () => {
      router.push({ name: "Favorite" });
    };
    const goToCustomerSupport = async () => {
      router.push({ name: "ContactUs" });
    };

    const setLogout = () => {
      document.cookie =
        "tokenLogin=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      handleDisplayLogin(false);
      setCurrentUser(null);
    };
    const goToUserDetails = (userId) => {
      if (userId) {
        router.push({ name: "UserDetails", params: { id: userId } });
      }
    };

    return {
      valueCurrentUser,
      setLogin,
      setLogout,
      showCurrentUser,
      setRegister,
      goToFavorite,
      goToUserDetails,
      goToCustomerSupport,
    };
  },
};
</script>

<style lang="scss" module>
@import "./Header.module.scss";
</style>
