<template>
  <div class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="p-6 border-b">
        <div class="flex items-center">
          <i class="fas fa-user-circle text-gray-600 text-4xl"></i>
          <div class="ml-4">
            <p class="font-bold text-xl text-gray-800">{{ user.name || 'Chưa có tên' }}</p>
            <p class="text-gray-500">Email: {{ user.email || 'Chưa có email' }}</p>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Thông Tin Đơn Hàng</h2>
          <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p class="text-gray-700">Tour: <span class="font-bold">{{ order.tour_name }}</span></p>
            <!-- <p class="text-gray-700">Mô Tả: {{ order.description }}</p> -->
            <p class="text-gray-700">Địa điểm: {{ order.location }}</p>
            <p class="text-gray-700">Số lượng vé: {{ order.number_of_tickers }}</p>
            <p class="text-gray-700">Tổng giá: {{ order.total_price.toLocaleString() }} VND</p>
            <p class="text-gray-700">Phương thức thanh toán: {{ order.payment_method }}</p>
            <p class="text-gray-700">Trạng thái: {{ order.status }}</p>
            <p class="text-gray-700">Ghi chú: {{ order.notes }}</p>
            <p class="text-gray-700">Mã giao dịch: {{ order.transaction_id }}</p>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Chi Tiết Tour</h2>
          <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p class="text-gray-700">Tour: <span class="font-bold">{{ order.tour_name }}</span></p>
            <p class="text-gray-700">Mô tả: {{ tour.description }}</p>
            <p class="text-gray-700">Giá vé: {{ tour.price }} VND</p>
            <p class="text-gray-700">Địa điểm: {{ tour.location }}</p>
            <p class="text-gray-700">Tour kéo dài trong vòng: {{ tour.duration }} Ngày</p>
            <p class="text-gray-700">Ngày bắt đầu: {{ tour.start_date }}</p>
            <p class="text-gray-700">Ngày kết thúc: {{ tour.end_date }}</p>
          </div>
        </div>
      </div>

      <div class="p-6 border-t text-right">
        <button 
          class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          @click="goBack"
        >
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'DetailsOrder',
  data() {
    return {
      user: {},
      order: {
        total_price: 0, // Giá trị mặc định
        number_of_tickers: 0, // Số lượng vé mặc định
        payment_method: '',
        status: '',
        notes: '',
        transaction_id: '',
        tour_name: '',
        description: '',
        location: ''
      },
      tour: {}
    };
  },
  methods: {
    async fetchData() {
      try {
        // Lấy ID payment từ URL
        const paymentId = this.$route.params.id;

        // Gọi API để lấy thông tin đơn hàng theo paymentId
        const response = await axios.get(`http://127.0.0.1:8000/api/payments/Order/list/${paymentId}`);

        // Lấy dữ liệu trả về từ API
        const data = response.data.data;

        // Cập nhật thông tin cho user, order, và tour
        this.user = data.user || {};
        this.order = {
          tour_name: data.tour.name,
          description: data.description,
          location: data.tour.location,
          number_of_tickers: data.number_of_tickers,
          total_price: data.total_price,
          payment_method: data.payment_method,
          status: data.status,
          notes: data.notes,
          transaction_id: data.transaction_id
        };
        this.tour = data.tour || {};
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    },
    goBack() {
      this.$router.go(-1); // Quay lại trang trước đó
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}
</style>
