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
            <a class="text-gray-800" href="#">Hợp tác với chúng tôi</a>
            <span v-if="valueCurrentUser" @click="goToFavorite" class="text-gray-800 d-flex align-items-center justify-content-around" style="cursor: pointer">
                Đã Lưu
                <font-awesome-icon :class="$style.solidSave" class="ml-0.5" icon="bookmark" />
            </span>

              <div v-if="valueCurrentUser" 
                   @mouseenter="handleDisplayNotify(true)" 
                    @mouseleave="handleDisplayNotify(false)" style="cursor: pointer; position: relative">
                    <span 
                    @click="turnOnOffNotification" 
                     class="text-gray-800 d-flex align-items-center justify-content-around"  style="cursor: pointer;">
                    Thông báo
                    <font-awesome-icon 
                        v-if="statusNotication == true" 
                        :class="$style.solidBell" 
                        class="ml-0.5" 
                        icon="bell" 
                      />
                      <font-awesome-icon 
                      v-if="statusNotication == false" 
                        :class="$style.solidBell" 
                        class="ml-0.5" 
                        icon="bell-slash" 
                      />


                  </span>
                  <div v-if="totalNotRead > 0" :class="$style.total__notRead">
                    {{totalNotRead}}
                  </div>
                  <div v-if="displayNotification" :class="$style.wrap__notifcation">
                  <div :class="$style.title__notification">
                    Thông báo mới nhận
                  </div>
                  <div v-for="(notification, index) in  notifications.slice().reverse().slice(0, 3)"   
                  @click="readNotification(notification.encrypt_id || notification.tour.encrypt_id)"

                  :key="index" :class="[$style.wrap__item, notification.read === 1 ? '' : $style.item_notRead]">
                    <img :class="$style.item__img" src="https://image.pitchbook.com/w8elAV0qwPeHVx5Z0Xl2VJTEbst1489735146585_200x200" alt="">
                    <div :class="$style.item__content">
                        <h1 v-if="notification" :class="$style.item__name">
                            {{notification.tour_name || notification.tour.name}} 
                        </h1>
                        <div :class="$style.item__des">
                          {{ (notification.tour_description || notification.tour.description)
                            .split(' ')
                            .reduce((acc, word) => {
                              if ((acc + word).length <= 120) {
                                acc += (acc ? ' ' : '') + word;
                              }
                              return acc;
                            }, '') }}

                        </div>
                      <div :class="$style.wrap_listImg">
                         <img 
                            v-if="notification && notification.tour && notification.tour.images.length > 0"
                            :class="$style.content__img" 
                            :src="`http://127.0.0.1:8000/images/${notification.tour.images[0]?.image_url}`"
                            alt="Tour image"
                          >
                          <img 
                            v-if="notification && notification.tour && notification.tour.images.length > 0"
                            :class="$style.content__img" 
                            :src="`http://127.0.0.1:8000/images/${notification.tour.images[1]?.image_url}`"
                            alt="Tour image"
                          >
                          <img 
                            v-if="notification && notification.tour && notification.tour.images.length > 0"
                            :class="$style.content__img" 
                            :src="`http://127.0.0.1:8000/images/${notification.tour.images[2]?.image_url}`"
                            alt="Tour image"
                          >
                      </div>
                   </div>      
            </div>
            <div @click="seenAllNotifiCation" :class="$style.more__item">
                      Xem tất cả  
                   </div>
              </div>
              </div>
            <a class="text-gray-800" href="#">Đặt chỗ của tôi</a>

            <div class="flex items-center space-x-1">
              <button
                v-if="valueCurrentUser"
                @click="handleChat"
                class="text-blue-500 mr-1"
              >
                <div class="relative inline-flex items-center">
                  <i
                    class="fa fa-comment-dots text-2xl text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
                  ></i>
                  <span
                    class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    3
                  </span>
                </div>
              </button>

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
          <a  class="text-gray-600 hover:text-gray-800" href="#">Vé máy bay</a>
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
import { inject,onMounted,ref,watch } from "vue";
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
    const notifications = ref([])
    const setCurrentUser = inject("setCurrentUser");
    const handleDisplayLogin = inject("handleDisplayLogin");
    const handleDisplayRegister = inject("handleDisplayRegister");
    const totalNotRead = ref([]);
    const statusNotication = ref();
    const showCurrentUser = () => {
      console.log('notification',notifications)
      console.log("Current User Value:", valueCurrentUser);
      console.log('totalNotRead',totalNotRead);
    };

    const checkNotifyUser = async () => {
    
    if (valueCurrentUser && valueCurrentUser.value && valueCurrentUser.value.id) {
        try {
          const response = await axios.get('http://localhost:8000/api/checkNotifyUser', {
      params: {
        user_id: valueCurrentUser.value.id, 
      }
    });
    console.log('checkNotifi',response.data)
    statusNotication.value = response.data.data
  } catch (error) {
    console.error("Failed to retrieve notifications:", error.response ? error.response.data.message : error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response ? error.response.data.message : error.message,
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

} else {
  return
}
    }


     
    const handleDisplayNotify = (status) => {
         displayNotification.value = status;
    };
    const fetchNotification = async () => {
      if (valueCurrentUser && valueCurrentUser.value && valueCurrentUser.value.id) {
          try {
      const response = await axios.get('http://localhost:8000/api/getNotification', {
        params: {
          user_id: valueCurrentUser.value.id, 
        }
      });
      console.log('Notifications:', response.data);
      notifications.value = response.data.data;  
      totalNotRead.value = response.data.notRead
    } catch (error) {
      console.error("Failed to retrieve notifications:", error.response ? error.response.data.message : error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response ? error.response.data.message : error.message,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
      
  } else {
    return
  }
};  



    const seeAll = () => {
      router.push({ name: "Favorite"});
    }
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

    const handleChat = () => {
      router.push({ path: "/minh-hiep/chat" });
    };
    const logValue = () => {
      console.log('notification',notifications)
    }
    const readNotification = async (id) => {
  try {
    const response = await axios.post('http://localhost:8000/api/readNotification', {
      user_id: valueCurrentUser.value.id, 
      tour_id: id,  
    });
    console.log('read:', response.data);
    fetchNotification();
    router.push({ name: "Detail", params: { id } });
  } catch (error) {
    console.error("Failed to retrieve notifications:", error.response ? error.response.data.message : error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response ? error.response.data.message : error.message,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
};

  const turnOfNotification = async () => {
    try {
    const response = await axios.post('http://localhost:8000/api/turnOffNotification', {
      user_id: valueCurrentUser.value.id, 
    });
    console.log('turnoff:', response.data);
    valueCurrentUser.value = response.data.data;
  } catch (error) {
    console.error("Failed to retrieve notifications:", error.response ? error.response.data.message : error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response ? error.response.data.message : error.message,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
  }
  const turnOnOffNotification = async () => {
    statusNotication.value = !statusNotication.value
      turnOfNotification()
  }
  const goToChatBot = () => {
    router.push({ name: "ChatBot" });
  }
    const setLogout = () => {
      document.cookie =
        "tokenLogin=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      handleDisplayLogin(false);
      setCurrentUser(null);
    };

    return {
      valueCurrentUser,
      setLogin,
      setLogout,
      showCurrentUser,
      setRegister,
      goToFavorite
    };
  },
};
</script>

<style lang="scss" module>
@import "./Header.module.scss";
</style>
