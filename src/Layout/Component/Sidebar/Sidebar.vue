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
                            <a href="#" class="flex items-center p-2 bg-blue-500 text-white rounded-lg">
                                <i class="fas fa-home"></i>
                                <span class="ml-4">Trang người bán</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <i class="fas fa-bell"></i>
                                <span class="ml-4">Notifications</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <i class="fas fa-chart-pie"></i>
                                <span class="ml-4">Thống kê</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <i class="fas fa-wallet"></i>
                                <span class="ml-4">Wallets</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <i class="fas fa-comment"></i>
                                <span class="ml-4">Messages</span>
                            </a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <i class="fas fa-sign-out-alt"></i>
                                <span class="ml-4">Logout</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
    name: 'SidebarComponent',
}
</script>
<style lang="scss" module>
@import './Sidebar.module.scss';
</style>