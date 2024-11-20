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
          <div class="tour_item" v-for="tour in tours" :key="tour.id">
            <div class="left-section">
              <img
                alt="Main tour image"
                height="120"
                :src="getImageUrl(tour.images[0]?.image_url)"
                width="120"
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
              <h2>{{ tour.name }}</h2>
              <div class="rating">
                <!-- <i v-for="star in Math.floor(tour.rating)" class="fas fa-star"></i>
                  <i v-if="tour.rating % 1 !== 0" class="fas fa-star-half-alt"></i>
                  <span>({{ tour.reviews }} Đánh giá)</span> -->
              </div>
              <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                {{ tour.location }}
              </div>
              <div class="features">
                <div>
                  <i class="fas fa-bicycle"></i>
                  Cho thuê xe đạp
                </div>
                <div>
                  <i class="fas fa-car"></i>
                  Cho thuê xe hơi
                </div>
                <div>
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

            <div class="right-section">
              <div class="text-orange-500 font-bold">
                {{ formatVND(tour.price) }} VND
              </div>
              <!-- <div class="original-price">{{ tour.original_price }} VND</div>
                <div class="bookings">{{ tour.bookings }} lượt đặt</div> -->
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

          <nav aria-label="Page navigation example mt-4" v-if="links">
            <ul class="pagination mt-4">
              <li class="page-item" :class="{ disabled: !links.prev }">
                <a
                  class="p-1 page-link"
                  href="#"
                  @click.prevent="fetchTours(meta.current_page - 1)"
                  aria-label="Previous"
                  :disabled="!links.prev"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li
                v-for="page in meta.last_page"
                :key="page"
                class="page-item"
                :class="{ active: page === meta.current_page }"
              >
                <a
                  class="p-1 px-2 page-link"
                  href="#"
                  @click.prevent="fetchTours(page)"
                  >{{ page }}</a
                >
              </li>
              <li class="page-item" :class="{ disabled: !links.next }">
                <a
                  class="p-1 page-link"
                  href="#"
                  @click.prevent="fetchTours(meta.current_page + 1)"
                  aria-label="Next"
                  :disabled="!links.next"
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
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
