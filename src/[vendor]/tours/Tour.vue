<template>
  <div class="grid">
    <div class="row">
      <div class="col-md-12">
        <div class="groud_action gap-2">
          <select
            class="font-medium bg-white-500 p-2 rounded text-black-600 shadow-sm focus:outline-none"
            v-model="sortBy"
            @change="fetchTours"
          >
            <option selected class="border-b" value="latest">Mới nhất</option>
            <option class="border-b" value="price">Giá thành</option>
          </select>
          <div
            class="font-medium bg-white-500 p-2 rounded text-black-600 shadow-sm"
          >
            Số lượng: {{ this.count }}
          </div>
          <button
            class="text-white font-medium bg-blue-500 p-2 rounded hover:bg-blue-600"
            @click="pageCreate"
          >
            Thêm tour du lịch
          </button>
        </div>
        <div class="tour_list">
          <div class="tour_item bg-white" v-for="tour in tours" :key="tour.id">
            <div class="left-section">
              <img
                alt="Main tour image"
                height="120"
                :src="getImageUrl(tour.images[0]?.image_url)"
                width="120"
                class="min-h-28"
              />
              <div class="image-grid">
                <img
                  v-for="image in tour.images?.slice(0, 2)"
                  :key="image.id"
                  alt="Tour image"
                  height="40"
                  :src="getImageUrl(image?.image_url)"
                  width="40"
                  class="image-grid-item"
                />
                <div
                  class="view-more image-grid-item"
                  v-if="tour.images.length > 2"
                >
                  Xem ảnh
                </div>
              </div>
            </div>

            <div class="middle-section">
              <h2 class="">{{ tour.name }}</h2>
              <div class="rating">
                <i
                  v-for="star in Math.floor(tour.avgReview)"
                  v-bind:key="star"
                  class="fas fa-star text-blue-400"
                ></i>
                <i
                  v-if="tour.avgReview % 1 !== 0"
                  class="fas fa-star-half-alt text-blue-400"
                ></i>
              </div>
              <div class="location text-sm">
                <i class="fas fa-map-marker-alt text-blue-600"></i>
                {{ tour.location }}
              </div>
              <div class="features">
                <div class="mr-3">
                  <i class="fas fa-bicycle"></i>
                  Cho thuê xe đạp
                </div>
                <div class="mr-3">
                  <i class="fas fa-car"></i>
                  Cho thuê xe hơi
                </div>
                <div class="mr-2">
                  <i class="fas fa-plane"></i>
                  Đưa đón sân bay
                </div>
              </div>
              <div class="payment-info">
                <i class="fas fa-check-circle"></i>
                Không Thanh Toán Ngay
                <span>Thanh Toán tại địa điểm đặt không cần thẻ tín dụng</span>
              </div>
            </div>

            <div class="right-section flex flex-col items-left">
              <div v-if="tour.status == '0'" class="status text-orange-400">
                Đang chờ kiểm duyệt
              </div>
              <div v-if="tour.status == '1'" class="status text-green-500">
                Đang hoạt động
              </div>
              <div v-if="tour.status == '2'" class="status text-red-500">
                Ngưng hoạt động
              </div>
              <div class="text-orange-500 font-bold">
                {{ formatVND(tour.price) }} VND
              </div>
              <div class="original-price">
                {{ formatVND(tour.price + tour.price * 0.2) }} VND
              </div>
              <!-- <div class="bookings">{{ tour.bookings }} lượt đặt</div> -->
            </div>

            <div class="buttons text-white font-medium">
              <button
                class="bg-red-500 hover:bg-red-600"
                @click="deleteTour(tour.id)"
              >
                <i class="fas fa-trash-alt"></i>
                Xóa Tour
              </button>
              <button
                class="bg-green-500 hover:bg-green-600"
                @click="pageEdit(tour.id)"
              >
                <i class="fas fa-edit"></i>
                Sửa Tour
              </button>
              <button
                class="bg-red-500 hover:bg-red-600"
                @click="detailTour(tour.id)"
              >
                <i class="fas fa-info-circle"></i>
                CHi tiết
              </button>
            </div>
          </div>

          <nav
            aria-label="Page navigation"
            v-if="links"
            class="flex justify-center mt-4"
          >
            <div class="flex items-center space-x-2">
              <!-- Previous Button -->
              <button
                @click.prevent="fetchTours(meta.current_page - 1)"
                :disabled="!links.prev"
                class="px-2 py-1 rounded-l-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <i class="fa fa-angles-left text-blue-800"></i>
              </button>

              <!-- Page Numbers -->
              <div class="flex">
                <template v-for="page in meta.last_page" :key="page">
                  <button
                    @click.prevent="fetchTours(page)"
                    class="px-3 py-2 border border-gray-300 transition-all duration-300 hover:bg-blue-50 text-sm font-semibold tracking-tight hover:text-blue-600 hover:border-blue-300 focus:z-10 focus:ring-2 focus:ring-blue-200"
                    :class="{
                      'bg-blue-500 text-white hover:bg-blue-600 border-blue-500':
                        page === meta.current_page,
                      'text-gray-600': page !== meta.current_page,
                    }"
                  >
                    {{ page }}
                  </button>
                </template>
              </div>

              <!-- Next Button -->
              <button
                @click.prevent="fetchTours(meta.current_page + 1)"
                :disabled="!links.next"
                class="px-2 py-1 rounded-r-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <i class="fa fa-angles-right text-blue-800"></i>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modal for confirmation -->
    <div
      v-if="isModalVisible"
      @click="closeModal"
      class="modal fade show"
      style="display: block; z-index: 1050"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content p-3">
          <div class="modal-header">
            <h5 class="modal-title text-3xl text-red-600">
              Xóa Tour <i class="fa-solid fa-triangle-exclamation"></i>
            </h5>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa tour này không?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Đóng
            </button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">
              <i class="fas fa-trash-alt"></i> Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
document.title = "Trang người bán";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Cookies from "js-cookie";

export default {
  name: "TourList",
  data() {
    return {
      tours: [],
      meta: {},
      links: {},
      user_id: 0,
      sortBy: "latest", // Giá trị mặc định
      tourToDelete: null,
      isModalVisible: false,
      count: 0,
    };
  },
  methods: {
    async fetchTours(page = 1) {
      console.log(this.user_id);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/list?page=${page}&per_page=3&sort=${this.sortBy}&user_id=${this.user_id}`
        );
        if (response.data.tours.length === 0) {
          console.log("Không có tour nào để hiển thị.");
          return;
        }
        this.tours = response.data.tours;
        this.meta = response.data.meta;
        this.links = response.data.links;
      } catch (error) {
        console.error("Failed to fetch tour data:", error.response);
      }
    },

    formatVND(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    async fetchToursSort() {
      try {
        const response = await axios.get(`/api/tours/sort?sort=${this.sortBy}`);
        this.tours = response.data;
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách tour:", error);
      }
    },

    getImageUrl(urlImage) {
      return `http://127.0.0.1:8000/images/${urlImage}`;
    },

    pageCreate() {
      window.location.href = "http://localhost:3000/minh-hiep/tours/create";
    },

    pageEdit($id) {
      // const secretKey = 'your-secret-key'; // Đặt secret key của bạn ở đây
      // const hashedId = this.hashId($id, secretKey);
      window.location.href = `http://localhost:3000/minh-hiep/tours/edit/${$id}`;
    },

    notifySuccess(message) {
      toast.success(`${message} thành công !`, {
        autoClose: 1500,
      }); // ToastOptions
    },

    viewTourDetails() {
      console.log();
    },

    notifyError(message) {
      toast.error(`${message} thất bại !`, {
        autoClose: 1500,
      }); // ToastOptions
    },

    closeModal() {
      this.isModalVisible = false; // Đóng modal
    },

    deleteTour(tourId) {
      this.tourToDelete = tourId;
      this.isModalVisible = true;
    },

    confirmDelete() {
      if (this.tourToDelete) {
        axios
          .delete(`http://127.0.0.1:8000/api/tours/${this.tourToDelete}`)
          .then(() => {
            this.notifySuccess("Xóa tour thành công");
            this.fetchTours();
          })
          .catch((error) => {
            console.error("Failed to delete tour:", error);
            this.notifyError("Xóa tour thất bại");
          })
          .finally(() => {
            this.isModalVisible = false; // Hide the modal after operation
            this.tourToDelete = null; // Reset the tour ID
          });
      }
    },

    async countTour(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/total/count?user_id=${id}`
        );
        console.log(response);
        this.count = response.data.count;
      } catch (error) {
        console.error("Failed to fetch tour data:", error);
      }
    },

    detailTour(id) {
      this.$router.push({ name: "Detail", params: { id } });
    },
    //Get user data
    async fetchUserData() {
      try {
        const jwt = Cookies.get("tokenLogin");
        if (!jwt) {
          this.$router.push({ name: "/" });
          return;
        }
        const response = await fetch(
          `http://localhost:8000/api/inforCurrentUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`, // Nếu cần sử dụng token để xác thực
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const user = data.data;
        this.user_id = user.id;
        this.fetchTours();
        this.countTour(user.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // this.$router.push({ name: "login" });
        // return null;
      }
    },
  },

  mounted() {
    //FetchData Tour
    this.fetchUserData();
    const message = this.$route.query.message;
    //Send Notification
    switch (message) {
      case "successEdit":
        this.notifySuccess("Sửa");
        break;
      case "errorEdit":
        this.notifyError("Sửa");
        break;
      case "successCreate":
        this.notifySuccess("Thêm");
        break;
      case "errorCreate":
        this.notifyError("Thêm");
        break;
    }

    //Replace url when success action
    setTimeout(() => {
      this.$router.replace({
        query: { ...this.$route.query, message: undefined },
      });
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/Global.module.scss";
@use "../../assets/Tour.module.scss";
</style>
<style>
@import "./Tour.css";
</style>
