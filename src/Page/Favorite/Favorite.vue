<template>
  <div class="bg-gray-100">
    <!-- <div @click="logData">logData</div> -->
    <div class="p-4" id="app">
      <div class="bg-white p-4 rounded shadow-sm">
        <div class="flex items-center border-b pb-2">
          <div class="flex-1 font-semibold">Địa Điểm</div>
          <div class="w-1/5 text-center font-semibold">Số Tiền</div>
          <div class="w-1/5 text-center font-semibold">Thời Gian Kéo Dài</div>
          <div class="w-1/5 text-center font-semibold">Thao Tác</div>
        </div>

        <div
          v-for="(item, index) in favoriteTour"
          :key="index"
          class="flex items-center border-b py-4"
        >
          <img
            class="imgFavorite"
            :src="`http://127.0.0.1:8000/images/${item.images[0]?.image_url}`"
            alt="Beach Paradise"
          />
          <div class="flex-1">
            <div class="font-semibold">
              {{ item.name }}
            </div>
            <div class="text-sm text-gray-500">{{ item.description }}</div>
          </div>

          <div class="w-1/5 text-center text-red-500 font-semibold">
            {{ item.price }}
          </div>
          <div class="w-1/5 text-center font-semibold">
            {{ item.duration }} ngày
          </div>
          <!-- Thời gian kéo dài -->
          <div class="w-1/5 text-center">
            <div
              class="text-red-500 cursor-pointer"
              @click="removeItem(item.id)"
            >
              Xóa
            </div>
            <div
              class="text-sm text-gray-500 cursor-pointer"
              @click="detailTour(item.id)"
            >
              Đặt tour
            </div>
          </div>
        </div>

        <!-- Phân trang -->
        <div class="flex justify-between items-center mt-4">
          <button
            @click="prevPage"
            :disabled="currentPage == 1"
            class="bg-gray-300 p-2 rounded"
          >
            Trước
          </button>
          <span>Trang {{ currentPage }} / {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage == totalPages"
            class="bg-gray-300 p-2 rounded"
          >
            Sau
          </button>
        </div>

        <!-- san pham -->
        <!-- <div class="h-32"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref, inject, watchEffect } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "FavoriteComponent",
  setup() {
    const router = useRouter();
    const favoriteTour = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const nextPageUrl = ref(null);
    const prevPageUrl = ref(null);
    const valueCurrentUser = inject("valueCurrentUser");

    const getFavoritesTour = async (page = 1) => {
      let userID = null;
      if (valueCurrentUser.value && valueCurrentUser.value.id) {
        userID = valueCurrentUser.value.id;
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getToursFavorite",
          {
            params: {
              user_id: userID,
              page: page,
            },
          }
        );
        favoriteTour.value = response.data.data.data;
        totalPages.value = response.data.data.last_page;
        nextPageUrl.value = response.data.data.next_page_url;
        prevPageUrl.value = response.data.data.prev_page_url;
        currentPage.value = page;
        console.log("data", response.data.data);
      } catch (error) {
        console.error(
          "Failed to retrieve tours:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const nextPage = () => {
      if (nextPageUrl.value) {
        const nextPageNumber = currentPage.value + 1;
        getFavoritesTour(nextPageNumber);
      }
    };

    const prevPage = () => {
      if (prevPageUrl.value) {
        const prevPageNumber = currentPage.value - 1;
        getFavoritesTour(prevPageNumber);
      }
    };

    const logData = () => {
      console.log("favoriteData", favoriteTour.value);
      console.log("nextPageUrl", nextPageUrl.value);
      console.log("prevPageUrl", prevPageUrl.value);
    };
    const removeItem = async (index) => {
      let userID = null;
      if (valueCurrentUser.value && valueCurrentUser.value.id) {
        userID = valueCurrentUser.value.id;
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/api/deleteFavorite",
          {
            params: {
              tour_id: index,
              user_id: userID,
            },
          }
        );
        console.log("data", response.data);
        if (response.data.message == "Delete tour favorite successful") {
          Swal.fire({
            title: "Đã xóa!",
            text: "Đã xóa khỏi mục yêu thích",
            icon: "success",
            confirmButtonText: "OK",
          });
          getFavoritesTour();
        }
      } catch (error) {
        console.error(
          "Failed to retrieve tours:",
          error.response ? error.response.data.message : error.message
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response ? error.response.data.error : error.error,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    };
    const detailTour = (id) => {
      router.push({ name: "Detail", params: { id } });
    };

    onMounted(() => {
      // getFavoritesTour();
    });
    watchEffect(() => {
      getFavoritesTour();
    }, [valueCurrentUser]);

    return {
      favoriteTour,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      logData,
      removeItem,
      detailTour,
    };
  },
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.imgFavorite {
  width: 100px;
  height: 100px;
}
</style>
