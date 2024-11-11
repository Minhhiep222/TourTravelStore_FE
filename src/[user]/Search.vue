<template>
  <div
    class="bg-white border-b py-4 px-4 flex justify-evenly items-center shadow-sm"
  >
    <div class="text-sm text-gray-500">
      <span class="text-gray-700"> Xperience </span>
      /
      <span class="text-blue-500"> Kết quả Tìm kiếm </span>
    </div>
    <div class="flex items-center">
      <div class="flex items-center bg-gray-100 px-4 py-2 rounded-full">
        <i class="fas fa-map-marker-alt text-red-500"> </i>
        <span class="ml-2 text-red-500"> All Locations </span>
        <i class="fas fa-chevron-down ml-2 text-gray-500"> </i>
      </div>
      <div
        class="flex items-center ml-4 border rounded-full px-4 py-2"
        style="width: 400px"
      >
        <i class="fa-solid fa-magnifying-glass mr-1 text-slate-400"></i>
        <input
          class="w-full outline-none"
          placeholder="Sunworld Bà Nà Hills"
          type="text"
        />
        <i class="fas fa-times text-gray-500 ml-2"> </i>
      </div>
    </div>
  </div>
  <div class="container mt-6">
    <div class="grid">
      <div class="row">
        <div class="col-sm-3">
          <div class="max-w-sm mx-auto">
            <div class="bg-white p-4 rounded-lg shadow-md mb-4">
              <div class="flex items-center mb-2">
                <i class="fas fa-percent text-blue-500 mr-2"></i>
                <div>
                  <div class="font-bold text-black">
                    Điểm nổi bật của Xperience
                  </div>
                  <div class="text-gray-500 text-sm">
                    Chiến dịch và khuyến mãi theo mùa
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  class="bg-white text-blue-500 font-medium py-2 px-4 rounded-full shadow"
                >
                  11.11 Sale
                </button>
                <button
                  class="bg-white text-blue-500 font-medium py-2 px-4 rounded-full shadow"
                >
                  Easy Reschedule
                </button>
                <button
                  class="bg-white text-blue-500 font-medium py-2 px-4 rounded-full shadow"
                >
                  Điều mới ở Xperience
                </button>
              </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md mb-4">
              <div class="font-bold text-black mb-2">Khoảng giá</div>
              <div class="relative">
                <select
                  class="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-black"
                >
                  <option>0 VND - 4.000.000 VND+</option>
                </select>
              </div>
            </div>

            <div class="max-w-xs mx-auto bg-white rounded-lg shadow p-4">
              <h2 class="text-lg font-medium mb-4">Danh mục Xperience</h2>
              <div
                v-for="(item, index) in items"
                :key="index"
                class="flex items-center mb-2"
              >
                <input
                  type="radio"
                  :id="'item-' + index"
                  name="category"
                  class="form-radio text-blue-500"
                  :checked="index === 0"
                />
                <label
                  :for="'item-' + index"
                  class="flex items-center ml-2 text-gray-700"
                >
                  <i :class="item.icon" class="text-pink-500 mr-2"></i>
                  <span>{{ item.name }}</span>
                </label>
                <i class="fas fa-chevron-down ml-auto text-gray-500"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-9">
          <!-- Not found product -->

          <div class="max-w-7xl mx-auto" id="app">
            <h1 class="text-2xl font-bold mb-2">
              Hiển thị hoạt động với "{{ this.key }}"
            </h1>
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center space-x-2">
                <span class="text-gray-500"> Xếp theo: </span>
                <button
                  class="bg-white border border-gray-300 rounded px-3 py-1 text-gray-700"
                >
                  Liên quan nhất
                  <i class="fas fa-chevron-down ml-1"> </i>
                </button>
              </div>
              <div class="flex space-x-2">
                <button
                  class="bg-white border border-gray-300 rounded px-3 py-1 text-gray-700"
                >
                  <i class="fas fa-th-large"> </i>
                </button>
                <button
                  class="bg-white border border-gray-300 rounded px-3 py-1 text-gray-700"
                >
                  <i class="fas fa-list"> </i>
                </button>
              </div>
            </div>
            <div v-if="notFound" class="w-full bg-white shadow-md rounded">
              <div class="p-4 rounded-lg text-center max-w-md mx-auto w-full">
                <img
                  alt="Illustration of an open cardboard box with a surprised expression"
                  class="mx-auto mb-4"
                  height="100"
                  src="https://storage.googleapis.com/a1aa/image/1JeqQJ6WLekWbUVqG2eQxxCiHLRDWnJbGseqycYkm1hxqh6OB.jpg"
                  width="100"
                />
                <h1 class="text-2xl font-bold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm
                  <i class="fa-solid fa-magnifying-glass"></i>
                </h1>
                <p class="text-gray-400 text-sm">
                  Thực hiện tìm sản phẩm hoặc xem những sản phẩm gợi ý khác
                </p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="tour in tours"
                :key="tour.id"
                class="bg-white rounded-lg shadow cursor-pointer"
                @click="detailTour(tour.id)"
              >
                <div class="relative">
                  <img
                    alt="Image of Sunworld Ba Na Hills"
                    class="w-full h-50 object-cover rounded-lg"
                    height="200"
                    :src="getImage(tour.images[0]?.image_url)"
                    width="300"
                  />
                  <span
                    class="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded"
                  >
                    Tiết kiệm 15%
                  </span>
                </div>
                <div class="p-2">
                  <h2 class="text-lg font-bold mb-2">
                    {{ tour?.name }}
                  </h2>
                  <div class="flex items-center text-gray-500 text-sm mb-2">
                    <i class="fas fa-map-marker-alt mr-1"> </i>
                    <span> {{ tour?.location }}</span>
                  </div>

                  <div class="flex items-center text-gray-500 text-sm mb-2">
                    <span class="line-through mr-2">
                      {{ formatPrice(tour?.price) }}
                    </span>
                    <span class="text-red-500 font-bold text-lg">
                      {{ formatPrice(tour?.price) }} VNĐ
                    </span>
                  </div>
                  <div class="flex items-center text-blue-500 text-sm mb-2">
                    <i class="fas fa-star mr-1"> </i>
                    <span> 8.0 (1 đánh giá) </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <button class="text-orange-500 text-sm">
                      Các mặt hàng đã chọn
                    </button>
                    <button class="text-orange-500 text-sm">Xem tất cả</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SearchTour",
  setup() {
    const items = ref([
      { name: "Tất cả", icon: "fas fa-circle" },
      { name: "Điểm tham quan", icon: "fas fa-landmark" },
      { name: "Sự kiện", icon: "fas fa-calendar-alt" },
      { name: "Spa & Thư giãn", icon: "fas fa-spa" },
      { name: "Thể thao giải trí", icon: "fas fa-football-ball" },
      { name: "Tour", icon: "fas fa-route" },
      { name: "Trải nghiệm ẩm thực", icon: "fas fa-utensils" },
      { name: "Phương tiện di chuyển", icon: "fas fa-bus" },
      { name: "Cần thiết cho du lịch", icon: "fas fa-suitcase" },
    ]);
    return {
      items,
    };
  },

  data() {
    return {
      notFound: false,
      tours: null,
      key: null,
    };
  },

  methods: {
    async handleFetchTourWithKey() {
      try {
        this.key = this.$route.query.key;

        const response = await fetch(
          `http://127.0.0.1:8000/api/tours/search/${this.key}`
        );

        const data = await response.json();

        if (response.status === 404) {
          this.notFound = true;
        }

        if (response.status == 200) {
          this.tours = data.tours;
          console.log(this.tours);
        }
      } catch (e) {
        console.log(e.response);
      }
    },

    getImage(url) {
      return `http://127.0.0.1:8000/images/${url}`;
    },

    detailTour(id) {
      this.$router.push({ name: "Detail", params: { id } });
    },

    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },

  mounted() {
    this.handleFetchTourWithKey();
  },
};
</script>

<style lang="scss">
@use "../assets/Global.module.scss";
@use "../assets/Tour.module.scss";
</style>
