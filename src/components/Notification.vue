<template>
  <div
    v-for="notification in notifications.slice().reverse()"
    :key="notification.id"
    class="bg-white"
  >
    <div class="flex items-start p-4">
      <img
        alt="Shopee logo"
        class="w-12 h-12"
        height="50"
        src="https://image.pitchbook.com/w8elAV0qwPeHVx5Z0Xl2VJTEbst1489735146585_200x200"
        width="50"
      />
      <div class="ml-4">
        <h1 class="text-lg font-semibold">
          {{ notification.tour.name }}
        </h1>
        <p class="text-gray-600">
          {{ notification.tour.description }}
        </p>
        <div class="flex mt-2 space-x-2">
          <img
            v-if="
              notification &&
              notification.tour &&
              notification.tour.images.length > 0
            "
            :src="`http://127.0.0.1:8000/images/${notification.tour.images[0]?.image_url}`"
            alt="Tour image"
            class="w-24 h-24 object-cover"
            height="100"
            width="100"
          />
          <img
            v-if="
              notification &&
              notification.tour &&
              notification.tour.images.length > 0
            "
            :src="`http://127.0.0.1:8000/images/${notification.tour.images[1]?.image_url}`"
            alt="Tour image"
            class="w-24 h-24 object-cover"
            height="100"
            width="100"
          />
          <img
            v-if="
              notification &&
              notification.tour &&
              notification.tour.images.length > 0
            "
            :src="`http://127.0.0.1:8000/images/${notification.tour.images[2]?.image_url}`"
            alt="Tour image"
            class="w-24 h-24 object-cover"
            height="100"
            width="100"
          />
        </div>
        <p class="text-gray-500 mt-2">
          {{ formatTime(notification.created_at) }}
        </p>
      </div>
      <button
        @click="detailTour(notification.tour.encrypt_id)"
        class="ml-auto bg-gray-100 text-gray-700 px-4 py-2 rounded"
      >
        Xem Chi Tiết
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { inject, ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
export default {
  name: "NotificationComponent",
  setup() {
    const valueCurrentUser = inject("valueCurrentUser");
    const notifications = ref([]);
    const router = useRouter();

    const detailTour = (id) => {
      router.push({ name: "Detail", params: { id } });
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
              params: { user_id: valueCurrentUser.value.id },
            }
          );
          notifications.value = response.data.data;
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
      }
    };

    const formatTime = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    onMounted(() => {
      fetchNotification();
    });
    watchEffect(() => {
      fetchNotification();
      valueCurrentUser;
    }, [valueCurrentUser]);

    return {
      valueCurrentUser,
      notifications,
      fetchNotification,
      formatTime,
      detailTour,
    };
  },
};
</script>
<style lang="scss" module></style>
