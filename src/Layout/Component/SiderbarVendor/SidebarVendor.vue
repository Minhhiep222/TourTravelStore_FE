<template>
  <div :class="$style.wrapper">
    <div class="flex items-center justify-start">
      <div class="bg-white w-64 rounded-lg shadow-sm border-r h-screen">
        <div class="flex items-center p-4 border-b">
          <i class="fas fa-bars text-xl"></i>
          <span class="ml-4 text-lg font-bold">Codinglab</span>
        </div>
        <div class="p-4 pl-8">
          <ul>
            <li class="mb-4">
              <router-link
                to="/minh-hiep/tours"
                class="flex items-center p-2"
                :class="{
                  'bg-blue-500 text-white': isActive('/minh-hiep/tours'),
                }"
              >
                <i class="fas fa-map-signs"></i>
                <span class="ml-4">Quản lý Tour</span>
              </router-link>
            </li>
            <li class="mb-4">
              <router-link
                to=""
                class="flex items-center p-2"
                :class="{ 'bg-blue-500 text-white': isActive('/QLOrder') }"
              >
                <i class="fas fa-box"></i>
                <span class="ml-4">Quản lý đơn hàng</span>
              </router-link>
            </li>
            <li class="mb-4">
              <router-link
                to=""
                class="flex items-center p-2"
                :class="{ 'bg-blue-500 text-white': isActive('/UserAdmin') }"
              >
                <i class="fas fa-users"></i>
                <span class="ml-4">Quản lý User</span>
              </router-link>
            </li>
            <li class="mb-4">
              <router-link
                to=""
                class="flex items-center p-2"
                :class="{ 'bg-blue-500 text-white': isActive('/Statistical') }"
              >
                <i class="fas fa-chart-pie"></i>
                <span class="ml-4">Thống kê</span>
              </router-link>
            </li>
            <li class="mb-4">
              <a
                href="#"
                class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <i class="fas fa-wallet"></i>
                <span class="ml-4">Wallets</span>
              </a>
            </li>
            <li class="mb-4">
              <a
                href="#"
                class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <i class="fas fa-comment"></i>
                <span class="ml-4">Messages</span>
              </a>
            </li>
            <li class="mb-4">
              <a
                href="#"
                class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <i class="fas fa-sign-out-alt"></i>
                <span class="ml-4">Logout</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <i class="fas fa-cog"></i>
                <span class="ml-4">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  methods: {
    // Kiểm tra xem đường dẫn hiện tại có khớp với đường dẫn của mục sidebar không
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style lang="scss" module>
@import "./Sidebar.module.scss";
</style>
