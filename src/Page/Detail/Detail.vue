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

    <div class="max-w-6xl mx-auto py-4">
      <div class="bg-white rounded shadow-lg mb-4 p-4">
        <form class="" @submit.prevent="submitForm">
          <div class="mb-2">
            <label class="block text-gray-700 font-bold mb-2">
              Đánh giá <span class="text-red-500">*</span>
            </label>
            <div class="flex space-x-1">
              <i class="cursor-pointer far fa-star text-2xl text-gray-400"></i>
              <i class="cursor-pointer far fa-star text-2xl text-gray-400"></i>
              <i class="cursor-pointer far fa-star text-2xl text-gray-400"></i>
              <i class="cursor-pointer far fa-star text-2xl text-gray-400"></i>
              <i class="cursor-pointer far fa-star text-2xl text-gray-400"></i>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Comments </label>
            <textarea
              class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="max-w-6xl mx-auto p-4">
      <div class="flex justify-between items-center mb-2">
        <h1 class="text-lg font-semibold">
          Đánh giá của du khách Three Islands Excursion by Canoe in Sout...
        </h1>
        <div class="flex items-center">
          <span class="mr-2">Số lượng đánh giá trên mỗi trang</span>
          <button class="bg-blue-500 text-white px-3 py-1 rounded">20</button>
          <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded ml-2">
            40
          </button>
          <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded ml-2">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded ml-2">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow mb-2 border-b">
        <div class="flex items-center mb-2">
          <div
            class="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold"
          >
            TD
          </div>
          <div class="ml-4">
            <h2 class="font-semibold">Trần D.</h2>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <div
            class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-semibold"
          >
            8.0 /10
          </div>
          <span class="ml-2 text-gray-500">Đánh giá cách đây 17 tuần</span>
        </div>
        <p class="mb-2">Dịch vụ tương đối tốt</p>
        <div class="flex items-center text-blue-500">
          <i class="fas fa-thumbs-up mr-2"></i>
          <a href="#" class="hover:underline">Đánh giá này hữu ích không?</a>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow mb-2">
        <div class="flex items-center mb-2">
          <div
            class="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold"
          >
            LT
          </div>
          <div class="ml-4">
            <h2 class="font-semibold">Ly Thuy N. T.</h2>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <div
            class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-semibold"
          >
            10.0 /10
          </div>
          <span class="ml-2 text-gray-500">Đánh giá cách đây 17 tuần</span>
        </div>
        <p class="mb-2">
          hướng dẫn viên vui vẻ, nhiệt tình, thức ăn vừa miệng. tôi rất hài
          lòng. hành trình tour rõ ràng, chăm sóc chu đáo.
        </p>
        <div class="flex items-center text-blue-500">
          <i class="fas fa-thumbs-up mr-2"></i>
          <a href="#" class="hover:underline">Đánh giá này hữu ích không?</a>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow mb-2">
        <div class="flex items-start">
          <img
            alt="Profile picture of the reviewer"
            class="w-12 h-12 rounded-full mr-4"
            height="50"
            src="https://storage.googleapis.com/a1aa/image/pNKa1qUHP3bqM1rWYbyfOf2ut5x1rwDYYWKJ8aTiVrY9zquTA.jpg"
            width="50"
          />
          <div class="flex-1">
            <div class="flex items-center mb-2">
              <span class="font-semibold"> Luu K. T. </span>
              <div
                class="flex items-center ml-2 bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-sm"
              >
                <i class="fas fa-star"> </i>
                <span class="ml-1"> 10.0 </span>
                <span class="text-gray-500 ml-1"> /10 </span>
              </div>
              <span class="text-gray-500 ml-4">
                Đánh giá cách đây 95 tuần
              </span>
            </div>
            <p class="text-gray-800 mb-2">
              Dịch vụ tốt. Các bạn dẫn tour Hằng, Tuyền, 1 bạn nam nữa không nhớ
              tên rất thân thiện. Trải nghiệm lần đầu cảm thấy khá hài lòng
            </p>
            <div class="flex space-x-2 mb-2">
              <img
                alt="Image 1 of the review"
                class="w-24 h-24 rounded-lg"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/fgwKrPpNbqTcdaQPpSWIajOWN7krsSJHjo9ypdDCu9ZezquTA.jpg"
                width="100"
              />
              <img
                alt="Image 2 of the review"
                class="w-24 h-24 rounded-lg"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/U5uMebrXs8yrBiX6FuKfV1obBNIBW9q06IsjoIlJNSnfnVdnA.jpg"
                width="100"
              />
              <img
                alt="Image 3 of the review"
                class="w-24 h-24 rounded-lg"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/ueCFSEBUlow1MidYePJ4IjHsVfI1tJaYsXt2krx2E0F3nVdnA.jpg"
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
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "DetailComponent",

  setup() {
    const tourID = ref(null);
    const route = useRoute();
    const valueTour = ref(null);
    const errorValue = ref(null);
    const router = useRouter();

    // const getImage = ($urlImage) => {
    //     return `http://localhost:8000/images/${$urlImage}`
    // }
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
      formatPrice,
    };
  },
};
</script>
<style lang="scss" module>
@import "./Detail.module.scss";
</style>
