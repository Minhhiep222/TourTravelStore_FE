<template>
  <div class="relative">
    <img
      alt="Cityscape at night with lights"
      class="w-full h-96 object-cover"
      height="600"
      src="@/assets/Images/CeUH4ecYMTmxnUrXSAKjDzGGU69eNgmHqoXfiYd1Wi9Iqt2OB.jpg"
      width="1920"
    />
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
    >
      <h1 class="text-4xl font-bold">
        Trải nghiệm vui vẻ cho chuyến đi khó quên
      </h1>
      <div
        class="mt-4 flex items-center bg-white text-black rounded-full px-4 py-2"
      >
        <i class="fas fa-map-marker-alt text-blue-500"> </i>
        <span class="ml-2"> Khám phá điểm đến kế tiếp của bạn </span>
        <i class="fas fa-chevron-down ml-2"> </i>
      </div>
      <div class="mt-4 flex items-center rounded-full px-4 py-2 w-1/2">
        <input
          class="flex-grow px-4 py-2.5 rounded-l-full text-black focus:outline-none"
          placeholder="Tìm kiếm địa điểm hoặc hoạt động"
          value=""
          type="text"
          v-model="key"
        />
        <button
          class="bg-blue-500 text-white px-4 py-2.5 rounded-r-full"
          @click="handleSearch"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  </div>

  <div
    class="bg-white border-b shadow-sm rounded-t-lg px-4 py-2 flex justify-around"
  >
    <div class="flex flex-col items-center">
      <i class="fas fa-th-large text-2xl"> </i>
      <span class="mt-1"> Tất cả các hoạt động </span>
    </div>
    <div class="flex flex-col items-center">
      <i class="fas fa-cogs text-2xl"> </i>
      <span class="mt-1"> Điểm tham quan </span>
    </div>
    <div class="flex flex-col items-center">
      <i class="fas fa-bus text-2xl"> </i>
      <span class="mt-1"> Tour </span>
    </div>
    <div class="flex flex-col items-center">
      <i class="fas fa-child text-2xl"> </i>
      <span class="mt-1"> Sân chơi </span>
    </div>
    <div class="flex flex-col items-center">
      <i class="fas fa-suitcase text-2xl"> </i>
      <span class="mt-1"> Cần thiết cho du lịch </span>
    </div>
    <div class="flex flex-col items-center">
      <i class="fas fa-spa text-2xl"> </i>
      <span class="mt-1"> Spa &amp; Thư giãn </span>
    </div>
    <div class="flex flex-col items-center">
      <i class="fas fa-bullseye text-2xl"> </i>
      <span class="mt-1"> Trò chơi &amp; Hoạt động </span>
    </div>
  </div>

  <div class="container bg-white">
    <div class="p-8" id="app">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-2">Khuyến mãi Xperience hiện hành</h1>
        <p class="text-gray-600 mb-8">
          Tiết kiệm lớn với những ưu đãi đặc biệt giới hạn của chúng tôi
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1">
          <img
            alt="Promotion 2: Imagine Dragons Concert"
            class="w-full h-auto rounded-lg shadow-md"
            height="150"
            src="@/assets/Images/EI5mPWVd9l4aA5aoYfCn1efAcSMII187QknrZvDhXX3ANXbnA.jpg"
            width="300"
          />
        </div>
        <div class="col-span-1">
          <img
            alt="Promotion 3: 11.11 Tiệc Sale Cuối Năm - Mã giảm đến 1,1 triệu"
            class="w-full h-auto rounded-lg shadow-md"
            height="150"
            src="@/assets/Images/joRuHe34cjzZXKmw9v4xcWLgtMZLB3DslWehMOUSHvLhmrtTA.jpg"
            width="300"
          />
        </div>
        <div class="col-span-1">
          <img
            alt="Promotion 4: Cuối tuần đi chơi gần nhà - Giảm đến 300k"
            class="w-full h-auto rounded-lg shadow-md"
            height="150"
            src="@/assets/Images/eIy3L5zfwpm0nEMcRo07fm3W8nfZ2uuPWwzXueCKIIprzctdC.jpg"
            width="300"
          />
        </div>
      </div>
    </div>

    <!-- Dịch Vụ Section -->
    <div class="p-8">
      <h2 class="text-center text-2xl font-bold mb-6">
        Nâng cao chuyến đi của bạn theo cách bạn thích
      </h2>
      <div class="grid grid-cols-5 gap-4">
        <div class="bg-white shadow-md rounded-lg">
          <img
            alt="Tour và Điểm tham quan image"
            class="rounded-lg"
            height="200"
            src="@/assets/Images/i4Vf2QqNtrUfJUvnttopTcgxRs3FyeKf44YNTXM9PvE34u2OB.jpg"
            width="300"
          />
          <p class="text-center font-semibold py-2">Tour và Điểm tham quan</p>
        </div>
        <div class="bg-white shadow-md rounded-lg">
          <img
            alt="Hoạt động vui chơi image"
            class="rounded-lg"
            height="200"
            src="@/assets/Images/VCnIZdIsF3JFKJVrTAJBCRTJNrVptsacmJOdBrV6BsLk7a7E.jpg"
            width="300"
          />
          <p class="text-center font-semibold py-2">Hoạt động vui chơi</p>
        </div>
        <div class="bg-white shadow-md rounded-lg">
          <img
            alt="Bảo hiểm du lịch image"
            class="rounded-lg"
            height="200"
            src="@/assets/Images/8fsg2NVXzSV4JKqdJZqKQukNUfHWETJcJha6ZVHtfKIdcXbnA.jpg"
            width="300"
          />
          <p class="text-center font-semibold py-2">Bảo hiểm du lịch</p>
        </div>
        <div class="bg-white shadow-md rounded-lg">
          <img
            alt="Đặt ngay Trả sau image"
            class="rounded-lg"
            height="200"
            src="@/assets/Images/3JtKzhCAUUqjE5bIG9FCrvkGfycRFSu5L01RVPi8LIuI312JA.jpg"
            width="300"
          />
          <p class="text-center font-semibold py-2">Đặt ngay Trả sau</p>
        </div>
        <div class="bg-white shadow-md rounded-lg">
          <img
            alt="Hoạt động vui chơi image"
            class="rounded-lg"
            height="200"
            src="@/assets/Images/VCnIZdIsF3JFKJVrTAJBCRTJNrVptsacmJOdBrV6BsLk7a7E.jpg"
            width="300"
          />
          <p class="text-center font-semibold py-2">Hoạt động vui chơi</p>
        </div>
      </div>
    </div>

    <!-- tour Du lich moi nhat -->
    <div v-if="displayErrors" class="alert alert-danger mt-3">
      <p>Error: {{ displayErrors }}</p>
    </div>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-6">Tour du lịch mới nhất</h1>
      <div class="grid grid-cols-5 gap-1">
        <div
          v-for="tour in newesTour"
          :key="tour.id"
          @click="detailTour(tour.id)"
          class="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:bg-white-300"
        >
          <img
            :src="
              tour.images.length > 0
                ? `http://127.0.0.1:8000/images/${tour.images[0].image_url}`
                : ''
            "
            :alt="
              tour.images.length > 0
                ? tour.images[0].alt_text
                : 'Default alt text'
            "
            class="w-full h-68 object-cover"
            height="200"
            width="300"
          />
          <!-- <div class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Tiết kiệm 20%
          </div> -->
          <div class="p-2 flex flex-col justify-between">
            <p class="text-gray-700">
              {{ tour.name }}
            </p>
            <div class="w-full mt-8">
              <!-- <p class="text-gray-700 line-through mt-2">
                VND 2.490.000
              </p> -->
              <p class="text-orange-500 font-bold">
                <span>{{ formatPrice(tour.price) }} VND</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----- -->

    <!-- Vé Vui Chơi & Tour Section -->

    <div class="p-8">
      <h1 class="text-3xl font-bold mb-6">
        Tour du lịch trong nước được yêu thích
      </h1>
      <div class="flex justify-start space-x-4 mb-6">
        <button class="bg-red-500 text-white px-4 py-2 rounded-full">
          Phú Quốc
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Nha Trang
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Đà Nẵng
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Đà Lạt
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Ninh Bình-Hạ Long
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Sapa-Hà Giang
        </button>
      </div>
      <div class="grid grid-cols-5 gap-1">
        <div
          v-for="tour in tours"
          :key="tour.id"
          class="bg-white rounded-lg shadow-md overflow-hidden relative"
        >
          <img
            :src="
              tour.images.length > 0
                ? `http://127.0.0.1:8000/images/${tour.images[0].image_url}`
                : ''
            "
            :alt="
              tour.images.length > 0
                ? tour.images[0].alt_text
                : 'Default alt text'
            "
            @click="detailTour(tour.id)"
            class="w-full h-68 object-cover"
            height="200"
            width="300"
          />
          <div
            class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            Tiết kiệm 20%
          </div>
          <div class="p-2 flex flex-col justify-between">
            <p class="text-gray-700">{{ tour?.name }}</p>
            <div class="w-full mt-8">
              <p class="text-gray-700 line-through mt-2">
                {{ formatVND(tour?.price) }}
              </p>
              <p class="text-orange-500 font-bold">
                {{ formatVND(tour?.price) }} VND
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vé Vui Chơi & Tour Section -->
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">
        Tour du lịch nước ngoài được lựa chọn nhiều
      </h1>
      <div class="flex justify-start mb-6">
        <button class="bg-red-500 text-white py-2 px-4 rounded-full mr-2">
          Khởi hành từ Hồ Chí Minh
        </button>
        <button class="bg-red-100 text-red-500 py-2 px-4 rounded-full">
          Khởi hành từ Hà Nội
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div class="col-span-1">
          <img
            alt="Tour Bali"
            class="w-full h-auto mb-2 rounded-sm"
            height="200"
            src="https://storage.googleapis.com/a1aa/image/PKiFGSzKci60CtiHbhFhKidqnBRnU71rp0m46fwClHFmO22JA.jpg"
            width="200"
          />
          <p class="font-medium">
            Tour trọn gói Bali (Kintamani, Bali Swing, đền Tanah Lot, cổng...)
          </p>
          <p class="text-orange-500">VND 10.990.000</p>
        </div>
        <div class="col-span-1">
          <img
            alt="Tour Thái Lan"
            class="w-full h-auto mb-2 rounded-sm"
            height="200"
            src="https://storage.googleapis.com/a1aa/image/VbFU2byuxOZ3LVHZy2sBgTFVmeK8B7TvD5DQPiGQJAapO22JA.jpg"
            width="200"
          />
          <p class="font-medium">
            Tour Thái Lan trọn gói (Bangkok, Pattaya) - 5N4Đ
          </p>
          <p class="text-orange-500">VND 6.990.000</p>
        </div>
        <div class="col-span-1">
          <img
            alt="Tour Bali"
            class="w-full h-auto mb-2 rounded-sm"
            height="200"
            src="https://storage.googleapis.com/a1aa/image/PKiFGSzKci60CtiHbhFhKidqnBRnU71rp0m46fwClHFmO22JA.jpg"
            width="200"
          />
          <p class="font-medium">
            Tour trọn gói Bali (Kintamani, Bali Swing, đền Tanah Lot, cổng...)
          </p>
          <p class="text-orange-500">VND 10.990.000</p>
        </div>
        <div class="col-span-1">
          <img
            alt="Tour Singapore"
            class="w-full h-auto mb-2 rounded-sm"
            height="200"
            src="https://storage.googleapis.com/a1aa/image/C5xkppftIF32Uaihl1tbg8Ldo1MNs9XOLhZL9QcZSG3nO22JA.jpg"
            width="200"
          />
          <p class="font-medium">
            Tour Singapore trọn gói (Gardens by the Bay, đảo ...)
          </p>
          <p class="text-orange-500">VND 10.390.000</p>
        </div>
        <div class="col-span-1">
          <img
            alt="Tour Singapore và Malaysia"
            class="w-full h-auto mb-2 rounded-sm"
            height="200"
            src="https://storage.googleapis.com/a1aa/image/ff5vQLQAxSnRA0z67wxdH83WLDshIuBhO1puSm1UyCzRdstTA.jpg"
            width="200"
          />
          <p class="font-medium">
            Tour Singapore và Malaysia trọn gói (Gardens by the Bay, Tháp ...)
          </p>
          <p class="text-orange-500">VND 12.390.000</p>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button class="bg-orange-500 text-white py-2 px-6 rounded-full">
          Xem ưu đãi Tour
        </button>
      </div>
    </div>

    <div class="p-8" id="app">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">
          Việt Nam đệ nhất trứ danh
        </h1>
        <p class="text-gray-500 mt-2">
          Đi đến những nơi ấn tượng nhất của Việt Nam
        </p>
      </div>
      <div class="flex space-x-2 mt-4">
        <button class="bg-red-500 text-white px-4 py-2 rounded-full">
          Đà Nẵng
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Hội An
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Đà Lạt
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Nha Trang
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Phú Quốc
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Hà Nội
        </button>
        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Sài Gòn
        </button>
      </div>
      <div class="grid grid-cols-5 gap-2 mt-6">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <img
            alt="Sun World Ba Na Hills tại Đà Nẵng"
            class="w-full h-48 object-cover"
            height="200"
            src="@/assets/Images/rZpYfgjLXn2JGi2ueIdfe993X6uSSNRyX0yIDzzlYcChWz2OB.jpg"
            width="300"
          />
          <div class="p-4">
            <h2 class="text-lg font-bold text-gray-800">
              Sun World Ba Na Hills tại Đà Nẵng
            </h2>
            <p class="text-red-500 mt-2">VND 70.025</p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <img
            alt="Vé Công viên nước Đà Nẵng Mikazuki Water Park 365"
            class="w-full h-48 object-cover"
            height="200"
            src="@/assets/Images/JGjioJOCBI6IORZUjhGEC5Wr01LYdScwT30sAu9yJdyZNb7E.jpg"
            width="300"
          />
          <div class="p-4">
            <h2 class="text-lg font-bold text-gray-800">
              Vé Công viên nước Đà Nẵng Mikazuki Water Park 365
            </h2>
            <p class="text-red-500 mt-2">VND 300.000</p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <img
            alt="Vé công viên suối khoáng nóng Núi Thần Tài"
            class="w-full h-48 object-cover"
            height="200"
            src="@/assets/Images/eaI7ZI4HLiSACqE4paefaFPXesAwdKiPHLzb0vgNK000Wz2OB.jpg"
            width="300"
          />
          <div class="p-4">
            <h2 class="text-lg font-bold text-gray-800">
              Vé công viên suối khoáng nóng Núi Thần Tài
            </h2>
            <p class="text-red-500 mt-2">VND 195.000</p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <img
            alt="Vé Đà Nẵng Downtown"
            class="w-full h-48 object-cover"
            height="200"
            src="@/assets/Images/cMfPdFNZGOWdCKz9dYsuhvrvDwKXEXH5m8bMZj5MPWw1a22JA.jpg"
            width="300"
          />
          <div class="p-4">
            <h2 class="text-lg font-bold text-gray-800">Vé Đà Nẵng Downtown</h2>
            <p class="text-red-500 mt-2">VND 130.101</p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <img
            alt="Combo vé vui chơi siêu tiết kiệm từ Traveloka tại Đà Nẵng - Hội An"
            class="w-full h-48 object-cover"
            height="200"
            src="@/assets/Images/nbo4KTPzxv4lFFTRPWqMN5Kf7J4hhBE1ucb0rF1Jbgb1a22JA.jpg"
            width="300"
          />
          <div class="p-4">
            <h2 class="text-lg font-bold text-gray-800">
              Combo vé vui chơi siêu tiết kiệm từ - Hội An
            </h2>
            <p class="text-gray-500 line-through">VND 1.050.000</p>
            <p class="text-red-500 mt-2">VND 880.000</p>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <div>
        <div class="section-title">Điểm đến được yêu thích</div>
        <div>
          <span class="link-item">Du lịch Sài Gòn</span>
          <span class="link-item">Du lịch Hà Nội</span>
          <span class="link-item">Du lịch Đà Lạt</span>
          <span class="link-item">Du lịch Sa Pa</span>
          <span class="link-item">Du lịch Ninh Bình</span>
          <span class="link-item">Du lịch Hạ Long</span>
          <span class="link-item">Du lịch Đà Nẵng</span>
          <span class="link-item">Du lịch Phú Quốc</span>
          <span class="link-item">Du lịch Nha Trang</span>
          <span class="link-item">Du lịch Hội An</span>
          <span class="link-item">Du lịch Huế</span>
          <span class="link-item">Du lịch Quy Nhơn</span>
          <span class="link-item">Du lịch Vũng Tàu</span>
          <span class="link-item">Du lịch Tây Ninh</span>
          <span class="link-item">Du lịch Việt Nam</span>
          <span class="link-item">Du lịch Thái Lan</span>
          <span class="link-item">Du lịch Singapore</span>
          <span class="link-item">Du lịch Malaysia</span>
          <span class="link-item">Du lịch Indonesia</span>
          <span class="link-item">Du lịch Hàn Quốc</span>
          <span class="link-item">Du lịch Nhật Bản</span>
          <span class="link-item">Du lịch Đài Loan</span>
          <span class="link-item">Du lịch Trung Quốc</span>
          <span class="link-item">Du lịch Hong Kong</span>
          <span class="link-item">Du lịch Bali</span>
          <span class="link-item">Du lịch Úc</span>
          <span class="link-item">Du lịch Mỹ</span>
        </div>
      </div>
      <div class="mt-8">
        <div class="section-title">Các trải nghiệm được yêu thích nhất</div>
        <div>
          <span class="link-item">Vé Bà Nà Hills Đà Nẵng</span>
          <span class="link-item">Vé Khu du lịch Hồ Mây Vũng Tàu</span>
          <span class="link-item">Vé show Tinh hoa Bắc Bộ</span>
          <span class="link-item">Vé Công viên nước The Amazing Bay</span>
          <span class="link-item">Tour 4 đảo Nam Phú Quốc</span>
          <span class="link-item">Vé Saigon Waterbus</span>
          <span class="link-item">Vé Đà Nẵng Downtown</span>
          <span class="link-item">Vé trượt Zipline Đà Lạt</span>
          <span class="link-item">Vé cáp treo núi Bà Đen Sun World</span>
          <span class="link-item"
            >Vé tắm bùn khoáng nóng I-Resort Nha Trang</span
          >
          <span class="link-item">Vé đài quan sát Landmark 81 Skyview</span>
          <span class="link-item">Vé show Ký Ức Hội An</span>
          <span class="link-item">Vé VinWonders Nha Trang</span>
          <span class="link-item">Vé Vinpearl Safari Phú Quốc</span>
          <span class="link-item">Vé cáp treo Fansipan Sapa Sun World</span>
          <span class="link-item">Vé Saigon Watergo</span>
          <span class="link-item">Vé cáp treo Hòn Thơm Sun World Phú Quốc</span>
          <span class="link-item">Vé chơi bắn súng tại Saigon Sniper</span>
          <span class="link-item">Vé vườn thú ZooDoo Đà Lạt</span>
          <span class="link-item">Vé VinWonders Phú Quốc</span>
          <span class="link-item">Vé Fresh Garden Đà Lạt</span>
          <span class="link-item">Vé Vườn Ánh Sáng Lumiere Đà Lạt</span>
          <span class="link-item">Vé Sun World Hạ Long</span>
          <span class="link-item"
            >Vé công viên suối khoáng nóng Núi Thần Tài</span
          >
          <span class="link-item">Vé VinWonders Nam Hội An</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "HomePage",
  setup() {
    const router = useRouter();
    const valueCurrentUser = inject("valueCurrentUser");
    const newesTour = ref([]);
    const displayErrors = ref(null);

    const getNewesTour = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/displayNewstTour"
        );
        console.log(response);
        newesTour.value = response.data.data;
        console.log("newesTour", newesTour.value);
      } catch (error) {
        console.error("Failed to retrieve tours:", error.response.data.message);
        displayErrors.value = error.response.data.message;
      }
    };

    const handleAddTourToFavorite = async (tour_id) => {
      let userID = null;
      if (valueCurrentUser.value && valueCurrentUser.value.id) {
        userID = valueCurrentUser.value.id;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/addTourToFavorite",
          {
            user_id: userID,
            tour_id: tour_id,
          }
        );

        if (
          response.data.message === "Tour added to favorites list successfully."
        ) {
          Swal.fire({
            title: "Thành công!",
            text: "Đã thêm vào danh sách yêu thích",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        if (error.response) {
          console.error("Failed to add tour to favorites:", error.response);
          alert(error.response.data.error);
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    const detailTour = (id) => {
      router.push({ name: "Detail", params: { id } });
    };

    const logValue = () => {
      console.log("valueCurrentUser", valueCurrentUser);
    };
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    onMounted(() => {
      getNewesTour();
    });

    return {
      newesTour,
      displayErrors,
      handleAddTourToFavorite,
      logValue,
      detailTour,
      formatPrice,
    };
  },
  data() {
    return {
      tours: null,
      meta: null,
      links: null,
      sortBy: "latest",
      key: "",
    };
  },

  methods: {
    async fetchTours(page = 1) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/list?page=${page}&per_page=5&sort=${this.sortBy}`
        );
        if (response.data.tours.length === 0) {
          console.log("Không có tour nào để hiển thị.");
          return;
        }
        this.tours = response.data.tours;
        this.meta = response.data.meta;
        this.links = response.data.links;
      } catch (error) {
        console.error("Failed to fetch tour data:", error);
      }
    },

    handleSearch() {
      if (!this.key) {
        return;
      }
      this.$router.push({
        path: "/search",
        query: {
          key: this.key,
        },
      });
    },

    formatVND(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    search() {
      this.$router;
    },
  },
  mounted() {
    this.fetchTours();
  },
};
</script>

<style lang="scss" module>
@import "./../../assets/Global.module.scss";
</style>
