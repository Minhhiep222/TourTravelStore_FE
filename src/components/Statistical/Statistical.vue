<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold">Trang Thống Kê Quản Lý Tour Du Lịch</h1>
      </div>
  
      <!-- Main Content -->
      <main class="flex-grow container mx-auto p-4">
        <!-- Bộ chọn khoảng thời gian -->
        <div class="flex items-center justify space-x-4 mb-6">
          <span class="text-gray-600 font-medium">Xem thống kê:</span>
          <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" @click="loadData('day')">Ngày</button>
          <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" @click="loadData('week')">Tuần</button>
          <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" @click="loadData('month')">Tháng</button>
        </div>
  
        <!-- Thông tin thống kê -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Tổng Doanh Thu -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-full">
                <i class="fas fa-dollar-sign text-blue-600 text-2xl"></i>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold">Tổng Doanh Thu</h2>
                <p class="text-2xl font-bold">{{ revenue }}</p>
              </div>
            </div>
          </div>
  
          <!-- Số Lượng Khách Mới -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-full">
                <i class="fas fa-user-plus text-green-600 text-2xl"></i>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold">Số Lượng Khách Mới</h2>
                <p class="text-2xl font-bold">{{ newCustomers }}</p>
              </div>
            </div>
          </div>
  
          <!-- Số Lượng Tour Đã Đặt -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-full">
                <i class="fas fa-suitcase-rolling text-purple-600 text-2xl"></i>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold">Số Lượng Tour Đã Đặt</h2>
                <p class="text-2xl font-bold">{{ toursBooked }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Bảng Giao Dịch Gần Đây -->
        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 class="text-xl font-semibold mb-4">Giao Dịch Gần Đây</h2>
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b">Ngày</th>
                <th class="py-2 px-4 border-b">Khách Hàng</th>
                <th class="py-2 px-4 border-b">Số Tiền</th>
                <th class="py-2 px-4 border-b">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in transactions" :key="index">
                <td class="py-2 px-4 border-b">{{ transaction.date }}</td>
                <td class="py-2 px-4 border-b">{{ transaction.customer }}</td>
                <td class="py-2 px-4 border-b">{{ transaction.amount }}</td>
                <td class="py-2 px-4 border-b" :class="{'text-green-600': transaction.status === 'Hoàn Thành', 'text-yellow-600': transaction.status !== 'Hoàn Thành'}">
                  {{ transaction.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: 'TourStatistics',
    data() {
      return {
        revenue: "0 VND",
        newCustomers: 0,
        toursBooked: 0,
        transactions: [],
      };
    },
    methods: {
      async loadData(timeframe) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/statistics/${timeframe}`);
          const data = response.data;
          this.revenue = data.revenue || "0 VND";  // Default value if no data
          this.newCustomers = data.newCustomers || 0;
          this.toursBooked = data.toursBooked || 0;
          this.transactions = data.transactions || [];
        } catch (error) {
          console.error("Error loading data:", error);
        }
      },
    },
    mounted() {
      // Load data for the default timeframe, e.g., 'day'
      this.loadData("day");
    },
  };
  </script>
  
  <style scoped>
  /* Bạn có thể thêm style tùy chỉnh ở đây */
  </style>
  