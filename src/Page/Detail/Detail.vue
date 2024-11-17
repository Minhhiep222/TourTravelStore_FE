<template>
  <!-- /// -->
  <div class="max-w-6xl mx-auto">
    <div v-if="errorValue" class="alert alert-danger mt-3">
      <p>Error: {{ errorValue }}</p>
    </div>
    <div class="bg-blue-700 text-white p-4 rounded-lg">
      <div class="text-sm mb-2">
        <!-- <a class="text-white" href="#">
      Xperience
     </a>
     /
     <a class="text-white" href="#">
      Việt Nam
     </a>
     /
     <a class="text-white" href="#">
      Tỉnh Kiên Giang
     </a>
     /
     <a class="text-white" href="#">
      Phú Quốc
     </a>
     /
     <a class="text-white" href="#">
      xã Hòn Thơm
     </a> -->

        <a class="text-lime-400" href="#">
          <div v-if="valueTour">{{ valueTour.name }}</div>
        </a>
      </div>
      <h1 class="text-3xl font-bold mb-2">
        <div v-if="valueTour">{{ valueTour.name }}</div>
      </h1>
      <div class="flex items-center mb-4">
        <i class="fas fa-map-marker-alt mr-2"> </i>
        <span> Gam Ghi island, Hòn Thơm, Phu Quoc, Kien Giang, Vietnam </span>
        <a class="text-lime-400 ml-2" href="#"> Xem bản đồ </a>
      </div>
      <div class="flex items-center mb-4">
        <i class="fas fa-calendar-alt mr-2"> </i>
        <span>
          Thời gian tour |
          <span v-if="valueTour">{{ valueTour.duration }}</span>
        </span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
          <img
            class="w-full h-full object-cover rounded-lg"
            height="400"
            width="600"
            v-if="valueTour && valueTour.images && valueTour.images.length > 0"
            :src="`http://127.0.0.1:8000/images/${valueTour.images[0].image_url}`"
            :alt="valueTour.images[0]?.alt_text"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <img
            class="w-full h-full object-cover rounded-lg"
            height="300"
            width="200"
            v-if="valueTour && valueTour.images && valueTour.images.length > 0"
            :src="`http://127.0.0.1:8000/images/${valueTour.images[1]?.image_url}`"
            :alt="valueTour.images[1]?.alt_text"
          />
          <img
            class="w-full h-full object-cover rounded-lg"
            height="400"
            width="600"
            v-if="valueTour && valueTour.images && valueTour.images.length > 0"
            :src="`http://127.0.0.1:8000/images/${valueTour.images[2]?.image_url}`"
            :alt="valueTour.images[2]?.alt_text"
          />
          <img
            class="w-full h-full object-cover rounded-lg"
            height="400"
            width="600"
            v-if="valueTour && valueTour.images && valueTour.images.length > 0"
            :src="`http://127.0.0.1:8000/images/${valueTour.images[3]?.image_url}`"
            :alt="valueTour.images[3]?.alt_text"
          />
          <div class="relative">
            <img
              class="w-full h-full object-cover rounded-lg"
              height="400"
              width="600"
              v-if="
                valueTour && valueTour.images && valueTour.images.length > 0
              "
              :src="`http://127.0.0.1:8000/images/${valueTour.images[4]?.image_url}`"
              :alt="valueTour.images[4]?.alt_text"
            />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-center">
          <div
            class="bg-blue-800 text-white rounded-full px-3 py-1 text-lg font-bold"
          >
            8.8
          </div>
          <div class="ml-2">
            <div class="text-lg font-bold">Tốt</div>
            <div class="text-sm">Từ 49 đánh giá</div>
          </div>
        </div>
        <div class="flex items-center">
          <i class="fas fa-map-marker-alt text-blue-800 mr-2"> </i>
          <a class="text-blue-800 text-lg" href="#"> Xem bản đồ </a>
        </div>
        <div class="text-lg">
          <div v-if="valueTour">{{ valueTour.name }}</div>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg mt-4 flex items-center justify-between">
      <div class="text-red-600 text-2xl font-bold">
        <div>
          <p v-if="valueTour">{{ formatPrice(valueTour.price) }} VND</p>
        </div>
      </div>
      <!-- <div class="text-gray-500 line-through">
     650.000 VND
    </div> -->
      <button
        @click="bookTour(tourID)"
        class="bg-orange-500 text-white px-4 py-2 rounded-lg"
      >
        Đặt vé
      </button>
    </div>
  </div>

  <div class="bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto mt-3">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div
          class="bg-blue-500 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center"
        >
          9.2
        </div>
        <div class="ml-4">
          <div class="text-blue-600 font-bold">
            Xuất sắc <i class="fas fa-chevron-right"></i>
          </div>
          <div class="text-gray-500">Từ 38 đánh giá</div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="text-blue-600 font-bold flex items-center">
          <i class="fas fa-map-marker-alt"></i> Xem bản đồ
          <i class="fas fa-chevron-right ml-1"></i>
        </div>
        <div class="ml-4 text-gray-500">Phú Quốc</div>
      </div>
    </div>
    <div class="flex justify-between items-center mb-4">
      <div class="w-full">
        <div class="bg-blue-100 p-4 rounded-lg">
          <div class="flex items-center mb-2">
            <i class="fas fa-info-circle text-blue-500"></i>
            <div class="ml-2 text-blue-600 font-bold">Bạn sẽ trải nghiệm</div>
          </div>
          <ul class="list-disc list-inside text-gray-700">
            <li>Tận hưởng vẻ đẹp của biển xanh và cát trắng tại Phú Quốc</li>
            <li>Khám phá Hòn Móng Tay, Hòm Gầm Ghì, Hòn Mây Rút</li>
            <li>
              Thư giãn trên bãi biển cát mịn và lặn ống thở khám phá thế giới
              dưới nước đầy màu sắc
            </li>
          </ul>
          <div class="text-blue-600 mt-2">Đọc thêm</div>
        </div>
        <div class="mt-4 text-blue-600 flex items-center">
          <i class="fas fa-info-circle"></i>
          <div class="ml-2">
            Thông tin liên hệ, Tiện ích, Dịch vụ ngôn ngữ và nhiều thông tin
            khác
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 p-4 rounded-lg text-center mb-4">
      <div class="text-blue-600 font-bold flex items-center justify-center">
        <i class="fas fa-comment-dots"></i>
        <div class="ml-2">Để lại đánh giá khi bạn có thể!</div>
      </div>
      <div class="text-gray-500 mt-2">
        Điều này sẽ giúp các du khách khác khi họ lên kế hoạch du lịch.
      </div>
    </div>
  </div>

  <div class="bg-white max-w-6xl mx-auto mt-3">
    <div class="p-6 rounded-lg shadow-md mb-4">
      <div class="flex justify-between items-start">
        <ul class="list-disc pl-5">
          <li class="mb-2"><strong>08:30-17:00 Đón khách</strong></li>
          <li class="mb-2">Tham quan đảo Gầm Ghì, lặn ống thở và tắm biển</li>
          <li class="mb-2">
            Tham quan hòn Bườm hoặc hòn Móng Tay, lặn ống thở và tắm biển
          </li>
          <li class="mb-2">Tham quan hòn Mây Rút Trong và dùng bữa trưa</li>
          <li class="mb-2">
            Trải nghiệm dịch vụ đi dưới biển Seawalker (chi phí tự túc)
          </li>
          0-9
          <li class="mb-2">Trả khách</li>
          <li class="text-gray-500">Kết thúc tour.</li>
        </ul>
        <h2 class="text-xl font-bold">Lịch trình tour</h2>
      </div>
      <a href="#" class="text-blue-600 mt-4 inline-block"
        >Xem lịch trình đầy đủ <i class="fas fa-chevron-right"></i
      ></a>
    </div>
  </div>

  <div class="bg-white w-full">
    <div class="max-w-6xl mx-auto py-4">
      <h1 class="text-xl font-medium mb-4">
        Xếp hạng và đánh giá tổng thể Three Islands Excursion by Canoe in South
        Phu Quoc - Day Tour
      </h1>
      <div class="flex items-center mb-6">
        <div class="bg-blue-50 rounded-t-lg px-4 py-2">
          <span class="text-blue-600 font-medium">Storeloka (38)</span>
        </div>
      </div>
      <div class="flex items-center mb-6">
        <div
          class="flex items-center justify-center w-24 h-24 bg-blue-600 text-white text-4xl font-bold rounded-full"
        >
          9.1
        </div>
        <div class="ml-4">
          <div class="text-blue-600 text-2xl font-bold">Xuất sắc</div>
          <div class="text-gray-600">Từ 38 đánh giá</div>
          <div class="text-gray-600">
            Bởi khách du lịch trong <span class="text-blue-600">Storeloka</span>
          </div>
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 mb-6">
        <div class="text-gray-800 font-medium mb-2">
          Mọi người thường nhắc đến Three Islands Excursion by Canoe in South
          Phu Quoc - Day Tour
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          <button
            class="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
          >
            <i class="fas fa-check-circle mr-2"></i> Tất cả
          </button>
          <button
            class="flex items-center bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded-full"
          >
            <i class="fas fa-star mr-2"></i> Kỹ năng hướng dẫn (18)
          </button>
          <button
            class="flex items-center bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded-full"
          >
            <i class="fas fa-utensils mr-2"></i> Chất lượng đồ ăn (11)
          </button>
          <button
            class="flex items-center bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded-full"
          >
            <i class="fas fa-bus mr-2"></i> Chất lượng phương tiện (10)
          </button>
          <button
            class="flex items-center bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded-full"
          >
            <i class="fas fa-smile mr-2"></i> Tính thân thiện của người hướng
            dẫn (10)
          </button>
          <button
            class="flex items-center bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded-full"
          >
            <i class="fas fa-map-signs mr-2"></i> Hành trình tour (8)
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <i class="fas fa-sort mr-2"></i> Sắp xếp theo
            <span class="ml-2 text-blue-600">Gần đây nhất</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-filter mr-2"></i> Định dạng
            <span class="ml-2 text-blue-600">Có văn bản</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-sliders-h mr-2"></i> Sự thích
            <span class="ml-2 text-blue-600"
              >Tất cả đánh giá, Ngôn ngữ ứng dụng...</span
            >
          </div>
        </div>
      </div>
    </div>

    <div v-if="user_id != null" class="max-w-6xl mx-auto py-4">
      <div class="bg-white rounded shadow-lg mb-4 p-4">
        <form class="">
          <div class="mb-2">
            <label class="block text-gray-700 font-bold mb-2">
              Đánh giá <span class="text-red-500">*</span>
            </label>
            <div class="flex space-x-1">
              <i
                v-for="i in 5"
                v-bind:key="i"
                @click="handleRating(i)"
                :class="[
                  'cursor-pointer fa fa-star text-2xl text-gray-400 hover:text-blue-500',
                ]"
                :style="rating >= i ? { color: '#2563eb' } : { color: '#888' }"
              ></i>
            </div>
            <div v-if="errorRating" class="error">{{ errorRating }}</div>
          </div>
          <!-- image -->
          <div class="form-group">
            <label> Hình ảnh </label>
            <div class="group_image">
              <div class="image_tours" v-if="imagePreviews.length">
                <div
                  class="image-item"
                  v-for="(image, index) in imagePreviews"
                  :key="index"
                >
                  <img
                    class="image_tours-item"
                    :src="image"
                    alt="Image"
                    width="100"
                  />
                  <button
                    class="btn_removeImage"
                    @click.prevent="removeImage(index)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <img
                  class="image_tours-item button"
                  :src="imageDefault"
                  alt="Image"
                  width="100"
                  @click="openFileDialog"
                />
              </div>
              <div v-else>
                <img
                  class="image_tours-item button"
                  :src="imageDefault"
                  alt="Image"
                  width="100"
                  @click="openFileDialog"
                />
              </div>
              <input
                class="input_img"
                type="file"
                @change="handleFileUpload"
                accept=".jpg, .png, .svg, .jpeg"
                multiple
                hidden
              />
              <div v-if="errorImage" class="error">{{ errorImage }}</div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Comments </label>
            <textarea
              v-model="comment"
              class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
            <div v-if="errorComment" class="error">{{ errorComment }}</div>
          </div>
          <div class="flex items-center justify-end">
            <button
              @click.prevent="submitReviews"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-2">
        <h1 class="text-lg font-semibold">
          Đánh giá của du khách Three Islands Excursion by Canoe in Sout...
        </h1>
        <div class="flex items-center">
          <span class="mr-2">Số lượng đánh giá trên mỗi trang</span>
          <button
            @click.prevent="fetchReview(10)"
            :class="{
              'bg-blue-500 text-white px-3 py-1 rounded': selected === 10,
              'bg-gray-200 text-gray-700 px-3 py-1 rounded': selected !== 10,
            }"
          >
            10
          </button>
          <button
            @click.prevent="fetchReview(20)"
            :class="{
              'bg-blue-500 text-white px-3 py-1 rounded ml-2': selected === 20,
              'bg-gray-200 text-gray-700 px-3 py-1 rounded ml-2':
                selected !== 20,
            }"
          >
            20
          </button>
          <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded ml-2">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded ml-2">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div
        v-for="(review, index) in reviews"
        v-bind:key="index"
        class="review_item bg-white p-4 rounded-lg shadow mb-2"
      >
        <div class="flex items-start">
          <div class="flex-1">
            <div class="flex justify-between mb-2">
              <div class="flex items-center">
                <img
                  alt="Profile picture of the reviewer"
                  class="w-12 h-12 rounded-full mr-2"
                  height="50"
                  src="https://storage.googleapis.com/a1aa/image/pNKa1qUHP3bqM1rWYbyfOf2ut5x1rwDYYWKJ8aTiVrY9zquTA.jpg"
                  width="50"
                />
                <div class="flex flex-col">
                  <span class="font-semibold">
                    {{ review?.user?.name }}
                  </span>
                  <div class="flex items-center">
                    <div
                      class="flex items-center bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-sm"
                    >
                      <i class="fas fa-star"></i>
                      <span class="ml-1"> {{ review?.rating }}.0</span>
                      <span class="ml-1">/ 5 </span>
                    </div>
                    <span class="text-gray-500 ml-2 text-sm">
                      {{ formatDateTime(review?.updated_at) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="box px-3 flex flex-col items-end">
                <i class="action fa-solid fa-ellipsis cursor-pointer"></i>
                <div
                  v-if="review?.user_id === this.user_id"
                  class="action_group shadow border-b flex flex-col rounded"
                >
                  <button
                    @click.prevent="deleteReview(review?.id)"
                    class="border-b py-1 px-4 hover:bg-gray-100"
                  >
                    xóa
                  </button>
                  <button
                    @click.prevent="showModal(review?.id)"
                    class="border-b py-1 px-4 hover:bg-gray-100"
                  >
                    sửa
                  </button>
                </div>
              </div>
            </div>

            <p class="text-gray-800 mb-2">
              {{ review?.comment }}
            </p>
            <div
              v-if="review?.image_reviews.length > 0"
              class="flex space-x-2 mb-2"
            >
              <img
                v-for="(image, index) in review?.image_reviews"
                v-bind:key="index"
                alt="Image 1 of the review"
                class="w-24 h-24 rounded-lg"
                height="100"
                :src="handleGetImg(image?.image_url)"
                width="100"
              />
            </div>
            <div class="flex items-center text-blue-600">
              <i class="fas fa-thumbs-up"> </i>
              <span class="ml-1"> 4 người nghĩ đánh giá này hữu ích </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for confirmation -->
  <div
    v-if="isModalVisible"
    class="modal fade show"
    style="display: block; z-index: 1050"
  >
    <div
      class="modal-dialog"
      style="position: absolute; top: 20%; right: 35%; width: 50%"
    >
      <div class="modal-content p-3 border-none shadow">
        <div class="modal-body">
          <form class="">
            <div class="mb-2">
              <label class="block text-gray-700 font-bold mb-2">
                Đánh giá <span class="text-red-500">*</span>
              </label>
              <div class="flex space-x-1">
                <i
                  v-for="i in 5"
                  v-bind:key="i"
                  @click="handleRating(i)"
                  :class="[
                    'cursor-pointer fa fa-star text-2xl text-gray-400 hover:text-blue-500',
                  ]"
                  :style="
                    rating >= i ? { color: '#2563eb' } : { color: '#888' }
                  "
                ></i>
              </div>
            </div>
            <!-- image -->
            <div class="form-group">
              <label> Hình ảnh </label>
              <div class="group_image">
                <div class="image_tours" v-if="imagePreviews.length">
                  <div
                    class="image-item"
                    v-for="(image, index) in imagePreviews"
                    :key="index"
                  >
                    <img
                      class="image_tours-item"
                      :src="image"
                      alt="Image"
                      width="100"
                    />
                    <button
                      class="btn_removeImage"
                      @click.prevent="removeImage(index)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                  <img
                    class="image_tours-item button"
                    :src="imageDefault"
                    alt="Image"
                    width="100"
                    @click="openFileDialog"
                  />
                </div>
                <div v-else>
                  <img
                    class="image_tours-item button"
                    :src="imageDefault"
                    alt="Image"
                    width="100"
                    @click="openFileDialog"
                  />
                </div>
                <input
                  class="input_img"
                  type="file"
                  @change="handleFileUpload"
                  accept=".jpg, .png, .svg, .jpeg"
                  multiple
                  hidden
                />
                <div v-if="errorImage" class="error">{{ errorImage }}</div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Comments
              </label>
              <textarea
                v-model="comment"
                class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
              ></textarea>
              <div v-if="errorComment" class="error">{{ errorComment }}</div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Đóng
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="handleSubmitUpdate"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for confirmation -->
  <div
    v-if="isModalVisibleVerify"
    @click="closeModalVerify"
    class="modal fade show"
    style="display: block; z-index: 1050"
  >
    <div
      class="modal-dialog"
      style="position: absolute; top: 30%; right: 35%; width: 50%"
    >
      <div class="modal-content p-3 border-none shadow">
        <div class="modal-header">
          <h5 class="modal-title text-3xl text-red-600">
            Xóa Comment <i class="fa-solid fa-triangle-exclamation"></i>
          </h5>
        </div>
        <div class="modal-body">
          <p>Bạn có chắc chắn muốn xóa comment này không?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModalVerify"
          >
            Đóng
          </button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">
            <i class="fas fa-trash-alt"></i> Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";
import axios from "axios";
import { inject } from "vue";
import { format } from "date-fns";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  name: "DetailComponent",

  setup() {
    const tourID = ref(null);
    const route = useRoute();
    const valueTour = ref(null);
    const errorValue = ref(null);
    const router = useRouter();
    const valueCurrentUser = inject("valueCurrentUser");

    const getDetailTour = async () => {
      try {
        console.log("Tour ID:", tourID);
        const response = await axios.get(
          "http://localhost:8000/api/TourDetail",
          {
            params: {
              tour_id: tourID.value,
            },
          }
        );
        console.log("Response data:", response.data.data);
        valueTour.value = response.data.data;
      } catch (error) {
        console.error("Failed to retrieve tours:", error.response.data.error);
        errorValue.value = error.response.data.error;
      }
    };

    const bookTour = (id) => {
      router.push({ name: "Bookingticket", params: { id } });
    };
    onMounted(() => {
      tourID.value = route.params.id;
      getDetailTour();
    });
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const logValue = () => {
      console.log("valueCurrentUser", valueCurrentUser);
      console.log("tourID", tourID);
      console.log("errorValue", errorValue);
      console.log("valueTour", valueTour.value);
    };

    return {
      tourID,
      logValue,
      getDetailTour,
      valueTour,
      bookTour,
      errorValue,
      valueCurrentUser,
      formatPrice,
    };
  },

  data() {
    return {
      rating: 0,
      comment: "",
      parent_id: null,
      reviews: null,
      review: null,
      review_id: null,
      id: null,
      user_id: null,
      valueUser: null,
      status: null,
      tour_id: null,
      selectedFiles: [],
      imagePreviews: [],
      selected: null,
      errorImage: "",
      imageDefault: "http://127.0.0.1:8000/images/default.png",
      isModalVisible: false,
      reviewToDelete: null,
      isModalVisibleVerify: false,
      errorComment: "",
      errorRating: "",
    };
  },

  watch: {
    comment: {
      handler(val) {
        this.comment = val;
        if (this.comment.length > 200) {
          this.errorComment = "Nội dung comment chỉ chứa 200 ký tự";
          return;
        }
        this.errorComment = "";
      },
      deep: true,
    },

    rating: {
      handler(val) {
        this.rating = val;
        if (this.rating > 0) {
          this.errorRating = "";
        }
      },
      deep: true,
    },
  },

  methods: {
    handleRating(i) {
      this.rating = i;
    },

    showModal(id) {
      this.isModalVisible = true; // Show the modal
      this.fetchReviewById(id);
    },

    closeModal() {
      this.isModalVisible = false;
      this.rating = 0;
      this.comment = "";
      this.imagePreviews = [];
    },

    closeModalVerify() {
      this.isModalVisibleVerify = false;
    },

    handleGetImg(url) {
      return `http://127.0.0.1:8000/images/${url}`;
    },

    async submitReviews() {
      try {
        if (this.comment.length === 0) {
          this.errorComment = "Vui lòng nhập nội dung comment";
          return;
        }
        // if (this.comment.length > 200) {
        //   this.errorComment = "Nội dung comment chỉ chứa 200 ký tự";
        //   return;
        // }
        if (this.rating == 0) {
          this.errorRating = "Vui lòng nhập chọn đánh giá";
          return;
        }
        this.errorRating = "";
        this.user_id = this.fetchUser(this.valueCurrentUser);
        const formData = new FormData();
        formData.append("tour_id", this.tour_id);
        formData.append("user_id", this.user_id);
        formData.append("rating", this.rating);
        formData.append("comment", this.comment);
        formData.append("parent_id", this.parent_id);
        formData.append("status", this.status);
        formData.append("rating", this.rating);

        this.selectedFiles.forEach((file) => {
          formData.append("images[]", file);
        });

        console.log(this.selectedFiles);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/reviews",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 200) {
          console.log("something went wrong", response);
        }
        // console.log(response);
        this.comment = "";
        this.rating = 0;
        this.selectedFiles = [];
        this.imagePreviews = [];
        this.fetchReview(10);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    },

    async fetchReview(per_page) {
      try {
        this.selected = per_page;
        this.tour_id = this.$route.params.id;
        const formData = new FormData();
        formData.append("tour_id", this.tour_id);
        formData.append("_method", "GET");
        const response = await fetch(
          `http://127.0.0.1:8000/api/reviews/list?page=1&per_page=${per_page}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.status !== 200) {
          console.log("something went wrong", response);
        }

        const data = await response.json();
        this.reviews = data.reviews;
      } catch (error) {
        console.log("something went wrong", error);
      }
    },

    fetchUser(user) {
      let userProxy = new Proxy(user, {
        get: function (target, prop) {
          return prop in target ? target[prop] : undefined;
        },
      });
      return userProxy.id;
    },

    async fetchUserData() {
      try {
        const jwt = Cookies.get("tokenLogin");
        if (!jwt) {
          return;
        }
        const token = jwt.split("|")[1];
        const response = await fetch(
          `http://localhost:8000/api/inforCurrentUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Nếu cần sử dụng token để xác thực
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const user = data.data;
        this.user_id = user.id;
        console.log(this.user_id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // this.$router.push({ name: "login" });
        // return null;
      }
    },

    formatDateTime(time) {
      return format(new Date(time), "yyyy-MM-dd HH:mm");
    },

    async fetchReviewById(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/reviews/${id}`
        );
        console.log(response);
        this.review = response.data.review;
        this.rating = this.review.rating;
        this.comment = this.review.comment;
        const arrayImage = this.review.image_reviews;
        arrayImage.forEach((item) => {
          this.imagePreviews.push(
            `http://127.0.0.1:8000/images/${item.image_url}`
          );
        });
        this.review_id = response.data.id;
        // localStorage.setItem('tourId', tourId.value);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          document.querySelector(".modal-body").innerHTML = `
            <div class="error-message">
              <h2>Rivew Not Found</h2>
              <p>We apologize, but the Rivew you are looking for does not exist.</p>
              <button class="btn btn-primary" onclick="window.location.href='/minh-hiep/tours'">View All Tours</button>
            </div>
          `;
          return;
        }
      }
    },

    async handleSubmitUpdate() {
      try {
        this.user_id = this.fetchUser(this.valueCurrentUser);
        const formData = new FormData();
        formData.append("tour_id", this.tour_id);
        formData.append("user_id", this.user_id);
        formData.append("rating", this.rating);
        formData.append("comment", this.comment);
        formData.append("parent_id", this.parent_id);
        formData.append("status", this.status);

        this.selectedFiles.forEach((file) => {
          formData.append("images[]", file);
        });

        console.log(this.selectedFiles);

        formData.append("_method", "PUT");

        const response = await axios.post(
          `http://127.0.0.1:8000/api/reviews/${this.review_id}`,
          formData
        );

        if (response.status !== 200) {
          console.log("something went wrong", response.error);
        }

        this.comment = "";
        this.rating = 0;
        this.selectedFiles = [];
        this.imagePreviews = [];
        this.isModalVisible = false;
        this.fetchReview(10);
      } catch (error) {
        console.log("Something went wrong", error.response);
      }
    },

    handleFileUpload(event) {
      const files = event.target.files;
      if (files && files.length > 5) {
        this.errorImage = "Vui lòng chọn nhiều nhất 5 hình ảnh.";
        return;
      } else if (files && files.length > 0) {
        this.errorImage = null; // Reset lỗi nếu có
        this.selectedFiles = Array.from(files);
        this.imagePreviews = this.selectedFiles.map((file) =>
          //dùng để tạo url objectUrl trên client
          URL.createObjectURL(file)
        );
      }
    },

    openFileDialog() {
      // Tìm input và kích hoạt sự kiện click
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.click();
      }
    },

    removeImage(index) {
      this.selectedFiles.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },

    deleteReview(review_id) {
      this.reviewToDelete = review_id;
      this.isModalVisibleVerify = true;
    },

    confirmDelete() {
      if (this.reviewToDelete) {
        axios
          .delete(`http://127.0.0.1:8000/api/reviews/${this.reviewToDelete}`)
          .then(() => {
            this.notifySuccess("Xóa comment thành công");
            this.fetchReview(10);
          })
          .catch((error) => {
            console.error("Failed to delete comment:", error);
            this.notifyError("Xóa comment thất bại");
          })
          .finally(() => {
            this.isModalVisibleVerify = false; // Hide the modal after operation
            this.reviewToDelete = null; // Reset the tour ID
          });
      }
    },

    notifySuccess(message) {
      toast.success(`${message} thành công !`, {
        autoClose: 1500,
      }); // ToastOptions
    },

    notifyError(message) {
      toast.error(`${message} thất bại !`, {
        autoClose: 1500,
      }); // ToastOptions
    },
  },

  mounted() {
    this.selected = 10;
    this.fetchReview(this.selected);
    this.fetchUserData();
  },
};
</script>
<style lang="scss" module>
@use "./Detail.module.scss";
@use "../../assets/Global.module.scss";
</style>

<style lang="scss" scoped>
.box {
  position: relative;
  top: 0;
  right: 0;

  .action {
    position: absolute;
    top: 0;
    right: 0;
  }
  .action_group {
    position: absolute;
    top: 10px;
    right: 0;
    display: none;
  }
}

.box:hover .action_group {
  display: block;
  display: flex;
  flex-direction: column;
}
</style>
