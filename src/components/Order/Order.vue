<template>
  <div class="bg-white p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="p-6 border-b">
        <h1 class="text-3xl font-semibold text-gray-800">Danh sách đơn hàng</h1>
      </div>
      <div class="p-4">
        <div
          v-for="payment in payments"
          :key="payment.id"
          class="border-b py-6"
        >
          <!-- Phần thông tin người đặt nằm trên cùng -->
          <div class="flex items-center space-x-4 mb-6">
            <i class="fas fa-user-circle text-gray-700 text-5xl"></i>
            <div>
              <p class="text-lg text-gray-700 font-semibold">
                Người đặt: <span class="text-gray-500">{{ payment.user?.name || "Chưa có tên người đặt" }}</span>
              </p>
              <p class="text-sm text-gray-500">
                Email: <span class="font-medium">{{ payment.user?.email || "Chưa có email" }}</span>
              </p>
            </div>
          </div>

          <!-- Phần thông tin về tour nằm dưới -->
          <div class="flex items-center space-x-4">
            <img
              :src="payment.tour?.image || 'https://via.placeholder.com/100'"
              alt="Tour Image"
              class="w-24 h-24 object-cover rounded-lg shadow-md"
            />
            <div>
              <p class="text-xl font-bold text-gray-800">{{ payment.tour?.name || "Chưa có tên tour" }}</p>
              <p class="text-gray-500">{{ payment.tour?.location || "Chưa có địa điểm" }}</p>
              <p class="mt-4 text-lg font-semibold text-gray-700">
                {{ payment.total_price.toLocaleString() }}đ
              </p>
            </div>
          </div>

          <!-- Các nút chức năng -->
          <div class="flex space-x-4 mt-6">
            <button
              class="px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              @click="viewDetails(payment.id)"
            >
              Xem chi tiết
            </button>
            <button
              class="px-6 py-3 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              @click="deleteOrder(payment.id)"
            >
              Xóa
            </button>
          </div>
        </div>
        <p v-if="!payments.length" class="text-center text-gray-500 mt-6">
          Không có đơn hàng nào.
        </p>
      </div>
    </div>
  </div>
</template>
  
  
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'QLOrder',
    data() {
      return {
        payments: [], // Lưu trữ danh sách đơn hàng
      };
    },
    mounted() {
      this.fetchAllPayments();
    },
    methods: {
      // Lấy tất cả đơn hàng
      async fetchAllPayments() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/payments/Order/list');
          this.payments = response.data; // Lưu danh sách đơn hàng
        } catch (error) {
          console.error("Error fetching orders:", error.response?.data?.message || error.message);
        }
      },
      // Xem chi tiết đơn hàng
      viewDetails(paymentId) {
    // Chuyển hướng tới trang chi tiết đơn hàng
    this.$router.push({ name: 'DetailsOrder', params: { id: paymentId } });
  },
      // Xóa đơn hàng
      async deleteOrder(paymentId) {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
        if (!confirmDelete) return;
  
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/payments/${paymentId}`);
          alert(response.data.message);
          this.payments = this.payments.filter((payment) => payment.id !== paymentId); // Cập nhật danh sách sau khi xóa
        } catch (error) {
          alert("Không thể xóa đơn hàng: " + (error.response?.data?.message || error.message));
        }
      },
    },
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
  }
  </style>
  