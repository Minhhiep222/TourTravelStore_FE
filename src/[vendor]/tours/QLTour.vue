<template>
  <div class="grid">
    <div class="row">
      <div class="col-md-12">
        <div class="groud_action gap-2">
          <!-- <select
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
            </div> -->
          <!-- <button
              class="text-white font-medium bg-blue-500 p-2 rounded hover:bg-blue-600"
              @click="pageCreate"
            >
              Thêm tour du lịch
            </button> -->
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
                class="bg-green-500 hover:bg-green-600"
                @click="updateStatus(tour.id, 1)"
              >
                <i class="fas fa-check"></i>
                Duyệt Tour
              </button>
              <button
                class="bg-red-500 hover:bg-red-600"
                @click="updateStatus(tour.id, 2)"
              >
                <i class="fas fa-trash-alt"></i>
                Không duyệt Tour
              </button>

              <!-- <button
                  class="bg-red-500 hover:bg-red-600"
                  @click="detailTour(tour.id)"
                >
                  <i class="fas fa-info-circle"></i>
                  CHi tiết
                </button>  -->
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
    <!-- <div
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
      </div> -->
  </div>
</template>

<script>
document.title = "Trang người bán";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  name: "QLTour",
  data() {
    return {
      tours: [], // Danh sách các tour
      tourToDelete: null,
      isModalVisible: false,
      count: 0, // Tổng số tour
    };
  },
  methods: {
    async fetchTours() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/list`
        );

        // Lọc các tour có availability = 0
        const availableTours = response.data.tours.filter(
          (tour) => tour.availability === 0
        );

        if (availableTours.length === 0) {
          console.log("Không có tour nào với availability = 0.");
          this.tours = []; // Đảm bảo danh sách tours trống
          return;
        }

        this.tours = availableTours;
      } catch (error) {
        console.error("Failed to fetch tour data:", error);
      }
    },

    formatVND(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    async updateStatus(tourId, status) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/tours/${tourId}/status`,
          {
            status: status,
            availability: status === 1 ? 1 : 0,
          }
        );
        if (response.status === 200) {
          this.notifySuccess(status === 1 ? "Duyệt tour" : "Không duyệt tour");
          this.fetchTours();
        }
      } catch (error) {
        console.error("Failed to update status:", error);
        this.notifyError(status === 1 ? "Duyệt tour" : "Không duyệt tour");
      }
    },

    getImageUrl(urlImage) {
      return `http://127.0.0.1:8000/images/${urlImage}`;
    },

    notifySuccess(message) {
      toast.success(`${message} thành công !`, {
        autoClose: 1500,
      });
    },

    notifyError(message) {
      toast.error(`${message} thất bại !`, {
        autoClose: 1500,
      });
    },

    // closeModal() {
    //   this.isModalVisible = false; // Đóng modal
    // },

    // confirmDelete() {
    //   if (this.tourToDelete) {
    //     axios
    //       .delete(`http://127.0.0.1:8000/api/tours/${this.tourToDelete}`)
    //       .then(() => {
    //         this.notifySuccess("Xóa tour thành công");
    //         this.fetchTours();
    //       })
    //       .catch((error) => {
    //         console.error("Failed to delete tour:", error);
    //         this.notifyError("Xóa tour thất bại");
    //       })
    //       .finally(() => {
    //         this.isModalVisible = false; // Hide the modal after operation
    //         this.tourToDelete = null; // Reset the tour ID
    //       });
    //   }
    // },

    async countTour() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/total/count`
        );
        this.count = response.data.count;
      } catch (error) {
        console.error("Failed to fetch tour data:", error);
      }
    },
  },

  mounted() {
    // Fetch dữ liệu ban đầu
    this.fetchTours();
    this.countTour();

    const message = this.$route.query.message;
    // Gửi thông báo dựa trên message trong URL query
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

    // Xóa message khỏi URL sau 3 giây
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
