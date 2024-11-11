<template>
  <form @submit.prevent="handleSubmit">
    <div class="bg-gray-100">
      <div class="p-6" id="app">
        <div class="ml-20 max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
          <div class="flex">
            <!-- Thông tin liên hệ -->
            <div class="w-1/2 pr-4">
              <h2 class="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
              <div v-if="errorValue" class="alert alert-danger mt-3">
                <p>Error: {{ errorValue }}</p>
              </div>
              <button @click="logValue" type="button">Log value</button>
              <div class="bg-gray-100 p-4 rounded-lg mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-medium">
                    Thông tin liên hệ (nhận vé/phiếu thanh toán)
                  </h3>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 mb-1"> Họ tên* </label>
                  <input
                    v-model="nameContact"
                    class="w-full p-2 border rounded"
                    placeholder="Họ và tên"
                    type="text"
                  />
                  <p v-if="errorNameContact" class="text-sm text-red-500 mt-1">
                    {{ errorNameContact }}
                  </p>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 mb-1"> Email* </label>
                  <input
                    v-model="emailContact"
                    class="w-full p-2 border rounded"
                    placeholder="VD: email@example.com"
                    type="text"
                  />
                  <p v-if="errorEmailContact" class="text-sm text-red-500 mt-1">
                    {{ errorEmailContact }}
                  </p>
                </div>

                <div class="flex items-center mt-2">
                  <input
                    value="self"
                    :disabled="!emailContact || !nameContact"
                    class="mr-2"
                    id="self"
                    name="booking"
                    type="radio"
                    v-model="type_customer"
                  />
                  <label class="text-gray-700" for="self">
                    Tôi là khách tham quan
                  </label>
                </div>

                <div class="flex items-center mt-2">
                  <input
                    value="other"
                    :disabled="!emailContact || !nameContact"
                    class="mr-2"
                    id="other"
                    name="booking"
                    type="radio"
                    v-model="type_customer"
                  />
                  <label class="text-gray-700" for="other">
                    Tôi đặt cho người khác
                  </label>
                </div>
              </div>
            </div>
            <!-- Tóm tắt đặt chỗ -->
            <div class="w-1/2">
              <h2 class="text-xl font-semibold mb-4">Tóm tắt đặt chỗ</h2>
              <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="flex items-center mb-4">
                  <img
                    class="w-16 h-16 rounded mr-4"
                    height="60"
                    width="60"
                    v-if="
                      valueTour &&
                      valueTour.images &&
                      valueTour.images.length > 0
                    "
                    :src="`http://127.0.0.1:8000/images/${valueTour.images[0].image_url}`"
                    :alt="valueTour.images[0].alt_text"
                  />
                  <div>
                    <p v-if="valueTour" class="font-medium">
                      {{ valueTour.name }}
                    </p>
                    <p v-if="valueTour" class="text-gray-500">
                      {{ valueTour.description }}
                    </p>
                  </div>
                </div>
                <div class="mb-4">
                  <p class="text-gray-700">Ngày tham quan</p>
                  <p class="font-medium">Thứ 6, 15 thg 11 2024</p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-700">Áp dụng cho</p>
                  <p class="font-medium">
                    Người lớn: {{ numAdults }}, Trẻ em: {{ numChildren }}
                  </p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-700">Có hiệu lực vào</p>
                  <p class="font-medium">15 thg 11 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Thông tin khách -->
        <div class="ml-20 max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 class="text-xl font-bold mb-4">Thông tin khách</h1>
          <div class="border p-4 rounded-lg">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold">
                Thông tin hành khách tham gia
              </h2>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">
                Danh xưng
                <span class="text-red-500"> * </span>
              </label>
              <div class="relative"></div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">
                Họ tên
                <span class="text-red-500"> * </span>
              </label>
              <input
                v-model="nameCustomer"
                class="block w-full border border-gray-300 rounded-lg p-2.5"
                type="text"
                value=""
              />
              <p class="text-sm text-gray-500 mt-1">
                như trên CMND (không dấu)
              </p>
              <p v-if="errorNameCustomer" class="text-sm text-red-500 mt-1">
                {{ errorNameCustomer }}
              </p>
            </div>
            <div class="flex space-x-4 mb-4">
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">
                  Email
                  <span class="text-red-500"> * </span>
                </label>
                <input
                  v-model="emailCustomer"
                  class="block w-full border border-gray-300 rounded-lg p-2.5"
                  type="text"
                  value=""
                />
                <p class="text-sm text-gray-500 mt-1">VD: email@example.com</p>
                <p v-if="errorEmailCustomer" class="text-sm text-red-500 mt-1">
                  {{ errorEmailCustomer }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Tóm tắt -->
        <div class="mt-3 ml-20 bg-white p-6 rounded-lg shadow-md w-96 mr-10">
          <h2 class="text-lg font-bold mb-4">Tóm tắt</h2>
          <div class="border rounded-lg">
            <div class="flex justify-between items-center p-4 border-b">
              <span class="font-medium"> Giá bạn trả </span>
              <span class="text-orange-500 font-bold">
                {{ formatPrice(totalPrice) }} VND
              </span>
            </div>
            <div class="p-4">
              <div class="flex justify-between mb-2">
                <span> Người lớn({{ numAdults }}) </span>
                <span>
                  {{ formatPrice(valueTour?.price * numAdults || 0) }} VND
                </span>
              </div>
              <div class="flex justify-between">
                <span> Trẻ em({{ numChildren }}) </span>
                <span>
                  {{
                    formatPrice(valueTour?.price_children * numChildren || 0)
                  }}
                  VND
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg font-medium"
          type="submit"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import Cookies from "js-cookie";

export default {
  name: "BookingTour",
  setup() {
    const tourID = ref(null);
    const route = useRoute();
    const valueTour = ref(null);
    const errorValue = ref(null);
    const router = useRouter();
    const store = useStore();
    const emailContact = ref(null);
    const nameContact = ref(null);
    const emailCustomer = ref(null);
    const nameCustomer = ref(null);
    const type_customer = ref("other");
    const errorEmailContact = ref(null);
    const errorNameContact = ref(null);
    const errorEmailCustomer = ref(null);
    const errorNameCustomer = ref(null);

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
      } catch (error) {
        console.error("Failed to retrieve tours:", error.response?.data?.error);
        errorValue.value = error.response?.data?.error;
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8000/api/bookTour",
          {
            tour_id: tourID.value,
            nameContact: nameContact.value,
            emailContact: emailContact.value,
            nameCustomer: nameCustomer.value,
            emailCustomer: emailCustomer.value,
            totalPrice: totalPrice.value,
            type_customer: type_customer.value,
            number_of_adult: numAdults.value,
            number_of_childrent: numChildren.value,
          }
        );

        if (response?.data?.message === "Booking the tour successfully") {
          console.log("rs", response.data);
          Cookies.set("bookingId", response.data.booking.id);

          // this.$router.push("/minh-hiep/payment");
          window.location.href = "http://localhost:3000/minh-hiep/payment";
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Registration failed:", error.response.data);
        if (error.response && error.response.data) {
          const errors = error.response.data.errors;
          errorEmailContact.value = errors.emailContact
            ? errors.emailContact[0]
            : "";
          errorNameContact.value = errors.nameContact
            ? errors.nameContact[0]
            : "";
          errorEmailCustomer.value = errors.emailCustomer
            ? errors.emailCustomer[0]
            : "";
          errorNameCustomer.value = errors.nameCustomer
            ? errors.nameCustomer[0]
            : "";
        }
      }
    };

    const totalPrice = computed(() => store.getters.getTotalPrice);
    const numAdults = computed(() => store.getters.getNumAdults);
    const numChildren = computed(() => store.getters.getNumChildren);

    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const bookTour = (id) => {
      router.push({ name: "BookingTour", params: { id } });
    };

    const logValue = () => {
      console.log("emailContact", emailContact);
      console.log("nameContact", nameContact);
      console.log("emailCustomer", emailCustomer);
      console.log("nameCustomer", nameCustomer);
      console.log("totalPrice", totalPrice);
      console.log("numAdults", numAdults);
      console.log("numChildren", numChildren);
      console.log("type_customer", type_customer);
    };

    onMounted(() => {
      tourID.value = route.params.id;
      getDetailTour();
    });
    const updateCustomerInfo = () => {
      if (type_customer.value === "self") {
        emailCustomer.value = emailContact.value;
        nameCustomer.value = nameContact.value;
      } else if (type_customer.value === "other") {
        emailCustomer.value = null;
        nameCustomer.value = null;
      }
    };
    watch(type_customer, () => {
      updateCustomerInfo();
    });

    const setType = (item) => {
      if (item === "other") {
        type_customer.value = "other";
      } else if (item === "self") {
        type_customer.value = "self";
      }
    };

    return {
      type_customer,
      totalPrice,
      valueTour,
      bookTour,
      formatPrice,
      errorValue,
      numAdults,
      numChildren,
      logValue,
      handleSubmit,
      emailContact,
      nameContact,
      emailCustomer,
      nameCustomer,
      setType,
      errorEmailContact,
      errorNameContact,
      errorEmailCustomer,
      errorNameCustomer,
    };
  },
};
</script>
