<template>
  <div class="p-4" id="app">
    <div class="flex">
      <div class="w-1/3 p-4 border rounded-lg">
        <img
          class="rounded-lg mb-4"
          height="200"
          width="300"
          v-if="valueTour && valueTour.images && valueTour.images.length > 0"
          :src="`http://127.0.0.1:8000/images/${valueTour.images[0].image_url}`"
          :alt="valueTour.images[0].alt_text"
        />
        <h2 v-if="valueTour" class="text-lg font-bold mb-2">
          {{ valueTour.name }}
        </h2>
        <button class="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
          Xem Thông tin vé
        </button>
      </div>

      <div class="w-2/3 pl-8">
        <!-- Calendar Selection -->
        <div class="flex mb-4">
          <button class="px-4 py-2 border rounded-lg mr-2 flex items-center">
            <i class="fas fa-calendar-alt mr-2"></i>
            Xem lịch
          </button>
          <div class="flex space-x-2">
            <button class="px-4 py-2 border rounded-lg">
              Thứ 4<br />6 thg 11
            </button>
            <button class="px-4 py-2 border rounded-lg">
              Thứ 5<br />7 thg 11
            </button>
            <button class="px-4 py-2 border rounded-lg">
              Thứ 6<br />8 thg 11
            </button>
            <button class="px-4 py-2 border rounded-lg">
              Thứ 7<br />9 thg 11
            </button>
            <button class="px-4 py-2 border rounded-lg">
              CN<br />10 thg 11
            </button>
            <button class="px-4 py-2 border rounded-lg">
              Thứ 2<br />11 thg 11
            </button>
            <button class="px-4 py-2 border rounded-lg">
              Thứ 3<br />12 thg 11
            </button>
            <button class="px-4 py-2 border rounded-lg">&gt;</button>
          </div>
        </div>
        <div v-if="errorValue" class="alert alert-danger mt-3">
          <p>Error: {{ errorValue }}</p>
        </div>
        <!-- Selected Date -->
        <div class="bg-blue-100 p-4 rounded-lg mb-4">
          <span>Ngày tham quan đã chọn</span>
          <h3 class="text-lg font-bold">Thứ 4, 6 thg 11 2024</h3>
        </div>

        <!-- Adult and Children Inputs -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <div>
              <h4 class="text-lg font-bold">Người lớn</h4>
              <span class="text-gray-500">10 tuổi trở lên</span>
            </div>
            <div class="flex items-center">
              <button
                @click="minusTour('adult')"
                class="px-2 py-1 border rounded-lg"
              >
                -
              </button>
              <input
                class="w-12 text-center border mx-2 rounded-lg"
                type="text"
                v-model="numAdults"
                readonly
              />
              <button
                @click="plusTour('adult')"
                class="px-2 py-1 border rounded-lg"
              >
                +
              </button>
            </div>
          </div>
          <div class="text-right text-lg font-bold text-gray-700">
            <p v-if="valueTour">{{ formatPrice(valueTour?.price) }} VND</p>
          </div>
        </div>

        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <div>
              <h4 class="text-lg font-bold">Trẻ em</h4>
              <span class="text-gray-500">5 – 9 tuổi</span>
            </div>
            <div class="flex items-center">
              <button
                @click="minusTour('child')"
                class="px-2 py-1 border rounded-lg"
              >
                -
              </button>
              <input
                class="w-12 text-center border mx-2 rounded-lg"
                type="text"
                v-model="numChildren"
                readonly
              />
              <button
                @click="plusTour('child')"
                class="px-2 py-1 border rounded-lg"
              >
                +
              </button>
            </div>
          </div>
          <div class="text-right text-lg font-bold text-gray-700">
            <p v-if="valueTour">
              {{ formatPrice(valueTour?.price_children || "100000") }} VND
            </p>
          </div>
        </div>

        <!-- Total Price and Book Now Button -->
        <div class="border-t pt-4">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-lg font-bold">Tổng giá tiền</h4>
            <div class="text-2xl font-bold text-orange-500">
              <p v-if="totalPrice">{{ formatPrice(totalPrice) }} VND</p>
            </div>
          </div>
          <button
            @click="bookTour(tourID)"
            class="w-full py-2 bg-orange-500 text-white rounded-lg"
          >
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: "BookingTicketComponent",
  setup() {
    const tourID = ref(null);
    const route = useRoute();
    const valueTour = ref(null);
    const errorValue = ref(null);
    const router = useRouter();
    const store = useStore();

    const totalPrice = ref(0);
    const numAdults = ref(1);
    const numChildren = ref(0);

    // Lấy thông tin chi tiết tour
    const getDetailTour = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/TourDetail",
          {
            params: {
              tour_id: tourID.value,
            },
          }
        );
        valueTour.value = response.data.data;
        updateTotalPrice();
      } catch (error) {
        console.error("Failed to retrieve tours:", error.response.data.error);
        errorValue.value = error.response.data.error;
      }
    };

    const updateTotalPrice = () => {
      if (valueTour.value) {
        totalPrice.value =
          numAdults.value * valueTour.value.price +
          numChildren.value * valueTour.value.price_children;
        store.commit("setNumAdults", numAdults.value);
        store.commit("setNumChildren", numChildren.value);
        store.commit("setTotalPrice", totalPrice.value);
      }
    };

    const plusTour = (type) => {
      if (type === "adult") {
        numAdults.value++;
      } else if (type === "child") {
        numChildren.value++;
      }
      updateTotalPrice();
    };

    const minusTour = (type) => {
      if (type === "adult" && numAdults.value > 0) {
        numAdults.value--;
      } else if (type === "child" && numChildren.value > 0) {
        numChildren.value--;
      }
      updateTotalPrice();
    };

    onMounted(() => {
      tourID.value = route.params.id;
      getDetailTour();
    });

    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const bookTour = (id) => {
      router.push({ name: "BookingTour", params: { id } });
    };

    return {
      numAdults,
      numChildren,
      totalPrice,
      valueTour,
      plusTour,
      minusTour,
      updateTotalPrice,
      formatPrice,
      bookTour,
      errorValue,
    };
  },
};
</script>
